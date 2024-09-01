        // Inicialize o EmailJS com sua chave pública
        emailjs.init(PUBLIC_KEY);

        function validateForm() {
            const nome = $('#nome').val().trim();
            const email = $('#email').val().trim();
            const mensagem = $('#mensagem').val().trim();

            // Habilita o botão apenas se todos os campos estiverem preenchidos
            $('#send-button').prop('disabled', !(nome && email && mensagem));
        }

        // Valida o formulário ao digitar em qualquer campo
        $('#contactForm').on('input', validateForm);

        // Envia o email
        $('#contactForm').on('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            // Adiciona a classe ativa ao botão
            $('#send-button').addClass('btn-custom-active');

            // Envia o email usando o EmailJS
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(function(response) {
                    $('#flash-message').removeClass('d-none').addClass('show');
                    setTimeout(function() {
                        $('#flash-message').removeClass('show');
                        setTimeout(function() {
                            $('#flash-message').addClass('d-none');
                        }, 400); // Tempo para transição de desaparecimento
                    }, 2000); // Exibe o card por 3 segundos
                    $('#contactForm')[0].reset(); // Limpa o formulário após o envio
                    validateForm(); // Reavaliar o estado do botão
                    // Remove a classe ativa após o envio
                    $('#send-button').removeClass('btn-custom-active');
                    $('#flash-message').removeClass('d-none').addClass('show');

                        
                }, function(error) {
                    alert('Ocorreu um erro ao enviar a mensagem, por favor tente novamente.');
                    console.error('Erro ao enviar email:', error);
                    // Remove a classe ativa em caso de erro
                    $('#send-button').removeClass('btn-custom-active');
                });
        });
        // Função para adicionar o efeito de fade-in ao rolar a página
        $(window).on('scroll', function() {
            $('.section').each(function() {
                if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100) {
                    $(this).addClass('fade-in');
                }
            });
        });
        $(document).ready(function() {
    $(window).on('scroll', function() {
        let scrollPos = $(window).scrollTop() + 100; // Ajuste o valor para melhorar a precisão
        
        $('.section').each(function() {
            let sectionTop = $(this).offset().top;
            let sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
                let id = $(this).attr('id');
                $('.navbar-nav .nav-link').removeClass('active');
                $('.navbar-nav .nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // Adiciona a classe active ao link da seção visível ao carregar a página
    $(window).trigger('scroll');
});
