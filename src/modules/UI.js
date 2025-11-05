export default class UI {
    static initialLoad() {
        console.log('funcionando');
    }

    static loadEventsListeners() {
        const form = document.querySelector('form');
        form.addEventListener('submit', UI.checkCityName);
    }

    static checkCityName(e) {
        e.preventDefault();
    }
}
