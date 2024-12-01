import { useState } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import UploadForm from './components/UploadForm';
import ImagePreview from './components/ImagePreview';
import ContentAnalyzer from './components/ContentAnalyzer';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [content, setContent] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleDelete = () => {
    setContent(null);
    setAnalysis(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Facebook Reklam Analizi
        </Typography>
        <Paper sx={{ p: 3 }}>
          <UploadForm setContent={setContent} />
          {content && <ImagePreview content={content} onDelete={handleDelete} />}
          {content && <ContentAnalyzer content={content} setAnalysis={setAnalysis} />}
          {analysis && <ResultDisplay analysis={analysis} />}
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
