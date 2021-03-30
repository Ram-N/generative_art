"""

Author: Ram Narasimhan
July 2020

This script is part of a Processing tutorial on Image Manipulation.
Step-by-step, we are re-creating the famous "15-Puzzle" using Processing.py

It Builds on several previous scripts in this directory. Follow them in order to understand how each steps builds
on the previous.

By now, we have a fully working puzzle. It takes in an input image, chops it up into 16 pieces.
Makes the final piece to be colored black, and it shuffles them.


To run it: load this script into your Processing PYTHON MODE IDE.
Use your mouse to click to solve the puzzle.


"""

newsize = 400

# How much should the width and height be changed from original dimensions to canvas
w_compress, h_compress = 1, 1  # starting values
# these get set in setup after reading in the image

num_tiles = 4 * 4
y_step = newsize / 4
x_step = int(y_step * 1.4)
hole = (3, 3)


def setup():
    global img, smx, smy, w_compress, h_compress, imglist, order, hole

    size(int(newsize * 1.4), newsize)
    img = loadImage("kilimanjaro.jpg")
    # img = image(img_orig,0,0, newsize, img_orig.height/img_orig.width*newsize)
    w_compress = img.width / width
    h_compress = img.height / height
    imglist = []
    # xstart, xend, ystart, yend = [], [], [], []

    # Create 16 new image placeholders...
    # Prepare their pixel slices
    for px in range(4):
        for py in range(4):
            smx, smy = width / 4, height / 4
            small_img = createImage(smx, smy, RGB)  # create empty small images
            # xstart.append(img.width/4 * px)
            # xend.append(img.width/4 * (px+1)-1)
            # ystart.append(img.height/4 * py)
            # yend.append(img.height/4 * (py+1)-1)
            snum = 4 * px + py

            small_img.loadPixels()
            # Copy the appropriate pixels from the Main image to one particular small image (tile)
            for x in range(0, smx):
                for y in range(0, smy):
                    # have to find the approp image coords
                    img_x = int((x + (px * smx)) * w_compress)
                    img_y = int((y + (py * smy)) * h_compress)
                    img_loc = img_x + img_y * img.width

                    r = red(img.pixels[img_loc])
                    g = green(img.pixels[img_loc])
                    b = blue(img.pixels[img_loc])

                    # Set the small-image pixel to the main-image pixel
                    small_img.pixels[x + y * small_img.width] = color(r, g, b)

            small_img.updatePixels()
            imglist.append(small_img)  # add it to the list of small images

    # Make Tile-15 pos(3,3) to be black
    create_black_tile(imglist, smx, smy)

    order = create_starting_sequence_of_tiles(num_tiles, hole)
    hole = find_hole(order, 15)


def draw():
    global smx, smy, w_compress, h_compress, imglist, order, hole

    # we are listening for mousePressed. But also drawing the current sequence of small images
    render_slices_by_given_sequence(imglist, sequence=order)


def mousePressed():
    global order, hole
    tx, ty = get_tile_clicked()
    if can_move(tx, ty, hole):
        # make the swap. I.e. update the img_list "order"
        order, hole = swap_tile_and_hole(order, tx, ty, hole)
        saveFrame("images/zzle_####.png")


def find_hole(sequence, hole_img):

    for idx, img in enumerate(sequence):
        if img == hole_img:
            return (idx // 4, idx % 4)

    return None  # not found


def create_starting_sequence_of_tiles(num_tiles, hole):
    """ returns integers in range(num_tiles) that are shuffled to form the puzzle start.
    
        Idea: start from the final configuration: [0,1...numtiles]
        Keep moving the hole-tile randomly a few dozen times, legally.
        Return the resulting sequence.
    """

    sequence = range(num_tiles)

    for attempts in range(100):
        swap = False
        dir = int(random(4))
        if dir == 0:  # north
            if hole[1] > 0:  # room to move north exists
                ty = hole[1] - 1
                tx = hole[0]
                swap = True
        elif dir == 1:  # move east
            if hole[0] < 3:  # room to move east exists
                ty = hole[1]
                tx = hole[0] + 1
                swap = True
        elif dir == 2:  # move South
            if hole[1] < 3:  # room to move South exists
                ty = hole[1] + 1
                tx = hole[0]
                swap = True
        elif dir == 3:  # move West
            if hole[0] > 0:  # room to move West exists
                ty = hole[1]
                tx = hole[0] - 1
                swap = True

        if swap:
            # update hole and one neighoring tile
            sequence, hole = swap_tile_and_hole(sequence, tx, ty, hole)

    # we have shuffled it enough
    return sequence


def create_black_tile(imglist, smx, smy):
    # make the last tile to be black
    black_img = imglist[-1]
    black_img.loadPixels()
    for pix in range(smx * smy):  # its dimensions are smx x smy
        black_img.pixels[pix] = color(0, 0, 0)
    black_img.updatePixels()


def render_slices_by_given_sequence(imglist, sequence):
    # render the sixteen pieces, if you know their starting xy's
    for px in range(4):
        for py in range(4):
            snum = 4 * px + py
            smx, smy = width / 4, height / 4
            image(imglist[sequence[snum]], smx * px, py * smy)


# was used in earlier scripts, but not used in the current one.
def randomly_swap_list(sequence):
    lmax = len(sequence)
    i = int(random(lmax))
    j = int(random(lmax))
    sequence[i], sequence[j] = sequence[j], sequence[i]
    return sequence


def swap_tile_and_hole(sequence, tx, ty, hole):

    hole_img = 15
    hole_pos = hole[0] * 4 + hole[1]
    tile_pos = tx * 4 + ty
    tile_img = sequence[tile_pos]
    sequence[hole_pos] = tile_img
    sequence[tile_pos] = hole_img
    hole = (tx, ty)  # update hole position to where the tile was
    return (sequence, hole)


def get_tile_clicked():
    tx = mouseX // smx
    ty = mouseY // smy
    return (tx, ty)


def can_move(tx, ty, hole):
    """returns 1 if the tile can slide to the current hole, 0 otherwise"""
    if (abs(tx - hole[0])) + (abs(ty - hole[1])) == 1:
        return 1
    else:
        return 0

