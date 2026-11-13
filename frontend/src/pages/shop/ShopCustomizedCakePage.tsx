import { useState } from 'react';
import { buildWhatsAppLink, customCakeMessage } from '../../utils/whatsapp';
import { theme } from '../../components/shop/theme';

const btnStyle: React.CSSProperties = { display: 'inline-block', background: theme.whatsapp, color: '#fff', border: 'none', borderRadius: '999px', padding: '0.72rem 1.5rem', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', cursor: 'pointer' };

const eyebrow: React.CSSProperties = { textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: '0.74rem', fontWeight: 700, color: theme.accent };
const title: React.CSSProperties = { fontFamily: theme.serif, fontSize: '1.9rem', fontWeight: 700, color: theme.ink, margin: '0.4rem 0 0' };
const sub: React.CSSProperties = { color: theme.body, margin: '0.5rem auto 0', maxWidth: '34rem' };

interface Fields {
  name: string;
  phone: string;
  occasion: string;
  flavor: string;
  size: string;
  date: string;
  requirements: string;
}

function validateFields(f: Fields): string[] {
  const errors: string[] = [];
  if (f.name && f.name.trim().length > 80) errors.push('Name should be shorter than 80 characters.');
  if (f.phone && !/^[0-9+\-\s()]{6,18}$/.test(f.phone.trim())) errors.push('Please enter a valid phone number.');
  if (f.flavor && f.flavor.trim().length > 120) errors.push('Flavour text is too long.');
  if (f.occasion && f.occasion.trim().length > 120) errors.push('Occasion text is too long.');
  if (f.size && f.size.trim().length > 40) errors.push('Size text is too long.');
  if (f.date) {
    const d = new Date(f.date);
    if (isNaN(d.getDate())) errors.push('Please enter a valid date.');
  }
  if (f.requirements && f.requirements.trim().length > 800) errors.push('Special requirements are too long (max 800 characters).');
  return errors;
}

export default function ShopCustomizedCakePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('');
  const [flavor, setFlavor] = useState('');
  const [size, setSize] = useState('');
  const [date, setDate] = useState('');
  const [requirements, setRequirements] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const lab = { display: 'block', margin: '1rem 0 0.35rem', fontSize: '0.85rem', fontWeight: 700, color: theme.ink } as React.CSSProperties;
  const inp = { width: '100%', boxSizing: 'border-box', padding: '0.62rem 0.8rem', borderRadius: '0.6rem', border: '1px solid ' + theme.line, background: '#fff', fontSize: '0.95rem', color: theme.ink } as React.CSSProperties;

  return (
    <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
        <div style={eyebrow}>Made just for you</div>
        <h1 style={title}>Customized Cake</h1>
        <p style={sub}>Tell us about your dream cake and continue on WhatsApp. Our team will discuss the design and price with you.</p>
      </div>
      {errors.length > 0 && (
        <div style={{ background: '#fdeaea', color: '#c0392b', borderRadius: '10px', padding: '0.7rem 1rem', margin: '0.5rem 0' }}>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
      )}
      <div style={{ background: theme.surface, borderRadius: '1.1rem', padding: '1.7rem 1.6rem', boxShadow: '0 8px 22px rgba(70,48,34,0.08)' }}>
        <label style={lab}>Your name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={inp} />
        <label style={lab}>Phone number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inp} />
        <label style={lab}>Occasion</label>
        <input value={occasion} onChange={(e) => setOccasion(e.target.value)} style={inp} />
        <label style={lab}>Cake type / flavour</label>
        <input value={flavor} onChange={(e) => setFlavor(e.target.value)} style={inp} />
        <label style={lab}>Approximate weight / size</label>
        <input value={size} onChange={(e) => setSize(e.target.value)} style={inp} />
        <label style={lab}>Preferred date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inp} />
        <label style={lab}>Special requirements</label>
        <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} style={{ ...inp, minHeight: '6rem' }} placeholder="e.g. theme, colors, writing on cake..." />
        <div style={{ marginTop: '1.3rem' }}>
          <a
            href={buildWhatsAppLink(customCakeMessage({ name: name.trim() || 'Not provided', phone: phone.trim() || 'Not provided', occasion: occasion.trim() || 'Not provided', flavor: flavor.trim() || 'Not provided', size: size.trim() || 'Not provided', date: date || 'Not provided', requirements: requirements.trim() }))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const errs = validateFields({ name, phone, occasion, flavor, size, date, requirements });
              if (errs.length) {
                e.preventDefault();
                setErrors(errs);
              }
            }}
            style={btnStyle}
          >
            Continue on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

}
