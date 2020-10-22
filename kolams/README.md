# Generative Kolams


## Nomenclature

- Dots: These are the `pullis` in pulli-kolam. These dots are visible, and usually the kolam-line goes *around* these without touching them.

- fine-grid: A rectangle around the dot. Probably a 5x5 or an 8x8 sub-grid. By definition this grid is very fine.

- 2-way symmetry or 4-way Symmetry

- Dot-pattern shape: Rhombic, square, circular, 5-2-1 (5, 3 and 1, and then 3 and 5)




<img src="images/dots_1.jpeg" width="500">

## Inspiration
[YouTube Video from MathLapse](https://youtu.be/a0n14YSIFyU)
This 3-minute video makes the dots (and junctions) as vertices and generates an "Euler-graph" which is the kolam itself. This is the kernel of what 'draw' will do.

From the [mathLapse article](https://imaginary.org/film/mathlapse-math-art-south-indian-traditional-art-suzhi-kolam), there is a mention of a sub-class of kolams:

    Single Stroke kolam also called as “ANTHATHI Kolam” in Tamil Nadu. The Smooth line starts at a point and end in the same point. Single stroke kolam can be drawn for any type of dot structure (rhombic, square, triangular, or free shapes)

<img src="images/single_line.jpg" width="300">

As can be seen here, there are many other possibilities to create a SL kolam based on the set of dots above.

<img src="images/lines-dots-circles-indian-traditional-260nw-1296789643.webp" width="500">

## Top-level Functions

- Place Dots (dx, dy) render dots
- Create fine-grid
- Generate Junctions
- JJ Connects

### Common Utilities
1. For the Grid, I use the same class/files as in Chess_Art (`grid.py`)
2. For finer grid near the dots, I use fine-grid based on what I did in `generative fonts.` finer grid.py

<img src="images/inspiration.jpg" width="500">

Several other examples can be found in the [images](images/) directory.
