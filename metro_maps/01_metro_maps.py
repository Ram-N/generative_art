"""

Metro Maps for imaginary cities

This is the first script. Static Map.
Lots of "mistakes" to be fixed, but it will draw 4 lines.

Author: Ram Narasimhan
July 2020

"""

side = 50
w = 2 * side
ht = sqrt(3) * side
border = 60
sdim = 30
num_rows, num_cols = 9, 10

RED, BLUE = (255, 0, 0), (0, 255, 0)
GREEN, BLACK = (0, 0, 255), (0, 0, 0)
colors = [RED, BLUE, GREEN, BLACK]
next_available = 0


def create_hex_grid(border):
    for row in range(num_rows):
        for col in range(num_cols):
            x = border + 2 * side * col
            y = border + ht * row
            ellipse(x, y, 10, 10)


def pick_orig_dest(num_rows, num_cols):

    s1 = (int(random(num_rows)), int(random(num_cols)))
    s2 = (int(random(num_rows)), int(random(num_cols)))

    return (s1, s2)


def mark_terminal_node(s1, term_flag):
    global next_available

    x = s1[0] * side * 2 + border
    y = s1[1] * ht + border
    if term_flag:
        fill(0)
    else:
        fill(128)
    ellipse(x, y, sdim + 10, sdim + 10)

    fill(*colors[next_available % 4])
    ellipse(x, y, sdim, sdim)


def get_next_direction(curr_node, sd):

    xdiff = sd[0] - curr_node[0]
    ydiff = sd[1] - curr_node[1]
    #    return(xdiff, ydiff)

    if not xdiff and not ydiff:
        return (0, 0)
    if not xdiff and ydiff > 0:
        return (0, 1)
    if not xdiff and ydiff < 0:
        return (0, -1)
    if not ydiff and xdiff > 0:
        return (1, 0)
    if not ydiff and xdiff < 0:
        return (-1, 0)

    return (1 if (xdiff > 0) else -1, 1 if ydiff > 0 else -1)


def get_next_node(curr_node, sd):

    dir = get_next_direction(curr_node, sd)
    print(curr_node, "dir", dir, "sd", sd)
    if dir == (0, 0):
        return None

    if dir == (1, 0):
        return (curr_node[0] + 1, curr_node[1])
    if dir == (-1, 0):
        return (curr_node[0] - 1, curr_node[1])
    if dir == (0, 1):
        return (curr_node[0], curr_node[1] + 1)
    if dir == (0, -1):
        return (curr_node[0], curr_node[1] - 1)

    if dir == (1, 1):
        rnd = random(1)
        if rnd < 0.33:
            return (curr_node[0] + 1, curr_node[1])
        elif rnd < 0.67:
            return (curr_node[0], curr_node[1] + 1)
        else:
            return (curr_node[0] + 1, curr_node[1] + 1)

    if dir == (1, -1):
        rnd = random(1)
        if rnd < 0.33:
            return (curr_node[0] + 1, curr_node[1])
        elif rnd < 0.67:
            return (curr_node[0], curr_node[1] - 1)
        else:
            return (curr_node[0] + 1, curr_node[1] - 1)

    if dir == (-1, -1):
        rnd = random(1)
        if rnd < 0.33:
            return (curr_node[0] - 1, curr_node[1])
        elif rnd < 0.67:
            return (curr_node[0], curr_node[1] - 1)
        else:
            return (curr_node[0] - 1, curr_node[1] - 1)

    if dir == (-1, 1):
        rnd = random(1)
        if rnd < 0.33:
            return (curr_node[0] - 1, curr_node[1])
        elif rnd < 0.67:
            return (curr_node[0], curr_node[1] + 1)
        else:
            return (curr_node[0] - 1, curr_node[1] + 1)


def draw_line_from(so, sd):

    curr_node = so
    cx, cy = so

    while curr_node != sd:
        nx, ny = get_next_node(curr_node, sd)
        stroke(*colors[next_available])
        strokeWeight(8)
        line(xcoord(cx), ycoord(cy), xcoord(nx), ycoord(ny))
        curr_node = (nx, ny)
        cx, cy = curr_node


def xcoord(xval):
    return border + 2 * xval * side


def ycoord(yval):
    return border + yval * ht


def setup():
    global next_available

    size(1000, 900)
    background(128)
    create_hex_grid(border)

    for routes in range(4):

        so, sd = pick_orig_dest(num_rows, num_cols)
        print(so, sd, "dest")
        mark_terminal_node(so, 0)
        mark_terminal_node(sd, 1)
        draw_line_from(so, sd)
        next_available += 1


def draw():
    pass
