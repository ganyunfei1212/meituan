var mySwiper = new Swiper('.swiper-container', {
    autoplay: {
        delay: 2000,//2秒切换一次
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        dynamicMainBullets: 2
      }
})
