document.getElementById('device-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const deviceData = {};
    formData.forEach((value, key) => deviceData[key] = value);

    try {
        const response = await fetch('/api/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deviceData)
        });

        if (response.ok) {
            alert('Device added successfully!');
            event.target.reset();
        } else {
            alert('Failed to add device. Please try again.');
        }
    } catch (error) {
        alert('Failed to add device. Please try again.');
    }
});
