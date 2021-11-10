import { FunctionComponent, useEffect, useState } from 'react';
import { EmailAuthProvider, getAuth } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
  signInSuccessUrl: '/'
};

const FirebaseAuth: FunctionComponent = () => {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    setRenderAuth(true);
  }, []);

  return (
    <div className="mt-16">
      {renderAuth && (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={getAuth()}
        />
      )}
    </div>
  );
};

export default FirebaseAuth;
