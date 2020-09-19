def setup():
    size(400, 400)
    fill(100, 200, 0)

    for y in range(0, 300, 30):
        rect(20, y, 20 + y, 20)
        rect(y + 60, y, 400 - (y + 60), 20)
