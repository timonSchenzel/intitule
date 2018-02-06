const IntituleBase = require('./Intitule');

module.exports = class IntituleNodejs extends IntituleBase
{
    constructor()
    {
        super();

        this.fs = require('fs');
        this.path = require('path');
        this.prettier = require('prettier');

        this.root = this.path.normalize(
            process.cwd() + '/'
        );
    }

    loadDefaultTheme()
    {
        let defaultTheme = require('./defaultTheme');

        if (this.fs.existsSync(this.root + this.configFile)) {
            let config = require(this.root + this.configFile);

            if (config.extend == 'default') {
                delete config.extend;
                defaultTheme = this.merge(defaultTheme, config, { arrayMerge: (destination, source) => source });
            } else {
                defaultTheme = config;
            }
        }

        return defaultTheme;
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

        super.diff(actual, expected);
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

        super.dump(value);
    }

    dd(value)
    {
        this.dump(value)

        process.exit(0);
    }
}
