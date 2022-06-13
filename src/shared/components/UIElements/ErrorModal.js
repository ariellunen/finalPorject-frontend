import React from 'react';
import Button from '@mui/material/Button';

import Modal from './Modal';
// import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="שגיאה!"
      show={!!props.error}
      footer={
        // <Button style={{ float: 'left' }} onClick={props.onClear}>Okay</Button>
        <Button

          onClick={props.onClear}
          type="submit"
          fullWidth
          variant="contained"
          // disabled={!formState.isValid}
          sx={{ mt: 3, mb: 2, bgcolor: '#4454a3', width: '25%', float: 'left' }}
        >
          המשך
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
