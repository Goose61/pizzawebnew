// Admin Configuration - Secure Credential Management
// This file can be updated without exposing credentials in the main code

const ADMIN_CONFIG = {
    // Demo credentials (for development/testing only)
    // In production, these would be stored server-side with proper hashing
    credentials: {
        'admin': {
            password: 'pizza2024',
            role: 'administrator',
            permissions: ['dashboard', 'locations', 'analytics']
        },
        'demo': {
            password: 'demo123',
            role: 'demo_user',
            permissions: ['dashboard', 'locations']
        }
    },
    
    // Security settings
    security: {
        maxLoginAttempts: 3,
        lockoutDuration: 15, // minutes
        sessionTimeout: 24, // hours
        requireCaptcha: true
    },
    
    // Demo credentials info (shown to users)
    demoInfo: {
        admin: {
            username: 'admin',
            password: 'pizza2024',
            description: 'Full administrator access'
        },
        demo: {
            username: 'demo',
            password: 'demo123',
            description: 'Limited demo access'
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADMIN_CONFIG;
} 