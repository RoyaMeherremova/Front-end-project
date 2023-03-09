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


    //overlay

    $(document).on("click", "#overlay", function () {
        console.log($(this));
        $(".sidebar").addClass("hide-sidebar");
        $("#overlay").css("display", "none")
    })


    //pages

    $(document).on("click", ".pages", function (e) {
        e.preventDefault();
        $(".pages-list").removeClass("d-none");
    })

    //basket icon 



    $(document).on("click", "#nav-area .cart", function (e) {
        e.preventDefault()

        $(".spCard-dropdown").toggleClass("d-none");


    });







    //BASKET


    let tableBody = document.querySelector("#products .basket-products .table tbody")

    let products = JSON.parse(localStorage.getItem("basket"));


    function getBaksetDatas(){
      if (products != null) {
        for (const product of products) {
            tableBody.innerHTML += `<tr data-id="${product.id}">
       <td><img src="${product.img}" alt=""></td>
       <td>${product.name}</td>
       <td>$${product.price}</td>
       <td>
        <button class="minus"><i class="fa-solid fa-minus"></i></button>
        
        <input value="${product.count}" type="text"disabled>
        <button class="plus"><i class="fa-solid fa-plus"></i></button>
        </td>
    <td class="price">$${product.price * product.count}</td>
    <td><i class="fa-solid fa-x delete-icon"></i></td>
     </tr>`
        }
        getBasketCount(products);

    } else {
        showAlert()
    }   
    }
   
    getBaksetDatas();

    //FOR SHOP-ICON COUNT

    function getBasketCount(arr) {
        let sum = 0;
        for (const item of arr) {
            sum += item.count;
        }
        document.querySelector("#nav-area .cal-bucket .cart .count").innerText = sum;

    }

    


    function showAlert() {
        document.querySelector(".basket-products .table").classList.add("d-none")
        document.querySelector("#products .show-alert").classList.remove("d-none")
    }


  

    function deleteIdProductFromBasket(id) {
        products = products.filter(m => m.id != id)

        localStorage.setItem("basket", JSON.stringify(products));
    }


    function deleteProduct() {
        let deleteIcons = document.querySelectorAll("#products .basket-products .table .delete-icon")

        deleteIcons.forEach(deleteIcon => {
            deleteIcon.addEventListener("click", function () {
                let id = this.parentNode.parentNode.getAttribute("data-id")
                deleteIdProductFromBasket(id);
                this.parentNode.parentNode.remove();
                if (products.length == 0) {
                    localStorage.removeItem("basket");
                    showAlert();
                }
                getBasketCount(products)
                showTotalPrice();
            })
        });
    }

    deleteProduct(); 

    function showTotalPrice() {
        let title = document.querySelector("#products .table tr td:nth-child(5) span")

        let sum = 0;
        for (const item of products) {
            sum += parseInt(item.price * item.count)
        }
        title.innerHTML = "Grand total: $" + sum;



    }

    function decreaseProduct() {
        let minusIcons = document.querySelectorAll("tbody tr td .minus")


        for (const minusIcon of minusIcons) {



            minusIcon.addEventListener("click", function () {

                for (const product of products) {
                    if (product.id == minusIcon.parentNode.parentNode.getAttribute("data-id")) {

                        if (product.count == 1) {
                            return;

                        } else {

                            minusIcon.nextElementSibling.value--;

                            product.count--;

                            minusIcon.parentNode.nextElementSibling.innerText = "$" + product.price * product.count;
                        }
                    }



                }
                localStorage.setItem("basket", JSON.stringify(products))
                getBasketCount(products);
                showTotalPrice();
            })

        }
    }

    function increaseProduct() {
        let plusIcons = document.querySelectorAll("tbody tr td .plus")

        for (const plusIcon of plusIcons) {

            plusIcon.addEventListener("click", function () {


                for (const product of products) {
                    if (product.id == plusIcon.parentNode.parentNode.getAttribute("data-id")) {
                        plusIcon.previousElementSibling.value++;

                        product.count++;

                        plusIcon.parentNode.nextElementSibling.innerText = "$" + product.price * product.count;


                    }
                    localStorage.setItem("basket", JSON.stringify(products))
                    getBasketCount(products);
                    showTotalPrice();
                }
            })
        }


    }

    decreaseProduct();
    increaseProduct();




   









})