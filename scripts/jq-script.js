$(function () {

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

    //Прогресс бар, инициализация ф-ции

    function animProgress(persent, $element) {
        $element.find('div').animate({
            width: persent + '%'
        }, 500);
    }

   
            

    
    //Кнопка "наверх"
    let $upBtn = $('.desktop-up-btn');
    $upBtn.hide()
    
    //Запускаем несколько событий при скролле
    $(document).on('scroll', function () {
        
        //скрыть/показать кнопку "наверх"
        if ($(document).scrollTop() > 40) {
            $upBtn.show(600);
        } else {
            $upBtn.hide(300)
        }
        
        //запуск анимации прогрессбаров в разделе "навыки"
        if ($(this).scrollTop() > $('#skills').offset().top - 600) {
            //присваивание функции к каждому прогрессбару
           $('.skills-progressbar').each(function (i) {
            animProgress($('.skills-progressbar-bar').eq(i).text(), $(this))
        })
        }
    })
})