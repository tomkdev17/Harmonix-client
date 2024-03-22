import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import "./index.scss";

const HarmonixApplication = () => {
        return(
            <Container fluid="xs" >
                    <MainView />
            </Container>
        );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(< HarmonixApplication />);

