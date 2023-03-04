$(document).ready(function () {

//responsiv navbar

$(document).on("click", ".hamburger-menu",function(){
    $(".sidebar").removeClass("hide-sidebar");
    $("#overlay").css("display","block")
})

$(document).on("click",".x-icon" ,function(){
    $(".sidebar").addClass("hide-sidebar");
    $("#overlay").css("display","none")
})

$(document).on("click",".sidebar-pages",function(e){
    e.preventDefault()
    $(".sidebar-pages-list").toggleClass("d-none");
})

    //curency drop-down

    $(document).on("click", ".currency", function () {
        $(".valyuta").toggleClass("d-none")
        $(".language-area").addClass("d-none");
    })

    $(document).on("click", ".usd-btn", function () {
        let usdText = $(".usd-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(usdText);
        $(".valyuta").addClass("d-none");

    })

    $(document).on("click", ".eur-btn", function () {
        let eurText = $(".eur-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(eurText);
           $(".valyuta").addClass("d-none")
    })
    $(document).on("mouseout", ".valyuta", function (){
      
    })


     //language drop-down

    $(document).on("click", ".language", function (e) {
        e.preventDefault()

        $(".language-area").toggleClass("d-none");
        $(".valyuta").addClass("d-none")

    });
    $(document).on("click", ".language-area button", function () {
        let btnText = $(this).html();
        $(".language").children().eq(0).html(btnText + `<i class="fa-solid fa-sort-down"></i>`);
        $(".language-area").addClass("d-none");

    })
    //basket icon 



$(document).on("click", "#nav-area .cart", function (e) {
    e.preventDefault()

    $(".spCard-dropdown").toggleClass("d-none");
    

});
 
    //slider

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });










})