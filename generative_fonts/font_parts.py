"""
Helper functions to render leaf fonts.

A "letter" in the leafabet has 4 parts:
1. an outline, 
2. interior, 
3. Base and 
4. Top.

"""


def pick_one(_lst):
    """ randomly picks one from a list of 2 """
    return _lst[int(random(len(_lst)))]


def render_letter_interior(st, end, _dir, gx, gy):
    xstep, ystep = gx[1] - gx[0], gy[1] - gy[0]

    int_shape = pick_one(["none", "line", "bez-r", "bez-l"])
    if int_shape == "line":
        line(gx[st[0]], gy[st[1]], gx[end[0]], gy[end[1]])
    elif int_shape == "bez-r":
        if _dir == "right":
            a, b, c, d = 1, -1, 1, -1
        elif _dir == "left":
            a, b, c, d = -1, -1, -1, -1
        elif _dir == "straight":
            a, b, c, d = 0, -1, 1, -2
        bezier(
            gx[st[0]],
            gy[st[1]],
            gx[st[0] + a],
            gy[st[1] + b],
            gx[st[0] + c],
            gy[st[1] + d],
            gx[end[0]],
            gy[end[1]],
        )
    elif int_shape == "bez-l":
        if _dir == "right":
            a, b, c, d = 1, -1, 2, -2
        elif _dir == "left":
            a, b, c, d = -1, -1, -2, -2
        elif _dir == "straight":
            a, b, c, d = 0, -1, -1, -2

        bezier(
            gx[st[0]],
            gy[st[1]],
            gx[st[0] + a],
            gy[st[1] + b],
            gx[st[0] + c],
            gy[st[1] + d],
            gx[end[0]],
            gy[end[1]],
        )

    ## ELLIPSE Add-on
    if pick_one([0, 0, 0, 0, 0, 1]):

        pushMatrix()
        translate(int((gx[st[0]] + gx[end[0]]) / 2), int((gy[st[1]] + gy[end[1]]) / 2))
        if _dir == "right":
            rotate(atan2(gy[end[1]] - gy[st[1]], gx[end[0]] - gx[st[0]]) + PI / 2)

        elif _dir == "left":
            rotate(atan2(gy[end[1]] - gy[st[1]], gx[end[0]] - gx[st[0]]) + PI / 2)
        ellipse(0, 0, xstep, 2 * ystep)
        popMatrix()

    ## SPINE-L Add-on
    if int_shape not in ["bez-l", "bez-r"]:
        if pick_one([0, 0, 0, 0, 1]):
            pushMatrix()
            translate(
                int((gx[st[0]] + gx[end[0]]) / 2), int((gy[st[1]] + gy[end[1]]) / 2)
            )
            if _dir == "straight":
                rotate(-PI / 4)
            elif _dir == "left":
                rotate(-PI / 2)
            line(0, 0, 0, -xstep * 0.8)
            line(0, 0, xstep * 0.8, 0)
            popMatrix()


def render_letter_top(st, end, _dir, gx, gy):

    top_shape = pick_one(["none", "ellipse", "triangle"])
    if int(random(2)):
        fill(0)
    xstep, ystep = gx[1] - gx[0], gy[1] - gy[0]

    if top_shape == "none":
        noFill()
        return
    elif top_shape == "ellipse":
        ellipse(gx[end[0]], gy[end[1]], xstep, ystep)
    elif top_shape == "triangle":
        if _dir == "left":
            x1a = -xstep
            x2a = 0
            y1a = 0
            y2a = -ystep
        elif _dir == "right":
            x1a = 0
            x2a = xstep
            y1a = -ystep
            y2a = 0
        elif _dir == "straight":
            x1a = -xstep
            x2a = xstep
            y1a = -ystep
            y2a = -ystep

        triangle(
            gx[end[0]],
            gy[end[1]],
            gx[end[0]] + x1a,
            gy[end[1]] + y1a,
            gx[end[0]] + x2a,
            gy[end[1]] + y2a,
        )
    noFill()


