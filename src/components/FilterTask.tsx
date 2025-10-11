interface FilterTaskProps{
    showTaskDone: boolean,
    setShowTaskDone: (value: boolean) => void;
}

function FilterTask({showTaskDone, setShowTaskDone }: FilterTaskProps) {

  return (
    <div className="font-sans">
        <button
          onClick={() => setShowTaskDone(!showTaskDone)}
          className="bg-gray-800 hover:bg-gray-700 py-2 px-5 cursor-pointer rounded-2xl ">{showTaskDone ? 'Show tasks to do' : 'Show tasks done'}</button>
    </div>
  )
}

export default FilterTask