var element = document.getElementsByClassName("collapsible");
var i;

$('.collapsible').click(
    function () {
        $('content').toggle(1000);
    }
)

for (i = 0; i < element.length; i++) {
    element[i].addEventListener("click", display_items()) }

function display_items() {
    var content = this.childNodes;
    content.toggle("content")
    content.style.backgroundColor = "red";
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    }
    else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
