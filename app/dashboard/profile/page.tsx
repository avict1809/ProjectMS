
import ProfilePage from "@/components/profile-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile page',
}

export default function Home() {
  return <ProfilePage />
}

