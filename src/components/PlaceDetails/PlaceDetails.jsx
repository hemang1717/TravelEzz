import React from "react";
import { Box, Typography,Button,Card,CardMedia,CardContent,CardActions,Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles'

const PlaceDetails=({place,selected,refProp}) =>{
	const classes=useStyles()

	if(selected) refProp?.current?.scrollIntoView({behaviour:"smooth",block:"start"})
	return(
		<Card elevation={6}>
			<CardMedia
				style={{height:350}}
				image={place.photo ? place.photo.images.large.url:'https://th.bing.com/th/id/OIP.-rjnHLPwa3aWgruv_G1FAQHaE8?pid=ImgDet&w=1600&h=1067&rs=1'}
				title={place.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5">{place.name}</Typography>
				<Box display="flex" justifyContent="space-between">
					<Rating  value={Number(place.rating)} readOnly/>
					<Typography variant="subtitle1">out of{place.num_reviews}</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Typography variant="subtitle1">Price</Typography>
					<Typography variant="subtitle1">{place.price_level}</Typography>
				</Box>
                                <Box display="flex" justifyContent="space-between">
					<Typography variant="subtitle1">Ranking</Typography>
					<Typography variant="subtitle1">{place.ranking}</Typography>
				</Box>

				{place?.awards?.map((award)=>(
					<Box my={1} display="flex" justifyContent="space-between" alignItems="center">
						<img src={award.images.small} alt={award.display_name}/>
						<Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
					</Box>
				))}

				{place?.cuisine?.map(({name})=>(
					<Chip key={name} size="small" label={name} className={classes.chip}/>	
				))}

				{place?.address && (
					<Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
						<LocationOnIcon/>{place.address}
					</Typography>
				)}

				{place?.phone && (
					<Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
						<PhoneIcon/>{place.phone}
					</Typography>
				)}

				<CardActions>
					<Button size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')}>
						Trip Advisor
					</Button>
					<Button size="small" color="primary" onClick={()=>window.open(place.website,'_blank')}>
						Website
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	)
}
export default PlaceDetails