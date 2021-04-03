// $.getScript("static/js/forms.js", function () { });

$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

$(document).ready(function () {
    var $sideBar = $('.sidebar');
    var $homeBar = $('.sidebar.home');
    var $messages = $('.c-flash');
    
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
        if ($(".navbar").length) {
            $messages.attr('style', 'margin-top: '.concat($(".navbar").css("height")));
        } else if ($(".navbar.home").length) {
            $messages.attr('style', 'margin-top: '.concat($(".navbar.home").css("height")));
        }
        $messages.children().each(function (i) {
            $(this).delay(400 * i).fadeIn(300);
            $(this).attr("style", "display: flex");
        });
    }

    // flash messages

    $(".dismissible").click(function () {
        var $to_remove = $(this).parent('div');
        $to_remove.fadeOut(300, function () { $to_remove.remove(); });
    });

    // home buttons

    $("#ctrl-side-bar").click(function () { // click on hamburger button
        event.preventDefault();
        $homeBar.animate({ width: "toggle" }, 300);
        if (!$homeBar.hasAttr("state") || $homeBar.attr("state") == "hidden") {
            $homeBar.attr("state", "active");
        }
        event.stopPropagation();
    });

    $homeBar.click(function () {
        event.stopPropagation();
    })


    $(".hamburger").click(function () { // click on hamburger button
        event.preventDefault();
        $sideBar.animate({ width: "toggle" }, 300);
        if (!$sideBar.hasAttr("state") || $sideBar.attr("state") == "hidden") {
            $sideBar.attr("state", "active");
        }
        event.stopPropagation();
    });

    $sideBar.click(function () {
        event.stopPropagation();
    })

    $("body").click(function () {
        if ($sideBar.hasAttr("state") && $sideBar.attr("state") === "active") {
            $sideBar.animate({ width: "toggle" }, 300);
            $sideBar.attr("state", "hidden");
        }
        if ($homeBar.hasAttr("state") && $homeBar.attr("state") === "active") {
            $homeBar.animate({ width: "toggle" }, 400);
            $homeBar.attr("state", "hidden");
        }
    });
});



