// Handle passing event name to registration page
document.addEventListener('DOMContentLoaded', () => {
    // If we are on the registration page
    if (window.location.pathname.includes('register.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const eventName = urlParams.get('event');
        const eventInput = document.getElementById('event-name');
        if (eventName && eventInput) {
            eventInput.value = decodeURIComponent(eventName);
        }
    }

    // Example of fetching data from the backend API
    async function fetchEvents() {
        try {
            const response = await fetch('/api/events');
            const events = await response.json();
            console.log('Events from backend:', events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }
    fetchEvents();

    // Handle "Register" button clicks to pass event name
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const eventName = btn.getAttribute('data-event');
            if (eventName) {
                window.location.href = `register.html?event=${encodeURIComponent(eventName)}`;
            }
        });
    });
});
