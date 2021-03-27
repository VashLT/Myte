document.addEventListener('DOMContentLoaded', function () {
    const PremiumBtn = document.getElementById("up-btn");
    if (document.body.contains(PremiumBtn)) {
        PremiumBtn.onclick = function () {
            var $form = $("form");
            $form.append('<input type="hidden" name="premium" />');
            $form.submit();
        }
    }
});