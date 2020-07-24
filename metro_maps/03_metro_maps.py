"""

Metro Maps for imaginary cities

3rd Script

1. Adding a dictionary to keep track of all the stations each line visits.
2. Another dictionary to record num_tracks per station.
3. Made the rendering into a separate function. Thus junctions will get a white color.

Author: Ram Narasimhan
July 2020

"""


side = 50
w = 2 * side
ht = sqrt(3) * side
border = 60
sdim = 30
stn_size = 10
num_rows, num_cols = 9, 10

RED, BLUE = (255, 0, 0), (0, 255, 0)
GREEN, BLACK = (0, 0, 255), (0, 0, 0)
CYAN, YELLOW = (255, 0, 255), (0, 255, 255)
colors = [RED, BLUE, GREEN, BLACK, CYAN, YELLOW]
next_available = 0


def create_hex_grid(border):
    global num_tracks

    for row in range(num_rows):
        for col in range(num_cols):
            x = border + 2 * side * col
            y = border + ht * row
            ellipse(x, y, 5, 5)

            if row <= 2 or row >= (num_rows - 2):
                station_d[(col, row)] = "outer"
            elif col <= 2 or col >= (num_cols - 2):
                station_d[(col, row)] = "outer"
            else:
                station_d[(col, row)] = "inner"

            num_tracks[col, row] = 0


def mark_terminal_node(s1, term_flag):
    global next_available

    x = s1[0] * side * 2 + border
    y = s1[1] * ht + border
    if term_flag:
        stroke(0)
        fill(0, 0, 0)
        ellipse(x, y, sdim + 10, sdim + 10)
    else:
        stroke(200)
        fill(255, 255, 200)
        ellipse(x, y, sdim + 10, sdim + 10)

    fill(*colors[next_available % 4])
    ellipse(x, y, sdim, sdim)


def get_next_direction(curr_node, sd):

    xdiff, ydiff = get_dist(curr_node, sd)

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


def render_lines():

    strokeWeight(8)
    for l in lines:
        stroke(*colors[l])
        for snum in range(len(lines[l][:-1])):
            cx, cy = lines[l][snum]
            nx, ny = lines[l][snum + 1]
            line(xcoord(cx), ycoord(cy), xcoord(nx), ycoord(ny))

            if num_tracks[(cx, cy)] == 1:
                fill(*colors[l])
                ellipse(xcoord(cx), ycoord(cy), stn_size, stn_size)
            elif num_tracks[(cx, cy)] > 1:
                fill(255, 255, 255)
                noStroke()
                ellipse(xcoord(cx), ycoord(cy), stn_size * 3, stn_size * 2)


def xcoord(xval):
    return border + 2 * xval * side


def ycoord(yval):
    return border + yval * ht


def get_dist(curr_node, sd):

    xdiff = sd[0] - curr_node[0]
    ydiff = sd[1] - curr_node[1]
    return (xdiff, ydiff)


num_lines = 6


def pick_orig_dest(num_rows, num_cols):

    done = False
    while not done:
        s1 = (int(random(num_cols)), int(random(num_rows)))
        s2 = (int(random(num_cols)), int(random(num_rows)))
        xd, yd = get_dist(s1, s2)

        if station_d[s1] == "outer" or station_d[s2] == "outer":
            done = True

        if abs(xd) + abs(yd) <= 5:
            done = False

    return (s1, s2)


def create_route(route_num, so, sd):
    global lines, num_tracks

    curr_node = so
    cx, cy = so
    while curr_node != sd:
        nx, ny = get_next_node(curr_node, sd)
        lines[route_num].append((nx, ny))
        num_tracks[(nx, ny)] += 1
        stroke(*colors[next_available])
        strokeWeight(8)
        line(xcoord(cx), ycoord(cy), xcoord(nx), ycoord(ny))
        curr_node = (nx, ny)
        cx, cy = curr_node

    # draw_line_from(so, sd)


station_d = {}  # key is station
lines = {}  # key is a Line
num_tracks = {}  # key is station


def setup():
    global next_available, station_d, lines, num_tracks

    size(1000, 900)
    background(128)
    create_hex_grid(border)

    for route_num in range(num_lines):

        so, sd = pick_orig_dest(num_rows, num_cols)
        print(so, sd, "dest")
        mark_terminal_node(so, 0)
        mark_terminal_node(sd, 1)
        lines[route_num] = []
        create_route(route_num, so, sd)
        render_lines()
        next_available += 1


def draw():
    pass
