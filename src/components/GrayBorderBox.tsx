import { Box } from '@chakra-ui/react';
import React from 'react';

const GrayBorderBox = ({ children }: { children: JSX.Element }) => {
  return (
    <Box w="full" rounded="8" border="1px" borderColor="gray.300">
      {children}
    </Box>
  );
};

export default GrayBorderBox;
