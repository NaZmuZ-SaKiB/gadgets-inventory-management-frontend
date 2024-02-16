import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import { USER_ROLE } from "./constants/user.constant";

function App() {
  return (
    <ProtectedRoute role={Object.values(USER_ROLE)}>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
