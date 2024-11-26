export const unknownError = 'Se ha producido un error desconocido. Por favor, inténtelo de nuevo más tarde.'

export const redirects = {
  user: {
    toSignin: '/signin',
    toSignup: '/signup',
    afterSignin: '/profile',
    afterSignout: '/',
    toVerify: '/verify-email',
    afterVerify: '/profile'
  },
  admin: {
    toSignin: '/admin/signin',
    afterSignin: '/admin',
    afterSignout: '/admin/signin',
    toVerify: '/admin/verify-email',
    afterVerify: '/admin'
  },
  root: {
    toSignin: '/root/signin',
    afterSignin: '/root',
    afterSignout: '/root/signin'
  }
} as const

export const protectedRoles = {
  admin: 'admin',
  root: 'root'
} as const

export type ProtectedRole = keyof typeof protectedRoles

export const roles = {
  user: 'user',
  ...protectedRoles
} as const

export type Role = keyof typeof roles

export const userStatus = {
  notFound: 'La cuenta no existe',
  inactive: 'Cuenta inactiva',
  blocked: 'Cuanta bloqeada',
  unverified: 'Cuenta no verificada'
} as const

export const months = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
} as const

/**
 * ISO/IEC 5218 Codes for the representation of human sexes
 * @see {@link https://en.wikipedia.org/wiki/ISO/IEC_5218 ISO/IEC 5218}
 */
export const genre = [
  {
    iso: '1',
    title: {
      en: 'Man',
      es: 'Hombre'
    }
  },
  {
    iso: '2',
    title: {
      en: 'Woman',
      es: 'Mujer'
    }
  },
  {
    iso: '9',
    title: {
      en: 'Non-binary',
      es: 'No binario'
    }
  },
  {
    iso: '0',
    title: {
      en: "I'd rather not say it",
      es: 'Prefiero no decirlo'
    }
  }
] as const

/**
 * List of country calling codes. Countries are identified by ISO 3166-1 alpha-2 country codes
 * @see {@link ttps://en.wikipedia.org/wiki/List_of_country_calling_codes Country calling codes}
 * @see {@link https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes ISO 3166-1 alpha-2}
 */
