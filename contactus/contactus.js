// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Authentication handling from site-wide script
    if (typeof AuthService !== 'undefined') {
        AuthService.updateAuthUI();
    }

    // Profile dropdown toggle - matching the site's interaction patterns
    const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (profileIcon && dropdownMenu) {
        profileIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function(e) {
            if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Logout functionality - matching site's auth flow
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            if (typeof AuthService !== 'undefined') {
                await AuthService.logout();
                window.location.reload();
            }
        });
    }

    // Header visibility on scroll - matching about page
    let lastScrollPosition = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 150) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollPosition = currentScrollPosition;
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset form state
            resetFormState();

            // Validate form
            if (validateForm()) {
                // Show success message
                successMessage.style.display = 'flex';

                // Reset form fields
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

                // Scroll to top of form
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Reset error states for all form fields
    function resetFormState() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
                errorElement.textContent = '';
            }
        });
    }

    // Validate form fields
    function validateForm() {
        let isValid = true;

        // Required fields
        const requiredFields = [
            { id: 'firstName', errorId: 'firstNameError', message: 'Please enter your first name' },
            { id: 'lastName', errorId: 'lastNameError', message: 'Please enter your last name' },
            { id: 'email', errorId: 'emailError', message: 'Please enter your email address' },
            { id: 'phone', errorId: 'phoneError', message: 'Please enter your phone number' },
            { id: 'subject', errorId: 'subjectError', message: 'Please enter a subject' },
            { id: 'message', errorId: 'messageError', message: 'Please enter your message' }
        ];

        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            const formGroup = input.closest('.form-group');

            if (!input.value.trim()) {
                isValid = false;
                formGroup.classList.add('error');
                errorElement.textContent = field.message;
                errorElement.style.display = 'block';
            }
        });

        // Email validation
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailGroup = emailInput.closest('.form-group');

        if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
            isValid = false;
            emailGroup.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
        }

        // Phone validation
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phoneGroup = phoneInput.closest('.form-group');

        if (phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
            isValid = false;
            phoneGroup.classList.add('error');
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.style.display = 'block';
        }

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Phone validation helper
    function isValidPhone(phone) {
        // Basic validation for Indian phone numbers
        const re = /^[6-9]\d{9}$|^[0]?[6-9]\d{9}$|^[+]?[91][6-9]\d{9}$/;
        return re.test(String(phone).replace(/\s/g, ''));
    }

    // Input field validation on blur
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Check if field is required and empty
            if (this.hasAttribute('required') && !this.value.trim()) {
                const formGroup = this.closest('.form-group');
                const errorElement = formGroup.querySelector('.error-message');

                formGroup.classList.add('error');
                errorElement.textContent = `Please enter your ${this.previousElementSibling.textContent.toLowerCase().replace('*', '')}`;
                errorElement.style.display = 'block';
            }

            // Email validation
            if (this.id === 'email' && this.value.trim() && !isValidEmail(this.value)) {
                const formGroup = this.closest('.form-group');
                const errorElement = formGroup.querySelector('.error-message');

                formGroup.classList.add('error');
                errorElement.textContent = 'Please enter a valid email address';
                errorElement.style.display = 'block';
            }

            // Phone validation
            if (this.id === 'phone' && this.value.trim() && !isValidPhone(this.value)) {
                const formGroup = this.closest('.form-group');
                const errorElement = formGroup.querySelector('.error-message');

                formGroup.classList.add('error');
                errorElement.textContent = 'Please enter a valid phone number';
                errorElement.style.display = 'block';
            }
        });

        // Clear error state on focus
        input.addEventListener('focus', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('error');
            const errorElement = formGroup.querySelector('.error-message');
            errorElement.style.display = 'none';
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && validateEmail(emailInput.value)) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});
