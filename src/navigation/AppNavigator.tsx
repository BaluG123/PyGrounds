import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {
  BarChart3,
  BookOpen,
  Brain,
  Braces,
  Code2,
  Cpu,
  Grid3x3,
  Home,
  Map,
  Rocket,
  Sigma,
  Table2,
  TerminalSquare,
  User,
  Workflow,
  Sparkles,
} from 'lucide-react-native';
import type { RootDrawerParamList } from './types';
import { AccountScreen } from '../screens/AccountScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { PlaygroundScreen } from '../screens/PlaygroundScreen';
import { RoadmapScreen } from '../screens/RoadmapScreen';
import { CourseStack } from './CourseStack';
import { RefreshMindStack } from './RefreshMindStack';
import { colors } from '../theme/theme';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const iconProps = { strokeWidth: 2.3 };

function HomeIcon({ color, size }: { color: string; size: number }) {
  return <Home color={color} size={size} {...iconProps} />;
}
function PythonBasicsIcon({ color, size }: { color: string; size: number }) {
  return <Code2 color={color} size={size} {...iconProps} />;
}
function PythonAdvancedIcon({ color, size }: { color: string; size: number }) {
  return <Workflow color={color} size={size} {...iconProps} />;
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
function MathIcon({ color, size }: { color: string; size: number }) {
  return <Sigma color={color} size={size} {...iconProps} />;
}
function LinearAlgebraIcon({ color, size }: { color: string; size: number }) {
  return <Grid3x3 color={color} size={size} {...iconProps} />;
}
function SklearnIcon({ color, size }: { color: string; size: number }) {
  return <Cpu color={color} size={size} {...iconProps} />;
}
function DeepLearningIcon({ color, size }: { color: string; size: number }) {
  return <Brain color={color} size={size} {...iconProps} />;
}
function AIProjectsIcon({ color, size }: { color: string; size: number }) {
  return <Rocket color={color} size={size} {...iconProps} />;
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
function RefreshMindIcon({ color, size }: { color: string; size: number }) {
  return <Sparkles color={color} size={size} {...iconProps} />;
}

function PythonBasicsStack() { return <CourseStack courseId="python-basics" />; }
function PythonAdvancedStack() { return <CourseStack courseId="python-advanced" />; }
function NumPyStack() { return <CourseStack courseId="numpy" />; }
function PandasStack() { return <CourseStack courseId="pandas" />; }
function MatplotlibStack() { return <CourseStack courseId="matplotlib" />; }
function MathAIStack() { return <CourseStack courseId="math-ai" />; }
function LinearAlgebraStack() { return <CourseStack courseId="linear-algebra" />; }
function SklearnStack() { return <CourseStack courseId="scikit-learn" />; }
function DeepLearningStack() { return <CourseStack courseId="deep-learning" />; }
function AIProjectsStack() { return <CourseStack courseId="ai-projects" />; }

function getSafeUser(): FirebaseAuthTypes.User | null {
  try {
    return firebase.apps.length ? auth().currentUser : null;
  } catch (e) {
    return null;
  }
}

function DrawerHeader(props: any) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(getSafeUser());

  useEffect(() => {
    if (firebase.apps.length) {
      return auth().onAuthStateChanged(setUser);
    }
  }, []);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.brand}>
        <View style={styles.brandRow}>
          <View style={styles.brandLeft}>
            <BookOpen color={colors.yellow} size={28} />
            <Text style={styles.brandTitle}>PyGrounds</Text>
            <Text style={styles.brandSub}>AI & Python Learning Lab</Text>
          </View>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <User color={colors.muted} size={22} />
            </View>
          )}
        </View>
        {user ? (
          <Text style={styles.userName} numberOfLines={1}>{user.displayName ?? user.email}</Text>
        ) : null}
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
        <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ drawerIcon: HomeIcon }} />
        <Drawer.Screen name="Python Basics" component={PythonBasicsStack} options={{ drawerIcon: PythonBasicsIcon }} />
        <Drawer.Screen name="Python Advanced" component={PythonAdvancedStack} options={{ drawerIcon: PythonAdvancedIcon }} />
        <Drawer.Screen name="NumPy" component={NumPyStack} options={{ drawerIcon: NumPyIcon }} />
        <Drawer.Screen name="Pandas" component={PandasStack} options={{ drawerIcon: PandasIcon }} />
        <Drawer.Screen name="Matplotlib" component={MatplotlibStack} options={{ drawerIcon: MatplotlibIcon }} />
        <Drawer.Screen name="Math for AI" component={MathAIStack} options={{ drawerIcon: MathIcon }} />
        <Drawer.Screen name="Linear Algebra" component={LinearAlgebraStack} options={{ drawerIcon: LinearAlgebraIcon }} />
        <Drawer.Screen name="Scikit-Learn" component={SklearnStack} options={{ drawerIcon: SklearnIcon }} />
        <Drawer.Screen name="Deep Learning" component={DeepLearningStack} options={{ drawerIcon: DeepLearningIcon }} />
        <Drawer.Screen name="AI Projects" component={AIProjectsStack} options={{ drawerIcon: AIProjectsIcon }} />
        <Drawer.Screen name="Roadmap" component={RoadmapScreen} options={{ drawerIcon: RoadmapIcon }} />
        <Drawer.Screen name="Playground" component={PlaygroundScreen} options={{ drawerIcon: PlaygroundIcon }} />
        <Drawer.Screen name="Refresh Mind" component={RefreshMindStack} options={{ drawerIcon: RefreshMindIcon }} />
        <Drawer.Screen name="Account" component={AccountScreen} options={{ drawerIcon: AccountIcon }} />
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
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandLeft: {
    flex: 1,
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
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.green,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.line,
  },
  userName: {
    color: colors.green,
    fontWeight: '700',
    fontSize: 13,
    marginTop: 8,
  },
});
