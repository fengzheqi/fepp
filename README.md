# fepp
Front-end Exception &amp; Performance Platform(FEPP)：前端异常与性能监控平台

please modify the file config.json before you use it.
eg.
```
{
  "development": {
    "host": "localhost",
    "port": 3000,
    "cookieSecret": "cookieSecret",
    "sessionSecret": "sessionSecret",
    "database": {
      "name": "fepp",
      "host": "localhost",
      "port": 27017,
      "user": "",
      "password": ""
    },
    "mail": {
      "service": "Gmail",
      "auth": {
        "user": "XXXX@gmail.com",
        "pass": "xxxx"
      }
    }
  },
  "production": {
    "host": "localhost",
    "port": 3000,
    "cookieSecret": "cookieSecret",
    "sessionSecret": "sessionSecret",
    "database": {
      "name": "fepp",
      "host": "localhost",
      "port": 27017,
      "user": "",
      "password": ""
    },
    "mail": {
      "service": "Gmail",
      "auth": {
         "user": "XXXX@gmail.com",
         "pass": "xxxx"
      }
    }
  }
}
```
