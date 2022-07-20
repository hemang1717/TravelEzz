import React,{useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Typography, InputBase, Box} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import { CancelScheduleSendSharp } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles'

// import { FaAirbnb } from "react-icons/fa";
// import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { FcGlobe } from "react-icons/fc";
const Header = ({setCoordinates}) => {
	const classes=useStyles();
	const [autocomplete,setAutocomplete]=useState(null)

	const onLoad=(autoC)=>setAutocomplete(autoC)

	const onPlaceChanged=() =>{
		const lat=autocomplete.getPlace().geometry.location.lat()
		const lng=autocomplete.getPlace().geometry.location.lng()
		setCoordinates({lat,lng})
	}
	return (
		<AppBar position="static" className={classes.appbar}>
			<icon></icon>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5" className={classes.title}>
					<FcGlobe/> Travel Easy
				</Typography>
				<Box display="flex">
					<Typography variant="h6" className={classes.title}>
						Explore the world
					</Typography>
					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
					    <div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon/>
						</div>
						<InputBase placeholder="Search...." classes={{root:classes.inputRoot , input:classes.inputInput}}/>
					    </div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default Header;
