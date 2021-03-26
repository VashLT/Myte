document.addEventListener('DOMContentLoaded', function () {
    const PremiumBtn         = document.getElementById("up-btn");
          PremiumBtn.onclick = function() {
        var $form = $("form");
        $form.append('<input type="hidden" name="premium" />')
        $form.submit()
    }
});