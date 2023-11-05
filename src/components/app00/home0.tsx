import "bootstrap/dist/css/bootstrap.min.css";
import "./home0/index.css";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { Person } from "@mui/icons-material";

const Child1 = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<Person />}>
        سلام دنیا
      </Button>
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
