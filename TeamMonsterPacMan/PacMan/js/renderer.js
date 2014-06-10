/// <reference path="_reference.js" />
var renderers = (function () {

    function SVGRenderer(containerm, width, height) {
        this.paper = Raphael(0, 0, width, height);
        this.paperPacMan = Raphael(0, 0, width, height);
        this.paperGhosts = Raphael(0, 0, width, height);

        paper.rect(0, 0, width, height)
            .attr({
                fill: 'black'
            });
    }

    SVGRenderer.prototype.renderGhost = function (ghost) {
        ghost.svgForm = paper.image(
            ghost.appearance,
            ghost.position.x,
            ghost.position.y,
            ghost.width,
            ghost.height);
    };

    SVGRenderer.prototype.eraseDot = function (dot) {
        var dotRadius = dot.radius,
            drawingShiftFromPositionTopLeft = 10;

        paper.circle(dot.position.x + drawingShiftFromPositionTopLeft, dot.position.y + drawingShiftFromPositionTopLeft, dotRadius)
            .attr({
                fill: 'black',
                stroke: 'black'
            })
    };

    SVGRenderer.prototype.renderPacDots = function (dots) {
        var drawingShiftFromPositionTopLeft = 10;

        for (var dot in dots) {
            paper.circle(
                dots[dot].position.x + drawingShiftFromPositionTopLeft,
                dots[dot].position.y + drawingShiftFromPositionTopLeft,
                dot.radius)
                .attr({
                    fill: dot.color,
                    stroke: 'orange'
                })
        }
    };

    SVGRenderer.prototype.renderPacMan = function (pacMan) {
        var drawingShiftFromPositionTopLeft = 10;

        paperPacMan.path('M' + pacMan.position.x + ',' + pacMan.position.y + ' h-8 a8,8 0 1,0 8,-8 z')
        .attr({
            stroke: 'red',
            fill: 'yellow'
        }).rotate(pacMan.angle, pacMan.position.x, pacMan.position.y);
    };

    SVGRenderer.prototype.renderLevel = function () {
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
    };

    return {
        getSVGRenderer: function () {
            return new SVGRenderer();
        },
        getCanvasRenderer: function () {
            return new CanvasRenderer();
        }
    };
}());