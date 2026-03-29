# Space

A dynamic desktop wallpaper created with the pure power of JavaScript, HTML & CSS.

## Windows
This background is now available on [Steam](https://steamcommunity.com/sharedfiles/filedetails/?id=3589181971) for [Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/)

## Linux
Use a wallpaper manager like [Komorebi](https://github.com/christianloopp/komorebi), that supports web wallpapers

# Configuration

You can configure the wallpaper just as you please.

Here's an overview of what can be changed:

```js
{
  "starCount",
  "starSpeed",
  "starSize",
  "starColor",
  "backgroundColor",
  "uiHidden", // or just "hidden"
  "uiForegroundColor",
  "uiBackgroundColor",
  "lineColor",
  "lineDistance"
}
```

You can change these through:

- UI
- URLSearchParameters (e.g. `atlas-zero.github.io/space/?hidden&starSize=5`) - useful for Komorebi
- Change settings in Wallpaper Engine
- Changing `config.js`

Depending on how you run the wallpaper, there are several ways to change space to your liking:

## Technologies
- HTML
- CSS
- JavaScript
- Wallpaper Engine API

## Function
- built to maximize configurablity, freedom of expression
- stars bouce chaotically through space in a random direction, with random speed
- stars connect, if they are in a certain range to each other
- looks pleasing
