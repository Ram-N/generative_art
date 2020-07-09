w, h = 1000, 800

class Ball(object):
    
    def __init__(self,_id, _x, _y, _vx=0, _vy=0, _dir='UP', _color=0):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id
        self.dir = _dir #'UP', 'DOWN', "RIGHT", "LEFT"
        self.av = 0
        self.color = _color
        
    def move(self):
        
        if self.dir=='UP':
            if self.y > ymin:
                self.y -= self.vy
            else:
                self.dir = 'ARC_12_to_3'
                self.av = PI
        elif self.dir=='DOWN':
            if self.y < ymax:
                self.y += self.vy            
            else:
                self.dir = 'ARC_6_to_9'
                self.av = 0
                
        elif self.dir=='RIGHT':
            if self.x < xmax:
                self.x += self.vx
            else:
                self.dir = 'ARC_3_to_6'
                self.av = 3*PI/2
                
        elif self.dir=='LEFT':
            if self.x > xmin:
                self.x -= self.vx
            else:
                self.dir = 'ARC_9_to_12'
                self.av = 0

                                                        
    def display(self):

        if self.dir == 'ARC_12_to_3':
            self.av += theta
            if self.av < 3*PI/2:
                pushMatrix()
                translate(xs, ye)
                rotate(self.av)
                fill(*self.color)
                ellipse(0, radius, 20, 20)
                popMatrix()
            else:
                self.dir = 'LEFT'
                self.x = xmax
                self.y = ye
                self.av = PI/2
        elif self.dir == 'ARC_9_to_12':
            self.av += theta
            if self.av < PI/2:
                pushMatrix()
                translate(xe, ye)
                rotate(self.av)
                fill(*self.color)
                ellipse(-1*radius, 0, 20, 20)
                popMatrix()
            else:
                self.dir = 'DOWN'
                self.x = xe
                self.y = ymin
                
        elif self.dir == 'ARC_6_to_9':
            self.av += theta
            if self.av < PI/2:
                pushMatrix()
                translate(xe, ys)
                rotate(self.av)
                fill(*self.color)
                ellipse(0, radius, 20, 20)
                popMatrix()
            else:
                self.dir = 'RIGHT'
                self.x = xmin
                self.y = ys
                
        elif self.dir == 'ARC_3_to_6':
            self.av += theta
            if self.av < TWO_PI:
                pushMatrix()
                translate(xs, ys)
                rotate(self.av)
                fill(*self.color)
                ellipse(0, radius, 20, 20)
                popMatrix()
            else:
                self.dir = 'UP'
                self.x = xs
                self.y = ymax

                                
                
        else: # Linear motion
            fill(*self.color)
            ellipse(self.x, self.y, 20,20)

    

sqside = 500
num_balls = 4      
vx, vy = 1, 1  
xs = w/2-sqside/2
ys = h/2-sqside/2
ye = ys+sqside
xe = xs+sqside
ibd = sqside/(num_balls+1)
xmin = xs+ibd
ymin = ys+ibd
xmax = xs+ibd*num_balls
ymax = ys+ibd*num_balls
radius = sqside - ibd
theta = PI/2 * vx / ibd
RED, BLUE = (255,0,0), (0,255,0)
GREEN, BLACK = (0, 0,255), (0,0,0)
colors = [RED, BLUE, GREEN, BLACK]

balls = []
for x in range(num_balls):
    balls.append(Ball(x, xmin + x*ibd,ys, vx,vy, 'RIGHT', RED)) 
    balls.append(Ball(x, xmin + x*ibd,ye, vx,vy, 'LEFT', BLUE)) 
    balls.append(Ball(x, xs, ymin +x*ibd, vx,vy, 'UP', GREEN)) 
    balls.append(Ball(x, xe, ymin +x*ibd, vx,vy, 'DOWN', BLACK)) 
    
        
def setup():    

    size(w,h)
    background(127)
    smooth()
    
def draw():
    global balls, active_balls, a
    background(127)
    strokeWeight(2)
    noFill()
    stroke(255)
    square(xs,ys,sqside)
    #noStroke()
    
    for b in balls:
        b.move()
        b.display()
        
    
    
