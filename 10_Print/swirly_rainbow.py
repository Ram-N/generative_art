# Reconstruction of the work of Julia M., who shared it in Daniel Shiffman's 10 Print coding challenge.
# https://editor.p5js.org/julia.maiolo@gmail.com/present/74f1ytxMs

# The idea is simple and elegant. 3/4th circles, oriented in one of 4 ways
w, h = 800, 800
# w, h = 80, 80 #trick to get each tile. Make canvas = 1 tile wide and 1 tile high
x_start = 0
x = x_start
y = 0
spacing = 40
HS = spacing / 2


def setup():
    size(w, h)
    background(250)


def draw():
    global x, y
    rand = random(1)
    # ellipseMode(CORNER)
    noFill()
    stroke(100)
    # rectMode(CENTER)
    strokeWeight(1)
    rect(x, y, spacing, spacing)
    strokeWeight(3)
    stroke(10)
    if rand <= 0.33:
        arc(x, y, spacing, spacing, 0, PI / 2)
        arc(x + spacing, y + spacing, spacing, spacing, PI, 3 * PI / 2)
    elif rand <= 0.67:
        arc(x + spacing, y, spacing, spacing, PI / 2, PI)
        arc(x, y + spacing, spacing, spacing, 3 * PI / 2, TWO_PI)
    else:
        line(x + HS, y, x + HS, y + spacing)  # vert
        line(x, y + HS, x + spacing, y + HS)
        if random(1) < 0.15:
            fill(255, 0, 0)
            ellipse(x + HS, y + HS, spacing / 4, spacing / 4)
    x += spacing

    if x > width:
        x = x_start
        y += spacing

    if y > height:
        noLoop()

    saveFrame("images/swirly_rainbow.png")

