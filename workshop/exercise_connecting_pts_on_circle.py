pts = []


def setup():
    global pts
    size(1000, 1000)
    background(0)
    radius = 300

    translate(width / 2, height / 2)

    for p in range(36):
        angle = radians(10 * p)
        x = radius * cos(angle)
        y = radius * sin(angle)
        ellipse(x, y, 3, 3)
        pts.append((x, y))

    # Connectors
    # Connect every point to its 11th neighbor. n to n + 11
    stroke(255)
    for p in range(36):
        x1, y1 = pts[p]
        end_pt = (p + 19) % 36
        x2, y2 = pts[end_pt]
        line(x1, y1, x2, y2)


jump_ahead = 0


def draw():
    global jump_ahead, pts
    if not frameCount % 5:
        jump_ahead += 1

    translate(width / 2, height / 2)
    background(0)

    for p in range(36):
        x1, y1 = pts[p]
        end_pt = (p + jump_ahead) % 36
        x2, y2 = pts[end_pt]
        line(x1, y1, x2, y2)

    if jump_ahead == 36:
        jump_ahead = 0
        noLoop()

    saveFrame("images/connections_###.png")
