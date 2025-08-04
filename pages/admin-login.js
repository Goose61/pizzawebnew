// Admin Login JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle admin login form submission
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Toggle password visibility
    const togglePasswordBtn = document.querySelector('.toggle-password');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', togglePassword);
    }
});

function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const rememberMe = document.getElementById('admin-remember').checked;
    
    // Validate credentials using config
    const userConfig = ADMIN_CONFIG.credentials[username];
    const isValid = userConfig && userConfig.password === password;
    
    if (isValid) {
        // Store login data
        const loginData = {
            username: username,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        if (rememberMe) {
            localStorage.setItem('pizza_admin_login', JSON.stringify(loginData));
        } else {
            sessionStorage.setItem('pizza_admin_login', JSON.stringify(loginData));
        }
        
        // Redirect to dashboard
        window.location.href = 'admin-dashboard.html';
    } else {
        showError('Invalid username or password. Please try again.');
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('admin-password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Add CSS for error notification
const style = document.createElement('style');
style.textContent = `
.error-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #dc3545;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;
document.head.appendChild(style); 