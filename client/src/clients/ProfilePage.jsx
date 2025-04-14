import React, { useContext } from 'react';
import styled from 'styled-components';
import pfp from "../assets/pfp2.png";
import { UserContext } from '../App';

const ProfilePage = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  return (
    <>
    <div className="top-title">My Profile</div>
    <StyledWrapper>
      <div className="card">
        <div className="card__img">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%"><rect fill="#ffffff" width={540} height={450} /><defs><linearGradient id="a" gradientUnits="userSpaceOnUse" x1={0} x2={0} y1={0} y2="100%" gradientTransform="rotate(222,648,379)"><stop offset={0} stopColor="#ffffff" /><stop offset={1} stopColor="#FC726E" /></linearGradient><pattern patternUnits="userSpaceOnUse" id="b" width={300} height={250} x={0} y={0} viewBox="0 0 1080 900"><g fillOpacity="0.5"><polygon fill="#444" points="90 150 0 300 180 300" /><polygon points="90 150 180 0 0 0" /><polygon fill="#AAA" points="270 150 360 0 180 0" /><polygon fill="#DDD" points="450 150 360 300 540 300" /><polygon fill="#999" points="450 150 540 0 360 0" /><polygon points="630 150 540 300 720 300" /><polygon fill="#DDD" points="630 150 720 0 540 0" /><polygon fill="#444" points="810 150 720 300 900 300" /><polygon fill="#FFF" points="810 150 900 0 720 0" /><polygon fill="#DDD" points="990 150 900 300 1080 300" /><polygon fill="#444" points="990 150 1080 0 900 0" /><polygon fill="#DDD" points="90 450 0 600 180 600" /><polygon points="90 450 180 300 0 300" /><polygon fill="#666" points="270 450 180 600 360 600" /><polygon fill="#AAA" points="270 450 360 300 180 300" /><polygon fill="#DDD" points="450 450 360 600 540 600" /><polygon fill="#999" points="450 450 540 300 360 300" /><polygon fill="#999" points="630 450 540 600 720 600" /><polygon fill="#FFF" points="630 450 720 300 540 300" /><polygon points="810 450 720 600 900 600" /><polygon fill="#DDD" points="810 450 900 300 720 300" /><polygon fill="#AAA" points="990 450 900 600 1080 600" /><polygon fill="#444" points="990 450 1080 300 900 300" /><polygon fill="#222" points="90 750 0 900 180 900" /><polygon points="270 750 180 900 360 900" /><polygon fill="#DDD" points="270 750 360 600 180 600" /><polygon points="450 750 540 600 360 600" /><polygon points="630 750 540 900 720 900" /><polygon fill="#444" points="630 750 720 600 540 600" /><polygon fill="#AAA" points="810 750 720 900 900 900" /><polygon fill="#666" points="810 750 900 600 720 600" /><polygon fill="#999" points="990 750 900 900 1080 900" /><polygon fill="#999" points="180 0 90 150 270 150" /><polygon fill="#444" points="360 0 270 150 450 150" /><polygon fill="#FFF" points="540 0 450 150 630 150" /><polygon points="900 0 810 150 990 150" /><polygon fill="#222" points="0 300 -90 450 90 450" /><polygon fill="#FFF" points="0 300 90 150 -90 150" /><polygon fill="#FFF" points="180 300 90 450 270 450" /><polygon fill="#666" points="180 300 270 150 90 150" /><polygon fill="#222" points="360 300 270 450 450 450" /><polygon fill="#FFF" points="360 300 450 150 270 150" /><polygon fill="#444" points="540 300 450 450 630 450" /><polygon fill="#222" points="540 300 630 150 450 150" /><polygon fill="#AAA" points="720 300 630 450 810 450" /><polygon fill="#666" points="720 300 810 150 630 150" /><polygon fill="#FFF" points="900 300 810 450 990 450" /><polygon fill="#999" points="900 300 990 150 810 150" /><polygon points="0 600 -90 750 90 750" /><polygon fill="#666" points="0 600 90 450 -90 450" /><polygon fill="#AAA" points="180 600 90 750 270 750" /><polygon fill="#444" points="180 600 270 450 90 450" /><polygon fill="#444" points="360 600 270 750 450 750" /><polygon fill="#999" points="360 600 450 450 270 450" /><polygon fill="#666" points="540 600 630 450 450 450" /><polygon fill="#222" points="720 600 630 750 810 750" /><polygon fill="#FFF" points="900 600 810 750 990 750" /><polygon fill="#222" points="900 600 990 450 810 450" /><polygon fill="#DDD" points="0 900 90 750 -90 750" /><polygon fill="#444" points="180 900 270 750 90 750" /><polygon fill="#FFF" points="360 900 450 750 270 750" /><polygon fill="#AAA" points="540 900 630 750 450 750" /><polygon fill="#FFF" points="720 900 810 750 630 750" /><polygon fill="#222" points="900 900 990 750 810 750" /><polygon fill="#222" points="1080 300 990 450 1170 450" /><polygon fill="#FFF" points="1080 300 1170 150 990 150" /><polygon points="1080 600 990 750 1170 750" /><polygon fill="#666" points="1080 600 1170 450 990 450" /><polygon fill="#DDD" points="1080 900 1170 750 990 750" /></g></pattern></defs><rect x={0} y={0} fill="url(#a)" width="100%" height="100%" /><rect x={0} y={0} fill="url(#b)" width="100%" height="100%" /></svg>
        </div>
        <div className="card__avatar">
            <img src={pfp} alt='pfp' loading='eager'/>
        </div>
        <div className="card__title">{userInfo.name}</div>
        <div className="card__subtitle">{userInfo.username}</div>
        <div className="inner-profile-desc" style={{
          lineHeight: "1.8",
          fontSize: "1.1rem",
          textAlign: "left",
          marginTop: '26px',
          width: '80%',
          marginLeft: '10%'
        }}>
          <p><strong>Name: </strong>{userInfo.name}</p>
          <p><strong>Username: </strong>{userInfo.username}</p>
          <p><strong>Role: </strong>{userInfo.role}</p>
          {userInfo && userInfo.github && <p><strong>Github: </strong>{userInfo.github}</p>}
          {userInfo && userInfo.linkedin && <p><strong>Linkedin: </strong>{userInfo.linkedin}</p>}
        </div>
      </div>
    </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  .card {
    --main-color: #000;
    --submain-color: #78858F;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    width: 100%;
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
    align-items: center;
    // border-radius: 20px;
    background: var(--bg-color);
  }

  .card__img {
    height: 192px;
    width: 100%;
  }

  .card__img svg {
    height: 100%;
    // border-radius: 20px 20px 0 0;
  }

  .card__avatar {
    position: absolute;
    width: 250px;
    height: 250px;
    background: var(--bg-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 30px;
  }

  .card__avatar svg {
    width: 100px;
    height: 100px;
  }
  .card__avatar img{
    width: 240px;
    height: 240px;
  }

  .card__title {
    margin-top: 100px;
    font-weight: 500;
    font-size: 18px;
    color: var(--main-color);
  }

  .card__subtitle {
    margin-top: 10px;
    font-weight: 400;
    font-size: 15px;
    color: var(--submain-color);
  }

 `;

export default ProfilePage;
