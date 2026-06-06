import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Chat endpoint.
//
// • Out of the box: a lightweight rule-based FAQ responder (no key needed).
// • Upgrade to a real AI assistant: set ANTHROPIC_API_KEY in your environment
//   (.env.local / Vercel project env). When present, the route calls Claude
//   with a brand system prompt instead of the FAQ fallback.
// ---------------------------------------------------------------------------

interface Msg { role: 'user' | 'assistant'; content: string }

const SYSTEM_EN =
  'You are the assistant for The Builders Solutions, a supplier of architectural and structural building components (expansion joints, tile trims, cubicles, skirtings, ceiling panels, bollards, modular buildings). Be concise, helpful and accurate. If asked for prices or specs you do not know, invite the user to request a quote via the contact form. Do not invent certifications or figures.';
const SYSTEM_AR =
  'أنت مساعد شركة «ذا بيلدرز سوليوشنز»، مورّد لمكوّنات البناء المعمارية والإنشائية. كن موجزاً ومفيداً ودقيقاً. إذا سُئلت عن أسعار أو مواصفات لا تعرفها، ادعُ المستخدم لطلب عرض سعر عبر نموذج التواصل. لا تختلق شهادات أو أرقاماً.';

function faqReply(text: string, lang: 'en' | 'ar'): string {
  const q = text.toLowerCase();
  const has = (...k: string[]) => k.some((w) => q.includes(w));

  if (lang === 'ar') {
    if (has('سعر', 'تكلفة', 'عرض')) return 'يسعدنا تجهيز عرض سعر. يرجى مشاركة تفاصيل مشروعك عبر نموذج «اتصل بنا» أو واتساب.';
    if (has('منتج', 'مواصفات')) return 'نوفّر فواصل تمدد، زوايا بلاط، كبائن، وزرات، ألواح أسقف، حواجز، ومبانٍ معيارية. أي منتج يهمّك؟';
    if (has('توصيل', 'شحن', 'موقع')) return 'نورّد للمشاريع في المنطقة. شاركنا موقعك وسنوضّح الخيارات.';
    return 'شكراً لتواصلك! اسألني عن منتجاتنا أو خدماتنا، أو اطلب عرض سعر عبر نموذج التواصل.';
  }
  if (has('price', 'cost', 'quote', 'pricing')) return 'Happy to prepare a quote. Please share your project details via the Contact form or WhatsApp and the team will respond.';
  if (has('product', 'spec', 'range', 'catalog')) return 'We supply expansion joints, tile trims, cubicles, skirtings, ceiling panels, bollards and modular buildings. Which one are you interested in?';
  if (has('deliver', 'shipping', 'location', 'where')) return 'We supply projects across the region. Share your location and we’ll outline the options.';
  if (has('contact', 'email', 'phone', 'reach')) return 'You can reach us via the Contact section, email, or the WhatsApp button at the corner of the page.';
  return 'Thanks for reaching out! Ask me about our products or services, or request a quote via the Contact form.';
}

async function claudeReply(messages: Msg[], lang: 'en' | 'ar'): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 400,
        system: lang === 'ar' ? SYSTEM_AR : SYSTEM_EN,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.content?.[0]?.text;
    return typeof text === 'string' ? text : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, lang } = (await req.json()) as { messages: Msg[]; lang: 'en' | 'ar' };
    const safeLang = lang === 'ar' ? 'ar' : 'en';
    const last = [...(messages || [])].reverse().find((m) => m.role === 'user');
    const userText = last?.content ?? '';

    const ai = await claudeReply(messages || [], safeLang);
    const reply = ai ?? faqReply(userText, safeLang);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: '…' }, { status: 200 });
  }
}
