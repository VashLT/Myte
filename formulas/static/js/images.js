$(document).ready(function () {
    var $overlay = $(".overlay");

    // images.html template
    if ($('body').hasClass('images')) {
        var $images = $(".c-image");

        $images.click( function () {
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

        $images.hover(function () {
            console.log($(this).attr('id'));
            $(this).find('div.header').css('display', 'flex');
        }, function () {
            $(this).find('div.header').css('display', 'none');
        }
        );
    }

    // add_images.html template
    if ($('body').attr('class') === 'add-image') {
        var $preview_container = $('.preview-files');
        console.log($preview_container);
        if ($preview_container.length > 0) {
            $('.c-form').css(
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