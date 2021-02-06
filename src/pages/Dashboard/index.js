import React , {useState , useEffect , useMemo }from 'react' ;
import DashboardEvent from  './DashboardEvent'
import api from '../../Services/api';
import { Button, ButtonGroup, Alert, DropdownItem, DropdownMenu, DropdownToggle , ButtonDropdown } from 'reactstrap';
import './dashboardgrid.css' ;
import socketio from 'socket.io-client';


 function Dashboard ({ history }){
    
    const [events,setEvent] = useState([]);
    const user = localStorage.getItem('userToken');
    const user_id = localStorage.getItem('userID');
    const [rSelected,setRSelected] = useState(null);
    const [f ,setF] = useState(null);
    const [messageHandler , setMessageHandler] = useState('');
    const [success , setSuccess] = useState(false);
    const [error , setError] = useState(false);
    const [eventsRequest, setEventsRequest] = useState([])
    const [dropdownOpen, setDropDownOpen] = useState(false);
    const toggle = () => setDropDownOpen(!dropdownOpen);
    
    const checkEvents = (query) => {
        setRSelected(query);
        setF(query);
        getEvents(query);
        
    }

    const registerationEventHandler = async (event) => {
        
        try{
           // console.log("subscribbeeeee " ,event);
            const url = `/regist/${event._id}`
            const response =  await api.post(url , {}, { headers: { user } })
            console.log(response.data);
            setMessageHandler(`Event ${event.title} was sent successfully`);
            setSuccess(true);
            setTimeout( () => {
                setSuccess(false);
                setMessageHandler(`Subscribed to ${event.title}`);
            } ,
                2000)
        }catch(error){
            console.log(`error occured is ${error}`)
            setMessageHandler('error occured during subscribtion');
            setError(true);
            setTimeout( () => {
                setError(false);
                setMessageHandler('');
            } ,
                2000)

        }
        
        
           
    }
    const approveRegisteration = async (registeration_id) => {
        const url = `/registeration/${registeration_id}/approve` ;
        console.log("ng7nnna " + url);
        const respond = await api.post(url ,{},{headers : {user}})
        if(respond){
            console.log("ng7nnna " + true);
            setSuccess(true);
            setMessageHandler('successfully approved the request');
            setTimeout( () => {
                setSuccess(false);
                setMessageHandler('');
                eventRequestRemoverHandler(registeration_id);
            } ,
                2000)
        }
        else{
            setError(true);
            setMessageHandler('Error Occured');
            setTimeout( () => {
                setError(false);
                setMessageHandler('');
                eventRequestRemoverHandler(registeration_id);
            } ,
                2000)
        }
        // eventRequestRemoverHandler(registeration_id);
    }
    const rejectRegisteration = async (registeration_id) => {
        const url = `/registeration/${registeration_id}/reject` ;
        console.log("ng7nnna " + url);
        const respond = await api.post(url ,{},{headers : {user}})
        if(respond){
            console.log("ng7nnna  " + false);
            setSuccess(true);
            setMessageHandler('successfully rejected the request');
            setTimeout( () => {
                setSuccess(false);
                setMessageHandler('');
                eventRequestRemoverHandler(registeration_id);
            } ,
                2000)
        }else{
            setError(true);
            setMessageHandler('Error Occured');
            setTimeout( () => {
                setError(false);
                setMessageHandler('');
                eventRequestRemoverHandler(registeration_id);
            } ,
                2000)
        }
        
    }
    const eventRequestRemoverHandler = (registeration_id) =>{
        const new_Events_Requests = eventsRequest.filter((eventsRequest) => eventsRequest._id !== registeration_id);
        setEventsRequest(new_Events_Requests);
    }
    const getEvents = async (filter) => {
        if(filter == "myEvents"){
            console.log("allllllllaaaaaaaa " +filter);
            const url = '/dashboardUserId' ;
            const response =  await api.get(url , { headers : {user}}) ;
            // console.log(url + "alllllllllll " +response.data) ;
           // setEvent(response.data)
            response.data && setEvent(response.data.events) ;
        }else{
            
            const url = filter ? `/dashboard/${filter}` : '/dashboard' ;
            console.log("allllllllaaaaaaaa filter =" +filter + " url = " + user);
            const response =  await api.get(url , { headers : {user}}) ;
            //console.log(url + "alllllllllll " +response.data) ;
           // setEvent(response.data)
            response.data && setEvent(response.data.events) ;
        }
         
        
    }


    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    useEffect(() => {
        socket.on('registration_request', data => setEventsRequest([...eventsRequest, data]));
    }, [eventsRequest, socket])


    useEffect( 
    getEvents
    ,[]);
    
    return (
        <>
            <ul className="notifications">
                {eventsRequest.map(request => {
                    console.log(request)
                    return (
                        <li key={request._id}>
                            <div>
                                <strong>{request.user.email} </strong> is requesting to register to your Event <strong>{request.event.title}</strong>
                            </div>
                            <ButtonGroup>

                                <Button color="secondary" onClick={() => { approveRegisteration(request._id) }}>Accept</Button>
                                <Button color="danger" onClick={() => { rejectRegisteration(request._id)}}>Cancel</Button>
                            </ButtonGroup>
                        </li>
                    )
                })}
                {success? <Alert>{messageHandler}</Alert> : ""}
                {error? <Alert>{messageHandler}</Alert> : ""}
            </ul>
            {/* <Button style={{backgroundColor:'#FF3D40' , margin:'10px'}} onClick={logOutHandler}>Log Out</Button>
            <Button style={{backgroundColor:'tomato' , margin:'10px'}} onClick={() => history.push("/event")}>Create Event</Button> */}
            <h1 className="eventgrid">Sport's Events</h1>
            <div className="fitbuttons">
            <ButtonDropdown  isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="eventgrid_button"  color="primary" caret>
                       Filter
                </DropdownToggle>
                <DropdownMenu>
                   
                    <DropdownItem onClick={() => checkEvents(null)} active={rSelected === null}>All Sport</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => checkEvents("myEvents")} active={rSelected === "myEvents"}>My Events</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => checkEvents("running")} active={rSelected === "running"}>Running</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => checkEvents("swimming")} active={rSelected === "swimming"}>Swimming</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => checkEvents("cycling")} active={rSelected === "cycling"}>Cycling</DropdownItem>
                </DropdownMenu>
           </ButtonDropdown>
                {/* <ButtonGroup className="eventgrid_button">
                     <Button color="primary" onClick={() => checkEvents(null)} active={rSelected === null}>All Sport</Button>
                     <Button color="primary" onClick={() => checkEvents("myEvents")} active={rSelected === "myEvents"}>My Events</Button>
                     <Button color="primary" onClick={() => checkEvents("running")} active={rSelected === "running"}>Running</Button>
                     <Button color="primary" onClick={() => checkEvents("swimming")} active={rSelected === "swimming"}>Swimming</Button>
                     <Button color="primary" onClick={() => checkEvents("cycling")} active={rSelected === "cycling"}>Cycling</Button>
                </ButtonGroup>
                 */}
            </div>
            
            <ul  className="eventgrid">
               {events.map((event) => ( 
                   <li key={event._id}>
                     <DashboardEvent event={event} filterHandler={checkEvents} filterd={rSelected} > </DashboardEvent>
                     <Button style={{marginTop: "auto"}}id="subButton" color="primary" onClick={() => registerationEventHandler(event)}>Subscribe</Button>
                   </li>
                 ))
                } 
            </ul>
            {
                error ? (
                    <Alert className="event-validation" color="danger"> {messageHandler} </Alert>
                ) : ""
            }
            {
                success ? (
                    <Alert className="event-validation" color="success"> {messageHandler}</Alert>
                ) : ""
            }
            
        </>
       
       
       
    )

}

 export default Dashboard ;