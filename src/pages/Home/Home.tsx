import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Container } from "@mui/material";
import MyCalendar from "../../components/Calendar/MyCalendar";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase";
import { DataPersona } from "../../components/shared/interface";
import { textUsername } from "../../components/shared/function";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";

export function Home(): JSX.Element {
  const { user } = useAuth();
  const [usuario, setUsuario] = React.useState<DataPersona>()
  const sal = async() => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userData = querySnapshot.docs.map((doc) => doc.data() as DataPersona).find(u => u.email === user.email );
    setUsuario(userData)
  }
  React.useEffect(() => {
    sal()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 
  return (
    <Container component="main" style={{padding: 10}}>
      <WelcomeBanner user={textUsername(usuario?.name, usuario?.lastname)} />
      <MyCalendar />
    </Container>
  );
}
