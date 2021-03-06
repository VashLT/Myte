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

    $("#next-btn").click(function () {
        if (validForm()) {
            $("#register-form").submit();
        }
    })

    $(".dismissible").click(function () {
        this.css("display", "none");
    });

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
    });
});



