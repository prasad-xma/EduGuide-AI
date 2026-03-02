import { Stack } from 'expo-router';

export default function ViewCourseLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
