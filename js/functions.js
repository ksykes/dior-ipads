var options = {pointers: 1};

function ipadSwipe() {
	new Hammer(document, options).on('swipeleft', function(ev) {
		ev.preventDefault();
		var nextpage = $.mobile.activePage.next('[data-role="page"]');
		if ((nextpage.length > 0) && (!panzoomRunning)) {
			$.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
			$('#menu li.active').removeClass('active').next().addClass('active');
		}
	});
	
	new Hammer(document, options).on('swiperight', function(ev) {
		ev.preventDefault();
        var prevpage = $.mobile.activePage.prev('[data-role="page"]');
		if ((prevpage.length > 0) && (!panzoomRunning)) {
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
            $('#menu li.active').removeClass('active').prev().addClass('active');
        }
	});
}

$(document).ready(function() {
	
	if (localStorage.getItem('fontSize') != null) {
		$('body').addClass('large');
	}
	
	var pageActive = window.location.hash.substr(1);
		
	if(pageActive != '') {
		$('#menu li.'+pageActive).addClass('active');
	} else {
		$('#menu li:first-child').addClass('active');
	}
	
	$('#more').on('click touchend', function(e) {
		$('#description').fadeIn(300);
	});
	
	$('#description a').on('click touchend', function(e) {
		$('#description').fadeOut(300);
	});
	
    $('#resize li:first-child a').on('tap',function (event) {
		event.preventDefault();
		$('body').addClass('large');
		localStorage.setItem('fontSize','large');
    });
	
    $('#resize li:nth-child(2) a').on('tap',function (event) {
		event.preventDefault();
        $('body').removeClass('large');
		localStorage.removeItem('fontSize');
    });
	
});

$(window).load(function() {
	ipadSwipe();
});