$(document).ready(function () {
    var $prevBtn = $("#previous-btn");

    $prevBtn.click(function () {
        var form = $("form");
        if (form.length === 1) {
            form.append('<input type="hidden" name="back" value="" />');
            form.submit();
        }
    });

    $("#render-btn").click(function () {
        var $form = $("#add-form--normal");
        if ($form.length) {
            $form.append('<input type="hidden" name="render" />');
            $("#add-form--normal").submit();
        }
    });
});