import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import Menu from "../components/Menu.jsx";

import { newGame } from "../redux/actions/actions";

const styles = () => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class TitleBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      menuOpen: false,
    };

  }

  handleMenuClick = () => {
    this.setState({ menuOpen: true });
  }

  handleMenuClose = () => {
    this.setState({ menuOpen: false });
  }

  handleNewGameClick = (itemKey) => {
    if (itemKey === "new") {
      this.props.newGame();
    }

    this.setState({ menuOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { menuOpen } = this.state;

    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleMenuClick}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="h5" color="inherit">
              Tic Tac Toe
            </Typography>
          </Toolbar>
        </AppBar>
        <Menu
          open={menuOpen}
          onItemClick={this.handleNewGameClick}
          onClose={this.handleMenuClose}
        />
      </div>
    );
  }
}

const { object, func } = PropTypes;

TitleBar.propTypes = {
  classes: object.isRequired,
  newGame: func.isRequired,
};

const mapDispatchToProps = {
  newGame,
};

const styledTitleBar = withStyles(styles)(TitleBar);

export default connect(null, mapDispatchToProps)(styledTitleBar);
