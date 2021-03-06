# Routing databases

class DefaultRouter:
    """
    A router to control all database operations on models in the
    auth and contenttypes applications.
    """
    route_app_labels = {'auth', 'contenttypes',
                        'sessions', 'messages', 'staticfiles'}

    def db_for_read(self, model, **hints):
        """
        Attempts to read auth and contenttypes models go to auth_db.
        """
        if model._meta.app_label in self.route_app_labels:
            return 'default'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write auth and contenttypes models go to auth_db.
        """
        if model._meta.app_label in self.route_app_labels:
            return 'default'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the auth or contenttypes apps is
        involved.
        """
        if (
            obj1._meta.app_label in self.route_app_labels or
            obj2._meta.app_label in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth and contenttypes apps only appear in the
        'auth_db' database.
        """
        if app_label in self.route_app_labels:
            return db == 'default'
        return None


class MyteRouter:
    def db_for_read(self, model, **hints):
        """
        Reads go to a randomly-chosen replica.
        """
        return 'Myte'

    def db_for_write(self, model, **hints):
        """
        Writes always go to Myte database
        """
        return 'Myte'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Relations between objects are allowed if both objects belong to
        the same database
        """
        if obj1._state.db == obj2._state.db:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        All non django models end up here
        """
        return True
