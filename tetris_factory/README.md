# Jan 29 Prompt: Any shape, none can touch

<img src="images/keep0.png" width="400">  

## Description
The underlying algorithm is circle-packing. That ensures that none of the shapes touch. For variety, circles are distorted (into blobs) and elongated into ellipses. A few rectangles and triangles are thrown in to break the monotony. The color is a function of the shape's xy position.

- The Code can be [found here](.)


Link to all of my [Genuary2021 Creations](https://ram-n.github.io/Genuary_2021/).

<img src="images/keep1.png" width="400">  

## Technical

I had two or three related ideas for this one.
  1. Place circle-like shapes, that don't touch. For this, use the circle-packing algorithm, and use noise to distort the circles.

  2. On a fine square grid, each square can either be occupied or not. Place rectilinear shapes that don't touch. This should create a tetris like object grid. (Future work)
  3. Combine both of the above ideas. for a Blob, have to find all the mesh-squares that are 'occupied' and the other mesh squares that are off-limits. (Future work)




## Code and Common Modules
Run `shapes1.py` to recreate these images. Please run this from _inside_ the Processing IDE, since it uses Processing.
It also uses a common file called `shapes.py` which you must import from the `common` directory.

For most of these, I am using the `Processing` Framework. Since I mostly code in Python, I use [the Python extension of Processing](https://py.processing.org/reference/), which is not as popular as its Java version. Also, I sometimes create small resuable code segments which I use in multiple projects. I'm sharing all my genart code, in case others find it useful.

Ram

<img src="images/keep2.png" width="400">  


Link to all of my [Genuary2021 Creations](https://ram-n.github.io/Genuary_2021/).


