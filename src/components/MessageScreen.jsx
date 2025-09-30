import { useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";

export default function MessageScreen({ sendSolution }) {
  const { appSettings, I18n } = useContext(GlobalContext);

  return (
    <div className="MessageScreen">
      <p>{appSettings.message}</p>
      <div>
        <button style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }} onClick={() => sendSolution()}>
          {I18n.getTrans("i.continue")}
        </button>
      </div>
    </div>
  );
}
