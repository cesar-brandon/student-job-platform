import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    question:
      "¿Estás al tanto de la idea de la plataforma de empleo y prácticas?",
    options: ["Sí", "No"],
    answer: null,
  },
  {
    question: "¿Qué opinas sobre la idea de tener esta plataforma?",
    options: [
      "Excelente idea",
      "Buena, pero necesito más detalles",
      "No me parece relevante",
      "No estoy seguro/a",
    ],
    answer: null,
  },
  {
    question: "¿Crees que sería beneficiosa para tu desarrollo profesional?",
    options: [
      "Sí, definitivamente",
      "Sí, en cierta medida",
      "No, no lo creo",
      "No estoy seguro/a",
    ],
    answer: null,
  },
  {
    question: "¿Estarías interesado/a en utilizarla si estuviera disponible?",
    options: [
      "Sí, definitivamente",
      "Sí, podría considerarlo",
      "No, probablemente no",
      "No estoy seguro/a",
    ],
    answer: null,
  },
  {
    question:
      "¿Qué características te parecen más importantes? (Selecciona todas las que correspondan)",
    options: [
      "Búsqueda de ofertas de empleo y prácticas",
      "Postulación a oportunidades",
      "Notificaciones por correo electrónico",
      "Programas de desarrollo profesional",
      "Interacción con empleadores",
      "Otra (especifica): ________",
    ],
    answer: [],
  },
  {
    question: "¿Algún comentario adicional o sugerencia?",
    answer: "",
  },
];
