import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface TechOrbitProps {
    radius?: number;
    speed?: number;
    yOffset?: number;
    items: string[];
    color: string;
}

const TechOrbit = ({ radius = 4, speed = 1, yOffset = 0, items, color }: TechOrbitProps) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
        }
    });

    const distributedItems = useMemo(() => {
        return items.map((item, index) => {
            const angle = (index / items.length) * Math.PI * 2;
            return {
                item,
                x: Math.cos(angle) * radius,
                z: Math.sin(angle) * radius,
            };
        });
    }, [items, radius]);

    return (
        <group ref={groupRef} position={[0, yOffset, 0]}>
            {distributedItems.map((data, i) => (
                <group key={i} position={[data.x, 0, data.z]}>
                    {/* Use Billboard so text always faces camera */}
                    <Billboard>
                        <Text
                            fontSize={0.3}
                            color={color}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {data.item}
                        </Text>
                    </Billboard>
                    {/* Connection Line to center (optional visual guide) */}
                    {/* <Line points={[[0,0,0], [-data.x, 0, -data.z]]} color={color} opacity={0.1} transparent /> */}
                </group>
            ))}

            {/* Orbital Ring Visual */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
                <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

export default TechOrbit;
