/// <reference path="_reference.js" />
(function () {
    var level = levels.getLevelOne(28, 28, 20),
        renderer = renderers.getSVGRenderer(0, 0, 560, 560),
        pacman = gameObjects.getPacMan({ x: 20, y: 20 }, 'pesho', 'right'),
        ghost = gameObjects.getGhost({ x: 60, y: 20 }, 'left', 1),
        game = games.get(renderer, level, pacman, null);
    
    game.start();        
}());
