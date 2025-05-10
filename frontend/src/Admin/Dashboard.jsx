import MainHeader from "../components/MainHeader";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main content */}
      <div className="ml-0 md:ml-64 w-full min-h-screen bg-gray-50">
        {/* MainHeader hidden on small and medium screens */}
        <MainHeader />
        {/* Breadcrumb & Title */}
        <div className="p-4 sm:p-6">
          <div className="text-sm text-gray-500 mb-2">Admin &gt; Dashboard</div>
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard title="Total Users">
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  "4 Admins",
                  "35 Teachers",
                  "34 Parents",
                  "24 Students",
                  "35 Students",
                  "1 Others",
                ].map((role) => (
                  <button
                    key={role}
                    className="border border-blue-500 text-blue-600 px-2 py-1 rounded"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Total Leave Requests">
              <p className="text-sm">0 Requests</p>
            </DashboardCard>

            <DashboardCard title="Exams (Current Month)">
              <p className="text-sm">0 Exams</p>
            </DashboardCard>

            <DashboardCard title="Events (Current Week)">
              <p className="text-sm">0 Programs</p>
            </DashboardCard>
          </div>

          {/* Chart Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <DashboardCard key={i} title={`Student Admission`}>
                <div className="flex gap-4 text-sm text-blue-600 mb-2">
                  <span className="cursor-pointer">Today</span>
                  <span className="font-bold underline">This Week</span>
                  <span className="cursor-pointer">This Month</span>
                </div>
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  [Chart Here]
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable card component
function DashboardCard({ title, children }) {
  return (
    <div className="bg-white rounded p-4 shadow">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}
