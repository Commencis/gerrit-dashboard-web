# Gerrit Dashboard Web

![Travis CI Build Status](https://travis-ci.org/monitise-mea/gerrit-dashboard-web.svg)

Gerrit Dashboard Web project that shows metrics from [Gerrit Dashboard Server](https://github.com/monitise-mea/gerrit-dashboard-server).

## License

Gerrit Dashboard Web
Copyright © 2016 Monitise MEA

Distributed under the Apache License, Version 2.0

## Requirements

bower & gulp should be installed globally.

* nodejs (>= 0.12)
* bower (>= 1.7)
* gulp (>= 3.9)

## Configuration

Only server host url can be configured at this moment by using the configuration file that the project is built against.
For this purpose, there are `dev.json` and `prod.json` files under `/config` folder. Please change these files according
to your needs.

## Development

```
$ npm install
$ bower install
$ gulp dev-live
```

## Building Package For Production

```
$ npm install
$ bower install
$ gulp build --env=prod
```

## Deployment

### Docker (Recommended)

Running npm and bower commands during container image creation causes various problems (including fatter disk images).
We therefore preferred to place the output of the build into the container image which yields a very lean & small image.

Basically we run an nginx container with the output of the build.

To build the container image, please first issue the commands under [Building Package For Production].

```
$ docker build -t gerrit-dashboard-web:1.0.0 .
```

To tag the image as latest:

```
$ docker tag gerrit-dashboard-web:1.0.0 gerrit-dashboard-web:latest
```

To spin a new container from this image:

```
$ docker run -d \
    --name gerrit-dashboard-web \
    -p 8080:80 \
    gerrit-dashboard-web
```
