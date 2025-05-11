import MentorInfo from "../../app/Components/MentorInfo";
import SetAvailableTime from "../../app/Components/Calendar"

export default function AIchat() {
    return (
      <div className="tracking-wider bg-gray-100 transition-colors container-gray-100 mx-auto">
       <MentorInfo /> 
       <SetAvailableTime />
      </div>
    );
  }