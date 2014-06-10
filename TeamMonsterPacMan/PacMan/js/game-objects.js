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
        this.radius = 3;
        this.color = 'yellow';
    }

    PacDot.prototype = new GameObject();
    PacDot.prototype.constructor = PacDot;

    PacDot.prototype.erasePacDot = function () {
        var drawingShiftFromPositionTopLeft = 10;

        paper.circle(this.position.x + drawingShiftFromPositionTopLeft, this.position.y + drawingShiftFromPositionTopLeft, dotRadius)
            .attr({
                fill: 'black',
                stroke: 'black'
            })
    }

    function PowerDot(position) {
        GameObject.call(this, position);
        this.radius = 10;
        this.color = 'white';
    }

    PowerDot.prototype = new GameObject();
    PowerDot.prototype.constructor = PowerDot;

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
        this.height = 20;
        this.width = 20;
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

    Ghost.prototype.getRandomOtherDirection() = function () {
        var randomDirection = Math.floor(Math.random() * 4);

        switch (randomDirection) {
            case 0:
                randomDirection = 'left';
                break;
            case 1:
                randomDirection = 'up';
                break;
            case 2:
                randomDirection = 'right';
                break;
            case 3:
                randomDirection = 'down';
                break;
        }

        return randomDirection;
    };

    Ghost.prototype.move = function () {                
        var nextX = obj.position.x;
        var nextY = obj.position.y;

        switch (this.direction) {
            case 'left':
                nextX -= this.speed;
                break;
            case 'up':
                nextY -= this.speed;
                break;
            case 'right':
                nextX += this.speed;
                break;
            case 'down':
                nextY += this.speed;
                break;
            default:
                break;
        }
    };

    function PacMan(position, name, direction, speed) {
        MovingObject.call(this, position, name, direction);
        this.angle = 120;
        this.radius = 8;
    }

    PacMan.prototype = new MovingObject();
    PacMan.prototype.constructor = PacMan;

    PacMan.prototype.eat = function () {
        // TODO: Implement logic for eating
    };   

    return {
        PacDotType: PacDot,
        PowerDotType: PowerDot
    }
}());
