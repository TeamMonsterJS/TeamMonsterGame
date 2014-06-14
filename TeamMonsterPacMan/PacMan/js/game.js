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

    function isPacManCaught(pacman, ghosts) {
        var i;

        for (i = 0; i < ghosts.length; i += 1) {
            if (ghosts[i].position.x === pacman.position.x &&
                ghosts[i].position.y === pacman.position.y) {
                return true;
            }
        }

        return false;
    }

    function animationFrame() {
        var gameOver = false,
            currentGhost,
            i;

        if (isPacManCaught(thePlayer, theGhosts)) {
            theGame.restart();
        }

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
            if (isPacManCaught(thePlayer, theGhosts) === false) {
                currentGhost.move(currentGhost.speed);
            }
        }

        thePlayer.svgForm.animate(
           {
               cx: 20 * (thePlayer.position.x + thePlayer.radius),
               cy: 20 * (thePlayer.position.y + thePlayer.radius),
               r: 20 * thePlayer.radius
           }, 150);

        for (i = 0; i < theGhosts.length; i += 1) {
            theGhosts[i].svgForm.animate({
                x: 20 * theGhosts[i].position.x,
                y: 20 * theGhosts[i].position.y
            }, 150);
        }
    }

    Game.prototype.start = function () {
        theGame = this;
        thePlayer = this.player;
        theRenderer = this.renderer;
        theLevel = this.level;
        theGhosts = this.ghosts;
        theRenderer.renderLevel(this.level);
        intervalID = window.setInterval(animationFrame, 150);
    };

    Game.prototype.stop = function () {
        window.clearInterval(intervalID);
    };

    Game.prototype.restart = function () {
        thePlayer.lives -= 1;

        if (thePlayer.lives < 0) {
            theGame.over();
        }

        thePlayer.position = { x: 14, y: 22 };
        theGhosts[0].position = { x: 12, y: 14 };
        theGhosts[1].position = { x: 13, y: 14 };
        theGhosts[2].position = { x: 14, y: 14 };
        theGhosts[3].position = { x: 15, y: 14 };
        theGhosts[4].position = { x: 16, y: 14 };
        theGhosts[5].position = { x: 17, y: 14 };
        theGhosts[6].position = { x: 12, y: 13 };
        theGhosts[7].position = { x: 13, y: 13 };
        theGhosts[8].position = { x: 14, y: 13 };
        theGhosts[9].position = { x: 15, y: 13 };
        theGhosts[10].position = { x: 16, y: 13 };
        theGhosts[11].position = { x: 17, y: 13 };
    };

    Game.prototype.over = function () {
        window.clearInterval(intervalID);
        theRenderer.eraseMovingObjects();
        theRenderer.writeGameOver();
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
                case 80:
                    theGame.stop();
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