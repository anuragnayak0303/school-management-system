export default function Calendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    return (
        <div className="bg-white border border-gray-300 backdrop-blur-lg rounded-sm shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-purple-600">
                🗓️ {monthNames[currentMonth]} {currentYear}
            </h3>
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-700">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div
                        key={index}
                        className={`font-semibold ${day === "S" ? "text-red-500" : ""}`}
                    >
                        {day}
                    </div>
                ))}
                {calendarDays.map((day, index) => {
                    const isSunday = (index % 7 === 0);
                    const isPast =
                        day && (day < currentDate || currentMonth !== today.getMonth());
                    const isToday = day === currentDate && currentMonth === today.getMonth();

                    return (
                        <div
                            key={index}
                            className={`py-2 rounded-full transition cursor-pointer font-medium ${
                                !day ? "" :
                                isToday
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-110"
                                    : isSunday
                                        ? "text-red-500"
                                        : isPast
                                            ? "text-gray-400"
                                            : "font-bold hover:bg-gray-200"
                            }`}
                        >
                            {day || ""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}