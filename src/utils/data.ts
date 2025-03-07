
// Mock data for Enoia Barre Studio admin dashboard

// Class types
export const classTypes = [
  "Barre Clásico",
  "Barre Flow",
  "Barre Intenso",
  "Barre Sculpt",
  "Stretch & Relax",
  "Prenatal Barre",
];

// Intensity levels
export const intensityLevels = ["Baja", "Media", "Fuerte"];

// Mock instructors
export const instructors = [
  {
    id: 1,
    name: "Valentina Ortega",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    bio: "Certificada en técnica clásica de ballet y barre. 8 años de experiencia.",
    email: "valentina@enoiabarre.com",
    phone: "+34 612 345 678",
  },
  {
    id: 2,
    name: "Carmen Díaz",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    bio: "Especialista en pilates y barre fusion. Enfoque en rehabilitación.",
    email: "carmen@enoiabarre.com",
    phone: "+34 623 456 789",
  },
  {
    id: 3,
    name: "Lucía Fernández",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    bio: "Formada en danza contemporánea y yoga. Creadora del método Barre Flow.",
    email: "lucia@enoiabarre.com",
    phone: "+34 634 567 890",
  },
  {
    id: 4,
    name: "Sofia Martín",
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    bio: "Certificada en fitness prenatal y postnatal. Especialista en Barre para embarazadas.",
    email: "sofia@enoiabarre.com",
    phone: "+34 645 678 901",
  },
  {
    id: 5,
    name: "Daniel Torres",
    photo: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    bio: "Formado en pilates y entrenamiento funcional. Especialista en Barre Intenso.",
    email: "daniel@enoiabarre.com",
    phone: "+34 656 789 012",
  },
];

// Mock classes
export const classes = [
  {
    id: 1,
    name: "Barre Clásico",
    description: "Clase tradicional de barre enfocada en técnica y postura.",
    intensity: "Media",
    instructor: instructors[0],
    maxCapacity: 12,
    date: new Date(new Date().setHours(10, 0, 0, 0)), // Today at 10:00
    attendees: 8,
  },
  {
    id: 2,
    name: "Barre Flow",
    description: "Movimientos fluidos inspirados en yoga y danza contemporánea.",
    intensity: "Media",
    instructor: instructors[2],
    maxCapacity: 10,
    date: new Date(new Date().setHours(17, 30, 0, 0)), // Today at 17:30
    attendees: 10,
  },
  {
    id: 3,
    name: "Stretch & Relax",
    description: "Clase enfocada en flexibilidad y relajación muscular.",
    intensity: "Baja",
    instructor: instructors[1],
    maxCapacity: 15,
    date: new Date(new Date().setHours(19, 0, 0, 0)), // Today at 19:00
    attendees: 7,
  },
  {
    id: 4,
    name: "Barre Intenso",
    description: "Versión de alta intensidad con intervalos de cardio.",
    intensity: "Fuerte",
    instructor: instructors[4],
    maxCapacity: 12,
    date: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 0, 0, 0), // Tomorrow at 9:00
    attendees: 6,
  },
  {
    id: 5,
    name: "Prenatal Barre",
    description: "Adaptada para embarazadas, fortalece y mantiene flexibilidad.",
    intensity: "Baja",
    instructor: instructors[3],
    maxCapacity: 8,
    date: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(12, 0, 0, 0), // Tomorrow at 12:00
    attendees: 4,
  },
  {
    id: 6,
    name: "Barre Sculpt",
    description: "Enfoque en tonificación y definición muscular.",
    intensity: "Media",
    instructor: instructors[0],
    maxCapacity: 12,
    date: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(18, 0, 0, 0), // Tomorrow at 18:00
    attendees: 9,
  },
];

