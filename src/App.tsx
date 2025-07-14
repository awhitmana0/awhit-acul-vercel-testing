import LoginId from './screens/login-id';
import './index.css';

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* LoginId now includes the Card component itself */}
      <LoginId />
    </div>
  );
}

export default App;