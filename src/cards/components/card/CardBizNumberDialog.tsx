import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

type Props = {
  isDialogOpen: boolean;
  onUpdate: (id?: string) => void;
  onChangeDialog: (term?: string) => void;
  dialogNewBizNumber: string;
  dialogTitle: string;
  bizNumberFromDatabase: number;
};

const CardBizNumberDialog: FC<Props> = ({
  isDialogOpen,
  onUpdate,
  onChangeDialog,
  dialogNewBizNumber,
  dialogTitle,
  bizNumberFromDatabase,
}) => {
  const [textFieldValue, setTextFieldValue] = useState(
    bizNumberFromDatabase.toString()
  );

  const handleBizNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <Dialog
      open={isDialogOpen}
      //   onClose={() => onChangeDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
          {textFieldValue}
        </DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="bizNumber"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={bizNumberFromDatabase}
          onChange={handleBizNumberChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onChangeDialog()} color="error">
          cancel
        </Button>
        <Button onClick={() => onUpdate(textFieldValue)} autoFocus color="info">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardBizNumberDialog;
