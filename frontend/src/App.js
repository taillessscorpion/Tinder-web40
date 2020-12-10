import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import {Home} from './components/Home';
import {Auth} from './components/Auth/index';
import {Declare} from './components/Auth/Declare/index';
import AuthCtx from './context/auth';
const App = () => {
  const [authUser, setAuthUser] = useState(null);
  return (
    <AuthCtx.Provider value={{authUser, setAuthUser}}>
      <Route path="/home" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/declare" component={Declare} />
    </AuthCtx.Provider>
  );
}

export default App;
