import { useSelector } from "react-redux";
import apiConnect from "../apiServices/apiConnect";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ProblemSolvedByUser() {

<<<<<<< HEAD
    const [user, setUser] = useState('');
=======
    const [user, setUser] = useState(null);
>>>>>>> 5.0
    const myUser = useSelector((state) => state.myUser);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/getUserById", { userId: myUser._id });
                // console.log(promise.data.user);

                if (!promise.data.success) {
                    throw new Error("No User Found in database!!!");
                }
                setUser(promise.data.user);
<<<<<<< HEAD
                console.log("dafa : " + user)
=======
                console.log(user)
>>>>>>> 5.0
                console.log(user.problemsSolved)

            } catch (error) {
                console.log("Error in fetching all Problems from server" + error.message);
            }

        }
        fetchUser();

    }, [])

    return (
        <div className='flex item-center justify-around mx-auto m-8'>
            <table className='border-2'>
                <thead>
<<<<<<< HEAD
=======

>>>>>>> 5.0
                    <tr className='flex flex-row gap-20 justify-evenly'>
                        <th className='py-4 px-3'>S.No</th>
                        <th className='py-4 px-3'>Problem Name</th>
                        <th className='py-4 px-3'>Difficulty</th>
<<<<<<< HEAD
                    </tr> 
                </thead>
                <tbody>
                    {
                        user && user.problemsSolved.map((element, index) => {
=======
                    </tr>

                </thead>
                <tbody>
                    {
                        user && user.problemsSolved && user.problemsSolved.map((element, index) => {
                            const fullName = element.problemName;
                            let shortName = fullName.substr(0, 20);
                            shortName += "...";
>>>>>>> 5.0
                            return (
                                <Link to={`/problems/problem/${element._id}`} >
                                    <tr className='border-t-2 p-2 flex flex-row justify-evenly gap-20'>
                                        <td className='py-4 px-3'>{index + 1}</td>
                                        <td className='py-4 px-3'>{fullName.length <= 15 ? fullName : shortName}</td>
                                        <td className='py-4 px-3'>{element.difficulty}</td>
                                    </tr>
                                </Link>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProblemSolvedByUser;