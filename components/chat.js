class Chat {
    $container;
    $btnLogout;
    constructor () {
        this.$container = document.createElement('div');
        this.$btnLogout = document.createElement('button');
        this.$btnLogout.addEventListener('click', this.handleLogout);
        this.$btnLogout.innerHTML = 'Log out';
    }

    handleLogout = () => {
        firebase.auth().signOut();
    }

    render() {
        this.$container.innerHTML = 'Chat';
        this.$container.appendChild(this.$btnLogout);
        return this.$container;
    }
}

export { Chat };