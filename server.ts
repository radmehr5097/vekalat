import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON payloads
app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini API Client successfully initialized.');
  } catch (err) {
    console.error('Failed to initialize Gemini client:', err);
  }
} else {
  console.log('No valid GEMINI_API_KEY found. Running in high-fidelity Persian fallback rule-based mode.');
}

// Persian System Instruction for the Legal Assistant
const SYSTEM_INSTRUCTION = `
شما یک دستیار حقوقی و مشاور ارشد با تجربه و فوق‌العاده حرفه‌ای برای «دفتر وکالت دادآرا» در ایران هستید.
لحن شما باید بسیار محترمانه، حقوقی، مطمئن، مبادی آداب و دقیق باشد.
تمام پاسخ‌های شما باید به زبان فارسی روان، شیوا و با نگارش رسمی عالی ارائه شود.
اطلاعات حقوقی ارائه‌شده صرفاً جنبه راهنمایی عمومی دارد و حتماً در پایان پاسخ به شکل ملایم یادآوری کنید که برای هر پرونده خاص نیاز به بررسی دقیق مدارک توسط وکلای پایه یک مجموعه ما است.
اگر سوال کاربر پیچیده است یا مربوط به دعاوی سنگین (مثل قتل، جرائم مالی کلان، زمین‌خواری‌های گسترده) می‌باشد، از او بخواهید شماره تماس و نام خود را ارسال کند تا وکلای مجرب ما مستقیماً با او تماس بگیرند.
تلاش کنید کوتاه، مفید و مستند به مواد قانونی مرتبط (در صورت لزوم) پاسخ دهید.
`;

