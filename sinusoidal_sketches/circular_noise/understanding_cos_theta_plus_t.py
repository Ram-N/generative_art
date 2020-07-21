"""
Vary t and rotation (degree) in the following script
to get a feel for how cos(t + degree) behaves over values of t and theta.
"""

size(900, 900)
_scale = 100
strokeWeight(2)
fill(255, 0, 0)
# translate(width/2, height/2)

# rotation = TWO_PI/30
rotation = 0.5
degree = 0
for t in range(800):
    degree += rotation
    start = 100 + t
    y = cos(radians(t + degree)) * _scale
    line(start, 200, start, 200 - y)
    line(start, 600, start, 500 - y)
    print(t, degree, y)
