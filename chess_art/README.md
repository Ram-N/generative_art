# Chess Art

`grid.py` is the file to display the board (squares).


## The Challenge At Hand

Given a chess game, given all its moves and the result, are there ways to represent that game on a chess board using lines, and colors
to convey some aspects of the game. (Don't use chess pieces if possible)
Can a game be 'condensed' into one static image?
- How much will animation help?
Can we show the battle areas, which side has an advantage, which side won. All that using lines and arrows and coloring squares?

## Ideas

1. Take a chess game (its PGN notation), and highlight several different aspects of the game through 'images'
2. For example: The color intensity of a square is proportional to the number of times it was occupied by a piece.
(This gives a sense of the "battle" spots)
4. Extending that, the Redness of a square equals the number of captures that happened there.
3. Piece Tours: Show how each of the 4 minor and 4 major pieces moved through the game for each player.
    Assign a unique color to each piece
    Draw A line from starting square to ending square.
    Line weight could be a function of piece importance: K, Q, R, B N
5. Show each move as a line. If a line is "taken" increase its weight.


## Preprocessing

* Not being a Processing purist for this one. I parse the PGN using regular Python, use Pandas to prepare my dataset,
and output several lists/dictionaries which I then use in my processing code.

* For example: 0-0 for white has to be parsed as (Ke1-g1 and Rh1-Rf1)


* https://www.cs.kent.ac.uk/people/staff/djb/uci-analyser/


<img src="trapeze_balls/images/white_trapeze.gif" width="250">
<img src="trapeze_balls/images/trapeze_loop.gif" width="250">

## Criss-cross

<img src="ball_crossings/images/balls9x9.gif" width="250">




