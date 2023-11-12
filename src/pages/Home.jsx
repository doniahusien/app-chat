import Chat from '../components/Chat/Chat';
import SideBar from '../components/SideBar/SideBar';
import style from './home.module.css'
function Home() {
  
  return (
    <>
      <div className={style.home}>
        <div className={style.container}>
          <SideBar />
          <Chat />
        </div>
      </div>
    </>
  );
}

export default Home;
