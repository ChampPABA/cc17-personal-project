import { mockDashboardCard } from "../../../utils/contants/mockDashboardCard";
import DashboardContainer from "./DashboardContainer";

export default function DashboardStatsGrid() {
  return (
    <div className="flex gap-4 w-full">
      {mockDashboardCard.map((el) => (
        <DashboardContainer
          key={el.key}
          to={el.to}
          Icon={el.icon}
          amount={el.amount}
          bg={el.cardBgColor}
        >
          {el.label}
        </DashboardContainer>
      ))}
    </div>
  );
}
