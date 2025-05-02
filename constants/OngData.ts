import { Colors } from './Colors';

export interface OngProject {
  id: number;
  name: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  progress: number;
  description: string;
}

export interface Ong {
  id: number;
  name: string;
  logo: string;
  description: string;
  mission: string;
  vision: string;
  projects: OngProject[];
  subscribers: number;
}

export const ongData: Ong[] = [
  {
    id: 1,
    name: 'Nadiesolo',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi69cyfoEFFwVlVCmir7FgeWgLqJQnNUMoXg&s',
    description: 'Nadiesolo es una organización sin ánimo de lucro que trabaja para combatir la soledad no deseada y el aislamiento social de las personas mayores, personas con discapacidad y personas en riesgo de exclusión.',
    mission: 'Construir una sociedad más inclusiva donde nadie se sienta solo.',
    vision: 'Ser referentes en la lucha contra la soledad no deseada y el aislamiento social.',
    projects: [
      {
        id: 1,
        name: 'Construcción de Escuela Rural',
        image: 'https://i.postimg.cc/T1sD3Yfs/Sustainable-low-cost-housing-project-in-a-developi.jpg',
        targetAmount: 50000,
        raisedAmount: 35000,
        progress: 70,
        description: 'Proyecto para construir una escuela en zona rural que beneficiará a más de 200 niños.'
      }
    ],
    subscribers: 1200
  },
  {
    id: 2,
    name: 'Tacumi',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjdt0R9NwTqKHLDQFCOiIOQzpiZEg7ctD7DIwud_-mjh7-hegl0AR6A41n_WWwlLvI1I&usqp=CAU',
    description: 'Tacumi es una ONG dedicada a promover el desarrollo sostenible y la conservación del medio ambiente a través de proyectos innovadores y educación ambiental.',
    mission: 'Impulsar el desarrollo sostenible y la protección del medio ambiente.',
    vision: 'Ser líderes en la promoción de la sostenibilidad y la conciencia ambiental.',
    projects: [
      {
        id: 3,
        name: 'Centro de Rehabilitación',
        image: 'https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg',
        targetAmount: 75000,
        raisedAmount: 30000,
        progress: 40,
        description: 'Centro de rehabilitación para personas con discapacidad física.'
      }
    ],
    subscribers: 800
  },
  {
    id: 3,
    name: 'Fundación Lukas',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOHiKxeS4gDAjfQMLkzQrKeDexZZ3_y8D5w&s',
    description: 'Fundación Lukas trabaja para mejorar la calidad de vida de niños y jóvenes con discapacidad múltiple severa y sus familias, ofreciendo apoyo integral y recursos especializados.',
    mission: 'Proporcionar atención especializada y apoyo integral a niños y jóvenes con discapacidades múltiples severas y a sus familias para mejorar su bienestar y desarrollo.',
    vision: 'Ser un centro de referencia en la atención a la discapacidad múltiple severa, promoviendo la inclusión y la mejora continua de la calidad de vida de los beneficiarios.',
    projects: [ // Puedes actualizar los proyectos si tienes la información correcta
      {
        id: 3, // Asegúrate de que los IDs de proyecto sean únicos si es necesario
        name: 'Centro de Día Especializado',
        image: 'https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg', // Reemplazar con imagen relevante
        targetAmount: 80000,
        raisedAmount: 45000,
        progress: 56,
        description: 'Centro de día para ofrecer terapias y actividades adaptadas a jóvenes con discapacidad múltiple.'
      }
    ],
    subscribers: 950 // Puedes actualizar el número de suscriptores
  },
  { // Nueva entrada para Alpe
    id: 5, // Nuevo ID único
    name: 'Alpe',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2v4Z1ZX07AEStMVbGjkFGGXU1g33wzsjVw&s', // Logo de marcador de posición
    description: 'Alpe es una organización dedicada a la protección de ecosistemas montañosos y al apoyo de las comunidades locales que dependen de ellos.',
    mission: 'Conservar la biodiversidad de las regiones alpinas y promover el desarrollo sostenible de sus comunidades.',
    vision: 'Un futuro donde los ecosistemas de montaña prosperen y las comunidades locales vivan en armonía con su entorno.',
    projects: [
      {
        id: 5, // Nuevo ID de proyecto único
        name: 'Reforestación Alpina',
        image: 'https://i.postimg.cc/pX5g7jJc/Mountain-landscape-with-pine-trees-and-a-clear-blue.jpg', // Imagen actualizada (ejemplo)
        targetAmount: 60000,
        raisedAmount: 20000,
        progress: 33,
        description: 'Plantación de especies autóctonas para recuperar la cubierta vegetal y prevenir la erosión en zonas alpinas degradadas.' // Descripción añadida
      }
    ],
    subscribers: 750 // Número de suscriptores de ejemplo
  }
];