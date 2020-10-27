# Reconstruction of the work of Igor, who shared it in Daniel Shiffman's
# https://editor.p5js.org/igor/full/kRaxw1_gu


# The idea is simple and elegant. 3/4th circles, oriented in one of 4 ways
w, h = 800, 800
x = 0
y = 0
spacing = 20


def setup():
    size(w, h)
    background(0)


def draw():
    global x, y
    rand = random(1)
    ellipseMode(CORNER)
    noFill()
    strokeWeight(2)
    stroke(0, 255, 255)

    if rand <= 0.25:
        arc(x, y, spacing, spacing, 0, 1.5 * PI)
    elif rand > 0.25 and rand <= 0.5:
        arc(x, y, spacing, spacing, 1.5 * PI, 3 * PI)
    elif rand > 0.5 and rand <= 0.75:
        arc(x, y, spacing, spacing, 0.5 * PI, 2 * PI)
    else:
        arc(x, y, spacing, spacing, PI, 2.5 * PI)

    x += spacing

    if x > width:
        x = 0
        y += spacing

    if y > height:
        noLoop()
        saveFrame("images/arc_print.png")

