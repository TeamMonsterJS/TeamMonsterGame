function Engine() {
    // here we will have the pressed direction eventListener
    // Sets event listener for the pressed keyes
    var dots = [],
        i,
        j;

    function Renderer(paper, paperPacMan, paperGhostsLayer) {
        paper.rect(0, 0, paper.width, paper.height)
            .attr({
                fill: 'black'
            });

        this.renderGhost = function (ghosts) {
            for (var ghost in ghosts) {
                ghosts[ghost].svgForm = paperGhostsLayer.image(ghosts[ghost].appearance, ghosts[ghost].position.x, ghosts[ghost].position.y, 20, 20);
            }
        };

        // TODO: Needs to be made better is now just for rendering a sample player
        this.renderPacMan = function (pacMan, direction) {

            var playerRadius = 8,
                drawingShiftFromPositionTopLeft = 10;
            paperPacMan.path('M' + (pacMan.position.x + drawingShiftFromPositionTopLeft) + ',' + (pacMan.position.y + drawingShiftFromPositionTopLeft) + ' h-8 a8,8 0 1,0 8,-8 z')
            .attr({
                stroke: 'red',
                fill: 'yellow'
            }).rotate(pacMan.angle, (pacMan.position.x + drawingShiftFromPositionTopLeft), (pacMan.position.y + drawingShiftFromPositionTopLeft));
        };

        this.renderPacDots = function (dots) {
            for (var dot in dots) {
                var dotRadius = 3,
                    color = 'yellow',
                    drawingShiftFromPositionTopLeft = 10;

                if (dots[dot].isPowerDot) {
                    dotRadius = 5;
                    color = 'white';
                }

                dots[dot].svgForm = paper.circle(dots[dot].position.x + drawingShiftFromPositionTopLeft, dots[dot].position.y + drawingShiftFromPositionTopLeft, dotRadius);
                dots[dot].svgForm.attr({
                    fill: color,
                    stroke: 'orange'
                });
            }
        };

        this.erasePacDot = function (dot) {
            dot.svgForm.animate({
                r: 0,
            }, 400);
        };

        // Needs to be reformed or totali changed depending on how we will input the level
        // For now works with hardcoded levels, and maybe some drawing changes are much needed
        this.renderLevel = function (level, dots) {
            var step = 20;

            for (i = 0; i < level.length; i += step) {
                for (j = 0; j < level.length; j += step) {
                    if (level[i][j] === 'empty') {
                        continue;
                    }

                    if (level[i][j]) {
                        paper.rect(j, i, step, step)
                            .attr({
                                fill: 'purple',
                                stroke: 'none'
                            });
                    } else {
                        var rand = Math.random() * 100;
                        if (rand <= 2) {
                            dots.push(new PacDot(new Position(j, i), true));
                        } else {
                            dots.push(new PacDot(new Position(j, i)));
                        }
                    }
                }
            }
        };
    }

    this.startGame = new StartGame();
    function StartGame() {
        // adding the event listener when starting the game
        window.addEventListener("keydown", keyPressed, true);

        // Set paper for drawing with rendered
        var paper = Raphael(0, 0, 560, 560),
            paperPacMan = Raphael(0, 0, 560, 560),
            paperGhostsLayer = Raphael(0, 0, 560, 560);

        // Seting main game objects
        var player = new PacMan(new Position(20, 20), 'player', 'up', 1),
            dots = [],
            level = level1(makeMatrix(28, 28, 20));

        var randomGhost = function () {
            var result = Math.floor(Math.random() * 12);

            return result;
        };

        var ghosts = [
            new Ghost(new Position(220, 220), 'ghost', 'left', randomGhost()),
            new Ghost(new Position(240, 220), 'ghost', 'left', randomGhost()),
            new Ghost(new Position(260, 220), 'ghost', 'up', randomGhost()),
            new Ghost(new Position(280, 220), 'ghost', 'right', randomGhost()),
            new Ghost(new Position(300, 220), 'ghost', 'right', randomGhost())
        ];

        var renderer = new Renderer(paper, paperPacMan, paperGhostsLayer);
        renderer.renderLevel(level, dots);
        renderer.renderPacDots(dots);
        renderer.renderPacMan(player);
        renderer.renderGhost(ghosts);

        function movingPacMan() {
            paperPacMan.clear();
            renderer.renderPacMan(player);
            player.move(level);
            player.score += 0.5;

            var indexEaten = player.eat(dots);
            if (indexEaten !== -1) {
                renderer.erasePacDot(dots[indexEaten]);
                dots.splice(indexEaten, 1);
            }
            //console.log('fff -> ' + player.position.x);
            //this implement the act of collision
            player.collide(ghosts);
        }
        setInterval(movingPacMan, 10);

        function ghostAIMovements() {
            var step = 20;

            for (var ghost in ghosts) {
                var direction = ghosts[ghost].direction,
                    nextX = ghosts[ghost].position.x,
                    nextY = ghosts[ghost].position.y,
                    possibleDirections = [];
                possibleDirections.push(direction);

                if (direction === 'left') {
                    nextX -= step;
                    possibleDirections = checkUpAndDown(ghosts[ghost], possibleDirections, level);

                } else if (direction === 'up') {
                    nextY -= step;
                    possibleDirections = checkLeftAndRight(ghosts[ghost], possibleDirections, level);
                } else if (direction === 'right') {
                    nextX += step;
                    possibleDirections = checkUpAndDown(ghosts[ghost], possibleDirections, level);
                } else if (direction === 'down') {
                    nextY += step;
                    possibleDirections = checkLeftAndRight(ghosts[ghost], possibleDirections, level);
                }

                // On cross section
                var isNextPosible = possibleStep(nextX, nextY, level);
                if (!isNextPosible) {
                    possibleDirections.shift();
                }

                ghosts[ghost].direction = getRandomOtherDirection(possibleDirections);
                ghosts[ghost].move();
            }

            setTimeout(ghostAIMovements, 500);
        }
       // ghostAIMovements();

        function keyPressed(ev) {
            if (!ev) {
                ev = window.event;
            }
            switch (ev.keyCode) {
                case 37:
                    player.direction = 'left';
                    player.angle = 315;
                    //225
                    break;
                case 38:
                    //45
                    player.direction = 'up';
                    player.angle = 45;
                    break;
                case 39:
                    player.direction = 'right';
                    player.angle = 130;
                    break;
                case 40:
                    //315
                    player.direction = 'down';
                    player.angle = 225;
                    for (var ghosty in ghosts) {                        
                        console.log(ghosts[ghosty].position.x);
                        
                    }
                    console.log('---->' + player.position.x);
                    break;
            }
        }

        //it must be not here
        //checkForCollision();
        /*
        for (var ghosty in ghosts) {
            if (ghosts[ghosty].position.x == player.position.x && ghosts[ghosty].position.y == player.position.y) {
                StartGame();
                console.log('aaaa');
            }
        }
        */        
    }

    function checkLeftAndRight(ghost, directions, level) {
        var result = directions,
            step = 20,
            nextX = ghost.position.x,
            nextY = ghost.position.y;

        if (!level[nextY][nextX - step]) {
            result.push('left');
        }
        if (!level[nextY][nextX + step]) {
            result.push('right');
        }

        return result;
    }

    function checkUpAndDown(ghost, directions, level) {
        var result = directions,
            step = 20,
            nextX = ghost.position.x,
            nextY = ghost.position.y;

        if (!level[nextY - step][nextX]) {
            result.push('up');
        }
        if (!level[nextY + step][nextX]) {
            result.push('down');
        }

        return result;
    }

    // while(true) for ghost AI tests after that will be made to function and added to engine
    function getRandomOtherDirection(posssibleDirs) {
        var randomDirection = posssibleDirs[Math.floor(Math.random() * posssibleDirs.length)];

        return randomDirection;
    }

}

function possibleStep(nextX, nextY, level) {
    if (level[nextY][nextX]) {
        return false;
    }
    return true;
}