import {useState, useContext, useEffect} from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelector from "./RatingSelector"
import FeedbackContext from "../context/FeedbackContext"
function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)
    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])
    const handleTextChange = event => {
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length < 10) {
            setMessage('Message must be at least 10 characters.')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(event.target.value)
    }
    const handleSubmit = event => {
        event.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
            setBtnDisabled(true)
            setRating(10)
            setText('')
        }
    }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelector select={setRating} selected={rating}/>
            <div className="input-group">
                <input
                    onChange={handleTextChange}
                    type="text"
                    name="review"
                    id="review"
                    placeholder="Write a review..."
                    value={text}
                />
                <Button
                    type="submit"
                    version='secondary'
                    isDisabled={btnDisabled}
                >
                    Send
                </Button>
            </div>
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}
export default FeedbackForm