/**
 * slides | jQuery plugin
 * Copyright (C) 2010 - 2011 Oktober Media DA
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 * @author Erling Owe <owe@oktobermedia.no>
 * @copyright Oktober Media DA, 2010 - 2011
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