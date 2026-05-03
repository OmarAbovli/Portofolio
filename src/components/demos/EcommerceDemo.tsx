import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, OrbitControls } from '@react-three/drei';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import * as THREE from 'three';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  color: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Floating3DProduct = ({ product, index }: { product: Product; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
  });

  const getGeometry = () => {
    switch (index % 3) {
      case 0: return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      case 1: return <sphereGeometry args={[0.5, 32, 32]} />;
      default: return <cylinderGeometry args={[0.4, 0.4, 0.8, 8]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[index * 2 - 2, 0, 0]}>
        {getGeometry()}
        <meshStandardMaterial
          color={product.color}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = ({ products }: { products: Product[] }) => {
  return (
    <>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
      
      {products.map((product, index) => (
        <Floating3DProduct key={product.id} product={product} index={index} />
      ))}
      
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.1}
          position={[0, -2, 0]}
        >
          Tech Store 3D
          <meshStandardMaterial color="#00ffff" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </>
  );
};

const EcommerceDemo = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      description: 'Premium quality wireless headphones with noise cancellation.',
      color: '#ff6b6b'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      description: 'Advanced smartwatch with health monitoring features.',
      color: '#4ecdc4'
    },
    {
      id: 3,
      name: 'Laptop Stand',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      description: 'Ergonomic laptop stand for better posture and productivity.',
      color: '#45b7d1'
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene3D products={products} />
          </Suspense>
        </Canvas>
      </div>

      {/* Glassmorphism overlay */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-black/30 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">🛍️ Futuristic Tech Store</h1>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-cyan-500/80 hover:bg-cyan-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <ShoppingCart size={20} />
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:rotate-1"
                style={{ 
                  animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`,
                  boxShadow: `0 20px 40px rgba(${product.color.slice(1, 3)}, ${product.color.slice(3, 5)}, ${product.color.slice(5, 7)}, 0.3)`
                }}
              >
                <div className="relative overflow-hidden rounded-lg mb-4 group">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showCart && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fadeIn">
              <h2 className="text-2xl font-bold text-white mb-4">🛒 Shopping Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-300">Your cart is empty</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/20 hover:bg-white/5 rounded px-2 transition-colors">
                      <div>
                        <h4 className="text-white font-semibold">{item.name}</h4>
                        <p className="text-gray-300">${item.price} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-red-500/80 hover:bg-red-600/80 text-white p-1 rounded transition-all transform hover:scale-110"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-white font-semibold text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-green-500/80 hover:bg-green-600/80 text-white p-1 rounded transition-all transform hover:scale-110"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 text-right">
                    <p className="text-2xl font-bold text-cyan-400 mb-2">Total: ${totalPrice.toFixed(2)}</p>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95">
                      🚀 Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default EcommerceDemo;
