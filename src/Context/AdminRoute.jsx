import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MarvicContext } from "./Context";

const AdminRoute = ( {children} ) => {
    const { isUser ,role } = useContext(MarvicContext);

    if (!isUser || role !== 'ADMINISTRATOR') {
        return <Navigate to="/home"/>;
    }

    return children;
}

export default AdminRoute