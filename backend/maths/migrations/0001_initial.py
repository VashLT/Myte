# Generated by Django 3.2.8 on 2021-10-22 06:40

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Formula',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_formula', models.PositiveIntegerField(unique=True)),
                ('added_at', models.DateTimeField()),
                ('tags', models.TextField(max_length=200)),
                ('category', models.TextField(blank=True, max_length=200)),
                ('title', models.TextField()),
                ('latex_code', models.TextField(max_length=200)),
                ('images', models.TextField(max_length=200)),
                ('is_deleted', models.BooleanField(blank=True, default=False)),
                ('is_created', models.BooleanField(blank=True, default=False)),
            ],
        ),
        migrations.CreateModel(
            name='MathUser',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('username', models.TextField(max_length=200, unique=True)),
                ('formulas', models.TextField(max_length=200)),
            ],
        ),
    ]
