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

function getCurrentStage() {
    var stages = document.getElementsByClassName("stage");
    for (let i = 0; i < stages.length; i++){
        if (stages[i].classList.contains('active')) {
            return [i, stages[i]];
        }
    }
    return [0, stages[0]];
}

document.addEventListener('DOMContentLoaded', function () {
    const PrevBtn = document.getElementById('previous-btn');
    const NextBtn = document.getElementById('next-btn');
    var stages = document.getElementsByClassName("stage");
    var curStage, index;
    [index, curStage] = getCurrentStage();
    console.log(curStage.getAttribute('value'));
    // determines state and content of buttons
    if (curStage == stages[0]) {
        PrevBtn.disabled = true;
        PrevBtn.style.backgroundColor = 'darkgray';
    } else if (curStage == stages[stages.length - 1]) {
        NextBtn.innerText = "Enviar";
    } else {
        NextBtn.innerText = "Siguiente";
        PrevBtn.disabled = false;
    }
    if (curStage.getAttribute('value') === '2') {
        var container = document.getElementById("reg-cont");
        container.style.height = "600px";
    }
    PrevBtn.onclick = function () {
        if (curStage != stages[0]) {
            $("#reg-form").append('<input type="hidden" name="back" />');
            $("#reg-form").submit();
        }
    }
    NextBtn.onclick = function () {
        var form = document.getElementById("reg-form");
        alert("going forward");
        if (curStage == stages[stages.length - 1]) {
            $("#reg-form").append('<input type="hidden" name="finish" />');
        }
        if (validForm("reg-form")) {
            form.submit();
        }
    }

});
