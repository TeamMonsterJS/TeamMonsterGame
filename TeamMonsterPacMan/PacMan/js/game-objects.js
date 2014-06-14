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
    this.svgForm = false;
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
function MovingObject(position, name, direction, speed) {
    // properties
    proto(MovingObject.prototype).constructor.call(this, position);
    this.name = name;
    this.direction = direction;
    this.speed = speed;

    this.move = function(level) {
        var stepX = 20,
            stepY = 20;

        if (this.direction === 'left') {
            stepX *= -1;
            stepY = 0;
        } else if (this.direction === 'up') {
            stepX = 0;
            stepY *= -1;
        } else if (this.direction === 'right') {
            stepY = 0;
        } else if (this.direction === 'down') {
            stepX = 0;
        }

        var newX = this.position.x + stepX;
        var newY = this.position.y + stepY;

        if (this.svgForm) {
            this.svgForm.animate({
                x: newX,
                y: newY,
            }, 500);
        }

        // Reentering x and y for the svg form since it gives float coordinates if only doing it in
        // .animate()
        this.svgForm.attr({
            x: newX,
            y: newY,
        });

        this.position.x += stepX;
        this.position.y += stepY;
    };

    this.changeState = function() {
        // TODO: Must be implemented in diferent way for Ghost and PacMan
    };

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
    this.eat = function (dots) {
        // TODO: Implement logic for eating
        var index = -1;
        for (var i = 0; i < dots.length; i += 1) {
            if (dots[i].position.x === this.position.x && dots[i].position.y === this.position.y) {
                index = i;
                return index;
            }
        }

        this.eatenDots++;
        this.score += 100;
        //var index = dots.map(function (e) { return e.position.x }).indexOf(this.position);
        //if (index !== -1) {
        //    dots.splice(index, 1);
        //    console.log(index);
        //}

        return index;
    }
    this.collide = function (ghosts) {
        for (var ghosty in ghosts) {
            if (ghosts[ghosty].position.x == this.position.x && ghosts[ghosty].position.y == this.position.y) {
                new StartGame();                
            }
        }
    }
    /*
    this.collide = function (ghosts) {
        console.log('bbb ->>>>>' + this.position.x + ' and y is: ' + this.position.y);
        for (var ghosty in ghosts) {
            if (ghosts[ghosty].position.x == this.position.x && ghosts[ghosty].position.y == this.position.y) {
                startGame();
                console.log('aaaa');
            }
        }
    }
    */
}
PacMan.prototype = Object.create(MovingObject.prototype);

PacMan.prototype.constructor = PacMan;

PacMan.prototype = {
    move: function (level) {

        if (this.direction === 'right') {
            if (level[this.position.x + 20] && level[this.position.y] && level[this.position.x + 20][this.position.y] === true) {
                return;
            }
            if (!level[this.position.y]) {
                return;
            }
            this.position.x += this.speed;
        }
        else if (this.direction === 'left') {
            if (level[this.position.x - 20] && level[this.position.y] && level[this.position.x - 20][this.position.y] === true) {
                return;
            }
            if (!level[this.position.y]) {
                return;
            }
            this.position.x -= this.speed;
        }
        else if (this.direction === 'up') {
            if (level[this.position.x] && level[this.position.y - 20] && level[this.position.x][this.position.y - 20] === true) {
                return;
            }
            if (!level[this.position.x]) {
                return;
            }
            this.position.y -= this.speed;
        }
        else if (this.direction === 'down') {
            if (level[this.position.x] && level[this.position.y + 20] && level[this.position.x][this.position.y + 20] === true) {
                return;
            }
            if (!level[this.position.x]) {
                return;
            }
            this.position.y += this.speed;
        }
        

        //old

        //if (this.direction === 'right' && possibleStep(this.position.x + this.speed, this.position.y, level)) {
        //    this.position.x += this.speed;
        //}
        //else if (this.direction === 'left' && possibleStep(this.position.x - this.speed, this.position.y, level)) {
        //    this.position.x -= this.speed;
        //}
        //else if (this.direction === 'up' && possibleStep(this.position.x, this.position.y - this.speed, level)) {
        //    this.position.y -= this.speed;
        //}
        //else if (this.direction === 'down' && possibleStep(this.position.x, this.position.y + this.speed, level)) {
        //    this.position.y += this.speed;
        //}

        //Old movement 
        //if (this.direction === 'right') {
        //    this.position.x += this.speed;
        //}
        //else if (this.direction === 'left') {
        //    this.position.x -= this.speed;
        //}
        //else if (this.direction === 'up') {
        //    this.position.y -= this.speed;
        //}
        //else if (this.direction === 'down') {
        //    this.position.y += this.speed;
        //}
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