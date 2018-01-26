module.exports = {
	colors: {
		yellow: [252, 127, 0],
        blue: [36, 176, 213],
        green: [141, 213, 102],
        red: 'a24344',
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
                insert: 'bgGreen.black',
                delete: 'bgRed.black',
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

        html: {
            // keyword: chalk.blue,
            // built_in: chalk.cyan,
            // type: chalk.cyan.dim,
            // literal: chalk.blue,
            // number: chalk.green,
            // regexp: chalk.red,
            // string: chalk.greenBright,
            // subst: chalk.reset,
            // symbol: chalk.reset,
            // class: chalk.blue,
            // function: chalk.yellow,
            // title: chalk.reset,
            // params: chalk.reset,
            // comment: chalk.green,
            // doctag: chalk.green,
            // meta: chalk.grey,
            // 'meta-keyword': chalk.reset,
            // 'meta-string': chalk.reset,
            // section: chalk.reset,
            // tag: chalk.green,
            // name: chalk.green,
            // 'builtin-name': chalk.reset,
            // attr: chalk.yellow,
            // attribute: chalk.reset,
            // variable: chalk.reset,
            // bullet: chalk.reset,
            // code: chalk.reset,
            // emphasis: chalk.italic,
            // strong: chalk.bold,
            // formula: chalk.reset,
            // link: chalk.underline,
            // quote: chalk.reset,
            // 'selector-tag': chalk.reset,
            // 'selector-id': chalk.reset,
            // 'selector-class': chalk.reset,
            // 'selector-attr': chalk.reset,
            // 'selector-pseudo': chalk.reset,
            // 'template-tag': chalk.reset,
            // 'template-variable': chalk.reset,
            // addition: chalk.green,
            // deletion: chalk.red,

            /**
             * keyword in a regular Algol-style language
             */
            keyword: 'blue',

            /**
             * built-in or library object (constant, class, function)
             */
            built_in: 'cyan',

            /**
             * user-defined type in a language with first-class syntactically significant types, like
             * Haskell
             */
            type: 'cyan.dim',

            /**
             * special identifier for a built-in value ("true", "false", "null")
             */
            literal: 'blue',

            /**
             * number, including units and modifiers, if any.
             */
            number: 'green',

            /**
             * literal regular expression
             */
            regexp: 'red',

            /**
             * literal string, character
             */
            string: 'greenBright',

            /**
             * parsed section inside a literal string
             */
            subst: 'reset',

            /**
             * symbolic constant, interned string, goto label
             */
            symbol: 'reset',

            /**
             * class or class-level declaration (interfaces, traits, modules, etc)
             */
            class: 'blue',

            /**
             * function or method declaration
             */
            function: 'yellow',

            /**
             * name of a class or a function at the place of declaration
             */
            title: 'reset',

            /**
             * block of function arguments (parameters) at the place of declaration
             */
            params: 'reset',

            /**
             * comment
             */
            comment: 'green',

            /**
             * documentation markup within comments
             */
            doctag: 'green',

            /**
             * flags, modifiers, annotations, processing instructions, preprocessor directive, etc
             */
            meta: 'grey',

            /**
             * keyword or built-in within meta construct
             */
            'meta-keyword': 'reset',

            /**
             * string within meta construct
             */
            'meta-string': 'reset',

            /**
             * heading of a section in a config file, heading in text markup
             */
            section: 'reset',

            /**
             * XML/HTML tag
             */
            tag: 'green',

            /**
             * name of an XML tag, the first word in an s-expression
             */
            name: 'green',

            /**
             * s-expression name from the language standard library
             */
            'builtin-name': 'reset',

            /**
             * name of an attribute with no language defined semantics (keys in JSON, setting names in
             * .ini), also sub-attribute within another highlighted object, like XML tag
             */
            attr: 'yellow',

            /**
             * name of an attribute followed by a structured value part, like CSS properties
             */
            attribute: 'reset',

            /**
             * variable in a config or a template file, environment var expansion in a script
             */
            variable: 'reset',

            /**
             * list item bullet in text markup
             */
            bullet: 'reset',

            /**
             * code block in text markup
             */
            code: 'reset',

            /**
             * emphasis in text markup
             */
            emphasis: 'italic',

            /**
             * strong emphasis in text markup
             */
            strong: 'bold',

            /**
             * mathematical formula in text markup
             */
            formula: 'reset',

            /**
             * hyperlink in text markup
             */
            link: 'underline',

            /**
             * quotation in text markup
             */
            quote: 'reset',

            /**
             * tag selector in CSS
             */
            'selector-tag': 'reset',

            /**
             * #id selector in CSS
             */
            'selector-id': 'reset',

            /**
             * .class selector in CSS
             */
            'selector-class': 'reset',

            /**
             * [attr] selector in CSS
             */
            'selector-attr': 'reset',

            /**
             * :pseudo selector in CSS
             */
            'selector-pseudo': 'reset',

            /**
             * tag of a template language
             */
            'template-tag': 'reset',

            /**
             * variable in a template language
             */
            'template-variable': 'reset',
        }
	},
};
