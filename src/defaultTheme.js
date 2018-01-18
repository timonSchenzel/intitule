module.exports = {
	colors: {
		yellow: [252, 127, 0],
        blue: [36, 176, 213],
        green: [141, 213, 102],
	},

	style: {
        boolean: 'yellow.bold',

        circular: {
            color: 'grey',
            text: '[Circular]',
        },

        date: {
            invalid: {
                color: 'red',
                text: 'invalid',
            },
            value: 'blue',
        },

        diffGutters: {
            actual: {
                color: 'red',
                text: '- ',
            },
            expected: {
                color: 'green',
                text: '+ ',
            },
            padding: '  ',
        },

        error: {
            ctor: {
                open: 'grey.open' + '(',
                close: ')' + 'grey.close'
            },
            name: 'magenta',
        },

        function: {
            name: 'blue',
            stringTag: 'magenta',
        },

        global: 'magenta',

        item: {
            after: {
                color: 'grey',
                text: ',',
            },
        },

        list: {
            openBracket: {
                color: 'yellow',
                text: '[',
            },
            closeBracket: {
                color: 'yellow',
                text: ']',
            },
        },

        mapEntry: {
            after: {
                color: 'grey',
                text: ',',
            },
        },

        maxDepth: {
            color: 'grey',
            text: '…',
        },

        null: 'bold.yellow',

        number: 'bold.blue',

        object: {
            openBracket: {
                color: 'yellow',
                text: '{',
            },
            closeBracket: {
                color: 'yellow',
                text: '}',
            },
            ctor: 'blue',
            stringTag: {
                color: 'magenta',
                text: '@',
            },
            secondaryStringTag: {
                color: 'grey',
                text: '@',
            },
        },

        property: {
            after: {
                color: 'grey',
                text: ',',
            },
            keyBracket: {
                open: {
                    color: 'grey',
                    text: '[',
                },
                close: {
                    color: 'grey',
                    text: ']',
                },
            },
            valueFallback: {
                color: 'grey',
                text: '…',
            },
        },

        // react: {
        //     functionType: this.forceColor.grey('\u235F'),
        //     openTag: {
        //         start: this.forceColor.grey('<'),
        //         end: this.forceColor.grey('>'),
        //         selfClose: this.forceColor.grey('/'),
        //         selfCloseVoid: ' ' + this.forceColor.grey('/')
        //     },
        //     closeTag: {
        //         open: this.forceColor.grey('</'),
        //         close: this.forceColor.grey('>')
        //     },
        //     tagName: this.ansiStyles.magenta,
        //     attribute: {
        //         separator: '=',
        //         value: {
        //             openBracket: this.forceColor.grey('{'),
        //             closeBracket: this.forceColor.grey('}'),
        //             string: {
        //                 line: {open: this.forceColor.blue('"'), close: this.forceColor.blue('"'), escapeQuote: '"'}
        //             }
        //         }
        //     },
        //     child: {
        //         openBracket: this.forceColor.grey('{'),
        //         closeBracket: this.forceColor.grey('}')
        //     }
        // },

        regexp: {
            source: {
                color: 'blue',
                open: {
                    color: 'blue',
                    text: '/',
                },
                close: {
                    color: 'blue',
                    text: '/',
                },
            },
            flags: 'yellow',
        },

        stats: {
            separator: {
                color: 'grey',
                text: '---',
            },
        },

        string: {
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
                insert: 'bg-green.black',
                delete: 'bg-red.black',
                equal: 'blue',
                insertLine: 'green',
                deleteLine: 'red',
            }
        },

        symbol: 'yellow',

        typedArray: {
            bytes: 'yellow',
        },

        undefined: 'yellow',
	},
};
