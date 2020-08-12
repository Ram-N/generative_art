from rn_utils import display_grid_points

w, h = 1050, 850

x_margin, y_margin = 25, 25
num_rows = 20
num_cols = 25
xstep = (w - 2 * x_margin) / num_cols
ystep = (h - 2 * y_margin) / num_rows

# Make a list of all the points
points = []

for row in range(num_rows):
    for col in range(num_cols):
        x = x_margin + xstep * col
        y = y_margin + ystep * row
        points.append((x, y))


# Let's create a list of all hlines and vlines
hlines, vlines = [], []
hline_neighbors = {}
for row in range(num_rows):
    rowset = []
    for col in range(num_cols - 1):
        x = x_margin + xstep * col
        y = y_margin + ystep * row
        seg = ((x, y), (x + xstep, y))
        rowset.append(seg)
        hline_neighbors[seg] = {}
        if row:  # First row has no Northern neighbors
            hline_neighbors[seg]["N1"] = (x, y - ystep)
            hline_neighbors[seg]["N2"] = (x + xstep, y - ystep)
        if row != num_rows - 1:  # last row cannot have Southern neighbors
            hline_neighbors[seg]["S1"] = (x, y + ystep)
            hline_neighbors[seg]["S2"] = (x + xstep, y + ystep)

    hlines.append(rowset)  # add the entire row

vline_neighbors = {}
for col in range(num_cols):
    colset = []
    for row in range(num_rows - 1):
        x = x_margin + xstep * col
        y = y_margin + ystep * row
        seg = ((x, y), (x, y + ystep))
        colset.append(seg)
        vline_neighbors[seg] = {}
        if col:  # First COL has no Western neighbors
            vline_neighbors[seg]["W1"] = (x - xstep, y)
            vline_neighbors[seg]["W2"] = (x - xstep, y + ystep)
        if col != num_cols - 1:  # last COL cannot have Eastern neighbors
            vline_neighbors[seg]["E1"] = (x + xstep, y)
            vline_neighbors[seg]["E2"] = (x + xstep, y + ystep)
    vlines.append(colset)

# initially they are all unoccupied
occupied = {}
for pt in points:
    occupied[pt] = 0

h_active = {}
for hset in hlines:
    for hseg in hset:
        h_active[hseg] = 0

v_active = {}
for vset in vlines:
    for vseg in vset:
        v_active[vseg] = 0


def render_dashes(hlines, vlines, h_active, v_active):

    for hvset in hlines + vlines:
        for seg in hvset:
            if seg in h_active and h_active[seg]:
                line(seg[0][0], seg[0][1], seg[1][0], seg[1][1])
            if seg in v_active and v_active[seg]:
                line(seg[0][0], seg[0][1], seg[1][0], seg[1][1])


def add_three_takeout_one(occupied, h_active, v_active, hseg, pt1, pt2, direction):

    h_active[(pt1, pt2)] = 1
    h_active[hseg] = 0
    occupied[pt1], occupied[pt2] = 1, 1
    if direction == "N":
        v_active[(pt1, hseg[0])] = 1
        v_active[(pt2, hseg[1])] = 1
    if direction == "S":
        v_active[(hseg[0], pt1)] = 1
        v_active[(hseg[1], pt2)] = 1

    return h_active, v_active


def extend_dashes(occupied, hlines, vlines, h_active, v_active):
    """
        Find an active seg with 2 unoccupied neighbors. Extend into 3 segs, remove current.

    """

    for attempt in range(10):
        row_id = int(random(len(hlines)))
        col_id = int(random(len(hlines[row_id])))
        hseg = hlines[row_id][col_id]
        if h_active[hseg]:
            # try North neighbors
            if "N1" in hline_neighbors[hseg]:
                pt1 = hline_neighbors[hseg]["N1"]
                pt2 = hline_neighbors[hseg]["N2"]
                if not occupied[pt1] and not occupied[pt2]:
                    print(frameCount, "found", hseg)
                    h_active, v_active = add_three_takeout_one(
                        occupied, h_active, v_active, hseg, pt1, pt2, "N"
                    )
                    break
            if "S1" in hline_neighbors[hseg]:
                pt1 = hline_neighbors[hseg]["S1"]
                pt2 = hline_neighbors[hseg]["S2"]
                if not occupied[pt1] and not occupied[pt2]:
                    print(frameCount, "found", hseg)
                    h_active, v_active = add_three_takeout_one(
                        occupied, h_active, v_active, hseg, pt1, pt2, "S"
                    )
                    break
    return h_active, v_active


def setup():
    global occupied
    size(w, h)
    background(128)
    display_grid_points(
        x_margin, y_margin, num_rows, num_cols, xstep=xstep, ystep=ystep
    )

    # Activate the first and last hline sets. Mark occupied points
    for hseg in hlines[0] + hlines[-1]:
        h_active[hseg] = 1
        occupied[hseg[0]] = 1
        occupied[hseg[1]] = 1

    for vseg in vlines[0] + vlines[-1]:
        v_active[vseg] = 1
        occupied[vseg[0]] = 1
        occupied[vseg[1]] = 1

    # print(occupied[:10])
    # print(points[:10])
    # print(vlines[-1], vlines[1])
    # print(hlines[-1:], hlines[:1])
    # print(hline_neighbors[hlines[73][0]])
    # print(vlines[7][7], vline_neighbors[vlines[7][7]])


def draw():
    global occupied, hlines, h_active, vlines, v_active
    background(128)
    stroke(0)
    strokeWeight(3)
    render_dashes(hlines, vlines, h_active, v_active)
    h_active, v_active = extend_dashes(occupied, hlines, vlines, h_active, v_active)

    if frameCount > 800:
        noLoop()
