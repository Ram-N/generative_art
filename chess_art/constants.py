from colors import *

LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"]
LD = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7}
REDS = [
    "#ff0000",
    "#e50000",
    "#cc0000",
    "#b20000",
    "#990000",
    "#7f0000",
    "#ff0000",
    "#e50000",
    "#cc0000",
    "#b20000",
    "#990000",
    "#7f0000",
]
PRINT_PIECE_PATH = True
jitter = [-2, -1, 0, 1, 2]
CAPTURE_PALETTE = REDS
COLOR_SQUARE = False
jitter_flag = False
overlap = False
ADJUST_PIXELS = 20

YELLOWS = [
    "#ffff05",
    "#ffff0f",
    "#ffff14",
    "#ffff1f",
    "#ffff29",
    "#ffff2e",
    "#ffff38",
    "#ffff42",
    "#ffff47",
    "#ffff52",
    "#ffff5c",
    "#ffff61",
]


PIECE_COLOR = {
    "WHITE": {
        "R1": GREENS,
        "N1": ORANGES,
        "B1": BLUES,
        "R2": GREENS,
        "N2": ORANGES,
        "B2": BLUES,
        "Q": "#ff00ff",
        "K": "#CECECE",
    },
    "BLACK": {
        "R1": GREENS,
        "N1": ORANGES,
        "B1": BLUES,
        "R2": GREENS,
        "N2": ORANGES,
        "B2": BLUES,
        "Q": "#ff00ff",
        "K": "#A00301",
    },
}


piece_adj = {
    "WHITE": {
        "B1": (0, 0),
        "N1": (-2, -1),
        "R1": (2, 1),
        "Q": (1, -2),
        "K": (-1, 2),
        "R2": (2, 1),
        "N2": (-2, -1),
        "B2": (0, 0),
    },
    "BLACK": {
        "N2": (2, -1),
        "B1": (0, 0),
        "R1": (2, -1),
        "K": (-1, -2),
        "Q": (1, 2),
        "R2": (2, -1),
        "B2": (0, 0),
        "N1": (2, -1),
    },
}
