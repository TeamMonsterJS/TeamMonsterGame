﻿/// <reference path="_reference.js" />
(function () {
    var level = levels.getLevelOne(),
        renderer = renderers.getSVGRenderer(0, 0, 560, 560),
        pacman = gameObjects.getPacMan({ x: 1, y: 1 }, 'pesho', 'right'),
        ghosts = [],
        game;

    ghosts.push(gameObjects.getGhost({ x: 12, y: 14 }, 'left', 1));
    ghosts.push(gameObjects.getGhost({ x: 13, y: 14 }, 'left', 1));
    ghosts.push(gameObjects.getGhost({ x: 14, y: 14 }, 'left', 1));
    ghosts.push(gameObjects.getGhost({ x: 15, y: 14 }, 'left', 1));
    ghosts.push(gameObjects.getGhost({ x: 16, y: 14 }, 'left', 1));
    ghosts.push(gameObjects.getGhost({ x: 17, y: 14 }, 'left', 1));
    game = games.get(renderer, level, pacman, ghosts);
    pacman.svgForm = renderer.renderPacMan(pacman);

    var i;
    for (i = 0; i < ghosts.length; i += 1) {
        ghosts[i].svgForm = renderer.renderGhost(ghosts[i]);
    }

    game.start();
}());