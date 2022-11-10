import { useEffect, useState } from "react";
import { Dimensions, ScaledSize, Keyboard, KeyboardEvent } from "react-native";

interface DimensionType {
  window: ScaledSize;
  screen: ScaledSize;
}

interface UseDimension extends DimensionType {
  keyboardHeight: number;
}

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const useDimension = (): UseDimension => {
  const [dimensions, setDimensions] = useState<DimensionType>({
    window,
    screen,
  });

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );

    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );

    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
      subscription?.remove();
    };
  });

  return { ...dimensions, keyboardHeight };
};
