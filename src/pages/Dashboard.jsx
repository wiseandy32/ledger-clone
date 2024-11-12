import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/use-auth";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setUser("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className="h-[135vh] mb-[10vh] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0  sm:h-[100dvh] md:h-[105dvh] relative"
      // style={{ border: "2px solid green" }}
    >
      <div
        className="mt-[5vh] md:mt-[12vh] md:pt-[6vh] px-5 absolute inset-0 h-[135vh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] md:h-full"
        // style={{ border: "2px solid yellow" }}
      >
        <div
          className="p-2 mb-3 max-w-[1200px] md:m-auto md:p-5 mt-20 md:mt-[5.5rem]"
          // style={{ backgroundColor: "#0B1120", border: "2px solid red" }}
        >
          <h1>Dashboard</h1>
          <h2>
            Display name:{" "}
            <span className="capitalize">{user?.displayName}</span>
          </h2>
        </div>
        <button
          onClick={async () => await logout()}
          className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-500 highlight-white/20 hover:bg-sky-400"
        >
          Sign out
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
