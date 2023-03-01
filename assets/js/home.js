$(document).ready(function () {


    
    let currency = $(".currency");

    let usdBtn = $(".usd-btn");
    let eurBtn = $(".eur-btn");


    $(document).on("click", ".currency", function(){
        $(".valyuta").toggleClass("d-none")
    })

    $(document).on("click", ".usd-btn", function(){
        let usdText =$(".usd-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(usdText);
    })

    $(document).on("click", ".eur-btn", function(){
        let eurText = $(".eur-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(eurText);
     })



     
    $(document).on("click", ".language", function (e) {
        e.preventDefault()

        $(".language-area").toggleClass("d-none");

    });
    $(document).on("click", ".language-area button", function () {
        let btnText = $(this).html();
        $(".language").children().eq(0).html(btnText + `<i class="fa-solid fa-sort-down"></i>`);
        $(".language-area").addClass("d-none");

    })


});