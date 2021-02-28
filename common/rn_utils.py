def pick_one(_lst):
    """ randomly picks one from a list of items """
    return _lst[int(random(len(_lst)))]


def shuffle(_lst):
    n = len(_lst)
    for i in range(0, n - 2):
        j = int(random(i, n))
        _lst[i], _lst[j] = _lst[j], _lst[i]

    return _lst


def display_grid_points(x_margin, y_margin, num_rows, num_cols, sep):

    for row in range(num_rows):
        for col in range(num_cols):
            x = x_margin + sep * col
            y = y_margin + sep * row
            ellipse(x, y, 3, 3)


def keyPressed():
    global show

    if key == "n":
        circles = []
    elif key == "t":  # Toggle
        show = not show

    elif key == CODED and keyCode == CONTROL:
        saveFrame("screenshot.png")
    elif key == ENTER:
        if msg:
            t = Texto(msg)
    elif key == "f":  # freeze
        noLoop()
    elif key == "r":  # resume
        loop()
    elif key == "g":  # inch forward - slo motion
        redraw()


def frange(start, stop=None, step=None):
    # if stop and step argument is None set start=0.0 and step = 1.0
    start = float(start)
    if stop == None:
        stop = start + 0.0
        start = 0.0
    if step == None:
        step = 1.0

    count = 0
    while True:
        temp = float(start + count * step)
        if step > 0 and temp >= stop:
            break
        elif step < 0 and temp <= stop:
            break
        yield temp
        count += 1
