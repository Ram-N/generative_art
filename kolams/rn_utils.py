def choose_one(_lst):
    """ randomly picks one from a list of items """
    return _lst[int(random(len(_lst)))]


def keyPressed():
    global show, circles

    if key == "n":  # draw a new pattern
        circles = []
        c0 = Circle(width / 3, height / 2, 20, 0, 0, 0)
        circles.append(c0)
    elif key == "t":  # Toggle
        show = not show

    elif key == CODED and keyCode == CONTROL:
        saveFrame("images/k" + str(int(random(999))) + "_screenshot.png")
    elif key == ENTER:
        if msg:
            t = Texto(msg)
    elif key == "f":  # freeze
        noLoop()
    elif key == "r":  # resume
        loop()
    elif key == "g":  # inch forward - slo motion
        redraw()


def display_grid_points(x_margin, y_margin, num_rows, num_cols, sep):

    for row in range(num_rows):
        for col in range(num_cols):
            x = x_margin + sep * col
            y = y_margin + sep * row
            ellipse(x, y, 3, 3)
