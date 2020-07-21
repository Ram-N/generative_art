"""
Loads an image. And in a canvas of different dimensions,
it renders pieces of it. Helpful to undersstand how

loadpixels()
updatepixels()
pixels[]
r = red(img.pixels[img_loc])
g = green(img.pixels[img_loc])
b = blue(img.pixels[img_loc])

work

"""
newsize = 400

# these get set in setup after reading in the image
w_compress, h_compress = 1, 1  # starting values

y_step = newsize / 4
x_step = int(y_step * 1.4)


def setup():
    global img, w_compress, h_compress, imglist

    size(int(newsize * 1.4), newsize)
    img = loadImage("kilimanjaro.jpg")
    # img = image(img_orig,0,0, newsize, img_orig.height/img_orig.width*newsize)


def draw():
    global w_compress, h_compress, imglist

    # Since we are going to access the image's pixels too
    img.loadPixels()

    loadPixels()
    for y in range(height):
        for x in range(width):

            img_x = x * w_compress
            img_y = y * h_compress
            img_loc = img_x + img_y * img.width

            # The functions red(), green(), and blue() pull out the
            # 3 color components from a pixel.
            r = red(img.pixels[img_loc])
            g = green(img.pixels[img_loc])
            b = blue(img.pixels[img_loc])
            if y > 300:
                px = (x // x_step) + 1
            else:
                px = 0
            # Set the display pixel to the image pixel
            xnew = (x + x_step * 1) % width
            ynew = (y + y_step * 1) % height
            canvas_loc = xnew + ynew * width

            pixels[canvas_loc] = color(r, g, b)

    updatePixels()
