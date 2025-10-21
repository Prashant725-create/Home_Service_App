"use client"
import GlobalApi from "./_services/GlobalApi";


import React, { useState, useEffect }  from 'react';

function CategorySideBar() {
    const [categoryList, setCategoryList] = useState([]);
     // useEffect for fetching data remains the same
    useEffect(() => {
    getCategoryList();
    }, []);

    const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
        console.log(resp);
        setCategoryList(resp.categories);
    });
    };


  return (
    <div>
        <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
        <div>
            {categoryList.map((category, index)=>(
                <div key={index} className='flex gap-2 p-3 
                border rounded-b-lg mb-3
                md:mr-10 cursor-pointer
                hover:bg-purple-50
                hover:shadow-md
                items-center
                hover: text-primary hover:border-primary'>
                    <Image src={category.icon.url}
                    alt='icon'
                    width={30}
                    height={30}/>
                    <h2>{category.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CategorySideBar