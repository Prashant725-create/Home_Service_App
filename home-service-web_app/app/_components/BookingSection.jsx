"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "@descope/nextjs-sdk/client";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] =useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]); // <--- Added this to store booked slots
  const { user } = useSession();
  const {data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  // FIX 1: Only run this if 'date' AND 'business' exist
  useEffect(() => {
    if (date && business) {
        BusinessBookedSlot();
    }
  }, [date, business]);

  // Get Selected Date Business Booked Slot
  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(business.id, moment(date).format('DD-MMM-yyyy'))
      .then(resp => {
        console.log(resp);
        setBookedSlot(resp.bookings); 
      })
      .catch(e => {
         console.log("Error fetching slots", e);
      })
  }

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' });
      timeList.push({ time: i + ':30 AM' });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ':00 PM' });
      timeList.push({ time: i + ':30 PM' });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createNewBooking(
      business.id,
      moment(date).format('DD-MMM-yyyy'),
      selectedTime,
      user?.email,
      user?.name
    ).then(
      (resp) => {
        if (resp) {
          setSelectedTime(''); 
          toast('Service Booked successfully!');
          BusinessBookedSlot(); // Refresh slots after booking
        }
      },
      (e) => {
        toast('Error while creating booking');
      }
    );
  };

  const isSlotBooked=(time) => {
    return bookedSlot.find(item=>item.time==time)
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        
        <SheetContent className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <p className="text-sm text-gray-500">
              Select Date and Time to book your appointment.
            </p>
          </SheetHeader>

          <div className="flex flex-col gap-5 items-start mt-5">
            
            {/* --- CALENDAR SECTION --- */}
            <h2 className="font-bold text-lg">Select Date</h2>
            <div className="self-center bg-gray-50 p-4 rounded-xl border">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                required
                className="rounded-md border bg-white shadow-sm p-3"
                
                modifiersClassNames={{
                   selected: "bg-purple-600 text-white hover:bg-purple-600",
                   today: "bg-gray-100 text-gray-900",
                   outside: "text-gray-500 opacity-50 pointer-events-none" 
                }}

                classNames={{
                  day: "h-10 w-10 p-0 font-normal rounded-full hover:bg-purple-100 transition-all",
                  head_cell: "w-10 font-bold text-gray-500",
                }}
              />
            </div>

            {/* --- TIME SLOT SECTION --- */}
            <h2 className="font-bold text-lg mt-2">Select Time Slot</h2>
            <div className="grid grid-cols-3 gap-3 w-full mb-5">
              {timeSlot.map((item, index) => (
                <Button
                  key={index}
                  disabled={isSlotBooked(item.time)}
                  variant="outline"
                  className={`border rounded-full p-2 px-3 hover:bg-purple-600 hover:text-white transition-all
                    ${selectedTime === item.time 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'text-gray-600'}`}
                  onClick={() => setSelectedTime(item.time)}
                >
                  {item.time}
                </Button>
              ))}
            </div>
          </div>

          <SheetFooter className="mt-5 border-t pt-5">
            <div className="flex gap-5 justify-end w-full">
              <SheetClose asChild>
                <Button variant="ghost" className="text-red-500 hover:bg-red-50">
                  Cancel
                </Button>
              </SheetClose>
              
              <SheetClose asChild>
                <Button
                    disabled={!(selectedTime && date)}
                    onClick={() => saveBooking()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                    Book
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>

        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;