let status = 'Offline';
const button = document.getElementById('reconnect-button');
const messageContainer = document.getElementById('message-container');
const indicator = document.getElementById('server-indicator');


function updateStatus(message) {
    document.getElementById('status').innerText = message;

    if (status === 'Offline') {
        button.style.display = 'block';  // To show the button
        // messageContainer.className = 'message-container-down-default'
        messageContainer.className = 'message-container-down-day'
        indicator.className = 'server-indicator-down'
    }
    else {
        button.style.display = 'none';  // To hide the button
        // messageContainer.className = 'message-container-up-default'
        messageContainer.className = 'message-container-up-day'
        indicator.className = 'server-indicator-up'
    }
}

function checkConnection() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')  // Example endpoint
        .then(response => {
            if (response.ok) {
                status = 'Online';
                updateStatus(status);
                // updateStatus('You are online (polling).');
            } else {
                status = 'Offline';
                updateStatus(status);
                // updateStatus('You are offline (polling).');
            }
        })
        .catch(error => {
            status = 'Offline';
            updateStatus(status);
            // updateStatus('You are offline (polling).');
        });
}

// Polling interval (e.g., every 5 seconds)
setInterval(checkConnection, 5000);

// Listen for native online/offline events in Browser
window.addEventListener('Offline', function () {
    status = 'Offline';
    updateStatus(status);
    // updateStatus('You are currently offline (native).');
});

window.addEventListener('Online', function () {
    status = 'Online';
    updateStatus(status);
    // updateStatus('You are back online (native).');
});

// Initial check upon page load
if (!navigator.onLine) {
    status = 'Offline';
    updateStatus(status);
    // updateStatus('You are currently offline (initial check).');
} else {
    status = 'Online'
    updateStatus(status);
    // updateStatus('You are online (initial check).');
}

// Initial polling check
checkConnection();

// Button checks network connection
button.addEventListener('click', function () {
    console.log("Checking network connection")
    checkConnection();
})