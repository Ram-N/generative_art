""" The very basics of loading and manipulating an image using Processing

Load an image (from the 'data' folder)
Render it in some xy location
move it to another location
Tint it


"""

resz = 0.33


def setup():
    global img
    size(820, 400)
    # Make a new instance of a PImage by loading an image file
    # Declaring a variable of type PImage
    img = loadImage("kilimanjaro.jpg")
    print(img.width, img.height)


def draw():
    global img
    background(0)
    # Draw the image to the screen at coordinate (0,0)
    # image(img,0,0) #0 0 is the top left corner
    image(img, 10, 20, 600, 400)  # resize it
    # tint(128) #halve the brightness
    tint(255, 127)
    # image(img,0,0)

    # tint(200,155, 0)
    image(img, 0, 0, img.width * resz, img.height * resz)  # resize to resz fraction