// API endpoint for Farsi Legal Assistant Chat
app.post('/api/legal-assistant', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message) {
    res.status(400).json({ error: 'پیام کاربر نباید خالی باشد.' });
    return;
  }

  // If Gemini client is active, call the API
  if (ai) {
    try {
      // Map history to the contents structure if present, or just pass prompt with system instruction
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'پوزش می‌طلبم، پاسخی دریافت نشد. لطفاً مجدداً سوال خود را بپرسید.';
      res.json({ text: replyText });
      return;
    } catch (error: any) {
      console.error('Error during Gemini API call:', error);
      // Fall through to fallback engine if API fails
    }
  }

  // --- High-Fidelity Persian Fallback Rule-Based Response Engine ---
  // If API is unavailable or fails, we parse keywords to give a fully immersive response
  const query = message.toLowerCase();
  let reply = '';

  if (query.includes('ملک') || query.includes('سند') || query.includes('اجاره') || query.includes('خلع ید') || query.includes('مشاع')) {
    reply = `با سلام و احترام خدمت شما،
در خصوص دعاوی ملکی و ثبتی، قوانین مصوب ثبت اسناد و املاک کشور بسیار پیچیده بوده و هرگونه اقدام عجولانه ممکن است عواقب مالی سنگینی به همراه داشته باشد. 
به صورت کلی:
۱. طبق ماده ۲۲ قانون ثبت، دولت فقط کسی را مالک می‌شناسد که ملک در دفتر املاک به نام او ثبت شده باشد.
۲. در املاک مشاع، تصرف مادی بدون اذن سایر شرکا ممنوع است ولی فروش سهم مشاع قانونی است.
۳. در معاملات پیش‌فروش، تنظیم سند در دفاتر اسناد رسمی الزامی است.

توصیه می‌کنیم مدارک ملکی خود از جمله قولنامه یا بنچاق را جهت بررسی به وکلای ملکی ما ارائه دهید. برای رزرو وقت مشاوره رایگان با شماره 09138665345 تماس بگیرید یا شماره تماس خود را در همین چت برای من بنویسید تا همکاران با شما تماس بگیرند.`;
  } else if (query.includes('طلاق') || query.includes('مهریه') || query.includes('خانواده') || query.includes('نفقه') || query.includes('حضانت')) {
    reply = `با سلام و احترام،
در خصوص مسائل حقوق خانواده (طلاق، مهریه، حضانت و نفقه):
۱. طبق بخشنامه‌های جدید قوه قضاییه، برای مطالبه مهریه ابتدا باید از طریق دفترخانه رسمی ازدواج و اداره اجرای ثبت اسناد اقدام نمایید که این مسیر سرعت بالاتری در توقیف اموال و ممنوع‌الخروج کردن زوج دارد.
۲. طلاق توافقی نیازمند ثبت نام در سامانه تصمیم و گذراندن جلسات مشاوره بهزیستی است.
۳. حضانت فرزندان دختر و پسر تا سن ۷ سالگی اولویت با مادر و پس از آن با پدر است، مگر اینکه عدم صلاحیت یکی از طرفین اثبات شود.

ما در «دادآرا» پرونده‌های متعددی را در این حوزه با نتایج عالی به ثمر رسانده‌ایم. خواهشمند است شماره تلفن خود را ارسال فرمایید تا سرکار خانم مریم دادخواه (متخصص حقوق خانواده) با شما تماس بگیرند.`;
  } else if (query.includes('کلاهبرداری') || query.includes('دزدی') || query.includes('سرقت') || query.includes('جعل') || query.includes('فیشینگ') || query.includes('کیفری')) {
    reply = `با سلام و احترام،
دعاوی کیفری مستقیم با آبرو و آزادی اشخاص مرتبط هستند و حضور وکیل متخصص از اولین ساعات پرونده (در کلانتری و دادسرا) حیاتی است.
۱. در موضوع کلاهبرداری، اثبات مانور متقلبانه و اغفال مال‌باخته ارکان اصلی جرم هستند.
۲. در جرائم سایبری و فیشینگ، پلیس فتا با ردیابی تراکنش‌های مالی و آی‌پی‌ها نقش اصلی را در شناسایی متهمان دارد.

توصیه جدی ما این است که پیش از حضور در دادسرا، هیچ لایحه‌ای را بدون تایید وکیل امضا نکنید. لطفاً جهت راهنمایی دقیق‌تر نام و شماره تماس خود را ارسال کنید تا خانم دکتر نیلوفر افشار (وکیل متخصص امور کیفری) با شما تماس بگیرند.`;
  } else if (query.includes('ثبت') || query.includes('شرکت') || query.includes('برند') || query.includes('لوگو') || query.includes('علامت تجاری')) {
    reply = `درود بر شما کارآفرین گرامی،
جهت ثبت شرکت یا برند تجاری در اداره مالکیت معنوی، رعایت چند نکته ضروری است:
۱. نام برند پیشنهادی باید پیش از ثبت، به طور دقیق استعلام شود تا سابقه مشابهت در طبقه شغلی مورد نظر شما را نداشته باشد.
۲. شرکت‌های سهامی خاص حداقل به ۳ سهامدار و ۲ بازرس نیاز دارند در حالی که شرکت با مسئولیت محدود با حداقل ۲ نفر قابل ثبت است.

بخش ثبتی دفتر وکالت دادآرا کل فرآیند ثبت برند شما را در سریع‌ترین زمان ممکن (حدود ۲۰ روز کاری) انجام می‌دهد. برای دریافت مشاوره ثبتی رایگان، شماره تماس خود را مرقوم بفرمایید تا مشاور ثبت ما فردا صبح با شما تماس حاصل نمایند.`;
  } else if (query.includes('هزینه') || query.includes('قیمت') || query.includes('چقدر')) {
    reply = `با سلام،
هزینه‌های خدمات حقوقی ما به دو دسته تقسیم می‌شوند:
۱. مشاوره‌های تخصصی: مشاوره تلفنی و آنلاین اولیه برای مراجعین این دمو رایگان است. جلسات حضوری و تخصصی عمیق دارای تعرفه مشخص است.
۲. حق‌الوکاله پرونده‌ها: بر اساس موضوع پرونده، میزان پیچیدگی اسناد و مدت زمان تخمینی کار تعیین می‌شود و قابلیت پرداخت اقساطی متناسب با پیشرفت پرونده را دارد.

ما همواره تلاش می‌کنیم منصفانه‌ترین شرایط مالی را برای مراجعین ارجمند فراهم کنیم. لطفاً شماره خود را بنویسید تا همکاران بخش پذیرش با شما تماس بگیرند.`;
  } else {
    reply = `سلام و درود! من دستیار هوشمند حقوقی دفتر وکالت دادآرا هستم.
من می‌توانم شما را در موضوعات زیر راهنمایی کنم:
- دعاوی ملکی و اسناد ثبتی 🏠
- مسائل خانواده، مهریه و حضانت 👥
- امور کیفری، کلاهبرداری و جرائم سایبری 🛡️
- ثبت شرکت‌ها، برند و علائم تجاری 🏢
- تنظیم قراردادهای تجاری و استخدامی 📝

چطور می‌توانم به شما کمک کنم؟ همچنین می‌توانید شماره تلفن خود را به همراه موضوع بگذارید تا وکلای باسابقه ما تا حداکثر ۲۴ ساعت آینده مستقیماً با شما تماس بگیرند.`;
  }

  res.json({ text: reply });
});

// Start Express Server
async function startServer() {
  // Vite middleware setup for local development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite loaded in development middleware mode.');
  } else {
    // In production, serve build folder static assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving static build from dist folder.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server successfully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
