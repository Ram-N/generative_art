w, h = 1000, 800

class Ball(object):
    
    def __init__(self,_id, _x, _y, _vx=0, _vy=0, _dir='UP', _color=0, _mode='Linear'):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id
        self.dir = _dir #'UP', 'DOWN', "RIGHT", "LEFT"
        self.av = 0
        self.color = _color
        self.mode = _mode #'Linear' or 'Arc'

                        
    def move(self):
        
        if self.dir=='UP':
            if self.y > ymin:
                self.y -= self.vy
            else:
                self.mode = 'Arc'
                self.dir = 'ARC_12_to_3'
                self.av = PI
        elif self.dir=='DOWN':
            if self.y < ymax:
                self.y += self.vy            
            else:
                self.mode = 'Arc'
                self.dir = 'ARC_6_to_9'
                self.av = 0
                
        elif self.dir=='RIGHT':
            if self.x < xmax:
                self.x += self.vx
            else:
                self.mode = 'Arc'
                self.dir = 'ARC_3_to_6'
                self.av = 3*PI/2
                
        elif self.dir=='LEFT':
            if self.x > xmin:
                self.x -= self.vx
            else:
                self.mode = 'Arc'
                self.dir = 'ARC_9_to_12'
                self.av = 0

                                                                                                                                              
    def display(self):
        
        if self.mode == 'Arc':
            self.av += theta

        if self.dir == FOUR_ARCS[0]:
            if self.av < 3*PI/2:
                pushMatrix()
                translate(*FOUR_CORNERS[0])
                rotate(self.av)
                fill(self.color)
                ellipse(0, pendulum_radius, ball_radius, ball_radius)
                popMatrix()
            else:
                self.mode = 'Linear'
                self.dir = 'LEFT'
                self.x = xmax
                self.y = ye
                
        elif self.dir == FOUR_ARCS[1]:
            if self.av < PI/2:
                pushMatrix()
                translate(*FOUR_CORNERS[1])
                rotate(self.av)
                fill(self.color)
                ellipse(-1*pendulum_radius, 0, ball_radius, ball_radius)
                popMatrix()
            else:
                self.mode = 'Linear'
                self.dir = 'DOWN'
                self.x = xe
                self.y = ymin
                
                
        elif self.dir == FOUR_ARCS[2]:
            if self.av < PI/2:
                pushMatrix()
                translate(*FOUR_CORNERS[2])
                rotate(self.av)
                fill(self.color)
                ellipse(0, pendulum_radius, ball_radius, ball_radius)
                popMatrix()
            else:
                self.mode = 'Linear'
                self.dir = 'RIGHT'
                self.x = xmin
                self.y = ys
                
        elif self.dir == FOUR_ARCS[3]:
            if self.av < TWO_PI:
                pushMatrix()
                translate(*FOUR_CORNERS[3])
                rotate(self.av)
                fill(self.color)
                ellipse(0, pendulum_radius, ball_radius, ball_radius)
                popMatrix()
            else:
                self.mode = 'Linear'
                self.dir = 'UP'
                self.x = xs
                self.y = ymax
                                
                
        else: # Linear motion
            fill(self.color)
            ellipse(self.x, self.y, ball_radius,ball_radius)

#START_ANGLE = [3*PI/2, PI/2,  PI/2, TWO_PI]               
END_ANGLE = [3*PI/2, PI/2,  PI/2, TWO_PI]           

sqside = 500
ball_radius = 30
num_balls = 5      
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
pendulum_radius = sqside - ibd
theta = PI/2 * vx / ibd
RED, BLUE = (255,0,0), (0,255,0)
GREEN, BLACK = (0, 0,255), (0,0,0)
colors = [RED, BLUE, GREEN, BLACK]

FOUR_CORNERS = [(xs, ye), (xe, ye), (xe, ys), (xs, ys)]
FOUR_ARCS = ['ARC_12_to_3', 'ARC_9_to_12', 'ARC_6_to_9', 'ARC_3_to_6']                                                         



balls = []
for x in range(num_balls):
    balls.append(Ball(x, xmin + x*ibd,ys, vx,vy, 'RIGHT', 255)) 
    balls.append(Ball(x, xmin + x*ibd,ye, vx,vy, 'LEFT', 255)) 
    balls.append(Ball(x, xs, ymin +x*ibd, vx,vy, 'UP', 255)) 
    balls.append(Ball(x, xe, ymin +x*ibd, vx,vy, 'DOWN', 255)) 
    
        
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
    
    if frameCount >= 100:
        noLoop()
    if not frameCount%40:
        print(frameCount)
    saveFrame("images/white-###.png")
    
