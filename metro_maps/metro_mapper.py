"""
Metro Maps for imaginary cities

Author: Ram Narasimhan
July 2020

4th Script

- Overlaps have to be shown clearly
1. Made segs to be lexicographically sorted
2. Make the segments to be a dictionary of dicts. Track Lines, dir and incoming and outgoing.
3. Have to connect the lines such that it flows without a break.
4. Plot one line at a time. In each junction, its prev and next x and y values should be the same
5. All overlaps have been addressed, but the x values for a particular line are not always the same. So it 'flips'



"""


side = 45
w = 2 * side
ht = sqrt(3) * side
margin = 70
sdim = 30
stn_size = 10
num_rows, num_cols = 9, 10

RED, BLUE = (255, 0, 0), (0, 255, 0)
GREEN, BLACK = (0, 0, 255), (0, 0, 0)
PURPLE, CYAN, YELLOW = (255, 0, 255), (0, 255, 255), (255, 255, 0)
ORANGE = (255, 150, 0)
ROSE, TEAL = (255, 102, 204), (0, 128, 128)
colors = [CYAN, ORANGE, BLUE, TEAL, GREEN, BLACK, PURPLE, RED, YELLOW, ROSE]
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
        if rnd < 0.2:
            return (curr_node[0] + 1, curr_node[1])
        elif rnd < 0.4:
            return (curr_node[0], curr_node[1] + 1)
        else:
            return (curr_node[0] + 1, curr_node[1] + 1)

    if dir == (1, -1):
        rnd = random(1)
        if rnd < 0.2:
            return (curr_node[0] + 1, curr_node[1])
        elif rnd < 0.4:
            return (curr_node[0], curr_node[1] - 1)
        else:
            return (curr_node[0] + 1, curr_node[1] - 1)

    if dir == (-1, -1):
        rnd = random(1)
        if rnd < 0.2:
            return (curr_node[0] - 1, curr_node[1])
        elif rnd < 0.4:
            return (curr_node[0], curr_node[1] - 1)
        else:
            return (curr_node[0] - 1, curr_node[1] - 1)

    if dir == (-1, 1):
        rnd = random(1)
        if rnd < 0.2:
            return (curr_node[0] - 1, curr_node[1])
        elif rnd < 0.4:
            return (curr_node[0], curr_node[1] + 1)
        else:
            return (curr_node[0] - 1, curr_node[1] + 1)


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
        s0 = (int(random(num_cols)), int(random(num_rows)))
        s1 = (int(random(num_cols)), int(random(num_rows)))
        xd, yd = get_dist(s0, s1)

        if station_d[s0] == "outer" or station_d[s1] == "outer":
            done = True

        if abs(xd) + abs(yd) <= 5:
            done = False

        # lexisort such that origin is "before" destination
        orig, dest = get_sorted_seg(s0[0], s0[1], s1[0], s1[1])

    return (orig, dest)


def get_sorted_seg(cx, cy, nx, ny):
    """ Segments are sorted in numerically. """
    if cx < nx:
        return ((cx, cy), (nx, ny))
    elif cx > nx:
        return ((nx, ny), (cx, cy))
    else:  # equal
        if cy <= ny:
            return ((cx, cy), (nx, ny))
        else:
            return ((nx, ny), (cx, cy))


def get_seg_orientation(lseg):
    """ is it - | / or \ """

    cs, ns = lseg
    cx, cy = cs
    nx, ny = ns

    if cx == nx:
        return 90
    if cy == ny:
        return 0
    if ny > cy:
        return -45
    if ny < cy:
        return 45


def render_metro_line(l):
    """ Draw one route at a time. Mark stations and junctions as appropriate"""
    strokeWeight(8)
    num_stn = len(lines[l])

    mark_terminal_node(l, lines[l][0], 0)
    mark_terminal_node(l, lines[l][-1], 1)

    # print('line', l, num_stn, lines[l])
    for snum in range(num_stn - 1):
        cx, cy = lines[l][snum]
        nx, ny = lines[l][snum + 1]
        stroke(*colors[l])

        xadj, yadj = 0, 0

        # check if coords need adjusting due to segments carrying multiple lines
        sa, sb = get_sorted_seg(cx, cy, nx, ny)

        if segments[(sa, sb)]["numtracks"] == 2:
            pos = segments[(sa, sb)]["lines"].index(l)  # index among all the routes

            if segments[(sa, sb)]["dir"] == 90:  # vertical segment
                if pos == 0:
                    xadj, yadj = -4, 0
                if pos == 1:
                    xadj, yadj = 4, 0
            if segments[(sa, sb)]["dir"] == 0:  # horizontal segment
                if pos == 0:
                    xadj, yadj = 0, -4
                if pos == 1:
                    xadj, yadj = 0, 4
            if segments[(sa, sb)]["dir"] == -45:  # Backslash segment
                if pos == 0:
                    xadj, yadj = -6, 0
                if pos == 1:
                    xadj, yadj = 4, 0

            if segments[(sa, sb)]["dir"] == 45:  # Forward segment
                if pos == 0:
                    xadj, yadj = -4, -2
                if pos == 1:
                    xadj, yadj = 4, 2

        # THREE TRACKS going through a station.
        if segments[(sa, sb)]["numtracks"] == 3:
            pos = segments[(sa, sb)]["lines"].index(l)  # index among all the routes

            if segments[(sa, sb)]["dir"] == 90:  # vertical segment
                if pos == 0:
                    xadj, yadj = -8, 0
                if pos == 1:
                    xadj, yadj = 0, 0
                if pos == 2:
                    xadj, yadj = 8, 0

            if segments[(sa, sb)]["dir"] == 0:  # horizontal segment
                if pos == 0:
                    xadj, yadj = 0, -8
                if pos == 1:
                    xadj, yadj = 0, 0
                if pos == 2:
                    xadj, yadj = 0, 8
            if segments[(sa, sb)]["dir"] == -45:  # Backslash segment
                if pos == 0:
                    xadj, yadj = -10, 2
                if pos == 1:
                    xadj, yadj = 0, 0
                if pos == 2:
                    xadj, yadj = +10, 2

            if segments[(sa, sb)]["dir"] == 45:  # Forward segment
                if pos == 0:
                    xadj, yadj = -8, -2
                if pos == 1:
                    xadj, yadj = 0, 0
                if pos == 2:
                    xadj, yadj = +8, 2

        line(xcoord(cx) + xadj, ycoord(cy) + yadj, xcoord(nx) + xadj, ycoord(ny) + yadj)

        # mark the stations for this line
        if num_tracks[(cx, cy)] == 1:
            fill(*colors[l])
            ellipse(xcoord(cx), ycoord(cy), stn_size, stn_size)
        # render the Junctions for this line
        elif num_tracks[(cx, cy)] > 1:
            fill(255, 255, 255)
            noStroke()
            ellipse(xcoord(cx), ycoord(cy), stn_size * 3, stn_size * 2)


