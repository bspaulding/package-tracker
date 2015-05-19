var React = require("react");
var marmottajax = require("marmottajax");
var PackageInfo = require("./package-info.jsx");

var Tracking = React.createClass({
  getInitialState: function() {
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
    return (
      <div>
        <h1>Tracking <small>{this.state.trackingNumber}</small></h1>
        {this.state.loading ? 'Loading...' : <PackageInfo shipment={this.state.trackingData.Shipment}/>}
      </div>
    );
  }
});

module.exports = Tracking;
