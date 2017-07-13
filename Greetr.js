// execution context
(function(global, $){

    // return and use function constructor to generate object,
    // so that we doesn't have to always setup the object with the new keyword 
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    Greetr.prototype = {};

    Greetr.init = function (firstName, lastName, language) { 

        var self = this;
        // default values for firstName, lstName and language
        self.firstName = firstName || '';
        self.lastName = lastName || "";
        self.language = language || 'en';

     }
})(window, jQuery);