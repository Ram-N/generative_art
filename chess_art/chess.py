from grid import Grid
from constants import *


def get_pgns(full_pgn):
    pgns = full_pgn.split()
    return [p for p in pgns if not "." in p]


def pick_one(_lst):
    """ randomly picks one from a list of items """
    return _lst[int(random(len(_lst)))]


def get_cell(name, cells):
    """ Given a square name, return the cell object from the list of cells"""
    if len(name) != 2 or (name[0] not in LETTERS) or (int(name[1]) not in range(1, 9)):
        print("wrong cell coordinates. Must be in [a1, h8]")
        return None

    ypos = 8 - int(name[1])
    xpos = LD[name[0]]
    pos = xpos * 8 + ypos
    return cells[pos]


def create_capture_dict(pgn):
    pgns = pgn.split()

    capture_dict = {}

    for ply in pgns:
        if "x" in ply:
            if "+" in ply:
                sq = ply[-3:-1]
            else:
                sq = ply[-2:]

            if sq in capture_dict:
                capture_dict[sq] += 1
            else:
                capture_dict[sq] = 1

    return capture_dict


def parse_pgn_ply(pgn):
    """ return Piece and Capture_flag """

    move = pgn.split(".")[-1]
    flag = "x" in move
    # print(move, flag)
    p = "N"
    return (p, flag)


def color_square(ply, move, cells):
    """ Idea is to color the square darker for increasing ply of Black moves.
        Lighter for incr ply of White moves.
    """
    _from, _to = get_cell(move[:2], cells), get_cell(move[2:], cells)
    black = ply % 2
    if black:
        color = max(0, 100 - ply)
    else:
        color = min(255, 150 + ply)
    _to.render(fc=color)


def render_move(
    piece, play_color, _fromsq, _tosq, cells, _color, wt_base=1, wt_piece=1
):

    move_color = "#030303" if play_color == "BLACK" else "#C0C0C0"

    st, end = get_cell(_fromsq, cells), get_cell(_tosq, cells)
    if overlap:  # All pieces go through center
        stx, sty = st.centerx, st.centery
        endx, endy = (end.centerx, end.centery)
    else:
        stx, sty = (
            st.centerx + piece_adj[play_color][piece][0] * ADJUST_PIXELS,
            st.centery + piece_adj[play_color][piece][1] * ADJUST_PIXELS,
        )
        endx, endy = (
            end.centerx + piece_adj[play_color][piece][0] * ADJUST_PIXELS,
            end.centery + piece_adj[play_color][piece][1] * ADJUST_PIXELS,
        )

    if jitter_flag:
        stx, sty = (
            st.centerx + pick_one(jitter) * 10,
            st.centery + pick_one(jitter) * 10,
        )
        endx, endy = (
            end.centerx + pick_one(jitter) * 10,
            end.centery + pick_one(jitter) * 10,
        )

    # draw a base
    stroke(move_color)
    strokeWeight(wt_base)
    line(stx, sty, endx, endy)

    stroke(_color)
    strokeWeight(wt_piece)
    line(stx, sty, endx, endy)

    strokeWeight(1)  # reset
    stroke(0)  # reset


def show_move2(move, pgn, cells, _color=None, wt=1):

    if len(move) != 4:
        print("Unable to follow Move coordinates. Must be in [a1, h8]")
        return None

    ply_characterists = parse_pgn_ply(pgn)

    st, end = get_cell(move[:2], cells), get_cell(move[2:], cells)
    strokeWeight(5)
    if _color:
        stroke(_color)
    line(st.centerx, st.centery, end.centerx, end.centery)
    strokeWeight(1)  # reset
    stroke(0)  # reset


def show_captures(uci_move, pgn_move, capture_d, cells):

    if "x" in pgn_move:
        if "+" in pgn_move:
            sq = pgn_move[-3:-1]
        else:
            sq = pgn_move[-2:]

        c = get_cell(sq, cells)
        num_caps = capture_d[sq]
        stroke(CAPTURE_PALETTE[num_caps])
        noFill()
        strokeWeight(5)
        rect(c.x, c.y, c.w, c.h)
        strokeWeight(1)  # reset
        stroke(0)  # reset


