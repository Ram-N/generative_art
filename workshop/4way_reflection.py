colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]
reflections = [(1.0, 1.0), (1.0, -1.0), (-1.0, 1.0), (-1.0, -1.0)]

NUM_TILES = 10
TS = 40


def generate_seq_random_numbers():
    col_seq = []
    rot_seq = []
    for x in range(NUM_TILES):
        for y in range(NUM_TILES):
            col_seq.append(colors[int(random(6))])
            rot_seq.append(int(random(4)) * PI / 2)

    return col_seq, rot_seq


def layer(col_seq, rot_seq):
    for x in range(NUM_TILES):
        for y in range(NUM_TILES):
            idx = x * NUM_TILES + y
            # clr = colors[int(random(6))]
            fill(col_seq[idx])
            cx = x * TS + TS / 2
            cy = y * TS + TS / 2
            pushMatrix()
            translate(cx, cy)
            angle = rot_seq[idx]
            rotate(angle)
            arc(TS / 2, TS / 2, 2 * TS, 2 * TS, PI, 3 * PI / 2)
            popMatrix()


def setup():
    size(900, 900)
    strokeWeight(3)
    col_seq, rot_seq = generate_seq_random_numbers()
    translate(width / 2, height / 2)

    for scale_factor in reflections:
        print(scale_factor)
        pushMatrix()
        scale(scale_factor[0], scale_factor[1])
        layer(col_seq, rot_seq)
        popMatrix()
