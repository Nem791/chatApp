import { setScreen } from "../app.js";
import { InputGroup } from "./input-group.js";
import {Login} from './login.js';

class Register {

    $container;
    $title;

    $formRegister;

    $inputGroupEmail;
    $inputGroupPassword;
    $inputGroupConfirmPassword;
    $inputGroupDisplayName;

    $btnSubmit;
    $linkToLogin;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.style.width = '400px';
        this.$container.style.margin = 'auto';
        this.$container.classList.add('center', 'h-screen', 'flex-col');
        this.$title = document.createElement('h3');
        this.$title.innerHTML = "Register";

        this.$formRegister = document.createElement('form');
        this.$formRegister.addEventListener('submit', this.handleSubmit);

        this.$inputGroupDisplayName = new InputGroup(
            'text',
            'Display name',
            'displayName'
        );

        this.$inputGroupEmail = new InputGroup('email', 'Email', 'email');

        this.$inputGroupPassword = new InputGroup(
            'password',
            'Password',
            'password'
        );

        this.$inputGroupConfirmPassword = new InputGroup(
            'password',
            'Confirm Password',
            'confirmPassword'
        );

        this.$btnSubmit = document.createElement('button');
        this.$btnSubmit.type = 'submit';
        this.$btnSubmit.innerHTML = 'Register';
        this.$linkToLogin = document.createElement('div');
        this.$linkToLogin.classList.add('btn-link');
        this.$linkToLogin.innerHTML = '< Back to Login';
        this.$linkToLogin.addEventListener('click', this.moveToLogin);

        this.$feedbackMessage = document.createElement("div");
    }

    moveToLogin = () => {
        const login = new Login();
        setScreen(login);
    };

    setInputValue(newValue) {
        this.$input.value = newValue;
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        // Validate form
        const email = this.$inputGroupEmail.getInputValue();
        const displayName = this.$inputGroupEmail.getInputValue();
        const password = this.$inputGroupPassword.getInputValue();
        const confirmPassword = this.$inputGroupConfirmPassword.getInputValue();

        this.$inputGroupEmail.setError(null);
        this.$inputGroupPassword.setError(null);
        this.$inputGroupDisplayName.setError(null);
        this.$inputGroupConfirmPassword.setError(null);
        
        if (!email) {
            this.$inputGroupEmail.setError('Email cannot be empty!');
        }
        if (!displayName) {
            this.$inputGroupDisplayName.setError('Display name cannot be empty');
        }
        if (password.length < 6) {
            this.$inputGroupPassword.setError(
                'Password length must be greater than 6'
            );
        }
        if (confirmPassword !== password) {
            this.$inputGroupConfirmPassword.setError('Password does not match');
        }

        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.$feedbackMessage.innerHTML = "Register Successsfully! Please check your mail";
            firebase.auth().currentUser.sendEmailVerification();
            // this.$inputGroupEmail.setinputValue("");
        })
        .catch((error) => {
            console.log(error);
            this.$feedbackMessage.innerHTML = error.toString();
        })

    };

    render() {
        this.$formRegister.appendChild(this.$inputGroupEmail.render());
        this.$formRegister.appendChild(this.$inputGroupDisplayName.render());
        this.$formRegister.appendChild(this.$inputGroupPassword.render());
        this.$formRegister.appendChild(this.$inputGroupConfirmPassword.render());
        this.$formRegister.appendChild(this.$btnSubmit);

        this.$container.appendChild(this.$title);
        this.$container.appendChild(this.$feedbackMessage);
        this.$container.appendChild(this.$formRegister);
        this.$container.appendChild(this.$linkToLogin);
        console.log(this.$container);
        return this.$container;
    }
}

export { Register };