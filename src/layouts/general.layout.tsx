import { Outlet, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../components/language-switcher";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const GeneralLayout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="my-0 mx-auto xl:w-4/6 w-screen h-screen items-center gap-2 flex justify-center p-5 relative">
      <Outlet />
      <LanguageSwitcher />
    </main>
  );
};

export default GeneralLayout;
