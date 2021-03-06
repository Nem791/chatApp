import { setScreen } from "../app.js";
import { InputGroup } from "./input-group.js";
import { Register } from "./register.js";

class Login {
    $container;
    $title;
    $inputGroupEmail;
    $inputGroupPassword;
    $form;
    $btnSubmit;
    $linkToRegister;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('center', 'h-screen', 'flex-col');
        this.$container.style.width = '400px';
        this.$container.style.margin = 'auto';
        this.$title = document.createElement('h3');
        this.$title.innerHTML = 'Login';
        this.$inputGroupEmail = new InputGroup('email', 'Email', 'email');
        this.$inputGroupPassword = new InputGroup('password', 'Password', 'password');
        
        this.$form = document.createElement('form');
        this.$form.addEventListener('submit', this.handleSubmit);
        
        this.$btnSubmit = document.createElement('button');
        this.$btnSubmit.type = 'submit';
        this.$btnSubmit.innerHTML = 'Login';
        this.$linkToRegister = document.createElement('div');
        this.$linkToRegister.innerHTML = '> Create new account';
        this.$linkToRegister.classList.add('btn-link');
        this.$linkToRegister.addEventListener('click', this.moveToRegister);
    }

    moveToRegister = () => {
        const register = new Register();
        setScreen(register);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const email = this.$inputGroupEmail.getInputValue();
        const password = this.$inputGroupPassword.getInputValue();
        // TODO Validation
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
            console.log(userInfo);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        this.$form.appendChild(this.$inputGroupEmail.render());
        this.$form.appendChild(this.$inputGroupPassword.render());
        this.$form.appendChild(this.$btnSubmit);

        this.$container.append(this.$title);
        this.$container.append(this.$form);

        this.$container.appendChild(this.$linkToRegister);
        return this.$container;
    }
}
export { Login };