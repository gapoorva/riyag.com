'use strict';
/**
 * Revealer Jquery Plugin
 * @author Apoorva Gupta
 * 
 * Revealer is jQuery plugin that you can use to execute a callback just
 * before a DOM element appears on the screen. This is done by watching for
 * scroll events and then executing configured callback.
 * 
 * It's expected that all elements are present on the DOM before being linked
 * to the revealer. Therefore, it's best to initialize the document when it's
 * loaded and ready.
 * 
 * @example
 * // Add a `revealer` class to the element to link it to the revealer.
 * <div class="revealMe">I will be revealed</div>
 * $('div.revealMe').revealer(callback);
 * 
 * This callback handles reveal events.
 * @callback revealCallback
 * @param {Element} element - the DOM element that is now revealed by scoll.
 * @returns {boolean} if false, element is considered revealed. If true, reveal
 * will be triggered again if the user scrolls to the element again.
 * 
 * @param {revealCallback} revealCallback - called when an element is revealed.
 * It is called immedately once revealer is instatiated if there are any
 * elements on the page that are marked for revealing and are already visible
 * to the user.
 * @param {Number} [revealAt=200] - pixels before showing up on screen that the 
 * callback should be executed. For example if this value is 200, the callback
 * will be executed when the user scrolls and the element is 200 pixels below
 * the bottom of the screen. Defaults to 200
 * @param {Number} [throttle=1000] - milliseconds to thottle revealer. Higher
 * thottle values will make the page more performant, however it will also make
 * the plugin less responsive to fast scolling. 
 * 
 * @returns {jQuery} this, for chaining.
 */

 (function( $ ) {

  function revealer(revealCallback, revealAt=200, throttle=1000) {
    // save the set of elements to reveal
    var elementsToReveal = this;
    var bounds = {top:0, bottom:0};

    function isInRevealZone(el) {
      var elPos = $(el).position().top;
      return (bounds.top <= elPos && elPos <= bounds.bottom);
    }

    function revealAndRemove(index, el) {
      
      return !isInRevealZone(el) || revealCallback(el);
    }

    function revealThings() {
      // set the bounds for the reveal
      bounds.top = $(window).scrollTop();
      bounds.bottom = $(window).scrollTop() + $(window).height() + revealAt;

      // reveal things and then remove them from the list
      elementsToReveal = elementsToReveal.filter(revealAndRemove);
      if (!elementsToReveal.length) {
        $(window).off('scroll');
      }
    }

    // reveal anything in the viewport now
    revealThings();

    

    // reveal things as they come up in the future
    $(window).on('scroll', _throttle(revealThings, throttle, {trailing: false}));
  }
    // extend jquery
    $.fn.revealer = revealer;
 } ( jQuery ));


