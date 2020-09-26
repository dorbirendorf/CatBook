import React from "react";
import {CardActions,Typography,CardContent,Button,CardMedia,CardActionArea,Card,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UserCard(props) {
  const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image={props.user.avatar}
//           title="user avatar"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             {props.user.name}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

return(
  <div>
  <h1>{props.user.avatar}</h1>
  <h1>{props.user.name}</h1>
  <h1>{props.user.email}</h1>
  </div>
)}