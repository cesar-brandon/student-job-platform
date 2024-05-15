import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    id: "question-1",
    question:
      "¿Estás al tanto de la idea de la plataforma de empleo y prácticas?",
    options: [
      {
        id: "1-option-1",
        value: "Sí",
      },
      {
        id: "1-option-2",
        value: "No",
      },
    ],
    answer: null,
  },
  {
    id: "question-2",
    question: "¿Qué opinas sobre la idea de tener esta plataforma?",
    options: [
      {
        id: "2-option-1",
        value: "Excelente idea",
      },
      {
        id: "2-option-2",
        value: "Buena, pero necesito más detalles",
      },
      {
        id: "2-option-3",
        value: "No me parece relevante",
      },
      {
        id: "2-option-4",
        value: "No estoy seguro/a",
      },
    ],
    answer: null,
  },
  {
    id: "question-3",
    question: "¿Crees que sería beneficiosa para tu desarrollo profesional?",
    options: [
      {
        id: "3-option-1",
        value: "Sí, definitivamente",
      },
      {
        id: "3-option-2",
        value: "Sí, en cierta medida",
      },
      {
        id: "3-option-3",
        value: "No, no lo creo",
      },
      {
        id: "3-option-4",
        value: "No estoy seguro/a",
      },
    ],
    answer: null,
  },
  {
    id: "question-4",
    question: "¿Estarías interesado/a en utilizarla si estuviera disponible?",
    options: [
      {
        id: "4-option-1",
        value: "Sí, definitivamente",
      },
      {
        id: "4-option-2",
        value: "Sí, podría considerarlo",
      },
      {
        id: "4-option-3",
        value: "No, probablemente no",
      },
      {
        id: "4-option-4",
        value: "No estoy seguro/a",
      },
    ],
    answer: null,
  },
  {
    id: "question-5",
    question:
      "¿Qué características te parecen más importantes? (Selecciona todas las que correspondan)",
    options: [
      {
        id: "5-option-1",
        value: "Búsqueda de ofertas de empleo y prácticas",
      },
      {
        id: "5-option-2",
        value: "Postulación a oportunidades",
      },
      {
        id: "5-option-3",
        value: "Notificaciones por correo electrónico",
      },
      {
        id: "5-option-4",
        value: "Programas de desarrollo profesional",
      },
      {
        id: "5-option-5",
        value: "Interacción con empleadores",
      },
      {
        id: "5-option-6",
        value: "Otra (especifica): ________",
      },
    ],
    answer: [],
  },
  {
    id: "question-6",
    question: "¿Algún comentario adicional o sugerencia?",
    answer: "",
  },
];
