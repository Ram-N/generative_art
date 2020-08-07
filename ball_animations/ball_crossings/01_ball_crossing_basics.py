from ball import Ball

# PARAMETERS - Change these
w, h = 800, 800
num_set = 7  # number of balls in the horizontal or vertical set.
speed = 7
####

sep = w / num_set
launch_gap = sep / speed
loffset = int(launch_gap / 2)  # this difference in launch times is what ensures
# that there are no collisions
hballs = [
    Ball(id, 0, h / 2, speed, 0, _launch=id * launch_gap) for id in range(num_set)
]
vballs = [
    Ball(
        id + num_set,
        w / 2,
        h,
        0,
        -speed,
        _launch=loffset + id * launch_gap,
        _colornum=-1,
    )
    for id in range(num_set)
]

balls = hballs + vballs


def setup():
    size(w, h)
    background(127)
    smooth()
    noStroke()


def draw():
    global balls
    background(127)

    for b in balls:
        if frameCount > b.launch:  # okay to launch?
            b.move_warp()
            b.display()

    saveFrame("images/cross_###.jpg")
    if frameCount == 401:
        noLoop()
