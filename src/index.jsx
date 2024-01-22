//imports
import {createRoot} from 'react-dom/client';
import {MainView} from './components/main-view/main-view';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

//CSS
import "./index.scss";

//Main Component
const MyFlixApplication = () => {
    return (
        <Container style={{border: "1px solid red"}}>
          <MainView />
        </Container>
      );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);