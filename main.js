// YOUR JAVASCRIPT CODE FOR INDEX.HTML GOES HERE
let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    currentIndex += direction;

    if (currentIndex >= totalItems) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    }

    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Auto-rotate the carousel
setInterval(() => {
    moveCarousel(1);
}, 4000);



document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);
    
    // Send form data to the server
    fetch('/send-email', { // Replace with your actual server URL
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        // Display success message
        document.getElementById('response-message').innerText = data.message || 'Message sent successfully!';
        document.getElementById('contact-form').reset(); // Clear the form
    })
    .catch(error => {
        // Display error message
        document.getElementById('response-message').innerText = 'An error occurred. Please try again.';
        console.error('There was a problem with the fetch operation:', error);
    });
});

