import { useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadForm({ setContent }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      throw new Error('Lütfen sadece görsel dosyası yükleyin.');
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Dosya boyutu 10MB\'dan küçük olmalıdır.');
    }
  };

  const handleFiles = (files) => {
    setError(null);
    if (files[0]) {
      try {
        const file = files[0];
        validateFile(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setContent({
            type: 'image',
            data: e.target.result,
            file: file
          });
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: dragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          bgcolor: dragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease'
        }}
      >
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload">
          <Button
            component="span"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 1 }}
          >
            Görsel Yükle
          </Button>
        </label>
        <Typography variant="body2" color="text.secondary">
          veya görseli buraya sürükleyin
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Maksimum dosya boyutu: 10MB
        </Typography>
      </Box>
    </Box>
  );
}

export default UploadForm;
