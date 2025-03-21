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
        lineStart.x = event.layerX;
        lineStart.y = event.layerY;
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

        lineEnd.x = event.layerX;
        lineEnd.y = event.layerY;
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.stroke();
        conn.send({
            type: 'draw',
            lineStart: lineStart,
            lineEnd: lineEnd
        });

        ctx.beginPath();
        lineStart.x = event.layerX;
        lineStart.y = event.layerY;
        ctx.moveTo(lineStart.x, lineStart.y);
    });
    // Support touch devices
    canvas.addEventListener('touchstart', (event) => {
        drawing = true;
        ctx.beginPath();
        const touch = event.touches[0];
        lineStart.x = touch.clientX - canvas.offsetLeft;
        lineStart.y = touch.clientY - canvas.offsetTop;
        ctx.moveTo(lineStart.x, lineStart.y);
        event.preventDefault();
    });

    canvas.addEventListener('touchend', () => {
        drawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('touchmove', (event) => {
        event.preventDefault();
        if (!drawing) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';

        const touch = event.touches[0];
        
        lineEnd.x = touch.clientX - canvas.offsetLeft;
        lineEnd.y = touch.clientY - canvas.offsetTop;
        ctx.lineTo(lineEnd.x, lineEnd.y);

        ctx.stroke();
        conn.send({
            type: 'draw',
            lineStart: lineStart,
            lineEnd: lineEnd
        });

        ctx.beginPath();
        lineStart.x = touch.clientX - canvas.offsetLeft;
        lineStart.y = touch.clientY - canvas.offsetTop;
        ctx.moveTo(lineStart.x, lineStart.y);
    });
}