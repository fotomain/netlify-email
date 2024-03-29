

nodemailer = require("nodemailer")

// v 2023
require('dotenv').config()

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Origin-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    'Content-Type': 'application/json'
};

exports.handler = async function (event, context, callback) {

    const sendData = JSON.parse(event.body)



    const api_is_correct = process.env.API_KEY.toString()===sendData.part1.api_key.toString()


    const  html0 =
            `<div>                    
                ${sendData.part1.message}                            
             </div>
             <div>                    
                ${sendData.part1.signature}                            
             </div>
             <div>                    
                ${sendData.part1.footer}                            
             </div>
            `; //!!!!!!!

    const  html1_debug = `<div style="margin: 20px auto;">
                      
                <br>
                ${"--- arrData.part1.subject    --- "+sendData.part1.subject}
                <br>                  
                ${"--- arrData.part1.email_from --- "+sendData.part1.email_from}                  
                <br>
                ${"--- arrData.part1.email_to   --- "+sendData.part1.email_to}                  
                <br>
                ${"--- arrData.part1.message    --- "+sendData.part1.message}                  
                <br>
                ${"--- event.body --- "+JSON.stringify(event.body)}
                <br>
                ${"--- event.multiValueQueryStringParameters --- "+JSON.stringify(event.multiValueQueryStringParameters)}
                <br>
                "===================="
                <br>
                ${"--- event --- "+JSON.stringify(event) + "--- context --- "+JSON.stringify(context)}
                            
                        </div>`

    var html2 ='';
    var subject2 ='';
    if(!api_is_correct) {

        subject2 ='Problem - '

        html2 = `<div style="margin: 20px auto;">
            <br>
                ${"--- api IS NOT correct --- " + api_is_correct}
                <br>
                ${"--- API_ADMIN_EMAIL --- " + process.env.API_ADMIN_EMAIL}
                <br>
                ${"--- arrData.part1.API_KEY --- " + sendData.part1.api_key}
        `
    }

   // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {

      user: process.env.EMAIL_API_NAME,
      // make special app password api
      pass: process.env.EMAIL_API_PASSWORD,
   },

   })


  try {
    // send mail with defined transport object

                let info = await transporter.sendMail({
                  // '"☁️ The Cloud ☁️" <'+
                  from: sendData.part1.email_from,

                  to: (api_is_correct)?sendData.part1.email_to : process.env.API_ADMIN_EMAIL,

                  subject: subject2 + sendData.part1.subject,

                  // html: html2 + html1_debug + html
                  html: html2 + html0
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
          // "☁️ The Cloud ☁️"

          from: '"☁️ The Error from LifeStyle Cloud ☁️" <'+sendData.part1.email_from+'>',

          to: process.env.API_ADMIN_EMAIL,
          subject:  "error 202 - API_KEY not correct !",
          // subject: "New Form Submission 111",
          // text: "text 555",
          html: error.toString(),
      })


      // Catch and log error.
    callback(error)
  }
}
