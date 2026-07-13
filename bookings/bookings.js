var app = angular.module('bookingApp', []);
        
app.controller('BookingController', function($scope, $timeout, $window) {
    // Check if user is logged in immediately when controller loads
    const isLoggedIn = localStorage.getItem("loggedUser") !== null;
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        $window.location.href = '../login/login.html?redirect=' + encodeURIComponent('../bookings/bookings.html');
        return;
    }
    
    // Profile dropdown functionality
    $timeout(function() {
        const profileIcon = document.getElementById('profileIcon');
        const dropdown = document.getElementById('dropdownMenu');
        
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
    });

    // Check if user is logged in
    $scope.isUserLoggedIn = function() {
        return localStorage.getItem("loggedUser") !== null;
    };

    // Initialize with reduced dataset initially
    $scope.doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialty: 'Dermatologist, MD',
            experience: '15+ years',
            // Only include current month's availability initially
            availability: getCurrentMonthAvailability(1)
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            specialty: 'Dermatologist, MD',
            experience: '10+ years',
            // Only include current month's availability initially
            availability: getCurrentMonthAvailability(2)
        }
    ];
    
    // Function to get only current month's availability data
    function getCurrentMonthAvailability(doctorId) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Full availability data
        const allData = {
            1: [
                { date: new Date(2025, 3, 11), slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
                { date: new Date(2025, 3, 12), slots: ['11:00 AM', '1:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 15), slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'] },
                { date: new Date(2025, 3, 17), slots: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 19), slots: ['9:00 AM', '11:00 AM', '1:00 PM'] },
                { date: new Date(2025, 3, 22), slots: ['10:00 AM', '2:00 PM', '3:00 PM'] },
                { date: new Date(2025, 3, 24), slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM'] }
            ],
            2: [
                { date: new Date(2025, 3, 10), slots: ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 13), slots: ['9:00 AM', '1:00 PM', '2:00 PM'] },
                { date: new Date(2025, 3, 16), slots: ['10:00 AM', '11:00 AM', '3:00 PM'] },
                { date: new Date(2025, 3, 18), slots: ['9:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 20), slots: ['11:00 AM', '1:00 PM', '3:00 PM'] },
                { date: new Date(2025, 3, 23), slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
                { date: new Date(2025, 3, 25), slots: ['11:00 AM', '1:00 PM', '3:00 PM', '4:00 PM'] }
            ]
        };
        
        // Filter only current month data
        return allData[doctorId].filter(item => 
            item.date.getMonth() === currentMonth && 
            item.date.getFullYear() === currentYear
        );
    }
    
    // Services list
    $scope.services = [
        { id: 1, name: 'Dermatology Consultation', price: 120 },
        { id: 2, name: 'Acne Treatment', price: 150 },
        { id: 3, name: 'Skin Cancer Screening', price: 200 },
        { id: 4, name: 'Hair Loss Consultation', price: 130 },
        { id: 5, name: 'Eczema Treatment', price: 140 },
        { id: 6, name: 'Psoriasis Management', price: 160 },
        { id: 7, name: 'Mole Removal Consultation', price: 180 },
        { id: 8, name: 'Cosmetic Dermatology', price: 250 }
    ];
    
    // Consultation types
    $scope.consultationTypes = [
        { id: 1, name: 'In-Person' },
        { id: 2, name: 'Online Video' },
        { id: 3, name: 'Phone Consultation' }
    ];
    
    // Load full availability data when a doctor is selected (lazy loading)
    const fullAvailabilityLoaded = { 1: false, 2: false };
    
    function loadFullAvailability(doctorId) {
        if (fullAvailabilityLoaded[doctorId]) return;
        
        const fullData = {
            1: [
                { date: new Date(2025, 3, 11), slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] },
                { date: new Date(2025, 3, 12), slots: ['11:00 AM', '1:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 15), slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'] },
                { date: new Date(2025, 3, 17), slots: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 19), slots: ['9:00 AM', '11:00 AM', '1:00 PM'] },
                { date: new Date(2025, 3, 22), slots: ['10:00 AM', '2:00 PM', '3:00 PM'] },
                { date: new Date(2025, 3, 24), slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM'] },
                // Add more dates for next month
                { date: new Date(2025, 4, 2), slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
                { date: new Date(2025, 4, 5), slots: ['11:00 AM', '1:00 PM', '3:00 PM'] },
                { date: new Date(2025, 4, 8), slots: ['9:00 AM', '10:00 AM', '4:00 PM'] }
            ],
            2: [
                { date: new Date(2025, 3, 10), slots: ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 13), slots: ['9:00 AM', '1:00 PM', '2:00 PM'] },
                { date: new Date(2025, 3, 16), slots: ['10:00 AM', '11:00 AM', '3:00 PM'] },
                { date: new Date(2025, 3, 18), slots: ['9:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'] },
                { date: new Date(2025, 3, 20), slots: ['11:00 AM', '1:00 PM', '3:00 PM'] },
                { date: new Date(2025, 3, 23), slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
                { date: new Date(2025, 3, 25), slots: ['11:00 AM', '1:00 PM', '3:00 PM', '4:00 PM'] },
                // Add more dates for next month
                { date: new Date(2025, 4, 3), slots: ['10:00 AM', '11:00 AM', '3:00 PM'] },
                { date: new Date(2025, 4, 6), slots: ['9:00 AM', '1:00 PM', '4:00 PM'] },
                { date: new Date(2025, 4, 9), slots: ['10:00 AM', '2:00 PM', '3:00 PM'] }
            ]
        };
        
        const doctor = $scope.doctors.find(d => d.id === doctorId);
        if (doctor) {
            doctor.availability = fullData[doctorId];
            fullAvailabilityLoaded[doctorId] = true;
        }
    }
    
    // Calendar setup - optimize by limiting rows
    $scope.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $scope.currentDate = new Date();
    $scope.currentMonth = moment($scope.currentDate).format('MMMM YYYY');
    $scope.calendarDays = [];
    
    // Default time slots - only most common slots initially
    $scope.timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', 
        '1:00 PM', '2:00 PM', '3:00 PM'
    ];
    
    // Selected values
    $scope.selectedDoctor = null;
    $scope.selectedDate = null;
    $scope.selectedTimeSlot = null;
    $scope.selectedService = null;
    $scope.selectedConsultationType = $scope.consultationTypes[0]; // Default to In-Person
    $scope.showNotification = false;
    $scope.errorMessage = '';
    
    // More efficient calendar generation
    $scope.generateCalendar = function() {
        $scope.calendarDays = [];
        
        // Get first day of the month
        var firstDay = new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth(), 1);
        var lastDay = new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() + 1, 0);
        
        // Add days from previous month to fill first week
        var startingDayOfWeek = firstDay.getDay();
        var prevMonthLastDay = new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth(), 0).getDate();
        
        for (var i = startingDayOfWeek - 1; i >= 0; i--) {
            $scope.calendarDays.push({
                date: new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() - 1, prevMonthLastDay - i)
            });
        }
        
        // Add days from current month
        for (var i = 1; i <= lastDay.getDate(); i++) {
            $scope.calendarDays.push({
                date: new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth(), i)
            });
        }
        
        // Limit to 5 weeks (35 days) max for better performance
        var remainingDays = Math.min(35 - $scope.calendarDays.length, 7);
        for (var i = 1; i <= remainingDays; i++) {
            $scope.calendarDays.push({
                date: new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() + 1, i)
            });
        }
        
        $scope.currentMonth = moment($scope.currentDate).format('MMMM YYYY');
    };
    
    // Navigate to previous month
    $scope.prevMonth = function() {
        $scope.currentDate = new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() - 1, 1);
        $scope.generateCalendar();
    };
    
    // Navigate to next month
    $scope.nextMonth = function() {
        $scope.currentDate = new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() + 1, 1);
        $scope.generateCalendar();
    };
    
    // Select a doctor - optimized to load data as needed
    $scope.selectDoctor = function(doctor) {
        $scope.selectedDoctor = doctor;
        $scope.selectedDate = null;
        $scope.selectedTimeSlot = null;
        
        // Load full availability data for this doctor
        loadFullAvailability(doctor.id);
        
        $scope.generateCalendar();
    };
    
    // Check if a doctor is available on a specific date
    $scope.isDoctorAvailable = function(day) {
        if (!$scope.selectedDoctor || !day || !day.date) return false;
        
        return $scope.selectedDoctor.availability.some(function(avail) {
            return avail.date.getDate() === day.date.getDate() && 
                   avail.date.getMonth() === day.date.getMonth() && 
                   avail.date.getFullYear() === day.date.getFullYear();
        });
    };
    
    // Check if a date is selected
    $scope.isSelectedDate = function(day) {
        if (!$scope.selectedDate || !day || !day.date) return false;
        
        return $scope.selectedDate.date.getDate() === day.date.getDate() && 
               $scope.selectedDate.date.getMonth() === day.date.getMonth() && 
               $scope.selectedDate.date.getFullYear() === day.date.getFullYear();
    };
    
    // Select a date
    $scope.selectDate = function(day) {
        if (!$scope.isDoctorAvailable(day)) return;
        
        $scope.selectedDate = day;
        $scope.selectedTimeSlot = null;
    };
    
    // Check if a time slot is available
    $scope.isTimeSlotAvailable = function(slot) {
        if (!$scope.selectedDoctor || !$scope.selectedDate) return false;
        
        var availableDay = $scope.selectedDoctor.availability.find(function(avail) {
            return avail.date.getDate() === $scope.selectedDate.date.getDate() && 
                   avail.date.getMonth() === $scope.selectedDate.date.getMonth() && 
                   avail.date.getFullYear() === $scope.selectedDate.date.getFullYear();
        });
        
        return availableDay && availableDay.slots.includes(slot);
    };
    
    // Select a time slot
    $scope.selectTimeSlot = function(slot) {
        if (!$scope.isTimeSlotAvailable(slot)) return;
        $scope.selectedTimeSlot = slot;
    };
    
    // Format date for display
    $scope.formatDate = function(date) {
        return moment(date).format('dddd, MMMM D, YYYY');
    };
    
    // Check if booking is possible
    $scope.canBook = function() {
        return $scope.selectedDoctor && 
               $scope.selectedDate && 
               $scope.selectedTimeSlot && 
               $scope.selectedService &&
               $scope.selectedConsultationType;
    };
    
    // Book appointment
    $scope.bookAppointment = function() {
        if (!$scope.isUserLoggedIn()) {
            // Redirect to login page with redirect back to bookings page
            $window.location.href = '../login/login.html?redirect=' + encodeURIComponent('../bookings/bookings.html');
            return;
        }
        
        if (!$scope.canBook()) {
            $scope.errorMessage = 'Please complete all booking details';
            return;
        }
        
        // Format the date for storage
        const formattedDate = moment($scope.selectedDate.date).format('YYYY-MM-DD');
        
        const bookingDetails = {
            doctor: $scope.selectedDoctor.name,
            date: formattedDate,
            time: $scope.selectedTimeSlot,
            service: $scope.selectedService.name,
            consultationType: $scope.selectedConsultationType.name,
            price: $scope.selectedService.price
        };
        
        // Use the AuthService to add the appointment
        if (typeof AuthService !== 'undefined') {
            const result = AuthService.addAppointment(bookingDetails);
            
            if (result.success) {
                // Show success notification
                $scope.showNotification = true;
                $scope.errorMessage = '';
                
                $timeout(function() {
                    $scope.showNotification = false;
                    // Redirect to payment page
                    $window.location.href = '../payment/payment.html';
                }, 1500);
            } else {
                $scope.errorMessage = result.message || 'Error booking appointment';
            }
        } else {
            // Fallback to old method if AuthService is not available
            const loggedInUser = localStorage.getItem("loggedUser")
                ? JSON.parse(localStorage.getItem("loggedUser"))
                : {};
            const doctorsData = localStorage.getItem("doctors")
                ? JSON.parse(localStorage.getItem("doctors"))
                : [];
                
            if (loggedInUser && doctorsData) {
                const remainUser = doctorsData.filter(
                    (el) => el.email !== loggedInUser.email
                );

                const user = {
                    ...loggedInUser,
                    appoitment: loggedInUser?.appoitment
                    ? [
                        {
                            doctor: bookingDetails.doctor || "-",
                            date: bookingDetails.date || "-",
                            time: bookingDetails.time || "-",
                            service: bookingDetails.service || "-",
                            consultationType: bookingDetails.consultationType || "In-Person"
                        },
                        ...loggedInUser?.appoitment,
                        ]
                    : [
                        {
                            doctor: bookingDetails.doctor || "-",
                            date: bookingDetails.date || "-",
                            time: bookingDetails.time || "-",
                            service: bookingDetails.service || "-",
                            consultationType: bookingDetails.consultationType || "In-Person"
                        },
                    ],
                };

                const data = [user, ...remainUser];
                localStorage.setItem("loggedUser", JSON.stringify(user));
                localStorage.setItem("doctors", JSON.stringify(data));
                
                // Show success notification and redirect
                $scope.showNotification = true;
                $scope.errorMessage = '';
                
                $timeout(function() {
                    $scope.showNotification = false;
                    // Redirect to payment page
                    $window.location.href = '../payment/payment.html';
                }, 1500);
            } else {
                $scope.errorMessage = 'You must be logged in to book an appointment';
            }
        }
    };
    
    // Reset form
    $scope.resetForm = function() {
        $scope.selectedDoctor = null;
        $scope.selectedDate = null;
        $scope.selectedTimeSlot = null;
        $scope.selectedService = null;
        $scope.selectedConsultationType = $scope.consultationTypes[0];
    };
    
    // Initialize calendar
    $scope.generateCalendar();
    
    // Initialize AuthService on page load if available
    $timeout(function() {
        if (typeof AuthService !== 'undefined') {
            AuthService.updateAuthUI();
        }
    });
});