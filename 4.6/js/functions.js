var options = {pointers: 1};

function ipadSwipe() {
	new Hammer(document, options).on('swipeleft', function(ev) {
		ev.preventDefault();
		var nextpage = $.mobile.activePage.next('[data-role="page"]');
		var firstpage = $.mobile.activePage.siblings('#page1');
		if (nextpage.length) {
			$.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
			$('#menu li.active').removeClass('active').next().addClass('active');
		} else {
			$.mobile.changePage(firstpage, { transition: "slide", reverse: false }, true, true);
			$('#menu li.active').removeClass('active');
			$('#menu li:first-child').addClass('active');
		}
	});
	
	new Hammer(document, options).on('swiperight', function(ev) {
		ev.preventDefault();
		var prevpage = $.mobile.activePage.prev('[data-role="page"]');
		var lastpage = $.mobile.activePage.siblings('#page4');
		if (prevpage.length) {
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
            $('#menu li.active').removeClass('active').prev().addClass('active');
        } else {
			$.mobile.changePage(lastpage, {transition: "slide", reverse: true}, true, true);
			$("#menu li.active").removeClass("active");
      		$("#menu li:last-child").addClass("active");
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
	
	$('a').on('click touchend', function(e) {
		var el = $(this);
		var link = el.attr('href');
		window.location = link;
	});
	
    $('#resize li:first-child a').on('tap',function () {
		$('body').addClass('large');
		localStorage.setItem('fontSize','large');
    });
	
    $('#resize li:nth-child(2) a').on('tap',function () {
          $('body').removeClass('large');
		  localStorage.removeItem('fontSize');
    });
	
});

$(window).load(function() {
	ipadSwipe();
});