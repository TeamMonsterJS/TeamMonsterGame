/// <reference path="_reference.js" />
var games = (function () {
    var theGame,
        thePlayer,
        theGhosts,
        theRenderer,
        theLevel,
        thePacDots,
        intervalID,
        directions = gameObjects.getDirections();

    function Game(renderer, level, player, ghosts, pacDots) {
        this.renderer = renderer;
        this.level = level;
        this.player = player;
        this.ghosts = ghosts;
        this.pacDots = pacDots;
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

    function isPacManCaught() {
        var i;

        for (i = 0; i < theGhosts.length; i += 1) {
            if (theGhosts[i].position.x === thePlayer.position.x &&
                theGhosts[i].position.y === thePlayer.position.y) {
                return true;
            }
        }

        return false;
    }

    function isPacManOnPacDot() {
        if (theLevel[thePlayer.position.y][thePlayer.position.x] == 2) {
            console.log(thePlayer.position.x + ' ' + thePlayer.position.y);
            return true;
        }

        console.log(thePlayer.position.x + ' ' + thePlayer.position.y + "!");
        return false;
    }

    function getPacDotIndex(pacman) {
        var i;

        for (i = 0; i < thePacDots.length; i += 1) {
            if (thePacDots[i].position.x === pacman.position.x &&
                thePacDots[i].position.y === pacman.position.y) {
                return i;
            }
        }
    }

    function animationFrame() {
        var gameOver = false,
            currentGhost,
            currentPacDot,
            i;

        if (isPacManCaught(thePlayer, theGhosts)) {
            theGame.restart();
        }

        if (isPacManOnPacDot()) {
            i = getPacDotIndex(thePlayer);
            thePacDots[i].svgForm.animate({
                r: 0
            }, 20, function () {
                theLevel[thePacDots[i].position.y][thePacDots[i].position.x] = 0;
                thePacDots.splice(i, 1);
            });
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
        thePacDots = this.pacDots;
        theRenderer.renderLevel(this.level);
        theRenderer.renderPacDots(this.pacDots);
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
        get: function (renderer, level, player, ghosts, pacDots) {
            return new Game(renderer, level, player, ghosts, pacDots);
        }
    };
}());