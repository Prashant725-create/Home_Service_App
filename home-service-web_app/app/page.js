"use client"
import React, { useEffect, useState } from 'react'
import Hero from './_components/Hero'
import CategoryList from './_components/CategoryList'
import GlobalApi from '@/app/_services/GlobalApi'

export default function Home() {
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, [])

  // Fetch Category List from GlobalApi
  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      console.log(resp.categories);
      setCategories(resp.categories);
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Category Section - Passing the data as a prop */}
      <CategoryList categoryList={categories} />
      
    </div>
  )
}