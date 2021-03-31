(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) { 
            throw new Error("No selector provided"); 
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    };

    CheckList.prototype.addClickHandler = function (fn) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    CheckList.prototype.init = function (coffeeOrder) {
        for (let i in coffeeOrder) {
            var emailAddress = coffeeOrder[i]['fields']['emailAddress']['stringValue'];
            var size = coffeeOrder[i]['fields']['size']['stringValue'];
            var flavor = coffeeOrder[i]['fields']['flavor']['stringValue'];
            var coffee = coffeeOrder[i]['fields']['coffee']['stringValue'];
            var strength = coffeeOrder[i]['fields']['strength']['stringValue'];
            var name = coffeeOrder[i]['name']
            // this.removeRow(emailAddress);
            var rowElement = new Row(emailAddress, size, flavor, coffee, strength, name);
            this.$element.append(rowElement.$element);
        }
    }

    CheckList.prototype.addRow = function (coffeeOrder) {
        var emailAddress = coffeeOrder.emailAddress;
        var size = coffeeOrder.size;
        var flavor = coffeeOrder.flavor;
        var coffee = coffeeOrder.coffee;
        var strength = coffeeOrder.strength;
        this.removeRow(emailAddress);
        var rowElement = new Row(emailAddress, size, flavor, coffee, strength);
        this.$element.append(rowElement.$element);
    }

    CheckList.prototype.removeRow = function (email) {
        this.$element
          .find('[value="' + email + '"]')
          .closest('[data-coffee-order="checkbox"]')
          .remove();
    };

    function Row(emailAddress, size, flavor, coffee, strength, name) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox', class: 'checkbox'
        });

        var $label = $('<label></label>')

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: name
        });

        var description = size + ' ';
        if (flavor) {
            description += flavor + ' ';
        }

        description += coffee + ', ';
        description += ' (' + emailAddress + ')';
        description += ' [' + strength + 'x]';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;

})(window);