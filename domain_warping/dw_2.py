"""
Two images are produced of identical size, placed side by side.

THe LHS is pure Perlin Noise.
The RHS image is where the domain warping happens.

"""


w, h = 400, 400
margin = 100
noise_scale = 0.1
distortion_strength = 95


# Per: https://gamedev.stackexchange.com/questions/162454/how-to-distort-2d-perlin-noise
def distort(x, y):
    wiggle = 0.03
    return noise(x * wiggle, y * wiggle)


def setup():
    size(2 * (w + margin), (h + 2 * margin))
    for shift in range(2):
        pushMatrix()
        translate(margin + shift * w, margin)
        for x in range(w):
            for y in range(h):
                x_distortion = distortion_strength * distort(x + 23, y + 29)
                y_distortion = distortion_strength * distort(x - 30, y - 41)
                x_distortion *= shift
                y_distortion *= shift  # make it 0 for the LHS
                value = noise(
                    (x + x_distortion) * noise_scale, (y + y_distortion) * noise_scale
                )

                color = map(value, 0, 1, 0, 255)
                stroke(color)
                point(x, y)
        popMatrix()

    fill(0, 100, 200)
    textSize(32)
    text("Perlin", margin + w / 2, h + margin + margin / 2)
    text("DW", margin + w / 2 + w, h + margin + margin / 2)

    saveFrame("images/expt2_perlin_v_dw.png")
