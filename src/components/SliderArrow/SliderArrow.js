import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";

const SliderArrow = ({ style, onClick, direction }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`slider-cust-arrow ${direction}-arrow`}
    >
      {direction === "right" && <ImArrowRight2 />}
      {direction === "left" && <ImArrowLeft2 />}
    </button>
  );
};

export default SliderArrow;
