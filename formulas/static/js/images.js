$(document).ready(function () {
    var $images = $(".image-item");
    var $overlay = $(".overlay");

    $images.on("click", function () {
        var $clicked_image_id = $(this).attr('id');
        var $modal = $("#im" + $clicked_image_id);
            $modal.addClass("active");
            $overlay.addClass("active");
    });
});