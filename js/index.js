/*
	Canvas exercise by Hans jv.
	Homework for cursos.mejorando.la.
*/
(function(){

	var s = {};

	// Variables
	s.green = '#87bb3f';
	s.scale = 0;
	s.step  = 0;
	s.step_2_progress = 0;
	s.step_3_progress = 0;
	s.txt = [
		'Play again',
		'Is that all?',
		'All your base are belong to us',
		'One more time',
		'Sorry i missed it'
	];

	// Elements
	s.btn     = document.getElementById('refresh');
	s.canvas  = document.getElementById('canvas');
	s.context = s.canvas.getContext("2d");

	window.requestAnimationFrame = window.requestAnimationFrame ||
			window.mozRequestAnimationFrame                     ||
            window.webkitRequestAnimationFrame                  ||
            window.msRequestAnimationFrame;


	/*  ==========================================================================
		Helpers
    	========================================================================== */



    var cancelRequestAnimFrame = (function() {
    	return window.cancelAnimationFrame           ||
        	window.webkitCancelRequestAnimationFrame ||
        	window.mozCancelRequestAnimationFrame    ||
        	window.oCancelRequestAnimationFrame      ||
        	window.msCancelRequestAnimationFrame     ||
        	clearTimeout;
	})();


	var change_btn_txt = function() {
		var number = Math.floor(Math.random()*5);
		s.btn.innerHTML = s.txt[number];
	};

	var hide_btn = function() {

		// Add class
		if (s.btn.classList) {
			s.btn.classList.add('hidden');
		}
		else {
			s.btn.className += ' ' + 'hidden';
		}

		// Remove click
		s.btn.removeEventListener('click', init);
	};

	var show_btn = function() {
		change_btn_txt();

		// Remove class
		if (s.btn.classList) {
			s.btn.classList.remove('hidden');
		}
		else {
			s.btn.className = s.btn.className.replace(new RegExp('(^|\\b)' + 'hidden'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}

		// Add binder
		s.btn.addEventListener('click', init);
	};



	/*  ==========================================================================
		Drawing shapes
    	========================================================================== */

	/*
		Green shape
	*/
	var draw_green = function() {
		// Scale and position
		var trans_x = ((s.canvas.width/s.scale) - s.canvas.width ) / 2,
			trans_y = ((s.canvas.height/s.scale) - s.canvas.height ) / 2;

		s.context.scale(s.scale, s.scale);
		s.context.translate( trans_x , trans_y );

		// Start drawing
		s.context.beginPath();
		s.context.moveTo(453, 175);

		// First line
	    s.context.lineTo(625, 347);
	    s.context.arcTo(678, 400, 625, 453, 75);

	    // Second line
	    s.context.lineTo(453, 624);
	    s.context.arcTo(400, 678, 346, 624, 75);

	    // Third line
	    s.context.lineTo(175, 453);
	    s.context.arcTo(122, 400, 175, 347, 75);

		// Fourth line
	    s.context.lineTo(348, 175);
	    s.context.arcTo(400, 122, 453, 175, 75);

	    // Close
	    s.context.strokeStyle = s.green;
	    s.context.lineWidth = 1;
	    s.context.stroke();
		s.context.fillStyle = s.green;
		s.context.fill();
	    s.context.closePath();
	};


	var draw_white = function() {
		s.context.beginPath();
		s.context.moveTo(432, 207);

		// First line
		s.context.lineTo(493, 267);
		s.context.lineTo(493, 307);
		s.context.lineTo(532, 307);
		s.context.lineTo(593, 367);
		s.context.arcTo(625, 400, 593, 432, 45);

		// Second line
		s.context.lineTo(432, 593);
		s.context.arcTo(400, 625, 367, 593, 45);

		// Third line
		s.context.lineTo(342, 566);
		s.context.lineTo(342, 458);
		s.context.lineTo(233, 458);
		s.context.lineTo(207, 431);
		s.context.arcTo(175, 400, 207, 368, 45);

		// Fourth line
		s.context.lineTo(368, 207);
		s.context.arcTo(400, 175, 432, 207, 45);

		// Close
		s.context.fillStyle = s.green;
	    s.context.closePath();

	};


	/*
		Shadow
	*/
	var draw_shadow = function() {

		var x = 40,
			y = 760;

		s.context.save();
		s.context.scale(10,1);
		s.context.beginPath();

		s.context.arc(x, y, (200 * s.scale / 3), 0, 2 * Math.PI, false);

		var gradient = s.context.createRadialGradient(x, y, 10 * s.scale, x, y, 20 * s.scale);
		gradient.addColorStop(0, 'rgba(210, 210, 210, 1)');
		gradient.addColorStop(1, 'rgba(210, 210, 210, 0)');

		s.context.fillStyle = gradient;
		s.context.fill();
		s.context.closePath();

		s.context.restore();
	};


    /*
		The one in the middle
	*/
	var draw_middle = function() {
		var x = s.step_3_progress - 200;
		var y = 200 - s.step_3_progress;

		s.context.translate(x, y);

		s.context.beginPath();
		s.context.moveTo(366, 321);

		// Trace shape
		s.context.lineTo(479, 321);
		s.context.lineTo(479, 433);
		s.context.lineTo(417, 495);
		s.context.lineTo(417, 383);
		s.context.lineTo(304, 383);
		s.context.lineTo(366, 321);

		// Close
	    s.context.strokeStyle = s.green;
	    s.context.lineWidth = 1;
	    s.context.stroke();
		s.context.fillStyle = s.green;
		s.context.fill();
	    s.context.closePath();
	};


	/*
		The thing
	*/
	var draw_weird_wave = function() {
		s.context.beginPath();
		s.context.translate(0, 550 - (s.step_2_progress * 15));

		// Top side
		s.context.moveTo(150, 150);

		var wave =  3 * ( (s.step_2_progress * 4.5 ) -105 );

		s.context.quadraticCurveTo(237, 150 + wave, 375, 150);
    	s.context.quadraticCurveTo(512, 150 - wave, 650, 150);


		// Other Sides
		s.context.lineTo(650, 650);
		s.context.lineTo(150, 650);
		s.context.lineTo(150, 150);

		// Close
		s.context.fillStyle = '#fff';
		s.context.fill();
	    s.context.closePath();
	};


	/*  ==========================================================================
		Animations
    	========================================================================== */


	var animate_green = function() {

		draw_green();

		if ( s.step > 1.5 ) {
			return;
		}

		if ( s.scale < 1.155 && s.step === 1 ) {
			s.scale = s.scale * 1.2;
		}

		else if ( s.scale >= 1.1 || (s.step === 1.5 && s.scale > 1) ) {
			s.scale = s.scale / 1.06;
			s.step = 1.5;
		}

		else if ( s.step === 1.5 && s.scale < 1 ) {
			s.scale = 1;
		}

		else if ( s.step === 1.5 && s.scale === 1 ) {
			s.context.save();
			s.step = 2;
		}
	};


	var animate_middle = function() {

		if ( s.step < 3 ) {
			return;
		}

    	draw_middle();

    	if ( s.step < 4 && s.step_3_progress < 200 ) {
    		s.step_3_progress = s.step_3_progress + 25;
    	}
    	else if ( s.step < 4 && s.step_3_progress >= 200 ) {
    		s.step = 4;
    		cancelRequestAnimFrame(s.animation_frame);
    		show_btn();
    	}
    };

    var animate_white = function() {
    	draw_white();

    	if ( s.step < 2 ) {
    		return;
    	}

    	s.context.clip();
    	draw_weird_wave();

    	if ( s.step < 3 ) {
			s.step_2_progress ++;

			if (s.step_2_progress > 35 ) {
				s.step = 3;
			}
		}
    };


    var start_animations = function() {
		// Reset canvas
		s.context.setTransform(1,0,0,1,0,0);
		s.context.clearRect(0, 0, s.canvas.width, s.canvas.height);

		draw_shadow();
		animate_green();
		animate_white();

		s.context.setTransform(1,0,0,1,0,0);
		animate_middle();


		s.animation_frame = window.requestAnimationFrame(start_animations);
	};



    /*  ==========================================================================
		Init
    	========================================================================== */


	var init = function() {
		// Change button
		hide_btn();

		// Reset canvas
		cancelRequestAnimFrame(s.animation_frame);
		s.context.restore();

		s.scale = 0.01;
		s.step = 1;
		s.step_2_progress = 1;
		s.step_3_progress = 1;

		// Start
		start_animations();
	};

	init();

})();