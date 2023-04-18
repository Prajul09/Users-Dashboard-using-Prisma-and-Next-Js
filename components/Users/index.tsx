import React,{useState,useEffect} from 'react';

const index = () => {
    const [filterData, setFilterData] = useState({first_name:"",last_name:"",email:"",gender:""});
    const [allUsers, setAllUsers] = useState([]);
    
    useEffect(() => {
        showUsers()
    }, []);

    const changeHandler = (e:any) =>{
        const {name,value,radio} = e.target;
        setFilterData({...filterData,[name]:value});
        console.log(filterData);
    };

    const clickHandler = (e:any) =>{
        setFilterData({
        first_name:"",
        last_name:"",
        email:"",
        gender:""
        });
    }

    const submitHandler = (e:any) =>{
        e.preventDefault();
        showUsers();
    };

    const showUsers = async () =>{
        try {
            fetch(`/api/users?first_name=${filterData.first_name}&last_name=${filterData.last_name}&email=${filterData.email}&gender=${filterData.gender}`, {
                method: 'GET',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
            })
            .then(res => res.json())
            .then(users => setAllUsers(users.data))
        } catch (error) {
            console.log(error)
        }
    }
    //console.log("allUsers:============", allUsers)
    const renderUsers = ()=> {
        return (
            allUsers.length >0 && allUsers.map(user => {
                return (
                    <div className='border border-black h-[150px] w-[250px] bg-slate-100 mx-5 mt-3 px-3 py-5 '>
                        <p><span className='font-semibold text-md'>First Name :</span>{user.first_name}</p>
                        <p><span className='font-semibold text-md'>Last Name :</span> {user.last_name}</p>
                        <p><span className='font-semibold text-md'>Email :</span> {user.email}</p>
                        <p><span className='font-semibold text-md'>Gender :</span> {user.gender}</p>
                    </div>
                )
            })
        )
    }     
  return (
    <>
        <div className='justify-center align-center items-center px-32 py-20 h-screen  bg-zinc-200'>
            <div className='rounded-md bg-white h-full flex flex-row align-center'>
                <div className='bg-blue-200 h-full w-[300px]'>
                <p className='text-2xl font-semibold my-4 ml-10 pl-16'>Filters</p>
                <form onSubmit={submitHandler} method='GET'>
                    <div className='mr-5 pt-5 ml-10' >
                        <p className='text-zinc-600 font-semibold pb-1'>First Name</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="text" name="first_name" placeholder='Type any Keyword' value={filterData.first_name} onChange={changeHandler} />
                    </div>
                    <div className='mr-5 pt-5 ml-10' >
                        <p className='text-zinc-600 font-semibold pb-1'>Last Name</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="text" name="last_name" placeholder='Type any Keyword' onChange={changeHandler} value={filterData.last_name} />
                    </div>
                    <div className='mr-5 pt-5 ml-10' >
                        <p className='text-zinc-600 font-semibold pb-1'>Email</p>
                        <input className='h-10 px-5 border border-sm  rounded-md' type="text" name="email" placeholder='Type any Keyword' onChange={changeHandler} value={filterData.email} />
                    </div>
                    <div className='mr-5 pt-10 ml-10'>
                    <p className='text-zinc-600 font-semibold pb-1'>Gender</p>
                    </div>
                    <div className='flex gap-5 mr-5 ml-10'>
                        <input type="radio" name='gender' value='male' onChange={changeHandler} />
                        <p>Male</p>
                        <input type="radio" name='gender' value='female' onChange={changeHandler}/>
                        <p>Female</p>
                    </div>
                    <div className='flex justify-center align-center'>
                    <button type='submit' className="mr-1 cursor-pointer text-[15px] bg-green-500 font-semibold text-white p-1 border border-transparent rounded mx-2 my-5">Apply Filter</button>
                    <button onClick={clickHandler} className="mr-1 cursor-pointer text-[15px] bg-red-500 font-semibold text-white p-1 border border-transparent rounded mx-10 my-5">Clear Filter</button>
                    </div> 
                </form>
                </div>
                <div className='bg-white h-full w-full'>
                <p className='text-2xl font-semibold mb-2 m-10 pl-72 md:{pl-32}'>All Signedup Users </p>
                <div>
                    <div className='grid grid-cols-3 md:{grid-cols-2,pr-20} gap-5 pr-20 mb-10'>
                        {renderUsers()}
                    </div>
                </div>  
                </div>
            </div>
            
        </div>   

    </>
  )
}

export default index