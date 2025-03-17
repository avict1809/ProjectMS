import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ServiceContainer } from "./container";

interface ServiceItem {
  label: string;
  icon: React.ElementType;
  link: string;
}

interface Section {
  section?: string;
  title?: string;
  icon?: React.ElementType;
  link?: string;
  items?: ServiceItem[];
}

interface ServicesProps {
  data: Section[];
}

export default function Services({ data }: ServicesProps) {
  return (
    <div className="flex flex-col gap-8 items-center justify-center "> {/* Centers the entire section */}
      {data.map((section, index) =>
        section.items ? (
          <ServiceContainer key={index} title={section.section ?? ""}>
            <div className="flex flex-wrap justify-center items-center gap-6 w-full mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto place-items-center w-full">

                {section.items.map((item, idx) => (
                  <Link key={idx} href={item.link} passHref>
                    <Card className="flex flex-col items-center p-6 text-center 0 text-white rounded-lg cursor-pointer transition-all hover:shadow-xl w-64">
                      <item.icon size={48} className="text-blue-500 mb-4" />
                      <h3 className="text-lg font-semibold">{item.label}</h3>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </ServiceContainer>
        ) : (
          <ServiceContainer key={index} title="title">
            <div className="flex justify-center items-center w-full">
              <Link href={section.link!} passHref>
                <Card className="flex flex-col items-center p-6 text-center 0 text-white rounded-lg cursor-pointer transition-all hover:shadow-xl w-64">
                  {section.icon && <section.icon size={48} className="text-blue-500 mb-4" />}
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </Card>
              </Link>
            </div>
          </ServiceContainer>
        )
      )}
    </div>
  );
}
