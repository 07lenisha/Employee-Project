import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/Home'); 
    }
  return (
    <div >
      <h1>Welcome to Employee App</h1>
     <button onClick={handleNavigate}>continue </button>
    </div>
  );
}