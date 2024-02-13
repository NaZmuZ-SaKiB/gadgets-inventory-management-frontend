import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SaleForm from "../forms/SaleForm";

type TProps = {
  productId: string;
  maxQnt: number;
};

const SaleModal = ({ productId, maxQnt }: TProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Sell</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sale</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SaleForm productId={productId} maxQnt={maxQnt} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaleModal;
