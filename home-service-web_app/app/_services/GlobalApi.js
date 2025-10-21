import { request, gql } from "graphql-request";


const MASTER_URL= 'https://ap-south-1.cdn.hygraph.com/content/cmf3kp3oh00lj08upobwr8xr9/master'
console.log("MASTER_URL ->", MASTER_URL)
const getCategory= async()=>{
    const query = gql`
    query Category {
     categories {
        bgcolor {
            hex
        }
        id
        name
        icon {
            url
        }
     }
    }
    `;
    try{
        const headers = {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.HYGRAPH_READ_TOKEN}`,
        };
        const result=await request(MASTER_URL, query, undefined, headers);
        return result;
    } catch (err) {
        // graphql-request throws an error with `response` and `request` properties
        console.error("graphql-request error:", err.response ?? err);
        throw err;
  }
}

const getAllBusinessList=async ()=>{
    const query=gql`
    query BusinessList {
        businessLists {
          about
            address
            category {
              name
            }
            contactPerson
            email
            images {
              url
            }
            id
            name
        }
    }
    `
    const result=await request(MASTER_URL, query)
    return result;

}


export default{
    getCategory,
    getAllBusinessList
}