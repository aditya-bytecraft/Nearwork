import React from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

function AnimatedBackground() {
  const particlesInit = async (main) => {
    await loadStarsPreset(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: "#090c1b"
        },
        fullScreen: {
          enable: true,
          zIndex: 0
        },
        particles: {
          move: {
            enable: true,
            speed: 0.3
          },
          number: {
            value: 160
          },
          opacity: {
            value: 0.8,
            random: { enable: true, minimumValue: 0.5 },
            animation: { enable: true, speed: 0.5, minimumValue: 0.3, sync: false }
          },
          size: {
            value: { min: 0.5, max: 2 }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              color: "#fff"
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            }
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        }
      }}
    />
  );
}

export default AnimatedBackground;
