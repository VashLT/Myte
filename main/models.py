from django.db import models

from mauth.models import User


class Mytevar(models.Model):
    nombre = models.CharField(primary_key=True, max_length=50)
    valor = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'mytevar'


class Pinpago(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_pinpago')
    id_usuario = models.ForeignKey(
        User, models.DO_NOTHING, db_column='id_usuario')
    valor = models.FloatField()
    fecha_vencimiento = models.DateField()
    ref_pago = models.IntegerField()
    pin = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'pinpago'


class Tarjetacredito(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_tarjetacredito')
    numero = models.CharField(max_length=20)
    fecha_caducidad = models.DateField(blank=True, null=True)
    # Field name made lowercase.
    cvv = models.IntegerField(db_column='CVV', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tarjetacredito'


class Usuariotarjeta(models.Model):
    id_tarjetacredito = models.OneToOneField(
        Tarjetacredito, models.DO_NOTHING, db_column='id_tarjetacredito', primary_key=True)
    id_usuario = models.ForeignKey(
        User, models.DO_NOTHING, db_column='id_usuario')
    valor = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuariotarjeta'
        unique_together = (('id_tarjetacredito', 'id_usuario'),)
