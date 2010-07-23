hashchange - crossbrowser event implementation using jquery's API for special events
====================================================================================

There is no extra API to learn. Just bind and unbind hashchange on window or use the shorthand notation.

    $(window).bind( "hashchange", function() {
        alert( "hash changed: " + location.hash.substr(1) );
    });
    
    $(window).unbind( "hashchange");


use namespaced events

    $(window).bind( "hashchange.test", function() {
        alert( "hash changed: " + location.hash.substr(1) );
    });
    
    $(window).unbind( ".test");

use handler reference to unbind

    $(window).bind( "hashchange", handler);
    
    function handler() {
        alert( "hash changed: " + location.hash.substr(1) );
    }
    
    $(window).unbind( "hashchange", handler );

shorthand notation

    $(window).hashchange(function(){
        alert( "hash changed: " + location.hash.substr(1) );
    });

trigger hashchange event

    $(window).hashchange();
    
    $(window).trigger("hashchange");