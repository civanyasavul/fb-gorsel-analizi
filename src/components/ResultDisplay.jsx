import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Grid, LinearProgress, Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ResultDisplay({ analysis }) {
  if (!analysis) return null;
  
  if (analysis.error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {analysis.error}
      </Alert>
    );
  }

  const { policyCompliance, qualityScore, performanceMetrics, recommendations } = analysis;

  const getScoreColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "error";
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {/* Politika Uygunluğu */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Reklam Politika Uygunluğu
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Uygunluk Skoru</Typography>
                <Typography variant="body2" color={getScoreColor(policyCompliance.score)}>
                  {policyCompliance.score}/100
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={policyCompliance.score} 
                color={getScoreColor(policyCompliance.score)}
              />
            </Box>
            
            {policyCompliance.issues?.length > 0 && (
              <>
                <Typography variant="subtitle2" color="error" gutterBottom>
                  Tespit Edilen Sorunlar:
                </Typography>
                <List dense>
                  {policyCompliance.issues.map((issue, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <ErrorIcon color="error" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={issue} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Paper>
        </Grid>

        {/* Görsel Kalitesi */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Görsel Kalitesi
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Genel Kalite</Typography>
                <Typography variant="body2" color={getScoreColor(qualityScore.overall)}>
                  {qualityScore.overall}/100
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={qualityScore.overall}
                color={getScoreColor(qualityScore.overall)}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Performans Tahmini */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Performans Tahmini
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Etkileşim Potansiyeli
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={performanceMetrics.engagementPotential}
                    color={getScoreColor(performanceMetrics.engagementPotential)}
                  />
                </Box>
                <Typography variant="body2">
                  {performanceMetrics.engagementPotential}%
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Tıklama Olasılığı
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={performanceMetrics.clickProbability}
                    color={getScoreColor(performanceMetrics.clickProbability)}
                  />
                </Box>
                <Typography variant="body2">
                  {performanceMetrics.clickProbability}%
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* İyileştirme Önerileri */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              İyileştirme Önerileri
            </Typography>
            <List>
              {recommendations?.map((rec, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <LightbulbIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={rec} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResultDisplay;
