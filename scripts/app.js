(() => {
    "use strict";

    let themeSelected;
    let customUpColor;
    let customUpOpacity;
    let customDownColor;
    let customTextColor;
    let customTextOpacity;
    let customBorderRadius;
    let status = 'Offline';
    const button = document.getElementById('reconnect-button');
    const messageContainer = document.getElementById('message-container');
    const indicator = document.getElementById('server-indicator');
    const statusText = document.getElementById('status-text');

    Squirrel.addEventListener('eventDispatch', (e) => eval(`${e.detail.name}(e)`));

    Squirrel.initWithSquirrel();

    function onInitState(e) {
        const state = e.detail.state
        customUpColor = state.serverUpColor.color[0].color;
        customUpOpacity = state.serverUpColor.color[0].alpha;
        customDownColor = state.serverDownColor.color[0].color;
        customTextColor = state.textColor.color[0].color;
        customBorderRadius = state.borderRadius + "px";
        customTextOpacity = state.textColor.color[0].alpha;

        if (state != null) {
            themeSelected = state.themeType
        }
        render();
    }

    function onPropertyChange(e) {
        const propertyName = e.detail.property
        const propertyValue = e.detail.value

        switch (Squirrel.getGenericProperty(propertyName)) {
            case 'themeType':
                themeSelected = propertyValue;
                break;
            case 'textColor.color.*.color':
                customTextColor = propertyValue;
                break;
            case 'textColor.color.*.alpha':
                customTextOpacity = propertyValue;
                break;
            case 'serverUpColor.color.*.color':
                customUpColor = propertyValue;
                break;
            case 'serverUpColor.color.*.alpha':
                customUpOpacity = propertyValue;
                break;
            case 'serverDownColor.color.*.color':
                customDownColor = propertyValue;
                break;
            case 'borderRadius':
                customBorderRadius = propertyValue + "px";
                break;
            default:
                console.log("Unknown message type: " + propertyName);
                break;
        }
        render();
    }

    function render() {
        statusText.innerText = status;
        let downClassName = 'message-container-down-' + themeSelected;
        let upClassName = 'message-container-up-' + themeSelected;
        if (status === 'Offline' && themeSelected != 'custom') {
            button.style.display = 'block';
            messageContainer.className = downClassName;
            indicator.className = 'server-indicator-down'
            messageContainer.style.borderRadius = "5px";
            statusText.style.opacity = 1;
        }
        else if (status === 'Online' && themeSelected != 'custom') {
            button.style.display = 'none';
            messageContainer.className = upClassName;
            indicator.className = 'server-indicator-up'
            messageContainer.style.borderRadius = "5px";
            messageContainer.style.opacity = 1;
            statusText.style.opacity = 1;
        }
        else if (status === 'Offline' && themeSelected === 'custom') {
            button.style.display = 'block';
            messageContainer.className = downClassName;
            messageContainer.style.setProperty('--custom-background-down', customDownColor);
            messageContainer.style.setProperty('--custom-text-color', customTextColor);
            statusText.style.opacity = customTextOpacity;
            indicator.className = 'server-indicator-down'
            messageContainer.style.borderRadius = customBorderRadius;
            button.style.borderRadius = customBorderRadius;
        }
        else if (status === 'Online' && themeSelected === 'custom') {
            button.style.display = 'none';
            messageContainer.className = upClassName;
            messageContainer.style.setProperty('--custom-background-up', customUpColor);
            messageContainer.style.opacity = customUpOpacity;
            messageContainer.style.setProperty('--custom-text-color', customTextColor);
            statusText.style.opacity = customTextOpacity;
            indicator.className = 'server-indicator-up'
            messageContainer.style.borderRadius = customBorderRadius;
            button.style.borderRadius = customBorderRadius;
        }
    }

    function checkConnection() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => {
                if (response.ok) {
                    status = 'Online';
                    render();
                } else {
                    status = 'Offline';
                    render();
                }
            })
            .catch(error => {
                status = 'Offline';
                render();
            });
    }

    // Polling interval (e.g., every 5 seconds)
    setInterval(checkConnection, 5000);

    // Listen for native offline events in Browser
    window.addEventListener('Offline', function () {
        status = 'Offline';
        render();
    });

    // Listen for native online events in Browser
    window.addEventListener('Online', function () {
        status = 'Online';
        render();
    });

    // Initial check upon page load
    if (!navigator.onLine) {
        status = 'Offline';
        render();
    } else {
        status = 'Online'
        render();
    }

    // Initial polling check
    checkConnection();

    // Button checks network connection
    button.addEventListener('click', function () {
        console.log("Checking network connection")
        checkConnection();
    })

    function onPropertyChangesComplete() { }

    function onSetCanvas(e) {
        const canvas = e.detail.canvas;
    }

    function onSetRuntimeMode(e) {
        const mode = e.detail.mode;
    }

    function onSetSize(e) {
        const size = e.detail.size;
    }

    function onSetPosition(e) {
        const position = e.detail.position;
    }
})();