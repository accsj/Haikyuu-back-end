## Este é o back-end do meu projeto pessoal website Haikyuu inspirado no anime japônes.

- Neste projeto eu optei por usar o banco de dados Postgresql na versão 16, testei juntamente com o meu banco local, mas estou visando criar o banco de dados pelo site Neon.tech para testar em deploy.
- Com esse projeto eu pude aprender e lidar também com certos problemas de integrações server/client, desde problemas com cors até csp.
- Busquei nesse projeto fazer da melhor maneira a lógica de programação do banco de dados para que não houvesse falhas de segurança, segui algumas etapas como criptografar as senhas antes de serem enviadas para o banco de dados para isso utilizei a biblioteca bcrypt.
- Também pude aprender como gerenciar um token jwt, e a melhor forma de armazenar ele com segurança para que não tenha falhas de injeção sql, para isso eu usei a biblioteca "cookie-parser" para armazenar o token no client side como um cookie, também usei a biblioteca "jsonwebtoken" para a criação do mesmo.
- Optei por usar a biblioteca Nodemailer.js, muito conhecida já em aplicações node, para fazer envio de email para recuperação de senha, nessa lógica ao gerar o token, ele tem um prazo de validade pois o mesmo vai com o link do email para fazer alterações de senha, tudo de uma forma muito segura.

Neste pequeno projeto pessoal eu tive muitos obstáculos, principalmente porque eu tinha ideia de fazer coisas, porém não sabia fazer-las, mas isso não me desanimou e corri atrás de buscar entender e implementar no meu código, e aos poucos eu consegui desenvolver ele da forma que eu gostaria. Pretendo continuar fazendo alterações no projeto Haikyuu como um todo por um bom tempo, e as habilidades que adquiri como a noção de database e a lógica para registar um usuário eu irei replicar em futuros projetos, sempre prezando a segurança do usuário.


OBS: o client server está ainda em desenvolvimento, tem muitas coisas que eu ainda não sei fazer porém irei postar mesmo assim daqui há alguns dias e com o tmepo irei atualizando.


