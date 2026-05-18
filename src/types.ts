export enum CompetenceArea {
  COMMUNICATION = 'communication',
  EMPATHY = 'empathy',
  TEAMWORK = 'teamwork',
  SELF_REGULATION = 'self_regulation',
  CONFLICT_RESOLUTION = 'conflict_resolution'
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  area: CompetenceArea;
  ageRange: string;
  duration: string;
  steps: string[];
}

export interface TheoryTopic {
  id: string;
  title: string;
  category: string;
  content: string;
  icon: string;
}

export interface CompetenceInfo {
  id: CompetenceArea;
  title: string;
  description: string;
  icon: string;
  color: string;
}
