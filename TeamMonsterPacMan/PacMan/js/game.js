﻿/// <reference path="_reference.js" />
var games = (function () {
    var theGame,
        thePlayer,
        theGhosts,
        theRenderer,
        theScore,
        theLevel,
        thePoints,
        theGhostRunnig,
        thePowerTicks,
        intervalID,
        directions = gameObjects.getDirections();

    function Game(renderer, level, player, ghosts, score) {
        this.renderer = renderer;
        this.level = level;
        this.player = player;
        this.ghosts = ghosts;        
        this.powerTicks = 0;
        this.ghostRunnig = false;
        this.bindKeyEvents();
        this.score = score;
        this.points = 0;
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

    function isPacManOnGhost() {
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
            return true;
        }

        return false;
    }

    function isPacManOnPowerDot() {
        if (theLevel[thePlayer.position.y][thePlayer.position.x] == 3) {
            return true;
        }

        return false;
    }

    function makeGhostsBlue() {
        theRenderer.eraseMovingObjects();
        thePlayer.svgForm = theRenderer.renderPacMan(thePlayer);
        var i;
        for (i = 0; i < theGhosts.length; i += 1) {
            theGhosts[i].appearance = 'images/ghost-' + 5 + '.png';
            theGhosts[i].svgForm = theRenderer.renderGhost(theGhosts[i]);
        }
    }

    function makeGhostOrange() {
        theRenderer.eraseMovingObjects();
        thePlayer.svgForm = theRenderer.renderPacMan(thePlayer);
        var i;
        for (i = 0; i < theGhosts.length; i += 1) {
            theGhosts[i].appearance = 'images/ghost-' + 1 + '.png';
            theGhosts[i].svgForm = theRenderer.renderGhost(theGhosts[i]);
        }
    }

    function getCaughtGhost() {
        var i;

        for (i = 0; i < theGhosts.length; i += 1) {
            if (theGhosts[i].position.x === thePlayer.position.x &&
                theGhosts[i].position.y === thePlayer.position.y) {
                return theGhosts[i];
            }
        }
    }

    function animationFrame() {
        var gameOver = false,
            currentGhost,
            i;

        if (theGhostRunnig && thePowerTicks > 0) {
            thePowerTicks--;
        } else if (theGhostRunnig && thePowerTicks === 0) {
            theGhostRunnig = false;
            makeGhostOrange();
        }

        if (isPacManOnGhost(thePlayer, theGhosts)) {
            if (theGhostRunnig) {
                currentGhost = getCaughtGhost();
                currentGhost.position = { x: 14, y: 14 };
                currentGhost.svgForm.animate({
                    x: 20 * 14,
                    y: 20 * 14
                }, 150);
            } else {
                theGame.restart();                
            }
        }

        if (isPacManOnPacDot()) {
            theLevel[thePlayer.position.y][thePlayer.position.x] = 0;
            theRenderer.erasePacDot(thePlayer.position);
            thePoints += 1;
        }

        if (isPacManOnPowerDot()) {
            theLevel[thePlayer.position.y][thePlayer.position.x] = 0;
            theRenderer.erasePacDot(thePlayer.position);
            theGhostRunnig = true;
            thePowerTicks = 100;
            makeGhostsBlue();
        }

        if (canMove(thePlayer.position, thePlayer.speed, thePlayer.direction)) {
            thePlayer.move(thePlayer.speed);           
        }

        for (i = 0; i < theGhosts.length; i += 1) {
            currentGhost = theGhosts[i];
            if (currentGhost.canSeePacMan(thePlayer, theLevel)) {
                if (!theGhostRunnig) {
                    currentGhost.chasePacMan(thePlayer);
                } else {
                    if (currentGhost.isRunningAgainsPacman(thePlayer)) {
                        currentGhost.checkPossibleDirections(theLevel);
                        theGhosts[i].escapePacMan(thePlayer);
                    } else if (canMove(currentGhost.position, currentGhost.speed, currentGhost.direction)) {
                        currentGhost.checkPossibleTurns(theLevel);
                        currentGhost.getRandomOtherDirection();
                    } else {
                        currentGhost.checkPossibleDirections(theLevel);
                        currentGhost.getRandomOtherDirection();
                    }
                }
            } else if (canMove(currentGhost.position, currentGhost.speed, currentGhost.direction)) {
                currentGhost.checkPossibleTurns(theLevel);
                currentGhost.getRandomOtherDirection();
            } else {
                currentGhost.checkPossibleDirections(theLevel);
                currentGhost.getRandomOtherDirection();
            }

            if (isPacManOnGhost(thePlayer, theGhosts) === false) {
                currentGhost.move(currentGhost.speed);
            }
        }                           

        thePlayer.svgForm.animate(
           {
               cx: 20 * (thePlayer.position.x + thePlayer.radius),
               cy: 20 * (thePlayer.position.y + thePlayer.radius),
               r: 20 * thePlayer.radius
           }, 200);

        for (i = 0; i < theGhosts.length; i += 1) {
            theGhosts[i].svgForm.animate({
                x: 20 * theGhosts[i].position.x,
                y: 20 * theGhosts[i].position.y
            }, 200);
        }
    }

    Game.prototype.start = function () {
        theGame = this;
        thePlayer = this.player;
        theRenderer = this.renderer;
        theLevel = this.level;
        theGhosts = this.ghosts;
        thePowerTicks = this.powerTicks;
        theGhostRunnig = this.ghostRunnig;
        theRenderer.renderLevel(this.level);
        theScore = this.score;
        thePoints = this.points;
        this.score.draw();
        intervalID = window.setInterval(animationFrame, 200);
    };

    Game.prototype.stop = function () {
        window.clearInterval(intervalID);
    };

    Game.prototype.run = function () {
        intervalID = window.setInterval(animationFrame, 200);
    };

    Game.prototype.restart = function () {
        theGame.stop();

        thePlayer.lives -= 1;
        theScore.deleteHeart();
        
        if (thePlayer.lives < 0) {
            theGame.over();
        }

        thePlayer.position = { x: 14, y: 22 };
        thePlayer.direction = 'up';

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

        window.setTimeout(theGame.run(), 2000);        
    };

    Game.prototype.over = function () {
        window.clearInterval(intervalID);
        theScore.changeScore(thePoints);
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
        get: function (renderer, level, player, ghosts, score) {
            return new Game(renderer, level, player, ghosts, score);
        }
    };
}());