import Augment from "components/augment/Augment";
import "./Augments.css";

function Augments({ augments }) {
  return (
    <div className="Augments">
      {augments &&
        augments.map((augmentId) => {
          return <Augment key={augmentId} augmentId={augmentId} />;
        })}
    </div>
  );
}
export default Augments;
