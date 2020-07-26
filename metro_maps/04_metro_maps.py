"""

Metro Maps for imaginary cities

4th Script

1. Overlaps
2. Moved render_mm to a separate function

Author: Ram Narasimhan
July 2020

"""


side = 50
w = 2 * side
ht = sqrt(3) * side
margin = 60
sdim = 30
stn_size = 10
num_rows, num_cols = 9, 10

RED, BLUE = (255, 0, 0), (0, 255, 0)
GREEN, BLACK = (0, 0, 255), (0, 0, 0)
CYAN, YELLOW = (255, 0, 255), (0, 255, 255)
colors = [RED, BLUE, GREEN, BLACK, CYAN, YELLOW]
next_available = 0


def create_hex_grid(margin):
    global num_tracks

    for row in range(num_rows):
        for col in range(num_cols):
            x = margin + 2 * side * col
            y = margin + ht * row
            ellipse(x, y, 5, 5)

            if row <= 2 or row >= (num_rows - 2):
                station_d[(col, row)] = "outer"
            elif col <= 2 or col >= (num_cols - 2):
                station_d[(col, row)] = "outer"
            else:
                station_d[(col, row)] = "inner"

            num_tracks[col, row] = 0


def mark_terminal_node(route_num, s1, term_flag):
    global next_available

    x = s1[0] * side * 2 + margin
    y = s1[1] * ht + margin
    stroke(0)
    fill(*colors[route_num])
    ellipse(x, y, sdim + 10, sdim + 10)


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


def render_metro_map():

    strokeWeight(8)
    for l in lines.keys():
        num_stn = len(lines[l])

        mark_terminal_node(l, lines[l][0], 0)
        mark_terminal_node(l, lines[l][-1], 1)

        print("line", l, num_stn, lines[l])
        for snum in range(num_stn - 1):
            cx, cy = lines[l][snum]
            nx, ny = lines[l][snum + 1]
            stroke(*colors[l])

            xadj, yadj = 0, 0

            # check if coords need adjusting due to segments carrying multiple lines
            if len(segments[((cx, cy), (nx, ny))]) > 1:
                xadj, yadj = 10, 10

            line(
                xcoord(cx) + xadj,
                ycoord(cy) + yadj,
                xcoord(nx) + xadj,
                ycoord(ny) + yadj,
            )

            if num_tracks[(cx, cy)] == 1:
                fill(*colors[l])
                ellipse(xcoord(cx), ycoord(cy), stn_size, stn_size)
            elif num_tracks[(cx, cy)] > 1:
                fill(255, 255, 255)
                noStroke()
                ellipse(xcoord(cx), ycoord(cy), stn_size * 3, stn_size * 2)


def xcoord(xval):
    return margin + 2 * xval * side


def ycoord(yval):
    return margin + yval * ht


def get_dist(curr_node, sd):

    xdiff = sd[0] - curr_node[0]
    ydiff = sd[1] - curr_node[1]
    return (xdiff, ydiff)


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
    global lines, num_tracks, segments

    curr_node = so
    cx, cy = so
    lines[route_num] = [(cx, cy)]
    num_tracks[(cx, cy)] += 1

    while curr_node != sd:
        nx, ny = get_next_node(curr_node, sd)
        lines[route_num].append((nx, ny))
        if ((cx, cy), (nx, ny)) in segments:
            segments[((cx, cy), (nx, ny))].append(route_num)
        else:
            segments[((cx, cy), (nx, ny))] = [route_num]

        num_tracks[(nx, ny)] += 1
        # stroke(*colors[next_available])
        # strokeWeight(8)
        # line(xcoord(cx), ycoord(cy), xcoord(nx), ycoord(ny))
        curr_node = (nx, ny)
        cx, cy = curr_node

    # draw_line_from(so, sd)


station_d = {}  # key is station (xy). value
lines = {}  # key is Line Number. Values = list of stations
num_tracks = (
    {}
)  # key is station. Keeps track of how many routes go through each station
segments = {}  # k: segments, v: list of Lines
num_lines = 6


def setup():
    global next_available, station_d, lines, num_tracks, segments

    size(1000, 900)
    background(128)
    create_hex_grid(margin)

    for route_num in range(num_lines):

        so, sd = pick_orig_dest(num_rows, num_cols)
        print(so, sd, "dest")
        create_route(route_num, so, sd)

    # Draw it out
    render_metro_map()

    for k, v in segments.items():
        if len(v) > 1:
            print(k, v)


def draw():
    pass
