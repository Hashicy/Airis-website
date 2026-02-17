import { useState, useEffect } from 'react'
import * as THREE from 'three'

export function useMouse() {
  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      setMouse(new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      ))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mouse
}
