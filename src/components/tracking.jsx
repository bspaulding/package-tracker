var React = require("react");
var marmottajax = require("marmottajax");
var PackageInfo = require("./package-info.jsx");

var Tracking = React.createClass({
  getInitialState: function() {
    /* global window */
    return { trackingNumber: window.location.pathname.substr(1), trackingData: {}, loading: true };
  },

  componentWillMount: function() {
    var that = this;
    marmottajax({
      url: "/api/" + this.state.trackingNumber,
      json: true
    }).then(function(response) {
      that.setState({ trackingData: response, loading: false });
    });
  },

  render: function() {
    var dataAvailable = !this.state.loading && this.state.trackingData.result;
    var carrier;
    var shipment;
    if (dataAvailable) {
      carrier  = this.state.trackingData.result.carrier;
      shipment = this.state.trackingData.result.data;
    }
    console.log("[Tracking] shipment: ", shipment);

    return (
      <div>
        <h1>Tracking <small>{this.state.trackingNumber}</small></h1>
        {this.state.loading ? 'Loading...' : ''}
        {dataAvailable ? <PackageInfo carrier={carrier} shipment={shipment}/> : 'No tracking data available, yet.'}
      </div>
    );
  }
});

module.exports = Tracking;
