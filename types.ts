
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isAction?: boolean;
}

export interface SchoolInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export enum CertificateType {
  INSCRIPCION = 'Certificado de Inscripción',
  ESTUDIOS = 'Certificado de Estudios',
  CONDUCTA = 'Certificado de Conducta',
  CALIFICACIONES = 'Boleta de Calificaciones'
}

export interface CertificateRequest {
  studentName: string;
  grade: string;
  idNumber: string;
  type: CertificateType;
}
