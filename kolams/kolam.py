from dots import GridPattern, get_random_kolam_pattern

w, h = 1000, 1000
points = GridPattern(dot_pattern="square", num_seq=[6, 3])


def setup():
    size(w, h)
    background(0)

    jn = points.jns[-1]


#    print(jn.posx, jn.posy)

dots_in_quarter = 9
kolam_pattern = get_random_kolam_pattern(dots_in_quarter)


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

