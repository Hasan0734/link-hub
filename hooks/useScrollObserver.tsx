/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

interface ScrollElement {
  id: string;
  ratio: number;
}

interface UseScrollObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onChangeActiveId?: (newId: string, oldId: string | null) => void;
}

const useScrollObserver = ({ root, rootMargin, threshold, onChangeActiveId }: UseScrollObserverProps) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const idsRef = useRef<ScrollElement[]>([]);

  useEffect(() => {
    const handleIntersection = (entries: any[]) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const ref = idsRef.current.find((el) => el.id === id);
        if (ref) ref.ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      const maxRatio = Math.max(...idsRef.current.map((el) => el.ratio), 0.1);
      const entry = idsRef.current.find((el) => el.ratio === maxRatio);

      setActiveLink(entry?.id || null);

      if (entry && entry.id && activeLink !== entry.id && typeof onChangeActiveId === 'function') {
        onChangeActiveId(entry.id, activeLink);
      }
    };

    const optionsObserver = { root, rootMargin, threshold };
    const observer = new IntersectionObserver(handleIntersection, optionsObserver);

    idsRef.current.forEach(({ id }) => {
      const content = document.getElementById(id);
      content && observer.observe(content);
    });

    return () => {
      observer.disconnect();
    };
  }, [idsRef, root, rootMargin, threshold]);

  return { idsRef, activeLink };
};

export default useScrollObserver;