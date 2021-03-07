# Myte

Myte is a web application that allows mathematical formulas management as well as their computation. Born
as a university project for Databases II. Creators: VashLT, Gacrucis, yurmel17

## Deployment

To start running Myte you will need to install all its dependencies, those are listed in `requirements.txt`
and so can be done by running:

```
    pip install -r requirements.txt
```

Now, in 'DB' folder are located the sql files to build up the web app information, some usable formulas and more. The order you run them matters, and they should be run as follows:

1. `build.sql`
2. `relations.sql`
3. `utils.sql`
4. `insert.sql`

So make sure to run them in order.
