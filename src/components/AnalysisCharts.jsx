import { Box, Paper, Typography } from '@mui/material';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from 'recharts';

function AnalysisCharts({ analysis }) {
  const radarData = [
    {
      category: 'Politika Uyumu',
      value: analysis.policyCompliance.score
    },
    {
      category: 'Görsel Kalite',
      value: analysis.qualityScore.overall
    },
    {
      category: 'Etkileşim',
      value: analysis.performanceMetrics.engagementPotential
    },
    {
      category: 'Tıklama',
      value: analysis.performanceMetrics.clickProbability
    },
    {
      category: 'Hedef Kitle',
      value: analysis.performanceMetrics.targetAudienceMatch
    }
  ];

  const detailData = [
    {
      name: 'Çözünürlük',
      değer: analysis.qualityScore.details.resolution
    },
    {
      name: 'Renkler',
      değer: analysis.qualityScore.details.colors
    },
    {
      name: 'Kompozisyon',
      değer: analysis.qualityScore.details.composition
    }
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Genel Performans Analizi
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Performans"
              dataKey="value"
              stroke="#1877f2"
              fill="#1877f2"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Görsel Kalite Detayları
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={detailData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="değer"
              fill="#1877f2"
              name="Kalite Skoru"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default AnalysisCharts;
