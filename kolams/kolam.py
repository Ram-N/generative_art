from dots import GridPattern

w, h = 1000, 1000
points = GridPattern(dot_pattern="square", num_seq=[6, 3])


def setup():
    size(w, h)
    background(0)

    jn = points.jns[-1]


#    print(jn.posx, jn.posy)

kolam_pattern = {
    "cover_size": "narrow",
    "covers": [
        ("1C", "S", "narrow"),
        ("2D", "SW", "narrow"),  # ne is a junction
        ("1C", "E", "narrow"),
        ("1C", "S", "narrow"),
        ("4D", "NE", "blocky"),  # all 4 jns
        ("1C", "N", "blocky"),  # N is a junction
        ("1C", "S", "narrow"),
        ("4D", "SE", "blocky"),
        ("1C", "W", "narrow"),
    ],
}
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
    ellipse(0, 0, 15, 15)
    #    points.render_jns()
    points.render_dots()
    points.render_kolam(kolam_pattern)
    #    points.render_axis()
    noLoop()


#    saveFrame("images/k1.png")

