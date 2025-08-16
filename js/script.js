
// Uncomment to automatically trigger welcome message
welcomeSpeech();

/**
 * Prompts the user for their name and displays it in the greeting element.
 * If the user enters a name, it updates the content of the element with id 'user-greeting'.
 * If no name is provided, the greeting remains unchanged.
 */
function welcomeSpeech() {
    let userName = prompt("What is your name?");
    if (userName != '') {
        document.getElementById('user-greeting').textContent = userName;
    }
}

/**
 * Handles the message sending functionality.
 * Retrieves the message from the input field with id 'user-message'.
 * Displays an alert with the message if one is provided,
 * otherwise shows an error message asking the user to enter text.
 */
// Edutech Website JavaScript Functions
// Created by fazaanggapr

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions when DOM is loaded
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollEffects();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        // Real-time validation on input change
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', updateValidationResult);
            input.addEventListener('change', updateValidationResult);
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });
    }
    
    // Update current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000); // Update every second
}

// Main send message function
function sendMessage() {
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const date = document.getElementById('user-date').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const message = document.getElementById('user-message').value.trim();
    
    // Validate all fields
    const validation = validateForm(name, email, phone, date, gender, message);
    
    if (validation.isValid) {
        // Show success message
        showFormMessage(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim.`, 'success');
        
        // Reset form after successful submission
        setTimeout(() => {
            document.getElementById('contact-form').reset();
            updateValidationResult();
        }, 2000);
        
        // Log form data
        console.log('Form Data Submitted:', {
            name, email, phone, date, 
            gender: gender ? gender.value : null, 
            message,
            timestamp: new Date().toISOString()
        });
    } else {
        // Show error message
        showFormMessage('Silakan lengkapi semua field dengan benar sebelum mengirim.', 'error');
    }
}

// Form validation function
function validateForm(name, email, phone, date, gender, message) {
    const errors = [];
    let isValid = true;
    
    // Name validation
    if (!name) {
        errors.push('Nama harus diisi');
        isValid = false;
    } else if (name.length < 2) {
        errors.push('Nama minimal 2 karakter');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        errors.push('Email harus diisi');
        isValid = false;
    } else if (!isValidEmail(email)) {
        errors.push('Format email tidak valid');
        isValid = false;
    }
    
    // Phone validation
    if (!phone) {
        errors.push('Nomor telepon harus diisi');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        errors.push('Format nomor telepon tidak valid');
        isValid = false;
    }
    
    // Date validation
    if (!date) {
        errors.push('Tanggal lahir harus diisi');
        isValid = false;
    } else if (!isValidDate(date)) {
        errors.push('Tanggal lahir tidak valid');
        isValid = false;
    }
    
    // Gender validation
    if (!gender) {
        errors.push('Jenis kelamin harus dipilih');
        isValid = false;
    }
    
    // Message validation
    if (!message) {
        errors.push('Pesan harus diisi');
        isValid = false;
    } else if (message.length < 10) {
        errors.push('Pesan minimal 10 karakter');
        isValid = false;
    }
    
    return { isValid, errors };
}

// Phone number validation
function isValidPhone(phone) {
    // Indonesian phone number format
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

// Date validation
function isValidDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 100, 0, 1);
    
    return date instanceof Date && 
           !isNaN(date) && 
           date < today && 
           date > minDate;
}

// Update validation result display
function updateValidationResult() {
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const date = document.getElementById('user-date').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const message = document.getElementById('user-message').value.trim();
    
    const resultDiv = document.getElementById('validation-result');
    
    if (!name && !email && !phone && !date && !gender && !message) {
        resultDiv.innerHTML = `
            <div class="p-4 bg-gray-50 rounded-lg">
                <p class="text-gray-600 text-center">Fill out the form to see validation results here</p>
            </div>
        `;
        return;
    }
    
    const validation = validateForm(name, email, phone, date, gender, message);
    
    let resultHTML = `
        <div class="space-y-3">
            <div class="p-3 rounded-lg ${validation.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                <h4 class="font-semibold ${validation.isValid ? 'text-green-800' : 'text-red-800'} mb-2">
                    Status: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}
                </h4>
    `;
    
    if (name) {
        resultHTML += `<p><strong>Nama:</strong> ${name}</p>`;
    }
    
    if (email) {
        resultHTML += `<p><strong>Email:</strong> ${email}</p>`;
    }
    
    if (phone) {
        resultHTML += `<p><strong>Phone:</strong> ${phone}</p>`;
    }
    
    if (date) {
        const birthDate = new Date(date);
        const age = calculateAge(birthDate);
        resultHTML += `<p><strong>Tanggal Lahir:</strong> ${formatDate(date)} (${age} tahun)</p>`;
    }
    
    if (gender) {
        resultHTML += `<p><strong>Jenis Kelamin:</strong> ${gender.value}</p>`;
    }
    
    if (message) {
        const messagePreview = message.length > 50 ? message.substring(0, 50) + '...' : message;
        resultHTML += `<p><strong>Pesan:</strong> ${messagePreview}</p>`;
    }
    
    resultHTML += `</div>`;
    
    // Show validation errors if any
    if (!validation.isValid && validation.errors.length > 0) {
        resultHTML += `
            <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <h4 class="font-semibold text-red-800 mb-2">Errors:</h4>
                <ul class="text-red-700 text-sm space-y-1">
        `;
        
        validation.errors.forEach(error => {
            resultHTML += `<li>• ${error}</li>`;
        });
        
        resultHTML += `</ul></div>`;
    }
    
    resultHTML += `</div>`;
    
    resultDiv.innerHTML = resultHTML;
}

// Calculate age from birth date
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Format date to Indonesian format
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Update current time display
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        
        currentTimeElement.textContent = now.toLocaleDateString('id-ID', options);
    }
}

// Form message display function
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `mt-4 text-center ${type === 'error' ? 'text-red-600' : 'text-green-600'}`;
        formMessage.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission
function simulateFormSubmission(name, email, message) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    
    // Show loading state
    if (submitButton) {
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
    }
    
    // Simulate API call delay
    setTimeout(() => {
        showFormMessage(`Thank you ${name}! Your message has been sent successfully. We'll get back to you within 24 hours.`, 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button
        if (submitButton) {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }
        
        console.log('Form Data:', {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        });
    }, 2000);
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Add scroll event listener for navbar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.classList.add('bg-white/95', 'backdrop-blur-sm');
        } else {
            header.classList.remove('bg-white/95', 'backdrop-blur-sm');
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Utility function for sending messages (legacy function - updated)
function sendMessage() {
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const date = document.getElementById('user-date').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const message = document.getElementById('user-message').value.trim();
    
    // Quick validation for legacy function
    if (!message) {
        alert("Please enter a message before sending.");
        return;
    }
    
    if (!name || !email) {
        alert("Please fill in your name and email.");
        return;
    }
    
    // Show success message
    alert(`Message sent successfully!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    
    // Update validation display
    updateValidationResult();
}

// Program Learn More Button Handler
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Learn More') {
        e.preventDefault();
        
        const programCard = e.target.closest('.bg-gradient-to-br');
        const programTitle = programCard.querySelector('h3').textContent;
        
        // Simulate navigation to program details
        alert(`Learn more about: ${programTitle}\n\nThis would typically redirect to a detailed program page.`);
        
        // In a real application, you might do:
        // window.location.href = `/programs/${programTitle.toLowerCase().replace(/\s+/g, '-')}`;
    }
});

// Add some interactive features
function addInteractivity() {
    // Hover effects for cards
    const cards = document.querySelectorAll('.hover-scale');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize interactivity
document.addEventListener('DOMContentLoaded', addInteractivity);

// Console welcome message
console.log('%c🎓 Welcome to Edutech Website!', 'color: #8B5CF6; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped by fazaanggapr', 'color: #6366F1; font-size: 14px;');
console.log('%c📧 Contact: info@edutech.co.id', 'color: #10B981; font-size: 12px;');