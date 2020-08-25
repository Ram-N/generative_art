"""

Endlessly generates new shapes.
Generates each shape twice.
Every 360*2 frames, the shape changes.

Author: Ram Narasimhan
August 2020

"""


def setup():
    size(800, 800)


r = 100  # Radius of the base circle
num_steps = 360  # increase one degree in each frame
angular_step = TWO_PI / num_steps

m, n = 1, 1
xt1, xt2, yt1, yt2 = False, False, False, False
two_times_done = False


def draw():
    global m, n, xt1, xt2, yt1, yt2, two_times_done

    background(250)
    noFill()
    strokeWeight(3)
    translate(width / 2, height / 2)
    stroke(0, 250, 0)
    ellipse(0, 0, r * 2, 2 * r)  # base circle
    x, y = 0, 200

    # Whenever max_angle gets to be TWO_PI, we reset it to be zero
    max_angle = frameCount % num_steps

    if not max_angle:  # time to regenerate shape parameters
        two_times_done = not two_times_done
        if two_times_done:
            xt1, xt2, yt1, yt2 = False, False, False, False
            m, n = int(random(1, 5)), int(random(1, 5))
            rnd = random(1.0)
            if rnd < 0.1:
                xt1 = True
            elif rnd < 0.2:
                xt2 = True

            rnd = random(1.0)
            if rnd < 0.1:
                yt1 = True
            elif rnd < 0.2:
                yt2 = True
            print(m, n, xt1, xt2, yt1, yt2)

    # This is where the fun shape gets gets drawn
    for idx in range(max_angle):
        stroke(0, 0, 250)
        a = idx * angular_step
        x_twister1 = (1 + cos(a)) if xt1 else 1
        x_twister2 = (1 + cos(a)) if xt2 else 1
        y_twister1 = (1 + sin(a)) if yt1 else 1
        y_twister2 = (1 - sin(a)) if yt2 else 1
        x_multiplier = r * x_twister1 * x_twister2
        y_multiplier = r * y_twister1 * y_twister2

        x = x_multiplier * cos(m * a)
        y = y_multiplier * sin(n * a)
        ellipse(x, y, 3, 3)  # basically the x,y point. Drawing it as an ellipse

