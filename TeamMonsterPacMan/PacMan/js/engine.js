function Engine(paper) {
    // here we will have the pressed direction eventListener
    // Sets event listener for the pressed keyes
    window.addEventListener("keydown", keyPressed, true);
    var i,
        j;

    function keyPressed(e) {
        switch (e.keyCode) {
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
            paper.image(ghost.appearance, ghost.position.x, ghost.position.y, 50, 50);
        }

        this.renderPacMan = function (pacMan) {

        }

        this.renderPacDots = function (dots) {
            for (var dot in dots) {
                var dotRadius = 5,
                    color = 'yellow';

                if (dots[dot].isPowerDot) {
                    dotRadius = 10;
                    color = 'white';
                }
                paper.circle(dots[dot].position.x, dots[dot].position.y, dotRadius)
                    .attr({
                        fill: color,
                        stroke: 'orange'
                    })
            }
        }

        this.erasePacDot = function (dot) {
            var dotRadius = 5;

            if (dot.isPowerDot) {
                dotRadius = 10;
            }

            paper.circle(dot.position.x, dot.position.y, dotRadius)
                .attr({
                    fill: 'black',
                    stroke: 'black'
                })
        }

        // Needs to be reformed or totali changed depending on how we will input the level
        // For now works with hardcoded levels, and maybe some drawing changes are much needed
        this.renderLevel = function (level) {
            var step = 20;
            for (i = 0; i < 420; i += step) {
                for (j = 0; j < 420; j += step) {
                    if (level[i][j]) {
                        paper.rect(j, i, step, step)
                            .attr({
                                fill: 'purple'
                            });
                    }
                }
            }
        }
    }

    this.renderer = new Renderer();
}