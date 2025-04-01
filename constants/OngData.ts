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
      },
      {
        id: 2,
        name: 'Programa de Alimentación Infantil',
        image: 'https://i.postimg.cc/yxDDt4cy/Vibrant-diverse-classroom-of-the-future-students-1.jpg',
        targetAmount: 25000,
        raisedAmount: 15000,
        progress: 60,
        description: 'Programa de alimentación para niños en situación de vulnerabilidad.'
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
  }
];