def render_letter_base(st, end, _dir, gx, gy):
    """ base is the leaf stem """

    strokeWeight(4)
    base_shape = pick_one(
        ["line", "v", "triangle", "v-curve", "left-curve", "right-curve"]
    )

    if _dir == "left":
        if base_shape == "v":
            line(gx[st[0]], gy[st[1]], gx[st[0]], gy[st[1] + 1])
            line(gx[st[0]], gy[st[1]], gx[st[0] + 1], gy[st[1]])
        elif base_shape == "line":
            line(gx[st[0]], gy[st[1]], gx[st[0] + 1], gy[st[1] + 1])
        elif base_shape == "triangle":
            if int(random(2)):
                fill(0)
            triangle(
                gx[st[0]], gy[st[1]], gx[st[0]], gy[st[1] + 1], gx[st[0] + 1], gy[st[1]]
            )
        elif base_shape == "left-curve":  # goes left, -1, +1
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
            )
        elif base_shape == "right-curve":  # goes left, +1,+1
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1]],
            )
        elif base_shape == "v-curve":
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
            )
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1]],
            )

    if _dir == "right":
        if base_shape == "v":
            line(gx[st[0]], gy[st[1]], gx[st[0] - 1], gy[st[1]])
            line(gx[st[0]], gy[st[1]], gx[st[0]], gy[st[1] + 1])
        elif base_shape == "line":
            line(gx[st[0]], gy[st[1]], gx[st[0] - 1], gy[st[1] + 1])
        elif base_shape == "triangle":
            if int(random(2)):
                fill(0)
            triangle(
                gx[st[0]], gy[st[1]], gx[st[0] - 1], gy[st[1]], gx[st[0]], gy[st[1] + 1]
            )
        elif base_shape == "left-curve":  # goes left, -1, +1
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1]],
            )
        elif base_shape == "right-curve":  # goes left, +1,+1
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
            )
        elif base_shape == "v-curve":
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1]],
            )
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
            )

    if _dir == "straight":
        if base_shape == "v":
            line(gx[st[0]], gy[st[1]], gx[st[0] - 1], gy[st[1] + 1])
            line(gx[st[0]], gy[st[1]], gx[st[0] + 1], gy[st[1] + 1])
        elif base_shape == "line":
            line(gx[st[0]], gy[st[1]], gx[st[0]], gy[st[1] + 1])
        elif base_shape == "triangle":
            if int(random(2)):
                fill(0)
            triangle(
                gx[st[0]],
                gy[st[1]],
                gx[st[0] - 1],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1] + 1],
            )
        elif base_shape == "left-curve":  # goes left, -1,+1
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1] + 1],
            )
        elif base_shape == "right-curve":  # goes left, +1,+1
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1] + 1],
            )
        elif base_shape == "v-curve":
            bezier(  # left
                gx[st[0]],
                gy[st[1]],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0] + 1],
                gy[st[1] + 1],
            )
            bezier(
                gx[st[0]],
                gy[st[1]],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0]],
                gy[st[1] + 1],
                gx[st[0] - 1],
                gy[st[1] + 1],
            )

    noFill()


