import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "./SnackbarContentWrapper";

const Alert = ({ open, duration, onClose, variant, message }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <SnackbarContentWrapper
        onClose={onClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired,
  message: PropTypes.string,
};

export default Alert;
