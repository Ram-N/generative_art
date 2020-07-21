# Acknowledgement: This is a Python port of the work by Liam Gardner
# https://github.com/GardnerLiam/CircularNoise

# This attempt in Python is so that many Processing concepts can be learned
# while creating a fun image/animation in the process.

from rn_utils import frange


def setup():
    size(800, 800)


def create_shape(time_value, ring_index, ring_lin_scale, sc, max_noise):

    pushMatrix()
    stroke(ring_index, 0, ring_index)  # each ring gets its own color.
    # that ring_color stays the same over all the frames.
    noFill()

    # scale() Increases or decreases the size of a shape by expanding and contracting vertices.
    # So this is one way of keeping each circular shape's (ring's) size a little different.
    # Otherwise they will all be plotted on top of each other.
    # to see this in action, make sc=1 and see what happens
    scale(sc)  # every ring has a slightly different scale.

    # Note: max_noise stays the same for all rings (shapes) within a frame.
    # So ALL the rings' radius is altered based on the same max_noise, and t and theta.

    # x_noise_space has one component which is the same for each frame, for all shapes,
    # since it depends only on theta & time_value.
    # However, its second component (ring_lin_scale)
    # varies from shape to shape, since it depends on ring_index

    beginShape()
    for theta in frange(0, TWO_PI, theta_increment):
        x_noise_space = (
            map(cos(theta + time_value), -1, 1, 0, max_noise) + ring_lin_scale
        )
        y_noise_space = (
            map(sin(theta + time_value), -1, 1, 0, max_noise) + ring_lin_scale
        )

        radius = map(noise(x_noise_space, y_noise_space), 0, 1, 100, 200)
        x = radius * cos(theta)
        y = radius * sin(theta)
        vertex(x, y)
    endShape(CLOSE)
    popMatrix()


# SHAPE PARAMETERS

theta_increment = (
    TWO_PI / 100
)  # make this anywhere from TWO_PI/3 to TWO_PI/100. (Unit is in radians)
# smaller theta_increment means more sides to the shape ==> more circle-like
# larger theta_incrment means more polygon like.
# theta_increment = TWO_PI/3  # makes it a triangle
# theta_increment = TWO_PI/6  # makes it a hexagon

ring_spacing = 5  # anywhere from 5 to 50. Higher values mean more spacing between rings
time_incr = TWO_PI / 200


def draw():

    background(127)
    translate(width / 2, height / 2)

    # With each increasing frame, the "time_value" jumps up by time_incr
    time_value = (frameCount - 1) * time_incr
    max_noise = 2 * (cos(time_value) + 2)

    # In each execution of draw, we create a set of "ring-like" shapes
    # what makes this interesting is that each shape varies from
    # its previous version by a little bit
    for ring_index in range(50, 255, ring_spacing):

        _ring_lin_scale = map(
            ring_index, 50, 255, 0, 100
        )  # a linear percent from 0 to 100, depending on ring_number
        _scale = map(ring_index, 50, 255, 1.75, 0.01)  # to shrink or expand radius
        create_shape(time_value, ring_index, _ring_lin_scale, _scale, max_noise)

    # cvalue +=1

    if time_value > TWO_PI:
        noLoop()
