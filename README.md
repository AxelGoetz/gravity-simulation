# 2D Gravity Simulator
A very simple, basic simulation of gravity between different points, inspired by [particles.js](https://github.com/VincentGarreau/particles.js).
Essentially, it calculates the gravitational force between all nodes and changes the velocity accordingly.

For a demo, click [here](https://agoetz.me/gravity-simulation/).

## Usage
First, you will need to define a canvas element with an `ID` and set its background to something else than white.
Next, the function `init` is responsible for starting the simulation. It has various different options:
- `id` - The id of your canvas element.
- `size` - How big the canvas should be.
- `amountOfObjects` - How many objects will be rendered initially. I recommend to not have more than 100.
- `g` - The gravitational constant. The higher it is, the more attracted the objects will be to each other.
- `slowDown` - If `g` is too high, the velocity of some nodes might be really high. Hence, the animation can be slowed down with this factor.
- `resize` - A boolean value that determines whether the canvas should be resized every time the window size is changed.
