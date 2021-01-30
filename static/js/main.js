var element = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < element.length; i++){
    element[i].addEventListener("click",
        function () {
            this.classList.toggle("nav-bar--opts");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            }
            else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    );
}