# imagemanipulation

`npm install` once. Since this uses [canvas](https://www.npmjs.com/package/canvas), you'll also have to install Cairo, for which canvas has instructions in it's readme.

Example Usage: `npm run start -- 1680 1050 load in/crayons.jpg - pixelize 80 50 - pixelize 40 25`

The first two parameters (after the `--`) are the width and height of the output image, respectively. Generally you can set them to the size of the input image, but you can also use them to scale the output image up or down (which impacts the performance).

After that, you specify a list of filters to apply.

* Usually, you'll want to load an input image with `load PATH` first.
* `pixelize xSize ySize` and `tilize xSize ySize` transform the image into unicolored rectamgles.
* TODO: Describe other filters

The output is saved in `out/` and as `out.jpg` and `out.png`.

## Writing New Filters

Just add a file in the `filters/` directory that exports a function like

```
module.exports = function(ctx, random, ...PARAMS') {}
```

See the existing functions as examples.