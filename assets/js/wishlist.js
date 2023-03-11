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





    //WISLIST


    let tableBodyWislist = document.querySelector("#products .wishlist-products table tbody");
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    function getWishlistDatas() {

        if (wishlist != null) {
            for (const product of wishlist) {

                tableBodyWislist.innerHTML += `<tr data-id="${product.id}">
            <td><img src="${product.img}" alt=""></td>
            <td><a href="">${product.name}</a></td>
            <td class="price">${product.price}.00</td>
            <td><i class="fa-solid fa-x delete"></i></td>
          </tr>`

            }

        } else {
            showAlertWishlist();
        }

    }

    getWishlistDatas();

    function showAlertWishlist() {
        document.querySelector(".wishlist-products .table").classList.add("d-none");
        document.querySelector("#products .show-alert").classList.remove("d-none")
    }



    function deleteProductFromWishlistStorage(id) {
        wishlist = wishlist.filter(m => m.id != id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));


    }



    function deleteWishlistProduct() {
        let deleteIconsWishlist = document.querySelectorAll("#products .wishlist-products table tbody .delete")
        deleteIconsWishlist.forEach(deleteIcon => {
            deleteIcon.addEventListener("click", function () {

                let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"));

                deleteProductFromWishlistStorage(id);
                this.parentNode.parentNode.remove();

                if (wishlist.length == 0) {
                    localStorage.removeItem("wishlist")
                    showAlertWishlist()
                }
            })

        });

    }
    deleteWishlistProduct();



    function clearAllProductsWishlist() {
        let clearBtn = document.querySelector("#products .wishlist-products table .clear-btn")
        clearBtn.addEventListener("click", function () {
            localStorage.removeItem("wishlist");

            showAlertWishlist()
        })
    }

    clearAllProductsWishlist()
})


