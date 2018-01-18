global.intitule = new (require('./src/Intitule'));
global.ansiStyles = require('ansi-styles');

intitule.makeGlobal();

global.Foo = class Foo
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

global.fooInstance = new Foo;
