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




    //overlay

    $(document).on("click", "#overlay", function () {
        console.log($(this));
        $(".sidebar").addClass("hide-sidebar");
        $("#overlay").css("display", "none")
    })





     //pages

    $(document).on("click",".pages" , function(e){
        e.preventDefault();
        $(".pages-list").removeClass("d-none");
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



  //tab-menu


   
const tabLink = document.querySelectorAll(".tab-menu-link");
const tabContent = document.querySelectorAll(".tab-bar-content");

tabLink.forEach((item) => {
    item.addEventListener("click", activeTab);
});

function activeTab(item) {
    const btnTarget = item.currentTarget;
    const content = btnTarget.dataset.content;

    tabContent.forEach((item) => {
        item.classList.remove("is-active");
    });

    tabLink.forEach((item) => {
        item.classList.remove("is-active");
    });

    document.querySelector("#" + content).classList.add("is-active");
    btnTarget.classList.add("is-active");
}



//tab-menu slider
$('.cards').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});










//basket


let cardBtns=document.querySelectorAll("#tab-menu .tab-bar .cards .product-card .add-btn button");

let products=[];
  
 if(localStorage.getItem("basket")!=null)
{
    products=JSON.parse(localStorage.getItem("basket"));
}
cardBtns.forEach(btn => {
    btn.addEventListener("click",function(e){
        e.preventDefault();

      let productImg=this.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.getAttribute("src");

      let productName=this.parentNode.parentNode.children[2].children[1].innerText;

      let productPrice=parseInt(this.parentNode.parentNode.children[3].children[1].children[0].innerText);

      let  productId=parseInt(this.parentNode.parentNode.getAttribute("data-id"));
      
      let existProduct=products.find(m=>m.id==productId)
         if(existProduct!=undefined){
           existProduct.count+=1;
         
         }
         else{
            products.push({
            id:productId,
            img:productImg,
            name:productName,
            price:productPrice,
            count:1
               
           })
         }

           
       localStorage.setItem("basket",JSON.stringify(products));

       getBasketCount(products) 

    })
});
   

function getBasketCount(arr){
    let sum=0;
    for (const item of arr) {
        sum+=item.count;
    }
 document.querySelector("#nav-area .cal-bucket .cart .count").innerText=sum;
 
}


getBasketCount(products)




 //SHOP-ICON-TABLE

 let shopIcon=document.querySelector("#nav-area .cal-bucket .cart i")
 
 let table =document.querySelector("#nav-area .spCard-dropdown .table tbody")
shopIcon.addEventListener("click",function(){

   

})


});