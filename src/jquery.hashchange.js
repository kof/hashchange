/*
 * hashchange - crossbrowser event implementation using jquery's API for special events
 * 
 * 
 * @depends: jquery.js
 * @version 0.1
 * @license Dual licensed under the MIT and GPL licenses.
 * @author  Oleg Slobodskoi aka Kof ( jsui.de )
 */

;(function( $, window, document ){
    
var type = "hashchange",
    undefined,
    initialized = false,
    // on IE-8 in compatMode to IE-7 is onhashchange not supported
    support = "on" + type in window && ( document.documentMode === undefined || document.documentMode > 7 );

$.fn.hashchange = function( callback ) {
    return callback ? this.bind( type, callback ) : this.trigger( type, callback );        
};
    
// do the whole stuff only the event is not supported
if ( support ) {
    return;
}        
    
function setup( data, namespaces, callback ) {
    if ( !initialized ) {
        initialized = true;
                
        function trigger() {
            $.event.trigger( type, data );
        }  
        
        if ( $.browser.msie ) {
            iframe.init( trigger );        
        } else {
            loopCheck.init( trigger );
        } 
     
    }
}    

function teardown() {
    if ( initialized ) {
        iframe.destroy();
        loopCheck.destroy();
        initialized = false;
    }
}   

/**
 * For all browser without hashchange support and not IE
 */
var loopCheck = (function(){
    var hash, timeout,
        callback;
    function init( _callback ) {
        callback = _callback;
        check();
    } 
    
    function check() {
        if ( window.location.hash !== hash ) {
            hash = window.location.hash;
            callback();
        }
        
        timeout = window.setTimeout( check, 50 );
    }
    
    function destroy() {
        window.clearTimeout( timeout );        
    }
    
    return {
        init: init,
        destroy: destroy    
    };
})();


/**
 * Only for IE6-7
 * Check if iframe hash the same as document
 */

var iframe = (function(){
            
    var $iframe,
        timeout, callback,
        iHash, hash,
        iHashNew, hashNew;    
    
    function init( _callback ) {
        callback = _callback;
        $(function(){
            $iframe = $('<iframe style="display: none;" class="hashchange-iframe"/>').appendTo(document.body);
            hash = location.hash; 
            iHash = iDoc().location.hash;
            check();
        });
    }
    
    function destroy() {
        window.clearTimeout(timeout);
        $iframe && $iframe.remove();
    }    
    
    function check(){
        iHashNew = iDoc().location.hash;
        hashNew = location.hash;
        
        // changed using navigation buttons
        if (iHashNew !== iHash) {
            iHash = iHashNew;
            hash = iHash;
            location.hash = iHash.substr(1);
            callback();
        // changed using link or add method
        } else if (hashNew !== hash) {
            hash = hashNew;
            updateIFrame(hash);
        }
        
        timeout = setTimeout(check, 50);
    }    
    
    // get the document of the iframe
    function iDoc() {
        return $iframe[0].contentWindow.document;
    }
    
    // save value to the iframe
    function updateIFrame(value) {
        iDoc().open();
        iDoc().close();
        iDoc().location.hash = value;
    }  
    
    return {
        init: init,
        destroy: destroy
    };
        
})();



// expose special event
$.event.special[type] = {
    setup: setup,
    teardown: teardown
};
    
})( jQuery, window, document );