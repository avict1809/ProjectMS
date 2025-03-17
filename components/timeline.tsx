import type React from "react";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  date: Date;
  status: "completed" | "in-progress" | "upcoming";
}

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "in-progress":
        return <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />;
      case "upcoming":
        return <ArrowRight className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="mx-auto px-2 container">
    <div className="w-full h-[28.5rem] p-6 overflow-y-auto rounded-lg border bg-card text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Timeline Log</h2>
      <div className="relative">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="mb-6 flex items-center">
            <div className="flex flex-col items-center mr-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1E1E1E] border-4 border-gray-700">
                {getStatusIcon(milestone.status)}
              </div>
              {index < milestones.length - 1 && <div className="w-1 h-16 bg-gray-700 mt-2"></div>}
            </div>
            <div className="flex-grow">
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                <p className="text-sm text-gray-400">
                  {milestone.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                    milestone.status === "completed"
                      ? "bg-green-600 text-green-100"
                      : milestone.status === "in-progress"
                        ? "bg-yellow-600 text-yellow-100"
                        : "bg-gray-600 text-gray-100"
                  }`}
                >
                  {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Timeline;
