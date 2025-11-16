import nodemailer from "nodemailer"

interface SendEmailDTO {
  to: string;
  subject: string;
  body: string;
}

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async send({ to, subject, body }: SendEmailDTO) {
    try {
      await this.transporter.sendMail({
        from: `"Fabio Vieira" <vieirafabio5271@outlook.com>`, 
        to,
        subject,
        text: body,
        html: `<p>${body}</p>`,
      });
      console.log(`Email enviado para ${to} com sucesso!`)
    } catch (error) {
      console.error("Erro ao enviar email:", error)
    }
  }
}

export { EmailService }