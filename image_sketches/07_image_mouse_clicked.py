"""

Builds on previous scripts in this directory. Follow them in order to understand how each steps builds
on the previous.

In this script we have two changes. We are ready to write the 15-Puzzle "game"

1. We replace the last small image with a black tile. (there is a separate function for this)
2. We record mouseclick and print out which tile was clicked.

In the next script, we can use the tile clicked to move the tile if permissible. (Not all tiles can be moved.
                                                                                  Only those that are next to the hole.)

"""

newsize = 400

# these get set in setup after reading in the image
w_compress, h_compress = 1, 1  # starting values

y_step = newsize / 4
x_step = int(y_step * 1.4)
order = [9, 4, 3, 6, 10, 7, 8, 2, 1, 11, 0, 12, 5, 13, 15, 14]


def setup():
    global img, smx, smy, w_compress, h_compress, imglist

    size(int(newsize * 1.4), newsize)
    img = loadImage("kilimanjaro.jpg")
    # img = image(img_orig,0,0, newsize, img_orig.height/img_orig.width*newsize)
    w_compress = img.width / width
    h_compress = img.height / height
    imglist = []
    xstart, xend, ystart, yend = [], [], [], []

    # Create 16 new image placeholders...
    # Prepare their pixel slices
    for px in range(4):
        for py in range(4):
            smx, smy = width / 4, height / 4
            small_img = createImage(smx, smy, RGB)
            xstart.append(img.width / 4 * px)
            xend.append(img.width / 4 * (px + 1) - 1)
            ystart.append(img.height / 4 * py)
            yend.append(img.height / 4 * (py + 1) - 1)
            snum = 4 * px + py

            small_img.loadPixels()
            # Copy the pixels from Main image to smaller images
            for x in range(0, smx):
                for y in range(0, smy):
                    # have to find the approp image coords
                    img_x = int((x + (px * smx)) * w_compress)
                    img_y = int((y + (py * smy)) * h_compress)
                    img_loc = img_x + img_y * img.width

                    r = red(img.pixels[img_loc])
                    g = green(img.pixels[img_loc])
                    b = blue(img.pixels[img_loc])

                    # Set the small image pixel to the image pixel
                    small_img.pixels[x + y * small_img.width] = color(r, g, b)

            small_img.updatePixels()
            imglist.append(small_img)

    # Make Tile-15 pos(3,3) to be black
    create_black_tile(imglist, smx, smy)


def create_black_tile(imglist, smx, smy):
    # make the last tile to be black
    black_img = imglist[-1]
    black_img.loadPixels()
    for pix in range(smx * smy):
        black_img.pixels[pix] = color(0, 0, 0)
    black_img.updatePixels()


def render_slices_by_given_sequence(imglist, sequence):
    # render the sixteen pieces, if you know their starting xy's
    for px in range(4):
        for py in range(4):
            snum = 4 * px + py
            smx, smy = width / 4, height / 4
            image(imglist[sequence[snum]], smx * px, py * smy)


def randomly_swap_list(sequence):
    lmax = len(sequence)
    i = int(random(lmax))
    j = int(random(lmax))
    sequence[i], sequence[j] = sequence[j], sequence[i]
    return sequence


def get_tile_clicked():
    tx = mouseX // smx
    ty = mouseY // smy

    return (tx, ty)


def draw():
    global smx, smy, w_compress, h_compress, imglist, order

    if mousePressed:
        tx, ty = get_tile_clicked()
        print(tx, ty)
        order = randomly_swap_list(order)

    render_slices_by_given_sequence(imglist, sequence=order)

