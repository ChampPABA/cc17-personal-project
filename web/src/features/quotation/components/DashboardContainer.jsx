export default function DashboardContainer({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-ifcg-gray-low flex items-center mb-4">
      {children}
    </div>
  );
}
