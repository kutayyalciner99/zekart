document.addEventListener("DOMContentLoaded", () => {
  // Only animate vogue-gallery images if they exist
  const vogueImages = document.querySelectorAll(".vogue-gallery img");

  if (vogueImages.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target); // Don't replay animation
        }
      });
    }, {
      threshold: 0.3
    });

    vogueImages.forEach(img => observer.observe(img));
  }
});

// Background animation function - only run if SVG elements exist
function animateBG() {
  // Check if SVG elements exist before trying to animate them
  const c1 = document.getElementById('c1');
  const c2 = document.getElementById('c2');
  const c3 = document.getElementById('c3');
  const l1 = document.getElementById('l1');
  const stars = document.querySelectorAll('.star');

  // Only animate if SVG elements are present
  if (c1 && c2 && c3 && l1 && stars.length > 0) {
    let t = 0;
    function animate() {
      t += 0.008;
      c1.setAttribute('r', 500 + Math.sin(t) * 18);
      c2.setAttribute('r', 350 + Math.cos(t * 1.2) * 12);
      c3.setAttribute('r', 200 + Math.sin(t * 0.8) * 8);

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

      stars.forEach((star, i) => {
        let baseX = parseFloat(star.getAttribute('cx'));
        let baseY = parseFloat(star.getAttribute('cy'));
        star.setAttribute('cx', baseX + Math.sin(t * 1.5 + i) * 2);
        star.setAttribute('cy', baseY + Math.cos(t * 1.3 + i) * 2);
      });

      requestAnimationFrame(animate);
    }
    animate();
  }
}

// Start background animation when DOM is loaded
document.addEventListener("DOMContentLoaded", animateBG);
