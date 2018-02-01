require('./bootstrap');

let variable;
dumpValue(variable);

dumpValue('');

dumpValue(true);

dumpValue(false);

dumpValue(null);

dumpValue(1234567890);

dumpValue('foo');

dumpValue([1,2,3]);

dumpValue({1:1,2:2,3:3});

dumpValue({foo: 'bar', bar: 'baz', 'number': 22});

dumpValue(Foo);

dumpValue(fooInstance);

console.log('Dump: unformatted html');
dump(`<ul><li>Foo</li><li>Bar</li><li>Baz</li></ul>`);
console.log();

console.log('Dump: formatted html');
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
console.log();

console.log('Dump: diff');
diff('foo', 'bar');
console.log();

console.log('Dump: diff');
diff('foo', 'foobar');
console.log();

console.log('Dump: diff');
diff('foobar', 'bar');
console.log();

console.log();
dd('done.');

function dumpValue(value)
{
	console.log('Dump: ' + typeof value);
	dump(value);
	console.log();
}
