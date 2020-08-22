# https://github.com/erdavids/Mondrian-Tiles

w, h = 1000, 1000
subdivisions = 500

# Not too small
min_diff = 80

# Space between quads
sep = 7

# Piet Mondrian Color Palette
MOND_WHITE = (223, 224, 236)
MOND_RED = (162, 45, 40)
MOND_BLUE = (38, 71, 124)
MOND_YELLOW = (240, 217, 92)

colors = [
    MOND_BLUE,
    MOND_RED,
    MOND_YELLOW,
    MOND_WHITE,
    MOND_WHITE,
    MOND_WHITE,
    MOND_WHITE,
    MOND_WHITE,
]

# Subdivision adjustment
splits = [0.5, 1, 1.5]

# Canvas Border
margin = 10


def choose_one(listname):
    l = len(listname)
    if l:
        return listname[int(random(l))]
    else:
        return []


def setup():
    size(w, h)
    # pixelDensity(2)

    background(255)

    # In the Quads, the coords of the 4-corners of a rectangle are stored.

    quads = []
    # Add the initial rectangle. This is the largest Rectangle possible.
    quads.append(
        [
            (margin, margin),
            (w - margin, margin),
            (w - margin, h - margin),
            (margin, h - margin),
        ]
    )

    # Start splitting things up
    for _ in range(subdivisions):
        q_index = int(random(len(quads)))
        q = quads[q_index]
        q_lx = q[0][0]
        q_rx = q[1][0]
        q_ty = q[0][1]
        q_by = q[2][1]

        s = choose_one(splits)  # choose one of the splits randomly
        if random(1) < 0.5:
            if (q_rx - q_lx) > min_diff:
                # Get new shapes x value (y is same)
                x_split = (q_rx - q_lx) / 2 * s + q_lx

                quads.pop(q_index)
                quads.append(
                    [
                        (q_lx, q_ty),
                        (x_split - sep, q_ty),
                        (x_split - sep, q_by),
                        (q_lx, q_by),
                    ]
                )
                quads.append(
                    [
                        (x_split + sep, q_ty),
                        (q_rx, q_ty),
                        (q_rx, q_by),
                        (x_split + sep, q_by),
                    ]
                )

        else:
            if (q_by - q_ty) > min_diff:
                y_split = (q_by - q_ty) / 2 * s + q_ty

                quads.pop(q_index)
                quads.append(
                    [
                        (q_lx, q_ty),
                        (q_rx, q_ty),
                        (q_rx, y_split - sep),
                        (q_lx, y_split - sep),
                    ]
                )
                quads.append(
                    [
                        (q_lx, y_split + sep),
                        (q_rx, y_split + sep),
                        (q_rx, q_by),
                        (q_lx, q_by),
                    ]
                )

    stroke(0)
    strokeWeight(2)
    for q in quads:
        fill(*choose_one(colors))
        beginShape()
        for p in q:
            vertex(p)
        endShape(CLOSE)


#    save("Examples/Classic/" + str(int(random(10000))) + ".png")
