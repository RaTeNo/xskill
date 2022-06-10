$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()

	AOS.init();

	const scroller = scrollama();
	// setup the instance, pass callback functions
	scroller.setup({
		step: ".pre_title"
	})
	.onStepEnter((response) => {				
		setTimeout(() => $(response.element).removeClass("animate__heartBeat"), 0);
		setTimeout(() => $(response.element).addClass("animate__heartBeat"), 100);		
	})
	.onStepExit((response) => {	
	});

	//animate__fadeInUp

	// Заголовки
	if (window.innerWidth > 767) {
		const el = document.querySelectorAll('.js-key-features-badge')

		if (el.length) {
			el.forEach(element => {
				let parent = element.closest('.step'),
					scroller = scrollama()

				scroller.setup({
					step: parent,
					progress: true,
					offset: 1
				}).onStepProgress(response => {
					if (response.progress > 0.7) {
						element.style.setProperty('--progress', 1)
						parent.querySelector('.key-features__wrapper').style.setProperty('--progress', 1)
					} else {
						element.style.setProperty('--progress', response.progress)
						parent.querySelector('.key-features__wrapper').style.setProperty('--progress', response.progress)
					}
				})
			})
		}
	}


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header .menu').toggleClass('show')
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.modal_cont')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			parent.find('.mini_modal').addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('.mini_modal .close_btn').click((e) => {
		e.preventDefault()

		$('.mini_modal, .mini_modal_btn').removeClass('active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header .menu').removeClass('show')
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})




$(window).on('load', () => {
	// Элементы первого блока
	startOffsetTop = 280
	endOffsetTop = $('.first_section .btn').offset().top
	endOffsetLeft = $('.first_section .btn').offset().left + ($('.first_section .btn').width() * 0.25)
	items = $('.first_section .items .item')
	itemsOffsets = []
	path = endOffsetTop - startOffsetTop

	items.each(function () {
		itemsOffsets.push({
			offsetTop: $(this).offset().top,
			offsetLeft: $(this).offset().left
		})
	})

	$(window).on('scroll', () => {
		// Элементы первого блока
		if ($(window).scrollTop() > startOffsetTop && $(window).scrollTop() < endOffsetTop) {
			let distance = $(window).scrollTop() / path - startOffsetTop / path + 50 / path

			items.each(function (index) {
				let itemPathTop = endOffsetTop - itemsOffsets[index].offsetTop,
					itemPathLeft = endOffsetLeft - itemsOffsets[index].offsetLeft
				$(this).css({
					'margin-top': itemPathTop * distance + 'px',
					'margin-left': itemPathLeft * distance + 'px'
				})
			})
		}
	})

})




$(window).scroll(function () { // Когда страница прокручивается
  	const scroller_num = scrollama();
	// setup the instance, pass callback functions
	scroller_num.setup({
		step: ".stats",
		offset: 0.8
	})
	.onStepEnter((response) => {				
		numAnimate()	
	})
	.onStepExit((response) => {	
	});
});


function numAnimate(){
	$('.stats .item .val').spincrement({
        thousandSeparator: "",
        duration: 2000
    });
}



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})