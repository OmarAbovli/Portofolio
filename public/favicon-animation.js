// Animated Terminal Favicon
let frame = 0;
const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');

function drawFavicon() {
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 32, 32);

    // Background
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 32, 32);

    // Terminal window border
    ctx.strokeStyle = '#3a3a3c';
    ctx.lineWidth = 1;
    ctx.strokeRect(2, 2, 28, 28);

    // Traffic lights
    const lights = [
        { x: 5, color: '#ff5f56' },
        { x: 10, color: '#ffbd2e' },
        { x: 15, color: '#27c93f' }
    ];

    lights.forEach(light => {
        ctx.fillStyle = light.color;
        ctx.beginPath();
        ctx.arc(light.x, 7, 1.5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Terminal prompt
    ctx.fillStyle = '#30D158';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('>', 6, 20);

    // Blinking cursor
    if (Math.floor(frame / 30) % 2 === 0) {
        ctx.fillStyle = '#0A84FF';
        ctx.fillRect(12, 14, 6, 8);
    }

    frame++;

    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL();
    document.getElementsByTagName('head')[0].appendChild(link);
}

// Animate at 60fps
setInterval(drawFavicon, 1000 / 60);
