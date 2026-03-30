import vexorImg from '../assets/vexor.png'
import atomixImg from '../assets/atomix.png'
import archaeonImg from '../assets/archaeon.png'

export const companions = [
  {
    id: 'vexor',
    name: 'Vexor',
    subject: 'Math',
    subSubjects: ['Algebra', 'Geometry', 'Calculus'],
    mood: 'Fierce',
    flavorLine: 'Precision is power.',
    image: vexorImg,
  },
  {
    id: 'atomix',
    name: 'Atomix',
    subject: 'Science',
    subSubjects: ['Biology', 'Chemistry', 'Physics'],
    mood: 'Bubbly / Playful',
    flavorLine: 'Every answer is an experiment.',
    image: atomixImg,
  },
  {
    id: 'archaeon',
    name: 'Archaeon',
    subject: 'History',
    subSubjects: ['World History', 'US History', 'Government'],
    mood: 'Steampunk',
    flavorLine: 'The past is a puzzle waiting to be solved.',
    image: archaeonImg,
  },
]
