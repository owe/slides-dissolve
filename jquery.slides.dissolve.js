/**
 * Dissolve transition for slides | jQuery plugin
 * Copyright (C) 2013 Vecora AS
 *
 * Released under the MIT license and GNU GPLv3
 *
 * @author Erling Owe <owe@vecora.com>
 * @copyright Vecora AS, 2013
 */


(function($) {
	
	var defaultOptions = {
		speed: 200
	};
	
	var opts;
	
	$.slides.registerTransition({
		
		name: 'dissolve',
		
		transition: function(o, callback) {

			var currentSlide = o.slides.eq(o.index);
			var newSlide = o.slides.eq(o.transitionTo);

			o.slides.css('z-index', '0');
	    	currentSlide.css('z-index', '1');
			
	
	
			// GPU accelerate if possible.
			if (Modernizr.csstransitions) {

				newSlide.show();

				o.slides.css('-webkit-transition', 'opacity ' + (opts.speed / 1000) + 's ease');
				o.slides.css('-moz-transition', 'opacity ' + (opts.speed / 1000) + 's ease');
				o.slides.css('-o-transition', 'opacity ' + (opts.speed / 1000) + 's ease');
				
				currentSlide.css('opacity', '0');
			
				// Clean up and call callback.
				currentSlide.one('webkitTransitionEnd oTransitionEnd transitionend', function() {
					o.slides.css('-webkit-transition', 'initial');
					o.slides.css('-moz-transition', 'initial');
					o.slides.css('-o-transition', 'initial');
					currentSlide.hide().css('opacity', '1');
					callback();
				});
			
			} else {
	
		 		newSlide.hide().css('z-index', '2');
				newSlide.fadeIn(opts.speed, function() {
					currentSlide.hide();
					callback();
				});
				
			}

		},
		
		init: function(o) {
			
			opts = jQuery.extend({}, defaultOptions, o.options);
			
			o.slides.not(o.slides.eq(o.index)).hide();
			
		}

	});
	
})(jQuery);