$(document).ready(function () {
    var $overlay = $(".overlay");


    if ($('body').hasClass('images')) {
        var $images = $(".c-image");
        console.log('In jeje    ');

        $images.on("click", function () {
            var $clicked_image_id = $(this).attr('id');
            var $modal = $("#im" + $clicked_image_id);

            $modal.addClass("active");
            $overlay.addClass("active");
        });

        $overlay.click(function () {
            if ($overlay.hasClass('active')) {
                event.preventDefault();
                $overlay.removeClass('active');
                if ($(".modal-image.active").length) {
                    $(".modal-image.active").removeClass("active");
                }
                event.stopPropagation();
            }
        });
    }

    if ($('body').attr('class') === 'add-image') {
        var $preview_container = $('.preview-files');
        console.log($preview_container);
        if ($preview_container.length > 0) {
            $('.c-add_formula').css(
                {
                    'height': 'auto',
                    'padding-bottom': '40px'
                }
            );
        }
        $('#load-img-btn').click(function () {
            $('#add-form').append('<input type="hidden" name="load" />')
            $('#add-form').submit();
        });
        $('#next-btn').click(function () {
            $('#add-form').append('<input type="hidden" name="next" />')
            $('#add-form').submit();
        });
    }
});