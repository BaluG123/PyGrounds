import type { AcademicLab } from '../../../types/academic';
import { mathAcademicLabs } from './labs-math';
import { pythonLabs } from './labs-python';
import { dataScienceLabs } from './labs-dataScience';
import { mlLabs, dlLabs } from './labs-ml-dl';
import { specializationLabs, engineeringLabs, capstoneLabs } from './labs-specializations-engineering';

export const ACADEMIC_LABS: AcademicLab[] = [
  ...pythonLabs,
  ...dataScienceLabs,
  ...mathAcademicLabs,
  ...mlLabs,
  ...dlLabs,
  ...specializationLabs,
  ...engineeringLabs,
  ...capstoneLabs,
];
