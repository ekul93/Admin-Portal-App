import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import  SplashScreen  from "@/src/components/SplashScreen"

export default function Index() {
  const { isLoggedIn, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(loading) return;

    if(isLoggedIn){
      router.replace('/(home)');
    } else {
      router.replace('/login');
    }
  }, [isLoggedIn, loading]);

  return <SplashScreen />;
}
