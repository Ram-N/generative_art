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

Note that the whole scale is rotate by 2 degrees (TWO_PI/180) in each rendering.
Thus, we only scale the x-axis, and y continues to be 0 in our rotated axis.

"""


w, h = 1000, 1000

major_radius = 200
tor_radius = 40
# depth_factor = 20
num_points = 180
slice = TWO_PI / num_points
petals = 6


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
    pushMatrix()
    translate(width / 2, height / 2)
    point(30, 10)
    stroke(255)
    rotate(slice * frameCount / 4 % num_points)
    point(30, 10)
    rect(0, 0, 20, 20)
    draw_star()
    popMatrix()


def draw_star():
    for angle in range(num_points):
        rotate(slice)
        theta = angle * slice
        # we want blue to cycle 9 times, with 0 being 0 and max being 255
        _red = map(angle % (num_points / 1), 0, num_points / 1, 0, 255)
        _green = map(angle % (num_points / 3), 0, num_points / 3, 0, 255)
        _blue = map(angle % (num_points / 9), 0, num_points / 9, 0, 255)
        stroke(_red, _green, _blue)
        point(major_radius + tor_radius * cos(petals * theta), 0)

