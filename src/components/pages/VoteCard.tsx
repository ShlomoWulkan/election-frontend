import { ICandidate } from "../../types/candidate"
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCandidates } from "../../redux/slices/candidatesSlice";
import { fetchProfileUpdate } from "../../redux/slices/userSlice";
import { socket } from "../../main";

interface props {
    candidate: ICandidate
}


export default function VoteCard({candidate}: props) {
    const { user } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch()

const fetchVote = async () => {
    await fetch('http://localhost:2222/api/votes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')!
        },
        body: JSON.stringify({
            candidateId: candidate._id,
            userId: user?._id 
        })
    })
}

const handleConfirm = async () => {
    if (user?.hasVoted){
        alert("you have already voted")
        return
    }
    await fetchVote()
    await dispatch(fetchProfileUpdate(user?._id!))
    await dispatch(fetchCandidates())
    socket.emit('newVote'
        // , {candidateId: candidate._id, userId: user?._id}
    )
}
  return (
    <div
      className={`vote-card ${
        user?.votedFor === candidate._id ? "my-vote" : ""
      }`}
    >
      <h1>
        {candidate.name}
        <span className="badge">{candidate.votes}</span>
      </h1>

      <button onClick={handleConfirm}
    //    disabled={user?.hasVoted}
       >VOTE</button>
    </div>
  );
}
