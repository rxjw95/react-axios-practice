import './App.css';
import Users from './Users';

function App() {
    return (
        <div>
            <Users />
            <button onClick={() => window.location.reload()}>
                다시 불러오기
            </button>
        </div>
    );
}

export default App;
