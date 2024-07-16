function updateStatus(message) {
    document.getElementById('status').innerText = message;
}

function checkConnection() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')  // Example endpoint
        .then(response => {
            if (response.ok) {
                updateStatus('You are online (polling).');
            } else {
                updateStatus('You are offline (polling).');
            }
        })
        .catch(error => {
            updateStatus('You are offline (polling).');
        });
}

// Polling interval (e.g., every 5 seconds)
setInterval(checkConnection, 5000);

// Listen for native online/offline events
window.addEventListener('offline', function () {
    updateStatus('You are currently offline (native).');
});

window.addEventListener('online', function () {
    updateStatus('You are back online (native).');
});

// Initial check
if (!navigator.onLine) {
    updateStatus('You are currently offline (initial check).');
} else {
    updateStatus('You are online (initial check).');
}

// Initial polling check
checkConnection();