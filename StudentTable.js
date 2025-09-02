import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
export default function StudentTable(){
    const [students, setStudents] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();
    const DisplayDetails = (id) => {
       navigate("/student/view/"+id);
    }
    const Editdetails=(id)=>{
        navigate("/student/edit/"+id);
    }
    const RemoveDetails= (id) =>{
        if(window.confirm("Are you sure you want to delete this record?")){
            fetch("http://localhost:8000/students/"+id,{
            method:'DELETE',
            
            
        })
        .then((res) => {
            alert("Student data removed successfully");
            window.location.reload();
        })
        .catch((error) => console.log(error.message))
    }}

    useEffect(() => {
       fetch("http://localhost:8000/students")
           .then((res) => res.json())
           .then((data) => 
               setStudents(data))
           .catch((error) => 
               setError(error.message))
          
    }, [])
    return(
        <div className= "container">
            <h2>Student Records</h2>
            <div className="table-container">
                <Link to="/student/create" className="btn btn-add">Add new Student</Link>
                {error && <div className="errorMsg">{error}</div>}
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Sl_No.</th>
                            <th>NAME</th>
                            <th>PLACE</th>
                            <th>PHONE</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           students && students.map((item,index)=>(
                            <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.place}</td>
                            <td>{item.phone}</td>
                            <td className="actions-cell">
                                <button onClick={() =>DisplayDetails(item.id)} className="btn btn-info">View</button>
                                <button onClick={()=> Editdetails(item.id)}className="btn btn-primary">Edit</button>
                                <button onClick={() => RemoveDetails(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )


        
}