from grid import Grid
from constants import *


def get_cell(name, cells):
    """ Given a square name, return the cell object from the list of cells"""
    if len(name) != 2 or (name[0] not in LETTERS) or (int(name[1]) not in range(1, 9)):
        print("wrong cell coordinates. Must be in [a1, h8]")
        return None

    ypos = 8 - int(name[1])
    xpos = LD[name[0]]
    pos = xpos * 8 + ypos
    return cells[pos]


def render_game_result(result, grid):
    if result == 1:
        grid.render_margin(220)
    elif result == 0:
        grid.render_margin(50)
    else:
        grid.render_margin(128)


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


def render_title(_str, pos):
    textSize(16)
    text(_str, pos[0], pos[1])


def render_move(
    piece, play_color, _fromsq, _tosq, cells, piece_color, wt_base=1, wt_piece=1
):

    move_color = "#033303" if play_color == "BLACK" else "#F0F0F0"

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
    stroke(move_color)  # B or W base thicker
    strokeWeight(wt_base)
    line(stx, sty, endx, endy)

    stroke(piece_color)
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
        print(c, sq, cells)
        num_caps = capture_d[sq]
        stroke(CAPTURE_PALETTE[num_caps])
        noFill()
        strokeWeight(5)
        rect(c.x, c.y, c.w, c.h)
        strokeWeight(1)  # reset
        stroke(0)  # reset

