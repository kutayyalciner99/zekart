// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove("show");
      }
    });
  }
});

// Loader ekranı 3 saniye göster
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  if (loader && content) {
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
      }, 500); // Animasyon sonrası göster
    }, 3000); // 3 saniye loading süresi
  }
});

// Background animation
let t = 0;
function animateBG() {
  t += 0.008;
  
  const c1 = document.getElementById('c1');
  const c2 = document.getElementById('c2');
  const c3 = document.getElementById('c3');
  const l1 = document.getElementById('l1');
  
  if (c1) c1.setAttribute('r', 500 + Math.sin(t) * 18);
  if (c2) c2.setAttribute('r', 350 + Math.cos(t*1.2) * 12);
  if (c3) c3.setAttribute('r', 200 + Math.sin(t*0.8) * 8);
  
  if (l1) {
    let angle = Math.sin(t) * 0.08;
    let centerX = 960, centerY = 540, len = 1080;
    let x1 = centerX + Math.sin(angle) * len;
    let y1 = centerY - Math.cos(angle) * len;
    let x2 = centerX - Math.sin(angle) * len;
    let y2 = centerY + Math.cos(angle) * len;
    l1.setAttribute('x1', x1);
    l1.setAttribute('y1', y1);
    l1.setAttribute('x2', x2);
    l1.setAttribute('y2', y2);
  }
  
  document.querySelectorAll('.star').forEach((star, i) => {
    let baseX = parseFloat(star.getAttribute('cx'));
    let baseY = parseFloat(star.getAttribute('cy'));
    star.setAttribute('cx', baseX + Math.sin(t*1.5 + i) * 2);
    star.setAttribute('cy', baseY + Math.cos(t*1.3 + i) * 2);
  });
  
  requestAnimationFrame(animateBG);
}

// Start background animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateBG();
});

// Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const galleryImages = document.querySelectorAll(".grid-gallery img");

  // Open lightbox when clicking on gallery images
  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxOverlay.classList.add("active");
    });
  });

  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightboxOverlay.classList.remove("active");
    });
  }

  // Close lightbox when clicking outside the image
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener("click", (e) => {
      if (e.target === lightboxOverlay) {
        lightboxOverlay.classList.remove("active");
      }
    });
  }

  // Close lightbox with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
      lightboxOverlay.classList.remove("active");
    }
  });

  // Puzzle effect enhancement
  galleryImages.forEach((img, index) => {
    // Add puzzle piece data attribute
    img.setAttribute('data-puzzle-piece', index + 1);
    
    // Wait for initial animation to complete before enabling hover effects
    setTimeout(() => {
      // Add mouse enter effect for puzzle pieces
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.04) rotate(0deg)';
        img.style.zIndex = '10';
        
        // Create puzzle piece glow effect
        const glow = document.createElement('div');
        glow.className = 'puzzle-glow';
        glow.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          border-radius: 10px;
          pointer-events: none;
          z-index: 1;
          animation: puzzleGlow 0.6s ease-out;
        `;
        
        img.appendChild(glow);
        
        // Remove glow after animation
        setTimeout(() => {
          if (glow.parentNode) {
            glow.parentNode.removeChild(glow);
          }
        }, 600);
      });
      
      // Add mouse leave effect
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0deg)';
        img.style.zIndex = '1';
      });
    }, 10000); // Wait 10 seconds for initial animation to complete
    
    // Add click puzzle effect
    img.addEventListener('click', (e) => {
      // Create puzzle piece scatter effect
      const rect = img.getBoundingClientRect();
      const pieces = 6;
      
      for (let i = 0; i < pieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.cssText = `
          position: fixed;
          width: ${rect.width / 3}px;
          height: ${rect.height / 2}px;
          background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          border-radius: 5px;
          pointer-events: none;
          z-index: 1000;
          left: ${rect.left + (i % 3) * (rect.width / 3)}px;
          top: ${rect.top + Math.floor(i / 3) * (rect.height / 2)}px;
          animation: puzzleScatter 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(piece);
        
        // Remove piece after animation
        setTimeout(() => {
          if (piece.parentNode) {
            piece.parentNode.removeChild(piece);
          }
        }, 800);
      }
    });
  });
});

// Add CSS for puzzle effects
const puzzleStyles = `
  @keyframes puzzleGlow {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  
  @keyframes puzzleScatter {
    0% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.5) rotate(45deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
    }
  }
`;

// Inject puzzle styles
const styleSheet = document.createElement('style');
styleSheet.textContent = puzzleStyles;
document.head.appendChild(styleSheet);

const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('open');
});

// Menü açıkken dışarı tıklayınca kapansın
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburgerBtn.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});
