"""
Renders black and white stripes by manipulating individual pixels.

"""


def setup():
    size(200, 200)
    loadPixels()
    changePixels()


def changePixels():
    # Loop through every pixel column
    for x in xrange(width):
        # Loop through every pixel row
        for y in xrange(height):
            # Find the pixel location in the image, starting from top left...
            loc = x + y * width
            if not (x % 5):  # every 5th column
                pixels[loc] = color(255)
            else:  # All the other columns
                pixels[loc] = color(0)

    updatePixels()

