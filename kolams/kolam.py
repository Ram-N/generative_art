from dots import GridPattern

w, h = 1000, 1000
points = GridPattern(dot_pattern="square", num_seq=[6, 3])


def setup():
    size(w, h)
    background(0)

    jn = points.jns[-1]


#    print(jn.posx, jn.posy)

kolam_pattern = [
    ("1C", "S"),
    ("2D", "SW"),
    ("1C", "E"),
    ("1C", "S"),
    ("4D", "NE"),
    ("1C", "N"),
    ("1C", "S"),
    ("2D", "SE"),
    ("1C", "W"),
]
#     ("4C", "S"),
#     ("4C", "E"),
#     ("4C", "W"),
#     ("4D", "NE"),
#     ("4D", "SW"),
#     ("4D", "NW"),
#     ("4D", "SE"),
# ]


def draw():
    background(0)
    translate(width / 2, height / 2)
    fill(255, 0, 0)
    ellipse(0, 0, 5, 5)
    points.render_jns()
    points.render_dots()
    points.render_kolam(kolam_pattern)
    noLoop()
