import { MutableRefObject } from "react";

export interface JWTUserBackend {
  id: string;
  email: string;
  role: string;
  branch: string;
  exp: number;
}

export interface FunctionProps {
  name: string;
  function: () => void;
}

export interface PageProps {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export interface TopicFormsProps {
  TopicAssessment: FormDetailProps[];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface FormDetailProps {
  id: number;
  topic: string;
  week: number;
  level: number;
}


export interface CourseProps {
  Course: string[];
}

export interface SearchStudentProps {
  id: number;
  nameTH: string;
  nicknameTH: string
}

export interface FormAssessmentProps {
  id: number;
  topic: string;
  week: string;
  Fields: FieldQuestionProps[];
}

// Assessment-status
export interface StatusNotSendProps{
  data: StudentStatusNotSendProps[]
  meta: {
    page: number;
    pageSize: number,
    pageCount: number,
    total: number
  }
}

export interface AssessmentStatusProps {
  topic: StatusProps[];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StatusNotApproveProps{
  list: CellStatusNotApproveProps[],
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
}

export interface StatusProps {
  id: number;
  class: number;
  week: string | number;
  topic: string;
  branch: string;
  userCount: number;
  Missing: number;
  apporveFeedbackCount: number;
}

export interface CellStatusNotApproveProps{
  id: number,
  student: StudentUserProps;
  employee: EmployeeUserProps;
  feedback: string;
  apporove?: boolean;
  date: string
}

export interface StudentUserProps{
  id: number;
  name: string;
}

export interface EmployeeUserProps{
  id: number;
  name: string;
  telephone: string;
  email: string;
}

export interface StudentStatusNotSendProps extends SearchStudentProps{
  nicknameTH: string
  hasAnswers?: boolean
}

export interface FieldQuestionProps {
  id: number;
  topic: string;
  ratio: number;
  question: string[];
  description: string[];
  handleScore?: (id: number, score: number) => void;
}

export interface StudentScore {
  id: number;
  score: {
    id: number;
    value: number;
  }[];
}

export interface FieldScore extends FieldQuestionProps {
  fieldScore: {
    id: number;
    value: number;
  }[];
}

export interface BranchProps {
  nameBranch: string[];
}
