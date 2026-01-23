import {
  EyeOff, Shield, BarChart3, Code, Workflow, Globe, BookOpen,
  AlertTriangle, Clock, TrendingUp
} from 'lucide-react';

export const tabs = [
  { id: 'threat', label: 'Threat', icon: EyeOff, color: 'red' },
  { id: 'solution', label: 'Solution', icon: Shield, color: 'emerald' },
  { id: 'performance', label: 'Performance', icon: BarChart3, color: 'sky' },
  { id: 'code', label: 'Code', icon: Code, color: 'violet' },
  { id: 'diagram', label: 'Flow', icon: Workflow, color: 'cyan' },
  { id: 'context', label: 'Context', icon: Globe, color: 'slate' },
  { id: 'references', label: 'References', icon: BookOpen, color: 'indigo' }
];

export const urgencyCategories = [
  {
    id: 'critical',
    label: 'CRITICAL NOW',
    color: 'red',
    icon: AlertTriangle,
    description: 'Active threats requiring immediate attention',
    useCaseIds: ['inference', 'ragSecurity', 'apiKeySecurity']
  },
  {
    id: 'high',
    label: 'HIGH PRIORITY',
    color: 'amber',
    icon: Clock,
    description: 'Compliance deadlines approaching',
    useCaseIds: ['modelRegistry', 'trainingData', 'checkpoints']
  },
  {
    id: 'plan',
    label: 'PLAN AHEAD',
    color: 'sky',
    icon: TrendingUp,
    description: 'Emerging threats for your roadmap',
    useCaseIds: ['federatedLearning', 'kvCache', 'gradientSync', 'posteriorTraces']
  }
];
