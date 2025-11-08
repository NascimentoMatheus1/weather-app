export default async function getApiData(location) {
    try {
        const apiKey = 'K9K6MMMF255RFLKSLGD7GB27L';
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const responseJSON = await response.json();
        const { description, currentConditions, resolvedAddress } =
            responseJSON;

        const { conditions, feelslike, humidity, temp, windspeed } =
            currentConditions;

        const data = {
            description,
            resolvedAddress,
            conditions,
            feelslike,
            humidity,
            temp,
            windspeed,
        };
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
