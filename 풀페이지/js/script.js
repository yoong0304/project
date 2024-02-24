// 문서가 준비되면 함수 실행
$(function () {
    // 내비게이션바
    $('.main > li > a').mouseenter(function (e) {
        // a태그 기본 이벤트 제거
        e.preventDefault();
        $('.sub').stop().slideDown(400);
        $('.nav_bg').stop().animate({ height: 180 }, 400);
    });
    $('nav').mouseleave(function () {
        $('.sub').stop().slideUp(400);
        $('.nav_bg').stop().animate({ height: 0 }, 400);
    });

    // 섹션1 - 비디오 자동 플레이
    // $('video').get(0).play();

    // 섹션1 - 캐로셀
    let slider = $('.slider').bxSlider({
        // mode: 'horizontal',
        // mode: 'vertical',
        mode: 'fade',
        // 자동 슬라이드
        auto: true,
        // 컨트롤 버튼(좌우, 페이저)을 클릭하면 자동 스크롤 정지
        stopAutoOnClick: true,
        // 슬라이드 위에 hover하면 auto 일시 정지
        autoHover: true,

        // 실행/일시정지 버튼
        // autoControls: true,

        // 내비게이션(인디케이터, 페이저)
        pager: false,

        // 이전/이후 버튼
        controls: false,
        // 전환 시간
        speed: 400,
        // 지연 시간(슬라이드가 정지되어 있는 시간)
        pause: 3000,


        // 슬라이드 전환 직전에 autoPager() 함수를 호출하여 동작 시킴
        onSlideBefore: function () {
            autoPager();
        },
        // 슬라이드 전환 직후 titMotion() 함수를 호출하여 동작 시킴
        onSlideAfter: function () {
            titMotion();
        }
    });

    function titMotion() {
        // 슬라이드 전환 직후의 텍스트 모션
        $('#slideWrap .slider li div').animate({ top: -50, opacity: 1 });
    }

    function autoPager() {
        // 페이저의 이미지 변경
        // 페이저 a태그의 active 클래스 모두 제거
        $('#slideWrap .pager a').removeClass('active');
        // 현재 슬라이드 index번호를 가져와서 currentIdx에 저장
        let currentIdx = slider.getCurrentSlide();
        $('#slideWrap .pager a').eq(currentIdx).addClass('active');

        // 슬라이드 전환 직전의 텍스트 모션
        $('#slideWrap .slider li div').css({ top: 100, opacity: 0 });
    }

    // 페이저 버튼
    $('#slideWrap .pager a').click(function (e) {
        // a태그의 기본이벤트 제거
        e.preventDefault();
        let idx = $(this).index();
        // idx번호에 해당하는
        slider.goToSlide(idx);
        return false;
    });

    // 이전 버튼
    $('#slideWrap #prev').click(function (e) {
        e.preventDefault();
        // 이전 슬라이드로 이동
        slider.goToPrevSlide();
        autoPager();
        return false;
    });
    // 이후 버튼
    $('#slideWrap #next').click(function (e) {
        e.preventDefault();
        // 다음 슬라이드로 이동
        slider.goToNextSlide();
        autoPager();
        return false;
    });

    // 섹션2 - ???
    const sec2 = $('#section2'),
        btn = sec2.find('.btn'),
        txt1 = sec2.find('.txt1'),
        txt2 = sec2.find('.txt2');


    // 윈도우에 스크롤 이벤트가 발생하면 함수 실행
    $(window).scroll(function () {
        // 스크롤바를 스크롤한 양을 st에 지정
        let st = $(this).scrollTop();
        let stValue = 600;


        if (st >= stValue) {
            // css(속성, 값)
            // css({속성, 값, 속성: 값})
            btn.css({ opacity: 1 });
            txt1.css({ left: 360 + 'px' });
            txt2.css({ left: 360 + 'px' });
        } else {
            btn.css({ opacity: 0 });
            txt1.css({ left: -400 + 'px' });
            txt2.css({ left: -400 + 'px' });
        }
    });

    // 섹션3: 탭
    const tabBtn = $('#section3 .thumb li'),
        bigImg = $('#section3 .big li'),
        txt = $('#section3 .txt li');

    tabBtn.click(function () {
        let idx = $(this).index();
        tabBtn.removeClass('active');
        bigImg.removeClass('active');
        txt.removeClass('active');
        $(this).addClass('active');
        bigImg.eq(idx).addClass('active');
        txt.eq(idx).addClass('active');
    });

    // 섹션4: 브랜드 소개
    // 상단 텍스트 모션을 위한 텍스트 복제
    const txtTop = $('.top');
    const txtTopSpan = txtTop.find('span');
    const txtBtm = $('.btm');
    const txtBtmSpan = txtBtm.find('span');

    txtTopSpan.clone().appendTo(txtTop);
    txtBtmSpan.clone().appendTo(txtBtm);


    // 호버 페이드 효과
    const inner = $('.container > div');
    const fade = inner.find('.fade');
    let cnt = 0, idx, timer;

    // fade에 마우스를 올리면
    fade.mouseenter(function () {
        // 마우스를 올린 fade의 부모의 색인 번호를 idx 저장
        // 왼쪽은 0, 오른쪽은 1
        idx = $(this).parent().index();
        // 2초마다 fadeFn 함수를 호출한다.
        timer = setInterval(fadeFn, 2000);
    });
    // fade 위에서 마우스가 벗어나면 함수 실행
    fade.mouseleave(function () {
        // setInterval 정지
        clearInterval(timer);
    });

    function fadeFn() {
        cnt++;
        if (cnt > 2) {
            cnt = 0;
        }
        // idx가 0이면 .story
        // idx가 1이면 .identity
        // cnt: 0, 1, 2
        inner.eq(idx).find('li').eq(cnt).fadeIn(1000).siblings().fadeOut(1000);
    }

    // 패밀리 사이트
    const fs = $('.fs'),
        fsLst = fs.find('ul'),
        fsIcon = fs.find('i'),
        fsTxt = fs.find('span'),
        fsBtn = fs.find('.fsBtn');
    let state = 0;
    // .fsBtn을 클릭하면 함수 실행
    fsBtn.click(function (e) {
        e.preventDefault();
        fsLst.slideToggle();

        /* 삼각형 모양 바꾸기 */
        if (state == 0) {
            // $('선택자').attr(속성, 값); ~ 하나의 속성만
            // $('선택자').attr({HTML속성: 값, 속성: 값}); ~ 여러 개의 속성
            // $('선택자').css({CSS속성: 값, 속성: 값}); ~ 여러 개의 속성
            fsTxt.html('관련 사이트 닫기');
            fsIcon.attr({ class: 'fa-solid fa-minus' });
            state = 1;
        } else {
            fsTxt.text('관련 사이트 열기');
            fsIcon.attr({ class: 'fa-solid fa-plus' });
            state = 0;
        }
    });

    // 풀페이지 레이아웃
    $('.section').mousewheel(function (e, delta) {
        let prev;
        if (delta > 0) {
            prev = $(this).prev().offset().top;
            // console.log(prev);
            $('html').stop().animate({ scrollTop: prev }, 100, 'easeOutExpo');
        } else if (delta < 0) {
            let next = $(this).next().offset().top;
            // console.log(next);
            $('html').stop().animate({ scrollTop: next }, 100, 'easeOutExpo');
            // 937
            
        }
    });
    $(window).scroll(function() {
        let sTop = $(this).scrollTop();
        console.log(sTop);
        if (sTop >= 937) {
            console.log(sTop);
            $('#header').css({background: 'rgb(255, 165, 0)', transition: '.5s'});
        } else{
            $('#header').css({background: 'transparent', transition: '.5s'});
        }
    });
});


