$(document).ready(function () {


    //responsiv navbar

    $(document).on("click", ".hamburger-menu", function () {
        $(".sidebar").removeClass("hide-sidebar");
        $("#overlay").css("display", "block")
    })

    $(document).on("click", ".x-icon", function () {
        $(".sidebar").addClass("hide-sidebar");
        $("#overlay").css("display", "none")
    })

    $(document).on("click", ".sidebar-pages", function (e) {
        e.preventDefault()
        $(".sidebar-pages-list").toggleClass("d-none");
    })







    //USD

    $(document).on("click", ".currency", function () {
        $(".valyuta").toggleClass("d-none")
        $(".language-area").addClass("d-none")
    })


    $(document).on("click", ".usd-btn", function () {
        let usdText = $(".usd-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(usdText);
        $(".valyuta").addClass("d-none")
    })

    $(document).on("click", ".eur-btn", function () {
        let eurText = $(".eur-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(eurText);
        $(".valyuta").addClass("d-none")
    })






    //language

    $(document).on("click", ".language", function (e) {
        e.preventDefault();
        $(".language-area").toggleClass("d-none")
        $(".valyuta").addClass("d-none")
    })


    $(document).on("click", ".language-area button", function () {
        let btnText = $(this).html();
        $(".language").children().eq(0).html(btnText + `<i class="fa-solid fa-sort-down"></i>`)
        $(".language-area").addClass("d-none")
    })




    //area kenarina toxunanda hemin hissenin silinmesi

    document.addEventListener("click", function (e) {


        if (!!!e.target.closest(".language")) {
            if (!$(".language-area").hasClass("d-none")) {
                $(".language-area").addClass("d-none")
            }
        }



        if (!!!e.target.closest(".currency")) {
            if (!$(".valyuta").hasClass("d-none")) {
                $(".valyuta").addClass("d-none")
            }
        }


        if (!!!e.target.closest(".cart")) {
            if (!$(".chek-card-box").hasClass("d-none")) {
                $(".chek-card-box").addClass("d-none")
            }
        }

        if (!!!e.target.closest(".pages")) {
            if (!$(".pages-list").hasClass("d-none")) {
                $(".pages-list").addClass("d-none")
            }
        }

    })




    //overlay

    $(document).on("click", "#overlay", function () {
        $(".sidebar").addClass("hide-sidebar");
        $("#overlay").css("display", "none")
    })





    //pages

    $(document).on("click", ".pages", function (e) {
        e.preventDefault();
        $(".pages-list").removeClass("d-none");
    })





    //slider

    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });






    //tab-menu //Tabs Action


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








    //modal


    let icons = document.querySelectorAll(".tab-bar .cards .product-card .icons .eye-icon");

    let cards = document.querySelectorAll(".tab-bar .cards .product-card");

    let modal = document.querySelector(".tab-bar .moddal .modall");





    for (const card of cards) {
        for (const icon of icons) {


            icon.addEventListener("click", function () {

                document.querySelector(".moddal").style.display = "block"
                document.querySelector(".modall").classList.remove("d-none")
                document.querySelector(".moddal").classList.remove("d-none")
                document.querySelector("#overlay").style.display = "block";
                document.body.style.overflow = "hidden"

                let prodImg = icon.parentNode.previousElementSibling.firstElementChild.firstElementChild.getAttribute("src");
                let prodName = icon.parentNode.nextElementSibling.lastElementChild.innerText;
                let prodPrice = icon.parentNode.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerText;
                let productId = icon.parentNode.parentNode.getAttribute("data-id");
                modal.querySelector(".img img").setAttribute("src", prodImg);
                modal.querySelector(".text1 h2").innerText = prodName;
                modal.querySelector(".texts .price1 del").innerText = prodPrice * 2;
                modal.querySelector(".text2 p").innerText = "$" + prodPrice;
                modal.setAttribute("data-id", productId)


            })
        }

    }




    window.addEventListener("click", function (e) {
        if (e.target == document.querySelector(".moddal")) {
            document.querySelector(".moddal").classList.add("d-none")
            document.querySelector(".modall").classList.add("d-none");
            document.querySelector("#overlay").style.display = "none";
            this.document.body.style.overflow = "unset"
        }
    })


    let iconDelete = document.querySelector(".modall .iconca a i");
    iconDelete.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".moddal").classList.add("d-none")
        document.querySelector(".modall").classList.add("d-none")
        document.querySelector("#overlay").style.display = "none";
        document.body.style.overflow = "unset"
    })











    //basket

    let cardBtns = document.querySelectorAll("#tab-menu .tab .tab-bar .cards .product-card .add-btn button");

    let products = [];


    if (localStorage.getItem("basket") != null) {
        products = JSON.parse(localStorage.getItem("basket"));

    }
    cardBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault()
            document.querySelector("#nav-area .chek-card-box .alert").classList.add("d-none")
            document.querySelector("#nav-area .chek-card-box .subtotal").classList.remove("d-none")

            let productImage = this.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.getAttribute("src");
            let productName = this.parentNode.parentNode.children[2].children[1].innerText;
            let productPrice = parseInt(this.parentNode.parentNode.children[3].children[1].children[0].innerText);
            let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));

            let existProduct = products.find(m => m.id == productId);

            if (existProduct != undefined) {
                existProduct.count += 1;
                existProduct.price = productPrice * existProduct.count;
            }
            else {

                products.push({
                    id: productId,
                    img: productImage,
                    name: productName,
                    price: productPrice,
                    count: 1

                })

            }

            localStorage.setItem("basket", JSON.stringify(products));


            getBasketCount();
            chekCard()
            subTotal();
            deleteIcons()

        })
    });







    function getBasketCount() {
        let sum = 0;

        for (const item of products) {

            sum += item.count;
        }

        document.querySelector(".count").innerText = sum;
        document.querySelector(".check-card .count").innerText = sum + " ITEM";

    }

    getBasketCount();


    //basket icon 

    $(document).on("click", "#nav-area .cart", function (e) {
        e.preventDefault()

        $(".chek-card-box").toggleClass("d-none");


    });





    //Check-card

    function chekCard() {
        let chekCard = document.querySelector("#nav-area .chek-card-item")

        chekCard.innerHTML = "";
        for (const product of products) {
            let nativePrice = product.price / product.count;
            document.querySelector("#nav-area .chek-card-box .alert").classList.add("d-none")
            document.querySelector("#nav-area .chek-card-box .subtotal").classList.remove("d-none")
            chekCard.classList.remove("d-none")

            chekCard.innerHTML += `
        <div class="chek-card-item" data-id = ${product.id}>
            
            <div class="product-detail">
                <div class="text">
                    <p>${product.name}</p>
                    <span>${product.count} x ${nativePrice}</span>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-trash-can delete-icon"></i>
                </div>
            </div>
        </div>
       `
        }

    }


    chekCard()


    //checkCard total

    function subTotal() {
        let sum = 0;
        for (const product of products) {
            sum += product.price;
        }
        document.querySelector(".subtotal span").innerText = `$${sum}.00`;
        document.querySelector(".basket-subtotal ").innerText = `$${sum}.00`;

    }

    subTotal();




    //delete from check card

    function deleteFromChekCard(id) {
        products = products.filter(m => m.id != id)

        localStorage.setItem("basket", JSON.stringify(products));
        subTotal();
        getBasketCount()
    }




    function deleteIcons() {
        let deletIcons = document.querySelectorAll("#nav-area .chek-card-box .chek-card-item .icon .delete-icon");
        deletIcons.forEach(deletIcon => {

            deletIcon.addEventListener("click", function () {
                let id = this.parentNode.parentNode.parentNode.getAttribute("data-id")
                deleteFromChekCard(id);
                this.parentNode.parentNode.remove();



                if (products.length == 0) {
                    localStorage.removeItem("basket")
                    document.querySelector("#nav-area .chek-card-box .alert").classList.remove("d-none")
                    document.querySelector("#nav-area .chek-card-box .subtotal").classList.add("d-none")
                    document.querySelector("#nav-area .chek-card-box  .chek-border").classList.add("d-none")
                }

            })
        });
    }

    deleteIcons();







    //WISHLIST

    function clickIconWishlist() {
        let heartIcon = document.querySelectorAll("#tab-menu .tab-bar .product-card .icons .heart")


        let productsWishlist = [];

        if (localStorage.getItem("wishlist") != null) {
            productsWishlist = JSON.parse(localStorage.getItem("wishlist"));

        }
        heartIcon.forEach(icon => {

            icon.addEventListener("click", function (e) {

                e.preventDefault();
                let productImage = this.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.getAttribute("src")

                let productName = this.parentNode.nextElementSibling.children[1].innerText;

                let productPrice = parseInt(this.parentNode.parentNode.children[3].children[1].children[0].innerText);

                let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));

                let existProduct = productsWishlist.find(m => m.id == productId);


                if (existProduct != undefined) {
                    productsWishlist = productsWishlist.filter(m => m.id != productId);
                    icon.classList.add("fa-regular");
                    icon.classList.remove("fa-solid", "added")
                }
                else {
                    productsWishlist.push({
                        id: productId,
                        img: productImage,
                        name: productName,
                        price: productPrice,


                    })
                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid", "added")


                }

                localStorage.setItem("wishlist", JSON.stringify(productsWishlist));


            })



            if (productsWishlist.find(m => m.id == parseInt(icon.parentNode.parentNode.getAttribute("data-id"))) != undefined) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid", "added");

            } else {

                icon.classList.add("fa-regular");
                icon.classList.remove("fa-solid", "added");
            }
        });




    }
    clickIconWishlist();




    //product detail locala add etmek ve product detailde hemin productu gostermek

    let productsDetail = [];

    if (localStorage.getItem("productsDetail") != null) {
        productsDetail = JSON.parse(localStorage.getItem("productsDetail"));

    }


    let productImgs = document.querySelectorAll(".cards .img-area");

    for (const productImg of productImgs) {
        productImg.addEventListener("click", function () {

            let prodImg = this.firstElementChild.firstElementChild.getAttribute("src");
            console.log(prodImg)
            let prodName = this.nextElementSibling.nextElementSibling.lastElementChild.innerText;
            let prodPrice = this.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerText;

            productsDetail.push({
                img: prodImg,
                name: prodName,
                price: prodPrice
            })

            localStorage.setItem("productsDetail", JSON.stringify(productsDetail));


        })
    }


  
})

