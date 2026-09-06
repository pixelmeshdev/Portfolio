import { useFrame } from "@react-three/fiber";
import { Text, useScroll } from "@react-three/drei";
import { useRef } from "react";

const roles = ["Frontend Developer", "Creative Technologist"];

function AnimatedRole({ role, index, opacityRef }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current?.material) return;

    const phase = (clock.getElapsedTime() % 4) / 4;
    const active = index === 0 ? phase < 0.5 : phase >= 0.5;
    const transition = active ? (phase % 0.5) : ((phase + 0.5) % 0.5);
    const edgeFade = Math.min(transition / 0.12, (0.5 - transition) / 0.12);
    const amount = active ? Math.max(0, Math.min(1, edgeFade)) : 0;

    ref.current.rotation.x = (1 - amount) * (active ? 1 : -1) * 0.9;
    ref.current.position.y = 0.28 + (1 - amount) * (active ? 0.08 : -0.08);
    ref.current.material.opacity = opacityRef.current * amount;
    ref.current.material.transparent = true;
    ref.current.visible = amount > 0.02;
  });

  return (
    <Text
      ref={ref}
      fontSize={0.22}
      color="#ffffff"
      position={[-0.68, 0.28, 0]}
      anchorX="left"
      anchorY="middle"
      letterSpacing={0.04}
      outlineWidth={0.008}
      outlineColor="#a855f7"
      outlineOpacity={0.75}
    >
      {role}
    </Text>
  );
}

export default function HeroSection() {
  const groupRef = useRef();
  const opacityRef = useRef(1);
  const scroll = useScroll();

  useFrame(() => {
    const portalProgress = scroll.range(0, 0.33);
    opacityRef.current = 1 - portalProgress;
    if (!groupRef.current) return;

    groupRef.current.position.x = -1.2 - portalProgress * 0.5;
    groupRef.current.position.y = -0.06 - portalProgress * 0.3;
  });

  return (
    <group ref={groupRef} position={[-1.2, -0.06, 0.9]}>
      <Text
        fontSize={0.42}
        color="#ffffff"
        position={[-0.7, 0.72, 0]}
        anchorX="left"
        anchorY="middle"
        fontWeight="bold"
        letterSpacing={0.02}
        outlineWidth={0.012}
        outlineColor="#7c3aed"
        outlineOpacity={0.65}
      >
        Pixel Mesh Dev
      </Text>

      {roles.map((role, index) => (
        <AnimatedRole key={role} role={role} index={index} opacityRef={opacityRef} />
      ))}

      <Text
        fontSize={0.15}
        color="#ffffff"
        position={[-0.68, -0.05, 0]}
        anchorX="left"
        anchorY="top"
        maxWidth={2.7}
        lineHeight={1.3}
        outlineWidth={0.006}
        outlineColor="#22d3ee"
        outlineOpacity={0.8}
      >
        {"I love crafting\ncaptivating experiences for the\ndigital world to savor."}
      </Text>
    </group>
  );
}
