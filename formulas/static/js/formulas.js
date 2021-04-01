// $.getScript("./images.js", function () { });
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
    var $overlay = $('.overlay');
    var $formulas = $('.c-formula');
    var $stages = $('.stage');
    var $nextBtn = $('#next-btn');

    if ($stages.length) {
        var $active = $('.stage.active');
        var $render = $('#render-btn');
        var $prevBtn = $('#previous-btn');
        var $form = $('#add-form');
        const formulaHeader = document.getElementById('formula-state-header')
        
        $render.click(function () {
            setTimeout(function(){
                formulaHeader.innerText = '$$\\text{Renderizando ...}$$';
                $form.append('<input type="hidden" name="render" />');
                $form.submit();
            }, 600);
        });

        $prevBtn.click(function () {

            if ($form.length === 1) {
                $form.append('<input type="hidden" name="back" value="" />');
                $form.submit();
            }
        });

        if ($active.attr('value') === '1') {
            var $form = $('#add-form');

            $prevBtn.prop('disabled', true);
            $nextBtn.text('Siguiente');

        } else {
            $('.c-add_formula').css('height', '500px');
            formulaHeader.innerText = '$$\\text{Formula}$$';
            $prevBtn.prop('disabled', false);
            $nextBtn.text('Enviar');
        }
    }

    if ($nextBtn.length > 0) {
        $nextBtn.click(function () {
            console.log('clicked next btn')
            if (validForm('add-form')) {
                $('#add-form').submit();
            }
        });
    }

    $formulas.click(function () {
        var $clicked_formula_id = $(this).attr('id');
        var $modal = $("#modal" + $clicked_formula_id.substring(1));
        $modal.addClass("active");
        $overlay.addClass("active");

        // updates 'numero_usos' column in 'Indice' table
        $.ajax({
            type: "POST",
            url: "/home/formulas/liveupdate/",
            data: {
                'csrfmiddlewaretoken': window.CSRF_TOKEN,
                'id_formula': $clicked_formula_id.substring(1)
            },
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
})