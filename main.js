class FormValidator {
  constructor() {
    this.info = document.getElementById('info__container');
    this.paragraph = document.getElementById('message');
    this.closeInfoBtn = document.getElementById('closeInfo');
    this.form = document.getElementById('form');
    this.inputs = this.form.querySelectorAll('input');
    this.submitBtn = this.form.querySelector('input[type=submit]');

    this.setupListeners();
  }

  openInfo(msg) {
    this.paragraph.innerHTML = msg;
    this.info.classList.add('show');
    this.info.classList.remove('hide');
  }

  closeInfo() {
    this.info.classList.remove('show');
    this.info.classList.add('hide');
  }

  isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  isStrongPassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    return (
      password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
    );
  }

  validateInput(input) {
    if (input.type === 'email' && !this.isValidEmail(input.value)) {
      return `El campo ${input.name} debe ser una dirección de correo válida.`;
    }
    if ((input.id === 'name' || input.id === 'surname') && input.value.trim().length < 1) {
      return `El campo ${input.name} debe tener al menos 1 carácter.`;
    }
    if (input.type === 'password' && !this.isStrongPassword(input.value)) {
      return `
          <h4>La contraseña debe ser fuerte y cumplir con los criterios de seguridad.</h4>
          <ol>
            <li>Tener 8 Caracteres mínimo.</li>
            <li>Tener una mayúscula.</li>
            <li>Tener una minúscula.</li>
            <li>Tener un Numero.</li>
            <li>Tener un Caracter Especial.</li>
          </ol>
        `;
    }
    if (input.value.trim() === '') {
      return `El campo ${input.name} es obligatorio.`;
    }
    return '';
  }

  validInputs() {
    let error = false;

    this.inputs.forEach((input) => {
      const errorMessage = this.validateInput(input);
      if (errorMessage) {
        this.openInfo(errorMessage);
        error = true;
      }
    });

    return !error;
  }

  handleSubmit(e) {
    if (!this.validInputs()) {
      e.preventDefault();
    }
  }

  setupListeners() {
    this.closeInfoBtn.addEventListener('click', () => {
      this.closeInfo();
    });

    this.form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });

    this.inputs.forEach((input) => {
      input.addEventListener('blur', (e) => {
        const errorMessage = this.validateInput(e.target);
        if (errorMessage) {
          this.openInfo(errorMessage);
          input.style.border = '1px solid red';
        } else {
          input.style.border = '1px solid green';
        }
      });
    });

    this.form.addEventListener('reset', () => {
      this.inputs.forEach((input) => {
        input.style.border = '';
      });
      this.closeInfo();
    });
  }
}

// Initialize the FormValidator class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator();
});
