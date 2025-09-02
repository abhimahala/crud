import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateStudent(){
    const [id,setId]= useState("");
    const [name,setName]= useState("");
    const [place,setPlace]= useState("");
    const [phone,setPhone]= useState("");
    const[validation,setValidation]= useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        const studentData={id,name,place,phone};
        console.log(studentData);
        console.log({id, name, place, phone});
        fetch("http://localhost:8000/students",{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(studentData)

            
        })
        .then((res) => {
            alert("Student data saved successfully");
            navigate("/");
        })
        .catch((error) => console.log(error.message))
    }    
    return(
        <div className="container">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" name="id" required value={id} onChange={e => setId(e.target.value)}
                    onMouseDown={() => setValidation(true)} />
                    {id.length===0 && validation && <span className="error">Please enter ID</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">NAME:</label>
                    <input type="text" id="name" name="name" required value={name} onChange={e => setName(e.target.value)}
                    onMouseDown={() => setValidation(true)} />
                   
                    {name.length===0 && validation && <span className="error">Please enter name</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="place">PLACE:</label>
                    <input type="text" id="place" name="place" required value={place} onChange={e => setPlace(e.target.value)}
                    onMouseDown={() => setValidation(true)} />
                    {place.length===0 && validation && <span className="error">Please enter place</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">PHONE:</label>
                    <input type="text" id="phone" name="phone" required value={phone} onChange={e => setPhone(e.target.value)}
                    onMouseDown={() => setValidation(true)} />
                    {phone.length===0 && validation && <span className="error">Please enter phone number</span>}
                </div>
                <div>
                    <button className="btn btn-save">Save</button>
                    <Link to="/" className="btn btn-back">Back</Link>
                </div>
            </form>
        </div>
    )


        
}