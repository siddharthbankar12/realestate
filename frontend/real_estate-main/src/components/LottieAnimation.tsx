import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player'

type LottieAnimationProps = {
  animationLink: string;
  style?: React.CSSProperties;
  className?: string;
};

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationLink, style, className }) => {
  return (
    <div className={className} style={style}>
      <Player
        autoplay
        loop
        src={animationLink}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;
