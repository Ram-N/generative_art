from rn_utils import *

"""
Deconstruction of work by Okazz.
"""

colors = [
    "#FE4019",
    "#0B85CF",
    "#FF5FB9",
    "#36225E",
    "#ffffff",
    "#FFA900",
    "#2ec4b6",
    "#e71d36",
]



def setup():
    size(900, 900)
    rectMode(CENTER)
    translate(width / 2, height / 2)
    scale(1.5)
    rotate(PI * random(1))
    translate(-width / 2, -height / 2)
    background(colors[int(random(len(colors)))])

    seg = int(random(5, 15))
    w = width / seg / 1.0
    print(w)
    for i in range(seg):
        for j in range(seg):
            x = (i * w) + (w / 2.0)
            y = (w / 2.0) + (j * w)
    	    form(x, y, w)




def form(x, y, s):
    """
    Looping through x and y of a certain tile size (seg)
    And calling form once for each tile

    w is the width of a tile
    """
    rnd = int(random(3))
    shuffle(colors) # this is my own implementation of shuffle (rn_utils)
    noStroke()
    fill(colors[0])
    pushMatrix()
    translate(x, y)
    rotate(int(random(4)) * PI * 0.5)
    if random(1) < 0.5:
        rect(0, 0, s + 0.9, s, s, 0, s, s)
        # myShape(s * 0.75, -s * 0.25, s * 0.5, 0);
    else:
        rect(0, 0, s + 0.9, s, s, s, 0, s)
        # myShape(s * 0.75, s * 0.25, s * 0.5, TAU * 0.75);

    fill(colors[3])
    ellipse(0, 0, s * 0.8, s * 0.8)

    fill(colors[1])
    ellipse(0, 0, s * 0.5, s * 0.5)

    # if (rnd == 0) drawVortex(0, 0, s * 0.5);
    # if (rnd == 1) ellipse(0, 0, s * 0.5, s * 0.5);
    # if (rnd == 2) {
    # 	fill(colors[1]);
    # 	ellipse(0, 0, s * 0.5, s * 0.5);
    # 	drawHeart(0, s * 0.05, s * 0.35);
    # }

    if random(1) < 0.1:
        fill(colors[0])
        arc(0, 0, s, s, PI, TAU)

    popMatrix()


# function myShape(x, y, s, ang) {
# 	let hs = s / 2;
# 	push();
# 	translate(x, y);
# 	rotate(ang);
# 	noStroke();
# 	beginShape();
# 	vertex(hs, hs);
# 	vertex(hs, -hs);
# 	vertex(-hs, -hs);
# 	vertex(-hs, hs);
# 	beginContour();
# 	vertex(hs, hs);
# 	for (let a = TAU * 0.5; a <= TAU * 0.75; a += TAU / 3600) {
# 		vertex(hs + s * cos(a), hs + s * sin(a));
# 	}
# 	vertex(hs, hs);
# 	endContour();
# 	endShape();
# 	pop();
# }

# function drawVortex(x, y, s) {
# 	let num = int(random(1, 7));
# 	let rpm = PI * int(random(1, 4))
# 	push();
# 	strokeWeight(random(1, 3));
# 	translate(x, y);
# 	fill(colors[1]);
# 	stroke(colors[2]);
# 	ellipse(0, 0, s, s);
# 	noFill();
# 	for (let i = 0; i < num; i++) {
# 		stroke(colors[2]);
# 		rotate(TAU / (num * 0.5));
# 		beginShape();
# 		for (let a = 0; a < rpm; a += TAU / 360) {
# 			let rad = map(a, 0, rpm, (s * 0.5), 0);
# 			vertex(rad * cos(a), rad * sin(a));
# 		}
# 		endShape();
# 	}
# 	pop();
# }

# function drawHeart(x, y, s) {
# 	push();
# 	noStroke();
# 	fill(colors[2]);
# 	translate(x, y);
# 	rect(s / 4, -s / 4, s / 2 + 0.4, s / 2 + 0.4, s, s, s, 0);
# 	rect(-s / 4, -s / 4, s / 2 + 0.4, s / 2 + 0.4, s, s, 0, s);
# 	myShape(s / 8, s / 8, s / 4 + 0.4, 0);
# 	myShape(-s / 8, s / 8, s / 4 + 0.4, PI * 0.5);
# 	pop();
# }
