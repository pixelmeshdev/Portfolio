import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main(){
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const fragmentShader = `
uniform float uTime;

// 1. Declared 6 image textures 
uniform sampler2D uText1;
uniform sampler2D uText2;
uniform sampler2D uText3;
uniform sampler2D uText4;
uniform sampler2D uTextBg; // Locked background 1

// 2. Receive the UV coordinates from the vertex shader
varying vec2 vUv;

void main() {
    vec4 bgColor = texture2D(uTextBg, vUv);
    vec4 c1 = texture2D(uText1, vUv);
    vec4 c2 = texture2D(uText2, vUv);
    vec4 c3 = texture2D(uText3, vUv);
    vec4 c4 = texture2D(uText4, vUv);
    
  vec3 lumaWeights = vec3(0.2126, 0.7152, 0.0722);
  float luma1 = dot(c1.rgb, lumaWeights);
  vec3 saturatedC1 = mix(vec3(luma1), c1.rgb, 1.3); // 130% Saturation 

  float luma2 = dot(c2.rgb, lumaWeights);
  vec3 saturatedC2 = mix(vec3(luma2), c2.rgb, 1.3);

  float luma3 = dot(c3.rgb, lumaWeights);
  vec3 saturatedC3 = mix(vec3(luma3), c3.rgb, 1.3);

  float luma4 = dot(c4.rgb, lumaWeights);
  vec3 saturatedC4 = mix(vec3(luma4), c4.rgb, 1.3);

  // 2. Perform Screen Blending with Background 
  vec3 screen1 = 1.0 - (1.0 - bgColor.rgb) * (1.0 - saturatedC1);
  vec3 screen2 = 1.0 - (1.0 - bgColor.rgb) * (1.0 - saturatedC2);
  vec3 screen3 = 1.0 - (1.0 - bgColor.rgb) * (1.0 - saturatedC3);
  vec3 screen4 = 1.0 - (1.0 - bgColor.rgb) * (1.0 - saturatedC4);

      // ================= THE ANIMATION ENGINE =================

  float loopTime = mod(uTime, 12.0);

   // Calculate when each image fades in and out    
  // Format: smoothstep(start_fade_in, end_fade_in, time) * smoothstep(start_fade_out, end_fade_out, time)  

  float w1 = smoothstep(0.0, 0.5, loopTime) * smoothstep(3.0, 2.5, loopTime);
  float w2 = smoothstep(3.0, 3.5, loopTime) * smoothstep(6.0, 5.5, loopTime);
  float w3 = smoothstep(6.0, 6.5, loopTime) * smoothstep(9.0, 8.5, loopTime);
  float w4 = smoothstep(9.0, 9.5, loopTime) * smoothstep(12.0, 11.5, loopTime);

 vec3 finalColor = bgColor.rgb; 

 float maxOpacity = 0.85;
 finalColor = mix(finalColor, screen1, w1 * maxOpacity);
 finalColor = mix(finalColor, screen2, w2 * maxOpacity);
 finalColor = mix(finalColor, screen3, w3 * maxOpacity);
 finalColor = mix(finalColor, screen4, w4 * maxOpacity);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export default function ImageTransitionEffect() {
  const meshRef = useRef()
  const materialRef = useRef()
  
  useFrame((state) => {
  if (materialRef.current?.uniforms) {
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
  }
})

  // 1.loading textures here using useTexture
  const textures = useTexture({
    img1: "/img1.jpg",
    img2: "/img2.jpg",
    img3: "/img3.jpg",
    img4: "/img4.jpg",
    imgBg: "/imgM.jpg",
   
  })

  return(
    <mesh ref={meshRef}>
         <planeGeometry args={[11, 4.5]} position={[0, 0, 0]} /> {/* 👈 Add this shape! */}
        <shaderMaterial  
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
            uTime: {value: 0},

            uText1: {value: textures.img1},
            uText2: {value: textures.img2},
            uText3: {value: textures.img3},
            uText4: {value: textures.img4},
            uTextBg: {value: textures.imgBg},
            
        }

        }
        />
    </mesh>
  ) // Return your mesh here when ready!
}