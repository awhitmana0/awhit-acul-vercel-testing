import LoginId from './screens/login-id'; // Adjust path if needed
import './index.css'; // Import your Tailwind CSS

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <LoginId />
      </div>
    </div>
  );
}

export default App;