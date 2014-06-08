// HARD CODING levels options
function level1(matrix) {
    var level = matrix,
        i,
        j,
        step = 20;

    // level borders
    for (i = 0; i < matrix.length; i += step) {
        
        for (j = 0; j < matrix.length; j+=step) {
            if (i > 20 && i < matrix.length - step) {
                continue;
            }
            level[i][j] = true;
        }
    }
    console.log(level);
    return level;
}