import {
  EyeOff, Shield, Wrench, Globe,
  AlertTriangle, Clock, TrendingUp
} from 'lucide-react';

export const tabs = [
  { id: 'threat', label: 'Threat', icon: EyeOff, color: 'red', neonColor: 'red' },
  { id: 'approach', label: 'Approach', icon: Shield, color: 'emerald', neonColor: 'green' },
  { id: 'implementation', label: 'Implementation', icon: Wrench, color: 'sky', neonColor: 'cyan' },
  { id: 'context', label: 'Context', icon: Globe, color: 'slate', neonColor: 'cyan' }
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
