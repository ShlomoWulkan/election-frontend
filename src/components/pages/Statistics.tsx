import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { ColumnChart, } from "@opd/g2plot-react";

export default function Statistics() {
  const { user } = useAppSelector((state) => state.user);
  const { candidates } = useAppSelector((state) => state.candidates);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ isLoggedIn: !!user?._id, isAdmin: !!user?.isAdmin });
    if (user?._id && !user?.isAdmin) navigate("/votes");
    if (!user?._id) navigate("/login");
  }, []);

  const config = {
    
    xField: "name",
    yField: "votes",
    smooth: true,
    meta: {
      value: {
        max: 15,
      },
    },
  };
  return (
    <div style={{padding:"70px"}}>
      <h1>Statistics</h1>

      <ColumnChart
        {...config}
        height={400} 
        data={candidates?.map((c) => ({ name: c.name, votes: c.votes }))}
      />
    </div>
  );
}
