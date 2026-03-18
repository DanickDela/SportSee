import ComingSoon from "../../components/ComingSoon";

/**
 * Render Community page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Settings() {
  document.title = "Réglage - SportSee";

  return (
    <section className="settings">
      <ComingSoon />
    </section>
  );
}

export default Settings;
