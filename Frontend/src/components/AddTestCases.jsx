import { useState } from "react";


function AddTestCases() {

    const [allTestCases, setAllTestCases] = useState([]);

    const [testCase, setTestCase] = useState({
        input: '',
        output: ''
    });

    const addTestCase = (e) => {
        setTestCase((prev) => ({                        // setCase((prev) => ({}))
            ...prev,
            [e.target.name]: e.target.value,
        })
        )
    }

    const handleAddTestCase = (e) => {
        allTestCases.push(testCase);
        console.log("TestCase Added");
    }

    const submitTestCases = () => {
        console.log(allTestCases);
    }

    return (
        <div>
            <div className="border-2 border-gray-500 w-[50%] mt-5 mx-auto">
                <form className="flex flex-col gap-5 item-center justify-between p-5">
                    <div className="flex flex-row gap-4 item-center">
                        <label>Sample Input</label>
                        <input type="text" onChange={addTestCase}
                            name='input'
                            value={testCase.input}
                            className="border-2 border-gray-500"
                            placeholder="Add Input"
                        ></input>
                    </div>
                    <div className="flex flex-row gap-4 item-center">
                        <label>Sample Output</label>
                        <input type="text" onChange={addTestCase}
                            name='output'
                            value={testCase.output}
                            className="border-2 border-gray-500"
                            placeholder="Add Output"
                        ></input>
                    </div>
                </form>
                <button type='submit' onClick={handleAddTestCase}
                    className="bg-red-600 text-white m-2 p-2"
                >Add TestCase</button>
            </div>
            <button type="submit" onClick={submitTestCases}
                className="bg-red-600 text-white m-2 p-2 fixed bottom-24"
            >Submit</button>
        </div>
    )
}

export default AddTestCases;