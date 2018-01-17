let intitule = new (require('../src/Intitule'));

intitule.registerColor('red', [255, 0, 0]);
intitule.registerColors({
    red: 'ff0000',
});

intitule.style('boolean', 'red.bold');

intitule.style({
    boolean: 'blue.bold'
});

// let theme = {
//     colors: {
//         red: 'f00000',
//     },
//     markup: {
//         boolean: 'red',
//     }
// }

// intitule.theme(theme);

intitule.makeGlobal();

let Foo = class Foo
{
    constructor()
    {
        this.foo = 'bar';

        this.bar = true;

        this.baz = null;

        this.buz = 1;

        this.array = [
            1,
            2,
            3
        ];

        this.object = {
            foo: 'bar',
            bar: 123,
        }
    }
}

let fooInstance = new Foo;

dump();
dump('');
dump(true);
dump(false);
dump(null);
dump(1234567890);
dump('foo');
dump([1,2,3]);
dump({1:1,2:2,3:3});
dump({foo: 'bar', bar: 'baz', 'number': 22});
dump(Foo);
dump(fooInstance);
dump(`
	<html>
	<body>

	<h2 title="I'm a header">The title attribute</h2>

	<p title="I'm a tooltip">
	Mouse over this paragraph, to display the title attribute as a tooltip.
	</p>

	</body>
	</html>
`);
diff('foo', 'bar');
diff('foo', 'foobar');
diff('foobar', 'bar');
dd('done.');
