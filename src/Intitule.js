module.exports = class Intitule
{
    constructor()
    {
        this.defaultTheme = require('./defaultTheme');
        this.merge = require('deepmerge');

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
        this.chalkColors = {};

        this.ansiStyles = require('ansi-styles');
        this.concordance = require('concordance');
        this.highlight = require('cli-highlight').highlight;
        this.prettier = require('prettier');
        this.isHtml = require('is-html');
        this.chalk = require('chalk');
        this.forceColor = new this.chalk.constructor({enabled: true});

        this.theme = {};
        this.theme.html = {};

        this.applyTheme(this.defaultTheme);
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
        let blankChalk = require('chalk');

        if (typeof colorValue == 'string') {
            if (! colorValue.startsWith('#')) {
                colorValue = '#' + colorValue;
            }

            if (colorName.startsWith('bg')) {
                this['colors'][colorName] = this.ansiStyles.bgColor.ansi16m.hex(colorValue);
            } else {
                this['colors'][colorName] = this.ansiStyles.color.ansi16m.hex(colorValue);
                this['chalkColors'][colorName] = blankChalk.hex(colorValue);
            }
        } else if (typeof colorValue == 'object') {
            if (colorName.startsWith('bg')) {
                this['colors'][colorName] = this.ansiStyles.bgColor.ansi256.rgb(colorValue[0], colorValue[1], colorValue[2]);
            } else {
                this['colors'][colorName] = this.ansiStyles.color.ansi256.rgb(colorValue[0], colorValue[1], colorValue[2]);
                this['chalkColors'][colorName] = blankChalk.rgb(colorValue[0], colorValue[1], colorValue[2]);
            }
        }
    }

    style(properties, styling = null)
    {
        if (typeof properties == 'object') {
            for (let property in properties) {
                if (property == 'html') {
                    for (let htmlProperty in properties.html) {
                        this.theme.html[htmlProperty] = this.applyHtmlPropertyStyle(properties.html[htmlProperty]);
                    }
                } else {
                    this.styleProperty(property, properties[property]);
                }
            }
        } else {
            if (properties == 'html') {
                for (let htmlProperty in styling) {
                    this.theme.html[htmlProperty] = this.applyHtmlPropertyStyle(styling[htmlProperty]);
                }
            } else {
                this.styleProperty(properties, styling);
            }
        }
    }

    styleProperty(property, styling)
    {
        if (! this.theme[property]) {
            this.theme[property] = {};
        }

        if (typeof styling == 'string') {
            styling = styling.split('.');
        }

        if (styling.constructor == Array) {
            this.theme[property] = {};
            this.theme[property] = this.applyPropertyStyle(styling);
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
                        this.theme[property] = this.applyPropertyStyle(styling[subItem]);
                    } else {
                        this.theme[property][subItem] = this.applyPropertyStyle(styling[subItem]);
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

                        if (subSubItem != 'color') {
                            if (typeof styling[subItem][subSubItem] == 'string') {
                                styling[subItem][subSubItem] = styling[subItem][subSubItem].split('.');

                                this.theme[property][subItem][subSubItem] = this.applyPropertyStyle(styling[subItem][subSubItem]);
                            }
                        }
                    }
                } else {
                    this.theme[property][subItem] = {};
                    this.theme[property][subItem] = this.applyPropertyStyle(styling[subItem]);
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

    applyHtmlPropertyStyle(style)
    {
        if (this['chalkColors'][style]) {
            return this.chalkColors[style];
        } else {
            let blankChalk = require('chalk');
            return blankChalk[style];
        }
    }

    applyPropertyStyle(styling)
    {
        let property = {};

        if (typeof styling == 'string') {
            styling = styling.split('.');
        }

        styling.forEach(style => {
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
        });

        styling.reverse().forEach(style => {
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
        });

        return property;
    }

    applyTheme(theme)
    {
        if (typeof theme == 'string') {
            theme = require(theme);
        }

        if (theme.extend) {
            let extend = theme.extend;
            delete theme.extend;
            if (extend == 'default') {
                theme = this.merge(this.defaultTheme, theme, { arrayMerge: (destination, source) => source });
            } else {
                theme = this.merge(require(extend), theme, { arrayMerge: (destination, source) => source });
            }
        }

        this.registerColors(theme.colors);

        this.style(theme.style);
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
                formatted = this.theme.list.ctor.open + `array:${value.length} ` + this.ansiStyles.color.close + formatted;
            }

            if (value.constructor == Object) {
                formatted = this.theme.object.ctor.open + `object:${Object.keys(value).length} ` + this.ansiStyles.color.close + formatted;
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
