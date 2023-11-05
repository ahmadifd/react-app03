import "bootstrap/dist/css/bootstrap.min.css";
import "./home0/index.css";
import { useEffect } from "react";




const Child1 = () => {
  useEffect(() => {}, []);

  return (
    <>
    
    </>
  );
};

const Home0 = () => {
  return (
    <>
      <Child1 />
    </>
  );
};

export default Home0;
