$(function() {

  // Scroll To Top Button

  $('.top-btn').click(function () {
    $('html, body').animate({scrollTop: 0}, 800);
  });

  // Open Menu Button & Close Menu Button

  $('.header .opn-menu-btn, .header .cls-menu-btn').click(function () {
    $('.header .menu').toggleClass('active');
  });

  // Header Color

  if($(this).scrollTop() > 1) {
      $('.header').addClass('active');
  } else {
      $('.header').removeClass('active');
  }

  $(window).scroll(function () {
    if($(this).scrollTop() > 1) {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }
  });

  // Open Popup

  $('.open-popup').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    closeMarkup: '<button title="%title%" type="button" class="cls-btn mfp-close"></button>',
  });
    
  // Menu & Navigation

  $("body").on('click', '[href*="#"]:not(.open-popup)', function(e){
      e.preventDefault();
      var fixed_offset = 70;
      $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
      $('.header .menu').removeClass('active');
      $('body').removeClass('lock');
    });

  // Language Switcher

  var langSwitcher = $('.header .lang-switcher');

  langSwitcher.click(function () {
    $(this).toggleClass('active');
  });

  $(document).click(function (e){
    if (!langSwitcher.is(e.target) && langSwitcher.has(e.target).length === 0) {
          $(langSwitcher).removeClass('active');
    }
  });

  $('.message-area').autoResize();

  // Form Validation

  var lang = $('html').attr('lang');

  var messages = {

    ru: {
      required: 'Это поле обязательно для заполнения.',
      email: 'Введите корректный адрес электронной почты.',
      success: 'Сообщение успешно отправлено.',
      failed: 'Сообщение не отправлено, попробуйте ещё раз.'
    },

    lv: {
      required: 'LV.Это поле обязательно для заполнения.',
      email: 'LV.Введите корректный адрес электронной почты.',
      success: 'LV.Сообщение успешно отправлено.',
      failed: 'LV.Сообщение не отправлено, попробуйте ещё раз.'
    },

    en: {
      required: 'EN.Это поле обязательно для заполнения.',
      email: 'EN.Введите корректный адрес электронной почты.',
      success: 'EN.Сообщение успешно отправлено.',
      failed: 'EN.Сообщение не отправлено, попробуйте ещё раз.'
    },

  };

  var msg = null;

  switch(lang) {
    case 'ru':
      msg = messages.ru;
      break;
    case 'lv':
      msg = messages.lv;
      break;
    case 'en':
      msg = messages.en;
      break;
  }

  $('.contact-form').validate({
    rules: {
        name: {
            required: true,
        },
        contact: {
            required: true,
        },
        phone: {
          required: true,
        },
        email: {
            required: true,
            email: true,
        },
    },
    messages: {
      name: msg.required,
      contact: msg.required,
      phone: msg.required,
      email: {
        required: msg.required,
        email: msg.email,
      },
    },
    errorPlacement: function(error, element) {
        error.appendTo( element.closest('.form-group'));
    },
    submitHandler: function() {
      var dataparam = $('.contact-form').serialize();

      $.ajax({
          type: 'POST',
          async: true,
          url: 'assets/php/sendEmail.php',
          data: dataparam,
          datatype: 'json',
          cache: true,
          global: false,
          beforeSend: function() { 
            $('.preloader').show();
          },
          success: function(data) {
              if(data == 'success'){
                $('.form-notification').append(msg.success);
              } else {
                $('.form-notification').append(msg.failed);
              }
          },
          complete: function() {
              $('.preloader').hide();
          }
      });
    }     
  });

});