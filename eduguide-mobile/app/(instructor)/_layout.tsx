import { Tabs } from 'expo-router';
import InstructorTabBar from '@/components/navigation/InstructorTabBar';

export default function InstructorLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <InstructorTabBar />}
    />
  );
}
