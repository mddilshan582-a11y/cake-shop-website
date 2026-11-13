import { useEffect, useState } from 'react';
import { listCategories, createCategory, updateCategory, setCategoryActive } from '../../api/categories';
import { IMG_BASE } from '../../config';
import type { CategoryWithCount } from '../../types';

export default function CategoriesPage() {
  const [cats, setCats] = useState<CategoryWithCount[]>([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<CategoryWithCount | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [keepImage, setKeepImage] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    try {
      setCats(await listCategories());
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const resetImage = () => {
    setImage(null);
    setImagePreview(null);
    setKeepImage(true);
  };

  const beginAdd = () => {
    setEditing(null);
    setName('');
    setDescription('');
    resetImage();
    setError('');
  };

  const beginEdit = (c: CategoryWithCount) => {
    setEditing(c);
    setName(c.name);
    setDescription(c.description ?? '');
    setImage(null);
    setImagePreview(null);
    setKeepImage(true);
    setError('');
  };

  const onPickImage = (files: FileList | null) => {
    setError('');
    const f = files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      setError('Image too large. Maximum file size is 5MB.');
      setImage(null);
      setImagePreview(null);
      return;
    }
    const okTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!okTypes.includes(f.type)) {
      setError('Only JPEG, PNG, WEBP, or GIF images are allowed.');
      setImage(null);
      setImagePreview(null);
      return;
    }
    setImage(f);
    setImagePreview(URL.createObjectURL(f));
    setKeepImage(false); // a new image has been chosen
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing.id, { name, description, image, keepImage });
      } else {
        await createCategory({ name, description, image });
      }
      setName('');
      setDescription('');
      resetImage();
      setEditing(null);
      await reload();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (c: CategoryWithCount) => {
    try {
      await setCategoryActive(c.id, !c.isActive);
      await reload();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Preview: newly selected image, else the current stored image while editing.
  const currentImage = imagePreview ?? (keepImage && editing?.imageUrl ? IMG_BASE + editing.imageUrl : null);

  return (
    <div>
      <h2 style={{ marginTop: 0, color: '#3a2e2a' }}>Categories</h2>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}

      <form onSubmit={submit} style={{ background: '#fff', padding: '1rem 1.4rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.75rem' }}>{editing ? 'Edit Category' : 'Add Category'}</h4>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '6px', marginRight: '0.5rem' }} />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '6px', marginRight: '0.5rem' }} />
        <button type="submit" disabled={saving} style={{ padding: '0.5rem 1.2rem', background: '#b4525a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, opacity: saving ? 0.6 : 1 }}>{editing ? 'Save' : 'Add'}</button>
        {editing && (
          <button type="button" onClick={beginAdd} style={{ padding: '0.5rem 1rem', marginLeft: '0.4rem', background: 'transparent', color: '#6b5b52', border: '1px solid #aaa', borderRadius: '6px' }}>Cancel</button>
        )}

        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem' }}>Category image</label>
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => onPickImage(e.target.files)} />
          <p style={{ fontSize: '0.82rem', color: '#6b5b52', margin: '0.3rem 0' }}>Recommended: landscape image, up to 5MB</p>
          {currentImage && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
              <img src={currentImage} alt="Category preview" style={{ width: '7rem', height: '4.4rem', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd' }} />
              <button type="button" onClick={() => { setImage(null); setImagePreview(null); setKeepImage(false); }} style={{ padding: '0.3rem 0.7rem', background: 'transparent', color: '#b4525a', border: '1px solid #b4525a', borderRadius: '6px', cursor: 'pointer' }}>{editing ? 'Remove image' : 'Clear selected image'}</button>
            </div>
          )}
        </div>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#eee7e8', color: '#4a3f3a', textAlign: 'left' }}>
            <th style={{ padding: '0.6rem' }}>Image</th>
            <th style={{ padding: '0.6rem' }}>Name</th>
            <th style={{ padding: '0.6rem' }}>Description</th>
            <th style={{ padding: '0.6rem' }}>Status</th>
            <th style={{ padding: '0.6rem' }}>Cakes</th>
            <th style={{ padding: '0.6rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #ece6e3' }}>
              <td style={{ padding: '0.6rem' }}>
                {c.imageUrl ? (
                  <img src={IMG_BASE + c.imageUrl} alt={c.name} style={{ width: '3.6rem', height: '2.4rem', objectFit: 'cover', borderRadius: '5px' }} />
                ) : (
                  <span style={{ color: '#b9b0a5', fontSize: '0.8rem' }}>—</span>
                )}
              </td>
              <td style={{ padding: '0.6rem' }}>{c.name}</td>
              <td style={{ padding: '0.6rem', color: '#777' }}>{c.description || '-'}</td>
              <td style={{ padding: '0.6rem' }}>
                <span style={{ color: c.isActive ? '#1e7a34' : '#b9b0a5' }}>{c.isActive ? 'Active' : 'Inactive'}</span>
              </td>
              <td style={{ padding: '0.6rem' }}>{c._count ? c._count.cakes : 0}</td>
              <td style={{ padding: '0.6rem' }}>
                <button onClick={() => beginEdit(c)} style={{ marginRight: '0.4rem', border: '1px solid #999', background: 'transparent', borderRadius: '5px', padding: '0.25rem 0.7rem', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => toggleActive(c)} style={{ border: '1px solid #999', background: 'transparent', borderRadius: '5px', padding: '0.25rem 0.7rem', cursor: 'pointer' }}>{c.isActive ? 'Deactivate' : 'Activate'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}