export const howItWorks = [
  {
    title: 'Registrate en linea y obten tu membresía',
    description: 'Crea una cuenta y elige el plan que mejor se ajuste a tus necesidades.',
    image: {
      src: '/assets/howitworks-step-1.svg',
      alt: 'Primer paso de cómo funciona Mazatlán Passport',
      width: 512,
      height: 512
    }
  },
  {
    title: 'Descubre promociones y lugares increibles',
    description: 'Explora y descubre promos exclusivas en los establecimientos participantes.',
    image: {
      src: '/assets/howitworks-step-2.svg',
      alt: 'Segundo paso de cómo funciona Mazatlán Passport',
      width: 512,
      height: 512
    }
  },
  {
    title: '¡Disfruta de los beneficios exclusivos!',
    description: 'Visita algun establecimiento participante, muestra tu tarjeta digital y difruta.',
    image: {
      src: '/assets/howitworks-step-3.svg',
      alt: 'Tercer paso de cómo funciona Mazatlán Passport',
      width: 512,
      height: 512
    }
  }
]

export const FAQ = {
  title: 'Preguntas frecuentes',
  description: 'No te quedes con dudas.',
  items: [
    {
      title: '¿Por qué es importante la internacionalización?',
      description: 'La internacionalización tiene grandes beneficios para las compañías, ya que permite aumentar las ventas, reducir costos de producción, usar un mayor porcentaje de la capacidad instalada de la empresa, obliga a  implementar acciones de mejora continua a nivel interno para sostener la competitividad, diversifica el riesgo, da mayor valor a la empresa y a sus accionistas.'
    },
    {
      title: '¿Cuáles son las principales razones por las que se sancionan empresas en Colombia en materia de comercio exterior?',
      description: [
        'La incorrecta clasificación arancelaria de los productos que afecte la recaudación de impuestos vía aranceles aduaneros, lo cual se denomina contrabando técnico.',
        'Otra razón muy común es el desconocimiento en régimen cambiario Colombiano, la no correcta canalización de divisas provenientes de actividades de importación o exportación de bienes.'
      ]
    },
    {
      title: '¿Cuál debe ser la rentabilidad neta mínima que mi proyecto de internacionalización debe alcanzar para considerarse exitoso?',
      description: 'Para considerar exitosa la internacionalización, el proyecto debe alcanzar una rentabilidad neta superior al 15%.'
    }
  ]
} as const
