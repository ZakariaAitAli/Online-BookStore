import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem("user") == null) {
      router.push('/login');
    } else {
      router.push('/catalog');
    }
  }, []);
}
