# Creates a 2D List of 0's, nCols x nRows large
def makeGrid(nCols, nRows):
    grid = []
    for i in range(nRows):
        # Create an empty list for each row
        grid.append([])
        for j in range(nRows):
            # Pad each column in each row with a 0
            grid[i].append(0)
    return grid


w, h = 800, 800
xfactor = 50.3
yfactor = 40.3

colr = makeGrid(w, h)

RED = [255, 0, 0]
GREEN = [0, 255, 0]
BLUE = [0, 0, 255]
YELLOW = [0, 255, 255]
MAGENTA = [255, 0, 255]
CYAN = [255, 255, 0]

color_list = [RED, RED, YELLOW, BLUE, CYAN, MAGENTA, GREEN]


def setup():
    global min_value, max_value
    size(w, h)
    min_value, max_value = 1000, 0
    for x in range(w):
        for y in range(h):
            colr[x][y] = noise(x / xfactor, y / yfactor)

            if colr[x][y] < min_value:
                min_value = colr[x][y]
            if colr[x][y] > max_value:
                max_value = colr[x][y]
    print(min_value, max_value)

    for x in range(w):
        for y in range(h):
            col = map(colr[x][y], min_value, max_value, 0, 6.99)
            stroke(*color_list[int(col)])
            point(x, y)

