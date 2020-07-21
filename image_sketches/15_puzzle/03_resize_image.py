newsize = 400

# these get set in setup after reading in the image
w_ratio, h_ratio = 1, 1  # starting values


def setup():
    global img, w_ratio, h_ratio

    size(int(newsize * 1.4), newsize)
    img = loadImage("kilimanjaro.jpg")
    # img = image(img_orig,0,0, newsize, img_orig.height/img_orig.width*newsize)
    w_ratio = img.width / width
    h_ratio = img.height / height


def draw():
    global w_ratio, h_ratio
    print(w_ratio, h_ratio)
    loadPixels()
    # Since we are going to access the image's pixels too
    img.loadPixels()

    for y in range(height):
        for x in range(width):

            img_x = x * w_ratio
            img_y = y * h_ratio
            img_loc = img_x + img_y * img.width

            # The functions red(), green(), and blue() pull out the
            # 3 color components from a pixel.
            r = red(img.pixels[img_loc])
            g = green(img.pixels[img_loc])
            b = blue(img.pixels[img_loc])

            # Set the display pixel to the image pixel
            canvas_loc = x + y * width

            pixels[canvas_loc] = color(r, g, b)

    updatePixels()
