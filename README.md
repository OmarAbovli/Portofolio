
## Core Technologies Stack

- **React 18** - Main frontend framework for building UI
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Ultra-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Three Fiber** - React renderer for Three.js (for 3D graphics)
- **Three.js** - JavaScript 3D library using WebGL for rendering
- **React Three Drei** - Useful helper components for React Three Fiber

---

## 3D Background System

- `Scene3D.tsx` - Main 3D scene controller component
- `InteractiveModels.tsx` - Includes DNA helix, morphing crystals, holographic text models
- `ParticleField.tsx` - 2000 floating particles arranged in galaxy-like formations
- `QuantumSphere.tsx` - Color-changing spheres responding to mouse movement
- `FloatingGeometry.tsx` - Animated geometric shapes such as spheres, boxes, torus, and octahedrons

---

## How the 3D Works

- **Canvas Component** - Creates the WebGL rendering context
- **useFrame Hook** - Runs the animation loop at 60fps for smooth updates
- **Mouse Tracking** - Real-time cursor position that influences 3D objects behavior
- **Lighting System** - Includes multiple light sources (ambient, point, and spotlights)
- **Materials** - Uses PBR (Physically Based Rendering) materials with properties like metalness and roughness

---

## Navigation & Routing

- **React Router DOM** - Handles client-side routing for a single-page app experience
- **Smooth Scrolling** - CSS `scroll-behavior` for fluid navigation between sections
- **Section-based Navigation** - Single page with multiple scrollable sections

---

## Demo System

- **Dynamic Imports** - Lazy loading of demo components for performance optimization
- **3D Enhanced Demos** - Each demo showcases unique 3D scenes
- **Glassmorphism UI** - Stylish glass-like UI elements with backdrop blur and transparency effects
