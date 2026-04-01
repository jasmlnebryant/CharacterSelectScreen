import vexorImg from '../assets/vexor.png'
import atomixImg from '../assets/atomix.png'
import archaeonImg from '../assets/archaeon.png'
import vexorReadyImg from '../assets/vexor_seated.png'
import atomixReadyImg from '../assets/atomix_excited.png'
import archaeonReadyImg from '../assets/archaeon_reading.png'

export const companions = [
  {
    id: 'vexor',
    name: 'Vexor',
    subject: 'Math',
    subSubjects: ['Algebra', 'Geometry', 'Calculus'],
    mood: 'Fierce',
    flavorLine: 'Precision is power.',
    image: vexorImg,
    readyImage: vexorReadyImg,
    baseHue: 280,
  },
  {
    id: 'atomix',
    name: 'Atomix',
    subject: 'Science',
    subSubjects: ['Biology', 'Chemistry', 'Physics'],
    mood: 'Bubbly / Playful',
    flavorLine: 'Every answer is an experiment.',
    image: atomixImg,
    readyImage: atomixReadyImg,
    baseHue: 175,
  },
  {
    id: 'archaeon',
    name: 'Archaeon',
    subject: 'History',
    subSubjects: ['World History', 'US History', 'Government'],
    mood: 'Steampunk',
    flavorLine: 'The past is a puzzle waiting to be solved.',
    image: archaeonImg,
    readyImage: archaeonReadyImg,
    baseHue: 38,
  },
]
