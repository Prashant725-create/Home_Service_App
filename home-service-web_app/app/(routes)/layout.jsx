import React from 'react'

function layout({children}) {
  return (
    <div>
        <div className='grid grid-cols-4'>
            <div className='bg-blue-100'>
            
            {/*Side Category Nav bar */}
            <CategorySideBar/>
            </div>
            <div className= 'col-span-3'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default layout