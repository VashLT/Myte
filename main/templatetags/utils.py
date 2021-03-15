from django import template

register = template.Library()


@register.filter
def determine_tags(*args):
    """ concatenate args """
    # return "".join([str(arg) for arg in args])
    return ""


@register.filter
def concat_task(todo_list, string):
    """ concat and plurarize """
    total_tasks = len(todo_list.task_set.all())
    if total_tasks > 1:
        return "".join([str(total_tasks), string, 's'])
    else:
        return "".join([str(total_tasks), string])
