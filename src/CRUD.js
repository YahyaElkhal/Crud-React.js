import React, { useRef, useState } from "react";
import './CRUD.css'

function CRUD() {
    const [lists, setList] = useState([
        {
            id: 1,
            name:"HP",
            price:"63373"
        },
        {
            id: 2,
            name:"DELL",
            price:"6373"
        }
    ]);
    const [updateState, setUpdateState] = useState(-1);

    function handleEdit(id) {
        setUpdateState(id);
    }

    function handleDelete(id) {
        setList(prevList => prevList.filter(item => item.id !== id));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;
        const updatedList = lists.map(item => {
            if (item.id === updateState) {
                return { ...item, name, price };
            }
            return item;
        });
        setList(updatedList);
        setUpdateState(-1);
    }

    return(
       <div className="crud">
            <div>
                <AddList setList={setList} />
                <form onSubmit={handleSubmit}>
                    <table>
                        {lists.map((current) => (
                            updateState === current.id ? 
                            <EditList key={current.id} current={current} setList={setList} setUpdateState={setUpdateState}/> :
                            <tr key={current.id}>
                                <td>{current.name}</td>
                                <td>{current.price}</td>
                                <td>
                                    <button className="edit" onClick={() => handleEdit(current.id)}>Edit</button>
                                    <button className="delete" onClick={() => handleDelete(current.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </form>
            </div>
       </div> 
    )
}

function EditList({ current, setList, setUpdateState }) {
    function handleInput(event) {
        const { name, value } = event.target;
        setList(prevList => prevList.map(item => {
            if (item.id === current.id) {
                return { ...item, [name]: value };
            }
            return item;
        }));
    }

    return (
        <tr>
            <td><input type="text" onChange={handleInput} name='name' value={current.name}/></td>
            <td><input type="text" onChange={handleInput} name='price' value={current.price}/></td>
            <td><button type="submit">Update</button></td>
        </tr>
    );
}

function AddList({ setList }) {
    const nameRef = useRef()
    const priceRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const newlist = {
            id: Math.random(),
            name,
            price
        }
        setList(prevList => prevList.concat(newlist));
        nameRef.current.value = "";
        priceRef.current.value = "";
    }

    return(
        <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" ref={nameRef} />
            <input type="text" name="price" placeholder="Enter Price" ref={priceRef} />
            <button type="submit">Add</button>
        </form>
    );
}

export default CRUD;
