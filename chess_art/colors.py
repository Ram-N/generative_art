_ORANGES = {"R": (230, 191), "G": (80, 186), "B": (0, 0)}  # First is most intense
ORANGES = {"R": (191, 230), "G": (186, 80), "B": (0, 0)}  # Last is most intense
_BLUES = {"R": (18, 3), "G": (0, 150), "B": (230, 192)}  # 0 is most intense
BLUES = {"R": (3, 18), "G": (150, 0), "B": (192, 230)}  # Last is most intense
_GREENS = {"R": (119, 1), "G": (229, 157), "B": (0, 76)}  # 0 is Light Green
GREENS = {"R": (1, 119), "G": (157, 229), "B": (76, 0)}  # Last is Light Green


def get_color_range(color_name, num):

    rgb = [0, 0, 0]
    color_list = []
    # read the dictionary
    for i in range(num):
        for idx, prim in enumerate(["R", "G", "B"]):
            col_range = color_name[prim][1] - color_name[prim][0]
            rgb[idx] = color_name[prim][0] + int(col_range / num / 1.0 * i)
        newcolor = color(rgb[0], rgb[1], rgb[2])
        color_list.append(newcolor)

    return color_list

