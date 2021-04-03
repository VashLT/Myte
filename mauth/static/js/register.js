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

document.addEventListener('DOMContentLoaded', function () {
    var $nextBtn = $('#next-btn');
    var $prevBtn = $('#previous-btn');
    var $stage = $('.stage.active');
    var $form = $('#reg-form');
    
    // determines state and content of buttons
    if ($stage.attr('value') === '1') {
        $nextBtn.text('Siguiente');
        $prevBtn.prop('disabled', true);
    } else if ($stage.attr('value') === '2') {
        $nextBtn.text('Enviar');
        $prevBtn.prop('disabled', false);
        $('#c-reg').css('height', '600px');
    }

    $prevBtn.click(function () {
        if ($stage.attr('value') === '2') {
            $form.append('<input type="hidden" name="back" />')
        }
        $form.submit();
    });

    $nextBtn.click(function () {
        if ($stage.attr('value') === '2') {
            $form.append('<input type="hidden" name="finish" />')
        }
        if (validForm('reg-form')) {
           $('#reg-form').submit()
       }
    });
});
