var React = require("react");

var USPSPackageInfo = React.createClass({
  render: function() {
    console.log("[USPSPackageInfo] this.props.shipment: ", this.props.shipment);
    return <div>{this.props.shipment.TrackResponse.TrackInfo.TrackSummary}</div>;
  }
});

module.exports = USPSPackageInfo;

