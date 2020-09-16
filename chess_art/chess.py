from grid import Grid


LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"]

LD = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7}

REDS = ["#ff0000", "#e50000", "#cc0000", "#b20000", "#990000", "#7f0000"]


def get_cell(name, cells):
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
    print(move, flag)
    p = "N"
    return (p, flag)


def show_move(move, pgn, cells, _color=None, wt=1):

    if len(move) != 4:
        print("Unable to follow Move coordinates. Must be in [a1, h8]")
        return None

    ply_characterists = parse_pgn_ply(pgn)

    st, end = get_cell(move[:2], cells), get_cell(move[2:], cells)
    strokeWeight(3)
    if _color:
        stroke(_color)
    line(st.centerx, st.centery, end.centerx, end.centery)
    strokeWeight(1)  # reset
    stroke(0)  # reset


def show_captures(capture_d, cells):
    for sq in capture_d.keys():
        c = get_cell(sq, cells)
        caps = capture_d[sq]
        stroke(REDS[caps])
        noFill()
        strokeWeight(5)
        rect(c.x, c.y, c.w, c.h)
        strokeWeight(1)  # reset
        stroke(0)  # reset


def setup():
    size(900, 900)

    grid = Grid(8, 8, _cell_gutter=0)
    # print(grid)
    grid.render_margin("#ff0000")
    grid.render_grid(127)
    cells = grid.cells

    game = """d2d4 g8f6 c2c4 c7c5 d4d5 e7e6 b1c3 e6d5 c4d5 d7d6 g1f3 g7g6 c1g5 f8g7 f3d2 h7h6
    g5h4 g6g5 h4g3 f6h5 d2c4 h5g3 h2g3 e8g8 e2e3 d8e7 f1e2 f8d8 e1g1 b8d7 a2a4 d7e5
    c4e5 e7e5 a4a5 a8b8 a1a2 c8d7 c3b5 d7b5 e2b5 b7b6 a5a6 b8c8 d1d3 c8c7 b2b3 e5c3
    d3c3 g7c3 a2c2 c3f6 g3g4 c7e7 c2c4 d8c8 g2g3 f6g7 f1d1 c8f8 d1d3 g8h7 g1g2 h7g6
    d3d1 h6h5 g4h5 g6h5 g3g4 h5g6 c4c2 f8h8 b5d3 g6f6 g2g3 e7e8 d3b5 e8e4 c2c4 e4c4
    b3c4 f6e7 b5a4 g7e5 g3f3 h8h4 d1g1 f7f5"""

    full_pgn = """1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5 5.cxd5 d6 6.Nf3 g6 7.Bg5 Bg7
8.Nd2 h6 9.Bh4 g5 10.Bg3 Nh5 11.Nc4 Nxg3 12.hxg3 O-O 13.e3 Qe7
14.Be2 Rd8 15.O-O Nd7 16.a4 Ne5 17.Nxe5 Qxe5 18.a5 Rb8 19.Ra2 Bd7
20.Nb5 Bxb5 21.Bxb5 b6 22.a6 Rbc8 23.Qd3 Rc7 24.b3 Qc3 25.Qxc3 Bxc3
26.Rc2 Bf6 27.g4 Re7 28.Rc4 Rc8 29.g3 Bg7 30.Rd1 Rf8 31.Rd3 Kh7 32.Kg2 Kg6
33.Rd1 h5 34.gxh5+ Kxh5 35.g4+ Kg6 36.Rc2 Rh8 37.Bd3+ Kf6 38.Kg3 Ree8
39.Bb5 Re4 40.Rc4 Rxc4 41.bxc4 Ke7 42.Ba4 Be5+ 43.Kf3 Rh4
44.Rg1 f5 1/2-1/2"""

    capture_d = create_capture_dict(full_pgn)
    print(capture_d)

    # for c in cells:
    #     fill(int(random(255)))
    #     rect(c.x, c.y, c.w, c.h)

    if 0:
        for cc in capture_d.keys():
            c = get_cell(cc, cells)
            c.render(color="#FF0FF")

    moves = game.split()
    pgns = full_pgn.split()
    for ply, move in enumerate(moves):
        color = 0 if ply % 2 else 255
        show_move(move, pgns[ply], cells, color)

    show_captures(capture_d, cells)

    print(len(moves), len(pgns))

    saveFrame("images/ver2_captures.png")


def draw():
    pass

