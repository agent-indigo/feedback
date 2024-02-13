import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import { FeedbackProvider } from "./context/FeedbackContext"
function App() {
    return (
        <FeedbackProvider>
            <Header/>
            <FeedbackForm/>
            <FeedbackStats/>
            <div className="container">
                <FeedbackList/>
            </div>
        </FeedbackProvider>
    )
}
export default App;