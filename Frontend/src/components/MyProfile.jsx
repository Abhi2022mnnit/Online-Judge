
import { useSelector } from 'react-redux';

function MyProfile() {

    const user = useSelector((state) => state.myUser);

    return (

        <div className='sm:flex sm:flex-row flex flex-col gap-3  w-full items-center'>

            {/* Image */}
            <button type="button" className='m-2 p-2 h-[50%] '>
                <img src={user.image} width={100} height={100} className='shadow-md shadow-gray-500 transition-all duration-200 hover:scale-90 rounded-full items-center' />
            </button>

            <div className='flex flex-col gap-2 m-4 ml-7'>
                <div className='flex flex-row gap-3 border-b-2 border-gray-300 rounded-lg'>
                    <label className='font-semibold text-lg'>Name</label>
                    <p>{user.firstName ? user.firstName : " "}</p>
                    <p>{user.lastName ? user.lastName : ""}</p>
                </div>
                <div className='flex flex-row gap-3 border-b-2 border-gray-300 rounded-lg'>
                    <label className='font-semibold text-lg'>Email</label>
                    <p>{user.emailAddress ? user.emailAddress : " "}</p>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;