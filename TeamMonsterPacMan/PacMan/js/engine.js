function Engine(paper) {
    // here we will have the pressed direction eventListener
    // Sets event listener for the pressed keyes
    window.addEventListener("keydown", keyPressed, true);
    var dots = [],
        i,
        j;

    function keyPressed(ev) {
        if (!ev) {
            ev = window.event;
        }
        switch (ev.keyCode) {
            case 37:
                console.log('left')
                break;
            case 38:
                console.log('up')
                break;
            case 39:
                console.log('right')
                break;
            case 40:
                console.log('down')
                break;
        }
    }

    function Renderer() {
        paper.rect(0, 0, paper.width, paper.height)
            .attr({
                fill: 'black'
            });

        this.renderGhost = function (ghost) {
            ghost.svgForm = paper.image(ghost.appearance, ghost.position.x, ghost.position.y, 20, 20);
        }

        // TODO: Needs to be made better is now just for rendering a sample player
        this.renderPacMan = function (pacMan, direction) {
            var playerRadius = 8,
                drawingShiftFromPositionTopLeft = 10;

            paper.circle(pacMan.position.x + drawingShiftFromPositionTopLeft, pacMan.position.y + drawingShiftFromPositionTopLeft, playerRadius)
                .attr({
                    fill: 'yellow',
                    stroke: 'none'
                })
        }

        this.renderPacDots = function (dots) {
            for (var dot in dots) {
                var dotRadius = 3,
                    color = 'yellow',
                    drawingShiftFromPositionTopLeft = 10;

                if (dots[dot].isPowerDot) {
                    dotRadius = 10;
                    color = 'white';
                }
                paper.circle(dots[dot].position.x + drawingShiftFromPositionTopLeft, dots[dot].position.y + drawingShiftFromPositionTopLeft, dotRadius)
                    .attr({
                        fill: color,
                        stroke: 'orange'
                    })
            }
        }

        this.erasePacDot = function (dot) {
            var dotRadius = 3,
                drawingShiftFromPositionTopLeft = 10;

            if (dot.isPowerDot) {
                dotRadius = 10;
            }

            paper.circle(dot.position.x + drawingShiftFromPositionTopLeft, dot.position.y + drawingShiftFromPositionTopLeft, dotRadius)
                .attr({
                    fill: 'black',
                    stroke: 'black'
                })
        }

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
                                fill: 'purple'
                            });
                    } else {
                        dots.push(new PacDot(new Position(j, i)));
                    }

                }
            }
        }
    }

    this.renderer = new Renderer();


}