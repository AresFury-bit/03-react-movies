// 1. Імпортуємо функцію useState
import { useState } from "react";
import Cafeinfo from "../CafeInfo/CafeInfo"
import css from "./App.module.css"
import type { VoteType, Votes } from "../../types/votes"
import VoteOptions from "../VoteOptions/VoteOptions"
import VoteStats from "../VoteStats/VoteStats"
import Notification from "../Notification/Notification"

export default function App() {
	
  
  let [votes, setVotes] = useState <Votes> ({ good: 0, neutral: 0, bad: 0 });
  const totalVotes = votes.bad + votes.good + votes.neutral;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0


 const handleVote = (type: VoteType) => {
  setVotes(prev => ({
    ...prev,
    [type]: prev[type] + 1,
  }));
};

  const resetVotes = () => {
    setVotes({good: 0, neutral: 0, bad: 0 })
  }

  console.log(votes);

  return <div className={css.app}>
    <Cafeinfo />
    <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes!=0} />
    {totalVotes> 0 ? (<VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />):
    (<Notification />)}
  </div>;
}
