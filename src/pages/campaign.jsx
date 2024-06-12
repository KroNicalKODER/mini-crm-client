import React, { useEffect, useState } from 'react'
import CampCards from '../components/campCards'

const campaign = ({email}) => {

  const [campaigns, setCampaigns] = useState([])

  function getTimeDate(timestamp) {
      const date = new Date(timestamp);
      
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formattedDate = `${day}-${month}-${year}`;
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      return `Date: ${formattedDate}, Time: ${formattedTime}`;
  }

  const getAllCampaigns = async () => {
    const response = await fetch(
      'http://localhost:8800/api/campaign?email='+email,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const data = await response.json()
    setCampaigns(data.campaign);
    console.log("campaigns:",data)
  }

  useEffect(()=>{
    getAllCampaigns()
  },[])

  return (
    <div className='card-wrapper d-flex flex-wrap justify-content-center'>
        {
          campaigns.map(c => (
            <CampCards key={c._id} audienceSize={c.customerIds.length} campaigns = {c.customerIds} created_at = {getTimeDate(c.createdAt)} />
          ))
        }
    </div>
  )
}

export default campaign