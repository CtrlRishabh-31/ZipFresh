import { useEffect, useState } from 'react';
import { useUI } from '../context/UIContext';

export default function ToastContainer() {
    const { toasts, removeToast } = useUI();

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[60] flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
}

function Toast({ toast, onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay to allow enter animation
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
    };

    return (
        <div
            className={`pointer-events-auto flex items-center justify-between px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } ${styles[toast.type]}`}
        >
            <span className="font-semibold text-sm">{toast.message}</span>
            <button onClick={onClose} className="ml-4 opacity-75 hover:opacity-100 font-bold">&times;</button>
        </div>
    );
}
