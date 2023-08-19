const Sib = require('sib-api-v3-sdk');

require('dotenv').config()

exports.sendMail = (req, res) => {
    
    // const tranEmailApi = new brevo.TransactionalEmailsApi();

    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key'];

    apiKey.apiKey = process.env.api_keys;

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const receiverEmail = req.body.email;
    const sender = {
        email: 'soumyadebsutradhar@gmail.com'
    };
    
    const  receivers = [
        {
            email: receiverEmail
        }
    ];
    
    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Reset Password',
        textContent: `Hello`
    }).then((res) => {
        console.log('mail sent');
    }).catch((err) => {
        console.log(err);
        res.json({err})
    });
}