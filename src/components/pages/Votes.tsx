import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import VoteCard from "./VoteCard";
import { fetchCandidates } from "../../redux/slices/candidatesSlice";

export default function votes() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.user);
  const { candidates } = useAppSelector((state: RootState) => state.candidates);

  const navigate = useNavigate();


  useEffect(() => {
    if (!user?._id) {
      navigate("/votes") 
  
    }   else {
      dispatch(fetchCandidates());
    } 
  }, [])

  return (
    <div className="vote-list">
      {candidates!.map((candidate) => (
        <VoteCard key={candidate._id} candidate={candidate} />
      ))}
    </div>
  )
}
