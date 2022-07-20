import React,{useState,useEffect} from "react";
import {CssBaseline,Grid} from '@material-ui/core'

import Header from "./components/Header/header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import {getPlacesData} from './api/index'
import { getWeatherData } from "./api/index";
const App = () => {
	const [ weatherData , setWeatherData]=useState([]);
	const [ places , setPlaces]=useState([]);
	const[filteredPlaces,setfilteredPlaces]=useState([])
	const[childClicked,setChildClicked]=useState(null);

	const [coordinates,setCoordinates]=useState({});
	const [bounds,setBounds]=useState({});

	const[isLoading,setIsLoading]=useState(false);

	const [type,setType]=useState('restaurants');
	const [rating,setRating]=useState('');

	useEffect(()=>{
		navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
		      setCoordinates({lat:latitude,lng:longitude});
		})
	},[])

	useEffect(()=>{
		const filteredPlaces=places.filter((place) => place.rating > rating)
		setfilteredPlaces(filteredPlaces);
	},[rating]);

	useEffect(()=>{
	    if(bounds.sw && bounds.ne)
	    {
	    setIsLoading(true);
	     getWeatherData(coordinates.lat,coordinates.lng)
		.then((data)=> setWeatherData(data));


             getPlacesData(type,bounds.sw,bounds.ne)
	     	.then((data) => {
			// console.log('data aa rha h')
			// console.log(data)
			setPlaces(data?.filter((place)=>place.name && place.num_reviews>0 ));
			setfilteredPlaces([])
			setIsLoading(false);
	     })
	}
	}, [type,bounds]); 
	return (
		<>
			<CssBaseline/>
			<Header setCoordinates={setCoordinates}/>
			<Grid container spacin={3} style={{width:'100%'}}>
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
					weatherData={weatherData}
					/>
				</Grid>

			</Grid>
		</>
	)
}
export default App