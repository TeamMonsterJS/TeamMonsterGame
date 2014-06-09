//test comment
var menu = new Kinetic.Stage({
    container: 'canvas-container',
    width: 450,
    height: 350
});

var layer = new Kinetic.Layer();

var group = new Kinetic.Group({

});

var base = new Kinetic.Rect({
    fill: '#78236E',
    stroke: '#33082E',
    x: 0,
    y: 0,
    width: menu.width(),
    height: menu.height(),
    strokeWidth:15
});

var scoreBoard = new Kinetic.Text({
    x: base.x() + 15,
    y: base.y() + 20,
    text: 'Current score',
    fontSize: 50,
    fill: '#A3A000',
    fontFamily: 'Fixedsys'
});

var scoreCount = new Kinetic.Text({
    x: scoreBoard.x(),
    y: scoreBoard.y() + 60,
    text: '0',
    fontSize: 50,
    fill: '#A3A000',
    fontFamily: 'Fixedsys'
});

var livesText = new Kinetic.Text({
    x: scoreBoard.x(),
    y: scoreCount.y() +80,
    text: 'Lives',
    fontSize: 50,
    fill: '#A3A000',
    fontFamily: 'Fixedsys'
});

//TODO
//Find optimized way to draw 3 hearts
var heart = new Kinetic.Text({
    x: livesText.x()+200,
    y: scoreCount.y() +80,
    text: '\u2665',
    fontSize: 50,
    fill: '#B52D1B',
    fontFamily: 'Fixedsys'
});

var startButton = new Kinetic.Text({
    x: livesText.x()+20,
    y: livesText.y() + 100,
    text: 'START',
    fontSize: 50,
    fill: '#A3A000',
    fontFamily: 'Fixedsys'
});

var pauseButton = new Kinetic.Text({
    x: startButton.x() + 200,
    y: livesText.y() + 100,
    text: 'PAUSE',
    fontSize: 50,
    fill: '#A3A000',
    fontFamily: 'Fixedsys'
});

startButton.on('mouseover', function () {
    this.fill('black');
    menu.draw();
});

startButton.on('mouseout', function () {
    this.fill('#A3A000');
    menu.draw();
});

pauseButton.on('mouseover', function () {
    this.fill('black');
    menu.draw();
});

pauseButton.on('mouseout', function () {
    this.fill('#A3A000');
    menu.draw();
});

group.add(base);
group.add(scoreBoard);
group.add(scoreCount);
group.add(livesText);
group.add(heart);
group.add(startButton);
group.add(pauseButton);
layer.add(group);

menu.add(layer);