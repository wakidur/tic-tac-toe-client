import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const styles = (theme) => ({
  icon: {
    fontSize: "2em", // double the size of the square's font size
  },
});

const playerIcon = (player) => {
  switch (player) {
    case 1:
      return "clear"; // X
    case 2:
      return "panorama_fish_eye"; // O
    default:
      return "";
  }
};

const Square = ({ classes, player }) => (
  <Icon className={classes.icon}>{playerIcon(player)}</Icon>
);

Square.propTypes = {
  classes: PropTypes.object.isRequired,
  player: PropTypes.number.isRequired,
};

export default withStyles(styles)(Square);
