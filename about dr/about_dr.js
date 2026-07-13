// Angular App
angular.module('doctorProfileApp', [])
.controller('DoctorProfileController', function($scope) {
  // Doctor Data - Reduced to only 2 doctors
  $scope.doctors = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      title: "Chief Dermatologist",
      specialization: "General Dermatology",
      experience: 15,
      patients: 5000,
      rating: 4.9,
      image: "doctor-female.png", // Female doctor image
      shortBio: "Specializing in general dermatology with 15+ years of experience treating various skin conditions.",
      fullBio: "Dr. Jane Doe is a board-certified dermatologist with extensive experience in diagnosing and treating all types of skin conditions. Her compassionate approach and commitment to staying updated with the latest medical advancements make her a trusted choice for patients of all ages.",
      languages: ["English", "Hindi", "French"],
      expertise: [
        "Acne & Rosacea Treatment",
        "Eczema & Psoriasis Management",
        "Skin Cancer Screening",
        "Medical Dermatology"
      ],
      education: [
        {
          year: "2000-2004",
          degree: "MBBS",
          institution: "All India Institute of Medical Sciences, Delhi"
        },
        {
          year: "2004-2007",
          degree: "MD in Dermatology",
          institution: "King's College London"
        }
      ],
      workExperience: [
        {
          year: "2007-2012",
          position: "Dermatologist",
          company: "City Hospital, Mumbai"
        },
        {
          year: "2012-Present",
          position: "Chief Dermatologist",
          company: "Skinfluence Dermatology, Indore"
        }
      ],
      schedule: [
        { day: "Monday", times: ["10:00 AM - 1:00 PM", "4:00 PM - 7:00 PM"] },
        { day: "Tuesday", times: ["10:00 AM - 1:00 PM"] },
        { day: "Wednesday", times: ["4:00 PM - 8:00 PM"] },
        { day: "Thursday", times: ["10:00 AM - 1:00 PM", "4:00 PM - 7:00 PM"] },
        { day: "Friday", times: ["10:00 AM - 1:00 PM"] },
        { day: "Saturday", times: ["11:00 AM - 3:00 PM"] },
        { day: "Sunday", times: [] }
      ],
      reviews: [
        {
          name: "Priya Sharma",
          image: "patient1.jpg",
          date: "March 15, 2025",
          rating: 5,
          comment: "Dr. Jane is incredibly knowledgeable and has helped me manage my chronic skin condition effectively. Highly recommend!"
        },
        {
          name: "Rahul Mehra",
          image: "patient2.jpg",
          date: "February 22, 2025",
          rating: 4,
          comment: "Very professional and thorough in her examination. The treatment prescribed worked well for my acne."
        }
      ]
    },
    {
      id: 2,
      name: "Dr. John Smith",
      title: "Cosmetic Dermatologist",
      specialization: "Cosmetic Dermatology",
      experience: 12,
      patients: 3500,
      rating: 4.8,
      image: "doctor-male.png", // Male doctor image
      shortBio: "Specializing in cosmetic dermatology procedures with focus on anti-aging treatments and skin rejuvenation.",
      fullBio: "Dr. John Smith is a renowned cosmetic dermatologist known for his artistic approach to facial aesthetics. He combines his medical expertise with a keen eye for beauty to deliver natural-looking results that enhance your inherent features.",
      languages: ["English", "Hindi", "German"],
      expertise: [
        "Botox & Dermal Fillers",
        "Chemical Peels",
        "Laser Treatments",
        "Non-surgical Facelifts"
      ],
      education: [
        {
          year: "2003-2009",
          degree: "MBBS",
          institution: "Johns Hopkins University, USA"
        },
        {
          year: "2009-2013",
          degree: "Specialization in Cosmetic Dermatology",
          institution: "University of California"
        }
      ],
      workExperience: [
        {
          year: "2013-2018",
          position: "Cosmetic Dermatologist",
          company: "Beverly Hills Clinic, USA"
        },
        {
          year: "2018-Present",
          position: "Senior Cosmetic Dermatologist",
          company: "Skinfluence Dermatology, Indore"
        }
      ],
      schedule: [
        { day: "Monday", times: ["9:00 AM - 2:00 PM"] },
        { day: "Tuesday", times: ["3:00 PM - 8:00 PM"] },
        { day: "Wednesday", times: [] },
        { day: "Thursday", times: ["9:00 AM - 2:00 PM"] },
        { day: "Friday", times: ["3:00 PM - 8:00 PM"] },
        { day: "Saturday", times: ["10:00 AM - 2:00 PM"] },
        { day: "Sunday", times: [] }
      ],
      reviews: [
        {
          name: "Anita Kumar",
          image: "patient3.jpg",
          date: "April 5, 2025",
          rating: 5,
          comment: "Dr. Smith's expertise with fillers is amazing. I look years younger with very natural results!"
        },
        {
          name: "Ravi Patel",
          image: "patient4.jpg",
          date: "March 12, 2025",
          rating: 5,
          comment: "The laser treatment I received for my acne scars has transformed my skin. Very satisfied with the results."
        }
      ]
    }
  ];
  
  // Initialize
  $scope.selectedSpecialization = 'all';
  $scope.filteredDoctors = $scope.doctors;
  $scope.modalOpen = false;
  $scope.selectedDoctor = {};
  $scope.activeTab = 'about';
  
  // Function to get correct image dimensions
  $scope.getImageStyle = function() {
    return {
      'width': '100%',
      'height': 'auto',
      'object-fit': 'cover',
      'background-size': 'cover',
    };
  };
  
  // Improved experience display function
  $scope.formatExperience = function(doctor) {
    if (!doctor || !doctor.workExperience || doctor.workExperience.length === 0) return 'No experience data available';
    
    // Create a nicely formatted experience string
    return doctor.workExperience.map(function(exp) {
      return `${exp.year}: ${exp.position} at ${exp.company}`;
    }).join(', ');
  };
  
  // Calculate total years of experience (more accurate)
  $scope.calculateTotalExperience = function(doctor) {
    if (!doctor || !doctor.experience) return 0;
    return doctor.experience;
  };
  
  // Filter doctors by specialization
  $scope.filterDoctors = function(specialization) {
    $scope.selectedSpecialization = specialization;
    
    if (specialization === 'all') {
      $scope.filteredDoctors = $scope.doctors;
    } else {
      $scope.filteredDoctors = $scope.doctors.filter(function(doctor) {
        return doctor.specialization === specialization;
      });
    }
  };
  
  // Open doctor profile modal with improved handling
  $scope.openModal = function(doctor) {
    if (!doctor) return;
    
    $scope.selectedDoctor = doctor;
    $scope.modalOpen = true;
    $scope.activeTab = 'about';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Focus trap for accessibility
    setTimeout(function() {
      const modalElement = document.querySelector('.doctor-modal');
      if (modalElement) {
        modalElement.focus();
      }
    }, 100);
  };
  
  // Close doctor profile modal with cleanup
  $scope.closeModal = function() {
    $scope.modalOpen = false;
    document.body.style.overflow = ''; // Re-enable scrolling
    $scope.selectedDoctor = {};
  };
  
  // Set active tab in modal
  $scope.setActiveTab = function(tab) {
    if (!tab) return;
    $scope.activeTab = tab;
  };
  
  // Generate stars array for reviews with error handling
  $scope.getStars = function(rating) {
    if (!rating || rating < 0 || rating > 5) return new Array(0);
    return new Array(Math.round(Math.min(5, Math.max(0, rating))));
  };
  
  // Get empty stars (for 5-star rating system)
  $scope.getEmptyStars = function(rating) {
    if (!rating || rating < 0) return new Array(5);
    const emptyStars = 5 - Math.round(Math.min(5, Math.max(0, rating)));
    return new Array(Math.max(0, emptyStars));
  };
  
  // Check if a doctor has available appointments on a given day
  $scope.hasAppointments = function(schedule) {
    if (!schedule || !schedule.times) return false;
    return schedule.times.length > 0;
  };
});

