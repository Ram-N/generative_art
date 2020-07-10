w, h = 1000, 800


radius = 100
n = 50
theta = TWO_PI/n
x_spacing = 10
y_base = 300
amplitude = 100
def setup():
    size(w,h)
    stroke(10)
    strokeWeight(5)
    
    #task3: Draw a sin/cos curve made up of vertical lines.
    # Starting point, height = sine related.
    for vl in range(n):
        x_value = 100+x_spacing*vl
        line(x_value , y_base, x_value, y_base + amplitude*sin(vl * theta))
        
    
    #task 1: draw n points on a circle of radius r
    translate(w/2, h/2)
    for angle in range(n):
        rotate(theta)
        #point(radius, 0) #this was for task1
        end_x = random(100)
        line(radius, 0, radius+end_x, 0)
