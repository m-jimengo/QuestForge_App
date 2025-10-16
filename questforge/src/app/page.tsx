
import Navbar from "./Components/Navbar/Navbar";
import BoardPage from "./Features/Board/page";
import LoginPage from "./Features/Login/page";
import UserProfilePage from "./Features/UserProfile/page";

export default function Home() {
  return (
    <>
    <Navbar/>
    <UserProfilePage/>
    </>
  );
}
