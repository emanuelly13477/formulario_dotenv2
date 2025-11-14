var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("pages/formulario");
});

router.post("/formulario", (req, res) => {
  // NODEMAILER
  const { nome, mensagem, email, telefone } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      secure: false,
      ignoreTLS:true,
      rejectUnauthorized: false,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Formulário enviado",
    html: `
        <h2>Novo envio do formulário</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>Mensagem:</b> ${mensagem}</p>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erro:", error);
      return res.send("Erro ao enviar e-mail");
    }

    console.log("Email enviado:", info.response);
    res.send("E-mail enviado com sucesso!");
  });
});

module.exports = router;