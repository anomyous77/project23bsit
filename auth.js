// Enhanced Authentication functionality with working login
document.addEventListener('DOMContentLoaded', function() {
    loadUsersFromStorage();
    initAuthForms();
    checkExistingSession();
});

// Load users from localStorage or initialize with demo users
function loadUsersFromStorage() {
    const storedUsers = localStorage.getItem('worldgym_users');
    if (storedUsers) {
        window.users = JSON.parse(storedUsers);
    } else {
        // Initialize with demo users
        window.users = [
            {
                id: 1,
                username: 'john_doe',
                email: 'john@example.com',
                password: 'password123',
                name: 'John Doe',
                phone: '+1234567890',
                membership: 'premium',
                joinDate: '2024-01-15'
            },
            {
                id: 2,
                username: 'jane_smith',
                email: 'jane@example.com',
                password: 'fit2024',
                name: 'Jane Smith',
                phone: '+0987654321',
                membership: 'basic',
                joinDate: '2024-02-20'
            },
            {
                id: 3,
                username: 'demo_user',
                email: 'demo@example.com',
                password: 'demo123',
                name: 'Demo User',
                phone: '+1112223333',
                membership: 'premium',
                joinDate: '2024-03-10'
            }
        ];
        localStorage.setItem('worldgym_users', JSON.stringify(window.users));
    }
}

// Admin credentials
const adminUser = {
    username: 'admin',
    password: 'admin123',
    role: 'administrator'
};

function initAuthForms() {
    initPasswordToggles();
    initSignupValidation();
    initLoginForm();
    initAdminForm();
    initForgotPassword();
}

// Password visibility toggle
function initPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Signup form validation
function initSignupValidation() {
    const usernameInput = document.getElementById('signup-username');
    const usernameError = document.getElementById('username-error');
    
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            if (this.value.toLowerCase() === 'admin') {
                usernameError.textContent = 'Username cannot be "admin"';
                usernameError.style.display = 'block';
                this.classList.add('is-invalid');
            } else if (isUsernameTaken(this.value)) {
                usernameError.textContent = 'Username already taken';
                usernameError.style.display = 'block';
                this.classList.add('is-invalid');
            } else {
                usernameError.style.display = 'none';
                this.classList.remove('is-invalid');
            }
        });
    }
    
    // Email validation
    const emailInput = document.getElementById('signup-email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showValidationMessage(this, 'Please enter a valid email address');
                this.classList.add('is-invalid');
            } else if (isEmailTaken(this.value)) {
                showValidationMessage(this, 'Email already registered');
                this.classList.add('is-invalid');
            } else {
                hideValidationMessage(this);
                this.classList.remove('is-invalid');
            }
        });
    }
    
    // Password strength validation
    const passwordInput = document.getElementById('signup-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePasswordStrength(this.value);
        });
    }
    
    // Password match validation
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('signup-password').value;
            if (this.value !== password) {
                passwordError.style.display = 'block';
                this.classList.add('is-invalid');
            } else {
                passwordError.style.display = 'none';
                this.classList.remove('is-invalid');
            }
        });
    }
    
    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                showValidationMessage(this, 'Please enter a valid phone number');
                this.classList.add('is-invalid');
            } else {
                hideValidationMessage(this);
                this.classList.remove('is-invalid');
            }
        });
    }
    
    // Signup form submission
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
}

