import getApiData from './processJson';

export default class UI {
    static async initialLoad() {
        UI.loadEventsListeners();
        UI.apiCall('Tokyo, Japan');
    }

    static loadEventsListeners() {
        const form = document.querySelector('form');
        form.addEventListener('submit', UI.checkCityName);
    }

    static async apiCall(location) {
        const data = await getApiData(location);
        if (data) {
            UI.showApiData(data);
        } else {
            UI.showErroMessage('Not found!!!');
        }
    }

    static checkCityName(e) {
        e.preventDefault();
        const main = document.querySelector('main');
        main.innerHTML = '';
        UI.showErroMessage('');

        const cityNameInput = document.getElementById('cityName');
        UI.apiCall(cityNameInput.value);
    }

    static showErroMessage(message) {
        const error = document.getElementById('error');
        error.innerText = message;
    }

    static showApiData(data) {
        const main = document.querySelector('main');
        main.innerHTML = '';
        const contentElem = UI.createContentElement(data);
        main.append(contentElem);
    }

    static createContentElement(data) {
        const information = UI.createHTMLElement('div', {
            class: 'information',
        });
        ['conditions', 'resolvedAddress'].forEach((key) => {
            if (data[key]) {
                const p = UI.createHTMLElement('p', { class: key }, data[key]);
                information.append(p);
            }
        });

        const temps = UI.createHTMLElement('div', { class: 'temps' });
        const temp = UI.createHTMLElement('p', { class: 'temp' }, data.temp);
        temps.append(temp);

        const otherTemp = UI.createHTMLElement('div', { class: 'otherTemp' });
        ['feelslike', 'humidity', 'windspeed'].forEach((key) => {
            if (data[key]) {
                const p = UI.createHTMLElement(
                    'p',
                    { class: key },
                    `${data[key]}`
                );
                otherTemp.append(p);
            }
        });
        temps.append(otherTemp);

        const content = UI.createHTMLElement('div', { class: 'content' });
        content.append(information);
        content.append(temps);

        if (data.description) {
            const description = UI.createHTMLElement(
                'p',
                { class: 'description' },
                data.description
            );
            content.append(description);
        }
        return content;
    }

    static createHTMLElement(tagName, attributes = {}, textContent = '') {
        const element = document.createElement(tagName);

        for (const key in attributes) {
            if (Object.hasOwnProperty.call(attributes, key)) {
                element.setAttribute(key, attributes[key]);
            }
        }

        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    }
}
