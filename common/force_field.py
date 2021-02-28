scale = 0.008  # scale of the noise
step_size = 5  # how fast the particles move
offset = 100  # offset in the noise input to get a different x & y velocities


def update_radial(p, bidirection):
    x, y = p.x, p.y  # current position
    theta_perturb = noise(scale * x, scale * y) - bidirection
    perturb = noise(p.offset + scale * x, p.offset + scale * y) - bidirection
    p.theta += theta_perturb
    eps = step_size  # * perturb
    dx = eps * cos(p.theta)
    dy = eps * sin(p.theta)
    p.x += dx
    p.y += dy


def update_path(p, bidirection):
    x, y = p.x, p.y  # current position
    x_perturb = noise(scale * x, scale * y) - bidirection
    y_perturb = noise(p.offset + scale * x, p.offset + scale * y) - bidirection
    dx = step_size * x_perturb
    dy = step_size * y_perturb
    # p gets displaced slightly. Store its new location
    p.x += dx
    p.y -= dy


def render_path(particles, w, h, particles_margin, canvas_margin, bidirection):

    strokeWeight(3)

    for p in particles:
        cnum = max(160, (10 * (p.row + 1)) % 255)
        stroke(cnum)
        # stroke((10 * p.row) % 255, (10 * p.row) % 255, (10 * p.row) % 255)
        # stroke((50 + 10 * p.row) % 255, p.id % 255, (50 + 10 * p.column) % 255)
        # stroke((50 + 10 * p.row) % 255, p.id % 255, max((255 - p.id) % 255, 0))
        # stroke(50, 150, 100)
        strokeWeight(1)
        if p.active:
            x, y = p.x, p.y  # current position
            #            update_path(p, bidirection)
            update_radial(p, bidirection)

            line(x, y, p.x, p.y)
            if out_of_bounds(p, w, h, particles_margin, canvas_margin):
                p.active = False
            # else:  # draw a tiny line from prev position to updated position
            #     line(x, y, p.x, p.y)


def out_of_bounds(p, w, h, margin, canvas_margin):
    """ 1 if the particle is still within bounds. 0 if it has exceeded """
    if p.x <= canvas_margin + margin or p.x > canvas_margin + w - margin:
        print(p.x, margin, w, "X reached")
        return 1

    if p.y <= canvas_margin + margin or p.y > canvas_margin + h - margin:
        print(p.y, margin, h, "Y reached")
        return 1
    return 0


rows = 20
cols = 20


def create_grid_of_particles(rows, cols, w, h, particles_margin):
    """

    how many rows and cols of particles?
    w and h are the working area for the grid of particles.
    """

    ystep = (h - 2 * particles_margin) / rows
    xstep = (w - 2 * particles_margin) / cols

    xstart = particles_margin + xstep / 2
    ystart = particles_margin + ystep / 2

    particles = []
    for row in range(rows):
        for col in range(cols):
            xPos = xstart + xstep * col  # starting xposition
            yPos = ystart + ystep * row  # starting yposition
            p = PVector(xPos, yPos)
            p.row, p.column = row, col
            p.active = True
            p.id = row * cols + col
            # if particles in a set have different offsets, the paths will cross
            p.offset = offset  # + random(100)
            particles.append(p)

    return particles


def render_xy_particle(
    x, y, _theta, _id=0, w=400, h=400, particles_margin=0, canvas_margin=30
):

    p = PVector(x, y)
    p.theta = _theta
    p.row, p.column = 0, 0
    p.active = True
    p.id = _id
    # if particles in a set have different offsets, the paths will cross
    p.offset = offset  # + random(100)

    particles = [p]

    bidirection = 0.5
    for i in range(800):
        render_path(particles, w, h, particles_margin, canvas_margin, bidirection)


def render_particles_in_grid(rows, cols, w, h, particles_margin=0, canvas_margin=30):

    particles = create_grid_of_particles(
        rows, cols, w, h, particles_margin=particles_margin
    )

    print(particles_margin)
    print(particles)
    bidirection = 0  # 0.5
    for i in range(800):
        render_path(particles, w, h, particles_margin, canvas_margin, bidirection)

