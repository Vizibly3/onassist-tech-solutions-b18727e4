
export interface City {
  name: string;
  slug: string;
}

export interface State {
  name: string;
  abbreviation: string;
  slug: string;
  cities: City[];
}

export interface Country {
  name: string;
  slug: string;
  states: State[];
}

export const usStates: State[] = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
    slug: 'al',
    cities: [
      { name: 'Birmingham', slug: 'birmingham' },
      { name: 'Montgomery', slug: 'montgomery' },
      { name: 'Mobile', slug: 'mobile' },
      { name: 'Huntsville', slug: 'huntsville' },
      { name: 'Tuscaloosa', slug: 'tuscaloosa' }
    ]
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
    slug: 'ak',
    cities: [
      { name: 'Anchorage', slug: 'anchorage' },
      { name: 'Fairbanks', slug: 'fairbanks' },
      { name: 'Juneau', slug: 'juneau' },
      { name: 'Sitka', slug: 'sitka' },
      { name: 'Ketchikan', slug: 'ketchikan' }
    ]
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    slug: 'az',
    cities: [
      { name: 'Phoenix', slug: 'phoenix' },
      { name: 'Tucson', slug: 'tucson' },
      { name: 'Mesa', slug: 'mesa' },
      { name: 'Chandler', slug: 'chandler' },
      { name: 'Scottsdale', slug: 'scottsdale' }
    ]
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
    slug: 'ar',
    cities: [
      { name: 'Little Rock', slug: 'little-rock' },
      { name: 'Fort Smith', slug: 'fort-smith' },
      { name: 'Fayetteville', slug: 'fayetteville' },
      { name: 'Springdale', slug: 'springdale' },
      { name: 'Jonesboro', slug: 'jonesboro' }
    ]
  },
  {
    name: 'California',
    abbreviation: 'CA',
    slug: 'ca',
    cities: [
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'San Diego', slug: 'san-diego' },
      { name: 'San Jose', slug: 'san-jose' },
      { name: 'San Francisco', slug: 'san-francisco' },
      { name: 'Fresno', slug: 'fresno' }
    ]
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    slug: 'co',
    cities: [
      { name: 'Denver', slug: 'denver' },
      { name: 'Colorado Springs', slug: 'colorado-springs' },
      { name: 'Aurora', slug: 'aurora' },
      { name: 'Fort Collins', slug: 'fort-collins' },
      { name: 'Lakewood', slug: 'lakewood' }
    ]
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
    slug: 'ct',
    cities: [
      { name: 'Bridgeport', slug: 'bridgeport' },
      { name: 'New Haven', slug: 'new-haven' },
      { name: 'Hartford', slug: 'hartford' },
      { name: 'Stamford', slug: 'stamford' },
      { name: 'Waterbury', slug: 'waterbury' }
    ]
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
    slug: 'de',
    cities: [
      { name: 'Wilmington', slug: 'wilmington' },
      { name: 'Dover', slug: 'dover' },
      { name: 'Newark', slug: 'newark' },
      { name: 'Middletown', slug: 'middletown' },
      { name: 'Smyrna', slug: 'smyrna' }
    ]
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
    slug: 'fl',
    cities: [
      { name: 'Jacksonville', slug: 'jacksonville' },
      { name: 'Miami', slug: 'miami' },
      { name: 'Tampa', slug: 'tampa' },
      { name: 'Orlando', slug: 'orlando' },
      { name: 'St. Petersburg', slug: 'st-petersburg' }
    ]
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    slug: 'ga',
    cities: [
      { name: 'Atlanta', slug: 'atlanta' },
      { name: 'Augusta', slug: 'augusta' },
      { name: 'Columbus', slug: 'columbus' },
      { name: 'Macon', slug: 'macon' },
      { name: 'Savannah', slug: 'savannah' }
    ]
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
    slug: 'hi',
    cities: [
      { name: 'Honolulu', slug: 'honolulu' },
      { name: 'Pearl City', slug: 'pearl-city' },
      { name: 'Hilo', slug: 'hilo' },
      { name: 'Kailua', slug: 'kailua' },
      { name: 'Waipahu', slug: 'waipahu' }
    ]
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
    slug: 'id',
    cities: [
      { name: 'Boise', slug: 'boise' },
      { name: 'Meridian', slug: 'meridian' },
      { name: 'Nampa', slug: 'nampa' },
      { name: 'Idaho Falls', slug: 'idaho-falls' },
      { name: 'Pocatello', slug: 'pocatello' }
    ]
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
    slug: 'il',
    cities: [
      { name: 'Chicago', slug: 'chicago' },
      { name: 'Aurora', slug: 'aurora' },
      { name: 'Rockford', slug: 'rockford' },
      { name: 'Joliet', slug: 'joliet' },
      { name: 'Naperville', slug: 'naperville' }
    ]
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
    slug: 'in',
    cities: [
      { name: 'Indianapolis', slug: 'indianapolis' },
      { name: 'Fort Wayne', slug: 'fort-wayne' },
      { name: 'Evansville', slug: 'evansville' },
      { name: 'South Bend', slug: 'south-bend' },
      { name: 'Carmel', slug: 'carmel' }
    ]
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
    slug: 'ia',
    cities: [
      { name: 'Des Moines', slug: 'des-moines' },
      { name: 'Cedar Rapids', slug: 'cedar-rapids' },
      { name: 'Davenport', slug: 'davenport' },
      { name: 'Sioux City', slug: 'sioux-city' },
      { name: 'Iowa City', slug: 'iowa-city' }
    ]
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
    slug: 'ks',
    cities: [
      { name: 'Wichita', slug: 'wichita' },
      { name: 'Overland Park', slug: 'overland-park' },
      { name: 'Kansas City', slug: 'kansas-city' },
      { name: 'Olathe', slug: 'olathe' },
      { name: 'Topeka', slug: 'topeka' }
    ]
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
    slug: 'ky',
    cities: [
      { name: 'Louisville', slug: 'louisville' },
      { name: 'Lexington', slug: 'lexington' },
      { name: 'Bowling Green', slug: 'bowling-green' },
      { name: 'Owensboro', slug: 'owensboro' },
      { name: 'Covington', slug: 'covington' }
    ]
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
    slug: 'la',
    cities: [
      { name: 'New Orleans', slug: 'new-orleans' },
      { name: 'Baton Rouge', slug: 'baton-rouge' },
      { name: 'Shreveport', slug: 'shreveport' },
      { name: 'Lafayette', slug: 'lafayette' },
      { name: 'Lake Charles', slug: 'lake-charles' }
    ]
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
    slug: 'me',
    cities: [
      { name: 'Portland', slug: 'portland' },
      { name: 'Lewiston', slug: 'lewiston' },
      { name: 'Bangor', slug: 'bangor' },
      { name: 'South Portland', slug: 'south-portland' },
      { name: 'Auburn', slug: 'auburn' }
    ]
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
    slug: 'md',
    cities: [
      { name: 'Baltimore', slug: 'baltimore' },
      { name: 'Frederick', slug: 'frederick' },
      { name: 'Rockville', slug: 'rockville' },
      { name: 'Gaithersburg', slug: 'gaithersburg' },
      { name: 'Bowie', slug: 'bowie' }
    ]
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
    slug: 'ma',
    cities: [
      { name: 'Boston', slug: 'boston' },
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Springfield', slug: 'springfield' },
      { name: 'Lowell', slug: 'lowell' },
      { name: 'Cambridge', slug: 'cambridge' }
    ]
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
    slug: 'mi',
    cities: [
      { name: 'Detroit', slug: 'detroit' },
      { name: 'Grand Rapids', slug: 'grand-rapids' },
      { name: 'Warren', slug: 'warren' },
      { name: 'Sterling Heights', slug: 'sterling-heights' },
      { name: 'Lansing', slug: 'lansing' }
    ]
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
    slug: 'mn',
    cities: [
      { name: 'Minneapolis', slug: 'minneapolis' },
      { name: 'Saint Paul', slug: 'saint-paul' },
      { name: 'Rochester', slug: 'rochester' },
      { name: 'Duluth', slug: 'duluth' },
      { name: 'Bloomington', slug: 'bloomington' }
    ]
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
    slug: 'ms',
    cities: [
      { name: 'Jackson', slug: 'jackson' },
      { name: 'Gulfport', slug: 'gulfport' },
      { name: 'Southaven', slug: 'southaven' },
      { name: 'Hattiesburg', slug: 'hattiesburg' },
      { name: 'Biloxi', slug: 'biloxi' }
    ]
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
    slug: 'mo',
    cities: [
      { name: 'Kansas City', slug: 'kansas-city' },
      { name: 'Saint Louis', slug: 'saint-louis' },
      { name: 'Springfield', slug: 'springfield' },
      { name: 'Independence', slug: 'independence' },
      { name: 'Columbia', slug: 'columbia' }
    ]
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
    slug: 'mt',
    cities: [
      { name: 'Billings', slug: 'billings' },
      { name: 'Missoula', slug: 'missoula' },
      { name: 'Great Falls', slug: 'great-falls' },
      { name: 'Bozeman', slug: 'bozeman' },
      { name: 'Butte', slug: 'butte' }
    ]
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
    slug: 'ne',
    cities: [
      { name: 'Omaha', slug: 'omaha' },
      { name: 'Lincoln', slug: 'lincoln' },
      { name: 'Bellevue', slug: 'bellevue' },
      { name: 'Grand Island', slug: 'grand-island' },
      { name: 'Kearney', slug: 'kearney' }
    ]
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
    slug: 'nv',
    cities: [
      { name: 'Las Vegas', slug: 'las-vegas' },
      { name: 'Henderson', slug: 'henderson' },
      { name: 'Reno', slug: 'reno' },
      { name: 'North Las Vegas', slug: 'north-las-vegas' },
      { name: 'Sparks', slug: 'sparks' }
    ]
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
    slug: 'nh',
    cities: [
      { name: 'Manchester', slug: 'manchester' },
      { name: 'Nashua', slug: 'nashua' },
      { name: 'Concord', slug: 'concord' },
      { name: 'Derry', slug: 'derry' },
      { name: 'Rochester', slug: 'rochester' }
    ]
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
    slug: 'nj',
    cities: [
      { name: 'Newark', slug: 'newark' },
      { name: 'Jersey City', slug: 'jersey-city' },
      { name: 'Paterson', slug: 'paterson' },
      { name: 'Elizabeth', slug: 'elizabeth' },
      { name: 'Edison', slug: 'edison' }
    ]
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
    slug: 'nm',
    cities: [
      { name: 'Albuquerque', slug: 'albuquerque' },
      { name: 'Las Cruces', slug: 'las-cruces' },
      { name: 'Rio Rancho', slug: 'rio-rancho' },
      { name: 'Santa Fe', slug: 'santa-fe' },
      { name: 'Roswell', slug: 'roswell' }
    ]
  },
  {
    name: 'New York',
    abbreviation: 'NY',
    slug: 'ny',
    cities: [
      { name: 'New York City', slug: 'new-york-city' },
      { name: 'Buffalo', slug: 'buffalo' },
      { name: 'Rochester', slug: 'rochester' },
      { name: 'Yonkers', slug: 'yonkers' },
      { name: 'Syracuse', slug: 'syracuse' }
    ]
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
    slug: 'nc',
    cities: [
      { name: 'Charlotte', slug: 'charlotte' },
      { name: 'Raleigh', slug: 'raleigh' },
      { name: 'Greensboro', slug: 'greensboro' },
      { name: 'Durham', slug: 'durham' },
      { name: 'Winston-Salem', slug: 'winston-salem' }
    ]
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
    slug: 'nd',
    cities: [
      { name: 'Fargo', slug: 'fargo' },
      { name: 'Bismarck', slug: 'bismarck' },
      { name: 'Grand Forks', slug: 'grand-forks' },
      { name: 'Minot', slug: 'minot' },
      { name: 'West Fargo', slug: 'west-fargo' }
    ]
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
    slug: 'oh',
    cities: [
      { name: 'Columbus', slug: 'columbus' },
      { name: 'Cleveland', slug: 'cleveland' },
      { name: 'Cincinnati', slug: 'cincinnati' },
      { name: 'Toledo', slug: 'toledo' },
      { name: 'Akron', slug: 'akron' }
    ]
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
    slug: 'ok',
    cities: [
      { name: 'Oklahoma City', slug: 'oklahoma-city' },
      { name: 'Tulsa', slug: 'tulsa' },
      { name: 'Norman', slug: 'norman' },
      { name: 'Broken Arrow', slug: 'broken-arrow' },
      { name: 'Lawton', slug: 'lawton' }
    ]
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
    slug: 'or',
    cities: [
      { name: 'Portland', slug: 'portland' },
      { name: 'Eugene', slug: 'eugene' },
      { name: 'Salem', slug: 'salem' },
      { name: 'Gresham', slug: 'gresham' },
      { name: 'Hillsboro', slug: 'hillsboro' }
    ]
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    slug: 'pa',
    cities: [
      { name: 'Philadelphia', slug: 'philadelphia' },
      { name: 'Pittsburgh', slug: 'pittsburgh' },
      { name: 'Allentown', slug: 'allentown' },
      { name: 'Erie', slug: 'erie' },
      { name: 'Reading', slug: 'reading' }
    ]
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
    slug: 'ri',
    cities: [
      { name: 'Providence', slug: 'providence' },
      { name: 'Warwick', slug: 'warwick' },
      { name: 'Cranston', slug: 'cranston' },
      { name: 'Pawtucket', slug: 'pawtucket' },
      { name: 'East Providence', slug: 'east-providence' }
    ]
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
    slug: 'sc',
    cities: [
      { name: 'Charleston', slug: 'charleston' },
      { name: 'Columbia', slug: 'columbia' },
      { name: 'North Charleston', slug: 'north-charleston' },
      { name: 'Mount Pleasant', slug: 'mount-pleasant' },
      { name: 'Rock Hill', slug: 'rock-hill' }
    ]
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
    slug: 'sd',
    cities: [
      { name: 'Sioux Falls', slug: 'sioux-falls' },
      { name: 'Rapid City', slug: 'rapid-city' },
      { name: 'Aberdeen', slug: 'aberdeen' },
      { name: 'Brookings', slug: 'brookings' },
      { name: 'Watertown', slug: 'watertown' }
    ]
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
    slug: 'tn',
    cities: [
      { name: 'Nashville', slug: 'nashville' },
      { name: 'Memphis', slug: 'memphis' },
      { name: 'Knoxville', slug: 'knoxville' },
      { name: 'Chattanooga', slug: 'chattanooga' },
      { name: 'Clarksville', slug: 'clarksville' }
    ]
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
    slug: 'tx',
    cities: [
      { name: 'Houston', slug: 'houston' },
      { name: 'San Antonio', slug: 'san-antonio' },
      { name: 'Dallas', slug: 'dallas' },
      { name: 'Austin', slug: 'austin' },
      { name: 'Fort Worth', slug: 'fort-worth' }
    ]
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
    slug: 'ut',
    cities: [
      { name: 'Salt Lake City', slug: 'salt-lake-city' },
      { name: 'West Valley City', slug: 'west-valley-city' },
      { name: 'Provo', slug: 'provo' },
      { name: 'West Jordan', slug: 'west-jordan' },
      { name: 'Orem', slug: 'orem' }
    ]
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
    slug: 'vt',
    cities: [
      { name: 'Burlington', slug: 'burlington' },
      { name: 'Essex', slug: 'essex' },
      { name: 'South Burlington', slug: 'south-burlington' },
      { name: 'Colchester', slug: 'colchester' },
      { name: 'Rutland', slug: 'rutland' }
    ]
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
    slug: 'va',
    cities: [
      { name: 'Virginia Beach', slug: 'virginia-beach' },
      { name: 'Norfolk', slug: 'norfolk' },
      { name: 'Chesapeake', slug: 'chesapeake' },
      { name: 'Richmond', slug: 'richmond' },
      { name: 'Newport News', slug: 'newport-news' }
    ]
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
    slug: 'wa',
    cities: [
      { name: 'Seattle', slug: 'seattle' },
      { name: 'Spokane', slug: 'spokane' },
      { name: 'Tacoma', slug: 'tacoma' },
      { name: 'Vancouver', slug: 'vancouver' },
      { name: 'Bellevue', slug: 'bellevue' }
    ]
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
    slug: 'wv',
    cities: [
      { name: 'Charleston', slug: 'charleston' },
      { name: 'Huntington', slug: 'huntington' },
      { name: 'Parkersburg', slug: 'parkersburg' },
      { name: 'Morgantown', slug: 'morgantown' },
      { name: 'Wheeling', slug: 'wheeling' }
    ]
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
    slug: 'wi',
    cities: [
      { name: 'Milwaukee', slug: 'milwaukee' },
      { name: 'Madison', slug: 'madison' },
      { name: 'Green Bay', slug: 'green-bay' },
      { name: 'Kenosha', slug: 'kenosha' },
      { name: 'Racine', slug: 'racine' }
    ]
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
    slug: 'wy',
    cities: [
      { name: 'Cheyenne', slug: 'cheyenne' },
      { name: 'Casper', slug: 'casper' },
      { name: 'Laramie', slug: 'laramie' },
      { name: 'Gillette', slug: 'gillette' },
      { name: 'Rock Springs', slug: 'rock-springs' }
    ]
  }
];

export const countries: Country[] = [
  {
    name: 'United States',
    slug: 'us',
    states: usStates
  }
];

// Helper functions
export const findStateBySlug = (stateSlug: string): State | undefined => {
  return usStates.find(state => state.slug === stateSlug);
};

export const findCityBySlug = (stateSlug: string, citySlug: string): City | undefined => {
  const state = findStateBySlug(stateSlug);
  return state?.cities.find(city => city.slug === citySlug);
};

export const getLocationBreadcrumb = (country: string, state: string, city: string) => {
  const countryData = countries.find(c => c.slug === country);
  const stateData = findStateBySlug(state);
  const cityData = findCityBySlug(state, city);
  
  return {
    country: countryData,
    state: stateData,
    city: cityData
  };
};
