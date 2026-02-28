import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

type TabItem = {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  route: string;
  hasNotification?: boolean;
};

const StudentTabBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const spacing = 10;

  const tabs: TabItem[] = [
    { id: 0, icon: 'home-outline', activeIcon: 'home', route: '/(student)/homeScreen' },
    { id: 1, icon: 'book-outline', activeIcon: 'book', route: '/(student)/courses' },
    { id: 2, icon: 'chatbubble-outline', activeIcon: 'chatbubble', route: '/(student)/gpt-recommend' },
    { id: 3, icon: 'person-outline', activeIcon: 'person', route: '/(student)/profile' },
  ];

  const handleTabPress = (tab: TabItem) => {
    setActiveTab(tab.id);
    (router.replace as any)(tab.route);
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: spacing * 3,
      left: spacing * 2,
      right: spacing * 2,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2C3E50',
        borderRadius: spacing * 2.5,
        paddingVertical: spacing * 1.5,
        paddingHorizontal: spacing * 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: spacing * 2,
        elevation: 10,
      }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <View style={[
              {
                width: spacing * 4.5,
                height: spacing * 4.5,
                borderRadius: spacing * 4,
                alignItems: 'center',
                justifyContent: 'center',
              },
              activeTab === tab.id && {
                backgroundColor: '#FFFFFF',
                borderRadius: spacing * 4,
              }
            ]}>
              <Ionicons
                name={activeTab === tab.id ? tab.activeIcon : tab.icon}
                size={24}
                color={activeTab === tab.id ? '#2C3E50' : '#FFFFFF'}
              />
            </View>
            {tab.hasNotification && (
              <View style={{
                position: 'absolute',
                top: spacing * 0.8,
                right: spacing * 1.2,
                width: spacing * 0.8,
                height: spacing * 0.8,
                borderRadius: spacing * 0.4,
                backgroundColor: '#FF3B30',
              }} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StudentTabBar;
