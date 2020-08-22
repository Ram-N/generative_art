class Circle:
    def __init__(self, cx, cy, radius, angle, poi_x, poi_y):
        self.cx = cx
        self.cy = cy
        self.radius = radius
        self.angle = angle
        self.poi_x = poi_x
        self.poi_y = poi_y


size(600, 600)
noFill()

c1 = Circle(120, 200, 100, 0, 0, 0)

new_rad = 40
angle = PI / 6
nx = c1.cx + (new_rad + c1.radius) * cos(angle)
ny = c1.cy + (new_rad + c1.radius) * sin(angle)
poi_x = c1.cx + cos(angle) * c1.radius
poi_y = c1.cy + sin(angle) * c1.radius

c2 = Circle(nx, ny, new_rad, angle, poi_x, poi_y)

new_rad = 60
angle = -PI / 3
nx = c1.cx + (new_rad + c1.radius) * cos(angle)
ny = c1.cy + (new_rad + c1.radius) * sin(angle)
poi_x = c1.cx + cos(angle) * c1.radius
poi_y = c1.cy + sin(angle) * c1.radius

c3 = Circle(nx, ny, new_rad, angle, poi_x, poi_y)

for idx, c in enumerate([c3, c2, c1]):
    strokeWeight(1 + idx)
    ellipse(c.cx, c.cy, c.radius * 2, c.radius * 2)

line(c1.cx, c1.cy, c2.poi_x, c2.poi_y)
a12 = atan2(c1.cy - c2.poi_y, c1.cx - c2.poi_x)
line(c1.cx, c1.cy, c1.cx, c2.poi_y)
line(c1.cx, c2.poi_y, c2.poi_x, c2.poi_y)

stroke(255, 0, 0)
line(c1.cx, c1.cy, c1.cx, c3.poi_y)
line(c1.cx, c3.poi_y, c3.poi_x, c3.poi_y)

angle_12 = map(a12, -PI, PI, 0, TWO_PI)
a13 = atan2(c1.cy - c3.poi_y, c1.cx - c3.poi_x)
angle_13 = map(a13, -PI, PI, 0, TWO_PI)

print(degrees(a12), degrees(a13), degrees(angle_12))
print(degrees(angle_12), degrees(angle_13))

