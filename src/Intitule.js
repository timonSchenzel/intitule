module.exports = class Intitule
{
    makeYellow(value)
    {
        return this.yellow + value + this.ansiStyles.color.close;
    }

    makeBlue(value)
    {
        return this.blue + value + this.ansiStyles.color.close;
    }

    makeGreen(value)
    {
        return this.green + value + this.ansiStyles.color.close;
    }

    make(color, value)
    {
        return this.applyPropertyStyleWithValue(color, value);
    }

    registerColors(colors)
    {
        for (let color in colors) {
            this.registerColor(color, colors[color]);
        }
    }

    bindAnsiColor(colorName, ansiColor)
    {
        if (ansiColor.startsWith('bg')) {
            this['colors'][colorName] = this.ansiStyles[ansiColor].open;
        } else {
            this['colors'][colorName] = this.ansiStyles.color[ansiColor].open;
        }
    }

    registerColor(colorName, colorValue)
    {
        if (typeof colorValue == 'string') {
            if (! colorValue.startsWith('#')) {
                colorValue = '#' + colorValue;
            }

            if (colorName.startsWith('bg')) {
                this['colors'][colorName] = this.ansiStyles.bgColor.ansi16m.hex(colorValue);
            } else {
                this['colors'][colorName] = this.ansiStyles.color.ansi16m.hex(colorValue);
            }
        } else if (typeof colorValue == 'object') {
            if (colorName.startsWith('bg')) {
                this['colors'][colorName] = this.ansiStyles.bgColor.ansi256.rgb(colorValue[0], colorValue[1], colorValue[2]);
            } else {
                this['colors'][colorName] = this.ansiStyles.color.ansi256.rgb(colorValue[0], colorValue[1], colorValue[2]);
            }
        }
    }

    style(properties, styling = null)
    {
        if (typeof properties == 'object') {
            for (let property in properties) {
                if (property == 'html') {
                    for (let htmlProperty in properties.html) {
                        this.theme.html[htmlProperty] = this.applyPropertyStyle(properties.html[htmlProperty], true, htmlProperty);
                    }
                } else {
                    this.styleProperty(property, properties[property]);
                }
            }
        } else {
            if (properties == 'html') {
                for (let htmlProperty in styling) {
                    this.theme.html[htmlProperty] = this.applyPropertyStyle(styling[htmlProperty], true);
                }
            } else {
                this.styleProperty(properties, styling);
            }
        }
    }

    styleProperty(property, styling, isHtml)
    {
        if (! this.theme[property]) {
            this.theme[property] = {};
        }

        if (typeof styling == 'string') {
            styling = styling.split('.');
        }

        if (styling.constructor == Array) {
            this.theme[property] = {};
            this.theme[property] = this.applyPropertyStyle(styling, isHtml);
        }

        if (styling.constructor == Object) {
            if (styling.color && styling.text) {
                this.theme[property] = this.applyPropertyStyleWithValue(styling.color, styling.text);
                delete styling.color;
                delete styling.text;
            }

            for (let subItem in styling) {
                if (! this.theme[property][subItem]) {
                    this.theme[property][subItem] = {};
                }

                if (typeof styling[subItem] == 'string') {
                    styling[subItem] = styling[subItem].split('.');
                }

                if (styling[subItem].constructor == Array) {
                    this.theme[property][subItem] = {};
                    if (subItem == 'color') {
                        this.theme[property] = this.applyPropertyStyle(styling[subItem], isHtml);
                    } else {
                        this.theme[property][subItem] = this.applyPropertyStyle(styling[subItem], isHtml);
                    }
                }

                if (styling[subItem].constructor == Object) {
                    if (styling[subItem].color && styling[subItem].text) {
                        this.theme[property][subItem] = this.applyPropertyStyleWithValue(styling[subItem].color, styling[subItem].text);
                        delete styling[subItem].color;
                        delete styling[subItem].text;
                    }

                    for (let subSubItem in styling[subItem]) {
                        if (styling[subItem][subSubItem].color && styling[subItem][subSubItem].text) {
                            this.theme[property][subItem][subSubItem] = this.applyPropertyStyleWithValue(styling[subItem][subSubItem].color, styling[subItem][subSubItem].text);
                        }

                        // console.log(subSubItem);

                        if (subSubItem == 'color') {
                            // this.theme[property][subItem] = {};
                            // this.theme[property][subItem] = this.applyPropertyStyle(styling[subItem].color, isHtml);
                        } else {
                            if (typeof styling[subItem][subSubItem] == 'string') {
                                styling[subItem][subSubItem] = styling[subItem][subSubItem].split('.');

                                // console.log(styling[subItem][subSubItem]);
                                this.theme[property][subItem][subSubItem] = this.applyPropertyStyle(styling[subItem][subSubItem], isHtml);
                            }
                        }
                    }
                } else {
                    this.theme[property][subItem] = {};
                    this.theme[property][subItem] = this.applyPropertyStyle(styling[subItem], isHtml);
                }
            }
        }
    }

    applyPropertyStyleWithValue(styling, value)
    {
        let formatted = '';

        if (typeof styling == 'string') {
            styling = styling.split('.');
        }

        styling.forEach(style => {
            if (this.colorModifiers.includes(style)) {
                formatted += this.ansiStyles[style].open;
            } else if (this['colors'][style]) {
                formatted += this['colors'][style];
            } else if (this.ansiStyles.color[style]) {
                formatted += this.ansiStyles.color[style].open;
            }
        });

        formatted += value;

        styling.reverse().forEach(style => {
            if (this.colorModifiers.includes(style)) {
                formatted += this.ansiStyles[style].close;
            } else if (this['colors'][style]) {
                formatted += this.ansiStyles.color.close;
            } else if (this.ansiStyles.color[style]) {
                formatted += this.ansiStyles.color[style].close;
            }
        });

        return formatted;
    }

    applyPropertyStyle(styling, isHtml = false, propertyName = null)
    {
        let property = {};

        if (typeof styling == 'string') {
            styling = styling.split('.');
        }

        if (isHtml) {
            // console.log('-------------');
            // console.log(styling);
            // console.log(styling);
            // let chalkProperty = this.chalk;
            property = this.chalk.reset;
            property._styles[0].open = '';
            property._styles[0].close = ''

            // styling.forEach(style => {
            //     property = property[style];
            // });

            // console.log(styling);
            // console.log(this.chalk[styling]);
            // process.exit();
            // property = this.chalk[styling];
            // property = chalkProperty;
            // property = this.chalk[styling];
        }

        styling.forEach(style => {
            if (! isHtml) {
                if (! property.open) {
                    property.open = '';
                }

                if (this['colors'][style]) {
                    property.open += this['colors'][style];
                } else if (this.colorModifiers.includes(style)) {
                    property.open += this.ansiStyles[style].open;
                } else if (this.ansiStyles.color[style]) {
                    property.open += this.ansiStyles.color[style].open;
                } else if (this.ansiStyles[style]) {
                    property.open += this.ansiStyles[style].open;
                }
            } else {
                if (this.colorModifiers.includes(style)) {
                    property._styles[0].open += this.ansiStyles[style].open;
                } else if (this['colors'][style]) {
                    property._styles[0].open += this['colors'][style];
                } else if (this.ansiStyles.color[style]) {
                    property._styles[0].open += this.ansiStyles.color[style].open;
                } else if (this.ansiStyles[style]) {
                    property._styles[0].open += this.ansiStyles[style].open;
                }
            }
        });

        styling.reverse().forEach(style => {
            if (! isHtml) {
                if (! property.close) {
                    property.close = '';
                }

                if (this.colorModifiers.includes(style)) {
                    property.close += this.ansiStyles[style].close;
                } else if (this['colors'][style]) {
                    if (style.startsWith('bg')) {
                        property.close += this.ansiStyles.bgColor.close;
                    } else {
                        property.close += this.ansiStyles.color.close;
                    }
                } else if (this.ansiStyles.color[style]) {
                    property.close += this.ansiStyles.color[style].close;
                } else if (this.ansiStyles[style]) {
                    property.close += this.ansiStyles[style].close;
                }
            } else {
                if (this.colorModifiers.includes(style)) {
                    property._styles[0].close += this.ansiStyles[style].close;
                } else if (this['colors'][style]) {
                    if (style.startsWith('bg')) {
                        property._styles[0].close += this.ansiStyles.bgColor.close;
                    } else {
                        property._styles[0].close += this.ansiStyles.color.close;
                    }
                } else if (this.ansiStyles.color[style]) {
                    property._styles[0].close += this.ansiStyles.color[style].close;
                } else if (this.ansiStyles[style]) {
                    property._styles[0].close += this.ansiStyles[style].close;
                }
            }
        });

        return property;
    }

    applyTheme(theme)
    {
        this.registerColors(theme.colors);
        this.style(theme.style);
    }

    constructor()
    {
        this.defaultTheme = require('./defaultTheme');

        this.addLeftMargin = true;
        this.leftMarginSpaces = 1;

        this.colorModifiers = [
            'reset',
            'bold',
            'dim',
            'italic',
            'underline',
            'inverse',
            'hidden',
            'strikethrough',
        ];

        this.colors = {};

        this.ansiStyles = require('ansi-styles');
        this.concordance = require('concordance');
        this.highlight = require('cli-highlight').highlight;
        this.prettier = require('prettier');
        this.isHtml = require('is-html');
        this.chalk = require('chalk');
        this.forceColor = new this.chalk.constructor({enabled: true});

        this.yellow = this.ansiStyles.color.ansi256.rgb(252, 127, 0);
        this.blue = this.ansiStyles.color.ansi256.rgb(36, 176, 213);
        this.green = this.ansiStyles.color.ansi256.rgb(141, 213, 102);

        this.theme = {};
        this.theme.html = {};

        // this.theme = {
        //     boolean: {
        //         open: this.ansiStyles.bold.open + this.yellow,
        //         close: this.ansiStyles.color.close + this.ansiStyles.bold.close,
        //     },
        //     circular: this.forceColor.grey('[Circular]'),
        //     date: {
        //         invalid: this.forceColor.red('invalid'),
        //         value: this.ansiStyles.blue
        //     },
        //     diffGutters: {
        //         actual: this.forceColor.red('-') + ' ',
        //         expected: this.forceColor.green('+') + ' ',
        //         padding: '  '
        //     },
        //     error: {
        //         ctor: {open: this.ansiStyles.grey.open + '(', close: ')' + this.ansiStyles.grey.close},
        //         name: this.ansiStyles.magenta
        //     },
        //     function: {
        //         name: this.ansiStyles.blue,
        //         stringTag: this.ansiStyles.magenta
        //     },
        //     global: this.ansiStyles.magenta,
        //     item: {after: this.forceColor.grey(',')},
        //     list: {openBracket: this.makeYellow('['), closeBracket: this.makeYellow(']')},
        //     mapEntry: {after: this.forceColor.grey(',')},
        //     maxDepth: this.forceColor.grey('…'),
        //     null: {
        //         open: this.ansiStyles.bold.open + this.yellow,
        //         close: this.ansiStyles.color.close + this.ansiStyles.bold.close,
        //     },
        //     number: {
        //         open: this.ansiStyles.bold.open + this.blue,
        //         close: this.ansiStyles.color.close + this.ansiStyles.bold.close,
        //     },
        //     object: {
        //         openBracket: this.makeYellow('{'),
        //         closeBracket: this.makeYellow('}'),
        //         ctor: {
        //             open: this.blue,
        //             close: this.ansiStyles.color.close,
        //         },
        //         stringTag: {open: this.ansiStyles.magenta.open + '@', close: this.ansiStyles.magenta.close},
        //         secondaryStringTag: {open: this.ansiStyles.grey.open + '@', close: this.ansiStyles.grey.close}
        //     },
        //     property: {
        //         after: this.forceColor.grey(','),
        //         keyBracket: {open: this.forceColor.grey('['), close: this.forceColor.grey(']')},
        //         valueFallback: this.forceColor.grey('…')
        //     },
        //     react: {
        //         functionType: this.forceColor.grey('\u235F'),
        //         openTag: {
        //             start: this.forceColor.grey('<'),
        //             end: this.forceColor.grey('>'),
        //             selfClose: this.forceColor.grey('/'),
        //             selfCloseVoid: ' ' + this.forceColor.grey('/')
        //         },
        //         closeTag: {
        //             open: this.forceColor.grey('</'),
        //             close: this.forceColor.grey('>')
        //         },
        //         tagName: this.ansiStyles.magenta,
        //         attribute: {
        //             separator: '=',
        //             value: {
        //                 openBracket: this.forceColor.grey('{'),
        //                 closeBracket: this.forceColor.grey('}'),
        //                 string: {
        //                     line: {open: this.forceColor.blue('"'), close: this.forceColor.blue('"'), escapeQuote: '"'}
        //                 }
        //             }
        //         },
        //         child: {
        //             openBracket: this.forceColor.grey('{'),
        //             closeBracket: this.forceColor.grey('}')
        //         }
        //     },
        //     regexp: {
        //         source: {open: this.ansiStyles.blue.open + '/', close: '/' + this.ansiStyles.blue.close},
        //         flags: this.ansiStyles.yellow
        //     },
        //     stats: {separator: this.forceColor.grey('---')},
        //     string: {
        //         open: this.ansiStyles.bold.open + this.green,
        //         close: this.ansiStyles.color.close + this.ansiStyles.bold.close,
        //         line: {open: this.yellow + '\'' + this.ansiStyles.color.close, close: this.yellow + '\'' + this.ansiStyles.color.close},
        //         multiline: {start: this.forceColor.green('`'), end: this.forceColor.green('`')},
        //         controlPicture: this.ansiStyles.grey,
        //         diff: {
        //             insert: {
        //                 open: this.ansiStyles.bgGreen.open + this.ansiStyles.black.open,
        //                 close: this.ansiStyles.black.close + this.ansiStyles.bgGreen.close
        //             },
        //             delete: {
        //                 open: this.ansiStyles.bgRed.open + this.ansiStyles.black.open,
        //                 close: this.ansiStyles.black.close + this.ansiStyles.bgRed.close
        //             },
        //             equal: this.ansiStyles.blue,
        //             insertLine: {
        //                 open: this.ansiStyles.green.open,
        //                 close: this.ansiStyles.green.close
        //             },
        //             deleteLine: {
        //                 open: this.ansiStyles.red.open,
        //                 close: this.ansiStyles.red.close
        //             }
        //         }
        //     },
        //     symbol: this.ansiStyles.yellow,
        //     typedArray: {
        //         bytes: this.ansiStyles.yellow
        //     },
        //     undefined: this.ansiStyles.yellow
        // };

        // this.theme.html = {
        //     keyword: this.chalk.blue,
        //     built_in: this.chalk.cyan,
        //     type: this.chalk.cyan.dim,
        //     literal: this.chalk.blue,
        //     number: this.chalk.green,
        //     regexp: this.chalk.red,
        //     string: this.chalk.greenBright,
        //     subst: this.plainFormat,
        //     symbol: this.plainFormat,
        //     class: this.chalk.blue,
        //     function: this.chalk.yellow,
        //     title: this.plainFormat,
        //     params: this.plainFormat,
        //     comment: this.chalk.green,
        //     doctag: this.chalk.green,
        //     meta: this.chalk.grey,
        //     'meta-keyword': this.plainFormat,
        //     'meta-string': this.plainFormat,
        //     section: this.plainFormat,
        //     tag: this.chalk.green,
        //     name: this.chalk.green,
        //     'builtin-name': this.plainFormat,
        //     attr: this.chalk.yellow,
        //     attribute: this.plainFormat,
        //     variable: this.plainFormat,
        //     bullet: this.plainFormat,
        //     code: this.plainFormat,
        //     emphasis: this.chalk.italic,
        //     strong: this.chalk.bold,
        //     formula: this.plainFormat,
        //     link: this.chalk.underline,
        //     quote: this.plainFormat,
        //     'selector-tag': this.plainFormat,
        //     'selector-id': this.plainFormat,
        //     'selector-class': this.plainFormat,
        //     'selector-attr': this.plainFormat,
        //     'selector-pseudo': this.plainFormat,
        //     'template-tag': this.plainFormat,
        //     'template-variable': this.plainFormat,
        //     addition: this.chalk.green,
        //     deletion: this.chalk.red,
        // };

        this.applyTheme(this.defaultTheme);
    }

    diff(actual, expected)
    {
        if (this.isHtml(actual)) {
            actual = this.prettier.format(actual);
            actual = actual.substring(0, actual.length - 2);
            actual = this.highlight(actual, {language: 'html', ignoreIllegals: true, theme: this.theme.html});
        }

        if (this.isHtml(expected)) {
            expected = this.prettier.format(expected);
            expected = expected.substring(0, expected.length - 2);
            expected = this.highlight(expected, {language: 'html', ignoreIllegals: true, theme: this.theme.html});
        }

        this.write(this.concordance.diff(actual, expected, {plugins: [], theme: this.theme}));
    }

    ddDiff(actual, expected)
    {
        this.diff(actual, expected);

        process.exit(0);
    }

    dump(value)
    {
        if (this.isHtml(value)) {
            value = this.prettier.format(value);
            value = value.substring(0, value.length - 2);
            value = this.highlight(value, {language: 'html', ignoreIllegals: true, theme: this.theme.html});

            this.write(value);
            return;
        }

        let formatted = this.concordance.format(value, {plugins: [], theme: this.theme});

        if (typeof value == 'object' && value !== null) {
            if (value.constructor == Array) {
                formatted = this.blue + `array:${value.length} ` + this.ansiStyles.color.close + formatted;
            }

            if (value.constructor == Object) {
                formatted = this.blue + `object:${Object.keys(value).length} ` + this.ansiStyles.color.close + formatted;
            }
        }

        this.write(formatted);
    }

    dd(value)
    {
        this.dump(value)

        process.exit(0);
    }

    write(value)
    {
        if (this.addLeftMargin && this.leftMarginSpaces > 0) {
            let margin = this.createMargin();
            value = margin + value.split('\n').join('\n' + margin);
        }

        console.log(value)
    }

    createMargin()
    {
        let margin = '';
        let leftMarginSpaces = this.leftMarginSpaces;

        while (leftMarginSpaces > 0) {
            leftMarginSpaces--;
            margin += ' ';
        }

        return margin;
    }

    makeGlobal()
    {
        global.dump = (value) => {
            this.dump(value);
        }

        global.dd = (value) => {
            this.dd(value);
        }

        global.diff = (actual, expected) => {
            this.diff(actual, expected);
        }

        global.dd_diff = (actual, expected) => {
            this.ddDiff(actual, expected);
        }
    }
}
