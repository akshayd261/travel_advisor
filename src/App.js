//Libraries
import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

//API
import { getPlacesData } from "./api";

// Components
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";


const App = () => { 

    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //Moved this two hooks from List.jsx
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    //Hook to get the user's coordinates on Application launch.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}}) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    //Hook to filter the Ratings
    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating]);

    // Hook to get and set bounds and coordinates based onChange of user input on the map.
    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);
            //Since getPlacesData is a async await function, we will need to call .then
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    
                    // console.log(data);
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    //Everytime we get new places we will setFilteredPlaces to an empty array
                    setFilteredPlaces([]);
                    setIsLoading(false);
                })
        }
    }, [type, bounds]);

    return (
        // React-Fragment
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
 }

 export default App;