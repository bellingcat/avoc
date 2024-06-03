define('module/router', function() {
    return {
        pushState: function(data, name) {
            const address = window.location.protocol+'//'+window.location.pathname;
            const params = JSON.stringify(data);
            window.history.pushState(data, '', address+'?'+name+'='+params);
        },
        getParam: function(name) {
            return new URLSearchParams(window.location.search).get(name);
        },
        hasParam: function(name) {
            return new URLSearchParams(window.location.search).has(name);
        }
    }
});