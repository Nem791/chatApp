class TitleBar {
    $container;
    $txtName;
    $btnLogout;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('title-bar');

        this.$txtName = document.createElement('div');

        this.$btnLogout = document.createElement('button');
        this.$btnLogout.innerHTML = 'Logout';
    }

    setName(name) {
        this.$txtName.innerHTML = name;
    }

    render() {
        this.$container.appendChild(this.$txtName);
        this.$container.appendChild(this.$btnLogout);
        return this.$container;
    }
}

export {TitleBar}
