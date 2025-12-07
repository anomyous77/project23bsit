// Products and classes data
const classesData = [
    {
        id: 1,
        name: 'HIIT Blast',
        description: 'High-intensity interval training for maximum calorie burn and fat loss.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        duration: '45 mins',
        level: 'Advanced',
        trainer: 'Sarah Johnson',
        time: '6:00 AM, 5:30 PM',
        popularity: 95
    },
    {
        id: 2,
        name: 'Power Yoga',
        description: 'Build strength and flexibility with dynamic yoga flows and poses.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        duration: '60 mins',
        level: 'All Levels',
        trainer: 'Mike Chen',
        time: '7:00 AM, 6:00 PM',
        popularity: 88
    },
    {
        id: 3,
        name: 'Spin Revolution',
        description: 'High-energy cycling class with great music and motivating instructors.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        duration: '50 mins',
        level: 'Intermediate',
        trainer: 'Lisa Rodriguez',
        time: '5:30 AM, 4:30 PM, 7:00 PM',
        popularity: 92
    },
    {
        id: 4,
        name: 'Strength Training',
        description: 'Build muscle and increase strength with guided weight training.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        duration: '55 mins',
        level: 'All Levels',
        trainer: 'John Smith',
        time: '8:00 AM, 12:00 PM, 6:30 PM',
        popularity: 85
    },
    {
        id: 5,
        name: 'Pilates Core',
        description: 'Strengthen your core and improve posture with Pilates exercises.',
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        duration: '50 mins',
        level: 'Beginner',
        trainer: 'Emma Wilson',
        time: '9:00 AM, 5:00 PM',
        popularity: 78
    },
    {
        id: 6,
        name: 'Boxing Fitness',
        description: 'Learn boxing techniques while getting an incredible full-body workout.',
        image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        duration: '60 mins',
        level: 'Intermediate',
        trainer: 'Carlos Martinez',
        time: '7:30 AM, 4:00 PM, 7:30 PM',
        popularity: 90
    }
];

// Load popular classes (ML recommendation simulation)
function loadPopularClasses() {
    const container = document.getElementById('popular-classes');
    if (!container) return;
    
    // Simulate ML-based recommendations by sorting by popularity
    const popularClasses = [...classesData].sort((a, b) => b.popularity - a.popularity).slice(0, 3);
    
    container.innerHTML = '';
    
    popularClasses.forEach(cls => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        col.innerHTML = `
            <div class="card class-card">
                <div class="class-img">
                    <img src="${cls.image}" alt="${cls.name}">
                    <span class="class-level">${cls.level}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${cls.name}</h5>
                    <p class="card-text">${cls.description}</p>
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="fas fa-clock me-1"></i>${cls.duration}
                        </small>
                    </div>
                    <div class="mb-3">
                        <small class="text-muted">
                            <i class="fas fa-user me-1"></i>${cls.trainer}
                        </small>
                    </div>
                    <button class="btn btn-primary btn-sm">Book Class</button>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Load all classes
function loadAllClasses() {
    const container = document.getElementById('classes-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    classesData.forEach(cls => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        col.innerHTML = `
            <div class="card class-card">
                <div class="class-img">
                    <img src="${cls.image}" alt="${cls.name}">
                    <span class="class-level">${cls.level}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${cls.name}</h5>
                    <p class="card-text">${cls.description}</p>
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="fas fa-clock me-1"></i>${cls.duration}
                        </small>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="fas fa-user me-1"></i>${cls.trainer}
                        </small>
                    </div>
                    <div class="mb-3">
                        <small class="text-muted">
                            <i class="fas fa-calendar me-1"></i>${cls.time}
                        </small>
                    </div>
                    <button class="btn btn-primary btn-sm">Book Class</button>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Initialize map
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Simple map placeholder - in a real application, you would use Google Maps or similar API
    mapElement.innerHTML = `
        <div style="width:100%;height:100%;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">
            <div style="text-align:center;">
                <i class="fas fa-map-marker-alt fa-3x mb-3"></i>
                <p>World Gym Fitness Location</p>
                <p>123 Fitness Street, Sports City</p>
            </div>
        </div>
    `;
}

// Add event listeners to all buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn') || e.target.closest('.btn')) {
            const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
            
            if (button.textContent.includes('Book') || button.textContent.includes('Choose')) {
                e.preventDefault();
                // Simulate action
                const action = button.textContent.includes('Book') ? 'booking' : 'membership selection';
                alert(`Thank you for your interest! This would complete the ${action} process.`);
            }
        }
    });
});