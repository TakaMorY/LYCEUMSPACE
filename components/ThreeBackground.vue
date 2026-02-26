<template>
    <canvas ref="canvasRef" id="three-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
let scene = null
let camera = null
let renderer = null
let particlesMesh = null
let animationId = null

onMounted(() => {
    initThree()
    animate()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    if (animationId) {
        cancelAnimationFrame(animationId)
    }
    window.removeEventListener('resize', handleResize)
    if (renderer) {
        renderer.dispose()
    }
})

const initThree = () => {
    if (!canvasRef.value) return

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        alpha: true,
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1500
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 20
        posArray[i + 1] = (Math.random() - 0.5) * 20
        posArray[i + 2] = (Math.random() - 0.5) * 20
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
    })

    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 3
}

const animate = () => {
    if (!renderer || !scene || !camera || !particlesMesh) return

    animationId = requestAnimationFrame(animate)

    const time = Date.now() * 0.0005
    particlesMesh.rotation.x = time * 0.1
    particlesMesh.rotation.y = time * 0.15

    renderer.render(scene, camera)
}

const handleResize = () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
</script>

<style scoped>
#three-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}
</style>