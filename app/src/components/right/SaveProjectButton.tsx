import React, { useState, useCallback, useContext, useEffect } from 'react';
import StateContext from '../../context/context';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { saveProject } from '../../helperFunctions/projectGetSaveDel';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(StateContext);

  const [projectName, setProjectName] = useState('');
  const [invalidProjectName, setInvalidProjectName] = useState(false);
  const [invalidProjectNameMessage, setInvalidProjectNameMessage] = useState(
    ''
  );

  const handleClickOpen = () => {
    setInvalidProjectName(false);
    setOpen(true);
  };

  const handleSave = () => {
    if (state.isLoggedIn === true && projectName !== '') {
      // Update the project name to global state
      // Needed to disable delete button
      // Switch to Thunk
      // If errors occur on the backend, the project name still gets updated
      dispatch({ type: 'UPDATE PROJECT NAME', payload: projectName });
      saveProject(projectName, state);
      setOpen(false);
    } else {
      setInvalidProjectName(true);
      setInvalidProjectNameMessage('Please Enter');
    }
  };
  const handleClose = () => {
    setInvalidProjectName(false);
    setInvalidProjectNameMessage('');
    setOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  const saveKeyBind = useCallback((e) => {
    //Save Project As, the || is for Mac or Windows
    (e.key === 's' && e.metaKey && !e.shiftKey || e.key === 's' && e.ctrlKey && !e.shiftKey) ? handleClickOpen() : '';
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', saveKeyBind);
    return () => {
      document.removeEventListener('keydown', saveKeyBind)
    }
  }, []);
  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        endIcon={<SaveOutlinedIcon />}
      >
        SAVE PROJECT AS
      </Button>
      <Dialog
        style={{ color: "#000" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ color: "#000" }} id="form-dialog-title">Save Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputProps={{ style: { color: "black" } }}
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={handleChange}
            helperText={invalidProjectNameMessage}
            error={invalidProjectName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

