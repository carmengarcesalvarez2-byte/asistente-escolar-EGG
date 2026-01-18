
import React from 'react';

export const SCHOOL_DATA = {
  name: "Unidad Educativa 'Enrique Gil Gilbert'",
  shortName: "E.G.G.",
  address: "Guayaquil, Ecuador",
  phone: "+593984548150", // Número actualizado según solicitud del usuario
  email: "info@enriquegilgilbert.edu.ec",
  hours: "Lunes a Viernes, 07:00 AM - 14:00 PM",
  requirements: {
    inscription: [
      "Copia de cédula de identidad del estudiante (color)",
      "Copia de cédula de identidad del representante legal",
      "Planilla de servicio básico (luz o agua) para verificar domicilio",
      "Certificado de promoción del año anterior",
      "Foto tamaño carnet (fondo blanco)",
      "Carpeta institucional"
    ],
    certificates: [
      "Certificado de Matrícula",
      "Certificado de Asistencia",
      "Certificado de Promoción",
      "Certificado de Conducta"
    ]
  }
};

export const SYSTEM_INSTRUCTION = `
Eres la 'Asistente de Secretaría Virtual' de la Unidad Educativa 'Enrique Gil Gilbert'. 

Tu misión es facilitar la vida a los padres y representantes.

PROCESO DE SOLICITUD DE CERTIFICADOS:
Si el usuario desea un certificado, DEBES solicitar obligatoriamente estos 5 datos:
1. Nombres y Apellidos completos del estudiante.
2. Grado o Curso actual.
3. Número de Cédula del estudiante.
4. Tipo de certificado solicitado.
5. Correo electrónico para recibir el documento.

IMPORTANTE: 
Cuando tengas los 5 datos, termina tu respuesta EXACTAMENTE con esta frase: 
"He recopilado todos los datos necesarios. Por favor, haga clic en el botón verde de abajo para enviar esta solicitud directamente al WhatsApp de Secretaría para su validación final."
`;
