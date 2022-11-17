import React, { useState } from "react";
import "../../ToggleSwitch.css";

function ToggleSwitch(props) {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);
  return (
    
    <div className = "switch-background">
    
    <label className="toggle-switch">
      
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
    <label  className = "switch-label">{props.type}</label>
    </div>
  );
}
export default ToggleSwitch;