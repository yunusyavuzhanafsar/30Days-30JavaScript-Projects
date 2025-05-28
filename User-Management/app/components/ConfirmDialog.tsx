import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({ open, title, content, onCancel, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="outlined">
          İPTAL
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          SİL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
