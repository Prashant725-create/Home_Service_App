import { request, gql } from "graphql-request";


const MASTER_URL = 'https://ap-south-1.cdn.hygraph.com/content/cmf3kp3oh00lj08upobwr8xr9/master'
console.log("MASTER_URL ->", MASTER_URL)
const getCategory = async () => {
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
    try {
        const headers = {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.HYGRAPH_READ_TOKEN}`,
        };
        const result = await request(MASTER_URL, query, undefined, headers);
        return result;
    } catch (err) {
        // graphql-request throws an error with `response` and `request` properties
        console.error("graphql-request error:", err.response ?? err);
        throw err;
    }
}

const getAllBusinessList = async () => {
    const query = gql`
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
    const result = await request(MASTER_URL, query)
    return result;

}

const getBusinessByCategory = async (category) => {
    const query = gql`
    query MyQuery {
        businessLists(where: {category: 
            {name: "`+ category + `"}}) {
            about
            address
            category {
                name
            }
            contactPerson
            email
            id
            name
            images {
                url
            }
        }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

const getBusinessById = async (id) => {
    const query = gql`
    query GetBusinessById {
        businessList(where: {id: "`+ id + `"}) {
            about
            address
            category {
            name
            }
            contactPerson
            email
            id
            name
            images {
            url
            }
        }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

const createNewBooking = async (businessId, date, time, userEmail, userName) => {
    const mutation = gql`
    mutation CreateBooking {
        createBooking(
            data: {bookingStatus: booked,
             businessList: {connect: {id: "`+ businessId + `"}}, 
             date: "`+ date + `", time: "` + time + `", userEmail: "` + userEmail + `",
             userName: "`+ userName + `"}
        ) {
            id
        }

        publishManyBookings(to: PUBLISHED) {
            count
        }
    }
    `
    const result = await request(MASTER_URL, mutation)
    return result;
}

const BusinessBookedSlot = async (businessId, date) => {
    const query = gql`
    query BusinessBookedSlot {
        bookings(where: {businessList_some: {id: "`+ businessId + `"}, date: "` + date + `"}) {
            date
            time
        }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

const GetUserBookingHistory = async(userEmail) => {
    const query = gql`
    query GetUserBookingHistory {
        bookings(where: {userEmail: "`+userEmail+`"}) {
            businessList {
                name
                images {
                    url
                }
                contactPerson
                address
            }
                date
                time
        }
    }
    `
    const result = await request(MASTER_URL, query)
    return result;
}


export default {
    getCategory,
    getAllBusinessList,
    getBusinessByCategory,
    getBusinessById,
    createNewBooking,
    BusinessBookedSlot,
    GetUserBookingHistory
}