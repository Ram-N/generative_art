"""

Decon and new ideas based on work by:
aa_debdeb
https://www.openprocessing.org/sketch/1045966


Goals: First draw a static ICO
2. Rotate it
3. Subdivide Triangles
"""

palette = [
    "#FE4019",
    "#0B85CF",
    "#FF5FB9",
    "#36225E",
    "#ffffff",
    "#FFA900",
    "#2ec4b6",
    "#e71d36",
]

phi = (1 + sqrt(5)) / 2.0
radius = sqrt(sq(1) + sq(phi))

# From wikipedia: coordinates are (0,±1,±ϕ), (±ϕ,0,±1), (±1,±ϕ,0)
v = [
    (0, 1, phi),  # 0 mid down front
    (0, -1, phi),  # 1 mid up front
    (0, 1, -phi),  # 2 mid down back
    (0, -1, -phi),  # 3 mid up back
    (phi, 0, 1),  # 4 right center front
    (phi, 0, -1),  # 5 right center back
    (-phi, 0, 1),  # 6 left center front
    (-phi, 0, -1),  # 7 left center back
    (1, phi, 0),  # 8 right down flat
    (1, -phi, 0),  # 9 right up flat
    (-1, phi, 0),  # 10 left down flat
    (-1, -phi, 0),  # 11 left up flat
]

tvs = [
    (11, 9, 1),
    (11, 9, 3),
    (9, 1, 4),
    (9, 3, 5),
    (11, 1, 6),
    (11, 3, 7),
    (11, 6, 7),
    (9, 4, 5),
    (1, 0, 6),
    (1, 0, 4),
    (10, 8, 0),
    (10, 8, 2),
    (8, 0, 4),
    (8, 2, 5),
    (10, 0, 6),
    (10, 2, 7),
    (10, 6, 7),
    (8, 4, 5),
    (3, 2, 7),
    (3, 2, 5),
]


w, h = 400, 400
margin = 20
_scale = 100

TWO_PHI = 2 * phi * _scale
PHI = phi * _scale

col_ints = [int(random(len(palette))) for _ in range(20)]


def setup():
    size(w, h, P3D)


def draw():
    background(255)
    fill(127)
    rect(margin, margin, w - 2 * margin, h - 2 * margin)

    translate(width / 2, height / 2, 0)
    rotateX(0.01 * frameCount)
    rotateY(0.01 * frameCount)

    fill(palette[0])
    ellipse(0, 0, 10, 10)

    stroke(10)
    strokeWeight(3)
    i = 0
    for tv in tvs:
        a, b, c = tv
        fill(palette[col_ints[i]])
        x0, y0, z0 = v[a][0] * _scale, v[a][1] * _scale, v[a][2] * _scale
        x1, y1, z1 = v[b][0] * _scale, v[b][1] * _scale, v[b][2] * _scale
        x2, y2, z2 = v[c][0] * _scale, v[c][1] * _scale, v[c][2] * _scale

        beginShape()
        vertex(x0, y0, z0)
        vertex(x1, y1, z1)
        vertex(x2, y2, z2)
        endShape()
        i += 1

