let intitule = new (require('../src/Intitule'));

intitule.makeGlobal();

dump();
dump('');
dump(true);
dump(false);
dump(null);
dump(1);
dump('hit');
dump([1,2,3]);
dump({foo: 'bar', bar: 'baz'});
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