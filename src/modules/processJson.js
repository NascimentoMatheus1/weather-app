export default async function getApiData(location) {
    try {
        const apiKey = 'K9K6MMMF255RFLKSLGD7GB27L';
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`
        );

        const responseObj = await response.json();
        const { description, currentConditions, resolvedAddress } = responseObj;

        const { conditions, feelslike, humidity, temp, windspeed } =
            currentConditions;

        return {
            description,
            resolvedAddress,
            conditions,
            feelslike,
            humidity,
            temp,
            windspeed,
        };
    } catch (error) {
        return error;
    }
}
