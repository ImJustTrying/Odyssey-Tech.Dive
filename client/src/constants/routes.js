// Public routes
const HOME = '/';
const ABOUT = '/about';
const SIGN_UP = '/signup';
const LOG_IN = '/login';

// Post routes
const ITEMS = '/items';
const EXAMS = '/exams';
const PATIENTS = '/patients';

const ITEM = '/item/:id';
const EXAM = '/exam/:id';
const PATIENT = '/patient/:id';

const ITEM_INSERT = '/item/create';
const ITEM_UPDATE = '/item/update/:id';


const EXAM_INSERT = '/exam/create';
const EXAM_UPDATE = '/exam/update/:id';

const PATIENT_INSERT = '/patient/create';
const PATIENT_UPDATE = '/patient/:id/:field/:value';


export const routes = {
  HOME,
  ABOUT,
  SIGN_UP,
  LOG_IN,

  ITEMS,
  EXAMS,
  PATIENTS,

  ITEM,
  EXAM,
  ITEM_INSERT,
  ITEM_UPDATE,
  EXAM_INSERT,
  EXAM_UPDATE,
};
