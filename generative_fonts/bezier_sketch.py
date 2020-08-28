"""
Try out some concepts here. Then move the finished functions to leafont.py

"""


def render_lettertop(st, end, gx, gy):
    ellipse(gx[end[0]], gy[end[1]], 5, 5)


def pick_one(_lst):
    """ randomly picks one from a list of 2 """
    if len(_lst) == 2:
        return _lst[0] if int(random(2)) else _lst[1]
    elif len(_lst) == 3:
        return _lst[int(random(3))]


# bez-heart-squished
# bezier(gx[4], gy[5], gx[2], gy[6], gx[2], gy[4], gx[4], gy[2])
# bezier(gx[4], gy[5], gx[6], gy[6], gx[6], gy[4], gx[4], gy[2])

# bez-heart
# bezier(gx[4], gy[6], gx[2], gy[7], gx[2], gy[4], gx[4], gy[2])
# bezier(gx[4], gy[6], gx[6], gy[7], gx[6], gy[4], gx[4], gy[2])

# bez-heart-long
# bezier(gx[4], gy[5], gx[2], gy[8], gx[2], gy[4], gx[4], gy[2])
# bezier(gx[4], gy[5], gx[6], gy[8], gx[6], gy[4], gx[4], gy[2])

# bez-heart-coni
# bezier(gx[4], gy[5], gx[2], gy[8], gx[2], gy[6], gx[4], gy[2])
# bezier(gx[4], gy[5], gx[6], gy[8], gx[6], gy[6], gx[4], gy[2])


# bezier(gx[4], gy[6], gx[2], gy[6], gx[2], gy[4], gx[4], gy[2])
# bezier(gx[4], gy[6], gx[6], gy[6], gx[6], gy[4], gx[4], gy[2])

# ystep = gy[1] - gy[0]


def bent_leaf(st, c1, c2, end, dir, gx, gy):

    stx, sty = st[0], st[1]
    c1x, c1y = c1[0], c1[1]
    c2x, c2y = c2[0], c2[1]
    endx, endy = end[0], end[1]
    _sq = len(gx) - 1  # 9-1 =8
    # print(stx, sty, c1x, c1y)
    # print(c2x, c2y, endx, endy)
    # print(sq)
    if dir == "right":
        # Leaning Right. Symmetry about x+y = 8
        # reasonable starts are (2,6)#flat-based-leaf or (3,5) #heart shaped
        bezier(
            gx[stx], gy[sty], gx[c1x], gy[c1y], gx[c2x], gy[c2y], gx[endx], gy[endy]
        )  # upper arm
        bezier(
            gx[stx],
            gy[sty],
            gx[_sq - c1y],
            gy[_sq - c1x],
            gx[_sq - c2y],
            gy[_sq - c2x],
            gx[endx],
            gy[endy],
        )  # lower

    if dir == "left":
        # Leaning LEFT. Symmetry about x=y
        # reasonable starts are (6,6)#flat-based-leaf or (5,5) #heart shaped
        bezier(
            gx[stx], gy[sty], gx[c1x], gy[c1y], gx[c2x], gy[c2y], gx[endx], gy[endy]
        )  # upper arm
        # mirror reflect around the line(2,6), (3,5), (4,4) (5,3) (6, 2)
        bezier(
            gx[stx], gy[sty], gx[c1y], gy[c1x], gx[c2y], gy[c2x], gx[endx], gy[endy]
        )  # lower


def render_outline(x, y, gx, gy):

    # gx, gy = get_cell_gridlines(x, y, fw, fh, margin)
    # draw_cell_gridlines(x, y, gx, gy)

    dir = "left" if int(random(2)) else "right"

    if dir == "right":  # leans right

        sty = pick_one([5, 6])
        stx = pick_one([2, 3])
        endx = pick_one([5, 6])
        endy = pick_one([2, 3])
        c1x = pick_one([0, 1])
        c2x = pick_one([1, 2])
        c1y = pick_one([5, 6])
        c2y = pick_one([2, 3])

    else:  # left bend
        # for heart-shape...sty is 5, and c1y has to be 6,7 or 8
        stx = pick_one([5, 6])
        sty = pick_one([5, 6])
        endx = pick_one([2, 3])
        endy = pick_one([2, 3])
        c1x = pick_one([7, 8])
        c2x = pick_one([1, 2, 3])
        c1y = pick_one([6, 7, 8])
        c2y = pick_one([5, 6])

    st = (stx, sty)
    end = (endx, endy)
    c1 = (c1x, c1y)
    c2 = (c2x, c2y)

    bent_leaf(st, c1, c2, end, dir, gx, gy)
    return (st, end)  # return the two ends of the font outline


# size(200, 200)
# margin = 25
# x, y = 0, 0
# fw, fh = 150, 150
# sq = 8
# # fill(230, 100)
# noFill()

# render_outline(x, y, fw, fh, margin, sq)
