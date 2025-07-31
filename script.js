document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.optimized-image'));
    const columns = window.innerWidth > 1200 ? 4 : window.innerWidth > 900 ? 3 : 2;

    // Group images by rows
    const rows = [];
    for (let i = 0; i < images.length; i += columns) {
        rows.push(images.slice(i, i + columns));
    }

    rows.forEach((row, rowIndex) => {
        let loadedCount = 0;
        row.forEach(img => {
            const placeholder = img.previousElementSibling;
            let fallbackTried = false;
            const fallbackUrl = img.getAttribute('data-fallback');

            function showImage() {
                img.classList.add('loaded');
                if (placeholder) placeholder.style.display = 'none';
                loadedCount++;
                // Once all in row loaded
                if (loadedCount === row.length) {
                    row.forEach(image => image.classList.add('visible'));
                }
            }

            function showFailed() {
                if (placeholder) placeholder.style.display = 'none';
                img.style.display = 'none';
                const failMsg = document.createElement('div');
                failMsg.className = 'failed';
                failMsg.textContent = 'Failed to load';
                img.parentNode.appendChild(failMsg);
            }

            img.addEventListener('load', showImage);
            img.addEventListener('error', () => {
                if (!fallbackTried && fallbackUrl) {
                    fallbackTried = true;
                    img.src = fallbackUrl;
                } else {
                    showFailed();
                }
            });
        });
    });
});
