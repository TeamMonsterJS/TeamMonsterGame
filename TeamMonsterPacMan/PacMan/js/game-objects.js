var gameObjects = (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }

    function GameObject(position) {
        this.position = position;
    }

    function PacDot(position, isPower) {
        GameObject.call(this, position);
        this.isPowerDot = isPower;
    }

    PacDot.prototype = new GameObject();
    PacDot.prototype.constructor = PacDot;

    function MovingObject(position, name, direction) {
        GameObject.call(this, position);
        this.name = name;
        this.direction = direction;
        this.speed = 10;
    }

    MovingObject.prototype = new GameObject()
    MovingObject.prototype.constructor = MovingObject;

    MovingObject.prototype.move = function () {
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
    }


    function Ghost(position, name, direction, imgNumber) {
        MovingObject.call(this, position, name, direction);
        this.appearance = 'images/ghost-' + imgNumber + '.png';
    }

    Ghost.prototype = new MovingObject();
    Ghost.prototype.constructor = Ghost;

    Ghost.prototype.directionInvert = function () {
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
    };

    function PacMan(position, name, direction, speed) {
        MovingObject.call(this, position, name, direction);
        this.angle = 120;        
    }

    PacMan.prototype = new MovingObject();
    PacMan.prototype.constructor = PacMan;

    PacMan.prototype.eat = function () {
        // TODO: Implement logic for eating
    };

    function makeMatrix(rows, cols, step) {
        rows *= step;
        cols *= step;

        var matrix = new Array(rows);
        for (var i = 0; i < rows; i += step) {
            matrix[i] = new Array(cols);
        }

        return matrix;
    }
}());
