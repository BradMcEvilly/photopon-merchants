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

## configure

  Modify the files in src/config/*

## deploy

    grunt deploy

## additional mac step, may be needed for xcrun, etc, esp on High Sierra:

* xcode-select --install
* may need to update tools afterwards
* may need to install full xcode from app store

## admin

* npm install -g parse-dashboard
* parse-dashboard --appId APP_ID --masterKey MASTER_KEY --serverURL "SERVER_URL" --appName Photopon

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
    RewriteRule ^/merchants\/?$ /merchants/index.html
    RewriteRule ^/admin\/?$ /merchants/admin/ [R,L]
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

## AWS S3 & IAM setup

create a bucket for the site
make a user (optional group, recommended)
copy keys for user in credentials file
add permissions
Make sure that your AWS IAM policy allows s3:GetObject, s3:GetObjectAcl, s3:ListBucket, s3:PutObject, and s3:PutObjectAcl on everything under the buckets you plan to deploy to.
policy generation tool: https://awspolicygen.s3.amazonaws.com/policygen.html
1. policy type: S3 bucket policy
2. 
  effect: allow
  pricipal: ARN of the user, eg "arn:aws:iam::421049817085:user/photopon-dev"
  aws service: S3
  actions: s3:GetObject, s3:GetObjectAcl, s3:ListBucket, s3:PutObject, and s3:PutObjectAcl
  resource name (ARN): ARN of the bucket, eg "arn:aws:s3:::photopon.stephan.com"
  "add statement"
3. generate policy.  Should look like this:

```
{
  "Id": "Policy1536232622728",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1536232617867",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:ListBucket",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::photopon.stephan.com",
      "Principal": {
        "AWS": [
          "arn:aws:iam::421049817085:user/photopon-dev"
        ]
      }
    }
  ]
}
```

visual editor for inline policy might be better
service: s3
actions: list/ListBucket
          read/GetObject, read/GetObjectAcl
          write/PutObject
          permissions/PutObjectAcl

result looks like:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObjectAcl",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::photopon.stephan.com"
        }
    ]
}
```