const BACKGROUND_COLOR = '#000000';
const LINE_COLOUR = '#FFFFFF';
const LINE_WIDTH = 15;

var currentX = 0;
var currrentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;

function prepareCanvas() {
    // console.log('Preparing Canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    var isPainting = false;

    document.addEventListener('mousedown', function (event) {
        // console.log('Mouse pressed');
        isPainting = true;
        currentX = event.clientX - canvas.offsetLeft;
        currrentY = event.clientY - canvas.offsetTop;
    });

    document.addEventListener('mousemove', function (event) {

        if (isPainting) {

            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;

            previousY = currrentY;
            currrentY = event.clientY - canvas.offsetTop;

            draw();
        }
    });

    document.addEventListener('mouseup', function (event) {
        // console.log('Mouse released');
        isPainting = false;
    });

    canvas.addEventListener('mouseleave', function (event) {
        isPainting = false;
    });

    // touch events
    document.addEventListener('touchstart', function (event) {
        // console.log('touchdown');
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currrentY = event.touches[0].clientY - canvas.offsetTop;
    });

    canvas.addEventListener('touchend', function (event) {
        isPainting = false;
    });

    canvas.addEventListener('touchcancel', function (event) {
        isPainting = false;
    });

    canvas.addEventListener('touchmove', function (event) {

        if (isPainting) {

            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;

            previousY = currrentY;
            currrentY = event.touches[0].clientY - canvas.offsetTop;

            draw();
        }
    });
}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currrentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = 0;
    currrentY = 0;
    previousX = 0;
    previousY = 0;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}