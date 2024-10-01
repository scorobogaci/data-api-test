import '@aws-amplify/ui-react/styles.css'
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {Authenticator} from "@aws-amplify/ui-react";
import {fetchAuthSession, fetchUserAttributes, getCurrentUser, updateUserAttributes} from "@aws-amplify/auth";
import {StorageBrowser} from "@aws-amplify/ui-react-storage";

const client = generateClient<Schema>();

function App() {
  const [, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

    const defaultPrefixes = [
        (identityId: string) => `files/${identityId}/`,
    ];

    async function createAccount() {
        const session = await fetchAuthSession();
        console.log("Cognito IdentityId : ", session.identityId);
        const user = await getCurrentUser();
        console.log("current user : ", user);
        const userAttributes = await fetchUserAttributes();
        console.log("userAttributes : ", userAttributes);
        const isFirstTimeLogin = !userAttributes['custom:identity'] && userAttributes['custom:firstLogin'] === 'true';
        if (1 === 1 || isFirstTimeLogin) {
            console.log("Creating account on first sign in...")
            await updateUserAttributes({
                userAttributes: {
                    'custom:identity': session.identityId,
                    'custom:firstLogin': 'false'
                },
            });
        }
        client.models.Account.create({identity: session.identityId!, email: userAttributes.email});
    }

  return (

      <Authenticator>
          {({signOut, user}) => (
              <>
                  <h1>Hi {user?.signInDetails?.loginId}</h1>
                  <StorageBrowser defaultPrefixes={defaultPrefixes}></StorageBrowser>
                  <button onClick={signOut}>Sign out</button>
                  <button onClick={createAccount}>create account</button>
                  <button onClick={createTodo}>create to do</button>
              </>
          )}
      </Authenticator>
  );
}

export default App;
