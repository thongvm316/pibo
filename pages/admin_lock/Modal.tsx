import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ open, setOpen, unLockUser, userId, createAUIGridAndGetData }) => {
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => setInputData(e.target.value);
  const handleClose = () => setOpen(false);

  const triggerUnLockUser = async () => {
    try {
      setLoading(true);
      await unLockUser({ userId, aponCnsnNo: inputData });
      await createAUIGridAndGetData();

      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Account unlock base document number
        </Typography>

        <Typography
          id="modal-modal-description"
          component="p"
          gutterBottom
          variant="caption"
          sx={{ my: 2 }}
        >
          In order to unlock the account, a document number for approval by the department head,
          such as application form is required. Please enter the document number to support your
          account cancellation request.
        </Typography>

        <TextField
          id="outlined-basic"
          sx={{ mb: 2 }}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
        />

        <Stack
          spacing={1}
          sx={{ mx: 3, mb: 2 }}
          className="admin-lock-action"
          justifyContent="center"
          direction="row"
        >
          <Button variant="contained" className="admin-lock-action__initial" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={loading}
            className="admin-lock-action__lookup"
            onClick={triggerUnLockUser}
          >
            Release
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

BasicModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  userId: PropTypes.string,
  unLockUser: PropTypes.func,
};

export default BasicModal;
