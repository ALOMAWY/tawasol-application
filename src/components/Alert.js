import React, { useEffect } from "react";

import { connect } from "react-redux";

import { useAlert } from "react-alert";

const Alert = ({ alert }) => {
  const showAlert = useAlert();

  useEffect(() => {
    if (alert.show) {
      showAlert.show(alert.msg, {
        type: alert.type,
      });
    }
  });

  return <></>;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alerts,
  };
};

// const connectToStore = connect(mapStateToProps);

// const ConnectedComponents = connectToStore(Alert);

// export default ConnectedComponents;

export default connect(mapStateToProps)(Alert);
