import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useIsMounted = () => {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(router.isReady){
            setLoaded(true);
        }


    }, [router.isReady]);

    return loaded;
}

export default useIsMounted;