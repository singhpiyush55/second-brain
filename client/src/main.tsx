import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import { BrainProvider } from "./context/BrainContext";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <BrainProvider>
                <App />
            </BrainProvider>
        </AuthProvider>
    </BrowserRouter>
)
