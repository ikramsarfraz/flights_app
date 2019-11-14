import React, { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
const columns = [
  { id: "Carrier_Name", label: "Carrier_Name", minWidth: 50 },
  { id: "Origin_Id", label: "Origin_Id", minWidth: 50 },
  { id: "Destination_Id", label: "Destination_Id", minWidth: 50 },
  { id: "Distance", label: "Distance", minWidth: 50 },
  { id: "Delay_Prob", label: "Chance of Delay %", minWidth: 50 }
];

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      origin: "",
      destination: "",
      flightStatus: [],
      page: 0,
      rowsPerPage: 10,
      dataLoading: false,
      dataSuccess: false
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });

    this.setState({ page: 0 });
  };

  onDataClick = userData => {
    //e.preventDefault();
    axios
      .post("/api/flights/flight", userData)
      .then(res => {
        this.setState({ dataLoading: false });
        this.setState({ dataSuccess: true });
        const flightStatus = res.data;
        this.setState({ flightStatus });
        console.log(res.data);
      }) // re-direct to login on successful register
      .catch(err => console.log(err));
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ dataLoading: true });
    const userData = {
      origin: this.state.origin,
      destination: this.state.destination
    };
    console.log(userData);
    this.onDataClick(userData);
    //this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container ">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Search for flights.
              </p>
            </h4>
          </div>
          <div className="col s12 center-align">
            {" "}
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.origin}
                  id="origin"
                  type="text"
                />
                <label htmlFor="origin">Origin</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.destination}
                  id="destination"
                  type="text"
                />
                <label htmlFor="destination">Destination</label>
              </div>
              <div
                className="col s12 center-align"
                style={{ paddingLeft: "11.250px", position: "relative" }}
              >
                {/* <Button
                  variant="contained"
                  color="primary"
                  disabled={this.state.dataLoading}
                  type="submit"
                >
                  Search
                </Button> */}
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  disabled={this.state.dataLoading}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </button>
                {this.state.dataLoading && (
                  <CircularProgress
                    size={24}
                    style={{
                      color: "#333",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -12,
                      marginLeft: -12,
                      zIndex: 2
                    }}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
        {this.state.dataSuccess && (
          <div className="row">
            <div className="col s12 center-align">
              <Paper styles={{ width: "100%" }}>
                <div styles={{ maxHeight: 440, overflow: "auto" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map(column => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.flightStatus
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map(carrier => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={carrier.FLIGHT_ID}
                            >
                              {columns.map(column => {
                                const value = carrier[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={this.state.flightStatus.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  backIconButtonProps={{
                    "aria-label": "previous page"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "next page"
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        )}
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
