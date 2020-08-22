"""

This is the third script in a series that uses a "Space Shrinking" Algorithm.
Please be sure to go through 02_space_shrinking.py if you are learning from these scripts.

# The goal for this script: Coloring the Interior Space
Make a "Shape" out of all the points, such that the "shrinking" space can be visualized...
`interior_shape` gets introduced in this script.

Ram Narasimhan
August 2020

"""


from rn_utils import display_grid_points

w, h = 1000, 850

x_margin, y_margin = 50, 50
num_rows = 31
num_cols = 31

# step size can be computed from w and num_rows/num_cols
xstep = (w - 2 * x_margin) / (num_cols - 1)
ystep = (h - 2 * y_margin) / (num_rows - 1)

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


def initialize_interior_shape():

    # Go clockwise. Start from the TOP Horizonta, then the Eastern Vertical Wall
    # the the southern wall, then western wall points
    interior_shape = []
    for seg in hlines[0] + vlines[-1]:
        interior_shape.append(seg[0])
    for seg in hlines[-1][::-1]:
        interior_shape.append(seg[1])
    for seg in vlines[0][::-1]:  # Western Wall
        interior_shape.append(seg[1])

    return interior_shape


def add_three_takeout_one(
    occupied, h_active, v_active, hseg, pt1, pt2, direction, interior_shape
):

    occupied[pt1], occupied[pt2] = 1, 1
    seg0 = interior_shape.index(hseg[0])
    seg1 = interior_shape.index(hseg[1])
    if direction == "N":
        h_active[(pt1, pt2)] = 1
        h_active[hseg] = 0
        v_active[(pt1, hseg[0])] = 1
        v_active[(pt2, hseg[1])] = 1
        interior_shape.insert(seg1 + 1, pt2)
        interior_shape.insert(seg1 + 2, pt1)
    if direction == "S":
        h_active[(pt1, pt2)] = 1
        h_active[hseg] = 0
        v_active[(hseg[0], pt1)] = 1
        v_active[(hseg[1], pt2)] = 1
        interior_shape.insert(seg0 + 1, pt1)
        interior_shape.insert(seg0 + 2, pt2)
    if direction == "W":
        v_active[(pt1, pt2)] = 1
        v_active[hseg] = 0
        h_active[(pt1, hseg[0])] = 1
        h_active[(pt2, hseg[1])] = 1
        interior_shape.insert(seg0 + 1, pt1)
        interior_shape.insert(seg0 + 2, pt2)

    if direction == "E":
        v_active[(pt1, pt2)] = 1
        v_active[hseg] = 0
        h_active[(hseg[0], pt1)] = 1
        h_active[(hseg[1], pt2)] = 1
        interior_shape.insert(seg1 + 1, pt2)
        interior_shape.insert(seg1 + 2, pt1)

    return h_active, v_active


def possible_direction(
    cardinal, seg, hline_neighbors, vline_neighbors, occupied, h_active, v_active
):

    if cardinal == "N":
        if "N1" in hline_neighbors[seg]:
            pt1 = hline_neighbors[seg]["N1"]
            pt2 = hline_neighbors[seg]["N2"]
            if not occupied[pt1] and not occupied[pt2]:
                # print(frameCount, "found", seg)
                h_active, v_active = add_three_takeout_one(
                    occupied, h_active, v_active, seg, pt1, pt2, "N", interior_shape
                )
                return 1  # found

    if cardinal == "S":
        if "S1" in hline_neighbors[seg]:
            pt1 = hline_neighbors[seg]["S1"]
            pt2 = hline_neighbors[seg]["S2"]
            if not occupied[pt1] and not occupied[pt2]:
                # print(frameCount, "found", seg)
                h_active, v_active = add_three_takeout_one(
                    occupied, h_active, v_active, seg, pt1, pt2, "S", interior_shape
                )
                return 1  # found

    if cardinal == "E":
        if "E1" in vline_neighbors[seg]:
            pt1 = vline_neighbors[seg]["E1"]
            pt2 = vline_neighbors[seg]["E2"]
            if not occupied[pt1] and not occupied[pt2]:
                # print(frameCount, "found", seg)
                h_active, v_active = add_three_takeout_one(
                    occupied, h_active, v_active, seg, pt1, pt2, "E", interior_shape
                )
                return 1  # found

    if cardinal == "W":
        if "W1" in vline_neighbors[seg]:
            pt1 = vline_neighbors[seg]["W1"]
            pt2 = vline_neighbors[seg]["W2"]
            if not occupied[pt1] and not occupied[pt2]:
                # print(frameCount, "found", seg)
                h_active, v_active = add_three_takeout_one(
                    occupied, h_active, v_active, seg, pt1, pt2, "W", interior_shape
                )
                return 1  # found