def get_piece_paths(ply, move, pgn_ply, cells, curr_pos, piece_paths):
    # find the color (W or B), if a piece then update its position...

    pgn_ply = pgn_ply.split(".")[-1]

    if pgn_ply == "O-O":
        black = ply % 2
        _from, _to = move[:2], move[2:]
        if black:
            curr_pos["BLACK"]["K"] = "g8"
            curr_pos["BLACK"]["R2"] = "f8"
            piece_paths["BLACK"]["K"].append((ply, "g8"))
            piece_paths["BLACK"]["R2"].append((ply, "f8"))

        else:
            curr_pos["WHITE"]["K"] = "g1"
            curr_pos["WHITE"]["R2"] = "f1"
            piece_paths["WHITE"]["K"].append((ply, "g1"))
            piece_paths["WHITE"]["R2"].append((ply, "f1"))

        return piece_paths, curr_pos

    if pgn_ply[0] in list("KQRBN"):  # piece play
        black = ply % 2
        _from, _to = move[:2], move[2:]
        piece = pgn_ply[0]
        capture_flag = "x" in pgn_ply
        if piece in list("RBN"):
            p1, p2 = piece + "1", piece + "2"
        else:  # KQ
            p1, p2 = piece, piece
        if black:
            play_color = "BLACK"
            opp_color = "WHITE"
        else:
            play_color = "WHITE"
            opp_color = "BLACK"

        # update curr_pos to reflect the move
        if curr_pos[play_color][p1] == _from:
            curr_pos[play_color][p1] = _to
            piece_paths[play_color][p1].append((ply, _to))
        elif curr_pos[play_color][p2] == _from:
            curr_pos[play_color][p2] = _to
            piece_paths[play_color][p2].append((ply, _to))
        else:
            print(curr_pos[play_color])
            print("move", pgn_ply, move, ply, "not found")

        if capture_flag:
            curr_pos = update_current_position_for_capture(curr_pos, opp_color, _to)

    return piece_paths, curr_pos


def update_current_position_for_capture(curr_pos, opp_color, _to):
    """Find which piece is in the captured square and remove it"""

    for p in curr_pos[opp_color].keys():
        if curr_pos[opp_color][p] == _to:
            curr_pos[opp_color][p] = "--"  # captured
            return curr_pos

    return curr_pos


full_uci = """d2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 f8b4 e2e3 e8g8 f1d3 c7c5 e1g1 b8c6 a2a3 b4a5 
c3e2 d5c4 d3c4 a5b6 d4c5 d8d1 f1d1 b6c5 b2b4 c5e7 c1b2 c8d7 a1c1 f8d8 e2d4 c6d4 f3d4 
d7a4 c4b3 a4b3 d4b3 d8d1 c1d1 a8c8 g1f1 g8f8 f1e2 f6e4 d1c1 c8c1 b2c1 f7f6 b3a5 e4d6 
e2d3 e7d8 a5c4 d8c7 c4d6 c7d6 b4b5 d6h2 g2g3 h7h5 d3e2 h5h4 e2f3 f8e7 f3g2 h4g3 f2g3 
h2g3 g2g3 e7d6 a3a4 d6d5 c1a3 d5e4 a3c5 a7a6 b5b6 f6f5 g3h4 f5f4 e3f4 e4f4 h4h5 f4f5 
c5e3 f5e4 e3f2 e4f5 f2h4 e6e5 h4g5 e5e4 g5e3 f5f6 h5g4 f6e5 g4g5 e5d5 g5f5 a6a5 e3f2 
g7g5 f5g5 d5c4 g5f5 c4b4 f5e4 b4a4"""


