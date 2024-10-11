import "./style.css";

interface ContainerProps {
  children: React.ReactNode;
}

function Container2({ children }: ContainerProps) {
  return <div className="container2">{children}</div>;
}

export default Container2;
