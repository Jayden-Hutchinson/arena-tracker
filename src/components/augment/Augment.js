import { useContext } from "react";

import { AugmentContext } from "App";

import { CDRAGON } from "api/cdragon";

import "./Augment.css";

function Augment({ augmentId }) {
  const augments = useContext(AugmentContext);
  const augmentData = augments?.find((augment) => augment.id === augmentId);

  return (
    augmentId > 0 && (
      <img
        className="Augment"
        src={CDRAGON.AUGMENT_IMAGE(augmentData.iconLarge)}
        alt={augmentData.name}
      />
    )
  );
}
export default Augment;
