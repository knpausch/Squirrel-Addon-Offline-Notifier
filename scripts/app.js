(() => {
    "use strict";

    let themeSelected;
    let customUpColor;
    let customDownColor;
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
        customDownColor = state.serverDownColor.color[0].color;

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
            case 'serverUpColor.color.*.color':
                customUpColor = propertyValue;
                render();
                break;
            case 'serverDownColor.color.*.color':
                customDownColor = propertyValue;
                render();
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
        }
        else if (status === 'Online' && themeSelected != 'custom') {
            button.style.display = 'none';
            messageContainer.className = upClassName;
            indicator.className = 'server-indicator-up'
        }
        else if (status === 'Offline' && themeSelected === 'custom') {
            button.style.display = 'block';
            messageContainer.className = downClassName;
            messageContainer.style.backgroundColor = customDownColor;
            indicator.className = 'server-indicator-down'
        }
        else {
            button.style.display = 'none';
            messageContainer.className = upClassName;
            messageContainer.style.backgroundColor = customUpColor;
            indicator.className = 'server-indicator-up'
        }

    }

    function checkConnection() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')  // Example endpoint
            .then(response => {
                if (response.ok) {
                    status = 'Online';
                    render();
                    // render('You are online (polling).');
                } else {
                    status = 'Offline';
                    render();
                    // render('You are offline (polling).');
                }
            })
            .catch(error => {
                status = 'Offline';
                render();
                // render('You are offline (polling).');
            });
    }

    // Polling interval (e.g., every 5 seconds)
    setInterval(checkConnection, 5000);

    // Listen for native online/offline events in Browser
    window.addEventListener('Offline', function () {
        status = 'Offline';
        render();
        // render('You are currently offline (native).');
    });

    window.addEventListener('Online', function () {
        status = 'Online';
        render();
        // render('You are back online (native).');
    });

    // Initial check upon page load
    if (!navigator.onLine) {
        status = 'Offline';
        render();
        // render('You are currently offline (initial check).');
    } else {
        status = 'Online'
        render();
        // render('You are online (initial check).');
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