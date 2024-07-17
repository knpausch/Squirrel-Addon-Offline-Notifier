// let status = 'Offline';
// const button = document.getElementById('reconnect-button');
// const messageContainer = document.getElementById('message-container');
// const indicator = document.getElementById('server-indicator');


// function render() {
//     document.getElementById('status').innerText = status;
//     var downClassName = 'message-container-down-'+ themeSelected;
//     var upClassName = 'message-container-up-'+ themeSelected;

//     if (status === 'Offline') {
//         button.style.display = 'block';  // To show the button
//         // messageContainer.className = 'message-container-down-default'
//         // messageContainer.className = 'message-container-down-day'
//         messageContainer.classname = downClassName;
//         indicator.className = 'server-indicator-down'
//     }
//     else {
//         button.style.display = 'none';  // To hide the button
//         // messageContainer.className = 'message-container-up-default'
//         // messageContainer.className = 'message-container-up-day'
//         messageContainer.classname = upClassName;
//         indicator.className = 'server-indicator-up'
//     }
// }

// function checkConnection() {
//     fetch('https://jsonplaceholder.typicode.com/posts/1')  // Example endpoint
//         .then(response => {
//             if (response.ok) {
//                 status = 'Online';
//                 render();
//                 // render('You are online (polling).');
//             } else {
//                 status = 'Offline';
//                 render();
//                 // render('You are offline (polling).');
//             }
//         })
//         .catch(error => {
//             status = 'Offline';
//             render();
//             // render('You are offline (polling).');
//         });
// }

// // Polling interval (e.g., every 5 seconds)
// setInterval(checkConnection, 5000);

// // Listen for native online/offline events in Browser
// window.addEventListener('Offline', function () {
//     status = 'Offline';
//     render();
//     // render('You are currently offline (native).');
// });

// window.addEventListener('Online', function () {
//     status = 'Online';
//     render();
//     // render('You are back online (native).');
// });

// // Initial check upon page load
// if (!navigator.onLine) {
//     status = 'Offline';
//     render();
//     // render('You are currently offline (initial check).');
// } else {
//     status = 'Online'
//     render();
//     // render('You are online (initial check).');
// }

// // Initial polling check
// checkConnection();

// // Button checks network connection
// button.addEventListener('click', function () {
//     console.log("Checking network connection")
//     checkConnection();
// })