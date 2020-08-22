# Dots and Dashes

<img src="images/BW_1.gif" width="500">
<img src="images/BW_2.gif" width="500">

## Concept

1. Start with a rectangular shape.
2. Keep shrinking the area (with Perimeter increasing) without ever losing continuity.
3. Do this randomly until no more shrinking is possible.


## Production Rules

- No intersecting allowed.
- If a grid-point is part of the perimeter, it has to remain so forever. It cannot be 'submerged' or enveloped.


In each execution, since the line to shrink are randomly chosen, we end up with different final shapes.
Here are a couple of end results:

<img src="images/BW_3.jpg" width="300">
<img src="images/BW_4.jpg" width="300">

**Note: The images above were the result of running '02_space_shrinking.py'**

## Variations

- Start with a small convex shape inside, and grow it.
- Shrink and expand at the same time. (One outer bounding shape, one inner shape)
- Start from multiple "islands" all of which can expand, subject to the no-intersecting rule.