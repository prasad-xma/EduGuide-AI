import { Tabs } from 'expo-router';
import StudentTabBar from '@/components/navigation/StudentTabBar';

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <StudentTabBar />}
    />
  );
}
