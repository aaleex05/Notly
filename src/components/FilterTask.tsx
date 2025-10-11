import { useState } from "react"


function FilterTask() {
    const [showTaskDone, setShowTaskDone] = useState(false)

  return (
    <div className="font-sans p-10">
        <button
          onClick={() => setShowTaskDone(!showTaskDone)}
          className="bg-gray-800 hover:bg-gray-700 py-2 px-5 cursor-pointer rounded-2xl my-5">{showTaskDone ? 'Show tasks to do' : 'Show tasks done'}</button>
    </div>
  )
}

export default FilterTask