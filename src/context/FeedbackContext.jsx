import {createContext, useState, useEffect} from "react"
const FeedbackContext = createContext()
export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    useEffect(() => {
        fetchFeedback()
    }, [])
    // fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }
    // add feedback
    const addFeedback = async newFeedback => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json()
        setFeedback([data, ...feedback])
    }
    //delete feedback
    const deleteFeedback = async id => {
        if(window.confirm('Are you sure?')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter(item => 
                item.id !== id
            ))
        }
    }
    // set item to be updated
    const editFeedback = item => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }
    // update item
    const updateFeedback = async (id, updated) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updated)
        })
        const data = await response.json()
        setFeedback(feedback.map(
            item => (
                item.id === id ?
                data :
                item)
            )
        )
        setFeedbackEdit({
            item: {},
            edit: false
        })
    }
    return <FeedbackContext.Provider value = {{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}
export default FeedbackContext