import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "@@store/index";
import { StoreProvider } from "@@store/withStore";
import { fetchUsers } from "@@store/users/usersSlice";
const RemoteApp = React.lazy(() => import("styled_components/App"));


const App: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <>
            <Suspense fallback={"loading..."}>
                <RemoteApp />
            </Suspense>
        </>
    );
}

ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>, document.getElementById("app"));
