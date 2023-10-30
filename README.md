# Send Custom Email Using: Netlify Functions + Nodemailer + Google

To keep things simple, this works with nodemailer+gmail service

This is an test project that shows you how you can use [my example](https://myshop-static1.netlify.app/) 

## Using this Project

Free for use!

### ⚠️ Caveats!

Be aware for details in you [https://console.cloud.google.com/apis/credentials/consent?project](https://console.cloud.google.com/apis/credentials/consent?project)

to obtain a:
                +API Key
                +clientId CLI ID
                +clientSecret CLI SECRET


===================
new 

# https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript
environment = { NODE_VERSION = "14", AWS_LAMBDA_JS_RUNTIME = "nodejs14.x" }

[context.production.environment]
# https://docs.netlify.com/functions/build-with-javascript/#runtime-settings
# https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html
NODE_VERSION = "14"
AWS_LAMBDA_JS_RUNTIME = "nodejs14.x"

[context.deploy-preview.environment]
NODE_VERSION = "14"
AWS_LAMBDA_JS_RUNTIME = "nodejs14.x"
