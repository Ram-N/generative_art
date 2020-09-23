LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"]
LD = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7}
REDS = ["#ff0000", "#e50000", "#cc0000", "#b20000", "#990000", "#7f0000"]

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

CAPTURE_PALETTE = REDS
COLOR_SQUARE = False
jitter_flag = False
overlap = False
ADJUST_PIXELS = 10


PIECE_COLOR = {
    "R1": "#006400",
    "N1": "#FF8C00",
    "B1": "#00008B",
    "Q": "#ff00ff",
    "K": "#C49102",  # Dijon yellow
    "B2": "#0066CC",
    "N2": "#FF6600",
    "R2": "#3CB043",
}


jitter = [-2, -1, 0, 1, 2]


piece_adj = {
    "WHITE": {
        "R1": (-1, 1),
        "N1": (-1, -1),
        "B1": (-1, 0),
        "Q": (0, -1),
        "K": (0, 1),
        "B2": (-1, 0),
        "N2": (1, 0),
        "R2": (1, 1),
    },
    "BLACK": {
        "N2": (-1, 1),
        "R1": (1, -1),
        "B1": (1, 0),
        "K": (0, -1),
        "Q": (0, 1),
        "B2": (-1, 0),
        "R2": (-1, -1),
        "N1": (1, 1),
    },
}
