import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const RETRY_DELAY = 2000; // 2 saniye
const MAX_RETRIES = 3;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(imageData, retryCount = 0) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Sen bir Facebook reklam analiz uzmanısın. Reklam görsellerini Facebook'un politikalarına ve en iyi uygulamalara göre analiz ediyorsun."
          },
          {
            role: "user",
            content: `Lütfen bu Facebook reklamını analiz et ve şu başlıklara göre değerlendir:

            1. Reklam Politikaları:
            - Facebook reklam politikalarına uygunluk
            - Metin/görsel oranı kontrolü
            - İçerik kısıtlamaları
            - Hedef kitle uygunluğu

            2. Görsel Kalitesi:
            - Çözünürlük ve netlik
            - Renk kullanımı ve kontrast
            - Kompozisyon değerlendirmesi
            - Marka öğelerinin kullanımı

            3. Performans Potansiyeli:
            - Dikkat çekicilik faktörü
            - Mesaj netliği
            - Hedef kitle uyumu
            - Tıklama potansiyeli

            4. İyileştirme Önerileri:
            - Görsel optimizasyonu
            - Politika uyumluluğu
            - Performans artırıcı değişiklikler

            Görsel: ${imageData}`
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      console.log(`Rate limit aşıldı. ${retryCount + 1}. deneme yapılıyor...`);
      await sleep(RETRY_DELAY * (retryCount + 1));
      return makeRequest(imageData, retryCount + 1);
    }
    throw error;
  }
}

export async function analyzeContent(imageData) {
  try {
    const response = await makeRequest(imageData);
    return processAnalysis(response.choices[0].message.content);
  } catch (error) {
    console.error('AI analiz hatası:', error);
    
    if (error.response?.status === 401) {
      throw new Error('API anahtarı geçersiz. Lütfen sistem yöneticisi ile iletişime geçin.');
    } else if (error.response?.status === 429) {
      throw new Error('Sistem şu anda yoğun. Lütfen 30 saniye sonra tekrar deneyin.');
    } else if (error.response?.status === 400) {
      throw new Error('Görsel formatı uygun değil. Lütfen başka bir görsel deneyin.');
    } else {
      throw new Error('Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
}

// Skor hesaplama ve diğer yardımcı fonksiyonlar aynı kalacak...
