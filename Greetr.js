// execution context
(function(global, $){

    // return and use function constructor to generate object,
    // so that we doesn't have to always setup the object with the new keyword 
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }
    
    // some private vars 
    const supportedLangs = ['en', 'es'];

    const greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    const formalGreetings = {
        en: 'Greetings ',
        es: 'Saludos'
    };

    const logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };

    Greetr.prototype = {

        fullName: function () { 
            return this.firstName + " " + this.lastName;
         },
        validate: function () { 
            // check if language is supported
            if(supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
         },
         greeting: function () { 
             return greetings[this.language] + ' ' + this.firstName + '!';
          },
        formalGreeting: function () { 
            return formalGreetings[this.language] + ', ' + this.firstName + ' ' + this.lastName;
         },
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

            return this;
         },
        setLang: function (language) { 
            this.language = language;
            this.validate();

            return this;

         }
    }; // Greet.prototype object literal

    Greetr.init = function (firstName, lastName, language) { 

        var self = this;
        // default values for firstName, lstName and language
        self.firstName = firstName || '';
        self.lastName = lastName || "";
        self.language = language || 'en';

     }
     
     // all objects created from .init should point to Greeter prototype
     Greetr.init.prototype = Greetr.prototype;

     global.Greetr = global.G$ = Greetr;
})(window, jQuery);