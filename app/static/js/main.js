// var currentTab = 0;
// showTab(currentTab);

// function showTab(index) {
//     var tabs = document.getElementsByClassName("tab");
//     if (index == 0) {
//         document.getElementById("previous-btn").style.display = "none";
//     } else {
//         document.getElementById("previous-btn").style.display = "flex";
//     }
//     if (index == (tabs.length - 1)) {
//         document.getElementById("next-btn").innerHTML = "Enviar";
//     } else {
//     document.getElementById("nextBtn").innerHTML = "Siguiente";
//     }
//     updateStepIndicator(index)
// }

// function updateStepIndicator(index) {
//   var i, steps = document.getElementsByClassName("step");
//   for (i = 0; i < steps.length; i++) {
//     steps[i].className = steps[i].className.replace(" active", "");
//   }
//   // active current step
//   steps[index].className += " active";
// }

// function nextTab(index) {
//     var tabs = document.getElementsByClassName("tab");
//     // Exit the function if any field in the current tab is invalid:
//     if (n == 1 && !validateForm()) return false;
//     // Hide the current tab:
//     tabs[currentTab].style.display = "none";
//     currentTab = currentTab + index;
//     if (currentTab >= tabs.length) {
//         document.getElementById("register-form").submit();
//         return false;
//     }
//     showTab(currentTab);
// }

// function validateForm() {
//     // This function deals with validation of the form fields
//     var x, y, i, valid = true;
//     tabs = document.getElementsByClassName("tab");
//     inputs = tabs[currentTab].getElementsByTagName("input");
        
//     for (i = 0; i < inputs.length; i++) {
//         if (inputs[i].value == "") {
//             // add an "invalid" class to the field:
//             inputs[i].className += " invalid";
//             // and set the current valid status to false:
//             valid = false;
//         }
//     }
//     if (valid) {
//         document.getElementsByClassName("step")[currentTab].className += " finish";
//     }
//     return valid; // return the valid status
// }


$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

$(document).ready(function () {
    var $side_bar = $('.side-bar');

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



