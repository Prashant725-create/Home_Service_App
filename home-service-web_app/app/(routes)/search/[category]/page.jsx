"use client";

import React, { useEffect, useState } from "react";
import BusinessList from "@/app/_components/BusinessList";
import GlobalApi from "@/app/_services/GlobalApi";

export default function BusinessByCategory({ params }) {
  // Unwrap params promise per Next.js requirement for client components
  const resolvedParams = React.use(params);
  const category = resolvedParams?.category;

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
    <div>
      <BusinessList title={category} businessList={businessList} />
    </div>
  );
}
