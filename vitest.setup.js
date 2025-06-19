import '@testing-library/jest-dom';
import 'vitest/globals'; 

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

