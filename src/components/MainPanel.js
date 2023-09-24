import React from "react";

import Response_v4 from "./Response_v4";
import Response_v5 from "./Response_v5";

import "./css/style.css"


function MainPanel() {
    
    return (
        <React.Fragment>
          <div className="container">
            <Response_v5 />
          </div>
        </React.Fragment>
    );
}

export default MainPanel;
