/**
 * Bypass Iframe Height Limit
 *
 * Adapted from /wp-includes/js/wp-embed.js
 */
(function ( window, document ) {
	'use strict';

	var supportedBrowser = false;
	
	if ( document.querySelector ) {
		if ( window.addEventListener ) {
			supportedBrowser = true;
		}
	}

	/** @namespace bihl */
	window.bihl = window.bihl || {};

	if ( !! window.bihl.BypassIframeHeightLimit ) {
		return;
	}

	window.bihl.BypassIframeHeightLimit = function( e ) {
		var data = e.data;
		if ( ! ( data.secret || data.message || data.value ) ) {
			return;
		}

		if ( /[^a-zA-Z0-9]/.test( data.secret ) ) {
			return;
		}

		var iframes = document.querySelectorAll( 'iframe[data-secret="' + data.secret + '"]' ),
			i, source, height, sourceURL, targetURL;

		for ( i = 0; i < iframes.length; i++ ) {
			source = iframes[ i ];

			if ( e.source !== source.contentWindow ) {
				continue;
			}

			if ( 'height' === data.message ) {
				// we need to create a style element rather than using inline styles, 
				// because wp-embed.js wipes out any inline styles
				var styleElem = document.getElementById( 'bihl-style-' + source.getAttribute('data-secret') );
				var css = 'iframe.wp-embedded-content[data-secret="' + source.getAttribute('data-secret') 
					+ '"] { height: ' + parseInt( data.value, 10 ) + 'px; }';

				if ( styleElem ) {
					styleElem.innerHTML = css;
				} else {
					var head = document.head || document.getElementsByTagName('head')[0],
					    style = document.createElement('style');

					style.type = 'text/css';
					style.id = 'bihl-style-' + source.getAttribute('data-secret');
					style.appendChild( document.createTextNode(css) );

					head.appendChild( style );
				}
			}

		}
	};

	if ( supportedBrowser ) {
		window.addEventListener( 'message', window.bihl.BypassIframeHeightLimit, false );
	}
})( window, document );
