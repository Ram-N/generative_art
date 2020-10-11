w, h = 400, 400
margin = 20
noise_scale = 0.01
distort_x = 0.05
distort_y = 0.27


def setup():
    size(2 * (w + margin), (h + 2 * margin))
    for shift in range(2):
        pushMatrix()
        translate(margin + shift * w, margin)
        for x in range(w):
            for y in range(h):
                distortion = noise(x * distort_x, y * distort_y) * shift
                newx = noise(x * noise_scale + distortion)
                newy = noise(y * noise_scale + distortion)

                color = map(newx + newy, 0, 2, 0, 255)
                stroke(color)
                point(x, y)
        popMatrix()
    saveFrame("images/expt1_perlin_v_dw.png")
