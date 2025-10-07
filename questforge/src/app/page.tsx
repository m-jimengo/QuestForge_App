import "./globals.css";
import "./globalBackground.css";
import BoardPage from "./Features/Board/page";
import Navbar from "./Components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="global-page">
      <div className="global-mapBackground"></div>
      <main className="global-main">
        <Navbar />
       <BoardPage />
      </main>
    </div>
  );
}
