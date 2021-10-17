from django.core.files.storage import FileSystemStorage


class FileStorage(FileSystemStorage):
    """
        Overwrites Django's FileSystemStorage

        > the main purpose of this is to overwrite files
        that has the same name.

        Note: This does not limit the names that files can take
        since images are stored in unique folders
    """

    def get_available_name(self, name, max_length=None):
        self.delete(name)
        return name
