import { Link } from 'react-router-dom';
import apiConnect from '../apiServices/apiConnect';
import { useState, useEffect } from 'react';

function ProblemCreatedByUser() {

    const [allProblems, setAllProblems] = useState([]);

    useEffect(() => {
        const fetchAllProblems = async () => {
            try {
                const promise = await apiConnect("GET", "http://localhost:8000/api/phase1/auth/problemList");
                console.log(promise.data.allProblems);

                if (!promise.data.success) {
                    throw new Error("No problems Found in database!!!");
                }
                setAllProblems(promise.data.allProblems);
                console.log(allProblems);

            } catch (error) {
                console.log("Error in fetching all Problems from server" + error.message);
            }
        }
        fetchAllProblems();
    }, [])

    return (
        <div className='flex item-center justify-around mx-auto m-8'>
            <table className='border-2'>
                <thead>

                    <tr className='flex flex-row gap-20 justify-evenly'>
                        <th className='py-4 px-3'>S.No</th>
                        <th className='py-4 px-3'>Problem Name</th>
                        <th className='py-4 px-3'>Difficulty</th>
                    </tr>

                </thead>
                <tbody>

                    {allProblems.map((element, index) => {
                        return (
                            <Link to={`/problems/updateProblem/${element._id}`}>
                                <tr className='border-t-2 p-2 flex flex-row justify-evenly gap-20'>
                                    <td className='py-4 px-3'>{index + 1}</td>
                                    <td className='py-4 px-3'>{element.problemName}</td>
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

export default ProblemCreatedByUser;