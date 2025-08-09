import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

interface props {
  children: ReactNode;
  title: string;
  open: boolean;
  className?: string;
  closeFn: () => void;
}
const DialogBox = ({
  children,
  title,
  open = false,
  closeFn,
  className,
}: props) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Content
          className={`fixed left-1/2 top-1/3  min-w-[500px]  -translate-x-1/2 -translate-y-1/3  rounded-md ${className} z-10-`}
          onInteractOutside={() => closeFn()}
        >
          <Dialog.Title className="text-center text-2xl mb-8 p-1 font-semibold uppercase">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { DialogBox };
