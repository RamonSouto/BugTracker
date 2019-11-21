# Bug Tacker

Sistema para registro de ***bug de sistema***, utilizado *APIS e Serviços* do *Google Cloud Plataform* (criado credencial), para integração com **planilha** do *Google* salvo na cloud no *Google Drive*, integrado com api de envio de e-mail **[SendGrid](https://app.sendgrid.com/)**, caso o erro seja critoco sera disparado um email com os dados preencidos no formulário. Foi utilizado o **[Zeit](https://zeit.co/)** para hospedar o serviço **[Bug Tracker](bugtracker.joaofirmino872.now.sh)**, no Front-end foi utilizado os CDN's do **[Bootstrap 4.3](https://getbootstrap.com/)**, no back-end foi utilizado **Express** com **BodyParse**

### Home
Página que contém o formulário de preenchimento:

1. Nome
1. E-Mail
1. Classificação
   1. Falha
   1. Critico
   1. Melhoria
2. Como repoduziu o erro?
3. Qual saída esperada?
4. Qual saída recebida?

### Erro
Se ocorrer erro será apresentado uma mensagem:

>Erro ao enviar formulário. <a href="/">Voltar a reportar mais um problema</a>

### Sucess
Se gravar dados na planilha com sucesso será apresentado uma mensagem:

>Seu problema foi reportado com sucesso!!! <a href="/">Voltar a reportar mais um problema</a>