// Mock clients
export const clients = [
  {
    id: 1,
    name: "María López",
    email: "maria.lopez@gmail.com",
    phone: "+34 612 345 678",
    history: [
      { classId: 1, date: new Date(new Date().setDate(new Date().getDate() - 7)), className: "Barre Clásico", instructor: "Valentina Ortega" },
      { classId: 3, date: new Date(new Date().setDate(new Date().getDate() - 2)), className: "Stretch & Relax", instructor: "Carmen Díaz" },
    ],
  },
  {
    id: 2,
    name: "Ana García",
    email: "ana.garcia@hotmail.com",
    phone: "+34 623 456 789",
    history: [
      { classId: 2, date: new Date(new Date().setDate(new Date().getDate() - 5)), className: "Barre Flow", instructor: "Lucía Fernández" },
      { classId: 4, date: new Date(new Date().setDate(new Date().getDate() - 3)), className: "Barre Intenso", instructor: "Daniel Torres" },
    ],
  },
  {
    id: 3,
    name: "Elena Martínez",
    email: "elena.martinez@yahoo.es",
    phone: "+34 634 567 890",
    history: [
      { classId: 5, date: new Date(new Date().setDate(new Date().getDate() - 14)), className: "Prenatal Barre", instructor: "Sofia Martín" },
    ],
  },
  {
    id: 4,
    name: "Laura Sánchez",
    email: "laura.sanchez@gmail.com",
    phone: "+34 645 678 901",
    history: [
      { classId: 1, date: new Date(new Date().setDate(new Date().getDate() - 10)), className: "Barre Clásico", instructor: "Valentina Ortega" },
      { classId: 6, date: new Date(new Date().setDate(new Date().getDate() - 4)), className: "Barre Sculpt", instructor: "Valentina Ortega" },
    ],
  },
  {
    id: 5,
    name: "Patricia Gómez",
    email: "patricia.gomez@gmail.com",
    phone: "+34 656 789 012",
    history: [
      { classId: 2, date: new Date(new Date().setDate(new Date().getDate() - 6)), className: "Barre Flow", instructor: "Lucía Fernández" },
      { classId: 3, date: new Date(new Date().setDate(new Date().getDate() - 3)), className: "Stretch & Relax", instructor: "Carmen Díaz" },
    ],
  },
  {
    id: 6,
    name: "Cristina Rodríguez",
    email: "cristina.rodriguez@outlook.com",
    phone: "+34 667 890 123",
    history: [
      { classId: 4, date: new Date(new Date().setDate(new Date().getDate() - 7)), className: "Barre Intenso", instructor: "Daniel Torres" },
    ],
  },
  {
    id: 7,
    name: "Beatriz Fernández",
    email: "beatriz.fernandez@gmail.com",
    phone: "+34 678 901 234",
    history: [
      { classId: 6, date: new Date(new Date().setDate(new Date().getDate() - 9)), className: "Barre Sculpt", instructor: "Valentina Ortega" },
      { classId: 1, date: new Date(new Date().setDate(new Date().getDate() - 2)), className: "Barre Clásico", instructor: "Valentina Ortega" },
    ],
  },
  {
    id: 8,
    name: "Raquel Díaz",
    email: "raquel.diaz@yahoo.es",
    phone: "+34 689 012 345",
    history: [
      { classId: 5, date: new Date(new Date().setDate(new Date().getDate() - 11)), className: "Prenatal Barre", instructor: "Sofia Martín" },
    ],
  },
];

// Mock reservations (upcoming bookings)
export const reservations = [
  {
    id: 1,
    client: clients[0],
    class: classes[0],
  },
  {
    id: 2,
    client: clients[1],
    class: classes[1],
  },
  {
    id: 3,
    client: clients[2],
    class: classes[4],
  },
  {
    id: 4,
    client: clients[3],
    class: classes[2],
  },
  {
    id: 5,
    client: clients[4],
    class: classes[5],
  },
  {
    id: 6,
    client: clients[5],
    class: classes[3],
  },
  {
    id: 7,
    client: clients[6],
    class: classes[0],
  },
  {
    id: 8,
    client: clients[7],
    class: classes[4],
  },
  {
    id: 9,
    client: clients[0],
    class: classes[5],
  },
  {
    id: 10,
    client: clients[1],
    class: classes[3],
  },
];

// Helper function to format date
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    hour: '2-digit', 
    minute: '2-digit'
  };
  return date.toLocaleDateString('es-ES', options);
};

// Helper function to get a shorter date format
export const formatShortDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit', 
    minute: '2-digit'
  };
  return date.toLocaleDateString('es-ES', options);
};

// Helper function to check if date is today
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

// Helper function to check if date is tomorrow
export const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
};
