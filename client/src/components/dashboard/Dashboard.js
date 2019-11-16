import React, { Component } from "react";
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
import Radio from "@material-ui/core/Radio";

import Autosuggest from "react-autosuggest";

const columns = [
  { id: "Carrier_Name", label: "Carrier_Name", minWidth: 50 },
  { id: "Origin_Id", label: "Origin_Id", minWidth: 50 },
  { id: "Destination_Id", label: "Destination_Id", minWidth: 50 },
  { id: "Distance", label: "Distance", minWidth: 50 },
  { id: "Delay_Prob", label: "Chance of Delay %", minWidth: 50 }
];
let locations = [];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return locations.filter(location => regex.test(location.City));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.Airport_Name} - ${suggestion.City}`;
}

function renderSuggestion(suggestion) {
  return (
    <span>
      {suggestion.Airport_Name} - {suggestion.City}
    </span>
  );
}

function getCity(words) {
  return words.split(" - ")[1];
}

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      origin: "",
      originSet: false,
      originCity: "",
      destination: "",
      destinationCity: "",
      flightStatus: [],
      page: 0,
      rowsPerPage: 10,
      dataLoading: false,
      dataSuccess: false,
      selectedValue: "",
      valueSuggestion: "",
      suggestions: [],
      isLoading: false,
      startingDestination: true
    };

    this.lastRequestId = null;
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });

    this.setState({ page: 0 });
  };

  handleChange = event => {
    event.preventDefault();
    console.log(event.currentTarget.getAttribute("data-index"));
    this.setState({
      selectedValue: event.currentTarget.getAttribute("data-index")
    });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ dataLoading: true });
    const userData = {
      origin: getCity(this.state.origin),
      destination: getCity(this.state.destination)
    };
    console.log(userData);

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
  resetForm = e => {
    e.preventDefault();
    this.setState({ origin: "", destination: "", dataSuccess: false });
  };
  // auto suggest

  getPossibleOrigins = e => {
    e.preventDefault();
    if (this.state.destination) {
      axios
        .get("/api/flights/origin/" + getCity(this.state.destination))
        .then(res => {
          locations = res.data;
          console.log(locations);
        }) // re-direct to login on successful register
        .catch(err => console.log(err));
    }
  };
  getPossibleDestinations = e => {
    e.preventDefault();
    if (this.state.origin) {
      axios
        .get("/api/flights/origin/" + getCity(this.state.origin))
        .then(res => {
          locations = res.data;
          console.log(res.data);
        }) // re-direct to login on successful register
        .catch(err => console.log(err));
      this.setState({
        startingDestination: false
      });
    }
  };

  onOriginChange = (event, { newValue }) => {
    this.setState({
      origin: newValue
    });
  };

  onDestinationChange = (event, { newValue }) => {
    this.setState({
      destination: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentDidMount() {
    axios
      .get("/api/flights/locationDetail")
      .then(res => {
        locations = res.data;
        console.log(locations);
      }) // re-direct to login on successful register
      .catch(err => console.log(err));
  }

  render() {
    const { user } = this.props.auth;
    const inputOriginProps = {
      placeholder: "Origin",
      value: this.state.origin,
      onChange: this.onOriginChange
    };

    const inputDestinationProps = {
      placeholder: "Destination",
      value: this.state.destination,
      onChange: this.onDestinationChange
    };

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
            <form noValidate onSubmit={this.onSubmit}>
              <div
                onClick={this.getPossibleOrigins}
                className="input-field col s6"
              >
                <Autosuggest
                  suggestions={this.state.suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputOriginProps}
                />
              </div>
              <div
                onClick={this.getPossibleDestinations}
                className="input-field col s6"
              >
                <Autosuggest
                  suggestions={this.state.suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputDestinationProps}
                />
              </div>

              <div
                className="col s6 center-align"
                style={{ paddingLeft: "11.250px", position: "relative" }}
              >
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  disabled={
                    this.state.dataLoading ||
                    !this.state.origin ||
                    !this.state.destination
                      ? true
                      : false
                  }
                  type="submit"
                  className="btn btn-large outline waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </button>
                {this.state.dataLoading && (
                  <CircularProgress
                    size={24}
                    style={{
                      color: "#000",
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
              <div className="col s6 center-align">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  disabled={
                    this.state.dataLoading ||
                    (!this.state.origin && !this.state.destination)
                      ? true
                      : false
                  }
                  onClick={this.resetForm}
                  className="btn btn-large outline waves-effect waves-light hoverable red accent-3"
                >
                  Reset
                </button>
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
                        <TableCell
                          key="radio"
                          style={{ minWidth: 20 }}
                        ></TableCell>
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
                              key={carrier.Flight_Carrier_Id}
                            >
                              <TableCell padding="checkbox">
                                <Radio
                                  checked={
                                    this.state.selectedValue ===
                                    carrier.Flight_Carrier_Id
                                  }
                                  onClick={this.handleChange}
                                  data-index={carrier.Flight_Carrier_Id}
                                  value={carrier.Flight_Carrier_Id}
                                  name="radio-button-demo"
                                />
                              </TableCell>
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
