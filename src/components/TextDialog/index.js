import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const TextDialog = props => {
  const {
    opened,
    handleCancel,
    handleSave,
    title,
    desc,
    label,
    helperText,
    doValidation
  } = props;
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleTextChange(e) {
    setValue(e.target.value);

    if (doValidation) {
      setHasError(!doValidation(e.target.value));
    }
  }

  function handleDialogCancel() {
    handleCancel();
  }

  function handleDialogSave() {
    if(hasError === false) {
      handleSave(value);
    }
  }

  return (
    <>
      <Dialog
        open={opened}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="value"
            value={value}
            onChange={handleTextChange}
            label={label}
            helperText={helperText}
            type="text"
            fullWidth
            error={hasError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDialogSave} color="primary">
            Changer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TextDialog;
