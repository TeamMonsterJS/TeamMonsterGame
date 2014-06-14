/// <reference path="_reference.js" />
var games = (function () {
    var theGame,
        thePlayer,
        theGhosts,
        theRenderer,
        theLevel,
        intervalID,
        directions = gameObjects.getDirections();

    function Game(renderer, level, player, ghosts) {
        this.renderer = renderer;
        this.level = level;
        this.player = player;
        this.ghosts = ghosts;
        this.bindKeyEvents();
        this.score = 0;
    }

    function canMove(position, speed, direction) {
        var objXPosition = position.x,
            objYPosition = position.y;

        objXPosition += speed * directions[direction].dx;
        objYPosition += speed * directions[direction].dy;

        if (theLevel[objYPosition][objXPosition] === 1) {
            return false;
        }

        return true;
    }

    function animationFrame() {
        var gameOver = false,
            currentGhost,
            i;

        if (canMove(thePlayer.position, thePlayer.speed, thePlayer.direction)) {
            thePlayer.move(thePlayer.speed);
        }

        for (i = 0; i < theGhosts.length; i += 1) {
            currentGhost = theGhosts[i];
            if (currentGhost.canSeePacMan(thePlayer, theLevel)) {
                currentGhost.chasePacMan(thePlayer);
            } else if (canMove(currentGhost.position, currentGhost.speed, currentGhost.direction)) {
                currentGhost.checkPossibleTurns(theLevel);
                currentGhost.getRandomOtherDirection();
            } else {
                currentGhost.checkPossibleDirections(theLevel);
                currentGhost.getRandomOtherDirection();
            }

            currentGhost.move(currentGhost.speed);
            currentGhost.svgForm.animate({
                x: 20 * currentGhost.position.x,
                y: 20 * currentGhost.position.y
            }, 150);
        }

        thePlayer.svgForm.animate(
            {
                cx: 20 * (thePlayer.position.x + thePlayer.radius),
                cy: 20 * (thePlayer.position.y + thePlayer.radius),
                r: 20 * thePlayer.radius
            }, 150);


        window.setTimeout(animationFrame, 150);
    }

    Game.prototype.start = function () {
        theGame = this;
        thePlayer = this.player;
        theRenderer = this.renderer;
        theLevel = this.level;
        theGhosts = this.ghosts;
        theRenderer.renderLevel(this.level);
        animationFrame();
    };

    Game.prototype.bindKeyEvents = function () {
        window.addEventListener('keydown', function (ev) {
            if (!ev) {
                ev = window.event;
            }

            switch (ev.keyCode) {
                case 37:
                    if (canMove(thePlayer.position, thePlayer.speed, 'left')) {
                        thePlayer.direction = 'left';
                    }
                    break;
                case 38:
                    if (canMove(thePlayer.position, thePlayer.speed, 'up')) {
                        thePlayer.direction = 'up';
                    }
                    break;
                case 39:
                    if (canMove(thePlayer.position, thePlayer.speed, 'right')) {
                        thePlayer.direction = 'right';
                    }
                    break;
                case 40:
                    if (canMove(thePlayer.position, thePlayer.speed, 'down')) {
                        thePlayer.direction = 'down';
                    }
                    break;
                default:
                    break;
            }
        });
    };

    return {
        get: function (renderer, level, player, ghosts) {
            return new Game(renderer, level, player, ghosts);
        }
    };
}());