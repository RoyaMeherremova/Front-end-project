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

        $(".spCard-dropdown").toggleClass("d-none");


    });





// Validation

let inputs = document.querySelectorAll("form .inputs input");

inputs.forEach(input => {
    input.addEventListener("blur", function () {
        if (this.value == "") {
            this.style.borderBottom = "1px solid red";
            this.nextElementSibling.nextElementSibling.style.color = "red";
            this.parentNode.lastElementChild.style.opacity = "1";
            this.nextElementSibling.style.setProperty("--beforeAndAfterBack", "red");
            
        }
    })


    body.addEventListener("click", function(){
        inputs.value = "";
    })

    input.addEventListener("keyup", function () {
        if (this.value == "") {
            this.style.borderBottom = "1px solid red";
            this.parentNode.lastElementChild.style.opacity = "1";
            this.nextElementSibling.style.setProperty("--beforeAndAfterBack", "red");
        }

        else {
            this.style.borderBottom = "1px solid #949494";
            this.parentNode.lastElementChild.style.opacity = "0";
            this.nextElementSibling.style.setProperty("--beforeAndAfterBack", "#ef6c00");
        }
    })

    input.addEventListener("focus", function () {
        this.nextElementSibling.nextElementSibling.style.color = "#ef6c00";
    })
})

let textarea = document.querySelector(" form .textarea textarea");

textarea.addEventListener("blur", function () {
    if (this.value == "") {
        this.style.borderBottom = "1px solid red";
        this.nextElementSibling.nextElementSibling.style.color = "red";
        this.nextElementSibling.style.setProperty("--beforeAndAfterBack", "red");
    }
})

textarea.addEventListener("keyup", function () {
    if (this.value == "") {
        this.style.borderBottom = "1px solid red";
        this.nextElementSibling.style.setProperty("--beforeAndAfterBack", "red");
    }

    else {
        this.style.borderBottom = "1px solid #949494";
        this.nextElementSibling.style.setProperty("--beforeAndAfterBack", "#ef6c00");
    }
})

textarea.addEventListener("focus", function () {
    this.nextElementSibling.nextElementSibling.style.color = "#ef6c00";
})

let submit = document.querySelector("form button");

submit.addEventListener("click", function (event) {
    event.preventDefault();
    
    let checkValidation = false;
    let countOfEmpty = 0;

    for (const input of inputs) {
        if (input.value == "") {
            input.style.borderBottom = "1px solid red";
            input.nextElementSibling.nextElementSibling.style.color = "red";
            input.parentNode.lastElementChild.style.opacity = "1";
            input.nextElementSibling.style.setProperty("--beforeAndAfterBack", "red");

            textarea.style.borderBottom = "1px solid red";
            textarea.nextElementSibling.nextElementSibling.style.color = "red";
            textarea.nextElementSibling.style.setProperty("--beforeAndAfterBack", "red");

            countOfEmpty++;
        }
    }

    if (countOfEmpty == 0) {
        checkValidation = true;
    }

    if (!checkValidation) {
        return;
    }

    window.location.reload();
})


    





    
    






})