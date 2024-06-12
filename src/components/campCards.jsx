import React, { useState, useEffect } from 'react';

const CampCards = ({ audienceSize, campaigns, created_at }) => {
  const [mailSent, setMailSent] = useState(0);
  const [mailNotSent, setMailNotSent] = useState(0);

  useEffect(() => {
    let sent = 0;
    campaigns.forEach(c => {
      if (c.mail_status) {
        sent++;
      }
    });
    setMailSent(sent);
    setMailNotSent(audienceSize - sent);
  }, [campaigns, audienceSize]);

  return (
    <div className='card mx-3 my-2' style={{ width: '450px' }}>
      <div className="card-header">
        Audience Size: {audienceSize}
      </div>
      <div className="card-body">
        <div className="mails-sent d-flex justify-content-between">
          <div className="">Mails Sent</div>
          <div className="">{mailSent}</div>
        </div>
        <hr />
        <div className="mails-sent d-flex justify-content-between">
          <div className="">Mails Unsent</div>
          <div className="">{mailNotSent}</div>
        </div>
        <hr />
        <div className="mails-sent d-flex justify-content-between">
          <div className="">Created At</div>
          <div className="">{created_at}</div>
        </div>
      </div>
    </div>
  );
};

export default CampCards;
