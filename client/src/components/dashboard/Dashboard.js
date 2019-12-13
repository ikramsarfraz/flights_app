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
import Chart from "react-apexcharts";
import Autosuggest from "react-autosuggest";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

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
  return `${suggestion.Airport_Name}, ${suggestion.City}`;
}

function renderSuggestion(suggestion) {
  return (
    <span>
      {suggestion.Airport_Name}, {suggestion.City}
    </span>
  );
}

function getCity(words) {
  const airName = words.split(", ")[0].trim();
  const airRow = locations.filter(
    location => location.Airport_Name.trim() === airName
  );
  //console.log(airName.trim());
  console.log(airRow[0].Location_Id);
  return airRow[0].Location_Id;
}

let colors = [
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#546E7A",
  "#26a69a",
  "#D10CE8"
];

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      origin: "",
      prevOrigin: "",
      destination: "",
      flightStatus: [],
      monthDelays: [],
      dayDelays: [],
      page: 0,
      rowsPerPage: 10,
      dataLoading: false,
      dataSuccess: false,
      dataNotFound: false,
      selectedValue: "",
      valueSuggestion: "",
      suggestions: [],
      isLoading: false,
      visualizeData: false,
      options: {
        chart: {
          stacked: true,
          stackType: "100%"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        title: {
          text: "Flight Delays"
        },
        xaxis: {
          categories: []
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      },
      series: [
        {
          name: "Carrier Delay",
          data: []
        },
        {
          name: "Weather Delay",
          data: []
        },
        {
          name: "Nas Delay",
          data: []
        },
        {
          name: "Security Delay",
          data: []
        },
        {
          name: "Late Aircraft Delay",
          data: []
        }
      ],

      lineOptions: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Flight Delays by Month",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        tooltip: {
          x: {
            format: "MMM y"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        xaxis: {
          type: "datetime",
          categories: [
            "07/01/2017",
            "08/01/2017",
            "09/01/2017",
            "10/01/2017",
            "11/01/2017",
            "12/01/2017",
            "01/01/2018",
            "02/01/2018",
            "03/01/2018",
            "04/01/2018",
            "05/01/2018",
            "06/01/2018",
            "07/01/2018",
            "08/01/2018",
            "09/01/2018",
            "10/01/2018",
            "11/01/2018",
            "12/01/2018",
            "01/01/2019",
            "02/01/2019",
            "03/01/2019",
            "04/01/2019",
            "05/01/2019",
            "06/01/2019",
            "07/01/2019"
          ]
        },
        markers: {
          size: 4,
          opacity: 0.9,
          colors: ["#FFA41B"],
          strokeColor: "#fff",
          strokeWidth: 2,

          hover: {
            size: 7
          }
        },
        yaxis: {
          min: 0,
          max: 150,
          title: {
            text: "Delays"
          }
        }
      },
      lineSeries: [
        {
          name: "",
          data: []
        }
      ],
      columnOptions: {
        colors: colors,
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          labels: {
            style: {
              colors: colors,
              fontSize: "14px"
            }
          }
        },
        yaxis: {
          title: {
            text: "Delays"
          }
        },

        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        }
      },
      columnSeries: [
        {
          name: "",
          data: []
        }
      ]
    };

    this.lastRequestId = null;
    this.bull = (
      <span
        styles={{
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)"
        }}
      >
        •
      </span>
    );
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

    this.setState({
      selectedValue: event.currentTarget.getAttribute("data-index")
    });
    // this.updateStackedBarData();
    // this.updateLineData();
    // this.updateColumnData();
    // this.setState({ visualizeData: true });
    console.log(event.currentTarget.getAttribute("data-index"));
  };

  // handle charts
  updateStackedBarData() {
    const newSeries = [];
    let newData = [];
    let newOptions = this.state.options;
    let carriers = [];
    for (let index = 0; index < 5; index++) {
      for (let i = 0; i < this.state.flightStatus.length; i++) {
        if (index === 0) {
          newData.push(this.state.flightStatus[i].NUMBER_CARRIER_DELAYS);
        } else if (index === 1) {
          newData.push(this.state.flightStatus[i].NUMBER_WEATHER_DELAYS);
        } else if (index === 2) {
          newData.push(this.state.flightStatus[i].NUMBER_NAS_DELAYS);
        } else if (index === 3) {
          newData.push(this.state.flightStatus[i].NUMBER_SECURITY_DELAYS);
        } else {
          newData.push(this.state.flightStatus[i].NUMBER_LATE_AIRCRAFT_DELAYS);
        }
      }

      newSeries.push({
        name: this.state.series[index].name,
        data: newData
      });
      newData = [];
    }

    this.state.flightStatus.forEach((part, index) => {
      carriers.push(this.state.flightStatus[index].Carrier_Name);
    });
    newOptions.xaxis.categories = carriers;

    this.setState({ series: newSeries, options: newOptions });
  }

  updateLineData() {
    const newSeries = [];
    let newOptions = this.state.lineOptions;
    let newData = [];
    let currentMonth = 201707;
    let maxDelayCount = 0;
    let i = 0;
    while (i < this.state.monthDelays.length) {
      if (this.state.monthDelays[i].delayMonth === currentMonth) {
        newData.push(this.state.monthDelays[i].Carrier_Delay_Count);
        if (this.state.monthDelays[i].Carrier_Delay_Count > maxDelayCount) {
          maxDelayCount = this.state.monthDelays[i].Carrier_Delay_Count;
        }
        i++;
      } else newData.push(null);

      if (currentMonth === 201712) currentMonth = 201801;
      else if (currentMonth === 201812) currentMonth = 201901;
      else currentMonth++;
    }
    newSeries.push({
      name: "Delays",
      data: newData
    });

    newOptions.yaxis.max = maxDelayCount * 1.1;

    this.setState({ lineSeries: newSeries, lineOptions: newOptions });
  }

  updateColumnData() {
    const newSeries = [];
    let newData = [];

    for (let i = 0; i < this.state.dayDelays.length; i++) {
      newData.push(this.state.dayDelays[i].Carrier_Delay_Count);
    }
    newSeries.push({
      name: "Delays",
      data: newData
    });
    this.setState({ columnSeries: newSeries });
  }

  // on clicking submit, get data for specified origin and destination
  onSubmit = e => {
    e.preventDefault();

    let flightDataLoaded = false;
    let monthDelaysDataLoaded = false;
    let dayDelaysDataLoaded = false;

    this.setState({
      dataLoading: true,
      dataSuccess: false,
      dataNotFound: false
    });

    const userData = {
      origin: getCity(this.state.origin),
      destination: getCity(this.state.destination)
    };

    axios
      .post("/api/flights/flight", userData)
      .then(res => {
        this.setState({ dataLoading: false, dataSuccess: true });
        const flightStatus = res.data;
        this.setState({ flightStatus });
        console.log(res.data);
        this.updateStackedBarData();
        flightDataLoaded = true;
      }) // re-direct to login on successful register
      .catch(err => {
        console.log(err.response.status === 404);
        if (err.response.status === 404) {
          this.setState({ dataNotFound: true });
        }
        this.setState({ dataLoading: false });
      });

    axios
      .post("/api/flights/monthDelays", userData)
      .then(res => {
        this.setState({ dataLoading: false, dataSuccess: true });
        const monthDelays = res.data;
        this.setState({ monthDelays });
        console.log(res.data);
        this.updateLineData();
        monthDelaysDataLoaded = true;
        this.setState({ visualizeData: true });
      }) // re-direct to login on successful register
      .catch(err => {
        console.log(err.response.status === 404);
        // if (err.response.status === 404) {
        //   this.setState({ dataNotFound: true });
        // }
        // this.setState({ dataLoading: false });
      });

    axios
      .post("/api/flights/dayDelays", userData)
      .then(res => {
        this.setState({ dataLoading: false, dataSuccess: true });
        const dayDelays = res.data;
        this.setState({ dayDelays });
        console.log(res.data);

        this.updateColumnData();
        dayDelaysDataLoaded = true;
      }) // re-direct to login on successful register
      .catch(err => {
        console.log(err.response.status === 404);
        // if (err.response.status === 404) {
        //   this.setState({ dataNotFound: true });
        // }
        // this.setState({ dataLoading: false });
      });
  };

  // reset form values and table
  resetForm = e => {
    e.preventDefault();
    this.setState({
      origin: "",
      destination: "",
      dataSuccess: false,
      dataNotFound: false,
      visualizeData: false,
      selectedValue: ""
    });
  };

  // auto suggest/complete
  // following functions handle input fields to show auto completion

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

  // get all locations at page start
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
        {this.state.dataNotFound && (
          <div className="row">
            <div className="col s12 center-align">
              <h1>No flights found</h1>
            </div>
          </div>
        )}

        {this.state.dataSuccess && (
          <div className="row">
            {this.state.flightStatus.map(carrier => {
              return (
                <div className="col s4 center-align">
                  <Card
                    style={{ minWidth: 275 }}
                    key={carrier.Flight_Carrier_Id}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        style={{ fontSize: 24 }}
                        gutterBottom
                      >
                        {carrier.Carrier_Name}
                      </Typography>

                      <Typography>
                        Delay: {carrier.Delay_Prob.toFixed(1)}%
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
        {this.state.visualizeData && (
          <div id="chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="350"
            />
          </div>
        )}
        {this.state.visualizeData && (
          <div id="chart">
            <Chart
              options={this.state.lineOptions}
              series={this.state.lineSeries}
              type="line"
              height="350"
            />
          </div>
        )}
        {this.state.visualizeData && (
          <div id="chart">
            <Chart
              options={this.state.columnOptions}
              series={this.state.columnSeries}
              type="bar"
              height="350"
            />
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
