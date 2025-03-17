// app/activity-log/page.tsx
import { Metadata } from 'next';
import { UnderConstruction } from '@/components/underConstruction';

export const metadata: Metadata = {
  title: 'Settings - Under Construction',
  description: 'This feature is under construction. We’re working on it!',
};

export default function ActivityLogPage() {
  return (
    <div>
      <UnderConstruction />
    </div>
  );
}
