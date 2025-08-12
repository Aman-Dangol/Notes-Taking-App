import { useState } from "react";

/**
 * Custom hook to manage a boolean state for disclosure (open/closed) functionality.
 * @param defaultValue - Initial state value, defaults to false.
 * @returns An object containing the current state and functions to set it to true or false.
 */
const useDisclosure = (defaultValue: boolean = false) => {
  const [state, setState] = useState<boolean>(defaultValue);

  return {
    state,
    setTrue: () => setState(true),
    setFalse: () => setState(false),
  };
};

export { useDisclosure };