// Document ready function with additional image handling
document.addEventListener('DOMContentLoaded', function() {
  // Handle doctor images proper sizing
  function adjustDoctorImages() {
    const doctorImages = document.querySelectorAll('.doctor-image');
    doctorImages.forEach(function(img) {
      img.style.width = '448.2px';
      img.style.height = '250px';
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center';
    });
    
    // Also adjust specialty labels
    const specialtyLabels = document.querySelectorAll('.specialty-label');
    specialtyLabels.forEach(function(label) {
      // Position at bottom of image
      label.style.position = 'absolute';
      label.style.bottom = '0';
      label.style.right = '0';
    });
  }
  
  // Run adjustment on load and whenever Angular updates the DOM
  adjustDoctorImages();
  
  // Watch for Angular digest cycles to complete to adjust images
  const appElement = document.querySelector('[ng-app="doctorProfileApp"]');
  if (appElement) {
    const appScope = angular.element(appElement).scope();
    if (appScope) {
      appScope.$watch(function() {
        setTimeout(adjustDoctorImages, 0);
      });
    }
  }
  
  // Profile Icon Dropdown Toggle with improved event handling
  const profileIcon = document.getElementById('profileIcon');
  const dropdown = document.getElementById('dropdownMenu');
  
  if (profileIcon && dropdown) {
    profileIcon.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click from propagating to the document
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Add keyboard accessibility
    profileIcon.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      }
    });
  }

  // Hide the dropdown menu if clicking anywhere outside of it
  document.addEventListener('click', function() {
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });

  // Hide header on scroll down/up with debounce for performance
  const header = document.querySelector('header');
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > lastScrollY && window.scrollY > 50) {
            header.classList.add('header-hidden');
          } else if (window.scrollY < lastScrollY) {
            header.classList.remove('header-hidden');
          }
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  // Add ESC key handler for closing modals
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const angularElement = document.querySelector('[ng-controller="DoctorProfileController"]');
      if (angularElement) {
        const scope = angular.element(angularElement).scope();
        if (scope && scope.modalOpen) {
          scope.$apply(function() {
            scope.closeModal();
          });
        }
      }
    }
  });
  
  // Handle window resize events
  window.addEventListener('resize', adjustDoctorImages);
});