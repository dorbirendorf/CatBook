const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendWelcomeEmail = (email,name)=>{
     sgMail.send({
         to:email,
         from:'dorbiren@gmail.com',
         subject:'welcome',
         text:`welcome to the app, ${name} . thank you we love you`
     })
}

const sendGoodbyeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'dorbiren@gmail.com',
        subject:`bye ${name}`,
        text:`${name}we are sorry to see that you are leaving us`
    })
}



module.exports={sendWelcomeEmail,sendGoodbyeEmail}