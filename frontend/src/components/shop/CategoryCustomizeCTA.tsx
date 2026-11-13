import { Link } from 'react-router-dom';
import { absoluteUrl } from '../../utils/whatsapp';

// Category-specific premium text for the "Customize" CTA band.
const TITLES: Record<string, string> = {
  'birthday cakes': 'Customize Your Birthday Cake',
  'anniversary cakes': 'Customize Your Anniversary Cake',
  'wedding cakes': 'Customize Your Wedding Cake',
  'party cakes': 'Customize Your Party Cake',
  'custom cakes': 'Create Your Dream Cake',
};

const DESCRIPTIONS: Record<string, string> = {
  'birthday cakes': 'Create a birthday cake made especially for your celebration, your style and your special moment.',
  'anniversary cakes': 'Design a beautiful cake for a special milestone and make your celebration truly memorable.',
  'wedding cakes': 'Create an elegant wedding cake designed around your celebration, style and special day.',
  'party cakes': 'Bring your celebration to life with a cake designed especially for your party.',
  'custom cakes': 'Tell us your idea and let us create a cake made specially for your celebration.',
};

const DEFAULT_DESCRIPTION =
  'Tell us your occasion, flavour, size and design idea. Our team will help bring your vision to life.';

// "Anniversary Cakes" -> "Anniversary Cake". Graceful fallback for future categories.
function singularName(name: string): string {
  return name.trim().replace(/\s+s$/i, '');
}

function titleFor(name: string): string {
  const key = name.trim().toLowerCase();
  return TITLES[key] ?? 'Customize Your ' + singularName(name);
}

function descriptionFor(name: string): string {
  const key = name.trim().toLowerCase();
  return DESCRIPTIONS[key] ?? DEFAULT_DESCRIPTION;
}

interface Props {
  /** The current category name (used dynamically for headings/text). */
  name: string;
  /** Optional promotional website image (e.g. an existing cake photo). Never a customer upload. */
  image?: string | null;
}

export default function CategoryCustomizeCTA({ name, image }: Props) {
  const title = titleFor(name);
  const description = descriptionFor(name);
  return (
    <section className="custom-band" aria-label="Customize your cake">
      <div className="custom-media">
        {image ? (
          <img src={absoluteUrl(image)} alt={name + ' promotional cake'} />
        ) : (
          <div className="custom-media-fallback">{name}</div>
        )}
        <div className="custom-media-deco" />
      </div>
      <div className="custom-band-top">
        <div className="cb-eyebrow">Made just for you</div>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className="shop-cta-link custom-cta-link" to="/shop/customized-cake">
          Customize Your Cake <span className="cta-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}