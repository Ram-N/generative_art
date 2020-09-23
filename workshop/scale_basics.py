def setup():
    size(900, 900)
    strokeWeight(3)
    translate(width / 2, height / 2)

    line(50, 50, 200, 50)
    line(200, 50, 200, 200)
    line(200, 200, 50, 50)

    scale(1, -1)
    line(50, 50, 200, 50)
    line(200, 50, 200, 200)
    line(200, 200, 50, 50)

    # rotate(PI / 2)
    # for i in range(3):
    #     line(0, 0, 200, 0)
    #     line(200, 0, 200, 200)
    #     line(200, 200, 0, 0)

    # scale(-1)
    # # rotate(PI / 4)
    # for i in range(3):
    #     line(0, 0, 200, 0)
    #     line(200, 0, 200, 200)
    #     line(200, 200, 0, 0)

