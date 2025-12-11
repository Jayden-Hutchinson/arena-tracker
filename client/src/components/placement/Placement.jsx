function Placement({ placement }) {
  const textColour = getColor();

  function getColor() {
    switch (placement) {
      case 1:
        return "text-amber-500";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-orange-900";
    }
  }

  console.log(textColour);
  return <div className={textColour}>{placement}</div>;
}
export default Placement;
