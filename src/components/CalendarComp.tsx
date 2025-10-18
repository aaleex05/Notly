"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useTask } from "@/app/context/TaskContext"

export function formatDate(date: Date | null) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "2-digit",
    })
}

export function formatDateForDB(date: Date | null) {
    if (!date) {
        return ""
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export function formatDateString(date: Date | null) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

interface CalendarComponentProps {
    onChange?: (date: string) => void;
}

export function CalendarComponent({ onChange }: CalendarComponentProps) {

    const { open, setOpen, date, setDate, month, setMonth } = useTask()
        
    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <input
                    id="date"
                    value={formatDate(date)}
                    type="text"
                    placeholder="Selecciona una fecha"
                    readOnly
                    className="p-2 rounded-lg border-1 w-full border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252] cursor-pointer"
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                        <Calendar
                            mode="single"
                            selected={date}
                            month={month}
                            onMonthChange={setMonth}
                            fixedWeeks
                            onSelect={(newDate) => {
                                setDate(newDate)
                                setMonth(newDate)
                                setOpen(false)
                                if (onChange && newDate) {
                                    onChange(formatDateForDB(newDate))
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="text-muted-foreground px-1 text-sm">
                {date ? (
                    <div>
                        Fecha de vencimiento seleccionada: {""}
                        <span className="font-medium">{formatDateString(date)}</span>.
                    </div>
                ) : (
                    "Selecciona una fecha de vencimiento"
                )}
            </div>
        </div>
    )
}