function toggleForm(formType) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const buttons = document.querySelectorAll(".toggle-btn");

  if (formType === "login") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    buttons[0].classList.add("active");
    buttons[1].classList.remove("active");
    document.getElementById("login-email").focus();
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    buttons[0].classList.remove("active");
    buttons[1].classList.add("active");
    document.getElementById("signup-name").focus();
  }
}

// Profile Icon Dropdown Toggle
document
  .getElementById("profileIcon")
  .addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click from propagating to the document
    const dropdown = document.getElementById("dropdownMenu");
    // Toggle dropdown display between 'block' and 'none'
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

// Hide the dropdown menu if clicking anywhere outside of it
document.addEventListener("click", function () {
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown) {
    dropdown.style.display = "none";
  }
});

// Show login form by default on page load and check if user is already logged in
window.onload = function () {
  toggleForm("login");

  // Check if there's a redirect parameter
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get("redirect");

  // If user is already logged in, redirect or update UI
  if (typeof AuthService !== "undefined" && AuthService.isLoggedIn()) {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      updateAuthUI();
    }
  }
};

function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";  // Hide eye icon when password is visible
  } else {
    input.type = "password";
    icon.textContent = "👁️";  // Show eye icon when password is hidden
  }
}

// Function to show alert messages
function showAlert(message, type = "error") {
  const alertBox = document.getElementById("alert-message");
  if (alertBox) {
    alertBox.textContent = message;
    alertBox.className = "alert-message " + type;
    alertBox.style.display = "block";

    // Hide the alert after 5 seconds
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 5000);
  } else {
    // Fallback to regular alert
    alert(message);
  }
}

// Function to update UI based on authentication state
function updateAuthUI() {
  if (typeof AuthService === "undefined") return;

  const isLoggedIn = AuthService.isLoggedIn();
  const currentUser = AuthService.getCurrentUser();

  // Get UI elements
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");
  const profileContainer = document.querySelector(".profile-container");

  if (isLoggedIn && currentUser) {
    // User is logged in
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";

    // Show profile container
    if (profileContainer) profileContainer.style.display = "inline-block";

    // Add user name display
    const auth = document.querySelector(".auth");
    if (auth && !document.querySelector(".user-name")) {
      const userNameElem = document.createElement("span");
      userNameElem.className = "user-name";
      userNameElem.textContent = currentUser.name;
      userNameElem.style.marginRight = "10px";
      userNameElem.style.fontWeight = "bold";
      auth.insertBefore(userNameElem, profileContainer);
    }

    // Update dropdown to show Hello message
    const dropdown = document.getElementById("dropdownMenu");
    if (dropdown) {
      const links = dropdown.querySelectorAll("a");
      if (links.length > 0 && !dropdown.querySelector(".greeting")) {
        const greeting = document.createElement("div");
        greeting.className = "greeting";
        greeting.textContent = `Hello, ${currentUser.name}`;
        greeting.style.padding = "10px 15px";
        greeting.style.fontWeight = "bold";
        greeting.style.borderBottom = "1px solid #ddd";
        dropdown.insertBefore(greeting, links[0]);
      }
    }
  } else {
    // User is not logged in
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";

    // Hide profile container
    if (profileContainer) profileContainer.style.display = "none";

    // Remove user name if exists
    const userName = document.querySelector(".user-name");
    if (userName) userName.remove();
  }
}

// LOGIN FORM VALIDATION
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (email === "" || password === "") {
    showAlert("Please fill in all login fields.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showAlert("Please enter a valid email address.");
    return;
  }

  // Use AuthService if available
  if (typeof AuthService !== "undefined") {
    const result = AuthService.authenticate(email, password);

    if (result.success) {
      showAlert("Login successful!", "success");

      // Check if there's a redirect URL
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get("redirect");

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        window.location.href = "../Homepage/index.html";
      }
    } else {
      showAlert(result.message || "Invalid email or password");
    }
  } else {
    const doctorsData = localStorage.getItem("doctors");

    if (doctorsData) {
      const parsedArr = JSON.parse(doctorsData) ? JSON.parse(doctorsData) : [];

      const isDocAvailable = parsedArr.filter(
        (el) => el.email == email && el.password === password
      );
      if (isDocAvailable.length === 0) {
        showAlert("Please check the login credential");
        return;
      } else {
        localStorage.setItem("loggedUser", JSON.stringify(isDocAvailable[0]));
      }
    } else {
      showAlert("No user Found");
      return;
    }

    showAlert("Login successful!", "success");
    this.reset();
    window.location.href = "../bookings/bookings.html";
  }
});

// SIGNUP FORM VALIDATION
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const pass = document.getElementById("signup-password").value.trim();
  const confirm = document.getElementById("signup-confirm").value.trim();

  if (name === "" || email === "" || pass === "" || confirm === "") {
    showAlert("Please fill in all signup fields.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showAlert("Please enter a valid email address.");
    return;
  }

  if (pass !== confirm) {
    showAlert("Passwords do not match.");
    return;
  }

  if (pass.length < 6) {
    showAlert("Password must be at least 6 characters.");
    return;
  }

  // Use AuthService if available
  if (typeof AuthService !== "undefined") {
    const user = {
      name: name,
      email: email,
      password: pass,
      registeredOn: new Date().toISOString(),
    };

    const result = AuthService.register(user);

    if (result.success) {
      showAlert("Signup successful!", "success");

      // Check if there's a redirect URL
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get("redirect");

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        window.location.href = "../Homepage/index.html";
      }
    } else {
      showAlert(result.message || "Registration failed. Please try again.");
    }
  } else {
    const user = {
      name: name,
      email: email,
      password: pass,
      registeredOn: new Date().toISOString(),
    };
    // Fallback to original behavior
    const doctorsData = localStorage.getItem("doctors");

    if (doctorsData) {
      const parsedArr = JSON.parse(doctorsData) ? JSON.parse(doctorsData) : [];

      const isDocAvailable = parsedArr.filter((el) => el.email == email);

      if (isDocAvailable?.length > 0) {
        showAlert("Email already Exist!", "error");
        return;
      }

      const docNewArr = [user, ...parsedArr];
      localStorage.setItem("doctors", JSON.stringify(docNewArr));
    } else {
      localStorage.setItem("doctors", JSON.stringify([user]));
    }
    showAlert("Signup successful!", "success");
    this.reset();
  }
});

// Add logout functionality
document.addEventListener("DOMContentLoaded", function () {
  const logoutLink = document.querySelector("#dropdownMenu a:last-child");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof AuthService !== "undefined") {
        AuthService.logout();
        updateAuthUI();
        window.location.href = "../Homepage/index.html";
      }
    });
  }

  // Initialize UI based on auth state
  updateAuthUI();
});
