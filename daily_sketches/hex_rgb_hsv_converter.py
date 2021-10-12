# W3: https://www.w3resource.com/python-exercises/math/python-math-exercise-77.php
def old_rgb_to_hsv(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx - mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g - b) / df) + 360) % 360
    elif mx == g:
        h = (60 * ((b - r) / df) + 120) % 360
    elif mx == b:
        h = (60 * ((r - g) / df) + 240) % 360
    if mx == 0:
        s = 0
    else:
        s = (df / mx) * 100
    v = mx * 100
    return h, s, v


# SO: https://stackoverflow.com/a/29643643/918215
def hex_to_rgb(hex):
    h = hex.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


# https://www.geeksforgeeks.org/program-change-rgb-color-model-hsv-color-model/
# Python3 program change RGB Color
# Model to HSV Color Model
def rgb_to_hsv(r, g, b):

    # R, G, B values are divided by 255
    # to change the range from 0..255 to 0..1:
    r, g, b = r / 255.0, g / 255.0, b / 255.0

    # h, s, v = hue, saturation, value
    cmax = max(r, g, b)  # maximum of r, g, b
    cmin = min(r, g, b)  # minimum of r, g, b
    diff = cmax - cmin  # diff of cmax and cmin.

    # if cmax and cmax are equal then h = 0
    if cmax == cmin:
        h = 0

    # if cmax equal r then compute h
    elif cmax == r:
        h = (60 * ((g - b) / diff) + 360) % 360

    # if cmax equal g then compute h
    elif cmax == g:
        h = (60 * ((b - r) / diff) + 120) % 360

    # if cmax equal b then compute h
    elif cmax == b:
        h = (60 * ((r - g) / diff) + 240) % 360

    # if cmax equal zero
    if cmax == 0:
        s = 0
    else:
        s = (diff / cmax) * 100

    # compute v
    v = cmax * 100
    return h, s, v


def main():

    pal = ["#d00000", "#dc2f02", "#e85d04", "#f48c06", "#faa307", "#ffba08"]

    print(f"Hred_orange = [")
    for hx in pal:
        r, g, b = hex_to_rgb(hx)
        h, s, br = rgb_to_hsv(r, g, b)
        print(f"[{h},{s},{br}],")
    print(f"]")


if __name__ == "__main__":
    main()
