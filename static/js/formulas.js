$(document).ready(function () {
    var $formulas = $('.container-formula');
    var $overlay = $(".overlay");
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
    });

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
    });
});