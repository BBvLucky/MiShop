$(document).ready(function () {

    //Выпадающее меню
    $('.header-nav-menu-btn').on('click', function () {
        $('.header-nav-link').toggleClass('toggle');
        $('.middle').toggleClass('close');
    })
    $('.header-nav-link').on('click', function () {
        $(this).addClass('toggle');
        $('.middle').toggleClass('close');
    })

    //Анимация "якорей"
    $('.jq-anchor').on('click', function (e) {
        e.preventDefault();
        let scroll = $(this).attr('href'),
            top = $(scroll).offset().top;

        $('body, html').animate({
            scrollTop: top
        }, 500)
    })

    //"Показать/скрыть" всё
    $('.portfolio-show-more').on('click', function () {
        $('.portfolio').toggleClass('portfolio-xpand');
        $(this).toggleClass('portfolio-show-more-hide');
        if ($(this).hasClass('portfolio-show-more-hide')) {
            $(this).html('<a href="#portfolio" class="jq-anchor portfolio-show-more-link"><p>скрыть</p></a>');
        } else {
            $(this).html('<p>показать все</p>')
        }
    })

    //Прогресс бар

    function animProgress(persent, $element) {
        $element.find('div').animate({
            width: persent + '%'
        }, 500).html(persent);
    }

    $(document).on('scroll', function () {
        if ($(this).scrollTop() > $('#about').offset().top) {
            $('.skills-progressbar').each(function (i) {
                animProgress($('.skills-progressbar-bar').eq(i).text(), $(this))
            })
        }
    })

    //Кнопка "наверх"
    let $upBtn = $('.desktop-up-btn');
    $upBtn.hide()
    $(document).on('scroll', function () {
        if ($(document).scrollTop() > 40) {
            $upBtn.show(600);
        } else {
            $upBtn.hide(300)
        }
    })
})