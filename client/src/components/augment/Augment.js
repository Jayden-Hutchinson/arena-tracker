import "./Augment.css";

function Augment({ augmentId }) {
  return (
    augmentId && (
      <div className="Augment">
        {augmentId}
        {/* <img
          className="augment-icon"
          src={CDRAGON.AUGMENT_IMAGE(augmentData.iconLarge)}
          alt={augmentData.name}
        /> */}
        {/* <div className="description">{augmentData.desc}</div> */}
      </div>
    )
  );
}
export default Augment;
