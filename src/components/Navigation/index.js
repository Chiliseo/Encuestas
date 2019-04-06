import React from 'react';
import NavigationAuth from '../../routes/NavigationAuth'
import NavigationNonAuth from '../../routes/NavigationNonAuth'

import { AuthUserContext } from '../Session';

const Navigation = () => (
    <div class="App">
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>
  );
  export default Navigation;
