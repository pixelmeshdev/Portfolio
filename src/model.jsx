import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import * as THREE from 'three'

export default function Model() {
  const { scene, nodes } = useGLTF('./outis_draco.glb')
  const modelRef = useRef()
  const headRef = useRef()
  const initialheadRot = useRef(new THREE.Euler())

  useEffect(() => {
    if (nodes["face_06"]) {
      headRef.current = nodes["face_06"]
      initialheadRot.current.copy(nodes["face_06"].rotation)
    }
  }, [nodes])

  useFrame((state) => {
    if (headRef.current) {
      const targetYaw = initialheadRot.current.y + state.pointer.x * (Math.PI / 4)
      const targetPitch = initialheadRot.current.x - state.pointer.y * (Math.PI / 5)

      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetPitch,
        0.1
      )
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetYaw,
        0.1
      )
    }
  })

  return (
    <group ref={modelRef} position={[1.35, -1, 1]} >
      <primitive object={scene} />
    </group>
  )
}
useGLTF.preload('./outis_draco.glb')