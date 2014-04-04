define(function () {
    'use strict';
    return {
        stopTimer: function (timer) {
            window.clearTimeout(timer);
        },

        // set the with of the parent element. If no width is provided
        // it sets the with too 100%, else to the given parameter in pixels
        drawWidth: function (width, height) {
            var elem = document.getElementById('SvgjsSvg1000'),
                width = width + 'px' || '100%',
                height = height + 'px' || elem.clientHeight;

            elem.style.width = width;
            elem.style.height = height;
        },

        // generate a random integer between the provided parameters
        // if only one parameter is provided, it is assumed that it is a @max
        // not a min, therefore the @min becomes a 0
        genRandom: function (min, max) {
            if (typeof(max) === 'undefined') {
                max = min;
                min = 0;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;

        }
    };

});