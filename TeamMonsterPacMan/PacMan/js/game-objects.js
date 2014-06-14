﻿var gameObjects = (function () {
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
        this.speed = 1;
        this.svgForm = null;
    }

    MovingObject.prototype = new GameObject();
    MovingObject.prototype.constructor = MovingObject;

    MovingObject.prototype.move = function (speed) {
        this.position.x += speed * direction[this.direction].dx;
        this.position.y += speed * direction[this.direction].dy;
    };

    function Ghost(position, direction, imgNumber) {
        MovingObject.call(this, position, direction);
        this.appearance = 'images/ghost-' + imgNumber + '.png';
        this.possibleDirections;        
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
        this.direction = this.possibleDirections[
            Math.floor(Math.random() * this.possibleDirections.length)
        ];
    };

    Ghost.prototype.canSeePacMan = function (pacman, level) {
        var i, min, max;

        if (this.position.x !== pacman.position.x && this.position.y !== pacman.position.y) {
            return false;
        }

        if (this.position.y === pacman.position.y) {
            min = Math.min(this.position.x, pacman.position.x);
            max = Math.max(this.position.x, pacman.position.x);
            for (i = min + 1; i < max; i += 1) {
                if (level[this.position.y][i] === 1) {
                    return false;
                }
            }
        }

        if (this.position.x === pacman.position.x) {
            min = Math.min(this.position.y, pacman.position.y);
            max = Math.max(this.position.y, pacman.position.y);
            for (i = min + 1; i < max; i += 1) {
                if (level[i][this.position.x] === 1) {
                    return false;
                }
            }
        }

        return true;
    };

    Ghost.prototype.chasePacMan = function (pacman) {
        if (this.position.x === pacman.position.x) {
            if (this.position.y < pacman.position.y) {
                this.direction = 'down';
            } else {
                this.direction = 'up';
            }
        } else if (this.position.y === pacman.position.y) {
            if (this.position.x < pacman.position.x) {
                this.direction = 'right';
            } else {
                this.direction = 'left';
            }
        }
    };

    Ghost.prototype.checkPossibleDirections = function (level) {
        var reverseDirection;

        this.possibleDirections = [];
        if (this.direction === 'left') {
            reverseDirection = 'right';
        } else if (this.direction === 'right') {
            reverseDirection = 'left';
        } else if (this.direction === 'up') {
            reverseDirection = 'down';
        } else if (this.direction === 'down') {
            reverseDirection = 'up';
        }

        if (level[this.position.y][this.position.x - this.speed] !== 1) {
            this.possibleDirections.push('left');
        }

        if (level[this.position.y][this.position.x + this.speed] !== 1) {
            this.possibleDirections.push('right');
        }

        if (level[this.position.y + this.speed][this.position.x] !== 1) {
            this.possibleDirections.push('down');
        }

        if (level[this.position.y - this.speed][this.position.x] !== 1) {
            this.possibleDirections.push('up');
        }

        if (this.possibleDirections.length > 1) {
            if (this.possibleDirections.indexOf(reverseDirection) !== -1) {
                this.possibleDirections.splice(this.possibleDirections.indexOf(reverseDirection), 1);
            }
        }
    };

    // TODO: causes problems
    Ghost.prototype.checkPossibleTurns = function (level) {
        this.possibleDirections = [this.direction];

        if (level[this.position.y][this.position.x - this.speed] !== 1) {
            if (this.direction !== 'right'); {
                this.possibleDirections.push('left');
            }
        }

        if (level[this.position.y][this.position.x + this.speed] !== 1) {
            if (this.direction !== 'left') {
                this.possibleDirections.push('right');
            }
        }

        if (level[this.position.y + this.speed][this.position.x] !== 1) {
            if (this.direction !== 'up') {
                this.possibleDirections.push('down');
            }
        }

        if (level[this.position.y - this.speed][this.position.x] !== 1) {
            if (this.direction !== 'down') {
                this.possibleDirections.push('up');
            }
        }
    };

    function PacMan(position, name, direction) {
        MovingObject.call(this, position, direction);
        this.name = name;
        this.angle = 120;
        this.radius = 0.5;
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
