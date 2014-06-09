// Will save the position at which game object is on
function Position(x, y) {
    this.x = x;
    this.y = y;
}

// -------------- Basic game object --------------
// Basic abstract GameObject which will be inherited
function GameObject(position) {
    this.state = 'eatable';
    this.position = position;
}

// will be used in purpose of inheritance
var proto = Object.getPrototypeOf;

// Actual inheritance with prototype style
function PacDot(position, isPower) {
    proto(PacDot.prototype).constructor.call(this, position);
    this.isPowerDot = isPower;
}

PacDot.prototype = Object.create(GameObject.prototype);

PacDot.prototype.constructor = PacDot;

//-------------- MovingObject -----------------
// Again using prototype inheritance will make objects that will be moveble
// an abstraction that will be used for seting Ghosts and PacMan objects
// after that
function MovingObject(position, name, direction) {
    // properties
    proto(MovingObject.prototype).constructor.call(this, position);
    this.name = name;
    this.direction = direction;
    this.speed = 10;

    // actions will stand as 
    this.move = function () {
        // TODO: Must implement moving algorithm which will be called in the engine just like MovingObject.move()
    }
    this.changeState = function () {
        // TODO: Must be implemented in diferent way for Ghost and PacMan
    }
    this.directionInvert = function () {
        switch (direction) {
            case 'left':
                this.direction = 'right';
                break;
            case 'right':
                this.direction = 'left';
                break;
            case 'up':
                this.direction = 'down';
                break;
            case 'down':
                this.direction = 'up';
                break;
            default:
                break;
        }
    }
}
MovingObject.prototype = Object.create(GameObject.prototype);

MovingObject.prototype.constructor = MovingObject;


// ----------- Ghost Object ----------------
// Making the Ghost object that will be called as instance and made instace of
// in the actual engine and game logic
function Ghost(position, name, direction, imgNumber) {
    proto(Ghost.prototype).constructor.call(this, position, name, direction);
    this.appearance = 'images/ghost-' + imgNumber + '.png';
    this.state = 'enemy';
    this.svgForm = false;

    this.move = function () {
        var stepX = 20,
            stepY = 20;

        switch (this.direction) {
            case 'left':
                stepX *= -1;
                stepY = 0;
                break;
            case 'up':
                stepX = 0;
                stepY *= -1;
                break;
            case 'right':
                stepY = 0;
                break;
            case 'down':
                stepX = 0;
                break;
        }

        var newX = this.position.x + stepX;
        var newY = this.position.y + stepY;

        if (this.svgForm) {
            this.svgForm.animate({
                x: newX,
                y: newY,
            }, 500).onComplete
        }

        // Reentering x and y for the svg form since it gives float coordinates if only doing it in
        // .animate()
        this.svgForm.attr({
            x:newX,
            y:newY,
        });

        this.position.x += stepX;
        this.position.y += stepY;
    };
}
Ghost.prototype = Object.create(MovingObject.prototype);

Ghost.prototype.constructor = Ghost;

// -------------- PacMan Object -------------------
// Making the actual controled object by player
function PacMan(position, name, direction, speed) {
    this.angle = 120;
    proto(PacMan.prototype).constructor.call(this, position, name, direction);
    this.score = 0;
    this.position = position;
    this.speed = speed;
    this.direction = direction;
    this.eatenDots = 0;
    //this.body = paperPacMan.path('M20,20 h-8 a8,8 0 1,0 8,-8 z')
    //    .attr({
    //        stroke: 'red',
    //        fill: 'yellow'
    //    }).rotate(angle, 20, 20);
    this.eat = function () {
        // TODO: Implement logic for eating
    }
}
PacMan.prototype = Object.create(MovingObject.prototype);

PacMan.prototype.constructor = PacMan;

PacMan.prototype = {
    move: function () {
        if (this.direction === 'right') {
            this.position.x += this.speed;
        }
        else if (this.direction === 'left') {
            this.position.x -= this.speed;
        }
        else if (this.direction === 'up') {
            this.position.y -= this.speed;
        }
        else if (this.direction === 'down') {
            this.position.y += this.speed;
        }
    },
    animate: function () {

    }
}

// ---------------- Levels ------------------------
// Making matrix for level
function makeMatrix(rows, cols, step) {
    rows *= step;
    cols *= step;

    var matrix = new Array(rows);
    for (var i = 0; i < rows; i += step) {
        matrix[i] = new Array(cols);
    }

    return matrix;
}


// ------------- TESTS WHILE WRITING CODE ------------------
// Testing stuff if it works and gets us the right info for objects
//var obj = new PacDot(new Position(10, 10));
//console.log(obj.position.x);

//obj = new MovingObject(new Position(10, 10), 'ghost', 'up');
//obj.directionInvert();
//console.log(obj);

var obj = new Ghost(new Position(150, 150), 'ghost', 'up', 1);
//console.log(obj);
//var paper = Raphael(50, 50, 500, 500);
//var ghost1 = paper.image(obj.appearance, obj.position.x, obj.position.y, 100, 100);
//obj.position.x = 200;
//obj.position.y = 200;
//paper.image(obj.appearance, obj.position.x, obj.position.y, 100, 100);

//obj = new PacMan(new Position(10, 10), 'ghost', 'up');
//console.log(obj);
