import { theme } from './theme';

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div style={style}>
      <div style={pill}>{label}</div>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div style={{ ...style, background: '#fffdfb', border: '1px dashed ' + theme.line, borderRadius: '1rem' }}>
      <div style={pop}>{message}</div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  const friendly = message === 'Failed to fetch' ? 'We could not reach the server. Please try again.' : message;
  return (
    <div style={{ ...style, background: theme.discBg, borderRadius: '1rem' }}>
      <div style={{ color: theme.discInk, fontWeight: 600 }}>{friendly}</div>
    </div>
  );
}

const style: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.9rem', padding: '3rem 1.4rem', textAlign: 'center' };
const pill: React.CSSProperties = { fontSize: '0.95rem', color: theme.body };
const pop: React.CSSProperties = { fontFamily: theme.serif, fontSize: '1.05rem', color: theme.body };