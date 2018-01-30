module.exports = class ApplyThemeTest extends TestCase
{
    setUp()
    {
        this.ansiStyles = require('ansi-styles');
        this.fs = require('fs');
    }

	/** @test */
	it_is_possible_to_apply_a_custom_theme_from_the_node_modules_folder()
	{
		intitule.applyTheme('intitule-themes/test-theme');

        this.assertEquals(this.ansiStyles.color.ansi256.rgb(255, 228, 181), intitule.colors.yellow);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('c6ad49'), intitule.colors.darkYellow);
        this.assertEquals(this.ansiStyles.color.ansi256.rgb(36, 176, 213), intitule.colors.blue);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('00ff00'), intitule.colors.green);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('9cc55f'), intitule.colors.brightGreen);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('b4bc58'), intitule.colors.brighterGreen);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('a24344'), intitule.colors.red);
        this.assertEquals(this.ansiStyles.bgColor.ansi256.rgb(141, 213, 102), intitule.colors.bgRgbTest);
        this.assertEquals(this.ansiStyles.bgColor.ansi16m.hex('a24344'), intitule.colors.bgHexTest);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('000000'), intitule.colors.customBlack);
	}

    /** @test */
    it_will_apply_theme_settings_found_in_intitule_dot_config_dot_js_file()
    {
        this.fs.writeFileSync('intitule.config.js', `module.exports = {
    extend: 'default',
    colors: {
        customRed: 'a24344',
        red: 'ff0000',
    }
};`);

        let localIntitule = new (require('../src/Intitule'));

        this.assertEquals(this.ansiStyles.color.ansi256.rgb(252, 127, 0), localIntitule.colors.yellow);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('c6ad49'), localIntitule.colors.darkYellow);
        this.assertEquals(this.ansiStyles.color.ansi256.rgb(36, 176, 213), localIntitule.colors.blue);
        this.assertEquals(this.ansiStyles.color.ansi256.rgb(141, 213, 102), localIntitule.colors.green);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('9cc55f'), localIntitule.colors.brightGreen);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('b4bc58'), localIntitule.colors.brighterGreen);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('ff0000'), localIntitule.colors.red);
        this.assertEquals(this.ansiStyles.bgColor.ansi256.rgb(141, 213, 102), localIntitule.colors.bgRgbTest);
        this.assertEquals(this.ansiStyles.bgColor.ansi16m.hex('a24344'), localIntitule.colors.bgHexTest);
        this.assertEquals(this.ansiStyles.color.ansi16m.hex('a24344'), localIntitule.colors.customRed);

        this.fs.unlinkSync('intitule.config.js');
    }
}
