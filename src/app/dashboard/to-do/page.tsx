"use client"

import TaskList from "@/components/To-do/TaskList"
import { useState } from "react"

export default function Todo() {
    const [showTaskDone, setShowTaskDone] = useState(false)
    return (
        <div>
            <TaskList done={showTaskDone} />
        </div>
    )
}