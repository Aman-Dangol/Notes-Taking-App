import { useState } from "react";

const useDisclosure = (defaultValue: boolean = false) => {
  const [state, setState] = useState<boolean>(defaultValue);

  return {
    state,
    setTrue: () => setState(true),
    setFalse: () => setState(false),
  };
};

export { useDisclosure };
