import PropTypes from 'prop-types';
import { useCallback, forwardRef } from 'react';
// @mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//
import { useSnackbar } from 'src/components/snackbar';
// components
import { UploadAvatar, UploadAvatarProfile } from 'src/components/upload';

// ----------------------------------------------------------------------

const ProfileUpload = forwardRef(
  (
    { onCreate, onUpdate, file, setFile, onDelete, onReplace, sx, isDefaultImage, ...other },
    ref
  ) => {
    const handleDrop = useCallback(
      (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
          const acceptedFile = acceptedFiles[0]; // Get the first file
          const newFile = Object.assign(acceptedFile, {
            preview: URL.createObjectURL(acceptedFile), // Ensure it's a valid File object
          });
          console.log('newFile', newFile);
          setFile(newFile);
        }
      },
      [setFile]
    );

    return (
      <Box>
        <UploadAvatarProfile
          ref={ref} // Pass the ref to the UploadAvatar component
          allow
          file={file}
          onDrop={handleDrop}
          onDelete={onDelete}
          onReplace={onReplace}
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
          }}
          sx={sx}
          isDefaultImage={isDefaultImage}
          {...other}
        />
      </Box>
    );
  }
);

ProfileUpload.propTypes = {
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  file: PropTypes.any,
  isDefaultImage: PropTypes.bool,
  setFile: PropTypes.func,
  onDelete: PropTypes.func,
  onReplace: PropTypes.func,
  sx: PropTypes.object,
};

export default ProfileUpload;