def extend_dashes(occupied, hlines, vlines, h_active, v_active):
    """
        Find an active seg with 2 unoccupied neighbors. Extend into 3 segs, remove current segment.

    """
    change_flag = 0
    for attempt in range(10):
        horiz = 1 if int(random(2)) else 0

        if horiz:
            row_id = int(random(len(hlines)))
            col_id = int(random(len(hlines[row_id])))
            hseg = hlines[row_id][col_id]
            if h_active[hseg]:
                north = 1 if int(random(2)) else 0
                if north:
                    if possible_direction(
                        "N",
                        hseg,
                        hline_neighbors,
                        vline_neighbors,
                        occupied,
                        h_active,
                        v_active,
                    ):
                        change_flag = 1
                        break
                else:
                    if possible_direction(
                        "S",
                        hseg,
                        hline_neighbors,
                        vline_neighbors,
                        occupied,
                        h_active,
                        v_active,
                    ):
                        change_flag = 1
                        break
        else:  # vertical shrinking attempt

            row_id = int(random(len(vlines)))
            col_id = int(random(len(vlines[row_id])))
            vseg = vlines[row_id][col_id]
            if v_active[vseg]:
                east = 1 if int(random(2)) else 0
                if east:
                    if possible_direction(
                        "E",
                        vseg,
                        hline_neighbors,
                        vline_neighbors,
                        occupied,
                        h_active,
                        v_active,
                    ):
                        change_flag = 1
                        break
                else:
                    if possible_direction(
                        "W",
                        vseg,
                        hline_neighbors,
                        vline_neighbors,
                        occupied,
                        h_active,
                        v_active,
                    ):
                        change_flag = 1
                        break

    return h_active, v_active, change_flag


# This is where all the "drawing" happens
def render_dashes(hlines, vlines, h_active, v_active):

    for hvset in hlines + vlines:
        for seg in hvset:
            if (
                seg in h_active and h_active[seg]
            ):  # this segment is activated. So render it
                line(seg[0][0], seg[0][1], seg[1][0], seg[1][1])
            if seg in v_active and v_active[seg]:
                line(seg[0][0], seg[0][1], seg[1][0], seg[1][1])


def render_shape(interior_shape):

    s = createShape()
    s.beginShape()
    s.fill(100, 100, 171)
    s.noStroke()
    for pt in interior_shape:
        s.vertex(*pt)
    s.endShape(CLOSE)

    shape(s, 0, 0)


def setup():
    global occupied, interior_shape
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

    interior_shape = initialize_interior_shape()


changes = []


def draw():
    global occupied, hlines, h_active, vlines, v_active, interior_shape, changes

    background(100)
    stroke(0)
    strokeWeight(3)
    render_dashes(hlines, vlines, h_active, v_active)
    render_shape(interior_shape)
    h_active, v_active, change_flag = extend_dashes(
        occupied, hlines, vlines, h_active, v_active
    )

    changes.append(change_flag)
    if len(changes) >= 100:
        del changes[0]

    print(sum(changes))

    _sum = 0
    for pt in points:
        _sum += occupied[pt]

    if sum(changes) == 0 and frameCount > 100:
        remaining_pts = len(points) - _sum
        print("time to end", remaining_pts)
        noLoop()

        save("images/30x30.png")
