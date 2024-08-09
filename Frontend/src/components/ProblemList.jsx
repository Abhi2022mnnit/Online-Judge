import React, { useEffect, useState } from 'react';
import apiConnect from '../apiServices/apiConnect'
import { Link } from 'react-router-dom'

function ProblemList() {

    const [problems, setallproblems] = useState([]);

    useEffect(() => {
        const fetchallprobs = async () => {
            try {
                const promise = await apiConnect("GET", "https://online-judge-jq9r.onrender.com/api/phase1/auth/problemList");
                console.log(promise.data.allProblems);

                if (!promise.data.success) {
                    throw new Error("No problems Found in database!!!");
                }
                setallproblems(promise.data.allProblems);
            } catch (error) {
                console.log("Error in fetching all Problems from server" + error.message);
            }
        }
        fetchallprobs();
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

                    {problems.map((element, index) => {
                        return (
                            <Link to={`/problems/problem/${element._id}`}>
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

export default ProblemList;





// ------------------------------ Some Extra Code ------------------------------

// <tr className='border-t-2 p-2'>
//     <td className='border-r-2 p-2'>1.</td>
//     <td className='border-r-2 p-2'>Two Sum</td>
//     <td>Easy</td>
// </tr>
// <tr className='border-t-2 p-2'>
//     <td className='border-r-2 p-2'>2.</td>
//     <td className='border-r-2 p-2'>Three Sum</td>
//     <td>Medium</td>
// </tr>