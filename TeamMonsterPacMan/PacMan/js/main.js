(function () {
    var container = document.getElementById('graphics-container'),
        game,
        renderer;

    newGameButton.addEventListener('click', performNewGame);

    startButton.addEventListener("click", performGameStart);

    stopButton.addEventListener("click", performGameStop);

    //var level = level1(makeMatrix(28, 28, 20));
    //var obj = new Ghost(new Position(140, 160), 'ghost', 'left', 1);    
    //var player = new PacMan(new Position(20, 20), 'player', 'right', 1);

    //renderer.renderLevel(level, dots);
    //renderer.renderPacDots(dots);
    //renderer.renderPacMan(player);
    //renderer.renderGhost(obj);              
}());
