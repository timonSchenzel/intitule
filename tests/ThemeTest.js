module.exports = class ThemeTest extends TestCase
{
	/** @test */
	it_is_possible_to_specify_a_color_in_rgb_format()
	{
		intitule.registerColor('red', [255, 0, 0]);

		this.assertEquals(
			ansiStyles.color.ansi256.rgb(255, 0, 0),
			intitule.colors.red
		);
	}

	/** @test */
	it_is_possible_to_specify_a_color_in_hex_format()
	{
		intitule.registerColor('red', 'a24344');

		this.assertEquals(
			ansiStyles.color.ansi16m.hex('a24344'),
			intitule.colors.red
		);

		intitule.registerColor('red2', '#a24344');

		this.assertEquals(
			ansiStyles.color.ansi16m.hex('a24344'),
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
			close: ansiStyles.color.close,
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
			intitule.colors.red + '[Circular]' + ansiStyles.color.close,
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

		this.assertEquals(intitule.colors.red + 'invalid' + ansiStyles.color.close, intitule.theme.date.invalid);

        this.assertEquals({
        	open: intitule.colors.blue,
        	close: ansiStyles.color.close
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

        this.assertEquals(ansiStyles.bold.open + intitule.colors.green, intitule.theme.string.open);

        this.assertEquals(ansiStyles.color.close + ansiStyles.bold.close, intitule.theme.string.close);

        this.assertEquals({
            open: intitule.colors.yellow + '\'' + ansiStyles.color.close,
            close: intitule.colors.yellow + '\'' + ansiStyles.color.close
        }, intitule.theme.string.line);

        this.assertEquals({
            start: intitule.make('green', '`'),
            end: intitule.make('green', '`')
        }, intitule.theme.string.multiline);

        this.assertEquals(ansiStyles.grey, intitule.theme.string.controlPicture);

        this.assertEquals({
            open: ansiStyles.bgGreen.open + ansiStyles.black.open,
            close: ansiStyles.black.close + ansiStyles.bgGreen.close
        }, intitule.theme.string.diff.insert);

        this.assertEquals({
            open: ansiStyles.bgRed.open + ansiStyles.black.open,
            close: ansiStyles.black.close + ansiStyles.bgRed.close
        }, intitule.theme.string.diff.delete);

        this.assertEquals({
            open: intitule.colors.blue,
            close: ansiStyles.color.close,
        }, intitule.theme.string.diff.equal);

        this.assertEquals({
            open: intitule.colors.green,
            close: ansiStyles.color.close
        }, intitule.theme.string.diff.insertLine);

        this.assertEquals({
            open: intitule.colors.red,
            close: ansiStyles.color.close
        }, intitule.theme.string.diff.deleteLine);
    }

    /** @test */
    it_is_possible_to_style_html()
    {
        let chalk = require('chalk');

        intitule.registerColor('violet', '8a2be2');
        intitule.style('html', {
            name: 'violet',
        });

        this.assertEquals(intitule.colors.violet, intitule.theme.html.name._styles[0].open);
        this.assertEquals(ansiStyles.color.close, intitule.theme.html.name._styles[0].close);
    }

    /** @test */
    with_html_style_it_will_fallback_to_chalk_colors_if_available()
    {
        let chalk = require('chalk');

        intitule.style('html', {
            name: 'cyan',
        });

        this.assertEquals(chalk.cyan._styles, intitule.theme.html.name._styles);
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
