var React = require("react");
var moment = require("moment");

var FedExPackageInfo = React.createClass({
  render: function() {
    var trackDetails = this.props.shipment.CompletedTrackDetails[0].TrackDetails[0];
    return (<p>
      {trackDetails.Events[0].EventDescription}<br/>
      Estimated Delivery: {moment(trackDetails.EstimatedDeliveryTimestamp.split("T")[0]).format("MMMM Do YYYY")}
    </p>);
  }
});

module.exports = FedExPackageInfo;
