(function (window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        console.log('In Truck constructor');
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function (order) {
        console.log(order);
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    }

    Truck.prototype.deliverOrder = function(Id) {
        console.log('Delivering order for ' + Id);
        this.db.remove(Id);
    }

    Truck.prototype.printOrders = function(fn) {
        var customerIdArray = this.db.getAll(fn);
    }


    App.Truck = Truck;
    window.App = App;
})(window);