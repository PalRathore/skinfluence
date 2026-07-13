document.addEventListener('DOMContentLoaded', function() {
    // ==============================
    // Navigation Bar: Profile Dropdown
    // ==============================
    const profileIcon = document.getElementById('profileIcon');
    const dropdown = document.getElementById('dropdownMenu');
    const dateInput = document.getElementById('appointment-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  
    if (profileIcon && dropdown) {
      // Toggle dropdown when clicking the profile icon
      profileIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from bubbling up
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
    
      // Hide the dropdown if clicking anywhere outside of it
      document.addEventListener('click', function() {
        dropdown.style.display = 'none';
      });
    }
  
    
    
    // ==============================
    // GSAP Animations for Info Panel Content
    // ==============================
    gsap.to('.info-content h2', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2
    });
    
    gsap.to('.info-content p', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.4
    });
    
    // Add a subtle scroll effect for the info panel text
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const infoContent = document.querySelector('.info-content');
        
        if (infoContent && scrollPosition < 300) {
            // Subtle parallax effect when scrolling
            infoContent.style.transform = `translateY(${-10 - scrollPosition * 0.05}%)`;
        }
    });

    // ==============================
    // Form Submission Handler
    // ==============================
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // ==== Validation ====
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const age = parseInt(document.getElementById('age').value.trim());
      const gender = document.getElementById('gender').value;
      const disease = document.getElementById('disease').value;
      const blood = document.getElementById('blood').value;
      const doctor = document.getElementById('doctor')?.value || ""; // optional chaining
      const address = document.getElementById('address').value.trim();
      const date = document.getElementById('appointment-date').value;
      const time = document.getElementById('appointment-time').value;
  
      if (!name || !email || !phone || !age || !gender || !disease || !blood || !doctor || !address || !date || !time) {
        alert('Please fill in all required fields.');
        return;
      }
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a 10-digit phone number.');
        return;
      }
  
      if (age < 1 || age > 120 || isNaN(age)) {
        alert('Please enter a valid age between 1 and 120.');
        return;
      }
  
      // ==== Show loading spinner ====
      const loading = document.querySelector('.loading');
      if (loading) {
        loading.style.display = 'flex';
      }
  
      // ==== Simulate API call ====
      setTimeout(() => {
        if (loading) {
          loading.style.display = 'none';
        }
  
        // ==== Show success message ====
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
          successMessage.style.transform = 'translateX(0)';
          setTimeout(() => {
            successMessage.style.transform = 'translateX(200%)';
          }, 3000);
        }
  
        // ==== Reset the form ====
        registrationForm.reset();
      }, 1500);
  
      });
    }

    // ==============================
    // Add form validation
    // ==============================
    const form = document.getElementById('registrationForm');
    const fileUpload = document.getElementById('prescription-upload');
    const photoUpload = document.getElementById('condition-photos');
    const submitBtn = document.getElementById('submit-btn');
    
    // Max file size: 5MB
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    
    // Add error message elements to required fields
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
      // Create error message element
      const errorMessage = document.createElement('span');
      errorMessage.className = 'error-message';
      
      // Set specific error messages based on field type
      if (field.id === 'name') {
        errorMessage.textContent = 'Please enter your full name';
      } else if (field.id === 'gender') {
        errorMessage.textContent = 'Please select your gender';
      } else if (field.id === 'age') {
        errorMessage.textContent = 'Please enter a valid age (1-120)';
      } else if (field.id === 'disease') {
        errorMessage.textContent = 'Please select your concern';
      } else if (field.id === 'doctor') {
        errorMessage.textContent = 'Please select a doctor';
      } else if (field.id === 'description') {
        errorMessage.textContent = 'Please provide a description of your condition';
      } else if (field.id === 'blood') {
        errorMessage.textContent = 'Please select your blood group';
      } else if (field.id === 'address') {
        errorMessage.textContent = 'Please enter your address';
      } else if (field.id === 'email') {
        errorMessage.textContent = 'Please enter a valid email address';
      } else if (field.id === 'phone') {
        errorMessage.textContent = 'Please enter a valid phone number';
      }
      
      // Add error message after the field
      field.parentNode.appendChild(errorMessage);
      
      // Add input event listener for validation
      field.addEventListener('input', function() {
        validateField(field);
      });
      
      // Add blur event listener for validation
      field.addEventListener('blur', function() {
        validateField(field);
      });
    });
    
    // Validate file size for prescription upload
    fileUpload.addEventListener('change', function(e) {
      validateFileSize(fileUpload);
    });
    
    // Validate file sizes for condition photos
    photoUpload.addEventListener('change', function(e) {
      validateFileSize(photoUpload, true);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all required fields
      let isValid = true;
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      // Validate file uploads
      if (!validateFileSize(fileUpload) || !validateFileSize(photoUpload, true)) {
        isValid = false;
      }
      
      // If form is valid, show loading animation and proceed
      if (isValid) {
        // Show loading spinner
        document.querySelector('.loading').style.display = 'flex';
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(function() {
          // Hide loading spinner
          document.querySelector('.loading').style.display = 'none';
          
          // Show success message
          document.querySelector('.success-message').style.display = 'block';
          
          // Redirect to bookings page after a short delay
          setTimeout(function() {
            window.location.href = '../bookings/bookings.html';
          }, 2000);
        }, 1500);
      } else {
        // Scroll to the first error
        const firstError = form.querySelector('.input-group.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    
    // Field validation function
    function validateField(field) {
      const parentGroup = field.closest('.input-group');
      let isValid = true;
      
      // Clear previous validation states
      parentGroup.classList.remove('error', 'success');
      
      // Check if field is required and empty
      if (field.hasAttribute('required') && !field.value.trim()) {
        parentGroup.classList.add('error');
        isValid = false;
      }
      
      // Specific validation for email
      if (field.id === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
          parentGroup.classList.add('error');
          isValid = false;
        }
      }
      
      // Specific validation for phone
      if (field.id === 'phone' && field.value.trim()) {
        const phoneRegex = /^\d{10}$|^\(\d{3}\)\s?\d{3}-\d{4}$/;
        if (!phoneRegex.test(field.value.trim().replace(/\s/g, ''))) {
          parentGroup.classList.add('error');
          isValid = false;
        }
      }
      
      // Specific validation for age
      if (field.id === 'age' && field.value.trim()) {
        const age = parseInt(field.value.trim());
        if (isNaN(age) || age < 1 || age > 120) {
          parentGroup.classList.add('error');
          isValid = false;
        }
      }
      
      // Add success class if valid
      if (isValid && field.value.trim()) {
        parentGroup.classList.add('success');
      }
      
      return isValid;
    }
    
    // File size validation function
    function validateFileSize(fileInput, isMultiple = false) {
      if (!fileInput.files || fileInput.files.length === 0) {
        return true; // No files selected, that's fine since it's optional
      }
      
      const parentContainer = fileInput.closest('.upload-container');
      
      // Remove any existing error messages
      const existingError = parentContainer.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Check each file
      let isValid = true;
      
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        
        if (file.size > MAX_FILE_SIZE) {
          isValid = false;
          
          // Create and add error message
          const errorMessage = document.createElement('span');
          errorMessage.className = 'error-message';
          errorMessage.textContent = `File "${file.name}" exceeds the maximum size of 5MB`;
          errorMessage.style.display = 'block';
          parentContainer.appendChild(errorMessage);
          
          // Only show the first error for multiple files
          if (isMultiple) break;
        }
      }
      
      return isValid;
    }
  });

