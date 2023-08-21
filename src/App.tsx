import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Home } from "./pages/Home/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Header from "./components/Header/Header";

function App(): JSX.Element {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user)=> {
      setUser(user)
    });
    return () => {
      unsubscribe();
    };
  },[])
  return (
    <div className="bg-slate-300 text-black h-screen flex text-white">
      <AuthProvider>
      <Header user={user} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
