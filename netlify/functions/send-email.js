const nodemailer = require("nodemailer")

//
require('dotenv').config()

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    'Content-Type': 'application/json'
};

exports.handler = async function (event, context, callback) {


  // Parse the JSON text received.

  // const body0 = JSON.parse(event.body)


    const body = {
        "body":"body111",
        "email":'foto555999@gmail.com',
    };

  // Build an HTML string to represent the body of the email to be sent.
  // ${body.body}
  //   ${"--- multiValueQueryStringParameters.body --- "+JSON.stringify(event.multiValueQueryStringParameters.body)}
  const html = `<div style="margin: 20px auto;">
                    
        <br>
        ${"--- event.body.subject --- "+JSON.stringify(event.body.subject)}
        <br>
        ${"--- event.body --- "+JSON.stringify(event.body)}
        <br>
        ${"--- event.multiValueQueryStringParameters --- "+JSON.stringify(event.multiValueQueryStringParameters)}
        <br>
        "===================="
        <br>
        ${"--- event --- "+JSON.stringify(event) + "--- context --- "+JSON.stringify(context)}
                    
                </div>`

  // Generate test SMTP service account from ethereal.email. Only needed if you
  // don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {

      user: process.env.EMAIL_API_NAME,
      // make special app password api
      pass: process.env.EMAIL_API_PASSWORD,
   },

   })

  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   auth: {
  //     user: 'yadira.connelly36@ethereal.email',
  //     pass: 't3b5gfKWQCT2wCtahD'
  //   }
  // });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"☁️ The Cloud ☁️" <thecloud@example.com>',

      to: body.email,
      subject: "New Form Submission 111",
      text: "text 555",
      html: html
    })
    // Log the result
    console.log(info)
    callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(info)
    })
  } catch (error) {
    // Catch and log error.
    callback(error)
  }
}
