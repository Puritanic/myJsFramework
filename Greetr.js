
// execution context
// we should insert semicolon in front of the library in case some other code loaded before this file is not properly using semicolons
;(function(global, $){

    // return and use function constructor to generate object,
    // so that we doesn't have to always setup the object with the new keyword 
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }
    
    // some private vars 
    const supportedLangs = ['en', 'es', 'jp', 'ru'];
    // informal greetings
    const greetings = {
        en: 'Hello',
        es: 'Hola',
        jp: 'やあ',
        ru: 'Привет'
    };
    // formal greetings
    const formalGreetings = {
        en: 'Greetings ',
        es: 'Saludos',
        jp: 'こんにちは',
        ru: 'Здравствуйте'
    };
    // logger messages
    const logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        jp: 'ログイン  イン',
        ru: 'вход для клиентов'
    };
    // prototype holds methods (to save memory space)
    Greetr.prototype = {

        fullName: function () { 
            return this.firstName + " " + this.lastName;
         },
        validate: function () { 
            // check if language is supported
            // references the externally inaccessible 'supportedLangs' within the closure
            if(supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
         },
        // retrieve messages from object by referring to properties using [] syntax
         greeting: function () { 
             return greetings[this.language] + ' ' + this.firstName + '!';
          },
        formalGreeting: function () { 
            return formalGreetings[this.language] + ', ' + this.firstName + ' ' + this.lastName;
         },
        // chainable methods return their own containing object
        greet: function (formal) { 
            var msg;
            // if undefined or null t will be coerced to false 
            // if formal, then formal greet, otherwise use normal greet
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            // and output it to the console if available
            if(console) {
                console.log(msg);
            }

            // this refers to the calling object at execution time
            // also makes method chainable by returning this
            return this;
         }, // greet 
        log: function () { 
            // IE doesn't have console available by default
            // so we check here if we can write to console
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            // make chainable
            return this;
         },
        setLang: function (language) { 
            // set the language
            this.language = language;
            // validate
            this.validate();
            // make chainable
            return this;

         },
         // jQuery method, that accepts selector
         // checks if it is formal or not formal 
        HTMLGreeting: function (selector, formal) { 
            if(!$){
                throw 'jQuery not loaded';
            }
            if(!selector) {
                throw 'Missing jQuery selector!';
            }
            // determine the message
            var msg;
            if(formal){
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            // chainable
            return this;
         }
    }; // Greet.prototype object literal

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function (firstName, lastName, language) { 

        var self = this;
        // default values for firstName, lstName and language
        self.firstName = firstName || '';
        self.lastName = lastName || "";
        self.language = language || 'en';

        self.validate();
     }
     
     // all objects created from .init should point to Greeter prototype
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
     Greetr.init.prototype = Greetr.prototype;

    // attach Greetr to the global object, and provide a shorthand '$G' 
     global.Greetr = global.G$ = Greetr;
})(window, jQuery);