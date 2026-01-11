"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingHistoryList from './_component/BookingHistoryList'
import GlobalApi from '@/app/_services/GlobalApi'
import { useSession } from '@descope/nextjs-sdk/client';
import moment from 'moment'

function MyBooking() {

    const { user } = useSession();
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        // Only run if user exists
        if (user) {
            GetUserBookingHistory();
        }
    }, [user])

    /**
     * Used to Get User Booking History
     */
    /**
     * Used to Get User Booking History
     */
    const GetUserBookingHistory = () => {
        if (!user) {
            console.log("User is undefined, skipping API call");
            return;
        }

        console.log("Fetching bookings for:", user.email); // Check if email exists

        GlobalApi.GetUserBookingHistory(user.email)
        .then(resp => {
            console.log("API Response:", resp);
            setBookingHistory(resp.bookings);
        })
        .catch(error => {
            // THIS IS CRITICAL: See if the API is throwing an error
            console.error("API Error fetching bookings:", error);
        });
    }

    const filterData = (type) => {
        const result = bookingHistory.filter(item => {
            // Convert strings to Date objects for comparison
            const bookingDate = new Date(item.date);
            const today = new Date();
            // Reset time to 00:00:00 for accurate date-only comparison
            today.setHours(0, 0, 0, 0); 
            
            return type == 'booked'
                ? bookingDate >= today // Future or Today
                : bookingDate < today; // Past
        });

        return result;
    }

    return (
        <div className='my-10 mx-5 md:mx-36'>
            <h2 className='font-bold text-[20px] my-2'>My Bookings</h2>
            <Tabs defaultValue="booked" className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="booked">Booked</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="booked">
                    <BookingHistoryList
                        bookingHistory={filterData('booked')}
                        type='booked'
                    />
                </TabsContent>
                <TabsContent value="completed">
                    <BookingHistoryList
                        bookingHistory={filterData('completed')}
                        type='completed' />

                </TabsContent>
            </Tabs>

        </div>
    )
}

export default MyBooking