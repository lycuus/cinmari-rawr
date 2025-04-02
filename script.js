document.addEventListener('DOMContentLoaded', function() {
    // Initialize memory lane with photos
    const memoryLane = document.getElementById('memoryLane');
    const photos = [
        'cin1.jpg',
        'cin2.jpg',
        'cin3.jpg',
        // Add more photos as needed
    ];
    
    photos.forEach((photo, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.style.animationDelay = `${index * 0.2}s`;
        
        const img = document.createElement('img');
        img.src = photo;
        img.className = 'photo';
        img.alt = `Our memory ${index + 1}`;
        
        card.appendChild(img);
        memoryLane.appendChild(card);
        
        // Add slight rotation variation
        card.style.transform = `rotateY(${Math.random() * 10 - 5}deg) rotateX(${Math.random() * 5 - 2.5}deg)`;
    });
    
    // Music player functionality
    const song = document.getElementById('loveSong');
    const playBtn = document.getElementById('playBtn');
    const muteBtn = document.getElementById('muteBtn');
    const lyrics = document.querySelectorAll('.lyrics p');
    let currentLyric = 0;
    
    playBtn.addEventListener('click', function() {
        if (song.paused) {
            song.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            song.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    muteBtn.addEventListener('click', function() {
        song.muted = !song.muted;
        muteBtn.innerHTML = song.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    });
    
    // Lyrics highlighting
    song.addEventListener('timeupdate', function() {
        const currentTime = song.currentTime;
        
        // Adjust these timings to match your song
        const lyricTimes = [0, 5, 10, 15, 20, 25, 30];
        
        for (let i = 0; i < lyricTimes.length; i++) {
            if (currentTime >= lyricTimes[i] && 
                (i === lyricTimes.length - 1 || currentTime < lyricTimes[i + 1])) {
                if (currentLyric !== i) {
                    lyrics[currentLyric].classList.remove('active');
                    lyrics[i].classList.add('active');
                    currentLyric = i;
                }
                break;
            }
        }
    });
    
    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.animationDuration = `${Math.random() * 4 + 3}s`;
        heart.style.color = `hsl(${Math.random() * 60 + 330}, 80%, 70%)`;
        
        // Create hearts container if it doesn't exist
        let container = document.querySelector('.floating-hearts');
        if (!container) {
            container = document.createElement('div');
            container.className = 'floating-hearts';
            document.body.appendChild(container);
        }
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Create shooting stars
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        document.querySelector('.shooting-stars').appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 3000);
    }
    
    // Create initial elements
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 300);
    }
    
    for (let i = 0; i < 5; i++) {
        setTimeout(createShootingStar, i * 1000);
    }
    
    // Continue creating elements periodically
    setInterval(createHeart, 800);
    setInterval(createShootingStar, 3000);
    
    // Make memory cards interactive
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
});