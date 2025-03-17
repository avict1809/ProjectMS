import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ServiceContainerProps {
    children: ReactNode;
    title: string;
}

const ServiceContainer: React.FC<ServiceContainerProps> = ({ children, title }) => {
    return (
        <Card className="bg-black text-white shadow-lg p-6 lg:rounded-2xl w-full my-2 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
            <div className="flex justify-center w-full">
                {children}
            </div>

        </Card>
    );
};
// Emmatiko was here
export { ServiceContainer };
