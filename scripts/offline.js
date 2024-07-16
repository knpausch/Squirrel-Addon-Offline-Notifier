let status = 'offline';
const button = document.getElementById('reconnect-button');
const messageContainer = document.getElementById('message-container');

function updateStatus(message) {
    document.getElementById('status').innerText = message;
    // document.getElementById('realStatus').innerText = status;

    if (status === 'offline') {
        button.style.display = 'block';  // To show the button
        messageContainer.className = 'message-container-down'
    }
    else {
        button.style.display = 'none';  // To hide the button
        messageContainer.className = 'message-container-up'
    }
}

function checkConnection() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')  // Example endpoint
        .then(response => {
            if (response.ok) {
                status = 'online';
                updateStatus(status);
                // updateStatus('You are online (polling).');
            } else {
                status = 'offline';
                updateStatus(status);
                // updateStatus('You are offline (polling).');
            }
        })
        .catch(error => {
            status = 'offline';
            updateStatus(status);
            // updateStatus('You are offline (polling).');
        });
}

// Polling interval (e.g., every 5 seconds)
setInterval(checkConnection, 5000);

// Listen for native online/offline events in Browser
window.addEventListener('offline', function () {
    status = 'offline';
    updateStatus(status);
    // updateStatus('You are currently offline (native).');
});

window.addEventListener('online', function () {
    status = 'online';
    updateStatus(status);
    // updateStatus('You are back online (native).');
});

// Initial check upon page load
if (!navigator.onLine) {
    status = 'offline';
    updateStatus(status);
    // updateStatus('You are currently offline (initial check).');
} else {
    status = 'online'
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