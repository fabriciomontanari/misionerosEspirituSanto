        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const loginBtn = document.getElementById('login-btn');
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;
            
            loginBtn.classList.add('loading');
            loginBtn.textContent = 'Iniciando...';
            
            setTimeout(() => {
                loginBtn.classList.remove('loading');
                loginBtn.textContent = 'Iniciar Sesión';
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: 'Inicio de sesión exitoso',
                    timer: 2000,
                    timerProgressBar: true
                });
            }, 1500);
        });
        
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.validity.valid) {
                    this.style.borderColor = 'var(--success-color)';
                } else if (this.value) {
                    this.style.borderColor = 'var(--error-color)';
                }
            });
            
            input.addEventListener('input', function() {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
        });
        
        function showForgotPassword() {
            Swal.fire({
                title: 'Recuperar Contraseña',
                input: 'email',
                inputPlaceholder: 'Ingresa tu correo electrónico',
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d4a853',
                inputValidator: (value) => {
                    if (!value || !value.includes('@')) {
                        return 'Ingresa un correo válido';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Correo Enviado',
                        text: 'Revisa tu bandeja de entrada para recuperar tu contraseña',
                        timer: 3000,
                        timerProgressBar: true
                    });
                }
            });
        }
        
        document.addEventListener('mousemove', function(e) {
            const container = document.getElementById('login-container');
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            container.style.transform = `perspective(1000px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
        });
        
        document.addEventListener('mouseleave', function() {
            const container = document.getElementById('login-container');
            container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
