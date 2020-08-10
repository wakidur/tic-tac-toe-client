import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TitleBar from "./pages/TitleBar";
import Game from "./pages/Game";



const styles = (theme) => ({
  content: {
    paddingTop: theme.mixins.toolbar.minHeight + 10,
  },
});

const App = ({ classes }) => {
  return (
    <div>
      <div>
        <header>
         <TitleBar/>
        </header>
      </div>
      <div className={classes.content}>
        <section>
        <Game/>
        </section>
      </div>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
