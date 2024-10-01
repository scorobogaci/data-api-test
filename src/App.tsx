import '@aws-amplify/ui-react/styles.css'
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import {useCallback, useEffect} from "react";
import type {Schema} from "../amplify/data/resource";
import {generateClient} from "aws-amplify/data";
import {Authenticator, ThemeProvider} from "@aws-amplify/ui-react";
import {fetchAuthSession, fetchUserAttributes, updateUserAttributes} from "@aws-amplify/auth";
import {StorageBrowser} from "@aws-amplify/ui-react-storage";
import theme from "./theme.tsx";
import {Routes,Route} from "react-router-dom";
import Profile from "./pages/profile";
import Layout from "./components/Layout";
import UsersTable from "./pages/tables/UsersTablePage.tsx";
import Tables from "./pages/tables";
import EditForm from "./pages/forms/EditForm";
import Forms from "./pages/forms";
import Dashboard from "./pages/dashboard";

const client = generateClient<Schema>();

function App() {

    const accountValidation = useCallback(async () => {
        const session = await fetchAuthSession();
        const userAttributes = await fetchUserAttributes();
        const isFirstTimeLogin = !userAttributes['custom:identity'] && userAttributes['custom:firstLogin'] === 'true';
        if (isFirstTimeLogin) {
            await updateUserAttributes({
                userAttributes: {
                    'custom:identity': session.identityId,
                    'custom:firstLogin': 'false'
                },
            });
            client.models.Account.create({identity: session.identityId!, email: userAttributes.email});
        } else {
            const {data} = await client.models.Account.get({identity: session.identityId!});
            console.log("Account details loaded : ", data);
        }
    }, [])

    useEffect(() => {
        console.log("use effect inside App.tsx invoked");
        accountValidation();
    }, [accountValidation]);

    const defaultPrefixes = [
        (identityId: string) => `files/${identityId}/`,
    ];

    return (
        <Authenticator>
            {({signOut, user}) => (
                <ThemeProvider theme={theme}>
                    <div>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="forms" element={<Forms />}/>
                                <Route path="edit-form" element={<EditForm />} />
                                <Route path="tables" element={<Tables />} />
                                <Route path="users-table" element={<UsersTable />} />
                                <Route path="profile" element={<Profile />} />
                            </Route>
                        </Routes>
                        <h1>Hi {user?.signInDetails?.loginId}</h1>
                        <StorageBrowser defaultPrefixes={defaultPrefixes}></StorageBrowser>
                        <button onClick={signOut}>Sign out</button>
                    </div>
                </ThemeProvider>
            )}
        </Authenticator>
    );
}

export default App;
