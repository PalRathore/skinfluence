/**
 * Authentication Service
 * Handles user authentication, login state and session management
 */

const AuthService = {
  /**
   * Check if a user is currently logged in
   * @return {Boolean} True if a user is logged in
   */
  isLoggedIn: function() {
    return localStorage.getItem("loggedUser") !== null;
  },

  /**
   * Get the currently logged in user
   * @return {Object|null} The current user or null if not logged in
   */
  getCurrentUser: function() {
    try {
      return JSON.parse(localStorage.getItem("loggedUser"));
    } catch (e) {
      return null;
    }
  },

  /**
   * Authenticate a user with email and password
   * @param {String} email User's email
   * @param {String} password User's password
   * @return {Object} Result with success status and message
   */
  authenticate: function(email, password) {
    // Check if doctors data exists in localStorage
    const doctorsData = localStorage.getItem("doctors");
    if (!doctorsData) {
      return { success: false, message: "No users found" };
    }

    try {
      const users = JSON.parse(doctorsData);
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Store logged in user
        localStorage.setItem("loggedUser", JSON.stringify(user));
        return { success: true, user: user };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (e) {
      return { success: false, message: "Error during authentication" };
    }
  },

  /**
   * Register a new user
   * @param {Object} user User object with name, email, password
   * @return {Object} Result with success status and message
   */
  register: function(user) {
    if (!user.name || !user.email || !user.password) {
      return { success: false, message: "Missing required fields" };
    }

    // Check if doctors data exists in localStorage
    const doctorsData = localStorage.getItem("doctors");
    let users = [];
    
    if (doctorsData) {
      try {
        users = JSON.parse(doctorsData);
        
        // Check if email already exists
        if (users.some(u => u.email === user.email)) {
          return { success: false, message: "Email already exists" };
        }
      } catch (e) {
        // If parsing fails, start with empty array
        users = [];
      }
    }

    // Add the new user
    users.unshift(user);
    
    // Save back to localStorage
    localStorage.setItem("doctors", JSON.stringify(users));
    
    // Also log the user in
    localStorage.setItem("loggedUser", JSON.stringify(user));
    
    return { success: true, user: user };
  },

  /**
   * Add an appointment for the current user
   * @param {Object} appointmentData Appointment details
   * @return {Object} Result with success status
   */
  addAppointment: function(appointmentData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "User not logged in" };
    }

    // Get all users
    const doctorsData = localStorage.getItem("doctors");
    if (!doctorsData) {
      return { success: false, message: "User database not found" };
    }

    try {
      const users = JSON.parse(doctorsData);
      
      // Find current user in the array
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex === -1) {
        return { success: false, message: "User not found in database" };
      }

      // Add appointment to user's appointments
      if (!users[userIndex].appoitment) {
        users[userIndex].appoitment = [];
      }
      
      // Add new appointment to the beginning of the array
      users[userIndex].appoitment.unshift({
        doctor: appointmentData.doctor || "-",
        date: appointmentData.date || "-",
        time: appointmentData.time || "-",
        service: appointmentData.service || "-",
        consultationType: appointmentData.consultationType || "In-Person",
        status: "confirmed",
        bookingId: "SKF-" + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString()
      });

      // Update localStorage
      localStorage.setItem("doctors", JSON.stringify(users));
      
      // Update the logged in user as well
      localStorage.setItem("loggedUser", JSON.stringify(users[userIndex]));
      
      return { success: true };
    } catch (e) {
      return { success: false, message: "Error adding appointment" };
    }
  },

  /**
   * Logout the current user
   */
  logout: function() {
    localStorage.removeItem("loggedUser");
  },

  /**
   * Update the UI based on authentication state
   * This method should be called on page load
   */
  updateAuthUI: function() {
    const isLoggedIn = this.isLoggedIn();
    const currentUser = this.getCurrentUser();

    // Get UI elements
    const authSection = document.querySelector('.auth');
    if (!authSection) return; // Skip if no auth section found
    
    const loginButtons = authSection.querySelectorAll('.login');
    const profileContainer = document.querySelector('.profile-container');
    
    if (isLoggedIn && currentUser) {
      // User is logged in - hide login/signup buttons
      loginButtons.forEach(button => {
        button.style.display = 'none';
      });
      
      // Show user name next to profile icon
      if (!authSection.querySelector('.user-name')) {
        const profileName = document.createElement('span');
        profileName.className = 'user-name';
        profileName.textContent = currentUser.name || 'User';
        authSection.insertBefore(profileName, profileContainer);
      }
      
      // Show profile container
      if (profileContainer) {
        profileContainer.style.display = 'flex';
      }
    } else {
      // User is not logged in - show login/signup
      loginButtons.forEach(button => {
        button.style.display = 'inline-block';
      });
      
      // Remove user name if it exists
      const existingName = authSection.querySelector('.user-name');
      if (existingName) {
        authSection.removeChild(existingName);
      }
      
      // Hide profile container
      if (profileContainer) {
        profileContainer.style.display = 'none';
      }
    }
  }
};

// Set up logout functionality
document.addEventListener("DOMContentLoaded", function() {
  // Initialize UI based on auth state
  AuthService.updateAuthUI();
  
  // Set up logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      AuthService.logout();
      window.location.href = '../Homepage/index.html';
    });
  }
});