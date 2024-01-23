import { createRoot } from 'react-dom/client';

import "./index.scss";

const harmonixApplication = () => {
    return(
        <div className = "harmonix">
            <div>Example Text</div>
        </div>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<harmonixApplication/>);

