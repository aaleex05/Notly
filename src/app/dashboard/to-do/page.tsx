"use client"

import TaskList from "@/components/TaskList"
import { useState } from "react"

export default function Todo() {
    const [showTaskDone, setShowTaskDone] = useState(false)
    return (
        <div>
            <TaskList done={showTaskDone} />
        </div>
    )
}