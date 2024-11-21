import { useEffect } from "react";

const useBeforeReload = (message: string) => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.returnValue = message;
            return message;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [message]);
};

export default useBeforeReload;
