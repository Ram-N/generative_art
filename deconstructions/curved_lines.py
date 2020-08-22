"""

This is a recreation of an original design/drawing. It is a deconstruction & reconstruction 
in Python.

Original Author: Jerome Herr: https://codepen.io/p5art/pens/showcase
@p5Art in Codepen.
Javascript version of the original code: https://codepen.io/p5art/pen/egOxNL

Ported to Python by:
Ram Narasimhan
August 2020

Modifications & Enhancement possible:
1. Multiple curved lines from the same starting circle, but never overlapping
2. Circles in a Grid. Snake or spiral in or out.
3. Fixed Angles for the next circle...(choose from 30 deg increments), same radius

"""

w, h = 1000, 800

min_radius, max_radius = 10, 50
num = 12
show = True

circles = []


def setup():
    size(w, h)
    c0 = Circle(width / 2, height / 2, 40, 0, 0, 0)
    circles.append(c0)


def draw():
    global circles
    background(34)
    strokeWeight(1)
    noStroke()
    fill(238)
    textAlign(RIGHT)
    text("type 'n' to draw new points ", width - 50, 30)
    text("type 't' to toggle line display", width - 50, 45)
    render_circles(circles)
    if len(circles) < num:
        circles = add_circle(circles)


class Circle:
    def __init__(self, cx, cy, radius, angle, poi_x, poi_y):
        self.cx = cx
        self.cy = cy
        self.radius = radius
        self.angle = angle
        self.poi_x = poi_x
        self.poi_y = poi_y


def add_circle(circles):
    pc = circles[-1]  # last circle in the list
    r = random(TWO_PI)
    angle = random(-r, r)
    # angle_options = [PI / 4, PI / 2, 3 / 4 * PI, PI]
    # angle_options = [PI / 2]
    # elem = int(random(len(angle_options)))
    # angle = angle_options[elem]
    radius = random(min_radius, max_radius)
    candx = pc.cx + cos(angle) * (radius + pc.radius)
    candy = pc.cy + sin(angle) * (radius + pc.radius)
    poi_x = pc.cx + cos(angle) * pc.radius
    poi_y = pc.cy + sin(angle) * pc.radius
    nc = Circle(candx, candy, radius, angle, poi_x, poi_y)
    if no_overlap_with_existing_circles(nc):
        circles.append(nc)
    return circles


def no_overlap_with_existing_circles(candiate):
    for cc in circles:
        if dist(candiate.cx, candiate.cy, cc.cx, cc.cy) < (candiate.radius + cc.radius):
            return (
                False
            )  # candidate circle is too close to one of the existing ones. Reject!
    return True  # new candidate circle is away from others, and is acceptable


def render_circles(circles):

    noFill()
    stroke(238, 150)
    if show:
        for idx, c in enumerate(circles[1:]):
            # since we start from circles[1], idx will lag currect circle by 1
            # thus idx points to the prev circle in the list called 'circles'
            strokeWeight(1)
            prev_c = circles[idx]
            ellipse(c.cx, c.cy, c.radius * 2, c.radius * 2)
            line(prev_c.cx, prev_c.cy, c.cx, c.cy)
            if idx == 3:
                stroke(250, 0, 0)
            line(c.poi_x, c.poi_y, c.cx, c.cy)
            stroke(238, 150)
            ellipse(c.cx, c.cy, 5, 5)
            ellipse(c.poi_x, c.poi_y, 10, 10)

    strokeCap(SQUARE)
    strokeWeight(10)
    stroke(238)
    for idx, c in enumerate(circles[:-1]):
        next_circle = circles[idx + 1]
        ai = atan2(c.cy - c.poi_y, c.cx - c.poi_x)
        ao = atan2(c.cy - next_circle.poi_y, c.cx - next_circle.poi_x)

        angle_in = map(ai, -PI, PI, 0, TWO_PI)
        angle_out = map(ao, -PI, PI, 0, TWO_PI)
        if idx % 2 == 0:
            stroke(238)
            if angle_out < angle_in:
                angle_out += TWO_PI
            if frameCount < 20:
                print(
                    idx, degrees(ai), degrees(ao), degrees(angle_in), degrees(angle_out)
                )

            arc(c.cx, c.cy, c.radius * 2, c.radius * 2, angle_in, angle_out)
        else:
            stroke(138)
            if angle_in < angle_out:
                angle_in += TWO_PI
            arc(c.cx, c.cy, c.radius * 2, c.radius * 2, angle_out, angle_in)


def keyPressed():
    global show, circles

    if key == "n":
        circles = []
        c0 = Circle(width / 3, height / 2, 20, 0, 0, 0)
        circles.append(c0)
    elif key == "t":  # Toggle
        show = not show

    elif key == CODED and keyCode == CONTROL:
        saveFrame("screenshot.png")
    elif key == ENTER:
        if msg:
            t = Texto(msg)

