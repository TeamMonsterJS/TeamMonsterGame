/// <reference path="_reference.js" />
var games = (function () {
    var theGame,
        thePlayer,
        theRenderer,
        theLevel,
        intervalID;

    function Game(renderer, level, player, ghosts) {
        this.renderer = renderer;
        this.level = level;
        this.player = player;
        this.ghosts = ghosts;
        this.bindKeyEvents();
        this.score = 0;
    }

    // Not working
    function canMove(obj) {
        var objPosition = obj.position;
        direction = gameObjects.getDirections();
        objPosition.x += this.speed * direction[obj.direction].dx;
        objPosition.y += this.speed * direction[obj.direction].dy;

        if (theLevel[objPosition.y][objPosition.x] === undefined ||
            theLevel[objPosition.y][objPosition.x] === true) {
            return false;
        } else {
            return true;
        }
    }

    function animationFrame() {
        var gameOver = false,
            pacmanPosition = thePlayer.position,
            hasCrashedIntoWall = false,
            hasCrashedIntoItself = false;

        theRenderer.eraseMovingObjects();        
        thePlayer.move();       
        theRenderer.renderPacMan(thePlayer);
        requestAnimationFrame(animationFrame);
    }

    Game.prototype.start = function () {
        theGame = this;
        thePlayer = this.player;
        theRenderer = this.renderer;
        theLevel = this.level;
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
                    thePlayer.direction = 'left';
                    break;
                case 38:
                    thePlayer.direction = 'up';
                    break;
                case 39:
                    thePlayer.direction = 'right';
                    break;
                case 40:
                    thePlayer.direction = 'down';
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