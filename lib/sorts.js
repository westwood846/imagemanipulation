module.exports = {
  mult:   pixel => pixel[0] * pixel[1] * pixel[2],
  shift:  pixel => pixel[0] << 16 | pixel[1] << 8 | pixel[2],
  square: pixel => pixel[0]**2 | pixel[1]**2 | pixel[2]**2,
}