import { localStg } from '../utils/storage';

export function getJobList() {
  return localStg.get('workflow')?.jobList || [];
}

export function clearFLowStorage() {
  localStg.remove('workflow');
}
