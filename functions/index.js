const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const nodemailer = require('nodemailer')

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  port: 587,
  auth: {
    user: 'maprada94@gmail.com',
    pass: 'qkyeijechkzvlyeb'
  },
  tls: {
    rejectUnauthorized: false
  }

});

exports.fireStoreUpdate = functions.firestore
  .document('clients/{clientsId}')
  .onUpdate(event => {
    const inputDataAfter = event.after.data();
    const inputDataBefore = event.before.data();

    if (inputDataBefore.verify === false && inputDataAfter.verify == true) {
      const mailOptions = {
        from: '"Petra2 Kondang" <maprada94@gmail.com>',
        to: inputDataAfter.email,
        subject: `Terima Kasih Atas Pendaftarannya, ${inputDataAfter.firstName}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml">
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Zen Flat Ping Email</title>
                <style type="text/css" media="screen">
              
                  /* Force Hotmail to display emails at full width */
                  .ExternalClass {
                    display: block !important;
                    width: 100%;
                  }
              
                  /* Force Hotmail to display normal line spacing */
                  .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass span,
                  .ExternalClass font,
                  .ExternalClass td,
                  .ExternalClass div {
                    line-height: 100%;
                  }
              
                  body,
                  p,
                  h1,
                  h2,
                  h3,
                  h4,
                  h5,
                  h6 {
                    margin: 0;
                    padding: 0;
                  }
              
                  body,
                  p,
                  td {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 15px;
                    color: #333333;
                    line-height: 1.5em;
                  }
              
                  h1 {
                    font-size: 24px;
                    font-weight: normal;
                    line-height: 24px;
                  }
              
                  body,
                  p {
                    margin-bottom: 0;
                    -webkit-text-size-adjust: none;
                    -ms-text-size-adjust: none;
                  }
              
                  img {
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                  }
              
                  a img {
                    border: none;
                  }
              
                  .background {
                    background-color: #333333;
                  }
              
                  table.background {
                    margin: 0;
                    padding: 0;
                    width: 100% !important;
                  }
              
                  .block-img {
                    display: block;
                    line-height: 0;
                  }
              
                  a {
                    color: white;
                    text-decoration: none;
                  }
              
                  a,
                  a:link {
                    color: #2A5DB0;
                    text-decoration: underline;
                  }
              
                  table td {
                    border-collapse: collapse;
                  }
              
                  td {
                    vertical-align: top;
                    text-align: left;
                  }
              
                  .wrap {
                    width: 600px;
                  }
              
                  .wrap-cell {
                    padding-top: 30px;
                    padding-bottom: 30px;
                  }
              
                  .header-cell,
                  .body-cell,
                  .footer-cell {
                    padding-left: 20px;
                    padding-right: 20px;
                  }
              
                  .header-cell {
                    background-color: #eeeeee;
                    font-size: 24px;
                    color: #ffffff;
                  }
              
                  .body-cell {
                    background-color: #ffffff;
                    padding-top: 30px;
                    padding-bottom: 34px;
                  }
              
                  .footer-cell {
                    background-color: #eeeeee;
                    text-align: center;
                    font-size: 13px;
                    padding-top: 30px;
                    padding-bottom: 30px;
                  }
              
                  .card {
                    width: 400px;
                    margin: 0 auto;
                  }
              
                  .data-heading {
                    text-align: right;
                    padding: 10px;
                    background-color: #ffffff;
                    font-weight: bold;
                  }
              
                  .data-value {
                    text-align: left;
                    padding: 10px;
                    background-color: #ffffff;
                  }
              
                  .force-full-width {
                    width: 100% !important;
                  }
              
                </style>
                <style type="text/css" media="only screen and (max-width: 600px)">
                  @media only screen and (max-width: 600px) {
                    body[class*="background"],
                    table[class*="background"],
                    td[class*="background"] {
                      background: #eeeeee !important;
                    }
              
                    table[class="card"] {
                      width: auto !important;
                    }
              
                    td[class="data-heading"],
                    td[class="data-value"] {
                      display: block !important;
                    }
              
                    td[class="data-heading"] {
                      text-align: left !important;
                      padding: 10px 10px 0;
                    }
              
                    table[class="wrap"] {
                      width: 100% !important;
                    }
              
                    td[class="wrap-cell"] {
                      padding-top: 0 !important;
                      padding-bottom: 0 !important;
                    }
                  }
                </style>
              </head>
              
              <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="" class="background">
                <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" class="background">
                  <tr>
                    <td align="center" valign="top" width="100%" class="background">
                      <center>
                        <table cellpadding="0" cellspacing="0" width="600" class="wrap">
                          <tr>
                            <td valign="top" class="wrap-cell" style="padding-top:30px; padding-bottom:30px;">
                              <table cellpadding="0" cellspacing="0" class="force-full-width">
                                <tr>
                                 <td height="60" valign="top" class="header-cell">
                                    <img width="60" height="60" src="https://firebasestorage.googleapis.com/v0/b/reuni-80594.appspot.com/o/Assets%2FPPPK_Petra_Logo.png?alt=media&token=49aaefe0-1251-48ce-a352-6182f8dde2e0" alt="logo">
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" class="body-cell">
              
                                    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
                                      <tr>
                                        <td valign="top" style="padding-bottom:15px; background-color:#ffffff;">
                                          <h1>Menunggu Pembayaran</h1>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td valign="top" style="padding-bottom:20px; background-color:#ffffff;">
                                          <b>Terima kasih, ${inputDataAfter.firstName} untuk pendaftaran yg sudah dilakukan,</b><br>
                                          Selanjutnya silahkan upload foto bukti transfer Anda:
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff">
                                            <tr>
                                              <td style="width:200px;background:#008000;">
                                                <div><!--[if mso]>
                                                  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:40px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#008000">
                                                    <w:anchorlock/>
                                                    <center>
                                                  <![endif]-->
                                                      <a href="https://reuni-80594.firebaseapp.com/Client/Verify/${inputDataAfter.id}"
                                                style="background-color:#008000;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:18px;line-height:40px;text-align:center;text-decoration:none;width:250px;-webkit-text-size-adjust:none;">Upload Bukti Pembayaran</a>
                                                  <!--[if mso]>
                                                    </center>
                                                  </v:rect>
                                                <![endif]--></div>
                                              </td>
                                              <td width="360" style="background-color:#ffffff; font-size:0; line-height:0;">&nbsp;</td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding-top:20px;background-color:#ffffff;">
                                          Terima kasih,<br>
                                          Salam,
                                          Panitia Reuni 25th 
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" class="footer-cell">
                                  SMA Kr. Petra 2 angkatan 94
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </center>
                    </td>
                  </tr>
                </table>
              
              </body>
              </html>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return false;
        }
        return true;
      });
    }

    if (inputDataBefore.verifyPayment === false && inputDataAfter.verifyPayment == true) {
      //send qr code
      const mailOptionsQr = {
        from: '"Petra2 Kondang" <maprada94@gmail.com>',
        to: inputDataAfter.email,
        subject: `Terima Kasih Atas Pendaftarannya, ${inputDataAfter.firstName}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Zen Flat Ping Email</title>
            <style type="text/css" media="screen">
                /* Force Hotmail to display emails at full width */
                .ExternalClass {
                    display: block !important;
                    width: 100%;
                }
        
                /* Force Hotmail to display normal line spacing */
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                }
        
                body,
                p,
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    margin: 0;
                    padding: 0;
                }
        
                body,
                p,
                td {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 15px;
                    color: #333333;
                    line-height: 1.5em;
                }
        
                h1 {
                    font-size: 24px;
                    font-weight: normal;
                    line-height: 24px;
                }
        
                body,
                p {
                    margin-bottom: 0;
                    -webkit-text-size-adjust: none;
                    -ms-text-size-adjust: none;
                }
        
                img {
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                a img {
                    border: none;
                }
        
                .background {
                    background-color: #333333;
                }
        
                table.background {
                    margin: 0;
                    padding: 0;
                    width: 100% !important;
                }
        
                .block-img {
                    display: block;
                    line-height: 0;
                }
        
                a {
                    color: white;
                    text-decoration: none;
                }
        
                a,
                a:link {
                    color: #2A5DB0;
                    text-decoration: underline;
                }
        
                table td {
                    border-collapse: collapse;
                }
        
                td {
                    vertical-align: top;
                    text-align: left;
                }
        
                .wrap {
                    width: 600px;
                }
        
                .wrap-cell {
                    padding-top: 30px;
                    padding-bottom: 30px;
                }
        
                .header-cell,
                .body-cell,
                .footer-cell {
                    padding-left: 20px;
                    padding-right: 20px;
                }
        
                .header-cell {
                    background-color: #eeeeee;
                    font-size: 24px;
                    color: #ffffff;
                }
        
                .body-cell {
                    background-color: #ffffff;
                    padding-top: 30px;
                    padding-bottom: 34px;
                }
        
                .footer-cell {
                    background-color: #eeeeee;
                    text-align: center;
                    font-size: 13px;
                    padding-top: 30px;
                    padding-bottom: 30px;
                }
        
                .card {
                    width: 400px;
                    margin: 0 auto;
                }
        
                .data-heading {
                    text-align: right;
                    padding: 10px;
                    background-color: #ffffff;
                    font-weight: bold;
                }
        
                .data-value {
                    text-align: left;
                    padding: 10px;
                    background-color: #ffffff;
                }
        
                .force-full-width {
                    width: 100% !important;
                }
            </style>
            <style type="text/css" media="only screen and (max-width: 600px)">
                @media only screen and (max-width: 600px) {
        
                    body[class*="background"],
                    table[class*="background"],
                    td[class*="background"] {
                        background: #eeeeee !important;
                    }
        
                    table[class="card"] {
                        width: auto !important;
                    }
        
                    td[class="data-heading"],
                    td[class="data-value"] {
                        display: block !important;
                    }
        
                    td[class="data-heading"] {
                        text-align: left !important;
                        padding: 10px 10px 0;
                    }
        
                    table[class="wrap"] {
                        width: 100% !important;
                    }
        
                    td[class="wrap-cell"] {
                        padding-top: 0 !important;
                        padding-bottom: 0 !important;
                    }
                }
            </style>
        </head>
        
        <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="" class="background">
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" class="background">
                <tr>
                    <td align="center" valign="top" width="100%" class="background">
                        <center>
                            <table cellpadding="0" cellspacing="0" width="600" class="wrap">
                                <tr>
                                    <td valign="top" class="wrap-cell" style="padding-top:30px; padding-bottom:30px;">
                                        <table cellpadding="0" cellspacing="0" class="force-full-width">
                                            <tr>
                                                <td height="60" valign="top" class="header-cell">
                                                    <img width="60" height="60" src="https://firebasestorage.googleapis.com/v0/b/reuni-80594.appspot.com/o/Assets%2FPPPK_Petra_Logo.png?alt=media&token=49aaefe0-1251-48ce-a352-6182f8dde2e0"
                                                        alt="logo">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" class="body-cell">
        
                                                    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
                                                        <tr>
                                                            <td valign="top" style="text-align:center;padding-bottom:15px; background-color:#ffffff;">
                                                                <h1>Undangan</h1>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="top" style="padding-bottom:20px; background-color:#ffffff; text-align: center;">
                                                                <b>Terima kasih, ${inputDataAfter.firstName} </b><br>
                                                                Kami lampirkan undangan berupa qr code:
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff">
                                                                    <tr>
                                                                        <td style="text-align:center;width:auto;background:#fff;">
                                                                            <div style="display: block;
                                                                            margin-left: auto;
                                                                            margin-right: auto;
                                                                            width: 280px;
                                                                            height: 280px ">
                                                                                <!--[if mso]>
                                                          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:40px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#008000">
                                                            <w:anchorlock/>
                                                            <center>
                                                          <![endif]-->
                                                          <img 
                                                          style="width: 100%" 
src="https://api.qrserver.com/v1/create-qr-code/?data=https://reuni-80594.firebaseapp.com/Person/${inputDataAfter.id}" />
                                                                                <!--[if mso]>
                                                            </center>
                                                          </v:rect>
                                                        <![endif]-->
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-top:20px;background-color:#ffffff;">
                                                                Terima kasih,<br>
                                                                Salam,
                                                                Panitia Reuni 25th
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" class="footer-cell">
                                                    SMA Kr. Petra 2 angkatan 94
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </center>
                    </td>
                </tr>
            </table>
        
        </body>
        
        </html>`
      };

      transporter.sendMail(mailOptionsQr, (error, info) => {
        if (error) {
          return false;
        }
        return true;
      });

      //send request family data
      const mailOption = {
        from: '"Petra2 Kondang" <maprada94@gmail.com>',
        to: inputDataAfter.email,
        subject: `Terima Kasih Atas Pendaftarannya, ${inputDataAfter.firstName}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Zen Flat Ping Email</title>
          <style type="text/css" media="screen">
            /* Force Hotmail to display emails at full width */
            .ExternalClass {
              display: block !important;
              width: 100%;
            }
        
            /* Force Hotmail to display normal line spacing */
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
        
            body,
            p,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              margin: 0;
              padding: 0;
            }
        
            body,
            p,
            td {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 15px;
              color: #333333;
              line-height: 1.5em;
            }
        
            h1 {
              font-size: 24px;
              font-weight: normal;
              line-height: 24px;
            }
        
            body,
            p {
              margin-bottom: 0;
              -webkit-text-size-adjust: none;
              -ms-text-size-adjust: none;
            }
        
            img {
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
        
            a img {
              border: none;
            }
        
            .background {
              background-color: #333333;
            }
        
            table.background {
              margin: 0;
              padding: 0;
              width: 100% !important;
            }
        
            .block-img {
              display: block;
              line-height: 0;
            }
        
            a {
              color: white;
              text-decoration: none;
            }
        
            a,
            a:link {
              color: #2A5DB0;
              text-decoration: underline;
            }
        
            table td {
              border-collapse: collapse;
            }
        
            td {
              vertical-align: top;
              text-align: left;
            }
        
            .wrap {
              width: 600px;
            }
        
            .wrap-cell {
              padding-top: 30px;
              padding-bottom: 30px;
            }
        
            .header-cell,
            .body-cell,
            .footer-cell {
              padding-left: 20px;
              padding-right: 20px;
            }
        
            .header-cell {
              background-color: #eeeeee;
              font-size: 24px;
              color: #ffffff;
            }
        
            .body-cell {
              background-color: #ffffff;
              padding-top: 30px;
              padding-bottom: 34px;
            }
        
            .footer-cell {
              background-color: #eeeeee;
              text-align: center;
              font-size: 13px;
              padding-top: 30px;
              padding-bottom: 30px;
            }
        
            .card {
              width: 400px;
              margin: 0 auto;
            }
        
            .data-heading {
              text-align: right;
              padding: 10px;
              background-color: #ffffff;
              font-weight: bold;
            }
        
            .data-value {
              text-align: left;
              padding: 10px;
              background-color: #ffffff;
            }
        
            .force-full-width {
              width: 100% !important;
            }
          </style>
          <style type="text/css" media="only screen and (max-width: 600px)">
            @media only screen and (max-width: 600px) {
        
              body[class*="background"],
              table[class*="background"],
              td[class*="background"] {
                background: #eeeeee !important;
              }
        
              table[class="card"] {
                width: auto !important;
              }
        
              td[class="data-heading"],
              td[class="data-value"] {
                display: block !important;
              }
        
              td[class="data-heading"] {
                text-align: left !important;
                padding: 10px 10px 0;
              }
        
              table[class="wrap"] {
                width: 100% !important;
              }
        
              td[class="wrap-cell"] {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
              }
            }
          </style>
        </head>
        
        <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="" class="background">
          <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" class="background">
            <tr>
              <td align="center" valign="top" width="100%" class="background">
                <center>
                  <table cellpadding="0" cellspacing="0" width="600" class="wrap">
                    <tr>
                      <td valign="top" class="wrap-cell" style="padding-top:30px; padding-bottom:30px;">
                        <table cellpadding="0" cellspacing="0" class="force-full-width">
                          <tr>
                            <td height="60" valign="top" class="header-cell">
                              <img width="60" height="60" src="https://firebasestorage.googleapis.com/v0/b/reuni-80594.appspot.com/o/Assets%2FPPPK_Petra_Logo.png?alt=media&token=49aaefe0-1251-48ce-a352-6182f8dde2e0"
                                alt="logo">
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" class="body-cell">
        
                              <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
                                <tr>
                                  <td valign="top" style="padding-bottom:15px; background-color:#ffffff;">
                                    <h1>Pengisian kelengkapan data</h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" style="padding-bottom:20px; background-color:#ffffff;">
                                    <b>Terima kasih, ${inputDataAfter.firstName} untuk pendaftaran yg sudah dilakukan,</b><br>
                                    Selanjutnya silahkan di isi untuk kelengkapan data orang ke 2 dan seterus nya.:
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff">
                                      <tr>
                                        <td style="width:200px;background:#008000;">
                                          <div>
                                            <!--[if mso]>
                                                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:40px;v-text-anchor:middle;width:200px;" stroke="f" fillcolor="#008000">
                                                          <w:anchorlock/>
                                                          <center>
                                                        <![endif]-->
                                            <a href="https://reuni-80594.firebaseapp.com/Client/Verify/${inputDataAfter.id}/Child"
                                              style="background-color:#008000;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:18px;line-height:40px;text-align:center;text-decoration:none;width:250px;-webkit-text-size-adjust:none;">Isi
                                              Kelengkapan data</a>
                                            <!--[if mso]>
                                                          </center>
                                                        </v:rect>
                                                      <![endif]-->
                                          </div>
                                        </td>
                                        <td width="360" style="background-color:#ffffff; font-size:0; line-height:0;">&nbsp;</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-top:20px;background-color:#ffffff;">
                                    Terima kasih,<br>
                                    Salam,
                                    Panitia Reuni 25th
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" class="footer-cell">
                              SMA Kr. Petra 2 angkatan 94
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </center>
              </td>
            </tr>
          </table>
        
        </body>
        
        </html>`
      };
      const totalAmountTiket = inputDataAfter.ticketAmountDewasa

      for (var i = 0; i <= totalAmountTiket - 2; i++) {
        transporter.sendMail(mailOption, (error, info) => {
          if (error) {
            return false;
          }
          return true;
        });
      }

    }





    // return send = require('gmail-send')({
    //     //var send = require('../index.js')({
    //     user: 'ch.budi9@gmail.com',
    //     // user: credentials.user,                  // Your GMail account used to send emails
    //     pass: 'pbiddhnnzxokouxf',
    //     // pass: credentials.pass,                  // Application-specific password
    //     to: 'chris_budi@iou',
    //     // to:   credentials.user,                  // Send to yourself
    //     // you also may set array of recipients:
    //     // [ 'user1@gmail.com', 'user2@gmail.com' ]
    //     // from:    credentials.user,            // from: by default equals to user
    //     // replyTo: credentials.user,            // replyTo: by default undefined
    //     // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
    //     subject: 'test subject',
    //     text: 'gmail-send example 1',         // Plain text
    //     //html:    '<b>html text</b>'            // HTML
    // }, (err, res) => {
    //     console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
    // });

    // return transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
    // return sgMail.send(msg)
    //     .then(() => console.log("email send"))
    //     .catch((err) => console.log(err));;
    // const db = admin.firestore();
    // return db.collection('clients').doc(clientsId).get().then(doc => {
    //     const user = doc.data();
    //     const msg = {
    //         to: user.email,
    //         from: 'hello@angularfirebase.com',
    //         subject: 'new follower',
    //         template: 'd-feec37c3cc94490ba4818b3b645566d4',
    //         substitutionalWrappers: ['{{', '}}'],
    //         substitutions: {
    //             name: user.firstName
    //         }
    //     }
    //     return sgMail.send(msg);
    // })
    //     .then(() => console.log('email sent!'))
    //     .catch((err) => console.log(err));
  });


exports.fireStoreCreate = functions.firestore
  .document('clients/{clientsId}')
  .onCreate(event => {
    const inputDataAfter = event.data();

    ///mail ke client bila dia sudah melakukan pendaftaran
    const mailOptions = {
      from: '"Petra2 Kondang" <maprada94@gmail.com>',
      to: inputDataAfter.email,
      subject: `Terima Kasih Atas Pendaftarannya, ${inputDataAfter.firstName}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Zen Flat Ping Email</title>
        <style type="text/css" media="screen">
          /* Force Hotmail to display emails at full width */
          .ExternalClass {
            display: block !important;
            width: 100%;
          }
      
          /* Force Hotmail to display normal line spacing */
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
      
          body,
          p,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 0;
            padding: 0;
          }
      
          body,
          p,
          td {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 15px;
            color: #333333;
            line-height: 1.5em;
          }
      
          h1 {
            font-size: 24px;
            font-weight: normal;
            line-height: 24px;
          }
      
          body,
          p {
            margin-bottom: 0;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
          }
      
          img {
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
      
          a img {
            border: none;
          }
      
          .background {
            background-color: #333333;
          }
      
          table.background {
            margin: 0;
            padding: 0;
            width: 100% !important;
          }
      
          .block-img {
            display: block;
            line-height: 0;
          }
      
          a {
            color: white;
            text-decoration: none;
          }
      
          a,
          a:link {
            color: #2A5DB0;
            text-decoration: underline;
          }
      
          table td {
            border-collapse: collapse;
          }
      
          td {
            vertical-align: top;
            text-align: left;
          }
      
          .wrap {
            width: 600px;
          }
      
          .wrap-cell {
            padding-top: 30px;
            padding-bottom: 30px;
          }
      
          .header-cell,
          .body-cell,
          .footer-cell {
            padding-left: 20px;
            padding-right: 20px;
          }
      
          .header-cell {
            background-color: #eeeeee;
            font-size: 24px;
            color: #ffffff;
          }
      
          .body-cell {
            background-color: #ffffff;
            padding-top: 30px;
            padding-bottom: 34px;
          }
      
          .footer-cell {
            background-color: #eeeeee;
            text-align: center;
            font-size: 13px;
            padding-top: 30px;
            padding-bottom: 30px;
          }
      
          .card {
            width: 400px;
            margin: 0 auto;
          }
      
          .data-heading {
            text-align: right;
            padding: 10px;
            background-color: #ffffff;
            font-weight: bold;
          }
      
          .data-value {
            text-align: left;
            padding: 10px;
            background-color: #ffffff;
          }
      
          .force-full-width {
            width: 100% !important;
          }
        </style>
        <style type="text/css" media="only screen and (max-width: 600px)">
          @media only screen and (max-width: 600px) {
      
            body[class*="background"],
            table[class*="background"],
            td[class*="background"] {
              background: #eeeeee !important;
            }
      
            table[class="card"] {
              width: auto !important;
            }
      
            td[class="data-heading"],
            td[class="data-value"] {
              display: block !important;
            }
      
            td[class="data-heading"] {
              text-align: left !important;
              padding: 10px 10px 0;
            }
      
            table[class="wrap"] {
              width: 100% !important;
            }
      
            td[class="wrap-cell"] {
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            }
          }
        </style>
      </head>
      
      <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="" class="background">
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" class="background">
          <tr>
            <td align="center" valign="top" width="100%" class="background">
              <center>
                <table cellpadding="0" cellspacing="0" width="600" class="wrap">
                  <tr>
                    <td valign="top" class="wrap-cell" style="padding-top:30px; padding-bottom:30px;">
                      <table cellpadding="0" cellspacing="0" class="force-full-width">
                        <tr>
                          <td height="60" valign="top" class="header-cell">
                            <img width="60" height="60" src="https://firebasestorage.googleapis.com/v0/b/reuni-80594.appspot.com/o/Assets%2FPPPK_Petra_Logo.png?alt=media&token=49aaefe0-1251-48ce-a352-6182f8dde2e0"
                              alt="logo">
                          </td>
                        </tr>
                        <tr>
                          <td valign="top" class="body-cell">
      
                            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
                              <tr>
                                <td valign="top" style="padding-bottom:15px; background-color:#ffffff;">
                                  <h1>Terima kasih sudah melakukan pendaftaran</h1>
                                </td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding-bottom:20px; background-color:#ffffff;">
                                  <b>Terima kasih, ${inputDataAfter.firstName} untuk pendaftaran yang sudah di lakukan,</b><br>
                                  Selanjutnya silahkan tunggu hasil konfirmasi dari admin:
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-top:20px;background-color:#ffffff;">
                                  Terima kasih,<br>
                                  Salam,
                                  Panitia Reuni 25th
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td valign="top" class="footer-cell">
                            SMA Kr. Petra 2 angkatan 94
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </center>
            </td>
          </tr>
        </table>
      </body>
      </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return false;
      }
      return true;
    });

    ///mail ke diri sendiri kalau dia sudah melakukan pendaftaran
    var mailOptions2 = {
      from: '"Petra2 Kondang" <maprada94@gmail.com>',
      to: '"Petra2 Kondang" <maprada94@gmail.com>',
      subject: `Pendaftar baru, ${inputDataAfter.firstName}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title></title>
      </head>
      
      <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="" class="background">
          Pendaftar baru, ${inputDataAfter.firstName}
      </body>
      </html>`
    };

    transporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
        return false;
      }
      return true;
    });
  });