module.exports = class ThemeTest extends TestCase
{
    setUp()
    {
        this.ansiStyles = require('ansi-styles');
        this.chalk = require('chalk');
    }

	/** @test */
	it_is_possible_to_specify_a_color_in_rgb_format()
	{
		intitule.registerColor('red', [255, 0, 0]);

		this.assertEquals(
			this.ansiStyles.color.ansi256.rgb(255, 0, 0),
			intitule.colors.red
		);
	}

	/** @test */
	it_is_possible_to_specify_a_color_in_hex_format()
	{
		intitule.registerColor('red', 'a24344');

		this.assertEquals(
			this.ansiStyles.color.ansi16m.hex('a24344'),
			intitule.colors.red
		);

		intitule.registerColor('red2', '#a24344');

		this.assertEquals(
			this.ansiStyles.color.ansi16m.hex('a24344'),
			intitule.colors.red2
		);
	}

	/** @test */
	it_is_possible_to_style_a_specific_data_item()
	{
		intitule.registerColor('red', 'a24344');
		intitule.style('boolean', 'red');

		this.assertEquals({
			open: intitule.colors.red,
			close: this.ansiStyles.color.close,
		}, intitule.theme.boolean);
	}

	/** @test */
	it_is_possible_to_style_a_specific_data_item_with_text()
	{
		intitule.registerColor('red', 'a24344');
		intitule.style('circular', {
            color: 'red',
            text: '[Circular]',
        });

		this.assertEquals(
			intitule.colors.red + '[Circular]' + this.ansiStyles.color.close,
			intitule.theme.circular
		);
	}

	/** @test */
	it_is_possible_to_style_date_values()
	{
		intitule.registerColor('red', 'a24344');
		intitule.style('date', {
            invalid: {
                color: 'red',
                text: 'invalid',
            },
            value: 'blue',
        });

		this.assertEquals(intitule.colors.red + 'invalid' + this.ansiStyles.color.close, intitule.theme.date.invalid);

        this.assertEquals({
        	open: intitule.colors.blue,
        	close: this.ansiStyles.color.close
        }, intitule.theme.date.value);
	}

    /** @test */
    it_is_possible_to_style_string_data_types()
    {
        intitule.style('string', {
            color: 'bold.green',
            line: {
                open: {
                    color: 'yellow',
                    text: '\'',
                },
                close: {
                    color: 'yellow',
                    text: '\'',
                },
            },
            multiline: {
                start: {
                    color: 'green',
                    text: '`',
                },
                end: {
                    color: 'green',
                    text: '`',
                },
            },
            controlPicture: 'grey',
            diff: {
                insert: 'bgGreen.black',
                delete: 'bgRed.black',
                equal: 'blue',
                insertLine: 'green',
                deleteLine: 'red',
            }
        });

        this.assertEquals(this.ansiStyles.bold.open + intitule.colors.green, intitule.theme.string.open);

        this.assertEquals(this.ansiStyles.color.close + this.ansiStyles.bold.close, intitule.theme.string.close);

        this.assertEquals({
            open: intitule.colors.yellow + '\'' + this.ansiStyles.color.close,
            close: intitule.colors.yellow + '\'' + this.ansiStyles.color.close
        }, intitule.theme.string.line);

        this.assertEquals({
            start: intitule.make('green', '`'),
            end: intitule.make('green', '`')
        }, intitule.theme.string.multiline);

        this.assertEquals(this.ansiStyles.grey, intitule.theme.string.controlPicture);

        this.assertEquals({
            open: this.ansiStyles.bgGreen.open + this.ansiStyles.black.open,
            close: this.ansiStyles.black.close + this.ansiStyles.bgGreen.close
        }, intitule.theme.string.diff.insert);

        this.assertEquals({
            open: this.ansiStyles.bgRed.open + this.ansiStyles.black.open,
            close: this.ansiStyles.black.close + this.ansiStyles.bgRed.close
        }, intitule.theme.string.diff.delete);

        this.assertEquals({
            open: intitule.colors.blue,
            close: this.ansiStyles.color.close,
        }, intitule.theme.string.diff.equal);

        this.assertEquals({
            open: intitule.colors.green,
            close: this.ansiStyles.color.close
        }, intitule.theme.string.diff.insertLine);

        this.assertEquals({
            open: intitule.colors.red,
            close: this.ansiStyles.color.close
        }, intitule.theme.string.diff.deleteLine);
    }

    /** @test */
    it_is_possible_to_style_html()
    {
        intitule.registerColor('violet', '8a2be2');
        intitule.style('html', {
            name: 'violet',
        });

        this.assertEquals(intitule.chalkColors.violet._styles, this.chalk.hex('8a2be2')._styles);
    }

    /** @test */
    html_style_will_fallback_to_chalk_colors_if_available()
    {
        let chalk = require('chalk');

        intitule.style('html', {
            name: 'cyan',
        });

        this.assertEquals(chalk.cyan._styles, intitule.theme.html.name._styles);
    }

    /** @test */
    it_will_apply_the_default_theme_by_default()
    {
        let localIntitule = new (require('../src/Intitule'));

        // Colors
        this.assertEquals({
            yellow: this.ansiStyles.color.ansi256.rgb(252, 127, 0),
            darkYellow: this.ansiStyles.color.ansi16m.hex('c6ad49'),
            blue: this.ansiStyles.color.ansi256.rgb(36, 176, 213),
            green: this.ansiStyles.color.ansi256.rgb(141, 213, 102),
            brightGreen: this.ansiStyles.color.ansi16m.hex('9cc55f'),
            brighterGreen: this.ansiStyles.color.ansi16m.hex('b4bc58'),
            red: this.ansiStyles.color.ansi16m.hex('a24344'),
            bgRgbTest: this.ansiStyles.bgColor.ansi256.rgb(141, 213, 102),
            bgHexTest: this.ansiStyles.bgColor.ansi16m.hex('a24344'),
        }, localIntitule.colors);

        let rawChalkColors = {};
        for (let chalkColor in localIntitule.chalkColors) {
            rawChalkColors[chalkColor] = localIntitule.chalkColors[chalkColor]._styles;
        }

        // ChalkColors
        this.assertEquals({
            yellow: this.chalk.rgb(252, 127, 0)._styles,
            darkYellow: this.chalk.hex('c6ad49')._styles,
            blue: this.chalk.rgb(36, 176, 213)._styles,
            green: this.chalk.rgb(141, 213, 102)._styles,
            brightGreen: this.chalk.hex('9cc55f')._styles,
            brighterGreen: this.chalk.hex('b4bc58')._styles,
            red: this.chalk.hex('a24344')._styles,
        }, rawChalkColors);

        // Theme
        // this.assertEquals({
        //     html: {
        //         string: localIntitule.chalkColors.brightGreen,
        //         tag: localIntitule.chalkColors.brighterGreen,
        //         name: localIntitule.chalkColors.brighterGreen,
        //         attr: localIntitule.chalkColors.darkYellow,
        //     }
        // }, localIntitule.theme);
    }
}





// dump();
// dump('');
// dump(true);
// dump(false);
// dump(null);
// dump(1234567890);
// dump('foo');
// dump([1,2,3]);
// dump({1:1,2:2,3:3});
// dump({foo: 'bar', bar: 'baz', 'number': 22});
// dump(Foo);
// dump(fooInstance);
// dump(`
// 	<html>
// 	<body>

// 	<h2 title="I'm a header">The title attribute</h2>

// 	<p title="I'm a tooltip">
// 	Mouse over this paragraph, to display the title attribute as a tooltip.
// 	</p>

// 	</body>
// 	</html>
// `);
// diff('foo', 'bar');
// diff('foo', 'foobar');
// diff('foobar', 'bar');
// dd('done.');
