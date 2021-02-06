import React, { useState , useMemo , useEffect} from 'react';
import api from '../../Services/api'
import { Container, Button, Form, FormGroup, Input, Label ,Alert ,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CameraIcon from '../../assets/cameraIcon.png'
import "./event.css";
export default function Event ({ history }){
    const user_id = localStorage.getItem('userID');
    console.log(user_id);
    const [formKey,setFormKey] = useState(1);
    const [sport,setSport] = useState('Sport');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    // const [thumbnail,setThumbnail] = useState(null);
    const [date,setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [success , setSuccessValue] = useState(false);
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    console.log(title + " " + description + " " + price);
    
    useEffect( () => {
        if(!user_id){
            history.push('/login')
        }

    }
       
        ,[]);

    // const preview = useMemo(() => {
    //     return thumbnail ? URL.createObjectURL(thumbnail) : null;
    // }, [thumbnail])


    const resetIT = () => {
       setFormKey(formKey + 1) 
       setSuccessValue(false)
       setSport('Sport');
       setTitle('');
       setDescription('');
       setPrice('');
      /// setThumbnail(null);
       setDate('');
       setErrorMessage(false);
       setSuccessValue(false);
       setOpen(false);
    }
    const submitHandler = async (evt) => { 
        evt.preventDefault();
       // const user_id = localStorage.getItem('userID');
        const user = localStorage.getItem('userToken');
        const eventData = new FormData();
       
        //eventData.append("thumbnail", thumbnail)
        eventData.append("title", title)
        eventData.append("description", description)
        eventData.append("price", price)
        eventData.append("sport", sport)
        eventData.append("date", new Date(date))

//&&thumbnail !== null
        try {
            if (title !== "" &&
                description !== "" &&
                price !== "" &&
                sport !== "Sport" &&
                date !== "" 
            ) {
                if(parseFloat(price)){
                    console.log("Event has been sent")
                    await api.post("/event/createEvent", eventData, { headers: { user } })
                    console.log(eventData)
                    console.log("Event has been saved")
                    setSuccessValue(true);
                    setTimeout(() => {
                        resetIT()
                    }, 1000)

                }else{
                    setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 5000)
                //setSuccessValue("missing");
                console.log("Make sure price is number")

                }
               
            } else {
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 5000)
                //setSuccessValue("missing");
                console.log("Missing required data")
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
            setSuccessValue(false);
        }
    }
    
return (
    <>
    {/* <Button id="dashBoardButton" onClick={() => history.push('/')} >Dashboard</Button>
    <Button id="logOutButton" onClick={logOutHandler}>Log Out</Button>
    <br></br>
    <br></br> */}
    <h1>Create Event</h1>
    <Container key={formKey}>
        
        <form onSubmit={submitHandler}>
        {/* <FormGroup>
          <Label>Upload image </Label> <br/>
          <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                        <Input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                        <img src={CameraIcon} style={{maxwidth :  "50px" , height: "50px"  } } alt="upload icon image" />
          </Label>
          
         </FormGroup> */}
         {console.log("lollllllllll")}
         <FormGroup>
          <Label>Title </Label> <br/>
          <input id='title' value={title} type="text" placeholder="Sport Title" onChange={(event) => setTitle(event.target.value)}></input>
         </FormGroup>

        
         <FormGroup>
          <Label>Description </Label> <br/>
          <input id='description' value={description} type="text" placeholder="Description" onChange={(event) => setDescription(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Price </Label> <br/>
          <input id='price' value={price} type="text" placeholder="Price" onChange={(event) => setPrice(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Date </Label> <br/>
          <input id='date' value={date} type="date" placeholder="Date" onChange={(event) => setDate(event.target.value)}></input>
         </FormGroup>
         <FormGroup>
             
          {/* <Label>Sport </Label> <br/> */}
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            
                <Button id="caret" value={sport} disabled>{sport}</Button>
                <DropdownToggle caret />
                <DropdownMenu>
                    <DropdownItem onClick={() => setSport('running')}>running</DropdownItem>
                    <DropdownItem onClick={() => setSport('cycling')}>cycling</DropdownItem>
                    <DropdownItem onClick={() => setSport('swimming')}>swimming</DropdownItem>
                </DropdownMenu>
          </ButtonDropdown>
          {/* <input id='sport' value={sport} type="text" placeholder="Sport Title" onChange={(event) => setSport(event.target.value)}></input> */}
         </FormGroup>

         <Button type='submit'>Submit</Button>
    </form>
    { (errorMessage) ? <Alert className="event-validation" color="danger"> Make sure that the data is correct and not missing </Alert> : "" }
    { (success) ? <Alert color="success" className="event-validation"> The event is saved successfully </Alert> : "" }
    </Container>
    </>

        
    

)
   
   

}

