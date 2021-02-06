import React , {useState , useEffect , useMemo }from 'react' ;
import api from '../../Services/api';
import {ButtonGroup , Button , Alert} from 'reactstrap' ;
import moment from 'moment';
import './style.css'

 function RegisterationsView ({ history }){ 
     const user = localStorage.getItem('userToken');
     const userID = localStorage.getItem('userID');
     const [regEvents , setRegEvents] = useState([]);
     const [errorMessage , setErrorMessage ] = useState(false) ;
     const [messageHandler , setMessageHandler ] = useState("") ;

     const getMyRegisteration = async () => {
        const url = `/myregisteration/${userID}`
        const registerations_events = await api.get(url,{headers : {user}});
        console.log(registerations_events);
        if(registerations_events ){
            setRegEvents(registerations_events.data);
            console.log(registerations_events.data);
        } else{
            setErrorMessage(true);
            setMessageHandler("Error Occured");
            setTimeout(
               ()=>
               {
                  setErrorMessage(false);
                  setMessageHandler("");
               } ,2000)
        }
       

     }
 
    const isApproved = (flag) => {
       return flag ? "Approved" : "Rejected" ;
    }

    const acceptEventHandler = async (registeration_id) => {
      const url = `/registeration/${registeration_id}/approve` ;
      console.log("ng7nnna " + url);
      const respond = await api.post(url ,{},{headers : {user}})
      if(respond){
          console.log("ng7nnna " + true);
          getMyRegisteration();
         
      }
      
      // eventRequestRemoverHandler(registeration_id);
  }
  const rejectEventHandler = async (registeration_id) => {
      const url = `/registeration/${registeration_id}/reject` ;
      console.log("ng7nnna " + url);
      const respond = await api.post(url ,{},{headers : {user}})
      if(respond){
          console.log("ng7nnna  " + false);
          getMyRegisteration();
        
      }else{
         setErrorMessage(true);
         setMessageHandler("Error Occured");
         setTimeout(
            ()=>
            {
               setErrorMessage(false);
               setMessageHandler("");
            } ,2000)
      }
      
  }

     useEffect( getMyRegisteration, []);
     return (
        <div>

        <ul className="events">
            {regEvents.map(event => (
                <li key={event._id}>
                    <div><strong>{event.eventTitle}</strong></div>
                    <div className="events-details">
                        <span>Event Date: {moment(event.eventDate).format('l')}</span>
                        <br></br>
                        <span>Event Price: £{parseFloat(event.eventPrice).toFixed(2)}</span>
                        <br></br>
                        <span>User Email: {event.userEmail}</span>
                        <br></br>
                        <span>Status:
                            <span className={event.approved !== undefined ? isApproved(event.approved) : "Pending"}>{event.approved !== undefined ? isApproved(event.approved) : "Pending"}</span>
                        </span>
                    </div>
                    <ButtonGroup>
                        <Button disabled={event.approved === true || event.approved === false ? true : false} color="secondary" onClick={() => acceptEventHandler(event._id)}>Accept</Button>
                        <Button disabled={event.approved === true || event.approved === false ? true : false} color="danger" onClick={() => rejectEventHandler(event._id)}>Reject</Button>
                    </ButtonGroup>
                   { errorMessage ?  <Alert>{messageHandler}</Alert> : "" }
                </li>
            ))}
        </ul>


        </div>
     )
    

 }

 export default RegisterationsView ; 