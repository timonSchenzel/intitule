require('./bootstrap');

// console.log(intitule.theme.html.name);

// process.exit();

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
