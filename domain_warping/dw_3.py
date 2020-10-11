"""
Two images are produced of identical size, placed side by side.

THe LHS is pure Perlin Noise.
The RHS image is where the domain warping happens
In this expt, we see the imapact of 1 or 2 variables on DW...
1. Distortion strength
"""

w, h = 400, 400
margin = 100
noise_scale = 0.05
distortion_strength = 0


# Per: https://gamedev.stackexchange.com/questions/162454/how-to-distort-2d-perlin-noise
def distort(x, y):
    wiggle = 0.02
    return noise(x * wiggle, y * wiggle)


def domain_warp(x, y, distortion_strength):

    x_distortion = distortion_strength * distort(x + 53, y + 99)
    y_distortion = distortion_strength * distort(x - 30, y - 41)
    dw_value = noise((x + x_distortion) * noise_scale, (y + y_distortion) * noise_scale)

    color = map(dw_value, 0, 1, 0, 255)
    stroke(color)
    point(x, y)


def setup():
    size(2 * (w + margin), (h + 2 * margin))


def draw():
    global distortion_strength

    background(255)
    distortion_strength += 5

    for side in range(2):  # rhs vs lhs
        pushMatrix()
        translate(margin + side * w, margin)
        for x in range(w):
            for y in range(h):
                domain_warp(x, y, distortion_strength * side)
        popMatrix()

    fill(0, 100, 200)
    textSize(32)
    text("Pure Perlin", margin + w / 4, h + margin + margin / 2)
    text(
        "DW Strength:" + str(distortion_strength),
        margin + w / 4 + w,
        h + margin + margin / 2,
    )


#    saveFrame("images/expt2_perlin_v_dw.png")
