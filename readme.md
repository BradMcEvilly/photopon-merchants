# Requirements
1. Nodejs
2. grunt-cli


# Project setup

To setup project locally run following commands 

    git clone https://github.com/BradMcEvilly/photopon-merchants.git
    cd photopon-merchants
    npm install -g grunt-cli
    npm install
    grunt bower-install-simple
    grunt build
    
after execution you can find bin directory in photopon-merchants it contains
- landing (landing page)
- merchant (merchant dashboard)

Run any http daemon (MAMP, apache, WAMP, anything else) with root dir pointing to bin folder and enjoy

## deploy

    grunt deploy

## additional mac step, may be needed for xcrun, etc, esp on High Sierra:

* xcode-select --install
* may need to update tools afterwards
* may need to install full xcode from app store

## admin

* npm install -g parse-dashboard
* parse-dashboard --appId qyY21OT36AiP5hIEdrzrBvbOS1HgXzIK52oyzrAN --masterKey 2sVDZTTVJnQ7oX5p81wOPOsB5R7ci929Q3WIOcOs --serverURL "https://photopon.herokuapp.com/parse" --appName Photopon

## apache configuration

The following apache configuration worked on High Sierra.
* Make sure rewrite_module has been enabled
* add `Include /private/etc/apache2/vhosts/*.conf`
* make folder vhosts in apache2 folder (`/etc/apache2`)
* add file _default.conf to that folder:
  ```
  <VirtualHost *:80>
      DocumentRoot "/Library/WebServer/Documents"
  </VirtualHost>
  ```
* add file photoponlocal.conf to that folder, adapting `DocumentRoot` and `Directory` to suit your install:
  ```
  AddType text/css .css
  AddType text/javascript .js

  <VirtualHost *:80>
    DocumentRoot "/Users/stephan/dev/photopon/merchants/bin"
    ServerName photopon.local
    ErrorLog "/private/var/log/apache2/photopon.local-error_log"
    CustomLog "/private/var/log/apache2/photopon.local-access_log" common

    RewriteEngine on
    RewriteRule ^\/?$ /landing/index.html
    RewriteRule ^/merchants\/?$ /merchants/merchants/index.html
    RewriteRule ^/merchants/admin\/?$ /merchants/admin/index.html

    <Directory "/Users/stephan/dev/photopon/merchants/bin">
      AllowOverride All
      Require all granted
    </Directory>
  </VirtualHost>
  ```
* add this line to /etc/hosts
  ```
  127.0.0.1 photopon.local
  ```
* start up apache (`sudo apachectrl start`) or restart (`sudo apachectrl restart`)
* make sure you restart apache after making changes!