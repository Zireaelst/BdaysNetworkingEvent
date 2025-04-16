class ProfileManager {
    static elements = {
        name: document.getElementById('display-name'),
        email: document.getElementById('display-email'),
        phone: document.getElementById('display-phone'),
        linkedin: document.getElementById('display-linkedin'),
        points: document.getElementById('display-points'),
        editButton: document.getElementById('edit-profile')
    };

    static async initialize() {
        this.setupEventListeners();
        await this.updateProfile();
    }

    static setupEventListeners() {
        this.elements.editButton.addEventListener('click', () => {
            this.showEditModal();
        });
    }

    static async updateProfile() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('/api/profiles/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            
            const { data: profile } = await response.json();
            
            this.elements.name.textContent = `${profile.firstName} ${profile.lastName}`;
            this.elements.email.textContent = profile.email;
            this.elements.phone.textContent = profile.phone || 'Not provided';
            this.elements.linkedin.href = profile.socialLinks?.linkedin || '#';
            this.elements.linkedin.textContent = profile.socialLinks?.linkedin || 'Not provided';
            this.elements.points.textContent = profile.points || 0;
        } catch (error) {
            console.error('Error updating profile:', error);
            NotificationManager.error('Failed to load profile');
        }
    }

    static async showEditModal() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('/api/profiles/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            
            const { data: profile } = await response.json();

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>Edit Profile</h2>
                    <form id="edit-profile-form">
                        <div class="form-group">
                            <label for="edit-firstName">First Name</label>
                            <input type="text" id="edit-firstName" value="${profile.firstName}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-lastName">Last Name</label>
                            <input type="text" id="edit-lastName" value="${profile.lastName}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-company">Company</label>
                            <input type="text" id="edit-company" value="${profile.company}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-position">Position</label>
                            <input type="text" id="edit-position" value="${profile.position}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-bio">Bio</label>
                            <textarea id="edit-bio">${profile.bio || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="edit-linkedin">LinkedIn URL</label>
                            <input type="url" id="edit-linkedin" value="${profile.socialLinks?.linkedin || ''}">
                        </div>
                        <div class="form-group">
                            <label for="edit-twitter">Twitter URL</label>
                            <input type="url" id="edit-twitter" value="${profile.socialLinks?.twitter || ''}">
                        </div>
                        <div class="form-group">
                            <label for="edit-github">GitHub URL</label>
                            <input type="url" id="edit-github" value="${profile.socialLinks?.github || ''}">
                        </div>
                        <div class="button-group">
                            <button type="submit" class="btn btn-primary">Save</button>
                            <button type="button" class="btn btn-secondary" id="cancel-edit">Cancel</button>
                        </div>
                    </form>
                </div>
            `;

            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('active'), 0);

            const form = modal.querySelector('#edit-profile-form');
            const cancelButton = modal.querySelector('#cancel-edit');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleProfileUpdate(form, modal);
            });

            cancelButton.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });
        } catch (error) {
            console.error('Error showing edit modal:', error);
            NotificationManager.error('Failed to load profile data');
        }
    }

    static async handleProfileUpdate(form, modal) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const updatedData = {
                firstName: form.querySelector('#edit-firstName').value,
                lastName: form.querySelector('#edit-lastName').value,
                company: form.querySelector('#edit-company').value,
                position: form.querySelector('#edit-position').value,
                bio: form.querySelector('#edit-bio').value,
                socialLinks: {
                    linkedin: form.querySelector('#edit-linkedin').value,
                    twitter: form.querySelector('#edit-twitter').value,
                    github: form.querySelector('#edit-github').value
                }
            };

            const response = await fetch('/api/profiles/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            await this.updateProfile();

            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);

            NotificationManager.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            NotificationManager.error('Failed to update profile');
        }
    }

    static async updatePoints(points) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('/api/profiles/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ points })
            });

            if (!response.ok) {
                throw new Error('Failed to update points');
            }

            await this.updateProfile();
            NotificationManager.success('Points updated successfully!');
        } catch (error) {
            console.error('Error updating points:', error);
            NotificationManager.error('Failed to update points');
        }
    }
}

// Initialize profile manager
ProfileManager.initialize(); 