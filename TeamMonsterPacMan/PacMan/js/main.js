/// <reference path="_reference.js" />
(function () {
    var level = levels.getLevelOne(),
        pacDots = levels.getPacDots(level),
        renderer = renderers.getSVGRenderer(0, 0, 560, 560),
        pacman = gameObjects.getPacMan({ x: 1, y: 1 }, 'pesho', 'right'),
        ghosts = [],
        game;

    ghosts.push(gameObjects.getGhost({ x: 12, y: 14 }, 'left', 0));
    ghosts.push(gameObjects.getGhost({ x: 13, y: 14 }, 'up', 1));
    ghosts.push(gameObjects.getGhost({ x: 14, y: 14 }, 'right', 2));
    ghosts.push(gameObjects.getGhost({ x: 15, y: 14 }, 'down', 3));
    ghosts.push(gameObjects.getGhost({ x: 16, y: 14 }, 'right', 4));
    ghosts.push(gameObjects.getGhost({ x: 17, y: 14 }, 'up', 5));
    ghosts.push(gameObjects.getGhost({ x: 12, y: 13 }, 'down', 6));
    ghosts.push(gameObjects.getGhost({ x: 13, y: 13 }, 'left', 7));
    ghosts.push(gameObjects.getGhost({ x: 14, y: 13 }, 'right', 8));
    ghosts.push(gameObjects.getGhost({ x: 15, y: 13 }, 'down', 9));
    ghosts.push(gameObjects.getGhost({ x: 16, y: 13 }, 'up', 10));
    ghosts.push(gameObjects.getGhost({ x: 17, y: 13 }, 'left', 11));

    game = games.get(renderer, level, pacman, ghosts, pacDots);
    pacman.svgForm = renderer.renderPacMan(pacman);

    var i;
    for (i = 0; i < ghosts.length; i += 1) {
        ghosts[i].svgForm = renderer.renderGhost(ghosts[i]);
    }

    game.start();
}());
