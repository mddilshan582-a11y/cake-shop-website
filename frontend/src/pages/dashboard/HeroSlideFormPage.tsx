import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { createHeroSlide, updateHeroSlide, listHeroSlides } from '../../api/heroSlides';
import { absoluteUrl } from '../../utils/whatsapp';

const lab = { display: 'block', margin: '1rem 0 0.35rem', fontWeight: 600, fontSize: '0.9rem' } as React.CSSProperties;
const input = { width: '100%', boxSizing: 'border-box', padding: '0.55rem', borderRadius: '6px', border: '1px solid #ddd' } as React.CSSProperties;

export default function HeroSlideFormPage() {
  const params = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const editId = params.id ? Number(params.id) : null;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [displayOrder, setDisplayOrder] = useState('1');
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [keepImageUrl, setKeepImageUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editId) return;
    void listHeroSlides()
      .then((slides) => {
        const s = slides.find((x) => x.id === editId);
        if (!s) return;
        setTitle(s.title ?? '');
        setSubtitle(s.subtitle ?? '');
        setButtonText(s.buttonText ?? '');
        setButtonLink(s.buttonLink ?? '');
        setDisplayOrder(String(s.displayOrder));
        setIsActive(s.isActive);
        setKeepImageUrl(s.imageUrl);
      })
      .catch((e) => setError((e as Error).message));
  }, [editId]);

  const onPickFile = (f: File | null) => {
    setImage(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const submit = async () => {
    setError('');
    if (!editId && !image && !keepImageUrl) {
      setError('Image is required when creating a hero slide.');
      return;
    }
    const order = Number(displayOrder);
    if (!Number.isInteger(order) || order < 1) {
      setError('Display order must be a positive integer.');
      return;
    }
    if (buttonLink && buttonLink.trim() !== '' && !/^https?:\/\/|^\//.test(buttonLink.trim())) {
      setError('Button link must be a valid URL or a path starting with "/".');
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      if (title) fd.append('title', title);
      if (subtitle) fd.append('subtitle', subtitle);
      if (buttonText) fd.append('buttonText', buttonText);
      if (buttonLink) fd.append('buttonLink', buttonLink);
      fd.append('displayOrder', displayOrder);
      fd.append('isActive', String(isActive));
      if (image) fd.append('image', image);
      else if (editId && keepImageUrl) fd.append('imageUrl', keepImageUrl);
      if (editId) await updateHeroSlide(editId, fd);
      else await createHeroSlide(fd);
      navigate('/dashboard/hero-slides');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0, color: '#3a2e2a' }}>{editId ? 'Edit Hero Slide' : 'Add Hero Slide'}</h2>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1.4rem 1.6rem' }}>
        <label style={lab}>Image *</label>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => onPickFile(e.target.files?.[0] ?? null)} style={input} />
        {(preview || (keepImageUrl && !image)) && (
          <div style={{ marginTop: '0.7rem', borderRadius: '8px', overflow: 'hidden', height: '10rem', background: '#f0e3d5' }}>
            <img src={preview ?? absoluteUrl(keepImageUrl ?? '')} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <label style={lab}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={input} />

        <label style={lab}>Subtitle</label>
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} style={input} />

        <label style={lab}>Button Text</label>
        <input value={buttonText} onChange={(e) => setButtonText(e.target.value)} style={input} />

        <label style={lab}>Button Link</label>
        <input value={buttonLink} onChange={(e) => setButtonLink(e.target.value)} style={input} placeholder="/shop/cakes or https://..." />

        <label style={lab}>Display Order</label>
        <input type="number" min="1" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} style={input} />

        <label style={{ ...lab, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active
        </label>

        <div style={{ marginTop: '1.4rem' }}>
          <button onClick={submit} disabled={saving} style={{ background: '#b4525a', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.6rem 1.4rem', fontWeight: 600 }}>{saving ? 'Saving...' : 'Save Slide'}</button>
          <Link to="/dashboard/hero-slides" style={{ padding: '0.6rem 1.2rem', border: '1px solid #999', borderRadius: '6px', textDecoration: 'none', color: '#333', marginLeft: '0.6rem' }}>Cancel</Link>
        </div>
      </div>
    </div>
  );
}