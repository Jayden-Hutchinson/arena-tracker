import { useContext } from "react";

import { AugmentContext } from "App";

import { CDRAGON } from "api/cdragon";

import "./Augment.css";

function Augment({ augmentId }) {
  const augments = useContext(AugmentContext);
  const augmentData = augments?.find((augment) => augment.id === augmentId);
  console.log(augmentData);

  return augmentId > 0 ? (
    <div className="Augment">
      <img
        className="augment-icon"
        src={CDRAGON.AUGMENT_IMAGE(augmentData.iconLarge)}
        alt={augmentData.name}
      />
      {/* <div className="description">{augmentData.desc}</div> */}
    </div>
  ) : (
    <div className="Augment" />
  );
}
export default Augment;
