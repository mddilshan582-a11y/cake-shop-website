import { theme, eyebrowStyle, headLineStyle, subStyle } from './theme';

interface Props {
  id?: string;
  eyebrow?: string;
  title: string;
  sub?: string;
}

export default function Section({ id, eyebrow, title, sub }: Props) {
  return (
    <div id={id} style={{ margin: '2.8rem 0 1.1rem' }}>
      {eyebrow ? <div style={eyebrowStyle}>{eyebrow}</div> : null}
      <h2 style={headLineStyle}>{title}</h2>
      {sub ? (
        <p style={subStyle}>{sub}</p>
      ) : (
        <p style={{ ...subStyle, color: theme.body }}>&nbsp;</p>
      )}
    </div>
  );
}