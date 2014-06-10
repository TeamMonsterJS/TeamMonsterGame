var levels = (function myfunction() {
    function setLevelBorders(level, step) {
        var i,
            j;

        for (i = 0; i < level.length; i += step) {
            for (j = 0; j < level.length; j += step) {
                if (i >= step && j >= step &&
                    i < level.length - step && j < level.length - step) {
                    continue;
                }
                level[i][j] = true;
            }
        }

        for (i = 240, j = 200; j < level.length - i + 2 * step; j += step) {
            level[i][j] = true;
            level[level.length - i - step][j] = true;
        }

        level[240][level.length / 2] = 'empty';
        level[240][level.length / 2 - step] = 'empty';
        level[260][200] = true;
        level[280][200] = true;
        level[260][340] = true;
        level[280][340] = true;
        for (j = 220; j < 340; j += step) {
            level[260][j] = 'empty';
            level[280][j] = 'empty';
        }
    }

    function level1(matrix) {
        var level = matrix,
            step = 20,
            i,
            j;

        setLevelBorders(level, step);

        for (i = 40, j = 40; i < level.length / 2 - 3 * step; i += step) {
            level[i][j] = true;
            level[j][i] = true;
        }

        level[i + step][j] = true;
        level[i + step][j + step] = true;
        level[i + 3 * step][j] = true;
        level[i + 3 * step][j + step] = true;

        level[i + step][500] = true;
        level[i + step][480] = true;
        level[i + 3 * step][500] = true;
        level[i + 3 * step][480] = true;

        for (i = level.length / 2 + 2 * step, j = 40; i < level.length - j; i += step) {
            level[i][j] = true;
            level[j][i] = true;
        }

        for (i = 60, j = 500; i < level.length / 2 - 3 * step; i += step) {
            level[i][j] = true;
        }

        for (i = level.length / 2 + 2 * step; i < level.length - 2 * step; i += step) {
            level[i][j] = true;
        }

        i -= step;
        for (j = 60; j < level.length / 2 - 3 * step; j += step) {
            level[i][j] = true;
        }

        level[i][j + step] = true;
        level[i - step][j + step] = true;
        level[i][j + 3 * step] = true;
        level[i - step][j + 3 * step] = true;

        level[60][j + step] = true;
        level[40][j + step] = true;
        level[60][j + 3 * step] = true;
        level[40][j + 3 * step] = true;

        for (j = level.length / 2 + 2 * step; j < level.length - 2 * step; j += step) {
            level[i][j] = true;
        }

        for (i = 80, j = 80; i < level.length / 2 - step; i += step) {
            level[i][j] = true;
            level[i][460] = true;
        }

        for (i = level.length / 2, j = 80; i < level.length - j; i += step) {
            level[i][j] = true;
            level[i][460] = true;
        }

        for (i = 80, j = 80; j < level.length / 2 - step; j += step) {
            level[i][j] = true;
            level[460][j] = true;
        }

        for (i = 120, j = 120; j < level.length - i; j += step) {
            level[i][j] = true;
            level[level.length - i - step][j] = true;
        }

        for (i = 160, j = 160; j < level.length - i; j += step) {
            level[i][j] = true;
            level[level.length - i - step][j] = true;
        }

        for (i = 200, j = 200; j < level.length - i; j += step) {
            level[i][j] = true;
            level[level.length - i - step][j] = true;
        }


        for (i = 80, j = level.length / 2; j < level.length - i; j += step) {
            level[i][j] = true;
            level[460][j] = true;
        }

        for (i = 160, j = 120; i < level.length - j - 2 * step; i += step) {
            level[i][j] = true;
            level[i][level.length - j - step] = true;
        }

        for (i = 200, j = 160; i < level.length - j - 2 * step; i += step) {
            level[i][j] = true;
            level[i][level.length - j - step] = true;
        }

        return level;
    }

    function makeMatrix(rows, cols, step) {
        rows *= step;
        cols *= step;

        var matrix = new Array(rows);
        for (var i = 0; i < rows; i += step) {
            matrix[i] = new Array(cols);
        }

        return matrix;
    }
}());

