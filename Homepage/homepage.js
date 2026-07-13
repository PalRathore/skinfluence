/**
 * Homepage JavaScript
 * Provides additional functionality for the homepage
 */

// Header visibility on scroll
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      header.classList.add('header-hidden');
    } else if (window.scrollY < lastScrollY) {
      header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Profile Icon Dropdown Toggle
document.getElementById('profileIcon').addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent the click from propagating to the document
  const dropdown = document.getElementById('dropdownMenu');
  // Toggle dropdown display between 'block' and 'none'
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Hide the dropdown menu if clicking anywhere outside of it
document.addEventListener('click', function() {
  const dropdown = document.getElementById('dropdownMenu');
  if (dropdown) {
    dropdown.style.display = 'none';
  }
});

// Function to redirect to booking page
function redirectToBooking() {
  location.href = '../registration/registration.html';
}

// Add active class to current navigation item
document.addEventListener('DOMContentLoaded', function() {
  // Fix YouTube link that might have script tags embedded
  const youtubeLink = document.querySelector('.social-icons a[aria-label="YouTube"]');
  if (youtubeLink && youtubeLink.innerHTML.includes('<script')) {
    youtubeLink.innerHTML = '<img src="/Homepage/youtube.png" alt="YouTube" onerror="this.src=\'https://cdn-icons-png.flaticon.com/512/174/174883.png\'" width="24" height="24">';
  }
  
  // Update auth UI
  if (typeof AuthService !== 'undefined') {
    AuthService.updateAuthUI();
  }
});

// Get user data from localStorage
const loggedInUser = localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : null;

document.addEventListener("DOMContentLoaded", function() {
  // Update navigation based on login status
  updateNavigation();
  
  // Home page specific code
  // Fix YouTube link that might have script tags embedded
  const youtubeLink = document.querySelector('.social-icons a[aria-label="YouTube"]');
  if (youtubeLink && youtubeLink.innerHTML.includes('<script')) {
    youtubeLink.innerHTML = '<img src="/Homepage/youtube.png" alt="YouTube" onerror="this.src=\'https://cdn-icons-png.flaticon.com/512/174/174883.png\'" width="24" height="24">';
  }
  
  // Update auth UI
  if (typeof AuthService !== 'undefined') {
    AuthService.updateAuthUI();
  }
});

// Function to update navigation based on login status
function updateNavigation() {
  const authSection = document.querySelector('.auth');
  const loginButtons = authSection.querySelectorAll('.login');
  const profileContainer = document.querySelector('.profile-container');
  const profileName = document.createElement('span');
  profileName.className = 'user-name';
  
  if (loggedInUser) {
    // User is logged in - show profile, hide login/signup
    loginButtons.forEach(button => {
      button.style.display = 'none';
    });
    
    // Show user name next to profile icon
    profileName.textContent = loggedInUser.name || 'User';
    
    // Insert the name before the profile icon
    if (!authSection.querySelector('.user-name')) {
      authSection.insertBefore(profileName, profileContainer);
    }
    
    // Show profile container
    profileContainer.style.display = 'flex';
  } else {
    // User is not logged in - show login/signup, hide profile
    loginButtons.forEach(button => {
      button.style.display = 'inline-block';
    });
    
    // Remove user name if it exists
    const existingName = authSection.querySelector('.user-name');
    if (existingName) {
      authSection.removeChild(existingName);
    }
    
    // Hide profile container
    profileContainer.style.display = 'none';
  }
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  
  // Clear logged user data
  localStorage.removeItem('loggedUser');
  
  // Update navigation
  updateNavigation();
  
  // Redirect to homepage
  window.location.href = '../Homepage/index.html';
});

