import {createRoot} from 'react-dom/client';
import {MainView} from './components/MainView/main-view';


//CSS
import "./index.scss";

//Main Component
const MyFlixApplication = () => {
    return <MainView />
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);