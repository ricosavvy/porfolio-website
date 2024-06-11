// Fetch repositories from GitHub API
const repoUrl = 'http://localhost:3000/api/github/repos'; // Backend endpoint for fetching GitHub repos

fetch(repoUrl)
  .then(response => response.json())
  .then(data => {
    displayRepos(data, 'repo-slide-container');
  })
  .catch(error => {
    console.error('Error fetching GitHub repositories:', error);
  });

// Fetch reviews from backend API
const reviewUrl = 'http://localhost:3000/reviews'; 

fetch(reviewUrl)
    .then(response => response.json())
    .then(data => {
        displayReviews(data, 'review-slide-container');
    })
    .catch(error => {
        console.error('Error fetching reviews:', error);
    });



function displayRepos(repos, containerId) {
    const container = document.getElementById(containerId);

    repos.forEach(repo => {
        const card = createCard(repo);
        container.appendChild(card);
    });
}

function displayReviews(reviews, containerId) {
    const container = document.getElementById(containerId);

    reviews.forEach(review => {
        const card = createReviewCard(review);
        container.appendChild(card);
    });
}



function createCard(data) {
    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.description}</p>
        <a href="${data.html_url}" target="_blank">View on GitHub</a>
        <p>Stars: <span>${data.stargazers_count}</span></p>
    `;

    return card;
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.classList.add('review-card');

    card.innerHTML = `
        <p><strong>Email:</strong> ${review.email}</p>
        <p><strong>Comment:</strong> ${review.comment}</p>
        <p><strong>Rating:</strong> ${review.rating}</p>
    `;

    return card;
}



function slideContainers(containerId, distance) {
    const container = document.getElementById(containerId);
    container.scrollBy({
        left: distance,
        behavior: 'smooth'
    });
}

// Event listeners for sliding
document.getElementById('slide-left-repo').addEventListener('click', () => {
    slideContainers('repo-slide-container', -300); // Slide left repos by 300 pixels
});

document.getElementById('slide-right-repo').addEventListener('click', () => {
    slideContainers('repo-slide-container', 300); // Slide right repos by 300 pixels
});

document.getElementById('slide-left-review').addEventListener('click', () => {
    slideContainers('review-slide-container', -300); // Slide left reviews by 300 pixels
});

document.getElementById('slide-right-review').addEventListener('click', () => {
    slideContainers('review-slide-container', 300); // Slide right reviews by 300 pixels
});



// Image slider using setInterval
const myImage = document.querySelector("img");
const pics = [
    "images/1.jpeg", 
    "images/2.jpeg", 
    "th.jpeg", 
    "images/5.png", 
    "images/4.jpeg", 
    "images/th (1).jpeg",
    "images/th (2).jpeg",
    "images/th (3).jpeg"
];
let tracker = 0;

const changeImage = async () => {
    myImage.setAttribute("src", pics[tracker]);
    tracker = (tracker + 1) % pics.length;
};

setInterval(async () => {
    await changeImage();
}, 5000);


// Event listener for submitting review form
document.getElementById('review-form').addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('review-email').value;
    const comment = document.getElementById('review-comment').value;
    const rating = document.getElementById('review-rating').value;

    // Clear form fields after submission
    document.getElementById('review-email').value = '';
    document.getElementById('review-comment').value = '';
    document.getElementById('review-rating').value = '0';

    // POST data to backend
    const formData = {
        email: email,
        comment: comment,
        rating: parseInt(rating) // Ensure rating is sent as an integer
    };

    fetch('http://localhost:3000/reviews/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Review submitted successfully:', data);
    
        fetch(reviewUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('review-slide-container').innerHTML = ''; // Clear existing reviews
                displayReviews(data, 'review-slide-container'); // Re-render reviews after submission
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    })
    .catch(error => {
        console.error('Error submitting review:', error);
    });
});

// Toggle light/dark mode
const btn = document.querySelector("#but");
const white = "rgb(255, 255, 255)";
const dark = "#0d1117"; // GitHub's dark mode background color

btn.addEventListener("click", () => {
    const currentColor = document.body.style.backgroundColor;
    if (currentColor === white || currentColor === "") {
        document.body.style.backgroundColor = dark;
        document.body.style.color = white;
    } else {
        document.body.style.backgroundColor = white;
        document.body.style.color = dark;
    }
});

//contact form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const response = await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    if (response.ok) {
        alert('Message sent successfully!');
    } else {
        alert('Failed to send message. Please try again.');
    }

    document.getElementById('contact-form').reset();
});
