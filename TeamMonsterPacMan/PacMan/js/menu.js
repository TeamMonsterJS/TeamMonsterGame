var menus = (function myfunction() {

    function Menu(container, width, height) {
        this.stage = new Kinetic.Stage({
            container: container,
            width: width,
            height: height
        });

        this.layer = new Kinetic.Layer();
        this.group = new Kinetic.Group();
        this.base = new Kinetic.Rect({
            fill: '#78236E',
            stroke: '#33082E',
            x: 0,
            y: 0,
            width: this.stage.width(),
            height: this.stage.height(),
            strokeWidth: 15
        });

        this.scoreBoard = new Kinetic.Text({
            x: this.base.x() + 15,
            y: this.base.y() + 20,
            text: 'Current score',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.scoreCount = new Kinetic.Text({
            x: this.scoreBoard.x(),
            y: this.scoreBoard.y() + 40,
            text: '0',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.livesText = new Kinetic.Text({
            x: this.scoreBoard.x(),
            y: this.scoreCount.y() + 60,
            text: 'Lives',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.heart = new Kinetic.Text({
            x: this.livesText.x() + 200,
            y: this.scoreCount.y() + 60,
            text: '\u2665',
            fontSize: 30,
            fill: '#B52D1B',
            fontFamily: 'Fixedsys'
        });

        this.startButton = new Kinetic.Text({
            x: this.livesText.x() + 20,
            y: this.livesText.y() + 80,
            text: 'START',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.pauseButton = new Kinetic.Text({
            x: this.startButton.x() + 170,
            y: this.livesText.y() + 80,
            text: 'PAUSE',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });
    }

    Menu.prototype.draw = function () {       
        this.group.add(this.base);
        this.group.add(this.scoreBoard);
        this.group.add(this.scoreCount);
        this.group.add(this.livesText);
        this.group.add(this.heart);
        this.group.add(this.startButton);
        this.group.add(this.pauseButton);
        this.layer.add(this.group);
        this.stage.add(this.layer);
    };

    Menu.prototype.bindButtonEvents = function () {
        var self = this;

        this.startButton.on('mouseover', function () {
            this.fill('black');
            self.stage.draw();
        });

        this.startButton.on('mouseout', function () {
            this.fill('#A3A000');
            self.stage.draw();
        });

        this.pauseButton.on('mouseover', function () {
            this.fill('black');
            self.stage.draw();
        });

        this.pauseButton.on('mouseout', function () {
            this.fill('#A3A000');
            self.stage.draw();
        });
    };

    return {
        getMenu: function (container, width, height) {
            return new Menu(container, width, height);
        }
    };
}());