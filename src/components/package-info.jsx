var React = require("react");

var PackageInfo = React.createClass({
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
    return <span>{this.description()}</span>;
  }
});

module.exports = PackageInfo;
