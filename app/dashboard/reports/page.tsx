// app/activity-log/page.tsx
import { Metadata } from 'next';
import ProjectReportPage from '@/app/pages/report';

export const metadata: Metadata = {
  title: 'Reports',
  description: 'Comprehensive report on the project',
};

export default function ActivityLogPage() {
  return (
    <div>
      <ProjectReportPage />
    </div>
  );
}
