# Panels
panel_cols = 6
panel_rows = 6

inter_cell = 10  # internal gap between 2 panels
cell_margin = 10  # initial gutter between canvas margin & the start of the first panel

pw = (w - 2 * cell_margin - (panel_cols - 1) * inter_cell) / (panel_cols)
ph = (h - 2 * cell_margin - (panel_rows - 1) * inter_cell) / (panel_rows)

print(w, h, pw, ph)


def render_panels():
    fill(100)
    noStroke()
    for yi in range(panel_rows):
        for xi in range(panel_cols):
            x, y = (
                canvas_margin + cell_margin + (inter_cell + pw) * xi,
                canvas_margin + cell_margin + (inter_cell + ph) * yi,
            )
            fill(10)
            rect(x, y, pw, ph)
            draw_lines(x, y, pw, ph)  # inside panel
            print(x, y)

