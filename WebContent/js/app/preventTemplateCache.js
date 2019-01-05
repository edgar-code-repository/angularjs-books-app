'use strict';

angular
	.module("myApp")
	.factory('preventTemplateCache', function() {
		var randomValue = Math.random();

		return {
			'request': function(config) {
				if (config.url.indexOf('views') !== -1) {
					config.url = config.url + '?t=' + randomValue;
				}

				return config;
			}
		}
	});

angular
	.module("myApp")
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('preventTemplateCache');
	});