import React from 'react'
import Users from "../../components/Users";

// export const getStaticProps = async() =>{
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   //console.log(data,"dsafsdf")
//   return {
//       props: {
//           data:data,
//       }
//   }
// }

const index = () => {
  return (
    <div>
        <Users />
        {/* {data.map((curElem:any)=>{
          return <div key={curElem.id}>
            <h3>{curElem.title}</h3>
            <h3>{curElem.body}</h3>
            
            </div>
        })} */}
    </div>
  )
}

export default index