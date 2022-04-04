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


    // const body = {
    //     "body":"body111",
    //     "email":'foto555999@gmail.com',
    // };

  // Build an HTML string to represent the body of the email to be sent.
  // ${body.body}
  //   ${"--- multiValueQueryStringParameters.body --- "+JSON.stringify(event.multiValueQueryStringParameters.body)}

  // const arrData = Array.from(event.body)
  const sendData = JSON.parse(event.body)
  // const arrData1 = JSON.parse(arrData0)
  //   ${"--- arrData.email_to --- "+arrData.email_to}

  const api_is_correct = process.env.API_KEY.toString()===sendData.part1.api_key.toString()

  const html = `<div style="margin: 20px auto;">

        {!api_is_correct && <br>
        <br>
        ${"--- api IS NOT correct --- "+api_is_correct}
        <br>
        ${"--- API_ADMIN_EMAIL --- "+process.env.API_ADMIN_EMAIL} 
        <br>
        ${"--- arrData.part1.API_KEY --- "+sendData.part1.api_key}       
        }      
       
        <br>
        ${"--- arrData.part1.subject --- "+sendData.part1.subject}
        <br>                  
        ${"--- arrData.part1.email_from --- "+sendData.part1.email_from}                  
        <br>
        ${"--- arrData.part1.email_to --- "+sendData.part1.email_to}                  
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
                  from: '"☁️ The Cloud ☁️" <'+sendData.part1.email_from+'>',

                  to: (api_is_correct)?sendData.part1.email_to : process.env.API_ADMIN_EMAIL,

                  subject: sendData.part1.subject,
                  // subject: "New Form Submission 111",
                  // text: "text 555",
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

      let info = await transporter.sendMail({
          from: '"☁️ The Cloud ☁️" <'+sendData.part1.email_from+'>',

          to: process.env.API_ADMIN_EMAIL,
          subject:  "error 202 - API_KEY not correct !",
          // subject: "New Form Submission 111",
          // text: "text 555",
          html: sendData.part1.api_key,
      })


      // Catch and log error.
    callback(error)
  }
}
