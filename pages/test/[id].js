import useIsMounted from '../../hooks/useIsMounted';
import { useRouter } from 'next/router'

const Test = () => {

    const isMounted = useIsMounted();
    const router = useRouter();

    if(!isMounted){
        return null;
    }

    console.log({router}, router.query.id);

    return (
        <div>
            <p>Chanchito {router.query.id}</p>
        </div>
    );
}

export default Test;