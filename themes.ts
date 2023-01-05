import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const flyout = definePartsStyle({
  dialogContainer: {
    width: `50vw`,
    right: 0,
    left: `initial`,
  },
});

export const modalTheme = defineMultiStyleConfig({
  variants: { flyout },
});

const thick = defineStyle({
  borderStyle: 'dashed',
  borderColor: 'black',
});

export const dividerTheme = defineStyleConfig({
  variants: { thick },
});