def get_clock_dir(prev_node, curr_node):

    if prev_node == (-1, -1):
        return -1
    xdiff, ydiff = get_dist(prev_node, curr_node)
    # print(xdiff, ydiff, 'prev', prev_node, 'curr', curr_node)
    if xdiff > 0 and ydiff > 0:
        return 4  # sloped but downward pointing
    if xdiff > 0 and ydiff < 0:
        return 1  # slope upward pointing
    if xdiff > 0 and ydiff == 0:
        return 3
    if xdiff == 0 and ydiff > 0:
        return 6
    if xdiff == 0 and ydiff < 0:
        return 0

    return -1  # something is not right.


def create_route(route_num, so, sd):
    global lines, num_tracks, segments

    curr_node = so
    prev_node = (-1, -1)
    cx, cy = so
    lines[route_num] = [(cx, cy)]
    num_tracks[(cx, cy)] += 1

    while curr_node != sd:
        nx, ny = get_next_node(curr_node, sd)
        lines[route_num].append((nx, ny))

        # Adding routes to Segments. This helps catch overlaps
        lseg = get_sorted_seg(cx, cy, nx, ny)
        if (lseg) in segments:
            segments[lseg]["lines"].append(route_num)
            segments[lseg]["numtracks"] += 1
            segments[lseg]["start"].append(
                (route_num, get_clock_dir(prev_node, curr_node))
            )

        else:
            segments[lseg] = {}  # new segment found. Let's record its characteristics
            segments[lseg]["numtracks"] = 1
            segments[lseg]["lines"] = [route_num]
            segments[lseg]["dir"] = get_seg_orientation(lseg)
            segments[lseg]["start"] = [(route_num, get_clock_dir(prev_node, curr_node))]

        num_tracks[(nx, ny)] += 1
        # stroke(*colors[next_available])
        # strokeWeight(8)
        # line(xcoord(cx), ycoord(cy), xcoord(nx), ycoord(ny))
        prev_node = curr_node  # store the previous
        curr_node = (nx, ny)
        cx, cy = curr_node

    line_length = len(lines[route_num])
    # prev_stn = (-1, -1)
    for stn in range(line_length - 2):
        curr_seg_start = lines[route_num][stn]
        curr_seg_end = lines[route_num][stn + 1]
        next_stn = lines[route_num][stn + 2]

        curr_seg = get_sorted_seg(
            curr_seg_start[0], curr_seg_start[1], curr_seg_end[0], curr_seg_end[1]
        )
        next_seg = get_sorted_seg(
            curr_seg_end[0], curr_seg_end[1], next_stn[0], next_stn[1]
        )
        print(curr_seg, "next seg", next_seg)
        if "end" in segments[curr_seg]:
            segments[curr_seg]["end"].append(
                (route_num, get_clock_dir(next_seg[0], next_seg[1]))
            )
        else:
            # print('seg end', route_num, curr_stn, 'next_stn', next_stn, get_clock_dir(curr_stn, next_stn))
            segments[curr_seg]["end"] = [
                (route_num, get_clock_dir(next_seg[0], next_seg[1]))
            ]

    # The TERMINAL segment should get an "end" of -1
    if "end" in segments[next_seg]:
        segments[next_seg]["end"].append((route_num, -1))
    else:
        # print('seg end', route_num, curr_stn, 'next_stn', next_stn, get_clock_dir(curr_stn, next_stn))
        segments[next_seg]["end"] = [(route_num, -1)]


station_d = {}  # key is station (xy). value
lines = {}  # key is Line Number. Values = list of stations
num_tracks = (
    {}
)  # key is station. Keeps track of how many routes go through each station
segments = {}  # k: segments, v: list of Lines
num_lines = 9
border = 25


def setup():
    global next_available, station_d, lines, num_tracks, segments

    size(1000, 900)
    background(250)
    fill(170)
    rect(border, border, width - 2 * border, height - 2 * border)
    create_hex_grid(margin)

    for route_num in range(num_lines):

        so, sd = pick_orig_dest(num_rows, num_cols)

        create_route(route_num, so, sd)

    for route_num in range(num_lines):
        # Draw the line, stations, and junctions
        render_metro_line(route_num)

    print("Overlapping Segs")
    for k, d in segments.items():
        if len(d["lines"]) > 1:
            print(k, d, d["dir"])


def draw():
    pass