export const countries = [
  {
    name: {
      en: 'Afghanistan',
      es: 'Afganistán'
    },
    dialCode: '93',
    alpha2: 'AF'
  },
  {
    name: {
      en: 'Aland Islands',
      es: 'Islas Åland'
    },
    dialCode: '358',
    alpha2: 'AX'
  },
  {
    name: {
      en: 'Albania',
      es: 'Albania'
    },
    dialCode: '355',
    alpha2: 'AL'
  },
  {
    name: {
      en: 'Algeria',
      es: 'Argelia'
    },
    dialCode: '213',
    alpha2: 'DZ'
  },
  {
    name: {
      en: 'American Samoa',
      es: 'Samoa Americana'
    },
    dialCode: '1684',
    alpha2: 'AS'
  },
  {
    name: {
      en: 'Andorra',
      es: 'Andorra'
    },
    dialCode: '376',
    alpha2: 'AD'
  },
  {
    name: {
      en: 'Angola',
      es: 'Angola'
    },
    dialCode: '244',
    alpha2: 'AO'
  },
  {
    name: {
      en: 'Anguilla',
      es: 'Anguila'
    },
    dialCode: '1264',
    alpha2: 'AI'
  },
  {
    name: {
      en: 'Antarctica',
      es: 'Antártida'
    },
    dialCode: '672',
    alpha2: 'AQ'
  },
  {
    name: {
      en: 'Antigua and Barbuda',
      es: 'Antigua y Barbuda'
    },
    dialCode: '1268',
    alpha2: 'AG'
  },
  {
    name: {
      en: 'Argentina',
      es: 'Argentina'
    },
    dialCode: '54',
    alpha2: 'AR'
  },
  {
    name: {
      en: 'Armenia',
      es: 'Armenia'
    },
    dialCode: '374',
    alpha2: 'AM'
  },
  {
    name: {
      en: 'Aruba',
      es: 'Aruba'
    },
    dialCode: '297',
    alpha2: 'AW'
  },
  {
    name: {
      en: 'Australia',
      es: 'Australia'
    },
    dialCode: '61',
    alpha2: 'AU'
  },
  {
    name: {
      en: 'Austria',
      es: 'Austria'
    },
    dialCode: '43',
    alpha2: 'AT'
  },
  {
    name: {
      en: 'Azerbaijan',
      es: 'Azerbaiyán'
    },
    dialCode: '994',
    alpha2: 'AZ'
  },
  {
    name: {
      en: 'Bahamas',
      es: 'Bahamas'
    },
    dialCode: '1242',
    alpha2: 'BS'
  },
  {
    name: {
      en: 'Bahrain',
      es: 'Baréin'
    },
    dialCode: '973',
    alpha2: 'BH'
  },
  {
    name: {
      en: 'Bangladesh',
      es: 'Bangladesh'
    },
    dialCode: '880',
    alpha2: 'BD'
  },
  {
    name: {
      en: 'Barbados',
      es: 'Barbados'
    },
    dialCode: '1246',
    alpha2: 'BB'
  },
  {
    name: {
      en: 'Belarus',
      es: 'Bielorrusia'
    },
    dialCode: '375',
    alpha2: 'BY'
  },
  {
    name: {
      en: 'Belgium',
      es: 'Bélgica'
    },
    dialCode: '32',
    alpha2: 'BE'
  },
  {
    name: {
      en: 'Belize',
      es: 'Belice'
    },
    dialCode: '501',
    alpha2: 'BZ'
  },
  {
    name: {
      en: 'Benin',
      es: 'Benín'
    },
    dialCode: '229',
    alpha2: 'BJ'
  },
  {
    name: {
      en: 'Bermuda',
      es: 'Bermudas'
    },
    dialCode: '1441',
    alpha2: 'BM'
  },
  {
    name: {
      en: 'Bhutan',
      es: 'Bután'
    },
    dialCode: '975',
    alpha2: 'BT'
  },
  {
    name: {
      en: 'Bolivia, Plurinational State of',
      es: 'Bolivia'
    },
    dialCode: '591',
    alpha2: 'BO'
  },
  {
    name: {
      en: 'Bosnia and Herzegovina',
      es: 'Bosnia y Herzegovina'
    },
    dialCode: '387',
    alpha2: 'BA'
  },
  {
    name: {
      en: 'Botswana',
      es: 'Botswana'
    },
    dialCode: '267',
    alpha2: 'BW'
  },
  {
    name: {
      en: 'Brazil',
      es: 'Brasil'
    },
    dialCode: '55',
    alpha2: 'BR'
  },
  {
    name: {
      en: 'British Indian Ocean Territory',
      es: 'Territorio Británico del Océano Índico'
    },
    dialCode: '246',
    alpha2: 'IO'
  },
  {
    name: {
      en: 'Brunei Darussalam',
      es: 'Brunéi'
    },
    dialCode: '673',
    alpha2: 'BN'
  },
  {
    name: {
      en: 'Bulgaria',
      es: 'Bulgaria'
    },
    dialCode: '359',
    alpha2: 'BG'
  },
  {
    name: {
      en: 'Burkina Faso',
      es: 'Burkina Faso'
    },
    dialCode: '226',
    alpha2: 'BF'
  },
  {
    name: {
      en: 'Burundi',
      es: 'Burundi'
    },
    dialCode: '257',
    alpha2: 'BI'
  },
  {
    name: {
      en: 'Cambodia',
      es: 'Camboya'
    },
    dialCode: '855',
    alpha2: 'KH'
  },
  {
    name: {
      en: 'Cameroon',
      es: 'Camerún'
    },
    dialCode: '237',
    alpha2: 'CM'
  },
  {
    name: {
      en: 'Canada',
      es: 'Canadá'
    },
    dialCode: '1',
    alpha2: 'CA'
  },
  {
    name: {
      en: 'Cape Verde',
      es: 'Cabo Verde'
    },
    dialCode: '238',
    alpha2: 'CV'
  },
  {
    name: {
      en: 'Cayman Islands',
      es: 'Islas Caimán'
    },
    dialCode: '345',
    alpha2: 'KY'
  },
  {
    name: {
      en: 'Central African Republic',
      es: 'República Centroafricana'
    },
    dialCode: '236',
    alpha2: 'CF'
  },
  {
    name: {
      en: 'Chad',
      es: 'Chad'
    },
    dialCode: '235',
    alpha2: 'TD'
  },
  {
    name: {
      en: 'Chile',
      es: 'Chile'
    },
    dialCode: '56',
    alpha2: 'CL'
  },
  {
    name: {
      en: 'China',
      es: 'China'
    },
    dialCode: '86',
    alpha2: 'CN'
  },
  {
    name: {
      en: 'Christmas Island',
      es: 'Isla de Navidad'
    },
    dialCode: '61',
    alpha2: 'CX'
  },
  {
    name: {
      en: 'Cocos (Keeling) Islands',
      es: 'Islas Cocos (Keeling)'
    },
    dialCode: '61',
    alpha2: 'CC'
  },
  {
    name: {
      en: 'Colombia',
      es: 'Colombia'
    },
    dialCode: '57',
    alpha2: 'CO'
  },
  {
    name: {
      en: 'Comoros',
      es: 'Comoras'
    },
    dialCode: '269',
    alpha2: 'KM'
  },
  {
    name: {
      en: 'Congo',
      es: 'Congo'
    },
    dialCode: '242',
    alpha2: 'CG'
  },
  {
    name: {
      en: 'Congo, The Democratic Republic of the Congo',
      es: 'República Democrática del Congo'
    },
    dialCode: '243',
    alpha2: 'CD'
  },
  {
    name: {
      en: 'Cook Islands',
      es: 'Islas Cook'
    },
    dialCode: '682',
    alpha2: 'CK'
  },
  {
    name: {
      en: 'Costa Rica',
      es: 'Costa Rica'
    },
    dialCode: '506',
    alpha2: 'CR'
  },
  {
    name: {
      en: "Cote d'Ivoire",
      es: 'Costa de Marfil'
    },
    dialCode: '225',
    alpha2: 'CI'
  },
  {
    name: {
      en: 'Croatia',
      es: 'Croacia'
    },
    dialCode: '385',
    alpha2: 'HR'
  },
  {
    name: {
      en: 'Cuba',
      es: 'Cuba'
    },
    dialCode: '53',
    alpha2: 'CU'
  },
  {
    name: {
      en: 'Cyprus',
      es: 'Chipre'
    },
    dialCode: '357',
    alpha2: 'CY'
  },
  {
    name: {
      en: 'Czech Republic',
      es: 'República Checa'
    },
    dialCode: '420',
    alpha2: 'CZ'
  },
  {
    name: {
      en: 'Denmark',
      es: 'Dinamarca'
    },
    dialCode: '45',
    alpha2: 'DK'
  },
  {
    name: {
      en: 'Djibouti',
      es: 'Yibuti'
    },
    dialCode: '253',
    alpha2: 'DJ'
  },
  {
    name: {
      en: 'Dominica',
      es: 'Dominica'
    },
    dialCode: '1767',
    alpha2: 'DM'
  },
  {
    name: {
      en: 'Dominican Republic',
      es: 'República Dominicana'
    },
    dialCode: '1849',
    alpha2: 'DO'
  },
  {
    name: {
      en: 'Ecuador',
      es: 'Ecuador'
    },
    dialCode: '593',
    alpha2: 'EC'
  },
  {
    name: {
      en: 'Egypt',
      es: 'Egipto'
    },
    dialCode: '20',
    alpha2: 'EG'
  },
  {
    name: {
      en: 'El Salvador',
      es: 'El Salvador'
    },
    dialCode: '503',
    alpha2: 'SV'
  },
  {
    name: {
      en: 'Equatorial Guinea',
      es: 'Guinea Ecuatorial'
    },
    dialCode: '240',
    alpha2: 'GQ'
  },
  {
    name: {
      en: 'Eritrea',
      es: 'Eritrea'
    },
    dialCode: '291',
    alpha2: 'ER'
  },
  {
    name: {
      en: 'Estonia',
      es: 'Estonia'
    },
    dialCode: '372',
    alpha2: 'EE'
  },
  {
    name: {
      en: 'Ethiopia',
      es: 'Etiopía'
    },
    dialCode: '251',
    alpha2: 'ET'
  },
  {
    name: {
      en: 'Falkland Islands (Malvinas)',
      es: 'Islas Malvinas'
    },
    dialCode: '500',
    alpha2: 'FK'
  },
  {
    name: {
      en: 'Faroe Islands',
      es: 'Islas Faroe'
    },
    dialCode: '298',
    alpha2: 'FO'
  },
  {
    name: {
      en: 'Fiji',
      es: 'Fiyi'
    },
    dialCode: '679',
    alpha2: 'FJ'
  },
  {
    name: {
      en: 'Finland',
      es: 'Finlandia'
    },
    dialCode: '358',
    alpha2: 'FI'
  },
  {
    name: {
      en: 'France',
      es: 'Francia'
    },
    dialCode: '33',
    alpha2: 'FR'
  },
  {
    name: {
      en: 'French Guiana',
      es: 'Guayana Francesa'
    },
    dialCode: '594',
    alpha2: 'GF'
  },
  {
    name: {
      en: 'French Polynesia',
      es: 'Polinesia Francesa'
    },
    dialCode: '689',
    alpha2: 'PF'
  },
  {
    name: {
      en: 'Gabon',
      es: 'Gabón'
    },
    dialCode: '241',
    alpha2: 'GA'
  },
  {
    name: {
      en: 'Gambia',
      es: 'Gambia'
    },
    dialCode: '220',
    alpha2: 'GM'
  },
  {
    name: {
      en: 'Georgia',
      es: 'Georgia'
    },
    dialCode: '995',
    alpha2: 'GE'
  },
  {
    name: {
      en: 'Germany',
      es: 'Alemania'
    },
    dialCode: '49',
    alpha2: 'DE'
  },
  {
    name: {
      en: 'Ghana',
      es: 'Ghana'
    },
    dialCode: '233',
    alpha2: 'GH'
  },
  {
    name: {
      en: 'Gibraltar',
      es: 'Gibraltar'
    },
    dialCode: '350',
    alpha2: 'GI'
  },
  {
    name: {
      en: 'Greece',
      es: 'Grecia'
    },
    dialCode: '30',
    alpha2: 'GR'
  },
  {
    name: {
      en: 'Greenland',
      es: 'Groenlandia'
    },
    dialCode: '299',
    alpha2: 'GL'
  },
  {
    name: {
      en: 'Grenada',
      es: 'Granada'
    },
    dialCode: '1473',
    alpha2: 'GD'
  },
  {
    name: {
      en: 'Guadeloupe',
      es: 'Guadalupe'
    },
    dialCode: '590',
    alpha2: 'GP'
  },
  {
    name: {
      en: 'Guam',
      es: 'Guam'
    },
    dialCode: '1671',
    alpha2: 'GU'
  },
  {
    name: {
      en: 'Guatemala',
      es: 'Guatemala'
    },
    dialCode: '502',
    alpha2: 'GT'
  },
  {
    name: {
      en: 'Guernsey',
      es: 'Guernsey'
    },
    dialCode: '44',
    alpha2: 'GG'
  },
  {
    name: {
      en: 'Guinea',
      es: 'Guinea'
    },
    dialCode: '224',
    alpha2: 'GN'
  },
  {
    name: {
      en: 'Guinea-Bissau',
      es: 'Guinea-Bisáu'
    },
    dialCode: '245',
    alpha2: 'GW'
  },
  {
    name: {
      en: 'Guyana',
      es: 'Guyana'
    },
    dialCode: '595',
    alpha2: 'GY'
  },
  {
    name: {
      en: 'Haiti',
      es: 'Haití'
    },
    dialCode: '509',
    alpha2: 'HT'
  },
  {
    name: {
      en: 'Holy See (Vatican City State)',
      es: 'Santa Sede (Ciudad del Vaticano)'
    },
    dialCode: '379',
    alpha2: 'VA'
  },
  {
    name: {
      en: 'Honduras',
      es: 'Honduras'
    },
    dialCode: '504',
    alpha2: 'HN'
  },
  {
    name: {
      en: 'Hong Kong',
      es: 'Hong Kong'
    },
    dialCode: '852',
    alpha2: 'HK'
  },
  {
    name: {
      en: 'Hungary',
      es: 'Hungría'
    },
    dialCode: '36',
    alpha2: 'HU'
  },
  {
    name: {
      en: 'Iceland',
      es: 'Islandia'
    },
    dialCode: '354',
    alpha2: 'IS'
  },
  {
    name: {
      en: 'India',
      es: 'India'
    },
    dialCode: '91',
    alpha2: 'IN'
  },
  {
    name: {
      en: 'Indonesia',
      es: 'Indonesia'
    },
    dialCode: '62',
    alpha2: 'ID'
  },
  {
    name: {
      en: 'Iran, Islamic Republic of Persian Gulf',
      es: 'Irán'
    },
    dialCode: '98',
    alpha2: 'IR'
  },
  {
    name: {
      en: 'Iraq',
      es: 'Irak'
    },
    dialCode: '964',
    alpha2: 'IQ'
  },
  {
    name: {
      en: 'Ireland',
      es: 'Irlanda'
    },
    dialCode: '353',
    alpha2: 'IE'
  },
  {
    name: {
      en: 'Isle of Man',
      es: 'Isla de Man'
    },
    dialCode: '44',
    alpha2: 'IM'
  },
  {
    name: {
      en: 'Israel',
      es: 'Israel'
    },
    dialCode: '972',
    alpha2: 'IL'
  },
  {
    name: {
      en: 'Italy',
      es: 'Italia'
    },
    dialCode: '39',
    alpha2: 'IT'
  },
  {
    name: {
      en: 'Jamaica',
      es: 'Jamaica'
    },
    dialCode: '1876',
    alpha2: 'JM'
  },
  {
    name: {
      en: 'Japan',
      es: 'Japón'
    },
    dialCode: '81',
    alpha2: 'JP'
  },
  {
    name: {
      en: 'Jersey',
      es: 'Jersey'
    },
    dialCode: '44',
    alpha2: 'JE'
  },
  {
    name: {
      en: 'Jordan',
      es: 'Jordania'
    },
    dialCode: '962',
    alpha2: 'JO'
  },
  {
    name: {
      en: 'Kazakhstan',
      es: 'Kazajistán'
    },
    dialCode: '77',
    alpha2: 'KZ'
  },
  {
    name: {
      en: 'Kenya',
      es: 'Kenia'
    },
    dialCode: '254',
    alpha2: 'KE'
  },
  {
    name: {
      en: 'Kiribati',
      es: 'Kiribati'
    },
    dialCode: '686',
    alpha2: 'KI'
  },
  {
    name: {
      en: "Korea, Democratic People's Republic of Korea",
      es: 'Corea del Norte'
    },
    dialCode: '850',
    alpha2: 'KP'
  },
  {
    name: {
      en: 'Korea, Republic of South Korea',
      es: 'Corea del Sur'
    },
    dialCode: '82',
    alpha2: 'KR'
  },
  {
    name: {
      en: 'Kuwait',
      es: 'Kuwait'
    },
    dialCode: '965',
    alpha2: 'KW'
  },
  {
    name: {
      en: 'Kyrgyzstan',
      es: 'Kirguistán'
    },
    dialCode: '996',
    alpha2: 'KG'
  },
  {
    name: {
      en: 'Laos',
      es: 'Laos'
    },
    dialCode: '856',
    alpha2: 'LA'
  },
  {
    name: {
      en: 'Latvia',
      es: 'Letonia'
    },
    dialCode: '371',
    alpha2: 'LV'
  },
  {
    name: {
      en: 'Lebanon',
      es: 'Líbano'
    },
    dialCode: '961',
    alpha2: 'LB'
  },
  {
    name: {
      en: 'Lesotho',
      es: 'Lesoto'
    },
    dialCode: '266',
    alpha2: 'LS'
  },
  {
    name: {
      en: 'Liberia',
      es: 'Liberia'
    },
    dialCode: '231',
    alpha2: 'LR'
  },
  {
    name: {
      en: 'Libyan Arab Jamahiriya',
      es: 'Libia'
    },
    dialCode: '218',
    alpha2: 'LY'
  },
  {
    name: {
      en: 'Liechtenstein',
      es: 'Liechtenstein'
    },
    dialCode: '423',
    alpha2: 'LI'
  },
  {
    name: {
      en: 'Lithuania',
      es: 'Lituania'
    },
    dialCode: '370',
    alpha2: 'LT'
  },
  {
    name: {
      en: 'Luxembourg',
      es: 'Luxemburgo'
    },
    dialCode: '352',
    alpha2: 'LU'
  },
  {
    name: {
      en: 'Macao',
      es: 'Macao'
    },
    dialCode: '853',
    alpha2: 'MO'
  },
  {
    name: {
      en: 'Macedonia',
      es: 'Macedonia'
    },
    dialCode: '389',
    alpha2: 'MK'
  },
  {
    name: {
      en: 'Madagascar',
      es: 'Madagascar'
    },
    dialCode: '261',
    alpha2: 'MG'
  },
  {
    name: {
      en: 'Malawi',
      es: 'Malawi'
    },
    dialCode: '265',
    alpha2: 'MW'
  },
  {
    name: {
      en: 'Malaysia',
      es: 'Malasia'
    },
    dialCode: '60',
    alpha2: 'MY'
  },
  {
    name: {
      en: 'Maldives',
      es: 'Maldivas'
    },
    dialCode: '960',
    alpha2: 'MV'
  },
  {
    name: {
      en: 'Mali',
      es: 'Malí'
    },
    dialCode: '223',
    alpha2: 'ML'
  },
  {
    name: {
      en: 'Malta',
      es: 'Malta'
    },
    dialCode: '356',
    alpha2: 'MT'
  },
  {
    name: {
      en: 'Marshall Islands',
      es: 'Islas Marshall'
    },
    dialCode: '692',
    alpha2: 'MH'
  },
  {
    name: {
      en: 'Martinique',
      es: 'Martinica'
    },
    dialCode: '596',
    alpha2: 'MQ'
  },
  {
    name: {
      en: 'Mauritania',
      es: 'Mauritania'
    },
    dialCode: '222',
    alpha2: 'MR'
  },
  {
    name: {
      en: 'Mauritius',
      es: 'Mauricio'
    },
    dialCode: '230',
    alpha2: 'MU'
  },
  {
    name: {
      en: 'Mayotte',
      es: 'Mayotte'
    },
    dialCode: '262',
    alpha2: 'YT'
  },
  {
    name: {
      en: 'Mexico',
      es: 'México'
    },
    dialCode: '52',
    alpha2: 'MX'
  },
  {
    name: {
      en: 'Micronesia, Federated States of Micronesia',
      es: 'Micronesia'
    },
    dialCode: '691',
    alpha2: 'FM'
  },
  {
    name: {
      en: 'Moldova',
      es: 'Moldavia'
    },
    dialCode: '373',
    alpha2: 'MD'
  },
  {
    name: {
      en: 'Monaco',
      es: 'Mónaco'
    },
    dialCode: '377',
    alpha2: 'MC'
  },
  {
    name: {
      en: 'Mongolia',
      es: 'Mongolia'
    },
    dialCode: '976',
    alpha2: 'MN'
  },
  {
    name: {
      en: 'Montenegro',
      es: 'Montenegro'
    },
    dialCode: '382',
    alpha2: 'ME'
  },
  {
    name: {
      en: 'Montserrat',
      es: 'Montserrat'
    },
    dialCode: '1664',
    alpha2: 'MS'
  },
  {
    name: {
      en: 'Morocco',
      es: 'Marruecos'
    },
    dialCode: '212',
    alpha2: 'MA'
  },
  {
    name: {
      en: 'Mozambique',
      es: 'Mozambique'
    },
    dialCode: '258',
    alpha2: 'MZ'
  },
  {
    name: {
      en: 'Myanmar',
      es: 'Birmania (Myanmar)'
    },
    dialCode: '95',
    alpha2: 'MM'
  },
  {
    name: {
      en: 'Namibia',
      es: 'Namibia'
    },
    dialCode: '264',
    alpha2: 'NA'
  },
  {
    name: {
      en: 'Nauru',
      es: 'Nauru'
    },
    dialCode: '674',
    alpha2: 'NR'
  },
  {
    name: {
      en: 'Nepal',
      es: 'Nepal'
    },
    dialCode: '977',
    alpha2: 'NP'
  },
  {
    name: {
      en: 'Netherlands',
      es: 'Países Bajos'
    },
    dialCode: '31',
    alpha2: 'NL'
  },
  {
    name: {
      en: 'Netherlands Antilles',
      es: 'Antillas Neerlandesas'
    },
    dialCode: '599',
    alpha2: 'AN'
  },
  {
    name: {
      en: 'New Caledonia',
      es: 'Nueva Caledonia'
    },
    dialCode: '687',
    alpha2: 'NC'
  },
  {
    name: {
      en: 'New Zealand',
      es: 'Nueva Zelanda'
    },
    dialCode: '64',
    alpha2: 'NZ'
  },
  {
    name: {
      en: 'Nicaragua',
      es: 'Nicaragua'
    },
    dialCode: '505',
    alpha2: 'NI'
  },
  {
    name: {
      en: 'Niger',
      es: 'Níger'
    },
    dialCode: '227',
    alpha2: 'NE'
  },
  {
    name: {
      en: 'Nigeria',
      es: 'Nigeria'
    },
    dialCode: '234',
    alpha2: 'NG'
  },
  {
    name: {
      en: 'Niue',
      es: 'Niue'
    },
    dialCode: '683',
    alpha2: 'NU'
  },
  {
    name: {
      en: 'Norfolk Island',
      es: 'Isla Norfolk'
    },
    dialCode: '672',
    alpha2: 'NF'
  },
  {
    name: {
      en: 'Northern Mariana Islands',
      es: 'Islas Marianas del Norte'
    },
    dialCode: '1670',
    alpha2: 'MP'
  },
  {
    name: {
      en: 'Norway',
      es: 'Noruega'
    },
    dialCode: '47',
    alpha2: 'NO'
  },
  {
    name: {
      en: 'Oman',
      es: 'Omán'
    },
    dialCode: '968',
    alpha2: 'OM'
  },
  {
    name: {
      en: 'Pakistan',
      es: 'Pakistán'
    },
    dialCode: '92',
    alpha2: 'PK'
  },
  {
    name: {
      en: 'Palau',
      es: 'Palau'
    },
    dialCode: '680',
    alpha2: 'PW'
  },
  {
    name: {
      en: 'Palestinian Territory, Occupied',
      es: 'Territorio Palestino Ocupado'
    },
    dialCode: '970',
    alpha2: 'PS'
  },
  {
    name: {
      en: 'Panama',
      es: 'Panamá'
    },
    dialCode: '507',
    alpha2: 'PA'
  },
  {
    name: {
      en: 'Papua New Guinea',
      es: 'Papúa Nueva Guinea'
    },
    dialCode: '675',
    alpha2: 'PG'
  },
  {
    name: {
      en: 'Paraguay',
      es: 'Paraguay'
    },
    dialCode: '595',
    alpha2: 'PY'
  },
  {
    name: {
      en: 'Peru',
      es: 'Perú'
    },
    dialCode: '51',
    alpha2: 'PE'
  },
  {
    name: {
      en: 'Philippines',
      es: 'Filipinas'
    },
    dialCode: '63',
    alpha2: 'PH'
  },
  {
    name: {
      en: 'Pitcairn',
      es: 'Pitcairn'
    },
    dialCode: '872',
    alpha2: 'PN'
  },
  {
    name: {
      en: 'Poland',
      es: 'Polonia'
    },
    dialCode: '48',
    alpha2: 'PL'
  },
  {
    name: {
      en: 'Portugal',
      es: 'Portugal'
    },
    dialCode: '351',
    alpha2: 'PT'
  },
  {
    name: {
      en: 'Puerto Rico',
      es: 'Puerto Rico'
    },
    dialCode: '1939',
    alpha2: 'PR'
  },
  {
    name: {
      en: 'Qatar',
      es: 'Qatar'
    },
    dialCode: '974',
    alpha2: 'QA'
  },
  {
    name: {
      en: 'Romania',
      es: 'Rumania'
    },
    dialCode: '40',
    alpha2: 'RO'
  },
  {
    name: {
      en: 'Russia',
      es: 'Rusia'
    },
    dialCode: '7',
    alpha2: 'RU'
  },
  {
    name: {
      en: 'Rwanda',
      es: 'Ruanda'
    },
    dialCode: '250',
    alpha2: 'RW'
  },
  {
    name: {
      en: 'Reunion',
      es: 'Reunión'
    },
    dialCode: '262',
    alpha2: 'RE'
  },
  {
    name: {
      en: 'Saint Barthelemy',
      es: 'San Bartolomé'
    },
    dialCode: '590',
    alpha2: 'BL'
  },
  {
    name: {
      en: 'Saint Helena, Ascension and Tristan Da Cunha',
      es: 'Santa Helena, Ascensión y Tristan da Cunha'
    },
    dialCode: '290',
    alpha2: 'SH'
  },
  {
    name: {
      en: 'Saint Kitts and Nevis',
      es: 'San Cristóbal y Nieves'
    },
    dialCode: '1869',
    alpha2: 'KN'
  },
  {
    name: {
      en: 'Saint Lucia',
      es: 'Santa Lucía'
    },
    dialCode: '1758',
    alpha2: 'LC'
  },
  {
    name: {
      en: 'Saint Martin',
      es: 'San Martín'
    },
    dialCode: '590',
    alpha2: 'MF'
  },
  {
    name: {
      en: 'Saint Pierre and Miquelon',
      es: 'San Pedro y Miquelón'
    },
    dialCode: '508',
    alpha2: 'PM'
  },
  {
    name: {
      en: 'Saint Vincent and the Grenadines',
      es: 'San Vicente y las Granadinas'
    },
    dialCode: '1784',
    alpha2: 'VC'
  },
  {
    name: {
      en: 'Samoa',
      es: 'Samoa'
    },
    dialCode: '685',
    alpha2: 'WS'
  },
  {
    name: {
      en: 'San Marino',
      es: 'San Marino'
    },
    dialCode: '378',
    alpha2: 'SM'
  },
  {
    name: {
      en: 'Sao Tome and Principe',
      es: 'Santo Tomé y Príncipe'
    },
    dialCode: '239',
    alpha2: 'ST'
  },
  {
    name: {
      en: 'Saudi Arabia',
      es: 'Arabia Saudita'
    },
    dialCode: '966',
    alpha2: 'SA'
  },
  {
    name: {
      en: 'Senegal',
      es: 'Senegal'
    },
    dialCode: '221',
    alpha2: 'SN'
  },
  {
    name: {
      en: 'Serbia',
      es: 'Serbia'
    },
    dialCode: '381',
    alpha2: 'RS'
  },
  {
    name: {
      en: 'Seychelles',
      es: 'Seychelles'
    },
    dialCode: '248',
    alpha2: 'SC'
  },
  {
    name: {
      en: 'Sierra Leone',
      es: 'Sierra Leona'
    },
    dialCode: '232',
    alpha2: 'SL'
  },
  {
    name: {
      en: 'Singapore',
      es: 'Singapur'
    },
    dialCode: '65',
    alpha2: 'SG'
  },
  {
    name: {
      en: 'Slovakia',
      es: 'Eslovaquia'
    },
    dialCode: '421',
    alpha2: 'SK'
  },
  {
    name: {
      en: 'Slovenia',
      es: 'Eslovenia'
    },
    dialCode: '386',
    alpha2: 'SI'
  },
  {
    name: {
      en: 'Solomon Islands',
      es: 'Islas Salomón'
    },
    dialCode: '677',
    alpha2: 'SB'
  },
  {
    name: {
      en: 'Somalia',
      es: 'Somalia'
    },
    dialCode: '252',
    alpha2: 'SO'
  },
  {
    name: {
      en: 'South Africa',
      es: 'Sudáfrica'
    },
    dialCode: '27',
    alpha2: 'ZA'
  },
  {
    name: {
      en: 'South Sudan',
      es: 'Sudán del Sur'
    },
    dialCode: '211',
    alpha2: 'SS'
  },
  {
    name: {
      en: 'South Georgia and the South Sandwich Islands',
      es: 'Islas Georgias del Sur y Sandwich del Sur'
    },
    dialCode: '500',
    alpha2: 'GS'
  },
  {
    name: {
      en: 'Spain',
      es: 'España'
    },
    dialCode: '34',
    alpha2: 'ES'
  },
  {
    name: {
      en: 'Sri Lanka',
      es: 'Sri Lanka'
    },
    dialCode: '94',
    alpha2: 'LK'
  },
  {
    name: {
      en: 'Sudan',
      es: 'Sudán'
    },
    dialCode: '249',
    alpha2: 'SD'
  },
  {
    name: {
      en: 'Suriname',
      es: 'Surinam'
    },
    dialCode: '597',
    alpha2: 'SR'
  },
  {
    name: {
      en: 'Svalbard and Jan Mayen',
      es: 'Svalbard y Jan Mayen'
    },
    dialCode: '47',
    alpha2: 'SJ'
  },
  {
    name: {
      en: 'Swaziland',
      es: 'Esuatini'
    },
    dialCode: '268',
    alpha2: 'SZ'
  },
  {
    name: {
      en: 'Sweden',
      es: 'Suecia'
    },
    dialCode: '46',
    alpha2: 'SE'
  },
  {
    name: {
      en: 'Switzerland',
      es: 'Suiza'
    },
    dialCode: '41',
    alpha2: 'CH'
  },
  {
    name: {
      en: 'Syrian Arab Republic',
      es: 'Siria'
    },
    dialCode: '963',
    alpha2: 'SY'
  },
  {
    name: {
      en: 'Taiwan',
      es: 'Taiwán'
    },
    dialCode: '886',
    alpha2: 'TW'
  },
  {
    name: {
      en: 'Tajikistan',
      es: 'Tayikistán'
    },
    dialCode: '992',
    alpha2: 'TJ'
  },
  {
    name: {
      en: 'Tanzania, United Republic of Tanzania',
      es: 'Tanzania'
    },
    dialCode: '255',
    alpha2: 'TZ'
  },
  {
    name: {
      en: 'Thailand',
      es: 'Tailandia'
    },
    dialCode: '66',
    alpha2: 'TH'
  },
  {
    name: {
      en: 'Timor-Leste',
      es: 'Timor-Leste'
    },
    dialCode: '670',
    alpha2: 'TL'
  },
  {
    name: {
      en: 'Togo',
      es: 'Togo'
    },
    dialCode: '228',
    alpha2: 'TG'
  },
  {
    name: {
      en: 'Tokelau',
      es: 'Tokelau'
    },
    dialCode: '690',
    alpha2: 'TK'
  },
  {
    name: {
      en: 'Tonga',
      es: 'Tonga'
    },
    dialCode: '676',
    alpha2: 'TO'
  },
  {
    name: {
      en: 'Trinidad and Tobago',
      es: 'Trinidad y Tobago'
    },
    dialCode: '1868',
    alpha2: 'TT'
  },
  {
    name: {
      en: 'Tunisia',
      es: 'Túnez'
    },
    dialCode: '216',
    alpha2: 'TN'
  },
  {
    name: {
      en: 'Turkey',
      es: 'Turquía'
    },
    dialCode: '90',
    alpha2: 'TR'
  },
  {
    name: {
      en: 'Turkmenistan',
      es: 'Turkmenistán'
    },
    dialCode: '993',
    alpha2: 'TM'
  },
  {
    name: {
      en: 'Turks and Caicos Islands',
      es: 'Islas Turcas y Caicos'
    },
    dialCode: '1649',
    alpha2: 'TC'
  },
  {
    name: {
      en: 'Tuvalu',
      es: 'Tuvalu'
    },
    dialCode: '688',
    alpha2: 'TV'
  },
  {
    name: {
      en: 'Uganda',
      es: 'Uganda'
    },
    dialCode: '256',
    alpha2: 'UG'
  },
  {
    name: {
      en: 'Ukraine',
      es: 'Ucrania'
    },
    dialCode: '380',
    alpha2: 'UA'
  },
  {
    name: {
      en: 'United Arab Emirates',
      es: 'Emiratos Árabes Unidos'
    },
    dialCode: '971',
    alpha2: 'AE'
  },
  {
    name: {
      en: 'United Kingdom',
      es: 'Reino Unido'
    },
    dialCode: '44',
    alpha2: 'GB'
  },
  {
    name: {
      en: 'United States',
      es: 'Estados Unidos'
    },
    dialCode: '1',
    alpha2: 'US'
  },
  {
    name: {
      en: 'Uruguay',
      es: 'Uruguay'
    },
    dialCode: '598',
    alpha2: 'UY'
  },
  {
    name: {
      en: 'Uzbekistan',
      es: 'Uzbekistán'
    },
    dialCode: '998',
    alpha2: 'UZ'
  },
  {
    name: {
      en: 'Vanuatu',
      es: 'Vanuatu'
    },
    dialCode: '678',
    alpha2: 'VU'
  },
  {
    name: {
      en: 'Venezuela, Bolivarian Republic of Venezuela',
      es: 'Venezuela'
    },
    dialCode: '58',
    alpha2: 'VE'
  },
  {
    name: {
      en: 'Vietnam',
      es: 'Vietnam'
    },
    dialCode: '84',
    alpha2: 'VN'
  },
  {
    name: {
      en: 'Virgin Islands, British',
      es: 'Islas Vírgenes Británicas'
    },
    dialCode: '1284',
    alpha2: 'VG'
  },
  {
    name: {
      en: 'Virgin Islands, U.S.',
      es: 'Islas Vírgenes de los EE. UU.'
    },
    dialCode: '1340',
    alpha2: 'VI'
  },
  {
    name: {
      en: 'Wallis and Futuna',
      es: 'Wallis y Futuna'
    },
    dialCode: '681',
    alpha2: 'WF'
  },
  {
    name: {
      en: 'Yemen',
      es: 'Yemen'
    },
    dialCode: '967',
    alpha2: 'YE'
  },
  {
    name: {
      en: 'Zambia',
      es: 'Zambia'
    },
    dialCode: '260',
    alpha2: 'ZM'
  },
  {
    name: {
      en: 'Zimbabwe',
      es: 'Zimbabue'
    },
    dialCode: '263',
    alpha2: 'ZW'
  }
] as const
