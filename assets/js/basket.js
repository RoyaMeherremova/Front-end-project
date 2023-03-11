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
    $(document).on("mouseout", ".valyuta", function () {

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


    //icons




    //pages

    $(document).on("click", ".pages", function (e) {
        e.preventDefault();
        $(".pages-list").removeClass("d-none");
    })








    //basket icon 



    $(document).on("click", "#nav-area .cart", function (e) {
        e.preventDefault()

        $(".chek-card-box").toggleClass("d-none");


    });






    //get-basket product


    let tableBody = document.querySelector("#products .basket-products .table tbody");

    let products = JSON.parse(localStorage.getItem("basket"));

    function getBasketDatas() {
        if (products != null) {
            for (const product of products) {
                let nativePrice = product.price / product.count;

                tableBody.innerHTML += `
                    <tr data-id="${product.id}">
                    <td>
                    <img src="${product.img}" alt="">
                    </td>
                    <td>${product.name}</td>
                    <td>$ ${nativePrice}.00</td>
                    <td>
                        <button class = "minus"><i class="fa-solid fa-minus"></i></button>
                        <input value = "${product.count}" type="text"disabled>
                        <button class = "plus"><i class="fa-solid fa-plus "></i></button>
                    </td>
                    <td class="price"> $ ${nativePrice * product.count}.00</td>
                    <td><i class="fa-solid fa-x delete-icon"></i></td>
                </tr>`
            }

            getBasketCount();
            showTotalPrice();

        } else {

            showAlert()
        }


    }

    getBasketDatas();


    //alert
    function showAlert() {

        document.querySelector(".basket-products .table").classList.add("d-none");
        document.querySelector("#products .show-alert").classList.remove("d-none")

    }


    //basket delete


    function deleteIdProductFromBasket(id) {
        products = products.filter(m => m.id != id)

        localStorage.setItem("basket", JSON.stringify(products));
        showTotalPrice();
        subTotal();

    }


    function deleteIcon() {
        let deletIcons = document.querySelectorAll("#products .basket-products .table .delete-icon");

        deletIcons.forEach(deletIcon => {

            deletIcon.addEventListener("click", function () {
                let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"))
                let chekCard = document.querySelector("#nav-area .chek-card-item")
                deleteIdProductFromBasket(id);

                this.parentNode.parentNode.remove();
                
                for (const checkCardElement of chekCard.children) {
                    if (checkCardElement.getAttribute("data-id") == id) {
                        checkCardElement.remove();
                        document.querySelector("#nav-area .chek-card-box .alert").classList.remove("d-none")
                        document.querySelector("#nav-area .chek-card-box .subtotal").classList.add("d-none")
                    }
                }

                if (products.length == 0) {
                    localStorage.removeItem("basket")
                    showAlert();
                }
                getBasketCount(products);
                showTotalPrice();

            })
        });
    }

    deleteIcon();

    //basket total

    function showTotalPrice() {
        let total = document.querySelector("#products .table tr td:nth-child(5) span");
        let sum = 0;

        for (const product of products) {
            sum += parseInt(product.price)
        }
        total.innerHTML = "Grand total: $" + sum;
    }



    function decreaseProduct() {

        let minusIcons = document.querySelectorAll("tbody tr td  .minus");

        for (const minusIcon of minusIcons) {

            minusIcon.addEventListener("click", function () {

                for (const product of products) {
                    if (product.id == minusIcon.parentNode.parentNode.getAttribute("data-id")) {
                        if (minusIcon.nextElementSibling.value == 1) {
                            return;
                        }
                        else {
                            let nativePrice = parseInt(product.price / product.count)
                            minusIcon.nextElementSibling.value--;

                            product.count--;
                            product.price = nativePrice * product.count

                            minusIcon.parentNode.nextElementSibling.innerText = "$" + (product.price);
                        }

                    }
                }

                localStorage.setItem("basket", JSON.stringify(products))
                showTotalPrice();
                getBasketCount();
            })

        }
    }
    decreaseProduct();

    function increaseProduct() {
        let plusIcons = document.querySelectorAll("tbody tr td  .plus");

        for (const plusIcon of plusIcons) {
            plusIcon.addEventListener("click", function () {

                for (const product of products) {
                    if (product.id == plusIcon.parentNode.parentNode.getAttribute("data-id")) {
                        let nativePrice = parseInt(product.price / product.count)

                        plusIcon.previousElementSibling.value++;
                        product.count++;
                        product.price = nativePrice * product.count
                        plusIcon.parentNode.nextElementSibling.innerText = "$" + (product.price);
                    }
                }

                localStorage.setItem("basket", JSON.stringify(products))
                showTotalPrice();
                getBasketCount(products);

            })

        }
    }
    increaseProduct();

    function getBasketCount() {
        let sum = 0;

        for (const item of products) {

            sum += item.count;
        }

        document.querySelector(".count").innerText = sum;
        document.querySelector(".check-card .count").innerText = sum + " ITEM";

    }
    getBasketCount();








    //Check-card

    function chekCard() {
        let chekCard = document.querySelector("#nav-area .chek-card-item")

        chekCard.innerHTML = "";
        for (const product of products) {
            document.querySelector("#nav-area .chek-card-box .alert").classList.add("d-none")
            document.querySelector("#nav-area .chek-card-box .subtotal").classList.remove("d-none")
            let nativePrice = product.price / product.count;
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
            deleteIcons();
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
                for (const bodyElement of tableBody.children) {
                    if (bodyElement.getAttribute("data-id") == id) {
                        bodyElement.remove();
                    }
                }
                if (products.length == 0) {
                    localStorage.removeItem("basket")
                    document.querySelector("#nav-area .chek-card-box .alert").classList.remove("d-none")
                    document.querySelector("#nav-area .chek-card-box .subtotal").classList.add("d-none")
                    document.querySelector("#nav-area .chek-card-box  .chek-border").classList.add("d-none")
                    showAlert();
                }
                getBasketCount(products);
                subTotal();
            
            })
        });
    }

    deleteIcons();


  






})