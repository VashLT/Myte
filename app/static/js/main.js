var currentTab = 0;
showTab(currentTab);

function showTab(index) {
    var tabs = document.getElementsByClassName("tab");
    tabs[index].style.display = "flex";
    if (index == 0) {
        document.getElementById("previous-btn").style.display = "none";
        document.getElementById("next-btn").style.justifyContent = "center";
    } else {
        document.getElementById("previous-btn").style.display = "flex";
    }
    if (index == (tabs.length - 1)) {
        document.getElementById("next-btn").innerHTML = "Enviar";
        document.getElementById("previous-btn").style.backgroundColor = "rgb(184, 184, 184)";
    } else {
        document.getElementById("next-btn").innerHTML = "Siguiente";
    }
    updateStepIndicator(index)
}

function updateStepIndicator(index) {
  var i, steps = document.getElementsByClassName("step");
  for (i = 0; i < steps.length; i++) {
    steps[i].className = steps[i].className.replace(" active", "");
  }
  // active current step
  steps[index].className += " active";
}

function nextTab(index) {
    var tabs = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (index == 1 && !validateForm()) return false;
    // Hide the current tab:
    tabs[currentTab].style.display = "none";
    currentTab = currentTab + index;
    console.log(currentTab)
    if (currentTab >= tabs.length) {
        document.getElementById("register-form").submit();
        return false;
    } else if (index == 1){
        var container = document.getElementsByClassName("container-register")[0];
        container.style.height = "600px";
        container.style.
    }
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var tabs, inputs, i, valid = true;
    tabs = document.getElementsByClassName("tab");
    inputs = tabs[currentTab].getElementsByTagName("input");
        
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            // add an "invalid" class to the field:
            inputs[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}


$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

$(document).ready(function () {
    var $side_bar = $('.side-bar');

    $(".dismissible").click(function () {
        this.css("display", "none");
    });

    $(".hamburger").click(function () { // click on hamburger button
        event.preventDefault();
        $side_bar.animate({ width: "toggle" }, 300);
        if (!$side_bar.hasAttr("state") || $side_bar.attr("state") == "hidden") {
            $side_bar.attr("state", "active");
        }
        event.stopPropagation();
    });

    $side_bar.click(function () {
        event.stopPropagation();
    })

    $("body").click(function () {
        if ($side_bar.hasAttr("state") && $side_bar.attr("state") === "active") {
            $side_bar.animate({ width: "toggle" }, 300);
            $side_bar.attr("state", "hidden");
        }
    });
});



