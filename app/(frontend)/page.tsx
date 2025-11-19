'use client'
import { Product } from '@/payload-types';
import { useEffect, useState } from 'react';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.docs))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      { loading ? <p>Loading...</p> : products.map((product: Product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
    </div>
  );
}
