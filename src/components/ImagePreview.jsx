import { Box, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

function ImagePreview({ content, onDelete }) {
  if (!content || !content.file) return null;

  return (
    <Paper 
      sx={{ 
        p: 2, 
        mb: 3, 
        display: 'flex', 
        alignItems: 'center',
        backgroundColor: 'background.default'
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          overflow: 'hidden',
          mr: 2,
          position: 'relative'
        }}
      >
        {content.data ? (
          <img
            src={content.data}
            alt="Yüklenen görsel"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover'
            }}
          >
            <ImageIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
          </Box>
        )}
      </Box>
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" component="div">
          {content.file.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(content.file.size / 1024 / 1024).toFixed(2)} MB
        </Typography>
      </Box>

      <IconButton 
        onClick={onDelete}
        color="error"
        sx={{ ml: 1 }}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}

export default ImagePreview;
