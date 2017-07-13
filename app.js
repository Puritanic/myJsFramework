var g = G$('John', 'Doe');



$('#login').click(function () { 
    var loginGrtr = G$('John', 'Doe');

    $('#loginDiv').hide();

    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
 })


