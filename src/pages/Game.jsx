import React, { Component } from "react";
import PropTypes, { object } from "prop-types";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  playTurn,
  checkWinner,
  newGame,
  createActionLog,
  fetchActionLogs,
} from "../redux/actions/actions";

import Board from "../components/Board.jsx";
import PlayerInfo from "../components/PlayerInfo.jsx";
import GameoverDialog from "../components/GameoverDialog.jsx";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      history: [],
    };
  }

  componentDidMount() {
    this.props.fetchActionLogs();
  }

  handleBoardOnMove = async (square) => {
    const { board, player, gameover, playTurn, checkWinner } = this.props;
    const { row, col } = square;

    if (gameover || board[row][col] !== 0) {
      return;
    }

    await playTurn(player, row, col);

    const hasWinner = await checkWinner(board, player);
    this.setGameHistory(this.props, hasWinner);

    if (hasWinner) {
      this.setState({ showDialog: true });
    }
  };

  handleDialogClick = (answer) => {
    if (answer) {
      this.props.newGame();
    }

    this.setState({ showDialog: false });
  };

  handleDialogClose = () => {
    this.setState({ showDialog: false });
  };

  setGameHistory = async ({ player, winner, gameover }) => {
    if (gameover) {
      const isDraw = winner === 0;
      let createLog = {
        date: null,
        gameId: null,
        result: null,
        player: null,
      };

      createLog.date = new Date().toLocaleDateString();
      createLog.gameId = Math.floor(Math.random() * 100 + 1);
      createLog.result = isDraw ? "Draw" : `Winner`;
      createLog.player = isDraw ? null : player;

      await this.props.createActionLog(createLog);
      await this.props.fetchActionLogs();
    }
  };

  render() {
    const { showDialog } = this.state;
    const { board, player, gameover, winner, fatchLogs } = this.props;
    const draw = winner === 0;

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <PlayerInfo player={player} gameover={gameover} />
            <Board board={board} onMove={this.handleBoardOnMove} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">GameId</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Player</TableCell>
                    <TableCell align="right">Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fatchLogs.map((log, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {log.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {" "}
                          {log.gameId}
                        </TableCell>
                        <TableCell align="right">{log.date}</TableCell>
                        <TableCell align="right">{log.player}</TableCell>
                        <TableCell align="right">{log.result}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <GameoverDialog
          open={showDialog}
          isDraw={draw}
          player={winner}
          onClick={this.handleDialogClick}
          onClose={this.handleDialogClose}
        />
      </div>
    );
  }
}

const { arrayOf, number, func, bool, array } = PropTypes;

Game.propTypes = {
  board: arrayOf(arrayOf(number)).isRequired,
  player: number.isRequired,
  winner: number.isRequired,
  gameover: bool.isRequired,
  playTurn: func.isRequired,
  checkWinner: func.isRequired,
  newGame: func.isRequired,
  fatchLogs: array.isRequired,
  createLog: object.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board,
  player: state.player,
  gameover: state.gameover,
  winner: state.winner,
  fatchLogs: state.fetchLogs,
  createLog: state.createLog,
});

const mapDispatchToProps = {
  playTurn,
  checkWinner,
  newGame,
  createActionLog,
  fetchActionLogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
