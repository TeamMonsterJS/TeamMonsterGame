/// <reference path="_reference.js" />
var renderers = (function () {
    function SVGRenderer(x, y, width, height) {
        this.fieldLayer = Raphael(x, y, width, height);
        this.dotsLayer = Raphael(x, y, width, height);
        this.movingObjectsLayer = Raphael(x, y, width, height);

        this.fieldLayer.rect(0, 0, width, height)
            .attr({
                fill: 'black'
            });
    }

    SVGRenderer.prototype.renderGhost = function (ghost) {
        return this.movingObjectsLayer.image(
            ghost.appearance,
            20 * ghost.position.x,
            20 * ghost.position.y,
            ghost.size,
            ghost.size);
    };

    SVGRenderer.prototype.eraseMovingObjects = function () {
        this.movingObjectsLayer.clear();
    };

    SVGRenderer.prototype.renderPacDots = function (dots) {
        var drawingShiftFromPositionTopLeft = 10,
            dot;

        for (dot in dots) {
            this.dotsLayer.circle(
                dots[dot].position.x + drawingShiftFromPositionTopLeft,
                dots[dot].position.y + drawingShiftFromPositionTopLeft,
                dot.radius)
                .attr({
                    fill: dot.color,
                    stroke: 'orange'
                });
        }
    };

    SVGRenderer.prototype.renderPacMan = function (pacMan) {
        return this.movingObjectsLayer.circle(
            20 * (pacMan.position.x + pacMan.radius),
            20 * (pacMan.position.y + pacMan.radius),
            20 * pacMan.radius)
        .attr({
            stroke: 'red',
            fill: 'yellow'
        });
    };

    SVGRenderer.prototype.renderLevel = function (level) {
        var step = 20,
            i,
            j;

        for (i = 0; i < level.length; i += 1) {
            for (j = 0; j < level[i].length; j += 1) {
                if (level[i][j] === 1) {
                    this.fieldLayer.rect(step * j, step * i, step, step)
                        .attr({
                            //stroke: 'none',
                            fill: 'purple'
                        });
                }
            }
        }
    };

    return {
        getSVGRenderer: function (x, y, width, height) {
            return new SVGRenderer(x, y, width, height);
        },
        getCanvasRenderer: function () {
            return new CanvasRenderer();
        }
    };
}());