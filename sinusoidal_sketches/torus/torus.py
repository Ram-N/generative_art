################################################################################
# https://github.com/Ram-N/generative_art
# Author: Ram Narasimhan
#
# Released under the MIT license (https://opensource.org/licenses/MIT)
################################################################################

"""
This code works in Processing Python Mode.

Copy and paste this code in your Python Mode IDE and run it.

What does it do?
1. Renders a circular sinusoidal set of points on the screen.
You can control the major radius, the toroidal radius (thickness of the donut ring)
and the number of "petals" (scallops).
2. Will rotate the whole image in the draw function, which is keyed to FrameCount
3. Will revolve around the toroidal axis. Will also shrink and grow in size.

Note that the whole scale is rotate by 2 degrees (TWO_PI/180) in each rendering.
Thus, we only scale the x-axis, and y continues to be 0 in our rotated axis.

Inspired by: https://www.openprocessing.org/sketch/927237 by Joseph Aronson

"""


w, h = 1000, 1000

major_radius = 250
tor_radius = 40
shrink_radius = 20
num_points = 180
slice = TWO_PI / num_points
n_petals = 20
CLOCKWISE = 1
ANTICLOCKWISE = -1

# https://tex.stackexchange.com/questions/82773/how-to-draw-a-sine-wave-on-a-circular-path-in-tikz
def setup():
    size(w, h)
    background(127)
    noFill()
    strokeWeight(6)
    # task 1: A circle with sinusoidal borders...
    # circle(0,0,radius)
    translate(width / 2, height / 2)
    circle(0, 0, 400)


def draw():
    background(127)
    translate(width / 2, height / 2)
    stroke(255)
    rotate(ANTICLOCKWISE * slice * frameCount / 16 % num_points)
    draw_star()


def draw_star():
    """ Draws a static sinusoidal circle with n-petals"""
    for pt in range(num_points):
        rotate(slice)
        theta = pt * slice
        # we want blue to cycle 9 times, with 0 being 0 and max being 255
        _red = map(pt % (num_points / 1), 0, num_points / 1, 0, 255)
        _green = map(pt % (num_points / 3), 0, num_points / 3, 0, 255)
        _blue = map(pt % (num_points / 9), 0, num_points / 9, 0, 255)
        stroke(_red, _green, _blue)
        x = major_radius + tor_radius * cos(n_petals * theta)
        x_shrink = shrink_radius * cos(frameCount / 40)
        x_roll = sin((pt * 30) + frameCount / 4) * width / 200
        point(x + x_shrink + x_roll, 0)

