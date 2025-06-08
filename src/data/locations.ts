export interface CityData {
  name: string;
  slug: string;
}

export interface StateData {
  name: string;
  abbreviation: string;
  slug: string;
  cities: CityData[];
}

export interface CountryData {
  name: string;
  slug: string;
  states: Record<string, StateData>;
}

export const locations: Record<string, CountryData> = {
  usa: {
    name: 'United States',
    slug: 'usa',
    states: {
      california: {
        name: 'California',
        abbreviation: 'CA',
        slug: 'california',
        cities: [
          { name: 'Los Angeles', slug: 'los-angeles' },
          { name: 'San Francisco', slug: 'san-francisco' },
          { name: 'San Diego', slug: 'san-diego' },
          { name: 'Sacramento', slug: 'sacramento' },
          { name: 'Oakland', slug: 'oakland' },
          { name: 'Fresno', slug: 'fresno' },
          { name: 'Long Beach', slug: 'long-beach' },
          { name: 'Anaheim', slug: 'anaheim' },
          { name: 'Santa Ana', slug: 'santa-ana' },
          { name: 'Riverside', slug: 'riverside' },
          { name: 'Stockton', slug: 'stockton' },
          { name: 'Bakersfield', slug: 'bakersfield' },
          { name: 'Fremont', slug: 'fremont' },
          { name: 'San Jose', slug: 'san-jose' },
          { name: 'Irvine', slug: 'irvine' },
          { name: 'Chula Vista', slug: 'chula-vista' },
          { name: 'San Bernardino', slug: 'san-bernardino' },
          { name: 'Modesto', slug: 'modesto' },
          { name: 'Santa Clarita', slug: 'santa-clarita' },
          { name: 'Oxnard', slug: 'oxnard' },
          { name: 'Fontana', slug: 'fontana' },
          { name: 'Moreno Valley', slug: 'moreno-valley' },
          { name: 'Glendale', slug: 'glendale' },
          { name: 'Huntington Beach', slug: 'huntington-beach' },
          { name: 'Santa Rosa', slug: 'santa-rosa' },
          { name: 'Oceanside', slug: 'oceanside' },
          { name: 'Garden Grove', slug: 'garden-grove' },
          { name: 'Rancho Cucamonga', slug: 'rancho-cucamonga' },
          { name: 'Ontario', slug: 'ontario' },
          { name: 'Corona', slug: 'corona' }
        ]
      },
      texas: {
        name: 'Texas',
        abbreviation: 'TX',
        slug: 'texas',
        cities: [
          { name: 'Houston', slug: 'houston' },
          { name: 'San Antonio', slug: 'san-antonio' },
          { name: 'Dallas', slug: 'dallas' },
          { name: 'Austin', slug: 'austin' },
          { name: 'Fort Worth', slug: 'fort-worth' },
          { name: 'El Paso', slug: 'el-paso' },
          { name: 'Arlington', slug: 'arlington' },
          { name: 'Corpus Christi', slug: 'corpus-christi' },
          { name: 'Plano', slug: 'plano' },
          { name: 'Lubbock', slug: 'lubbock' },
          { name: 'Laredo', slug: 'laredo' },
          { name: 'Irving', slug: 'irving' },
          { name: 'Garland', slug: 'garland' },
          { name: 'Frisco', slug: 'frisco' },
          { name: 'McKinney', slug: 'mckinney' },
          { name: 'Amarillo', slug: 'amarillo' },
          { name: 'Grand Prairie', slug: 'grand-prairie' },
          { name: 'Brownsville', slug: 'brownsville' },
          { name: 'Killeen', slug: 'killeen' },
          { name: 'Pasadena', slug: 'pasadena' },
          { name: 'Mesquite', slug: 'mesquite' },
          { name: 'Denton', slug: 'denton' },
          { name: 'McAllen', slug: 'mcallen' },
          { name: 'Waco', slug: 'waco' },
          { name: 'Round Rock', slug: 'round-rock' },
          { name: 'Abilene', slug: 'abilene' },
          { name: 'Beaumont', slug: 'beaumont' },
          { name: 'Odessa', slug: 'odessa' },
          { name: 'Richardson', slug: 'richardson' },
          { name: 'Lewisville', slug: 'lewisville' }
        ]
      },
      florida: {
        name: 'Florida',
        abbreviation: 'FL',
        slug: 'florida',
        cities: [
          { name: 'Jacksonville', slug: 'jacksonville' },
          { name: 'Miami', slug: 'miami' },
          { name: 'Tampa', slug: 'tampa' },
          { name: 'Orlando', slug: 'orlando' },
          { name: 'St. Petersburg', slug: 'st-petersburg' },
          { name: 'Hialeah', slug: 'hialeah' },
          { name: 'Tallahassee', slug: 'tallahassee' },
          { name: 'Fort Lauderdale', slug: 'fort-lauderdale' },
          { name: 'Port St. Lucie', slug: 'port-st-lucie' },
          { name: 'Cape Coral', slug: 'cape-coral' },
          { name: 'Pembroke Pines', slug: 'pembroke-pines' },
          { name: 'Hollywood', slug: 'hollywood' },
          { name: 'Miramar', slug: 'miramar' },
          { name: 'Gainesville', slug: 'gainesville' },
          { name: 'Coral Springs', slug: 'coral-springs' },
          { name: 'Miami Gardens', slug: 'miami-gardens' },
          { name: 'Clearwater', slug: 'clearwater' },
          { name: 'Palm Bay', slug: 'palm-bay' },
          { name: 'West Palm Beach', slug: 'west-palm-beach' },
          { name: 'Pompano Beach', slug: 'pompano-beach' },
          { name: 'Lakeland', slug: 'lakeland' },
          { name: 'Davie', slug: 'davie' },
          { name: 'Miami Beach', slug: 'miami-beach' },
          { name: 'Sunrise', slug: 'sunrise' },
          { name: 'Boca Raton', slug: 'boca-raton' },
          { name: 'Deltona', slug: 'deltona' },
          { name: 'Plantation', slug: 'plantation' },
          { name: 'Palm Coast', slug: 'palm-coast' },
          { name: 'Largo', slug: 'largo' },
          { name: 'Melbourne', slug: 'melbourne' }
        ]
      },
      newyork: {
        name: 'New York',
        abbreviation: 'NY',
        slug: 'newyork',
        cities: [
          { name: 'New York City', slug: 'new-york-city' },
          { name: 'Buffalo', slug: 'buffalo' },
          { name: 'Rochester', slug: 'rochester' },
          { name: 'Yonkers', slug: 'yonkers' },
          { name: 'Syracuse', slug: 'syracuse' },
          { name: 'Albany', slug: 'albany' },
          { name: 'New Rochelle', slug: 'new-rochelle' },
          { name: 'Mount Vernon', slug: 'mount-vernon' },
          { name: 'Schenectady', slug: 'schenectady' },
          { name: 'Utica', slug: 'utica' },
          { name: 'White Plains', slug: 'white-plains' },
          { name: 'Troy', slug: 'troy' },
          { name: 'Niagara Falls', slug: 'niagara-falls' },
          { name: 'Binghamton', slug: 'binghamton' },
          { name: 'Freeport', slug: 'freeport' },
          { name: 'Valley Stream', slug: 'valley-stream' },
          { name: 'Long Beach', slug: 'long-beach-ny' },
          { name: 'Rome', slug: 'rome' },
          { name: 'Ithaca', slug: 'ithaca' },
          { name: 'Cheektowaga', slug: 'cheektowaga' },
          { name: 'West Seneca', slug: 'west-seneca' },
          { name: 'Jamestown', slug: 'jamestown' },
          { name: 'Elmira', slug: 'elmira' },
          { name: 'Tonawanda', slug: 'tonawanda' },
          { name: 'Poughkeepsie', slug: 'poughkeepsie' },
          { name: 'Middletown', slug: 'middletown' },
          { name: 'Auburn', slug: 'auburn' },
          { name: 'Watertown', slug: 'watertown' },
          { name: 'Port Chester', slug: 'port-chester' },
          { name: 'Newburgh', slug: 'newburgh' }
        ]
      },
      illinois: {
        name: 'Illinois',
        abbreviation: 'IL',
        slug: 'illinois',
        cities: [
          { name: 'Chicago', slug: 'chicago' },
          { name: 'Aurora', slug: 'aurora' },
          { name: 'Joliet', slug: 'joliet' },
          { name: 'Naperville', slug: 'naperville' },
          { name: 'Rockford', slug: 'rockford' },
          { name: 'Elgin', slug: 'elgin' },
          { name: 'Peoria', slug: 'peoria' },
          { name: 'Springfield', slug: 'springfield' },
          { name: 'Waukegan', slug: 'waukegan' },
          { name: 'Cicero', slug: 'cicero' },
          { name: 'Champaign', slug: 'champaign' },
          { name: 'Bloomington', slug: 'bloomington' },
          { name: 'Arlington Heights', slug: 'arlington-heights' },
          { name: 'Evanston', slug: 'evanston' },
          { name: 'Schaumburg', slug: 'schaumburg' },
          { name: 'Bolingbrook', slug: 'bolingbrook' },
          { name: 'Palatine', slug: 'palatine' },
          { name: 'Skokie', slug: 'skokie' },
          { name: 'Des Plaines', slug: 'des-plaines' },
          { name: 'Oak Lawn', slug: 'oak-lawn' },
          { name: 'Berwyn', slug: 'berwyn' },
          { name: 'Mount Prospect', slug: 'mount-prospect' },
          { name: 'Normal', slug: 'normal' },
          { name: 'Wheaton', slug: 'wheaton' },
          { name: 'Hoffman Estates', slug: 'hoffman-estates' },
          { name: 'Oak Park', slug: 'oak-park' },
          { name: 'Downers Grove', slug: 'downers-grove' },
          { name: 'Elmhurst', slug: 'elmhurst' },
          { name: 'DeKalb', slug: 'dekalb' },
          { name: 'Lombard', slug: 'lombard' }
        ]
      }
    }
  }
};

export const getLocationBreadcrumb = (countrySlug: string, stateSlug: string, citySlug: string | undefined) => {
  const country = locations[countrySlug];
  const state = country?.states[stateSlug];
  const city = state?.cities.find(city => city.slug === citySlug);

  return {
    country,
    state,
    city,
  };
};
