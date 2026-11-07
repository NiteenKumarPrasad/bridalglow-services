/* ===================================================
   BridalGlow - JavaScript (script.js)
   No Database: Uses JS Arrays, Objects & LocalStorage
   =================================================== */

// 1. Data Source (Artists with exact customized images)
const artists = [
    {
        id: 1, name: "Priya Makeup Studio", category: "Makeup", location: "Mumbai", rating: 4.9, 
        price_num: 20000, price_range: "₹5,000 - ₹25,000", experience: "8 years",
        image: "https://i.pinimg.com/1200x/01/14/9d/01149dc1ff21cc6eb7ecec42b711e785.jpg",
        description: "Professional bridal makeup artist specializing in HD and Airbrush makeup.",
        portfolio: ["https://i.pinimg.com/736x/48/d1/a6/48d1a69d4a271e6579a79f9dd23deb54.jpg", "https://i.pinimg.com/736x/08/a3/32/08a3323205a88435ed001274fff8bbc5.jpg"]
    },
    {
        id: 2, name: "Anjali Mehndi Arts", category: "Mehndi", location: "Delhi", rating: 4.8, 
        price_num: 8000, price_range: "₹3,000 - ₹15,000", experience: "6 years",
        image: "https://i.pinimg.com/736x/7d/a6/fa/7da6fac63f194cab2e9006a6ab183abb.jpg",
        description: "Expert bridal mehndi artist creating bespoke traditional Indian & Arabic designs.",
        portfolio: ["https://i.pinimg.com/736x/1d/27/a9/1d27a96bd064585891d47d9e690a1d2a.jpg", "https://i.pinimg.com/1200x/f5/85/18/f58518b15187f6717acd75d96dfa7ff0.jpg"]
    },
    {
        id: 3, name: "Studio Memory Photography", category: "Photography", location: "Bangalore", rating: 5.0, 
        price_num: 45000, price_range: "₹25,000 - ₹80,000", experience: "7 years",
        image: "https://i.pinimg.com/736x/31/19/5b/31195b607c6440570a83e6c9808de5d5.jpg",
        description: "Capturing candid, emotional wedding moments and dreamy pre-wedding portraits.",
        portfolio: ["https://i.pinimg.com/736x/44/e4/9d/44e49da1df7712f70728e6918ea3cf02.jpg", "https://i.pinimg.com/1200x/45/3e/12/453e129ea55a280c3bdd57abe723a0d3.jpg"]
    },
    {
        id: 4, name: "Roop Bridal Couture & Draping", category: "Bridal Wear", location: "Jaipur", rating: 4.7, 
        price_num: 35000, price_range: "₹8,000 - ₹45,000", experience: "5 years",
        image: "https://i.pinimg.com/736x/ac/33/6a/ac336a9ee120edabeb0bcacc68a22873.jpg",
        description: "Bridal lehengas, authentic saree draping, and styling services.",
        portfolio: ["https://i.pinimg.com/736x/58/8b/ac/588bac21cef33c2a579afdae8b817461.jpg", "https://i.pinimg.com/1200x/83/1a/86/831a865d17a4abddcd69422019767ede.jpg"]
    },
    {
        id: 5, name: "Crown Hair Studio", category: "Hair Styling", location: "Chennai", rating: 4.9, 
        price_num: 12000, price_range: "₹4,000 - ₹18,000", experience: "9 years",
        image: "https://i.pinimg.com/1200x/83/08/ae/8308ae065f6981ce3716760be8124943.jpg",
        description: "Specialists in intricate bridal floral buns and Hollywood waves.",
        portfolio: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80", "https://i.pinimg.com/736x/6b/38/4c/6b384c6786d1c57cbf41afcb07fb839e.jpg"]
    },
    {
        id: 6, name: "Aura Glow Skincare", category: "Skincare", location: "Mumbai", rating: 4.6, 
        price_num: 9000, price_range: "₹6,000 - ₹20,000", experience: "4 years",
        image: "https://i.pinimg.com/1200x/46/5c/ea/465ceadff9ebb0126b90a60cfd1381ef.jpg",
        description: "Customized pre-wedding skin prep for an effortless natural bridal glow.",
        portfolio: ["https://i.pinimg.com/736x/f7/83/6c/f7836c65a1997e3a04aac1b2a6e392e7.jpg", "https://i.pinimg.com/1200x/f0/c2/d8/f0c2d880c2219820f907badb5f7f816d.jpg"]
    }
];

