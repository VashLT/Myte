from django import forms
from django.utils.html import mark_safe


class FengyuanChenDatePicker(forms.DateInput):
    template_name = 'widgets/fengyuanchen_datepicker.html'

    @property
    def media(self):
        css = {
            'all': ('https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.css',),
        }
        js = ('https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.js',)
        html = forms.Media(css=css, js=js).render()
        tags = []
        for tag in html.split("\n"):
            if tag.startswith("<link"):
                extra_attrs = tag.replace(
                    ">", 'integrity = "sha256-b88RdwbRJEzRx95nCuuva+hO5ExvXXnpX+78h8DjyOE=" crossorigin = "anonymous"/>')
                tags.append(extra_attrs.replace('media="all"', ''))
            else:
                tags.append(tag.replace(
                    ">", 'integrity = "sha256-/7FLTdzP6CfC1VBAj/rsp3Rinuuu9leMRGd354hvk0k=" crossorigin = "anonymous">', 1))
        return mark_safe("\n".join(tags))


# <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.css"
#     integrity="sha256-b88RdwbRJEzRx95nCuuva+hO5ExvXXnpX+78h8DjyOE=" crossorigin="anonymous" />
# <script src="https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.6.5/datepicker.min.js"
#     integrity="sha256-/7FLTdzP6CfC1VBAj/rsp3Rinuuu9leMRGd354hvk0k=" crossorigin="anonymous"></script>
