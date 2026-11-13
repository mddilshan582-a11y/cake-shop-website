import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { listCategories } from '../../api/categories';
import { getCake, createCakeForm, updateCakeForm } from '../../api/cakes';
import type { Category } from '../../types';

const lab = { display: 'block', margin: '1rem 0 0' } as React.CSSProperties;
const input = { width: '100%', boxSizing: 'border-box', padding: '0.55rem', borderRadius: '6px', border: '1px solid #ddd' } as React.CSSProperties;

export default function CakeFormPage() {
  const params = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const editId = params.id ? Number(params.id) : null;
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priceRupees, setPriceRupees] = useState('');
  const [discount, setDiscount] = useState('0');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isCounter, setIsCounter] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [keepImageUrl, setKeepImageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const parsedPrice = Number(priceRupees) || 0;
  const parsedDiscount = Math.max(0, Math.min(100, Number(discount) || 0));
  const finalRupees = parsedPrice * (1 - parsedDiscount / 100);
  const currency = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  useEffect(() => {
    void listCategories().then(setCategories).catch(() => {});
    if (editId) {
      void getCake(editId)
        .then((cake) => {
          setName(cake.name);
          setDescription(cake.description ?? '');
          setCategoryId(String(cake.categoryId));
          setPriceRupees(String(cake.pricing.originalPrice / 100));
          setDiscount(String(cake.discountPercent));
          setIsFeatured(cake.isFeatured);
          setIsCounter(cake.isCounterCake);
          setIsAvailable(cake.isAvailable);
          setKeepImageUrl(cake.imageUrl);
        })
        .catch((e) => setError((e as Error).message));
    }
  }, [editId]);

  const submit = async () => {
    setError('');
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('description', description);
      fd.append('categoryId', categoryId);
      fd.append('originalPriceRupees', priceRupees);
      fd.append('discountPercent', discount);
      fd.append('isFeatured', String(isFeatured));
      fd.append('isCounterCake', String(isCounter));
      fd.append('isAvailable', String(isAvailable));
      if (image) fd.append('image', image);
      else if (editId) fd.append('imageUrl', keepImageUrl ?? '');
      if (editId) await updateCakeForm(editId, fd);
      else await createCakeForm(fd);
      navigate('/dashboard/cakes');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0, color: '#3a2e2a' }}>{editId ? 'Edit Cake' : 'Add Cake'}</h2>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}
      <div style={{ background: '#fff', borderRadius: '10px', padding: '1.4rem 1.6rem' }}>
        <label style={lab}>Cake name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={input} />
        <label style={lab}>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={input} rows={3} />
        <label style={lab}>Category *</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={input}>
          <option value="">Select category...</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <label style={lab}>Price (Rupees) - e.g. 800</label>
        <input type="number" min="1" value={priceRupees} onChange={(e) => setPriceRupees(e.target.value)} style={input} />
        <label style={lab}>Discount (%)</label>
        <input type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} style={input} />

        <div style={{ marginTop: '1.2rem', background: '#f5efe9', borderRadius: '8px', padding: '0.8rem 1rem' }}>
          <strong>Final price: </strong>
          <span style={{ color: '#b4525a', fontWeight: 700, fontSize: '1.15rem' }}>{currency(finalRupees)}</span>
          {parsedPrice > 0 && parsedDiscount > 0 && <div style={{ color: '#8a7b70', fontSize: '0.85rem' }}>{currency(parsedPrice)} with {parsedDiscount}% off</div>}
        </div>

        <div style={{ marginTop: '1.2rem' }}>
          <label><input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} /> Featured</label>
          <label style={{ marginLeft: '1rem' }}><input type="checkbox" checked={isCounter} onChange={(e) => setIsCounter(e.target.checked)} /> Counter Cake</label>
          <label style={{ marginLeft: '1rem' }}><input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} /> Available</label>
        </div>

        <label style={lab}>Cake image</label>
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
        {editId && keepImageUrl && !image && <p style={{ fontSize: '0.85rem', color: '#6b5b52' }}>Keeping current image</p>}

        <div style={{ marginTop: '1.4rem' }}>
          <button onClick={submit} disabled={saving} style={{ padding: '0.6rem 1.4rem', background: '#b4525a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600 }}>{saving ? 'Saving...' : 'Save Cake'}</button>
          <Link to="/dashboard/cakes" style={{ padding: '0.6rem 1.2rem', border: '1px solid #999', borderRadius: '6px', textDecoration: 'none', color: '#333', marginLeft: '0.6rem' }}>Cancel</Link>
        </div>
      </div>
    </div>
  );
}