import { Redirect } from "expo-router";
import { useAuth } from "../src/context/AuthContext";
import  SplashScreen  from "@/src/components/SplashScreen"

export default function Index() {
  const { isLoggedIn, loading} = useAuth();

  if(loading) return <SplashScreen />
  if(isLoggedIn) return <Redirect href="/" />;
  return <Redirect href="/login" />;
}
