import "./style.css";
import Notification from "../Notification";

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main>
      {children}
      <Notification />
    </main>
  );
}

export default Main;
