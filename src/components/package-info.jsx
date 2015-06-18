var React = require("react");
var UPSPackageInfo = require("./ups-package-info.jsx");
var USPSPackageInfo = require("./usps-package-info.jsx");
var FEDEXPackageInfo = require("./fedex-package-info.jsx");

var PackageInfo = React.createClass({
  render: function() {
    var CarrierPackageInfo = {
      UPS: UPSPackageInfo,
      USPS: USPSPackageInfo,
      FEDEX: FEDEXPackageInfo
    }[this.props.carrier];
    console.log("[PackageInfo] this.props.shipment: ", this.props.shipment);

    return !!CarrierPackageInfo ? <CarrierPackageInfo shipment={this.props.shipment}/> : <div/>;
  }
});

module.exports = PackageInfo;
