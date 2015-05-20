var React = require("react");
var moment = require("moment");

var PackageInfo = React.createClass({
  deliveryDateAvailable: function() {
    return !!this.props.shipment.ScheduledDeliveryDate;
  },

  deliveryDate: function() {
    return moment(this.props.shipment.ScheduledDeliveryDate, "YYYYMMDD").format("ddd MMM Do, YYYY");
  },

  description: function() {
    var activity = this.props.shipment.Package.Activity;
    var status;
    if (!!activity.Status) {
      status = activity.Status;
    } else {
      status = activity[0].Status;
    }

    return status.StatusType.Description;
  },

  render: function() {
    return (
      <div>
        <span>{this.description()}</span><br/>
        {this.deliveryDateAvailable() ? <span>Scheduled Delivery Date: {this.deliveryDate()}</span> : ''}
      </div>
    );
  }
});

module.exports = PackageInfo;
