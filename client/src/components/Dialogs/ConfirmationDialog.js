import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';



function ConfirmationDialog({ title, body, confirm, closeText, submitText, onClose, onSubmit, dialogOpen }) {
    return (
        <Dialog
            open={dialogOpen}
            onClose={onClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    {closeText}
                </Button>
                <Button onClick={onSubmit}>{submitText}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
