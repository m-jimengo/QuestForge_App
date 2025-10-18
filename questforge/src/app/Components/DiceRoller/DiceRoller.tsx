import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type DiceRollerProps = {
  size?: number;
  autoRotate?: boolean;
  goldColor?: string;
  rotationSpeed?: number;
  tubeRadius?: number;
  glowScale?: number;
  glowOpacity?: number;
};

export const DiceRoller: React.FC<DiceRollerProps> = ({
  size = 4.5, 
  autoRotate = true,
  rotationSpeed = 0.3,
  goldColor = "#D4AF37",
  tubeRadius = 0.030, 
  glowScale = 1.9,
  glowOpacity = 0.35,
}) => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "150px", height: "150px", background: "transparent" }} 
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
    >
      <Scene
        size={size}
        autoRotate={autoRotate}
        rotationSpeed={rotationSpeed}
        goldColor={goldColor}
        tubeRadius={tubeRadius}
        glowScale={glowScale}
        glowOpacity={glowOpacity}
      />
    </Canvas>
  );
};

const Scene: React.FC<DiceRollerProps> = ({
  size = 3,
  autoRotate = true,
  rotationSpeed = 0.3,
  goldColor = "#D4AF37",
  tubeRadius = 0.028,
  glowScale = 1.9,
  glowOpacity = 0.35,
}) => {
  const groupRef = React.useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current || !autoRotate) return;
    groupRef.current.rotation.y += rotationSpeed * delta * 0.6;
    groupRef.current.rotation.x += rotationSpeed * delta * 0.25;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 8]} intensity={0.9} />
      <directionalLight position={[-5, -3, -4]} intensity={0.45} />

      <D20Mesh
        goldColor={goldColor}
        scale={size / 2}
        tubeRadius={tubeRadius}
        glowScale={glowScale}
        glowOpacity={glowOpacity}
      />
      <D20Numbers goldColor={goldColor} scale={size / 2} />

      <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} />
    </group>
  );
};

const D20Mesh: React.FC<{
  goldColor: string;
  scale: number;
  tubeRadius: number;
  glowScale: number;
  glowOpacity: number;
}> = ({ goldColor, scale, tubeRadius, glowScale, glowOpacity }) => {
  const { geometry, edgeTubes } = React.useMemo(() => {
    const radius = 1;
    const geo = new THREE.IcosahedronGeometry(radius, 0);

    const edges = new THREE.EdgesGeometry(geo, 1e-6);
    const pos = edges.attributes.position.array as Float32Array;

    const tubes: { center: THREE.Vector3; quaternion: THREE.Quaternion; length: number }[] = [];
    for (let i = 0; i < pos.length; i += 6) {
      const start = new THREE.Vector3(pos[i], pos[i + 1], pos[i + 2]);
      const end = new THREE.Vector3(pos[i + 3], pos[i + 4], pos[i + 5]);

      const dir = new THREE.Vector3().subVectors(end, start);
      const length = dir.length();
      const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), 
        dir.clone().normalize()
      );

      tubes.push({ center, quaternion, length });
    }
    return { geometry: geo, edgeTubes: tubes };
  }, []);

  const coreMat = React.useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(goldColor),
        metalness: 0.9,
        roughness: 0.3,
        emissive: new THREE.Color(goldColor),
        emissiveIntensity: 0.8,
      }),
    [goldColor]
  );

 
  const glowMat = React.useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(goldColor),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: glowOpacity,
        depthWrite: false,
        depthTest: true,
      }),
    [goldColor, glowOpacity]
  );

  const radialSegments = 20; 
  return (
    <group scale={scale}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          side={THREE.FrontSide}
          colorWrite={false}
          depthWrite={true}
          transparent={false}
        />
      </mesh>

      {edgeTubes.map((tube, i) => (
        <group key={i} position={tube.center} quaternion={tube.quaternion}>
          <mesh material={coreMat}>
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tube.length, radialSegments, 1, true]}
            />
          </mesh>

          <mesh material={glowMat} renderOrder={2}>
            <cylinderGeometry
              args={[
                tubeRadius * glowScale,
                tubeRadius * glowScale,
                tube.length,
                radialSegments,
                1,
                true,
              ]}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const D20Numbers: React.FC<{ goldColor: string; scale: number }> = ({
  goldColor,
  scale,
}) => {
  const groupRef = React.useRef<THREE.Group>(null!);
  const { camera } = useThree();

  const data = React.useMemo(() => {
    let geo: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1, 0);
    geo.computeVertexNormals();

    if (!geo.index) {
      geo = mergeVertices(geo);
      geo.computeVertexNormals();
    }

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const index = geo.index!;
    const faceCount = index.count / 3;

    type FaceLabel = {
      position: [number, number, number];
      normal: THREE.Vector3;
      quaternion: THREE.Quaternion;
      faceIndex: number;
    };

    const labels: FaceLabel[] = [];

    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();
    const centroid = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const zAxis = new THREE.Vector3(0, 0, 1);

    for (let f = 0; f < faceCount; f++) {
      const ia = index.getX(f * 3 + 0);
      const ib = index.getX(f * 3 + 1);
      const ic = index.getX(f * 3 + 2);

      a.fromBufferAttribute(pos, ia);
      b.fromBufferAttribute(pos, ib);
      c.fromBufferAttribute(pos, ic);

      centroid.copy(a).add(b).add(c).multiplyScalar(1 / 3);
      normal.copy(b).sub(a).cross(c.clone().sub(a)).normalize();

      const offset = 0.035;
      const p = centroid.clone().add(normal.clone().multiplyScalar(offset));
      const q = new THREE.Quaternion().setFromUnitVectors(zAxis, normal);

      labels.push({
        position: [p.x, p.y, p.z],
        normal: normal.clone(),
        quaternion: q,
        faceIndex: f,
      });
    }

    return labels;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const normalMatrix = new THREE.Matrix3();
    normalMatrix.getNormalMatrix(groupRef.current.matrixWorld);

    const worldPos = new THREE.Vector3();
    const worldNormal = new THREE.Vector3();
    const camPos = camera.position.clone();

    groupRef.current.children.forEach((child, i) => {
      const label = data[i];
      if (!label) return;

      worldPos
        .set(label.position[0], label.position[1], label.position[2])
        .applyMatrix4(groupRef.current.matrixWorld);

      worldNormal.copy(label.normal).applyMatrix3(normalMatrix).normalize();

      const toCam = camPos.clone().sub(worldPos).normalize();
      const facing = worldNormal.dot(toCam) > 0.0;
      child.visible = facing;
    });
  });

  return (
    <group ref={groupRef} scale={scale}>
      {data.map((f, i) => {
        const number = i + 1;
        const fontSize = 0.22;

        return (
          <group key={i} position={f.position} quaternion={f.quaternion}>
            <Text
              fontSize={fontSize}
              color={goldColor}
              outlineWidth={0.012}
              outlineColor={"#8c732d"}
              anchorX="center"
              anchorY="middle"
              renderOrder={1}
            >
              {number.toString()}
            </Text>
          </group>
        );
      })}
    </group>
  );
};
