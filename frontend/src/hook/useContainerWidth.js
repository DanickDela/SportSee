import { useState, useEffect } from "react";

/**
 * Hook personnalisé permettant de suivre dynamiquement
 * la largeur d'un élément DOM.
 *
 * Utilise l'API ResizeObserver pour détecter les changements
 * de taille du conteneur et mettre à jour la valeur en temps réel.
 *
 * @function useContainerWidth
 *
 * @param {React.RefObject<HTMLElement>} ref - Référence vers l'élément DOM à observer.
 *
 * @returns {number} Largeur actuelle du conteneur en pixels.
 *
 * @example
 * const ref = useRef(null);
 * const width = useContainerWidth(ref);
 *
 * return <div ref={ref}>Largeur : {width}px</div>;
 */
function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return width;
}

export default useContainerWidth;
