function startGame(conn){

    console.log("Starting game with: ", conn);
    changeScreen('JoinedScreen', 'CanvasScreen');
    changeScreen('HostingScreen', 'CanvasScreen');

    canvas = document.getElementById('draw-canvas');
    ctx = canvas.getContext('2d');

    let drawing = false;

    canvas.addEventListener('mousedown', (event) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!drawing) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';

        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    });
    // Support touch devices
    canvas.addEventListener('touchstart', (event) => {
        drawing = true;
        ctx.beginPath();
        event.preventDefault();
    });

    canvas.addEventListener('touchend', () => {
        drawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('touchmove', (event) => {
        if (!drawing) return;
        const touch = event.touches[0];
        ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        event.preventDefault();
    });
}