import { useState, useCallback } from "react";

export type ToastProps = {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
};

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const toast = useCallback(({ title, description, variant }: ToastProps) => {
        console.log(`Toast: ${title} - ${description} (${variant || "default"})`);
        // Simple alert for now as a fallback
        alert(`${title}\n${description}`);
    }, []);

    return { toast, toasts };
};
