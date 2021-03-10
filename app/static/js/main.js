function validForm(id_form) {
    // This function deals with validation of the form fields
    var tab, inputs, area_inputs,  i, valid = true;
    tab = document.getElementById(id_form);
    inputs = tab.querySelectorAll("div>input");
    area_inputs = tab.querySelectorAll("div>textarea");
    if (inputs.length) {
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                inputs[i].className += " invalid";
                valid = false;
            }
        }
    }
    if (area_inputs.length) {
        for (i = 0; i < area_inputs.length; i++) {
            console.log(area_inputs[i].value)
            if (area_inputs[i].value.trim() == "") {
                area_inputs[i].className += " invalid";
                valid = false;
            }
        }
    } 
    return valid; // return the valid status
}


$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

let promise = Promise.resolve();  // Used to hold chain of typesetting calls

function typeset(code) {
  MathJax.startup.promise = MathJax.startup.promise
    .then(() => MathJax.typesetPromise(code()))
    .catch((err) => console.log('Typeset failed: ' + err.message));
  return MathJax.startup.promise;
}

$(document).ready(function () {
    var $side_bar = $('.side-bar');
    var $home_bar = $('.side-bar--home');
    var $messages = $('.container-flash');
    var $formulas = $('.container-formula');
    var $overlay = $(".overlay");
    var $images = $(".image-item");

    $images.on("click", function () {
            var $clicked_image_id = $(this).attr('id');
        var $modal = $("#im" + $clicked_image_id);
            $modal.addClass("active");
            $overlay.addClass("active");
    });
    
    $("#return-home").click(function () {
        if ($("#redirect-form").length) {
            $("#redirect-form").append('<input type="hidden" name="return_home" />');
            $("#redirect-form").submit();
        }
        var $form = $("#add-form");
        $form.append('<input type="hidden" name="return_home" />');
        $form.submit();
    });


    $("#ilatex").on('input', function () {
        var input_latex = $(this).val();
        var preview = $("#preview-content");
        preview.text("$$ " + input_latex + " $$");
        var latex = preview.text();
        MathJax.typesetClear([preview]);
        MathJax.typesetPromise([preview]).then(() => {
            latex
        });
    });

    $formulas.on("click", function () {
        var $clicked_formula_id = $(this).attr('id');
        var $modal = $("#modal" + $clicked_formula_id.substring(1));
        $modal.addClass("active");
        $overlay.addClass("active");
        // live update of indice when click on formula
        $.ajax({
            method: "post",
            url: "/liveupdate",
            data: { id_formula: $clicked_formula_id.substring(1) },
            success: function (response) {
                console.log(response);
            }
        });
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


    $("#render-btn").click(function () {
        var $form = $("#add-form--normal");
        if ($form.length) {
            $form.append('<input type="hidden" name="render" />');
            $("#add-form--normal").submit();
        }
    });

    $("#next-btn").click(function () {
        if ($("#register-form").length) {
            if (validForm("register-form")) {
                $("#register-form").submit();
            }
        } else if ($("#add-form").length) {
            var $form = $("#add-form");
            if (validForm("add-form")) {
                $form.append('<input type="hidden" name="completed" />');
                $form.submit();
            }
        } else if ($("#add-form--normal").length) {
            var $form = $("#add-form--normal");
            if (validForm("add-form--normal")) {
                $form.append('<input type="hidden" name="completed" />');
                $form.submit();
            }
        }
    })

    $(".dismissible").click(function () {
        var $to_remove = $(this).parent('div');
        $to_remove.fadeOut(300, function () { $to_remove.remove(); });
    });

    // home buttons

    $("#ctrl-side-bar").click(function () { // click on hamburger button
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
            if ($(".modal-image.active").length) {
                $(".modal-image.active").removeClass("active");
            }
            if ($(".modal-formula.active").length) {
                $(".modal-formula.active").removeClass("active");
            }
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



