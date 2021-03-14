(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var App = window.App;

    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        var payment = window.open('payment.html', 'popup', 'width=600,height=700');
        var popupTick = setInterval(function() {
            if (payment.closed) {
                clearInterval(popupTick);
                console.log('window closed!');
                myTruck.createOrder.bind(myTruck);
                checkList.addRow.call(checkList, data);
            }
          }, 500);
    });
    console.log(formHandler);

})(window);