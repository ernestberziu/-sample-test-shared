/*
 * Copyright (c) 2019-present Sonatype, Inc.
 * This program and the accompanying materials are made available under
 * the terms of the Eclipse Public License 2.0 which accompanies this
 * distribution and is available at https://www.eclipse.org/legal/epl-2.0/.
 */
import React from 'react';

import './Close.scss';

const Close = () =>
  <svg viewBox="0 0 16 16" className="nx-icon nx-icon--close">
    <path fill="currentColor"
          transform="rotate(45, 8, 8)"
          d="M8.3137085,0.313708499 C8.86599325,0.313708499 9.3137085,0.761423749 9.3137085,1.3137085
            L9.3137085,7.3127085 L15.3137085,7.3137085 C15.8659932,7.3137085 16.3137085,7.76142375 16.3137085,8.3137085
            C16.3137085,8.86599325 15.8659932,9.3137085 15.3137085,9.3137085 L9.3137085,9.3127085 L9.3137085,15.3137085
            C9.3137085,15.8659932 8.86599325,16.3137085 8.3137085,16.3137085 C7.76142375,16.3137085 7.3137085,15.8659932
            7.3137085,15.3137085 L7.3137085,9.3127085 L1.3137085,9.3137085 C0.761423749,9.3137085 0.313708499,8.86599325
            0.313708499,8.3137085 C0.313708499,7.76142375 0.761423749,7.3137085 1.3137085,7.3137085 L7.3137085,7.3127085
            L7.3137085,1.3137085 C7.3137085,0.761423749 7.76142375,0.313708499 8.3137085,0.313708499 Z"/>
  </svg>;

export default Close;
