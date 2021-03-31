(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class RemoteDataStore {
        constructor(url) {
            console.log('running the DataStore function');
            if (!url) { throw new Error('No remote URL supplied.'); }

            this.serverURL = url;
        }
        ajaxposthelper(type, url, val) {
            var fields = {};
            for (let key in val) {
                fields[key] = {'stringValue': val[key]};
            }
            var data = {'fields': fields};
            $.ajax({ type: type, url: url, contentType: 'application/json',
                data: JSON.stringify(data), success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                },
            });
        }
        ajaxhelper(type, url, cb) {
            $.ajax({ type: type, url: url, contentType: 'application/json',
                success: function(response) { 
                    // console.log('function returned: ' + JSON.stringify(response));
                    if (cb !== undefined) { 
                        cb(response['documents']); }
                }
            });
        }
        add(key, val) { this.ajaxposthelper('POST',   this.serverURL + '/projects/coffeerun-2d222/databases/(default)/documents/orders',            val); }
        get(key, cb)  { this.ajaxhelper    ('GET',    this.serverURL + '/projects/coffeerun-2d222/databases/(default)/documents/orders' + '/' + key, cb); }
        getAll(cb)    { this.ajaxhelper    ('GET',    this.serverURL + '/projects/coffeerun-2d222/databases/(default)/documents/orders',             cb); }
        remove(key)   { this.ajaxhelper    ('DELETE', this.serverURL + '/' + key); } 
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
    
})(window);