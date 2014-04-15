define(['svg', 'events', 'colors', 'header', 'eventsManager', 'helpers'],
	function (SVG, events, colors, header, E, h) {
	'use strict';

	var App = {
		sel: {
			header: document.getElementsByTagName('header')[0],
			container: document.getElementById('container'),
			wrap: document.getElementsByClassName('wrap')[0],
			demoButtons: document.getElementsByClassName('demos')[0],
			controlButtons: document.getElementsByClassName('controls')[0],
		},
		currentAnimation : '',
		priorAnimation: '',
		defaultAnimation: 'Four',
		animations: {},
		viewportSize: {},
		numOfColorSchemes: colors.length,
		debug: true,
		// modal: modal,

		setup: function () {
			App.viewportSize.width = document.documentElement.clientWidth;
			App.viewportSize.height = document.documentElement.clientHeight;

			App.sel.container.style.width = App.viewportSize.width + 'px';
			App.sel.container.style.height = App.viewportSize.height - App.sel.header.clientHeight - 4 + 'px';

			App.colorScheme = colors[Math.floor(Math.random() * App.numOfColorSchemes)];

			App.draw = SVG('container').fixSubPixelOffset();
			App.parentGroup = App.draw.group().attr('class', 'parentGroup');

			// App.priorAnimation = App.defaultAnimation;
			App.currentAnimation = App.defaultAnimation;
		},

		demoSwitch: function (Demo) {
			var module = Demo.selectedDemo;

			App.priorAnimation = App.currentAnimation;
			App.currentAnimation = module;

			App.resetPrior();

			if (App.animations[module] !== undefined) {
				if(App.debug) console.log('App: module already loaded');
				App.animations[module].init();
				return;

			} else {
				require(['demos/demo' + module], function (ModuleObject) {

					if(App.debug) console.log('App: loading module', 'demos/demo'+module);

					App.animations[module] = ModuleObject(App);

					App.animations[module].init();
				});
			}
		},

		resetPrior: function() {
			if(App.debug) console.log('App: resetting', App.priorAnimation);
			var type = 'soft';
			if (App.priorAnimation !== App.currentAnimation) {
				type = 'hard';
			}

			if(App.animations[App.priorAnimation]) {
				App.animations[App.priorAnimation].reset(type);
			}
		},

		appinit: function () {
			App.setup();
			header.init();
			E.subscribe('app/demoSwitch', App.demoSwitch);
			App.demoSwitch({selectedDemo: App.defaultAnimation})
		}

	};

	return App;

});
