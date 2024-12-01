import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert, AlertTitle } from '@mui/material';
import { analyzeContent } from '../services/geminiAnalyzer';

function ContentAnalyzer({ content, setAnalysis }) {
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const analyze = async () => {
      try {
        setError(null);
        setIsAnalyzing(true);
        const result = await analyzeContent(content.data);
        setAnalysis(result);
      } catch (error) {
        console.error('Analiz hatası:', error);
        setError(error.message);
        setAnalysis(null);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyze();
  }, [content]);

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        <AlertTitle>Analiz Hatası</AlertTitle>
        {error}
      </Alert>
    );
  }

  if (isAnalyzing) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        my: 2 
      }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Alert severity="info" sx={{ width: '100%' }}>
          Görsel analiz ediliyor... Lütfen bekleyin.
        </Alert>
      </Box>
    );
  }

  return null;
}

export default ContentAnalyzer;
