colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]

NUM_TILES = 10
TS = 40


def setup():
    size(NUM_TILES * TS, NUM_TILES * TS)
    for x in range(NUM_TILES):
        for y in range(NUM_TILES):
            clr = colors[int(random(6))]
            fill(clr)
            cx = x * TS + TS / 2
            cy = y * TS + TS / 2
            pushMatrix()
            translate(cx, cy)
            angle = int(random(4)) * PI / 2
            rotate(angle)
            arc(TS / 2, TS / 2, 2 * TS, 2 * TS, PI, 3 * PI / 2)
            # rect(0, 0, TS, TS)
            popMatrix()

    saveFrame("images/quarter_circles.png")

