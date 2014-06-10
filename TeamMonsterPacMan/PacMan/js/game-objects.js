var gameObjects = (function () {
    var direction = {
        up: {
            dx: 0,
            dy: -1
        },
        down: {
            dx: 0,
            dy: 1
        },
        left: {
            dx: -1,
            dy: 0
        },
        right: {
            dx: 1,
            dy: 0
        }
    };

    function GameObject(position) {
        this.position = position;
        this.size = 20;
    }

    function PacDot(position) {
        GameObject.call(this, position);
        this.radius = 3;
        this.color = 'yellow';
    }

    PacDot.prototype = new GameObject();
    PacDot.prototype.constructor = PacDot;

    function PowerDot(position) {
        GameObject.call(this, position);
        this.radius = 10;
        this.color = 'white';
    }

    PowerDot.prototype = new GameObject();
    PowerDot.prototype.constructor = PowerDot;

    function MovingObject(position, direction) {
        GameObject.call(this, position);
        this.name = name;
        this.direction = direction;
        this.speed = 2;
    }

    MovingObject.prototype = new GameObject();
    MovingObject.prototype.constructor = MovingObject;

    MovingObject.prototype.move = function () {
        this.position.x += this.speed * direction[this.direction].dx;
        this.position.y += this.speed * direction[this.direction].dy;
    };    

    function Ghost(position, direction, imgNumber) {
        MovingObject.call(this, position, direction);
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

    Ghost.prototype.getRandomOtherDirection = function () {
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

    function PacMan(position, name, direction) {
        MovingObject.call(this, position, direction);
        this.name = name;
        this.angle = 120;
        this.radius = 10;
    }

    PacMan.prototype = new MovingObject();
    PacMan.prototype.constructor = PacMan;

    //PacMan.prototype.eat = function (position, direction, imgNumber) {
    //    // TODO: Implement logic for eating
    //};

    return {
        getPacMan: function (position, name, direction) {
            return new PacMan(position, name, direction);
        },
        getGhost: function (position, direction, imgNumber) {
            return new Ghost(position, direction, imgNumber);
        },
        PacDotType: PacDot,
        PowerDotType: PowerDot,
        getDirections: function () {
            return direction;
        }
    };
}());
