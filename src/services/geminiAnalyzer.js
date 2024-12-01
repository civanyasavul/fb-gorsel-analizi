import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeContent(imageData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Bu Facebook reklamını analiz et ve aşağıdaki başlıklara göre değerlendir:

    1. REKLAM POLİTİKALARI ANALİZİ (0-100 puan)
    - Facebook reklam politikalarına uygunluk
    - Metin/görsel oranı kontrolü
    - İçerik kısıtlamaları
    - Hedef kitle politikaları

    2. GÖRSEL KALİTE ANALİZİ (0-100 puan)
    - Çözünürlük ve netlik
    - Renk kullanımı ve kontrast
    - Kompozisyon ve düzen
    - Marka öğelerinin kullanımı

    3. PERFORMANS TAHMİNİ (0-100 puan)
    - Dikkat çekicilik
    - Mesaj netliği
    - Hedef kitle uyumu
    - Tıklama potansiyeli

    4. İYİLEŞTİRME ÖNERİLERİ
    - Görsel iyileştirmeler
    - Politika uyumluluğu
    - Performans artırıcı öneriler

    Her bölüm için puan ver ve detaylı açıklama yap.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData.split(',')[1],
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    return processAnalysis(text);
  } catch (error) {
    console.error('Gemini analiz hatası:', error);
    throw new Error('Görsel analizi yapılırken bir hata oluştu: ' + error.message);
  }
}

function processAnalysis(text) {
  try {
    const sections = extractSections(text);
    
    return {
      policyCompliance: {
        score: extractScore(sections.policies) || 75,
        issues: extractIssues(sections.policies)
      },
      qualityScore: {
        overall: extractScore(sections.quality) || 80
      },
      performanceMetrics: {
        engagementPotential: extractScore(sections.performance) || 70,
        clickProbability: extractScore(sections.performance) || 65
      },
      recommendations: extractRecommendations(sections.recommendations)
    };
  } catch (error) {
    console.error('Analiz işleme hatası:', error);
    throw new Error('Analiz sonuçları işlenirken bir hata oluştu.');
  }
}

function extractSections(text) {
  const sections = {
    policies: '',
    quality: '',
    performance: '',
    recommendations: ''
  };

  const lines = text.split('\n');
  let currentSection = null;

  lines.forEach(line => {
    if (line.includes('POLİTİKALARI ANALİZİ')) {
      currentSection = 'policies';
    } else if (line.includes('KALİTE ANALİZİ')) {
      currentSection = 'quality';
    } else if (line.includes('PERFORMANS')) {
      currentSection = 'performance';
    } else if (line.includes('İYİLEŞTİRME')) {
      currentSection = 'recommendations';
    } else if (currentSection) {
      sections[currentSection] += line + '\n';
    }
  });

  return sections;
}

function extractScore(text) {
  const matches = text.match(/(\d+)(?=\s*(?:puan|\/100|\%))/i);
  return matches ? Math.min(parseInt(matches[1]), 100) : null;
}

function extractIssues(text) {
  const issues = [];
  const lines = text.toLowerCase().split('\n');
  
  const keywords = ['ihlal', 'uygun değil', 'problem', 'dikkat', 'düşük'];
  
  lines.forEach(line => {
    if (keywords.some(keyword => line.includes(keyword))) {
      const cleanLine = line.trim();
      if (cleanLine) {
        issues.push(cleanLine);
      }
    }
  });
  
  return issues;
}

function extractRecommendations(text) {
  const recommendations = [];
  const lines = text.split('\n');
  
  const keywords = ['öner', 'iyileştir', 'geliştir', 'tavsiye', 'artır'];
  
  lines.forEach(line => {
    if (keywords.some(keyword => line.toLowerCase().includes(keyword))) {
      const cleanLine = line.trim();
      if (cleanLine) {
        recommendations.push(cleanLine);
      }
    }
  });
  
  return recommendations.length > 0 ? recommendations : ['Genel iyileştirme önerileri bekleniyor...'];
}
