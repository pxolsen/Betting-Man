# Generated by Django 4.2.3 on 2023-08-10 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bet_app', '0004_alter_bet_away_team_spread_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='away_team_spread',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='bet',
            name='bet_status',
            field=models.CharField(default='No Bet'),
        ),
        migrations.AlterField(
            model_name='bet',
            name='home_team_spread',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=5),
        ),
    ]