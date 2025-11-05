export default async function getApiData(location) {
    try {
        const apiKey = 'K9K6MMMF255RFLKSLGD7GB27L';
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`
        );

        const responseObj = await response.json();
        console.log(responseObj);
        const { address, description, currentConditions, resolvedAddress } =
            responseObj;

        const { conditions, feelslike, humidity, icon, temp } =
            currentConditions;

        return {
            address,
            description,
            currentConditions,
            resolvedAddress,
            feelslike,
            humidity,
            icon,
            temp,
            conditions,
        };
    } catch (error) {
        console.log(error);
    }
}
