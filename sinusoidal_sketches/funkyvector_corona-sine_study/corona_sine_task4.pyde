w, h = 800, 800


radius = 100
n = 50
theta_incr = TWO_PI/n
x_spacing = 10
y_base = 300
amplitude = 90
base_height = 20 + amplitude
sin_start = PI/32 # 
sin_end = 3*PI - sin_start  # go from x until 5PI-x
# starting from sin_start, we are dividing this into n-1 equal distances.
# goal is that sin(sin_start) and sin(sin_end) would be the same value
# sin_end = sin_start + (n-1)*sin_incr

sin_incr = (sin_end - sin_start)/(n-1) ## to ensure that both values are the same


def setup():
    size(w,h)
    stroke(10)
    strokeWeight(8)
    background(185, 236, 127)
    translate(w/2, h/2)
    rotate(radians(random(360))) # start off with a random rotation
    for angle in range(n):
        rotate(theta_incr)
        #try a sine curve for the lenghts of the radials
        theta = sin_start + angle*sin_incr
        end_x = base_height + amplitude*sin(theta)
        print(sin(sin_start + angle*sin_incr ), angle, (angle)*sin_incr)
        line(radius, 0, radius+end_x, 0)
        
    
