const IntituleBase = require('./Intitule');

module.exports = class IntituleWebbrowser extends IntituleBase
{
    constructor()
    {
        super();

        this.ansiUp = new (require('ansi_up')).default;
    }


    styledConsoleLog() {
        var argArray = [];

        if (arguments.length) {
            var startTagRe = /<span\s+style=(['"])([^'"]*)\1\s*>/gi;
            var endTagRe = /<\/span>/gi;

            var reResultArray;
            argArray.push(arguments[0].replace(startTagRe, '%c').replace(endTagRe, '%c'));
            while (reResultArray = startTagRe.exec(arguments[0])) {
                argArray.push(reResultArray[2]);
                argArray.push('');
            }

            // pass through subsequent args since chrome dev tools does not (yet) support console.log styling of the following form: console.log('%cBlue!', 'color: blue;', '%cRed!', 'color: red;');
            for (var j = 1; j < arguments.length; j++) {
                argArray.push(arguments[j]);
            }
        }

        console.log.apply(console, argArray);
    }

    dump(value)
    {
        if (this.isHtml(value)) {
            console.log(value);
        } else if (['boolean', 'null', 'undefined', 'number', 'string', 'symbol'].includes(typeof value)) {
            let formatted = this.concordance.format(value, {plugins: [], theme: this.theme});
            this.write(formatted);
        } else {
            console.log(value);
        }
    }

    write(value)
    {
        if (this.addLeftMargin && this.leftMarginSpaces > 0) {
            let margin = this.createMargin();
            value = margin + value.split('\n').join('\n' + margin);
        }

        this.styledConsoleLog(this.ansiUp.ansi_to_html(value));
    }
}
