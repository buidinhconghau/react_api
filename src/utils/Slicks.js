const Slicks = () => {
    if (window.$ && window.$.fn.slick) {
      window.$(".list-video-top").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        asNavFor: ".list-video-bottom",
      });
  
      window.$(".list-video-bottom").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".list-video-top",
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: false,
        prevArrow: false,
        infinite: true, // This line ensures the slider loops infinitely
      });
    } else {
      console.error("jQuery hoặc Slick chưa được load!");
    }
  };
export default Slicks;