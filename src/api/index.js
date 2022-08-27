import axios from 'axios';



export const getPlacesData = async (type, sw, ne) => {
    try {
        //Request Data from RapidAPI
        //By using a template string and retrieving+setting the 'type' when getting data makes this dynamic
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            // Since we are using AXIOS, the method operation is autmatically set to GET
            //   method: 'GET',
            //   url: URL,
              params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': 'Your Rapid API Key Here',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
            });

        return data;
    } catch (error) {
        // Throw Error, if request fails
        console.log(error);
    }
}