import {
  EyeOff, Shield, BarChart3, Code, Workflow, Globe, BookOpen,
  AlertTriangle, Clock, TrendingUp
} from 'lucide-react';

export const tabs = [
  { id: 'threat', label: 'Threat', icon: EyeOff, color: 'red', neonColor: 'red' },
  { id: 'solution', label: 'Solution', icon: Shield, color: 'emerald', neonColor: 'green' },
  { id: 'performance', label: 'Performance', icon: BarChart3, color: 'sky', neonColor: 'cyan' },
  { id: 'code', label: 'Code', icon: Code, color: 'violet', neonColor: 'magenta' },
  { id: 'diagram', label: 'Flow', icon: Workflow, color: 'cyan', neonColor: 'cyan' },
  { id: 'context', label: 'Context', icon: Globe, color: 'slate', neonColor: 'cyan' },
  { id: 'references', label: 'References', icon: BookOpen, color: 'indigo', neonColor: 'magenta' }
];

export const urgencyCategories = [
  {
    id: 'critical',
    label: 'CRITICAL NOW',
    color: 'red',
    neonColor: 'red',
    icon: AlertTriangle,
    description: 'Active threats requiring immediate attention',
    useCaseIds: ['inference', 'ragSecurity', 'apiKeySecurity']
  },
  {
    id: 'high',
    label: 'HIGH PRIORITY',
    color: 'amber',
    neonColor: 'amber',
    icon: Clock,
    description: 'Compliance deadlines approaching',
    useCaseIds: ['modelRegistry', 'trainingData', 'checkpoints']
  },
  {
    id: 'plan',
    label: 'PLAN AHEAD',
    color: 'sky',
    neonColor: 'cyan',
    icon: TrendingUp,
    description: 'Emerging threats for your roadmap',
    useCaseIds: ['federatedLearning', 'kvCache', 'gradientSync', 'posteriorTraces']
  }
];
