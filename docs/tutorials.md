

## Tutorials
 
- Tim Rodenbroeker: https://timrodenbroeker.de/teaching/#anchor-tutorials (Image-related tutorials in Processing)
- [Tim Holman](https://tholman.com/) and [Ruth John's](https://ruthjohn.com/) [Generative Artistry Tutorials](https://generativeartistry.com/tutorials/) 

 - [Inigo Quilez](https://iquilezles.org/index.html) has several very good tutorials and videos.
 - [Blueje's tutorials on animation](https://bleuje.github.io/tutorials/) - Blueje makes great animated gifs.
 
## Differential Growth
- [Differential Growth](https://www.kaspar.wtf/code-poems/differential-growth)
- https://github.com/jasonwebb/morphogenesis-resources#diffusion-limited-aggregation-dla
- https://inconvergent.net/generative/differential-line/
- https://n-e-r-v-o-u-s.com/blog/?p=6721
- https://entagma.com/differential-line-growth/
- http://www.codeplastic.com/2017/07/22/differential-line-growth-with-processing/
- [Reaction Diffusion](https://fronkonstin.com/2019/12/28/reaction-diffusion/) by Fronkonstin, includes R code


## Shapes
- [A wonderful writeup with great pics, on non-overlapping polygons](https://web.archive.org/web/20170429123136/http://paulbourke.net/texture_colour/randomtile/) 

- [You won't believe that these are single lines](https://www.bldgblog.com/2018/05/journey-of-a-single-line/)

## Processing Tutorials
- [25 LIFE-SAVING TIPS FOR PROCESSING by Amnon](https://amnonp5.wordpress.com/2012/01/28/25-life-saving-tips-for-processing/)

## Images/Pixel Sorting
- [Image Processing in P5.js](https://idmnyu.github.io/p5.js-image/index.html)
- [Sorting Myself Out - Ruben Berenguel](https://mostlymaths.net/2020/05/sorting-myself-out.html/)

## Links for creating Generative Portraits
- [Stirman's Curve Density over an image](https://discourse.processing.org/t/curve-density-over-an-image/3210/9) 
-  CurvedVertex added based on pixel brightness
- [Handy's way of generating portraitsin gicentre](https://www.gicentre.net/blog/2014/9/1/a-visual-turing-test)
    Summary: An alternative 'sketchy' approach described below uses more rounded curves to depict the fluid dynamism of spontaneous expression. It involves four steps:
        1. Generate a non-sketchy base image. This might be a data graphic, photograph or any other source of imagery.
        2. Perform blob detection on a greyscale version of the base image generating a set of isolines of equal brightness. 
        3. Apply line simplification to reduce the number of vertices defining each isoline.
        4. Draw Catmull Rom splines through the vertices.
- [Jason Labbe's Portrait Painter](https://www.openprocessing.org/sketch/392202) Very popular on Openprocessing
- [okazz's image based](https://www.openprocessing.org/sketch/876285): A very clever use of line widths mapped to image pixels
- [Weidi Zhang's YouTube Tutorial](https://www.youtube.com/watch?v=me04ZrTJqWA)

- [Mona Lisa Portrait via Sine Waves](https://www.reddit.com/r/generative/comments/mwdsm4/image_composed_of_sine_waves/?utm_source=share&utm_medium=web2x&context=3)
    1. Split the original image into square cells and find the average color for each cell
    2. Convert to greyscale    
    3. Normalize
    4. The normalized value is the light intensity (brightness)
    5. Build a sine wave for each cell `y(x) = A * sin (2 * PI * f * x)` The amplitude `A` and the frequency `f` are directly proportional to the light intensity. `f` goes from `0 to 2`.
    6. Change the sine waves color according to average colors found at step 1

## 2D Attractors
[Softology's Writeup on Attractors](https://softologyblog.wordpress.com/2017/03/04/2d-strange-attractors/)