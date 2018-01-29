module.exports = class ApplyThemeTest extends TestCase
{
    setUp()
    {
        this.ansiStyles = require('ansi-styles');
    }

	/** @test */
	it_is_possible_to_apply_a_custom_theme_from_the_node_modules_folder()
	{
		intitule.applyTheme('intitule-themes/test-theme');

        this.assertEquals({
            yellow: this.ansiStyles.color.ansi256.rgb(255, 228, 181),
            darkYellow: this.ansiStyles.color.ansi16m.hex('c6ad49'),
            blue: this.ansiStyles.color.ansi256.rgb(36, 176, 213),
            green: this.ansiStyles.color.ansi16m.hex('00ff00'),
            brightGreen: this.ansiStyles.color.ansi16m.hex('9cc55f'),
            brighterGreen: this.ansiStyles.color.ansi16m.hex('b4bc58'),
            red: this.ansiStyles.color.ansi16m.hex('a24344'),
            bgRgbTest: this.ansiStyles.bgColor.ansi256.rgb(141, 213, 102),
            bgHexTest: this.ansiStyles.bgColor.ansi16m.hex('a24344'),
            black: this.ansiStyles.color.ansi16m.hex('000000'),
        }, intitule.colors);
	}
}