full_pgn = """1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Nc3 Bb4 5. e3 O-O 6. Bd3 c5
7. O-O Nc6 8. a3 Ba5 9. Ne2 dxc4 10. Bxc4 Bb6 11. dxc5 Qxd1
12. Rxd1 Bxc5 13. b4 Be7 14. Bb2 Bd7 15. Rac1 Rfd8 16. Ned4
Nxd4 17. Nxd4 Ba4 18. Bb3 Bxb3 19. Nxb3 Rxd1+ 20. Rxd1 Rc8
21. Kf1 Kf8 22. Ke2 Ne4 23. Rc1 Rxc1 24. Bxc1 f6 25. Na5 Nd6
26. Kd3 Bd8 27. Nc4 Bc7 28. Nxd6 Bxd6 29. b5 Bxh2 30. g3 h5
31. Ke2 h4 32. Kf3 Ke7 33. Kg2 hxg3 34. fxg3 Bxg3 35. Kxg3 Kd6
36. a4 Kd5 37. Ba3 Ke4 38. Bc5 a6 39. b6 f5 40. Kh4 f4
41. exf4 Kxf4 42. Kh5 Kf5 43. Be3 Ke4 44. Bf2 Kf5 45. Bh4 e5
46. Bg5 e4 47. Be3 Kf6 48. Kg4 Ke5 49. Kg5 Kd5 50. Kf5 a5
51. Bf2 g5 52. Kxg5 Kc4 53. Kf5 Kb4 54. Kxe4 Kxa4 55. Kd5 Kb5
56. Kd6 1-0"""


DEBUG = False


def setup():
    size(108 * 8 + 20, 108 * 8 + 20)

    grid = Grid(8, 8, _cell_gutter=0)
    # print(grid)
    grid.render_margin(127)
    grid.render_grid(127)
    cells = grid.cells

    curr_pos = {
        "WHITE": {
            "R1": "a1",
            "N1": "b1",
            "B1": "c1",
            "Q": "d1",
            "K": "e1",
            "B2": "f1",
            "N2": "g1",
            "R2": "h1",
        },
        "BLACK": {
            "R1": "a8",
            "N1": "b8",
            "B1": "c8",
            "Q": "d8",
            "K": "e8",
            "B2": "f8",
            "N2": "g8",
            "R2": "h8",
        },
    }

    piece_paths = {
        "WHITE": {
            "R1": [(0, "a1")],
            "N1": [(0, "b1")],
            "B1": [(0, "c1")],
            "Q": [(0, "d1")],
            "K": [(0, "e1")],
            "B2": [(0, "f1")],
            "N2": [(0, "g1")],
            "R2": [(0, "h1")],
        },
        "BLACK": {
            "R1": [(0, "a8")],
            "N1": [(0, "b8")],
            "B1": [(0, "c8")],
            "Q": [(0, "d8")],
            "K": [(0, "e8")],
            "B2": [(0, "f8")],
            "N2": [(0, "g8")],
            "R2": [(0, "h8")],
        },
    }

    if 0:
        for cc in capture_d.keys():
            c = get_cell(cc, cells)
            c.render(fc="#FF0FF")

    capture_d = create_capture_dict(full_pgn)
    # print(capture_d)

    moves = full_uci.split()  # UCI
    pgns = get_pgns(full_pgn)
    # update current position of pieces
    # Get piece paths
    for ply, move in enumerate(moves):
        piece_paths, curr_pos = get_piece_paths(
            ply, move, pgns[ply], cells, curr_pos, piece_paths
        )

    print("final position")
    print(curr_pos["WHITE"])
    print(curr_pos["BLACK"])

    if DEBUG:
        for p in piece_paths["WHITE"].keys():
            print(p, piece_paths["WHITE"][p])

        for p in piece_paths["BLACK"].keys():
            print(p, piece_paths["BLACK"][p])

    if COLOR_SQUARE:
        for ply, move in enumerate(moves):
            color_square(ply, move, cells)  # color the _to square

    for ply, move in enumerate(moves):
        # Shown as Colored Square Outlines
        show_captures(move, pgns[ply], capture_d, cells)

    for play_color in ["WHITE", "BLACK"]:
        for piece in piece_paths[play_color].keys():
            for idx, motion in enumerate(piece_paths[play_color][piece][:-1]):
                _fromsq, _tosq = motion[1], piece_paths[play_color][piece][idx + 1][1]
                _color = PIECE_COLOR[piece]
                render_move(
                    piece,
                    play_color,
                    _fromsq,
                    _tosq,
                    cells,
                    _color,
                    wt_base=11,
                    wt_piece=5,
                )

        # print()

    print(len(moves), len(pgns))

    # saveFrame("images/ver7_piece_adj.png")


def draw():
    pass

