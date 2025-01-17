/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { useMemo } from "react";
import { Text, TextProps } from "react-native";
import Animated, {
  ComplexAnimationBuilder,
  Layout
} from "react-native-reanimated";
import { useThemeColors } from "@notesnook/theme";
import { SIZE } from "../../../utils/size";
interface ParagraphProps extends TextProps {
  color?: string;
  size?: number;
  layout?: ComplexAnimationBuilder;
  animated?: boolean;
}
const AnimatedText = Animated.createAnimatedComponent(Text);
const Paragraph = ({
  color,
  size = SIZE.sm,
  style,
  animated,
  ...restProps
}: ParagraphProps) => {
  const { colors } = useThemeColors();
  const Component = useMemo(() => (animated ? AnimatedText : Text), [animated]);

  return (
    <Component
      layout={restProps.layout || Layout}
      allowFontScaling
      maxFontSizeMultiplier={1}
      {...restProps}
      style={[
        {
          fontSize: size || SIZE.sm,
          color: color || colors.primary.paragraph,
          fontWeight: "400",
          fontFamily: "OpenSans-Regular"
        },
        style
      ]}
    />
  );
};

export default Paragraph;
