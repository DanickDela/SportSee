import { useEffect, useState } from "react";

/**
 * Hook personnalisé permettant de détecter si l'écran
 * correspond à un format tablette (<= 1024px).
 *
 * Le hook :
 * - initialise l'état en fonction de la largeur de la fenêtre,
 * - écoute les changements de taille (resize),
 * - met à jour automatiquement la valeur retournée.
 *
 * @function useIsTablet
 *
 * @returns {boolean} `true` si la largeur de l'écran est inférieure ou égale à 1024px, sinon `false`.
 *
 * @example
 * const isTablet = useIsTablet();
 *
 * return (
 *   <div>
 *     {isTablet ? "Vue tablette" : "Vue desktop"}
 *   </div>
 * );
 */
export default function useIsTablet() {
  const [isTablet, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet;
}
