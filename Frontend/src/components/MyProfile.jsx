
import {useSelector} from 'react-redux';

function MyProfile(){

    const user = useSelector((state) => state.myUser);

    return (

        <div>

            {/* Image */}
            <button type="button" className='m-4 p-2'>
                <img src={user.image} width={100} height={100} className='rounded-full items-center'/>
            </button>
        </div>
    )
}

export default MyProfile;