import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

const MainDiv = () => {
    return (
        <Card className="flex flex-col md:flex-row  items-center justify-between h-96 flex-1 my-2 p-6 lg:rounded-2xl w-full text-white shadow-lg">
            {/* Text Section */}
            <div className="w-1/2 mx-auto flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-center w-full">Water Billing</h1>
                <p className="text-sm mt-2 max-w-md text-center items-center line-clamp-3">
                    Manage your water billing system efficiently with real-time tracking 
                    and automated calculations. Track usage, generate invoices, 
                    and integrate with existing infrastructure effortlessly.
                </p>
            </div>
            {/* Icon Section */}
            <div className="flex items-center justify-center w-1/2 h-full">
                <Flame className="text-blue-500 w-24 h-24" />
            </div>
        </Card>
    );
};

export { MainDiv };
