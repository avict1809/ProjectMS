// app/activity-log/page.tsx
import { Metadata } from 'next';
import ProjectLogs from '@/app/pages/logs';

export const metadata: Metadata = {
  title: 'Activity Log ',
  description: 'View a log of all activities going on in your project',
};

export default function ActivityLogPage() {
  return (
    <div>
      <ProjectLogs />
    </div>
  );
}
