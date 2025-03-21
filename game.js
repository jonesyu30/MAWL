function startGame(conn){


    console.log("Starting game with: ", conn);
    changeScreen('JoinedScreen', 'CanvasScreen');
    changeScreen('HostingScreen', 'CanvasScreen');

    canvas = document.getElementById('draw-canvas');
    ctx = canvas.getContext('2d');

    let drawing = false;
    var lineStart = {x: 0, y: 0};
    var lineEnd = {x: 0, y: 0};

    conn.on('data', function(data) {
        console.log('Received', data);
        if(data.type == 'draw'){
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(data.lineStart.x, data.lineStart.y);
            ctx.lineTo(data.lineEnd.x, data.lineEnd.y);
            ctx.stroke();
            ctx.closePath();
        }
    });

    canvas.addEventListener('mousedown', (event) => {
        drawing = true;
        ctx.beginPath();
        lineStart.x = event.clientX - canvas.offsetLeft;
        lineStart.y = event.clientY - canvas.offsetTop;
        ctx.moveTo(lineStart.x, lineStart.y);
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

        lineEnd.x = event.clientX - canvas.offsetLeft;
        lineEnd.y = event.clientY - canvas.offsetTop;
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.stroke();
        conn.send({
            type: 'draw',
            lineStart: lineStart,
            lineEnd: lineEnd
        });

        ctx.beginPath();
        lineStart.x = event.clientX - canvas.offsetLeft;
        lineStart.y = event.clientY - canvas.offsetTop;
        ctx.moveTo(lineStart.x, lineStart.y);
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