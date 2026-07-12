import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <Container maxWidth="xl" >
        <Outlet />
      </Container>

      <Footer />
    </>
  );
};

export default MainLayout;
