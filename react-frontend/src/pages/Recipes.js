import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const Description = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [recommendations, setRecommendations] = React.useState([]);

  const items = "apple, orange";
  async function getRecommendations(items) {
    try {
      const response = await axios.post(
        `http://localhost:8000/recipes/recommend`,
        { ingredients: items },
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const handleClickOpen = async () => {
    const response = await getRecommendations(items);
    console.log(response?.recommendations);
    if (response?.recommendations) {
      setRecommendations(
        response.recommendations.results.map((item) => ({
          image: item.thumbnail_url,
          video: item.video_url,
          name: item.name,
          description: item.description,
          instructions: item.instructions,
          rating: item.user_ratings?.score,
        })),
      );
      setOpen(true);
      console.log(recommendations);
    } else {
      console.error("No recommendations.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Recipes
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: window.innerWidth, margin: 3 }}>
          <Masonry columns={5} spacing={3}>
            {recommendations.map((recommendations, index) => (
              <div key={index}>
                <Label>{recommendations.name}</Label>
                <img
                  srcSet={`${recommendations.image}?w=162&auto=format&dpr=2 2x`}
                  src={`${recommendations.image}?w=162&auto=format`}
                  alt={recommendations.title}
                  loading="lazy"
                  style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: "block",
                    width: "100%",
                  }}
                />
                <Description>{recommendations.description}</Description>
              </div>
            ))}
          </Masonry>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
