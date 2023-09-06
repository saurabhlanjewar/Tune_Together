import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
    // const { navigation } = this.props;
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="code"
            placeholder="Enter a Room Code"
            variant="outlined"
            value={this.state.roomCode}
            helperText={this.state.error}
            onChange={this.handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={this.roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          history.push(`/room/${this.state.roomCode}`);
          // this.props.navigate("/room/" + this.state.roomCode);
        } else {
          this.setState({ error: "Room not Found" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// export default function (props) {
//   const navigate = useNavigate();
//   return <RoomJoinPage {...props} navigate={navigate} />;
// }
