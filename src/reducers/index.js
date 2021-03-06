import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import accountReducer from './accountReducer';
import regionsReducer from './regionsReducer';
import usersReducer from './usersReducer';
import materialsReducer from './materialsReducer';
import entityReducer from './entityReducer';
import costSheetsReducer from './costSheetsReducer';
import projectReducer from './projectsReducer';
import toolReducer from './toolsReducer';
import manPowerReducer from './manPowersReducer';
import projectCostSheetReducer from './projectCostSheetReducer';
import jobReducer from './jobsReducer';
import consolidateReducer from './projectConsolidate';

import historyCostMaterialReducer from './reportHistoyCostMaterialReducer';
import historyCostManPowerReducer from './reportHistoyCostManPowerReducer';
import historyCostToolsAndEquipmentReducer from './reportHistoyCostToolsAndEquipmentReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  account: accountReducer,
  regions: regionsReducer,
  materials: materialsReducer,
  entity: entityReducer,
  users: usersReducer,
  costSheets: costSheetsReducer,
  projects: projectReducer,
  tools: toolReducer,
  manPowers: manPowerReducer,
  projectCostSheet: projectCostSheetReducer,
  jobs: jobReducer,
  consolidate: consolidateReducer,
  historyMaterial: historyCostMaterialReducer,
  historyManPower: historyCostManPowerReducer,
  historyTools: historyCostToolsAndEquipmentReducer
});

export default rootReducer;
