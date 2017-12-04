'use strict';

$(document).ready(function(){
    // intitialize all foundation components
    $(document).foundation()

    // set up revealer
    $('img.revealer').revealer(loadImage);
});

/**
 * loadImage takes a jQuery reference to element and attempts to switch the
 * src of the image to the URL stored in the element's data-src attribute, if
 * one exists. If the element doesn't have this attribute or is not an image,
 * the function returns immediately as a sucessful substitution.
 * 
 * If substitution was successful, it returns false. 
 * @param {jQuery} e the jQuery element of the img tag to load.
 */
function loadImage(e) {
    var el = $(e);
    if (!el.is('img')) return false;
    
    var src = el.data('src');
    if (src) {
        el.attr('src', src);
        return true;
    } else {
        return false;
    }
}