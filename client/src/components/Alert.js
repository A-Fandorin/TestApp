import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div
      key={alert.id}
      className={`alert alert-${alert.alertType} alert-dismissible mt-3`}
      style={{
        position: 'fixed',
        top: 0.5,
        zIndex: 1,
      }}
    >
      <strong>ВНИМАНИЕ! </strong> &nbsp;{alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