def render_leaf(st, c1, c2, end, _dir, gx, gy):

    stx, sty = st[0], st[1]
    c1x, c1y = c1[0], c1[1]
    c2x, c2y = c2[0], c2[1]
    endx, endy = end[0], end[1]
    _sq = len(gx) - 1  # 9-1 =8
    # print(stx, sty, c1x, c1y)
    # print(c2x, c2y, endx, endy)
    # print(sq)

    if _dir == "right":
        # reasonable starts are (2,6)#flat-based-leaf or (3,5) #heart shaped
        bezier(
            gx[stx], gy[sty], gx[c1x], gy[c1y], gx[c2x], gy[c2y], gx[endx], gy[endy]
        )  # upper arm
        c1x_jump = stx - c1x
        c1y_jump = sty - c1y
        c2x_jump = stx - c2x
        c2y_jump = sty - c2y
        bezier(
            gx[stx],
            gy[sty],
            gx[stx + c1y_jump],
            gy[sty + c1x_jump],
            gx[stx + c2y_jump],
            gy[sty + c2x_jump],
            gx[endx],
            gy[endy],
        )  # lower

    if _dir == "left":
        # Leaning LEFT. Symmetry about x=y
        # reasonable starts are (6,6)#flat-based-leaf or (5,5) #heart shaped
        bezier(
            gx[stx], gy[sty], gx[c1x], gy[c1y], gx[c2x], gy[c2y], gx[endx], gy[endy]
        )  # upper arm

        c1x_jump = stx - c1x
        c1y_jump = sty - c1y
        c2x_jump = stx - c2x
        c2y_jump = sty - c2y

        bezier(
            gx[stx],
            gy[sty],
            gx[stx - c1y_jump],
            gy[sty - c1x_jump],
            gx[stx - c2y_jump],
            gy[sty - c2x_jump],
            gx[endx],
            gy[endy],
        )  # lower

    if _dir == "straight":
        bezier(gx[stx], gy[sty], gx[c1x], gy[c1y], gx[c2x], gy[c2y], gx[endx], gy[endy])
        bezier(
            gx[stx],
            gy[sty],
            gx[_sq - c1x],
            gy[c1y],
            gx[_sq - c2x],
            gy[c2y],
            gx[endx],
            gy[endy],
        )


def render_outline(x, y, gx, gy):

    # gx, gy = get_cell_gridlines(x, y, fw, fh, margin)
    # draw_cell_gridlines(x, y, gx, gy)

    _dir = pick_one(["left", "right", "straight"])

    if _dir == "right":  # leans right

        stx = pick_one([2, 3])
        sty = pick_one([5, 6])
        endx = stx + 3
        endy = sty - 3
        if stx == 2 and sty == 5:
            c1x = pick_one([0, 1])
            c1y = pick_one([3, 4])
            c2x = pick_one([3, 4])
            c2y = pick_one([3, 2])
        if stx == 3 and sty == 6:
            c1x = pick_one([1, 2])
            c1y = pick_one([4, 5, 6])
            c2x = pick_one([2, 3, 4])
            c2y = pick_one([2, 3])
        if stx == 2 and sty == 6:
            c1 = pick_one([[0, 4], [0, 5], [0, 6], [1, 4], [1, 5]])
            c1x, c1y = c1[0], c1[1]
            c2x = pick_one([2, 3, 4])
            c2y = pick_one([2, 3])
        if stx == 3 and sty == 5:
            c1x = pick_one([1, 2])
            c1y = pick_one([3, 4])
            c2x = pick_one([3, 4])
            c2y = pick_one([3, 2])

    elif _dir == "left":  # left bend
        # for heart-shape...sty is 5, and c1y has to be 6,7 or 8
        stx = pick_one([5, 6])
        sty = pick_one([5, 6])
        endx = stx - 3
        endy = sty - 3
        c1x = pick_one([stx, stx + 1])
        c1y = pick_one([sty - 2, sty - 3])
        c2x = pick_one([stx - 1, stx - 2])
        c2y = pick_one([sty - 3, sty - 4])

    elif _dir == "straight":
        stx, sty = 4, 6
        endx, endy = 4, 2
        c1x = 2
        c1y = pick_one([6, 7, 8])
        c2x = 2
        c2y = pick_one([4, 5, 6])

    st = (stx, sty)
    end = (endx, endy)
    c1 = (c1x, c1y)
    c2 = (c2x, c2y)

    render_leaf(st, c1, c2, end, _dir, gx, gy)
    return (st, end, _dir)  # return the two ends of the font outline
