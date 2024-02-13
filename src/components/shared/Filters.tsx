import { Dispatch, SetStateAction } from "react";

import DateFilterCard from "../cards/DateFilterCard";
import DropDownFilterCard from "../cards/DropDownFilterCard";
import RangeFilterCard from "../cards/RangeFilterCard";
import CheckBoxFilterCard from "../cards/CheckBoxFilterCard";
import { compatibilities, connectivities } from "@/constants/product.constant";

type TProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const Filters = ({ show, setShow }: TProps) => {
  return (
    <>
      {show && (
        <div
          onClick={() => setShow(false)}
          className="absolute lg:hidden z-20 left-0 right-0 top-0 bottom-0 bg-black bg-opacity-10"
        />
      )}
      <div className={`filters-container ${!show ? "max-lg:hidden" : "block"}`}>
        <h2 className="font-semibold text-xl">Filters</h2>

        <div className="space-y-3 mt-2">
          <RangeFilterCard min={1} max={1000000} field="Price" step={500} />
          <RangeFilterCard min={1} max={200} field="Quantity" step={5} />
          <DateFilterCard />
          <DropDownFilterCard />
          <CheckBoxFilterCard items={connectivities} field="connectivity" />
          <CheckBoxFilterCard items={compatibilities} field="compatibility" />
          <RangeFilterCard min={1} max={200} field="Camera" step={1} />
          <RangeFilterCard min={1} max={100} field="DisplaySize" step={0.5} />
          <RangeFilterCard min={1} max={100} field="Weight" step={0.1} />
        </div>
      </div>
    </>
  );
};

export default Filters;
