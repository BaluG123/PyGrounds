import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {
  BarChart3,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  Puzzle,
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
  X,
  MessageCircle,
} from 'lucide-react-native';
import type { RootDrawerParamList } from './types';
import { AccountScreen } from '../screens/AccountScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { PlaygroundScreen } from '../screens/PlaygroundScreen';
import { ProblemSolvingScreen } from '../screens/ProblemSolvingScreen';
import { RoadmapScreen } from '../screens/RoadmapScreen';
import { CourseStack } from './CourseStack';
import { RefreshMindStack } from './RefreshMindStack';
import { AcademicStack } from './AcademicStack';
import { colors } from '../theme/theme';
import { ensureFirebaseApp } from '../services/firebase';
import { BRAND } from '../constants/brand';
import { openWhatsAppSupport } from '../services/whatsappSupport';

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
function GraduationCapIcon({ color, size }: { color: string; size: number }) {
  return <BookOpen color={color} size={size} {...iconProps} />;
}
function MathTheoryIcon({ color, size }: { color: string; size: number }) {
  return <BookOpen color={color} size={size} {...iconProps} />;
}
function LinearAlgebraIcon({ color, size }: { color: string; size: number }) {
  return <Grid3x3 color={color} size={size} {...iconProps} />;
}
function MachineLearningIcon({ color, size }: { color: string; size: number }) {
  return <Workflow color={color} size={size} {...iconProps} />;
}
function SklearnIcon({ color, size }: { color: string; size: number }) {
  return <Cpu color={color} size={size} {...iconProps} />;
}
function DeepLearningIcon({ color, size }: { color: string; size: number }) {
  return <Brain color={color} size={size} {...iconProps} />;
}
function NLPIcon({ color, size }: { color: string; size: number }) {
  return <MessageCircle color={color} size={size} {...iconProps} />;
}
function GenAIIcon({ color, size }: { color: string; size: number }) {
  return <Sparkles color={color} size={size} {...iconProps} />;
}
function ComputerVisionIcon({ color, size }: { color: string; size: number }) {
  return <Grid3x3 color={color} size={size} {...iconProps} />;
}
function ReinforcementLearningIcon({ color, size }: { color: string; size: number }) {
  return <Brain color={color} size={size} {...iconProps} />;
}
function AIEngineeringIcon({ color, size }: { color: string; size: number }) {
  return <Cpu color={color} size={size} {...iconProps} />;
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
function ProblemSolvingIcon({ color, size }: { color: string; size: number }) {
  return <Puzzle color={color} size={size} {...iconProps} />;
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
function MasterAIHubStack() { return <AcademicStack />; }
function AcademicDeepDiveStack() { return <AcademicStack />; }
function LinearAlgebraStack() { return <CourseStack courseId="math-ai" />; }
function MachineLearningStack() { return <CourseStack courseId="machine-learning" />; }
function SklearnStack() { return <CourseStack courseId="scikit-learn" />; }
function DeepLearningStack() { return <CourseStack courseId="deep-learning" />; }
function NLPStack() { return <CourseStack courseId="nlp" />; }
function GenAIStack() { return <CourseStack courseId="genai" />; }
function ComputerVisionStack() { return <CourseStack courseId="computer-vision" />; }
function ReinforcementLearningStack() { return <CourseStack courseId="reinforcement-learning" />; }
function AIEngineeringStack() { return <CourseStack courseId="ai-engineering" />; }
function AIProjectsStack() { return <CourseStack courseId="ai-projects" />; }

type DrawerRouteName = keyof RootDrawerParamList;
type DrawerMenuItem = {
  route: DrawerRouteName;
  label: string;
  detail: string;
  Icon: (props: { color: string; size: number }) => React.JSX.Element;
};
type DrawerMenuSection = {
  id: string;
  title: string;
  subtitle: string;
  Icon: (props: { color: string; size: number }) => React.JSX.Element;
  color: string;
  items: DrawerMenuItem[];
};

const drawerMenu: DrawerMenuSection[] = [
  {
    id: 'python',
    title: 'Python',
    subtitle: 'Basics to advanced coding',
    Icon: PythonBasicsIcon,
    color: colors.green,
    items: [
      { route: 'Python Basics', label: 'Basics', detail: 'Syntax, loops, functions, data structures', Icon: PythonBasicsIcon },
      { route: 'Python Advanced', label: 'Advanced', detail: 'OOP, decorators, generators, errors', Icon: PythonAdvancedIcon },
    ],
  },
  {
    id: 'datascience',
    title: 'Data Science Prerequisites',
    subtitle: 'Core frameworks before AI',
    Icon: PandasIcon,
    color: colors.blue,
    items: [
      { route: 'NumPy', label: 'NumPy', detail: 'Arrays, vectors, numerical computing', Icon: NumPyIcon },
      { route: 'Pandas', label: 'Pandas', detail: 'DataFrames, cleaning, analysis', Icon: PandasIcon },
      { route: 'Matplotlib', label: 'Matplotlib', detail: 'Plots, charts, visual thinking', Icon: MatplotlibIcon },
    ],
  },
  {
    id: 'math',
    title: 'Math',
    subtitle: 'AI math foundations',
    Icon: MathIcon,
    color: colors.violet,
    items: [
      { route: 'Math for AI', label: 'Math for AI', detail: 'Linear algebra, stats, probability, theory & labs', Icon: MathIcon },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Models, metrics, and production basics',
    Icon: MachineLearningIcon,
    color: '#0F8B8D',
    items: [
      { route: 'Machine Learning', label: 'ML Concepts', detail: 'Regression, classification, clustering', Icon: MachineLearningIcon },
      { route: 'Scikit-Learn', label: 'Scikit-Learn', detail: 'Pipelines, metrics, validation', Icon: SklearnIcon },
      { route: 'Deep Learning', label: 'Deep Learning', detail: 'Neural nets, backprop, tensors', Icon: DeepLearningIcon },
    ],
  },
  {
    id: 'modern-ai',
    title: 'Specializations',
    subtitle: 'Language, vision, agents, decisions',
    Icon: GenAIIcon,
    color: colors.coral,
    items: [
      { route: 'NLP', label: 'NLP', detail: 'Basics, advanced tasks, transformers', Icon: NLPIcon },
      { route: 'GenAI', label: 'GenAI', detail: 'LLMs, chatbots, RAG, agents', Icon: GenAIIcon },
      { route: 'Computer Vision', label: 'Computer Vision', detail: 'CNNs, detection, segmentation', Icon: ComputerVisionIcon },
      { route: 'Reinforcement Learning', label: 'RL', detail: 'Agents, rewards, policies, Q-learning', Icon: ReinforcementLearningIcon },
    ],
  },
  {
    id: 'production',
    title: 'AI Engineering',
    subtitle: 'Ship safe production AI',
    Icon: AIEngineeringIcon,
    color: colors.navy,
    items: [
      { route: 'AI Engineering', label: 'MLOps and LLMOps', detail: 'Evals, monitoring, safety, cost', Icon: AIEngineeringIcon },
      { route: 'AI Projects', label: 'Capstone Projects', detail: 'Portfolio-ready end-to-end builds', Icon: AIProjectsIcon },
    ],
  },
];

const featuredRoutes: DrawerMenuItem[] = [
  { route: 'Master AI Hub', label: 'Master AI Hub', detail: 'Theory · Labs · Quizzes', Icon: GraduationCapIcon },
  { route: 'Roadmap', label: 'Roadmap', detail: 'Your zero-to-hero path', Icon: RoadmapIcon },
  { route: 'Refresh Mind', label: 'Quick Quiz', detail: 'Fast recall drills', Icon: RefreshMindIcon },
];
const utilityRoutes: DrawerMenuItem[] = [
  { route: 'Problem Solving', label: 'Challenges', detail: 'Coding patterns & practice', Icon: ProblemSolvingIcon },
  { route: 'Playground', label: 'Playground', detail: 'Run Python live', Icon: PlaygroundIcon },
  { route: 'Account', label: 'Account', detail: 'Progress & settings', Icon: AccountIcon },
];

function getSafeUser(): FirebaseAuthTypes.User | null {
  try {
    return firebase.apps.length ? auth().currentUser : null;
  } catch {
    return null;
  }
}

function DrawerHeader(props: any) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(getSafeUser());
  const [openSection, setOpenSection] = useState('python');
  const activeRouteName = props.state.routeNames[props.state.index];

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let active = true;

    ensureFirebaseApp()
      .then(() => {
        if (active) {
          unsubscribe = auth().onAuthStateChanged(setUser);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  function handleWhatsAppSupport() {
    openWhatsAppSupport().then(opened => {
      if (opened) {
        props.navigation.dispatch(DrawerActions.closeDrawer());
      }
    });
  }

  function navigateTo(routeName: DrawerRouteName) {
    props.navigation.dispatch({
      ...CommonActions.navigate(routeName),
      target: props.state.key,
    });
    requestAnimationFrame(() => {
      props.navigation.dispatch(DrawerActions.closeDrawer());
    });
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.brand}>
        <View style={styles.brandRow}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <User color={colors.muted} size={22} />
            </View>
          )}
          <View style={styles.brandLeft}>
            <View style={styles.brandTitleRow}>
              <Image source={require('../assets/neuralearn-logo.png')} style={styles.brandLogo} />
              <View>
                <Text style={styles.brandTitle}>{BRAND.appName}</Text>
                <Text style={styles.brandSub}>{BRAND.drawerSubtitle}</Text>
              </View>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close navigation menu"
            style={styles.closeButton}
            onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
          >
            <X color={colors.ink} size={20} />
          </Pressable>
        </View>
        {user ? (
          <Text style={styles.userName} numberOfLines={1}>{user.displayName ?? user.email}</Text>
        ) : null}
      </View>
      <View style={styles.drawerItems}>
        <Pressable
          style={[styles.homeItem, activeRouteName === 'Dashboard' && styles.homeItemActive]}
          onPress={() => navigateTo('Dashboard')}
        >
          <HomeIcon color={activeRouteName === 'Dashboard' ? colors.surface : colors.ink} size={20} />
          <View style={styles.homeText}>
            <Text style={[styles.homeTitle, activeRouteName === 'Dashboard' && styles.homeTitleActive]}>Dashboard</Text>
            <Text style={[styles.homeDetail, activeRouteName === 'Dashboard' && styles.homeDetailActive]}>Your learning command center</Text>
          </View>
        </Pressable>

        <Text style={styles.drawerEyebrow}>Featured</Text>
        <View style={styles.featuredRow}>
          {featuredRoutes.map(item => {
            const ItemIcon = item.Icon;
            const focused = activeRouteName === item.route;
            return (
              <Pressable
                key={item.route}
                style={[styles.featuredPill, focused && styles.featuredPillActive]}
                onPress={() => navigateTo(item.route)}
              >
                <ItemIcon color={focused ? colors.surface : colors.navy} size={18} />
                <Text style={[styles.featuredLabel, focused && styles.featuredLabelActive]} numberOfLines={1}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.drawerEyebrow}>Curriculum</Text>
        {drawerMenu.map(section => {
          const expanded = openSection === section.id;
          const activeInSection = section.items.some(item => item.route === activeRouteName);
          const SectionIcon = section.Icon;

          return (
            <View key={section.id} style={[styles.menuSection, activeInSection && styles.menuSectionActive]}>
              <Pressable
                style={styles.menuSectionHeader}
                onPress={() => setOpenSection(expanded ? '' : section.id)}
              >
                <View style={[styles.sectionIconWrap, { backgroundColor: section.color }]}>
                  <SectionIcon color={colors.surface} size={18} />
                </View>
                <View style={styles.sectionCopy}>
                  <Text style={styles.sectionName}>{section.title}</Text>
                  <Text style={styles.sectionSub} numberOfLines={1}>{section.subtitle}</Text>
                </View>
                {expanded ? <ChevronDown color={section.color} size={20} /> : <ChevronRight color={colors.muted} size={20} />}
              </Pressable>

              {expanded ? (
                <View style={styles.sectionItems}>
                  {section.items.map(item => {
                    const ItemIcon = item.Icon;
                    const focused = activeRouteName === item.route;
                    return (
                      <Pressable
                        key={item.route}
                        style={[styles.menuItem, focused && { backgroundColor: section.color }]}
                        onPress={() => navigateTo(item.route)}
                      >
                        <ItemIcon color={focused ? colors.surface : section.color} size={18} />
                        <View style={styles.menuItemCopy}>
                          <Text style={[styles.menuItemLabel, focused && styles.menuItemLabelActive]}>{item.label}</Text>
                          <Text style={[styles.menuItemDetail, focused && styles.menuItemDetailActive]} numberOfLines={1}>{item.detail}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        })}

        <Text style={styles.drawerEyebrow}>Tools</Text>
        <View style={styles.utilityGrid}>
          {utilityRoutes.map(item => {
            const ItemIcon = item.Icon;
            const focused = activeRouteName === item.route;
            return (
              <Pressable
                key={item.route}
                style={[styles.utilityItem, focused && styles.utilityItemActive]}
                onPress={() => navigateTo(item.route)}
              >
                <ItemIcon color={focused ? colors.surface : colors.ink} size={18} />
                <Text style={[styles.utilityLabel, focused && styles.utilityLabelActive]} numberOfLines={1}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.drawerFooter}>
        <Pressable style={styles.whatsappButton} onPress={handleWhatsAppSupport}>
          <MessageCircle color="#FFFFFF" size={20} />
          <Text style={styles.whatsappText}>Need Help? Contact Support</Text>
        </Pressable>
      </View>
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
          drawerType: 'front',
          overlayColor: 'rgba(16, 32, 24, 0.28)',
          swipeEdgeWidth: 42,
        }}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ drawerIcon: HomeIcon }} />
        <Drawer.Screen name="Python Basics" component={PythonBasicsStack} options={{ drawerIcon: PythonBasicsIcon }} />
        <Drawer.Screen name="Python Advanced" component={PythonAdvancedStack} options={{ drawerIcon: PythonAdvancedIcon }} />
        <Drawer.Screen name="NumPy" component={NumPyStack} options={{ drawerIcon: NumPyIcon }} />
        <Drawer.Screen name="Pandas" component={PandasStack} options={{ drawerIcon: PandasIcon }} />
        <Drawer.Screen name="Matplotlib" component={MatplotlibStack} options={{ drawerIcon: MatplotlibIcon }} />
        <Drawer.Screen name="Math for AI" component={MathAIStack} options={{ drawerIcon: MathIcon }} />
        <Drawer.Screen name="Master AI Hub" component={MasterAIHubStack} options={{ drawerIcon: GraduationCapIcon, title: 'Master AI Hub' }} />
        <Drawer.Screen name="Academic Deep Dive" component={AcademicDeepDiveStack} options={{ drawerItemStyle: { display: 'none' }, title: 'Master AI Hub' }} />
        <Drawer.Screen name="Math Theory Guide" component={MasterAIHubStack} options={{ drawerItemStyle: { display: 'none' }, title: 'Master AI Hub' }} />
        <Drawer.Screen name="Linear Algebra" component={LinearAlgebraStack} options={{ drawerItemStyle: { display: 'none' }, title: 'Math for AI' }} />
        <Drawer.Screen name="Machine Learning" component={MachineLearningStack} options={{ drawerIcon: MachineLearningIcon }} />
        <Drawer.Screen name="Scikit-Learn" component={SklearnStack} options={{ drawerIcon: SklearnIcon }} />
        <Drawer.Screen name="Deep Learning" component={DeepLearningStack} options={{ drawerIcon: DeepLearningIcon }} />
        <Drawer.Screen name="NLP" component={NLPStack} options={{ drawerIcon: NLPIcon }} />
        <Drawer.Screen name="GenAI" component={GenAIStack} options={{ drawerIcon: GenAIIcon }} />
        <Drawer.Screen name="Computer Vision" component={ComputerVisionStack} options={{ drawerIcon: ComputerVisionIcon }} />
        <Drawer.Screen name="Reinforcement Learning" component={ReinforcementLearningStack} options={{ drawerIcon: ReinforcementLearningIcon }} />
        <Drawer.Screen name="AI Engineering" component={AIEngineeringStack} options={{ drawerIcon: AIEngineeringIcon }} />
        <Drawer.Screen name="AI Projects" component={AIProjectsStack} options={{ drawerIcon: AIProjectsIcon }} />
        <Drawer.Screen name="Roadmap" component={RoadmapScreen} options={{ drawerIcon: RoadmapIcon }} />
        <Drawer.Screen name="Problem Solving" component={ProblemSolvingScreen} options={{ drawerIcon: ProblemSolvingIcon }} />
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
    alignItems: 'center',
    gap: 12,
  },
  brandLeft: {
    flex: 1,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
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
  drawerItems: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 16,
  },
  drawerLabel: {
    fontWeight: '800',
  },
  homeItem: {
    minHeight: 64,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  homeItemActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  homeText: {
    flex: 1,
  },
  homeTitle: {
    color: colors.ink,
    fontWeight: '900',
    fontSize: 15,
  },
  homeTitleActive: {
    color: colors.surface,
  },
  homeDetail: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  homeDetailActive: {
    color: '#EAF7F1',
  },
  featuredRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  featuredPill: {
    flexGrow: 1,
    flexBasis: '30%',
    minWidth: 100,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 6,
  },
  featuredPillActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  featuredLabel: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
  },
  featuredLabelActive: {
    color: colors.surface,
  },
  drawerEyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 2,
  },
  menuSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 10,
    overflow: 'hidden',
  },
  menuSectionActive: {
    borderColor: '#B8CCC3',
  },
  menuSectionHeader: {
    minHeight: 66,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCopy: {
    flex: 1,
  },
  sectionName: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  sectionSub: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
  },
  sectionItems: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    padding: 8,
    gap: 6,
  },
  menuItem: {
    minHeight: 54,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  menuItemCopy: {
    flex: 1,
  },
  menuItemLabel: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '900',
  },
  menuItemLabelActive: {
    color: colors.surface,
  },
  menuItemDetail: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  menuItemDetailActive: {
    color: '#F5FBF8',
  },
  utilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  utilityItem: {
    width: '48%',
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    gap: 6,
  },
  utilityItemActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  utilityLabel: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '900',
  },
  utilityLabelActive: {
    color: colors.surface,
  },
  drawerFooter: {
    marginTop: 'auto',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  whatsappText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
});
