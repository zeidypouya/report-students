import { Vazirmatn } from 'next/font/google';
import './globals.css';

// لود کردن فونت وزیرمتن
const vazir = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['400', '700'], // معمولی و ضخیم
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      {/* اعمال فونت به کل بدنه سایت */}
      <body className={vazir.className}>{children}</body>
    </html>
  );
}
