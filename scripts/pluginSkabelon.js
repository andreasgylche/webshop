(function($) {
	'use strict';

	// Tilføjer plugin til fn så det kan bruges normalt
	$.fn.pluginSkabelon = function (options) {

		// Options
		// Sætter default options, hvis der ikke sendes noget med
		let defaultOptions = {
		
		};
		
		let opts = $.extend(true, {}, defaultOptions, options);

		// Går gennem alle elementer der matcher selector = idx=index, el=element
		return this.each(function (idx, el) {

			$('ul.tabs li').click(function(){
				var tab_id = $(this).attr('data-tab');

				$('ul.tabs li').removeClass('current');
				$('.tab-content').removeClass('current');

				$(this).addClass('current');
				$("#"+tab_id).addClass('current');
			})
			
		});
	};

})(jQuery);