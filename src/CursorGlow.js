import { useEffect, useRef } from 'react';

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const move = (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={glowRef} style={styles} />;
}

const styles = {
  position: 'fixed',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  pointerEvents: 'none',
  transform: 'translate(-50%, -50%)',
  background: 'radial-gradient(circle, rgba(255, 230, 0, 0.35) 0%, rgba(255, 200, 0, 0.12) 50%, transparent 70%)',
  boxShadow: '0 0 18px 6px rgba(255, 220, 0, 0.25)',
  zIndex: 99999,
  transition: 'left 0.06s ease, top 0.06s ease',
};

export default CursorGlow;