// Sample Testimonials
const reviews = [
    { name: "Sneha S.", rating: "★★★★★", text: "Priya made me look royal! The makeup stayed intact throughout the ceremony." },
    { name: "Kavita V.", rating: "★★★★★", text: "Anjali's mehndi work was so intricate and had the deepest stain." }
];

// Local Storage Persistent Collections
let usersDB = JSON.parse(localStorage.getItem('bg_users')) || [];
let currentUser = JSON.parse(localStorage.getItem('bg_currentUser')) || null;
let bookings = JSON.parse(localStorage.getItem('bg_bookings')) || [];
let wishlist = JSON.parse(localStorage.getItem('bg_wishlist')) || [];

// DOM References
const artistsGrid = document.getElementById('artistsGrid');
const artistSelect = document.getElementById('artistSelect');
const modal = document.getElementById('artistModal');

// ==========================================
// 1. Show / Hide Password Toggle
// ==========================================
function togglePasswordVisibility(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    if (input.type === "password") {
        input.type = "text";
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    } else {
        input.type = "password";
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    }
}

// ==========================================
// 2. Authentication System (Strict Flow)
// ==========================================
function updateAuthUI() {
    const loginBtn = document.getElementById('loginNavBtn');
    const userMenu = document.getElementById('userMenu');
    const navAvatar = document.getElementById('navAvatar');
    const dashboardContainer = document.getElementById('dashboardContainer');
    const dashboardLoginPrompt = document.getElementById('dashboardLoginPrompt');

    if (currentUser) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'block';
        navAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=E85D7A&color=fff`;
        
        dashboardContainer.style.display = 'block';
        dashboardLoginPrompt.style.display = 'none';
        
        document.getElementById('profName').value = currentUser.name || '';
        document.getElementById('profEmail').value = currentUser.email || '';
        document.getElementById('profAge').value = currentUser.age || '';
        document.getElementById('profPhone').value = currentUser.phone || '';
        document.getElementById('clientName').value = currentUser.name || '';
        document.getElementById('clientPhone').value = currentUser.phone || '';
        
        renderDashboard();
    } else {
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
        dashboardContainer.style.display = 'none';
        dashboardLoginPrompt.style.display = 'block';
    }
}

// Registration Handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;

    if (usersDB.find(u => u.email === email)) {
        alert('This email is already registered! Please switch to login.');
        return;
    }

    const newUser = { name, email, password, age: '', phone: '' };
    usersDB.push(newUser);
    localStorage.setItem('bg_users', JSON.stringify(usersDB));
    
    currentUser = newUser;
    localStorage.setItem('bg_currentUser', JSON.stringify(currentUser));
    
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('registerForm').reset();
    alert(`Registration successful! Welcome to BridalGlow, ${name}.`);
    updateAuthUI();
});

// Login Handler (Validations)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const userExists = usersDB.find(u => u.email === email);
    
    if (!userExists) {
        alert('Please register first.');
        return;
    }

    if (userExists.password === password) {
        currentUser = userExists;
        localStorage.setItem('bg_currentUser', JSON.stringify(currentUser));
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('loginForm').reset();
        updateAuthUI();
    } else {
        alert("Invalid credentials, email or password doesn't match.");
    }
});

// Logout Handler
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('bg_currentUser');
    document.getElementById('userDropdown').classList.remove('show');
    updateAuthUI();
    alert('You have logged out successfully.');
}

// Profile Info Update
document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    currentUser.name = document.getElementById('profName').value.trim();
    currentUser.age = document.getElementById('profAge').value;
    currentUser.phone = document.getElementById('profPhone').value.trim();
    
    const index = usersDB.findIndex(u => u.email === currentUser.email);
    if (index !== -1) usersDB[index] = currentUser;
    
    localStorage.setItem('bg_currentUser', JSON.stringify(currentUser));
    localStorage.setItem('bg_users', JSON.stringify(usersDB));
    
    updateAuthUI();
    alert('Profile information saved successfully!');
});

// Change Password Handler
document.getElementById('passwordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const curr = document.getElementById('currPassword').value;
    const newP = document.getElementById('newPassword').value;
    const conf = document.getElementById('confPassword').value;

    if (curr !== currentUser.password) {
        alert("Previous password doesn't match.");
        return;
    }
    
    if (newP !== conf) {
        alert("New password and confirm password do not match.");
        return;
    }

    currentUser.password = newP;
    const index = usersDB.findIndex(u => u.email === currentUser.email);
    if (index !== -1) usersDB[index] = currentUser;
    
    localStorage.setItem('bg_currentUser', JSON.stringify(currentUser));
    localStorage.setItem('bg_users', JSON.stringify(usersDB));
    
    alert('Password successfully updated!');
    document.getElementById('passwordForm').reset();
});

// Delete Account Handler
function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action will wipe all your personal details, bookings, and wishlist.")) {
        usersDB = usersDB.filter(u => u.email !== currentUser.email);
        localStorage.setItem('bg_users', JSON.stringify(usersDB));
        
        bookings = bookings.filter(b => b.userEmail !== currentUser.email);
        localStorage.setItem('bg_bookings', JSON.stringify(bookings));

        alert("Your account has been deleted.");
        logoutUser();
    }
}

// Switch between Login and Register tabs
function switchAuthTab(tab) {
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('tabLoginBtn').className = tab === 'login' ? 'auth-tab-btn active' : 'auth-tab-btn';
    document.getElementById('tabRegBtn').className = tab === 'register' ? 'auth-tab-btn active' : 'auth-tab-btn';
}

// User Profile Avatar Dropdown
document.getElementById('navAvatar').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('userDropdown').classList.toggle('show');
});
window.addEventListener('click', () => {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('show');
});

// ==========================================
// 3. Artist Cards & Advanced Filtering
// ==========================================
function renderArtists(data) {
    artistsGrid.innerHTML = '';
    if (data.length === 0) {
        artistsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No artists found matching your criteria.</p>'; 
        return;
    }
    
    data.forEach(artist => {
        const isFav = wishlist.includes(artist.id);
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.innerHTML = `
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleWishlist(${artist.id}, this)">
                <i class="fas fa-heart"></i>
            </button>
            <img src="${artist.image}" class="artist-img" alt="${artist.name}">
            <div class="artist-info">
                <span style="font-size: 0.8rem; color: #E85D7A; font-weight: bold;">${artist.category}</span>
                <h3>${artist.name}</h3>
                <p style="color: #666; font-size: 0.9rem;"><i class="fas fa-map-marker-alt"></i> ${artist.location} &bull; <i class="fas fa-star" style="color: #D4AF37"></i> ${artist.rating}</p>
                <p style="font-weight: 600; margin: 0.5rem 0;">${artist.price_range}</p>
                <button class="btn btn-primary btn-block" onclick="openModal(${artist.id})">View Profile</button>
            </div>
        `;
        artistsGrid.appendChild(card);
    });
}

function applyFilters() {
    const cat = document.getElementById('filterCategory').value;
    const loc = document.getElementById('filterLocation').value;
    const rat = parseFloat(document.getElementById('filterRating').value);
    const prc = document.getElementById('filterPrice').value;

    const filtered = artists.filter(a => {
        const matchCat = cat === 'All' || a.category === cat;
        const matchLoc = loc === 'All' || a.location === loc;
        const matchRat = a.rating >= rat;
        const matchPrc = prc === 'All' ? true : (prc === 'Low' ? a.price_num < 15000 : a.price_num >= 15000);
        return matchCat && matchLoc && matchRat && matchPrc;
    });
    renderArtists(filtered);
}

function setCategoryFilter(category) {
    document.getElementById('filterCategory').value = category;
    applyFilters();
    document.getElementById('artists').scrollIntoView({ behavior: 'smooth' });
}

// Artist Detail Modal
function openModal(id) {
    const artist = artists.find(a => a.id === id);
    document.getElementById('modalBody').innerHTML = `
        <h2 style="color: #E85D7A; margin-bottom: 0.5rem;">${artist.name}</h2>
        <p><strong>Location:</strong> ${artist.location} | <strong>Experience:</strong> ${artist.experience}</p>
        <p><strong>Price Range:</strong> ${artist.price_range}</p>
        <p style="margin: 1rem 0;">${artist.description}</p>
        <h4>Work Samples</h4>
        <div style="display: flex; gap: 0.8rem; margin: 1rem 0; justify-content: center;">
            <div style="width: 50%; aspect-ratio: 1; border-radius: 8px; overflow: hidden;">
                <img src="${artist.portfolio[0]}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="width: 50%; aspect-ratio: 1; border-radius: 8px; overflow: hidden;">
                <img src="${artist.portfolio[1]}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        </div>
        <button class="btn btn-primary btn-block" onclick="selectForBooking('${artist.name}')">Book Appointment</button>
    `;
    modal.style.display = 'flex';
}

function selectForBooking(name) {
    modal.style.display = 'none';
    artistSelect.value = name;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Wishlist Toggle
function toggleWishlist(id, btnElement) {
    if (!currentUser) {
        alert("Please register or login first to save favorites.");
        document.getElementById('authModal').style.display = 'flex';
        return;
    }
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(wId => wId !== id);
        btnElement.classList.remove('active');
    } else {
        wishlist.push(id);
        btnElement.classList.add('active');
    }
    localStorage.setItem('bg_wishlist', JSON.stringify(wishlist));
    renderFavorites();
}

// ==========================================
// 4. Booking System & Dashboard Management
// ==========================================
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentUser) {
        alert("Please register or login first to complete your booking.");
        document.getElementById('authModal').style.display = 'flex';
        return;
    }
    
    const newBooking = {
        artist: artistSelect.value,
        service: document.getElementById('bookingService').value,
        package: document.getElementById('packageSelect').value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        userEmail: currentUser.email
    };
    bookings.push(newBooking);
    localStorage.setItem('bg_bookings', JSON.stringify(bookings));
    
    alert('Booking Confirmed! You can track it under your Dashboard.');
    document.getElementById('bookingForm').reset();
    
    document.getElementById('clientName').value = currentUser.name;
    document.getElementById('clientPhone').value = currentUser.phone || '';
    
    renderDashboard();
    document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
});

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function renderDashboard() {
    if (!currentUser) return;
    
    // User bookings
    const list = document.getElementById('bookingList');
    const userBookings = bookings.filter(b => b.userEmail === currentUser.email);
    list.innerHTML = userBookings.length ? '' : '<p>No bookings scheduled yet.</p>';
    
    userBookings.forEach((b) => {
        const actualIndex = bookings.findIndex(mb => mb === b);
        list.innerHTML += `
            <div class="booking-item-card">
                <div>
                    <strong>${b.artist}</strong> - ${b.service} (${b.package})<br>
                    <small style="color: #E85D7A"><i class="far fa-calendar"></i> ${b.date} at ${b.time}</small>
                </div>
                <button class="btn btn-secondary" onclick="cancelBooking(${actualIndex})">Cancel</button>
            </div>`;
    });

    // User wishlist
    renderFavorites();
}

function renderFavorites() {
    const favList = document.getElementById('favoritesList');
    if (!favList) return;
    
    const favArtists = artists.filter(a => wishlist.includes(a.id));
    favList.innerHTML = favArtists.length ? '' : '<p>No saved artists yet.</p>';
    
    favArtists.forEach(artist => {
        favList.innerHTML += `
            <div class="artist-card" style="padding: 1rem; text-align: center;">
                <img src="${artist.image}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 0.8rem;">
                <h4>${artist.name}</h4>
                <p style="color: #666; font-size: 0.85rem;">${artist.category} &bull; ${artist.location}</p>
                <button class="btn btn-primary" style="margin-top: 0.8rem; padding: 0.4rem 1rem;" onclick="selectForBooking('${artist.name}')">Book Now</button>
            </div>`;
    });
}

function cancelBooking(index) {
    if (confirm("Do you want to cancel this booking?")) {
        bookings.splice(index, 1);
        localStorage.setItem('bg_bookings', JSON.stringify(bookings));
        renderDashboard();
    }
}

// ==========================================
// 5. App Initialization & Event Listeners
// ==========================================
const darkToggle = document.getElementById('darkModeToggle');
if (localStorage.getItem('bg_darkmode') === 'true') {
    document.body.classList.add('dark-mode');
}
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('bg_darkmode', document.body.classList.contains('dark-mode'));
});

window.onload = () => {
    // Populate booking artist dropdown
    artists.forEach(a => {
        artistSelect.innerHTML += `<option value="${a.name}">${a.name} (${a.category})</option>`;
    });
    
    // Populate client testimonials
    const revGrid = document.getElementById('reviewsGrid');
    reviews.forEach(r => {
        revGrid.innerHTML += `
            <div class="review-card">
                <div class="review-stars">${r.rating}</div>
                <p>"${r.text}"</p>
                <strong>- ${r.name}</strong>
            </div>`;
    });
    
    // Initial renders
    renderArtists(artists);
    updateAuthUI();
};

document.getElementById('loginNavBtn').onclick = () => {
    document.getElementById('authModal').style.display = 'flex';
};
document.getElementById('menuToggle').onclick = () => {
    document.getElementById('navLinks').classList.toggle('active');
};