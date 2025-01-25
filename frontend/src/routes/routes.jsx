import { Routes, Route, Navigate } from "react-router-dom";
import Production from "../pages/Production";

const routeConfig = [{ path: "/bookings", element: <Production /> }];

function AppRoutes() {
  // const { currentStoreUser } = useContext(UserContext);

  // useEffect(() => {
  //   if (currentStoreUser) {
  //     navigate("/");
  //   }
  // }, [currentStoreUser]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/analytics" replace />} />
      {routeConfig.map(({ path, element }, index) => (
        <Route key={index} path={path} element={{ element }} />
      ))}
      {/* <Route path="/login" element={<SignInPage />} /> */}
    </Routes>
  );
}

export default AppRoutes;
