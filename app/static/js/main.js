function validForm() {
    // This function deals with validation of the form fields
    var tab, inputs, i, valid = true;
    tab = document.getElementById("register-form");
    inputs = tab.querySelectorAll("div>input");
    console.log(inputs.length)
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            inputs[i].className += " invalid";
            valid = false;
        }
    }
    return valid; // return the valid status
}


$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

$(document).ready(function () {
    var $side_bar = $('.side-bar');
    var $home_bar = $('.side-bar--home');
    var $messages = $('.container-flash');
    var $formulas = $('.container-formula');
    var $overlay = $(".overlay");

    $formulas.on("click", function () {
        var $clicked_formula_id = $(this).attr('id');
        var $modal = $("#modal" + $clicked_formula_id.substring(1));
        $modal.addClass("active");
        $overlay.addClass("active");
    })
    
    if ($messages.length) {
        if ($(".nav-bar").length) {
            $messages.attr('style', 'margin-top: '.concat($(".nav-bar").css("height")));
        } else if ($(".nav-bar--home").length) {
            $messages.attr('style', 'margin-top: '.concat($(".nav-bar--home").css("height")));
        }
        $messages.children().each(function (i) {
            $(this).delay(400 * i).fadeIn(300);
            $(this).attr("style", "display: flex");
        });
    }

    $("#next-btn").click(function () {
        if (validForm()) {
            $("#register-form").submit();
        }
    })

    $(".dismissible").click(function () {
        var $to_remove = $(this).parent('div');
        $to_remove.fadeOut(300, function () { $to_remove.remove(); });
    });


    $(".expand-bar").click(function () { // click on hamburger button
        event.preventDefault();
        $home_bar.animate({ width: "toggle" }, 300);
        if (!$home_bar.hasAttr("state") || $home_bar.attr("state") == "hidden") {
            $home_bar.attr("state", "active");
        }
        event.stopPropagation();
    });

    $home_bar.click(function () {
        event.stopPropagation();
    })

    $overlay.click(function () {
        if ($overlay.hasClass("active")) {
            event.preventDefault();
            $(".overlay").removeClass("active");
            $(".modal-formula.active").removeClass("active");
            event.stopPropagation();
        }
    })

    $(".hamburger").click(function () { // click on hamburger button
        event.preventDefault();
        $side_bar.animate({ width: "toggle" }, 300);
        if (!$side_bar.hasAttr("state") || $side_bar.attr("state") == "hidden") {
            $side_bar.attr("state", "active");
        }
        event.stopPropagation();
    });

    $side_bar.click(function () {
        event.stopPropagation();
    })



    $("body").click(function () {
        if ($side_bar.hasAttr("state") && $side_bar.attr("state") === "active") {
            $side_bar.animate({ width: "toggle" }, 300);
            $side_bar.attr("state", "hidden");
        }
        if ($home_bar.hasAttr("state") && $home_bar.attr("state") === "active") {
            $home_bar.animate({ width: "toggle" }, 400);
            $home_bar.attr("state", "hidden");
        }
    });
});



