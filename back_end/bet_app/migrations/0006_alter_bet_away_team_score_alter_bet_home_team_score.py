# Generated by Django 4.2.3 on 2023-08-10 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bet_app', '0005_alter_bet_away_team_spread_alter_bet_bet_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='away_team_score',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='bet',
            name='home_team_score',
            field=models.IntegerField(null=True),
        ),
    ]
