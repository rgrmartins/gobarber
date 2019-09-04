// Configurações de envio de email
export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '1ad898acb85a66',
    pass: 'c4c864c71c5b94',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/**
 * ----- Serviços de envio de email -----
 * Amazon SES
 * Mailgun
 * Sparkpost
 * Mandril (Somente pra quem usa Mailchimp)
 * Mailtrap (Funciona somente em ambiente de DEV (vai nos atender))
 */
