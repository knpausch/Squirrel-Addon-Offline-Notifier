(() => {
    "use strict";

    let selectedTheme;
    let selectedUpColor;
    let selectedUpOpacity;
    let selectedDownColor;
    let selectedDownOpacity;
    let selectedTextColor;
    let selectedTextOpacity;
    let selectedBorderRadius;
    let networkStatus;

    const messageContainer = document.getElementById('message-container');
    const statusText = document.getElementById('status-text');
    const indicator = document.getElementById('server-indicator');
    const button = document.getElementById('reconnect-button');

    Squirrel.addEventListener('eventDispatch', (e) => eval(`${e.detail.name}(e)`));
    Squirrel.initWithSquirrel();

    function onInitState(e) {
        const state = e.detail.state;
        if (state) {
            selectedTheme = state.themeType;
            selectedTextColor = state.textColor.color[0].color;
            selectedTextOpacity = state.textColor.color[0].alpha;
            selectedUpColor = state.serverUpColor.color[0].color;
            selectedUpOpacity = state.serverUpColor.color[0].alpha;
            selectedDownColor = state.serverDownColor.color[0].color;
            selectedDownOpacity = state.serverDownColor.color[0].alpha;
            selectedBorderRadius = state.borderRadius + 'px';
        }
        render();
    }

    function onPropertyChange(e) {
        const propertyName = e.detail.property;
        const propertyValue = e.detail.value;

        switch (Squirrel.getGenericProperty(propertyName)) {
            case 'themeType':
                selectedTheme = propertyValue;
                break;
            case 'textColor.color.*.color':
                selectedTextColor = propertyValue;
                break;
            case 'textColor.color.*.alpha':
                selectedTextOpacity = propertyValue;
                break;
            case 'serverUpColor.color.*.color':
                selectedUpColor = propertyValue;
                break;
            case 'serverUpColor.color.*.alpha':
                selectedUpOpacity = propertyValue;
                break;
            case 'serverDownColor.color.*.color':
                selectedDownColor = propertyValue;
                break;
            case 'serverDownColor.color.*.alpha':
                selectedDownOpacity = propertyValue;
                break;
            case 'borderRadius':
                selectedBorderRadius = propertyValue + 'px';
                break;
            default:
                console.log("Unknown message type: " + propertyName);
                break;
        }
        render();
    }

    function applyOfflineStyles(theme) {
        button.style.display = 'block';
        messageContainer.className = `message-container-down-${theme}`;
        indicator.className = 'server-indicator-down';
        messageContainer.style.borderRadius = "5px";
        messageContainer.style.opacity = 1;
        statusText.style.opacity = 1;
    }

    function applyOnlineStyles(theme) {
        button.style.display = 'none';
        messageContainer.className = `message-container-up-${theme}`;
        indicator.className = 'server-indicator-up';
        messageContainer.style.borderRadius = "5px";
        messageContainer.style.opacity = 1;
        statusText.style.opacity = 1;
    }

    function applyCustomOfflineStyles() {
        button.style.display = 'block';
        button.style.opacity = 1;
        messageContainer.className = `message-container-down-${selectedTheme}`;
        messageContainer.style.setProperty('--custom-background-down', selectedDownColor);
        messageContainer.style.opacity = selectedDownOpacity;
        messageContainer.style.setProperty('--custom-text-color', selectedTextColor);
        statusText.style.opacity = selectedTextOpacity;
        indicator.className = 'server-indicator-down';
        messageContainer.style.borderRadius = selectedBorderRadius;
        button.style.borderRadius = selectedBorderRadius;
    }

    function applyCustomOnlineStyles() {
        button.style.display = 'none';
        button.style.opacity = 1;
        messageContainer.className = `message-container-up-${selectedTheme}`;
        messageContainer.style.setProperty('--custom-background-up', selectedUpColor);
        messageContainer.style.opacity = selectedUpOpacity;
        messageContainer.style.setProperty('--custom-text-color', selectedTextColor);
        statusText.style.opacity = selectedTextOpacity;
        indicator.className = 'server-indicator-up';
        messageContainer.style.borderRadius = selectedBorderRadius;
        button.style.borderRadius = selectedBorderRadius;
    }

    function render() {
        statusText.innerText = networkStatus;

        if (networkStatus === 'Offline') {
            selectedTheme === 'custom' ? applyCustomOfflineStyles() : applyOfflineStyles(selectedTheme);
        } else if (networkStatus === 'Online') {
            selectedTheme === 'custom' ? applyCustomOnlineStyles() : applyOnlineStyles(selectedTheme);
        }
    }

    //Checks network connection (hardware)
    function checkConnection() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => {
                networkStatus = response.ok ? 'Online' : 'Offline';
                render();
            })
            .catch(() => {
                networkStatus = 'Offline';
                render();
            });
    }

    //Checks network connection (browser)
    function initializeNetworkListeners() {
        window.addEventListener('offline', () => {
            networkStatus = 'Offline';
            render();
        });

        window.addEventListener('online', () => {
            networkStatus = 'Online';
            render();
        });

        button.addEventListener('click', () => {
            checkConnection();
            console.log("Checking network connection...");
        });
    }

    //Checks initial network connection and polling every 5 seconds
    function initialize() {
        initializeNetworkListeners();
        if (!navigator.onLine) {
            networkStatus = 'Offline';
        } else {
            networkStatus = 'Online';
        }
        render();
        checkConnection();
        setInterval(checkConnection, 5000);
    }
    
    function onPropertyChangesComplete() { }
    function onSetCanvas(e) { }
    function onSetRuntimeMode(e) { }
    function onSetSize(e) { }
    function onSetPosition(e) { }
    
    initialize();
})();
