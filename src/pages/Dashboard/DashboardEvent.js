import React , { useState , useEffect } from 'react' ;
import { Container , Button , Alert} from 'reactstrap';
import moment from 'moment';
import api from '../../Services/api';


 function DashboardEvent (props){
    const user_id = localStorage.getItem('userID');
    const user = localStorage.getItem('userToken');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


  
    const deleteEventHandler = async (event_id) => {
        try{
        const url = `/events/${event_id}`
        await api.delete(url , { headers : {user}}) ;
        console.log(url) ;
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
            props.filterHandler(props.filterd)
            console.log("mmmmmmmmmmmmmmmmmm00")

        },2000)

        }catch(error){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }
        
           
    }
    return (
        <Container>
            
            {(props.event.user == user_id )? <button id="deleteEventButton" onClick={() => deleteEventHandler(props.event._id) }>
                Delete</button> : ""   } 
                
                {/* {console.log(props.event.thumbnail_url + "," + props.event.title) } */}
            {/* <header style={{ backgroundImage:  `url(${props.event.thumbnail_url})` }} >
                Helllo
            </header> */}
            {/* <img src= {props.event.thumbnail_url} alt="GeeksforGeeks logo "/>  */}
           
            <strong>{props.event.title}</strong>
            <span>Event Date: {moment(props.event.date).format('l')}</span>
            <span>Event Price: {parseFloat(props.event.price).toFixed(2)}</span>
            <span>Event Description: {props.event.description} </span>
            {error ? (
                <Alert className="event-validation" color="danger"> Error when deleting event! </Alert>
            ) : ""}
            {success ? (
                <Alert className="event-validation" color="success"> The event was deleted successfully!</Alert>
            ) : ""}
        </Container>
         

        
       
        
       
       
    )

}

 export default DashboardEvent ;