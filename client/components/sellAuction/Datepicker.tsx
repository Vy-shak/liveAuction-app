import React, { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import useAuctiondata from '@/lib/stateStore/auctionDetails';

enum dateType {
    start = "STARTDATE",
    end = "ENDDATE",
}

interface prop {
    selectedDate: dateType
}

const Datepicker = ({ selectedDate }: prop) => {
    const [date, setDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("date");
    const [hours, setHours] = useState(date.getHours() % 12 || 12);
    const [minutes, setMinutes] = useState(date.getMinutes());
    const [period, setPeriod] = useState(date.getHours() >= 12 ? 'PM' : 'AM');
    const { auctionData, updateAuctiondata } = useAuctiondata()

    const togglePicker = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (selectedDate == dateType.start) {
            updateAuctiondata({ type: "startDate", val: date })
        }
        else if (selectedDate == dateType.end) {
            updateAuctiondata({ type: "endDate", val: date })
        }
    }, [date])

    const handleDateSelect = (selectedDay: Date | undefined) => {
        if (selectedDay) {

            const updatedDate = new Date(selectedDay);
            const currentDate = new Date();
            let hourValue = hours;
            if (period === 'PM' && hours < 12) hourValue += 12;
            if (period === 'AM' && hours === 12) hourValue = 0;
            updatedDate.setHours(hourValue);
            updatedDate.setMinutes(minutes);
            if (updatedDate < currentDate) {
                console.log("do not select the currentDate");
            } else {
                setDate(updatedDate);
            }
        }
    };

    const handleTimeChange = (newHours:number|undefined, newMinutes:number|undefined) => {
        if (newHours !== undefined) {
            setHours(newHours);
        }

        if (newMinutes !== undefined) {
            setMinutes(newMinutes);
        }

        const updatedDate = new Date(date);
        let hourValue = newHours !== undefined ? newHours : hours;
        if (period === 'PM' && hourValue < 12) hourValue += 12;
        if (period === 'AM' && hourValue === 12) hourValue = 0;
        updatedDate.setHours(hourValue);
        updatedDate.setMinutes(newMinutes !== undefined ? newMinutes : minutes);
        setDate(updatedDate);
    };

    const handlePeriodChange = (newPeriod:"AM"|"PM") => {
        setPeriod(newPeriod);
        const updatedDate = new Date(date);
        let hourValue = hours;
        if (newPeriod === 'PM' && hours < 12) hourValue += 12;
        if (newPeriod === 'AM' && hours === 12) hourValue = 0;
        if (newPeriod === 'AM' && hours < 12 && date.getHours() >= 12) hourValue = hours;
        if (newPeriod === 'PM' && hours < 12 && date.getHours() < 12) hourValue = hours + 12;
        updatedDate.setHours(hourValue);
        setDate(updatedDate);
    };

    const formatTime = () => {
        const time = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
        return time;
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className=" flex items-center justify-center">
            <div className="relative w-72">
                <Button
                    variant="outline"
                    onClick={togglePicker}
                    className="w-full justify-between"
                >
                    <span>
                        {date ?
                            `${date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })} at ${formatTime()}`
                            : 'Pick date & time'}
                    </span>
                    <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                        <Clock className="h-4 w-4 opacity-50" />
                    </div>
                </Button>

                {isOpen && (
                    <div
                        className="absolute top-12 left-0 z-10 mt-1 bg-white border rounded-md shadow-md transition-all duration-300 animate-in fade-in slide-in-from-top-5 w-80"
                    >
                        <Tabs defaultValue="date" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="date">Date</TabsTrigger>
                                <TabsTrigger value="time">Time</TabsTrigger>
                            </TabsList>
                            <TabsContent value="date" className="p-1">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect}
                                    className="rounded-md"
                                />
                            </TabsContent>
                            <TabsContent value="time" className="p-4">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="col-span-1">
                                            <label htmlFor="hours">Hours</label>
                                            <Input
                                                id="hours"
                                                type="number"
                                                min={1}
                                                max={12}
                                                value={hours}
                                                onChange={(e) => handleTimeChange(parseInt(e.target.value, 10), undefined)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="minutes">Minutes</label>
                                            <Input
                                                id="minutes"
                                                type="number"
                                                min={0}
                                                max={59}
                                                value={minutes}
                                                onChange={(e) => handleTimeChange(undefined, parseInt(e.target.value, 10))}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label>Period</label>
                                            <div className="grid grid-cols-2 gap-1 mt-1">
                                                <Button
                                                    variant={period === 'AM' ? "default" : "outline"}
                                                    className="text-xs"
                                                    onClick={() => handlePeriodChange('AM')}
                                                >
                                                    AM
                                                </Button>
                                                <Button
                                                    variant={period === 'PM' ? "default" : "outline"}
                                                    className="text-xs"
                                                    onClick={() => handlePeriodChange('PM')}
                                                >
                                                    PM
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="p-3 border-t border-gray-200 flex justify-end">
                            <Button
                                onClick={handleClose}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export {Datepicker}