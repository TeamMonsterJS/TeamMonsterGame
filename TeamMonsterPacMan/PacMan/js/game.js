var games = (function () {

    function Game(renderer, level, player, ghosts) {
        this.renderer = renderer;
        this.player = player;
        this.ghosts = ghosts;
        this.bindKeyEvents();
        this.score = 0;
    }       

    Game.prototype.bindKeyEvents = function () {
        var self = this;

        window.addEventListener('keydown', function (ev) {
            if (!ev) {
                ev = window.event;
            }

            switch (ev.keyCode) {
                case 37:
                    self.player.direction = 'left';
                    player.angle = 315;
                    break;
                case 38:
                    self.player.direction = 'up';
                    player.angle = 45;
                    break;
                case 39:
                    self.player.direction = 'right';
                    player.angle = 130;
                    break;
                case 40:
                    self.player.direction = 'down';
                    player.angle = 225;
                    break;
                default:
                    break;
            }
        });        
    };

    return {
        get: function (renderer, level, player, ghosts) {
            return new Game(renderer, level, player, ghosts);
        }
    }
}());