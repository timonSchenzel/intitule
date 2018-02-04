# Intitule

Dump javascript values and html like [this](#examples) ([windows example](#windows-example), [mac example](#mac-example)).



## Installation

```bash
# Using npm
npm install intitule

# Using Yarn
yarn add intitule
```



## Usage

```javascript
let dumper = require('intitule');

dumper.makeGlobal(); // This will make dump(), dd(), dump_diff() and dd_diff() methodes global available

dump('Hello World');
dump([1,2,3]);
dd('exit.');
```

View ./node_modules/intitule/examples/example.js file for more details. You can run this example like this:

```bash
node ./node_modules/intitule/examples/example.js
```



## [API](https://github.com/timonSchenzel/intitule/wiki/API)

### class Intitule

- [make(color, value)](https://github.com/timonSchenzel/intitule/wiki/API#makecolor-value)
- [registerColors(colors)](https://github.com/timonSchenzel/intitule/wiki/API#registercolorscolors)
- [bindAnsiColor(colorName, ansiColor)](https://github.com/timonSchenzel/intitule/wiki/API#bindansicolorcolorname-ansicolor)
- [registerColor(colorName, colorValue)](https://github.com/timonSchenzel/intitule/wiki/API#registercolorcolorname-colorvalue)
- [style(properties, styling)](https://github.com/timonSchenzel/intitule/wiki/API#styleproperties-styling)
- [applyTheme(theme)](https://github.com/timonSchenzel/intitule/wiki/API#applythemetheme)
- [diff(actual, expected)](https://github.com/timonSchenzel/intitule/wiki/API#diffactual-expected)
- [ddDiff(actual, expected)](https://github.com/timonSchenzel/intitule/wiki/API#dddiffactual-expected)
- [dump(value)](https://github.com/timonSchenzel/intitule/wiki/API#dumpvalue)
- [dd(value)](https://github.com/timonSchenzel/intitule/wiki/API#ddvalue)
- [makeGlobal()](https://github.com/timonSchenzel/intitule/wiki/API#makeglobal)



## [Customize highlighting](https://github.com/timonSchenzel/intitule/wiki/Customize-highlighting)

Intitule highlighting is fully customizable. You got 3 options to achieve this:

1. [Use the style() method](https://github.com/timonSchenzel/intitule/wiki/Customize-highlighting#use-the-style-method)
2. [Create a intitule.config.js file](https://github.com/timonSchenzel/intitule/wiki/Customize-highlighting#create-a-intituleconfigjs-file)
3. [Create your own theme](https://github.com/timonSchenzel/intitule/wiki/Customize-highlighting#create-your-own-theme)



## Examples

### Windows example

<p align="center">
    <img src="https://raw.githubusercontent.com/timonSchenzel/intitule/master/examples/windows.jpg">
</p>

### Mac example

<p align="center">
    <img src="https://raw.githubusercontent.com/timonSchenzel/intitule/master/examples/mac.jpg">
</p>
