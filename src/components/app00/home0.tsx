import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";

const Child1 = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="p-2">
        <div className="m-5">
          <Button as="a" variant="primary">
            Button as link1
          </Button>
          <Button as="a" variant="success">
            Button as link1
          </Button>
        </div>
        <div className="m-5">
          <button className="btn btn-primary"> Button as link</button>
          <button className="btn btn-success"> Button as link</button>
        </div>
      </div>
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
