import React from "react";
import PropTypes from "prop-types";


const PlayerInfo = ({ player, gameover }) => {
  return (
   
      <h1 style={{textAlign: "center"}} variant="body1">
        {gameover && "Gameover!"}
        {!gameover && `Player: ${player}`}
      </h1>
   
  );
};

const { number, bool } = PropTypes;

PlayerInfo.propTypes = {
  player: number.isRequired,
  gameover: bool.isRequired,
};

export default PlayerInfo;
