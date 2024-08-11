import React from 'react'

function Home() {
    return (
        <div className='flex flex-col gap-4 border-2 border-gray-300'>
            <h1 className='text-2xl font-extrabold mb-4'>Welcome to CodeMON</h1>
            <div className='flex flex-row gap-3'>
                <div className='flex items-center justify p-2 mx-auto w-[70%]'>
                    <p className='text-xl font-semibold'>
                        Coding can definitely be a challenging task for a beginner as well as for coders who tackles complex
                        problems. An online judge play a crucial role in programming world and software development.
                        It offers a variety of coding challenges from beginner to advance levels. Moreover, this platform will
                        help coders to practice and improve their coding skills, algorithmic thinking and problem-solving.
                    </p>
                </div>
                <div>
                    <img src='https://user-images.githubusercontent.com/55389276/140866485-8fb1c876-9a8f-4d6a-98dc-08c4981eaf70.gif'/>
                </div>
            </div>
        </div>
    )
}

export default Home