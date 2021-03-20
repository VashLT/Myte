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

$(document).ready(function () {
    $("#return-home").click(function () {
        if ($("#redirect-form").length) {
            $("#redirect-form").append('<input type="hidden" name="return_home" />');
            $("#redirect-form").submit();
        }
        var $form = $("#add-form");
        $form.append('<input type="hidden" name="return_home" />');
        $form.submit();
    });

    $("#render-btn").click(function () {
        var $form = $("#add-form--normal");
        if ($form.length) {
            $form.append('<input type="hidden" name="render" />');
            $("#add-form--normal").submit();
        }
    });

    // $("#next-btn").click(function () {
    //     if ($("#register-form").length) {
    //         if (validForm("register-form")) {
    //             $("#register-form").submit();
    //         }
    //     } else if ($("#add-form").length) {
    //         var $form = $("#add-form");
    //         if (validForm("add-form")) {
    //             $form.append('<input type="hidden" name="completed" />');
    //             $form.submit();
    //         }
    //     } else if ($("#add-form--normal").length) {
    //         var $form = $("#add-form--normal");
    //         if (validForm("add-form--normal")) {
    //             $form.append('<input type="hidden" name="completed" />');
    //             $form.submit();
    //         }
    //     }
    // });

});