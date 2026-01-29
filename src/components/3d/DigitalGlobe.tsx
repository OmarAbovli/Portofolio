import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface DigitalGlobeProps {
    mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const DigitalGlobe = ({ mousePosition }: DigitalGlobeProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            // Gentle floating
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

            // Subtle tilt based on mouse
            meshRef.current.rotation.x = mousePosition.current.y * 0.2;
            meshRef.current.rotation.z = mousePosition.current.x * 0.2;
        }

        if (glowRef.current) {
            glowRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            glowRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group>
            {/* Core Wireframe Sphere */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Inner Glowing Core */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[2.2, 32, 32]} />
                <MeshDistortMaterial
                    color="#3b82f6"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Outer Halo */}
            <mesh scale={[2.8, 2.8, 2.8]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

export default DigitalGlobe;
