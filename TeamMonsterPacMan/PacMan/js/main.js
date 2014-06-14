/// <reference path="_reference.js" />
(function () {
    var level = levels.getLevelOne(),
        renderer = renderers.getSVGRenderer(0, 0, 560, 560),
        pacman = gameObjects.getPacMan({ x: 1, y: 1 }, 'pesho', 'right'),
        ghost = gameObjects.getGhost({ x: 60, y: 20 }, 'left', 1),
        game = games.get(renderer, level, pacman, null);

    pacman.svgForm = renderer.renderPacMan(pacman);
    //pacman.svgForm.animate(
    //       {
    //           cx: 20 * (20),
    //           cy: 20 * (1),
    //           r: 20 * pacman.radius
    //       }, 1000);
    //renderer.eraseMovingObjects();
    //pacman.svgForm = renderer.renderPacMan(pacman);
    //pacman.svgForm.animate(
    //       {
    //           cx: 20 * (20),
    //           cy: 20 * (1),
    //           r: 20 * pacman.radius
    //       }, 1000);
    game.start();
}());