function isUsernameTaken(username) {
    return window.users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

function isEmailTaken(email) {
    return window.users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validatePasswordStrength(password) {
    const strengthIndicator = document.getElementById('password-strength');
    if (!strengthIndicator) return;
    
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    switch(strength) {
        case 0:
        case 1:
            feedback = 'Weak';
            strengthIndicator.className = 'password-strength weak validation-message';
            break;
        case 2:
            feedback = 'Fair';
            strengthIndicator.className = 'password-strength fair validation-message';
            break;
        case 3:
            feedback = 'Good';
            strengthIndicator.className = 'password-strength good validation-message';
            break;
        case 4:
            feedback = 'Strong';
            strengthIndicator.className = 'password-strength strong validation-message';
            break;
    }
    
    strengthIndicator.textContent = `Password strength: ${feedback}`;
    strengthIndicator.style.display = 'block';
}

function showValidationMessage(input, message) {
    let messageElement = input.nextElementSibling;
    if (!messageElement || !messageElement.classList.contains('validation-message')) {
        messageElement = document.createElement('div');
        messageElement.className = 'validation-message error';
        input.parentNode.insertBefore(messageElement, input.nextElementSibling);
    }
    messageElement.textContent = message;
    messageElement.style.display = 'block';
}

function hideValidationMessage(input) {
    const messageElement = input.nextElementSibling;
    if (messageElement && messageElement.classList.contains('validation-message')) {
        messageElement.style.display = 'none';
    }
}

function handleSignup() {
    const name = document.getElementById('signup-name').value;
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    const captcha = document.getElementById('captcha').checked;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!name || !username || !email || !password || !confirmPassword || !phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (username.toLowerCase() === 'admin') {
        showNotification('Username "admin" is not allowed', 'error');
        return;
    }
    
    if (isUsernameTaken(username)) {
        showNotification('Username already taken', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (isEmailTaken(email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    if (!captcha) {
        showNotification('Please complete the CAPTCHA verification', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Please accept the terms and conditions', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: window.users.length + 1,
        username: username,
        email: email,
        password: password,
        name: name,
        phone: phone,
        membership: 'basic',
        joinDate: new Date().toISOString()
    };
    
    window.users.push(newUser);
    
    // Store updated users in localStorage
    localStorage.setItem('worldgym_users', JSON.stringify(window.users));
    
    showNotification('Account created successfully! You can now login.', 'success');
    
    // Auto-login and redirect
    setTimeout(() => {
        simulateLogin(newUser);
        if (typeof showPage === 'function') {
            showPage('home');
        }
    }, 2000);
}

// Login form functionality (user login on index.html)
function initLoginForm() {
    // Click on Login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Enter key support
    const loginPassword = document.getElementById('login-password');
    if (loginPassword) {
        loginPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin();
            }
        });
    }
}

function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    console.log('Login attempt:', { username, password }); // Debug log
    console.log('Available users:', window.users); // Debug log
    
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    // Check for admin login
    if (username === adminUser.username) {
        if (password === adminUser.password) {
            adminLogin(rememberMe);
            return;
        } else {
            showNotification('Invalid admin credentials', 'error');
            return;
        }
    }
    
    // Regular user login - check both username and email
    const user = window.users.find(u => 
        u.username === username || u.email === username
    );
    
    console.log('Found user:', user); // Debug log
    
    if (!user) {
        showNotification('User not found. Please check your username/email.', 'error');
        return;
    }
    
    if (user.password !== password) {
        showNotification('Invalid password. Please try again.', 'error');
        return;
    }
    
    simulateLogin(user, rememberMe);
    showNotification(`Welcome back, ${user.name}!`, 'success');
    
    // Redirect to home page (only on main site)
    if (typeof showPage === 'function') {
        setTimeout(() => {
            showPage('home');
        }, 1000);
    }
}

function simulateLogin(user, rememberMe = false) {
    const userSession = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        membership: user.membership,
        loginTime: new Date().toISOString(),
        isAdmin: user.role === 'administrator'
    };
    
    if (rememberMe) {
        localStorage.setItem('worldgym_current_user', JSON.stringify(userSession));
        localStorage.setItem('worldgym_remember_me', 'true');
    } else {
        sessionStorage.setItem('worldgym_current_user', JSON.stringify(userSession));
    }
    
    updateUIForLoggedInUser(userSession);
}

function adminLogin(rememberMe = false) {
    const adminSession = {
        username: adminUser.username,
        role: adminUser.role,
        loginTime: new Date().toISOString(),
        isAdmin: true
    };
    
    if (rememberMe) {
        localStorage.setItem('worldgym_current_user', JSON.stringify(adminSession));
        localStorage.setItem('worldgym_remember_me', 'true');
    } else {
        sessionStorage.setItem('worldgym_current_user', JSON.stringify(adminSession));
    }
    
    showNotification('Admin login successful!', 'success');
    updateUIForLoggedInUser(adminSession);
    
    // On main site, go to home. On admin.html, this safely does nothing.
    if (typeof showPage === 'function') {
        setTimeout(() => {
            showPage('home');
        }, 1000);
    }
}

function checkExistingSession() {
    let userSession = sessionStorage.getItem('worldgym_current_user') || 
                     localStorage.getItem('worldgym_current_user');
    
    if (userSession) {
        try {
            userSession = JSON.parse(userSession);
            updateUIForLoggedInUser(userSession);
            console.log('Existing session found:', userSession); // Debug log
        } catch (e) {
            console.error('Error parsing user session:', e);
            clearSession();
        }
    }
}

function updateUIForLoggedInUser(user) {
    console.log('Updating UI for user:', user); // Debug log
    
    // Update navigation in both top and left nav (only on main site)
    const loginLinks = document.querySelectorAll('.nav-link[data-page="login"]');
    const signupLinks = document.querySelectorAll('.nav-link[data-page="signup"]');
    
    if (loginLinks.length > 0) {
        loginLinks.forEach(link => {
            if (user.isAdmin) {
                link.innerHTML = `<i class="fas fa-user-shield me-2"></i>Admin`;
            } else {
                link.innerHTML = `<i class="fas fa-user me-2"></i>${user.name || user.username}`;
            }
            link.setAttribute('data-page', 'profile');
            link.onclick = function(e) {
                e.preventDefault();
                showProfilePage(user);
            };
        });
    }
    
    if (signupLinks.length > 0) {
        signupLinks.forEach(link => {
            link.innerHTML = `<i class="fas fa-sign-out-alt me-2"></i>Logout`;
            link.setAttribute('data-page', 'logout');
            link.onclick = function(e) {
                e.preventDefault();
                handleLogout();
            };
        });
    }
    
    // Show user info somewhere on the page if needed
    showUserWelcome(user);
}

function showProfilePage(user) {
    // Create a simple profile page (only used on main site)
    const profileHTML = `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h4 class="mb-0"><i class="fas fa-user me-2"></i>User Profile</h4>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-4">
                                <div class="profile-avatar">
                                    <i class="fas fa-user-circle fa-4x text-primary"></i>
                                </div>
                                <h5 class="mt-3">${user.name || user.username}</h5>
                                <p class="text-muted">@${user.username || ''}</p>
                                ${user.isAdmin ? '<span class="badge bg-danger">Administrator</span>' : 
                                  `<span class="badge bg-warning">${user.membership || 'Member'}</span>`}
                            </div>
                            <div class="profile-info">
                                ${user.email ? `<p><strong>Email:</strong> ${user.email}</p>` : ''}
                                ${user.phone ? `<p><strong>Phone:</strong> ${user.phone}</p>` : ''}
                                <p><strong>Member Since:</strong> ${new Date(user.loginTime).toLocaleDateString()}</p>
                            </div>
                            <div class="text-center mt-4">
                                <button class="btn btn-primary me-2" onclick="showPage('home')">
                                    <i class="fas fa-home me-1"></i>Back to Home
                                </button>
                                <button class="btn btn-outline-secondary" onclick="handleLogout()">
                                    <i class="fas fa-sign-out-alt me-1"></i>Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    let profilePage = document.getElementById('profile-page');
    if (!profilePage) {
        profilePage = document.createElement('div');
        profilePage.id = 'profile-page';
        profilePage.className = 'page';
        const contentArea = document.querySelector('.content-area');
        if (!contentArea) return; // In case we're on admin.html
        contentArea.appendChild(profilePage);
    }
    
    profilePage.innerHTML = profileHTML;
    if (typeof showPage === 'function') {
        showPage('profile');
    }
}

function showUserWelcome(user) {
    console.log(`Welcome ${user.name || user.username}!`);
}

function handleLogout() {
    sessionStorage.removeItem('worldgym_current_user');
    localStorage.removeItem('worldgym_current_user');
    localStorage.removeItem('worldgym_remember_me');
    
    showNotification('Logged out successfully', 'success');
    
    // Reset navigation (only on main site)
    const userLinks = document.querySelectorAll('.nav-link[data-page="profile"]');
    const logoutLinks = document.querySelectorAll('.nav-link[data-page="logout"]');
    
    userLinks.forEach(link => {
        link.innerHTML = `<i class="fas fa-sign-in-alt me-2"></i>Login`;
        link.setAttribute('data-page', 'login');
        link.onclick = null;
    });
    
    logoutLinks.forEach(link => {
        link.innerHTML = `<i class="fas fa-user-plus me-2"></i>Sign Up`;
        link.setAttribute('data-page', 'signup');
        link.onclick = null;
    });
    
    const profilePage = document.getElementById('profile-page');
    if (profilePage) {
        profilePage.remove();
    }
    
    if (typeof showPage === 'function') {
        setTimeout(() => {
            showPage('home');
        }, 1000);
    }
}

function clearSession() {
    sessionStorage.removeItem('worldgym_current_user');
    localStorage.removeItem('worldgym_current_user');
    localStorage.removeItem('worldgym_remember_me');
}

// Admin form (works on admin.html and any page that has admin elements)
function initAdminForm() {
    // For admin.html (form submit)
    const adminForm = document.getElementById('admin-login-form');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAdminLogin();
        });
    }

    // Fallback: if only a button exists (older layout)
    const adminBtn = document.getElementById('admin-login-btn');
    if (adminBtn && !adminForm) {
        adminBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleAdminLogin();
        });
    }
}

function handleAdminLogin() {
    const username = document.getElementById('admin-username')?.value;
    const password = document.getElementById('admin-password')?.value;
    
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    if (username === adminUser.username && password === adminUser.password) {
        adminLogin();
    } else {
        showNotification('Invalid admin credentials', 'error');
    }
}

// Forgot password functionality
function initForgotPassword() {
    const forgotPassword = document.getElementById('forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            handleForgotPassword();
        });
    }
}

function handleForgotPassword() {
    const username = document.getElementById('login-username')?.value;
    
    if (!username) {
        showNotification('Please enter your username or email to reset password', 'info');
        return;
    }
    
    const user = window.users.find(u => u.username === username || u.email === username);
    
    if (user) {
        showNotification(`Password reset link has been sent to ${user.email}`, 'success');
        // In a real application, you would send an email here
    } else {
        showNotification('No account found with that username or email', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Make functions globally available for HTML onclick events
window.handleLogout = handleLogout;
window.showProfilePage = showProfilePage;
