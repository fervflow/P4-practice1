document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btNative').addEventListener('click', () => {
        window.api.send('get-os-info');
    });

    window.api.receive('os-info', (osType) => {
        alert(osType);
    })

    document.getElementById('btBrowser').addEventListener('click', () => {
        window.api.send('btBrowser-clicked');
    });
});

