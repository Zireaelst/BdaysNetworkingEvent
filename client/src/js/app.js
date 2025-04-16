class App {
    static async initialize() {
        await this.checkAuth();
        this.setupEventListeners();
        this.setupServiceWorker();
    }

    static async checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.showLoginModal();
            return;
        }

        try {
            const response = await fetch('/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            const { data: user } = await response.json();
            this.handleAuthenticatedUser(user);
        } catch (error) {
            console.error('Auth check failed:', error);
            this.showLoginModal();
        }
    }

    static handleAuthenticatedUser(user) {
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('profile-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'block';
        
        // Update profile display
        ProfileManager.updateProfile();
    }

    static showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Login</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" required>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn btn-primary">Login</button>
                        <button type="button" class="btn btn-secondary" id="show-register">Register</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 0);

        const form = modal.querySelector('#login-form');
        const showRegisterButton = modal.querySelector('#show-register');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLogin(form, modal);
        });

        showRegisterButton.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                this.showRegisterModal();
            }, 300);
        });
    }

    static showRegisterModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Register</h2>
                <form id="register-form">
                    <div class="form-group">
                        <label for="register-firstName">First Name</label>
                        <input type="text" id="register-firstName" required>
                    </div>
                    <div class="form-group">
                        <label for="register-lastName">Last Name</label>
                        <input type="text" id="register-lastName" required>
                    </div>
                    <div class="form-group">
                        <label for="register-email">Email</label>
                        <input type="email" id="register-email" required>
                    </div>
                    <div class="form-group">
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" required>
                    </div>
                    <div class="form-group">
                        <label for="register-company">Company</label>
                        <input type="text" id="register-company" required>
                    </div>
                    <div class="form-group">
                        <label for="register-position">Position</label>
                        <input type="text" id="register-position" required>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn btn-primary">Register</button>
                        <button type="button" class="btn btn-secondary" id="show-login">Login</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 0);

        const form = modal.querySelector('#register-form');
        const showLoginButton = modal.querySelector('#show-login');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleRegister(form, modal);
        });

        showLoginButton.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                this.showLoginModal();
            }, 300);
        });
    }

    static async handleLogin(form, modal) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form.querySelector('#login-email').value,
                    password: form.querySelector('#login-password').value
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { token, user } = await response.json();
            localStorage.setItem('token', token);
            
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
            
            this.handleAuthenticatedUser(user);
            NotificationManager.success('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            NotificationManager.error('Login failed. Please check your credentials.');
        }
    }

    static async handleRegister(form, modal) {
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: form.querySelector('#register-firstName').value,
                    lastName: form.querySelector('#register-lastName').value,
                    email: form.querySelector('#register-email').value,
                    password: form.querySelector('#register-password').value,
                    company: form.querySelector('#register-company').value,
                    position: form.querySelector('#register-position').value
                })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const { token, user } = await response.json();
            localStorage.setItem('token', token);
            
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
            
            this.handleAuthenticatedUser(user);
            NotificationManager.success('Registration successful!');
        } catch (error) {
            console.error('Registration error:', error);
            NotificationManager.error('Registration failed. Please try again.');
        }
    }

    static setupEventListeners() {
        document.getElementById('login-button').addEventListener('click', () => {
            this.showLoginModal();
        });

        document.getElementById('logout-button').addEventListener('click', () => {
            this.handleLogout();
        });
    }

    static handleLogout() {
        localStorage.removeItem('token');
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('profile-button').style.display = 'none';
        document.getElementById('logout-button').style.display = 'none';
        this.showLoginModal();
        NotificationManager.success('Logged out successfully!');
    }

    static setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        }
    }
}

// Initialize the app
App.initialize(); 