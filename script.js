// Responsive Navbar
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fetch JSON data and populate the card
fetch('empathy_maps.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const cardContainer = document.getElementById('cardContainer');
        let currentIndex = 0; // To track the current card index

        data.forEach((entry, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.classList.toggle('active', index === currentIndex); // Only show the first card initially
            card.title = `
                ${entry.name[0]} - ${entry.name[1]}
                Does: ${entry.does.join(', ')}
                Says: ${entry.says.join(' ')}
                Thinks: ${entry.thinks.join(' ')}
                Feels: ${entry.feels.join(' ')}`; // Set hover text
            card.innerHTML = `
                <h3>${entry.name[0]} - ${entry.name[1]}</h3>
                <p> ${entry.does.join(', ')}</p>
                <p><strong>Says:</strong> ${entry.says.join(' ')}</p>
                <p><strong>Thinks:</strong> ${entry.thinks.join(' ')}</p>
                <p><strong>Feels:</strong> ${entry.feels.join(' ')}</p>
            `;
            cardContainer.appendChild(card);
        });

        // Function to show the current card
        function showCard(index) {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === index); // Show the current card
            });
        }

        // Event listeners for buttons
        document.getElementById('prevButton').addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : data.length - 1; // Loop back to last card if at start
            showCard(currentIndex);
        });

        document.getElementById('nextButton').addEventListener('click', () => {
            currentIndex = (currentIndex < data.length - 1) ? currentIndex + 1 : 0; // Loop back to first card if at end
            showCard(currentIndex);
        });
    })
    .catch(error => console.error('Error fetching the data:', error));