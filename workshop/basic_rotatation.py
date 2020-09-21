"""
A very simple script demonstrating how ROTATE in Processing.py works.

Decide how many slices we want to divide the circle by.
Rotate by that angle each time, and draw a straight line, parallel to the x-axis!
"""

num_slices = 12
step = TWO_PI / num_slices


def setup():
    size(900, 900)
    strokeWeight(3)
    translate(width / 2, height / 2)

    for i in range(num_slices):
        rotate(step)
        line(0, 0, 200, 0)

