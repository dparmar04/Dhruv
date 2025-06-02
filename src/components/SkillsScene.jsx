/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Skill list with labels, colors, and texture paths
const skills = [
  { label: "HTML", color: "#f16529", texture: "/logo/html.png" },
  // { label: "CSS", color: "#2965f1", texture: "/logo/css.png" },
  { label: "React", color: "#61dafb", texture: "/logo/react.png" },
  { label: "Tailwind", color: "#38bdf8", texture: "/logo/tailwind.png" },
  // { label: "GSAP", color: "#88ce02", texture: "/logo/gsap.png" },
  { label: "GitHub", color: "#000000", texture: "/logo/github.png" },
  { label: "Node.js", color: "#3c873a", texture: "/logo/nodejs.png" },
  { label: "MongoDB", color: "#4db33d", texture: "/logo/mongo.png" },
];

// Single orbiting logo component
const LogoOrbiter = ({ label, color, texture, angleOffset }) => {
  const ref = useRef();
  const [angle] = useState(angleOffset);
  const map = useTexture(texture);

  useEffect(() => {
    gsap.fromTo(ref.current.scale, { x: 0, y: 0, z: 0 }, {
      x: 1, y: 1, z: 1,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
      delay: angleOffset * 0.05
    });
  }, [angleOffset]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 4;
    const x = Math.cos(t * 0.4 + angle) * radius;
    const z = Math.sin(t * 0.4 + angle) * radius;
    ref.current.position.set(x, 0, z);
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={ref} castShadow>
        <circleGeometry args={[0.7, 64]} />
        <meshStandardMaterial map={map} transparent />
        <Html distanceFactor={10} position={[0, 1.2, 0]} center>
          <div style={{ color: "white", fontWeight: "bold", fontSize: "14px", zIndex: "1" }}>{label}</div>
        </Html>
      </mesh>
    </Float>
  );
};

// Main Skills 3D Scene
const SkillsScene = () => {
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <h1 className="text-center text-7xl font-bold mt-10 text-white  font-space">Tech stacks</h1>
      <Canvas shadows camera={{ position: [0, 3, 8], fov: 60 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} castShadow color="#ffffff" />
        <directionalLight position={[-5, 5, 5]} intensity={2} color="#ffffff" />

        {skills.map((skill, i) => (
          <LogoOrbiter
            transparent
            key={skill.label}
            label={skill.label}
            color={skill.color}
            texture={skill.texture}
            angleOffset={(i / skills.length) * Math.PI * 2}
          />
        ))}

        <Stars radius={10} depth={50} count={5000} factor={4} saturation={0} fade />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default SkillsScene;