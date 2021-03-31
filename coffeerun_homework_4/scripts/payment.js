(function (window) {
    'use strict';
    var PAYMENT_SELECTOR = '[data-coffee-order="payment-form"]';
    var App = window.App;
    var $ = window.jQuery;
    var FormHandler = App.FormHandler;
    var formHandler = new FormHandler(PAYMENT_SELECTOR);

    formHandler.addSubmitHandler( function() {
        var title = $('input[name=title]:checked', '#radios').val();
        var name = $('#name').val();
        $('#ex1').html("<p>Thank you for your payment, " + title + " " + name + "!</p><a rel='modal:close'><button id=close>Close</button></a>");
        $("#ex1").modal("show");
        $('#close').on("click", function() {
            window.close();
        });
    });

})(window);