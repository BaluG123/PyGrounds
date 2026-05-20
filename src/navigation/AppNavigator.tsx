import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { BarChart3, BookOpen, Braces, Home, Map, Table2, TerminalSquare, User } from 'lucide-react-native';
import type { RootDrawerParamList } from './types';
import { AccountScreen } from '../screens/AccountScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { PlaygroundScreen } from '../screens/PlaygroundScreen';
import { RoadmapScreen } from '../screens/RoadmapScreen';
import { CourseStack } from './CourseStack';
import { colors } from '../theme/theme';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const iconProps = { strokeWidth: 2.3 };

function HomeIcon({ color, size }: { color: string; size: number }) {
  return <Home color={color} size={size} {...iconProps} />;
}

function NumPyIcon({ color, size }: { color: string; size: number }) {
  return <Braces color={color} size={size} {...iconProps} />;
}

function PandasIcon({ color, size }: { color: string; size: number }) {
  return <Table2 color={color} size={size} {...iconProps} />;
}

function MatplotlibIcon({ color, size }: { color: string; size: number }) {
  return <BarChart3 color={color} size={size} {...iconProps} />;
}

function RoadmapIcon({ color, size }: { color: string; size: number }) {
  return <Map color={color} size={size} {...iconProps} />;
}

function PlaygroundIcon({ color, size }: { color: string; size: number }) {
  return <TerminalSquare color={color} size={size} {...iconProps} />;
}

function AccountIcon({ color, size }: { color: string; size: number }) {
  return <User color={color} size={size} {...iconProps} />;
}

function NumPyStack() {
  return <CourseStack courseId="numpy" />;
}

function PandasStack() {
  return <CourseStack courseId="pandas" />;
}

function MatplotlibStack() {
  return <CourseStack courseId="matplotlib" />;
}

function DrawerHeader(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.brand}>
        <BookOpen color={colors.yellow} size={28} />
        <Text style={styles.brandTitle}>PyGrounds</Text>
        <Text style={styles.brandSub}>AI foundations lab</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={DrawerHeader}
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: '900' },
          drawerActiveTintColor: colors.green,
          drawerInactiveTintColor: colors.ink,
          drawerLabelStyle: { fontWeight: '800' },
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ drawerIcon: HomeIcon }}
        />
        <Drawer.Screen
          name="NumPy"
          component={NumPyStack}
          options={{ drawerIcon: NumPyIcon }}
        />
        <Drawer.Screen
          name="Pandas"
          component={PandasStack}
          options={{ drawerIcon: PandasIcon }}
        />
        <Drawer.Screen
          name="Matplotlib"
          component={MatplotlibStack}
          options={{ drawerIcon: MatplotlibIcon }}
        />
        <Drawer.Screen
          name="Roadmap"
          component={RoadmapScreen}
          options={{ drawerIcon: RoadmapIcon }}
        />
        <Drawer.Screen
          name="Playground"
          component={PlaygroundScreen}
          options={{ drawerIcon: PlaygroundIcon }}
        />
        <Drawer.Screen
          name="Account"
          component={AccountScreen}
          options={{ drawerIcon: AccountIcon }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  brand: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    marginBottom: 8,
  },
  brandTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 10,
  },
  brandSub: {
    color: colors.muted,
    marginTop: 4,
  },
});
