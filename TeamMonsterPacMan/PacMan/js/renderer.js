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
        this.movingObjectsLayer.image(
            ghost.appearance,
            ghost.position.x,
            ghost.position.y,
            ghost.size,
            ghost.size);
    };

    SVGRenderer.prototype.eraseMovingObjects = function () {
        this.movingObjectsLayer.clear();
        //var objPosition = obj.position;
        //this.movingObjectsLayer.rect(objPosition.x, objPosition.y, obj.size, obj.size)
        //.attr({
        //    fill: 'black',
        //    stroke: 'black'
        //});
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
        this.movingObjectsLayer.circle(
            pacMan.position.x + pacMan.radius,
            pacMan.position.y + pacMan.radius,
            pacMan.radius)
        .attr({
            stroke: 'red',
            fill: 'yellow'
        });
    };

    SVGRenderer.prototype.renderLevel = function (level) {
        var step = 20,
            i,
            j;

        for (i = 0; i < level.length; i += step) {
            for (j = 0; j < level.length; j += step) {
                if (level[i][j] === 'empty') {
                    continue;
                }

                if (level[i][j] === true) {
                    this.fieldLayer.rect(j, i, step, step)
                        .attr({
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