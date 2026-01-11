"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from "@/app/_components/BookingSection";

function SuggestedBusinessList({ category, business }) {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    if (!category) return;

    let mounted = true;

    const fetchBusinesses = async () => {
      try {
        const resp = await GlobalApi.getBusinessByCategory(category);
        if (!mounted) return;
        setBusinessList(resp?.businessLists ?? []);
      } catch (err) {
        console.error("Failed to fetch businesses:", err);
        if (mounted) setBusinessList([]);
      }
    };

    fetchBusinesses();

    return () => {
      mounted = false;
    };
  }, [category]);

  return (
    <div className="md:pl-10">
      
      <BookingSection business={business}>
        <Button className="flex gap-2 w-full">
        <NotebookPen />
        Book Appointment
        </Button>
      </BookingSection>

      <div className="mt-6 hover:border border-primary rounded-lg p-3">
        <h2 className="font-bold text-lg mb-3">Similar Businesses</h2>

        <div>
          {businessList?.length === 0 ? (
            <p className="text-gray-500">No similar businesses found.</p>
          ) : (
            businessList.map((business, index) => (
              <Link
                key={index}
                href={`/details/${business.id}`}
                className="flex gap-3 mb-4 border rounded-lg p-2 hover:shadow-md hover:border-primary transition-all cursor-pointer"
              >
                <Image
                  src={business?.images?.[0]?.url || "/placeholder.png"}
                  alt={business?.name || "Business"}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-bold">{business?.name}</h2>
                  <h2 className="text-primary">{business?.contactPerson}</h2>
                  <h2 className="text-gray-400">{business?.address}</h2>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessList;
