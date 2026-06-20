import './NeonBackground.css';

const ORBS = [
  { color: '#ff003c', size: 320, top: '10%',  left: '5%',   delay: '0s',   duration: '8s'  },
  { color: '#00f0ff', size: 280, top: '60%',  left: '15%',  delay: '1s',   duration: '10s' },
  { color: '#bf00ff', size: 350, top: '20%',  left: '75%',  delay: '2s',   duration: '9s'  },
  { color: '#00ff88', size: 240, top: '70%',  left: '80%',  delay: '0.5s', duration: '11s' },
  { color: '#ff6b00', size: 200, top: '45%',  left: '45%',  delay: '3s',   duration: '7s'  },
  { color: '#ffe600', size: 180, top: '85%',  left: '40%',  delay: '1.5s', duration: '12s' },
  { color: '#ff00aa', size: 260, top: '5%',   left: '50%',  delay: '2.5s', duration: '9s'  },
];

function NeonBackground({ light }) {
  return (
    <div className={`neon-bg ${light ? 'neon-bg-light' : ''}`} aria-hidden="true">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="neon-orb"
          style={{
            '--color': orb.color,
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
          }}
        />
      ))}
    </div>
  );
}

export default NeonBackground;
