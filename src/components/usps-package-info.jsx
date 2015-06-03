var React = require("react");

var USPSPackageInfo = React.createClass({
  render: function() {
    return <div>{this.props.shipment.TrackResponse.TrackInfo.TrackSummary}</div>;
  }
});

module.exports = USPSPackageInfo;

