$.getScript("/static/js/forms.js", function () { });
$.getScript("/static/js/formulas.js", function() {});


$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};


$(document).ready(function () {
    var $side_bar = $('.side-bar');
    var $home_bar = $('.side-bar--home');
    var $messages = $('.c-flash');
    var $images = $(".image-item");

    $images.on("click", function () {
            var $clicked_image_id = $(this).attr('id');
        var $modal = $("#im" + $clicked_image_id);
            $modal.addClass("active");
            $overlay.addClass("active");
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

    // flash messages
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



