module.exports = class ThemeTest extends TestCase
{
	/** @test */
	it_is_possible_to_specify_a_color_in_rgb_format()
	{
		intitule.registerColor('red', [255, 0, 0]);

		dd(intitule.colors.red);
	}
}

// 

// intitule.registerColors({
//     yellow: [252, 127, 0],
//     blue: [36, 176, 213],
//     green: [141, 213, 102],
// });

// intitule.style('null', 'yellow.bold');

// let theme = {
//     colors: {
//         red: 'f00000',
//     },
//     markup: {
//         boolean: 'red',
//     }
// }

// intitule.theme(theme);





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
