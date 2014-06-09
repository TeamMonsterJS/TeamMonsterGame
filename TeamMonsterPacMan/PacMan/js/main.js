(function () {
    var paper = Raphael(0, 0, 560, 600);
    var paperPacMan = Raphael(0, 0, 560, 600);

    var dots = [];
    var level = level1(makeMatrix(28, 28, 20));

    var obj = new Ghost(new Position(140, 160), 'ghost', 'left', 1);
    var engine = new Engine(paper);
    var player = new PacMan(new Position(20, 20), 'player', 'right', 1);

    engine.renderer.renderLevel(level, dots);
    engine.renderer.renderPacDots(dots);
    engine.renderer.renderPacMan(player);
    engine.renderer.renderGhost(obj);

    function movingPacMan() {
        paperPacMan.clear();
        engine.renderer.renderPacMan(player);
        player.move();

    }
    setInterval(movingPacMan, 10);

    // while(true) for ghost AI tests after that will be made to function and added to engine
    function getRandomOtherDirection() {
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
    }

    function posibleStep(nextX, nextY) {
        if (level[nextY][nextX]) {
            return false;
        }
        return true;
    }

    function ghostAIMovements() {
        var step = 20;
        var direction = obj.direction;
        var nextX = obj.position.x;
        var nextY = obj.position.y;

        switch (direction) {
            case 'left':
                nextX -= step;
                break;
            case 'up':
                nextY -= step;
                break;
            case 'right':
                nextX += step;
                break;
            case 'down':
                nextY += step;
                break;
            default:
                break;
        }

        var isNextPosible = posibleStep(nextX, nextY);

        if (isNextPosible) {
            obj.move();
        } else {
            obj.direction = getRandomOtherDirection();
        }

        setTimeout(ghostAIMovements, 500);
    }

    ghostAIMovements();
}());
