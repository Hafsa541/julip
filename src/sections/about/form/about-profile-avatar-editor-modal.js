import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slider,
  Typography,
  Container,
} from '@mui/material';
import AvatarEditor from 'react-avatar-editor';

const AvatarEditorModal = ({ open, onClose, image, onSave }) => {
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImage();
      canvas.toBlob((blob) => {
        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        onSave(file);
        onClose();
      });
    }
  };

  const handleZoomChange = (event, newValue) => {
    setScale(newValue);
  };

  const handleRotateChange = (event, newValue) => {
    setRotate(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Your Avatar</DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        {image && (
          <div style={{ textAlign: 'center' }}>
            <AvatarEditor
              ref={(ref) => setEditor(ref)}
              image={image}
              width={250}
              height={250}
              border={50}
              borderRadius={150}
              scale={scale}
              rotate={rotate}
            />
          </div>
        )}

        <Container disableGutters sx={{ display: 'flex' }}>
          {/* Zoom Control */}
          <Container style={{ marginTop: 20 }}>
            <Typography variant="subtitle2" gutterBottom>
              Zoom
            </Typography>
            <Slider
              color="success"
              value={scale}
              onChange={handleZoomChange}
              min={1}
              max={2}
              step={0.05}
              valueLabelDisplay="auto"
              valueLabelFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
          </Container>

          {/* Rotate Control */}
          <Container style={{ marginTop: 20 }}>
            <Typography variant="subtitle2" gutterBottom>
              Rotate
            </Typography>
            <Slider
              color="success"
              value={rotate}
              onChange={handleRotateChange}
              min={0}
              max={360}
              step={1}
              valueLabelDisplay="auto"
              valueLabelFormatter={(value) => `${value}°`}
            />
          </Container>
        </Container>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          variant="contained"
          sx={{ color: 'black', px: 2, border: '0.6px solid black' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="secondary"
          variant="contained"
          sx={{ color: 'black', px: 2, border: '0.6px solid black' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarEditorModal;
AvatarEditorModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  image: PropTypes.object,
  onSave: PropTypes.func,
};
