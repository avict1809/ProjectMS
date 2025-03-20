import { Button } from "@/components/ui/button";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Flame } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ProjectMS-Home",
  description: "ProjectMS-Home",
}

export default function Home() {
  return (
    <div className="p-3 dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Flame className="text-orange-500" size={48} />
          <span className="text-3xl font-bold">
            Nezuko
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Button className="bg-green-500 hover:bg-green-400 dark:text-white">Documentation</Button>
          <Link href={"/login"}>
            <Button className="bg-red-500 hover:bg-red-400 dark:text-white">Login</Button>
          </Link>
        </div>
      </div>
      <MacbookScroll src="/image.png" />
    </div>
  );
}
