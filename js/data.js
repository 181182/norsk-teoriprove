// Norwegian Driving School - Comprehensive Question & Content Database
// Based on Statens vegvesen curriculum

const CATEGORIES = [
  { id: 'trafikkregler', name: 'Trafikkregler', icon: '📋', color: '#e74c3c', description: 'Grunnleggende regler for ferdsel i trafikken' },
  { id: 'skilt', name: 'Trafikkskilt', icon: '🚦', color: '#e67e22', description: 'Alle typer trafikkskilt og deres betydning' },
  { id: 'vikeplikt', name: 'Vikeplikt', icon: '⚠️', color: '#f39c12', description: 'Regler for hvem som har vikeplikt' },
  { id: 'fart', name: 'Fartsgrenser', icon: '🏎️', color: '#27ae60', description: 'Fartsgrenser og fartsjustering' },
  { id: 'kjoretoy', name: 'Kjøretøy', icon: '🚗', color: '#2980b9', description: 'Kjøretøyets tekniske krav og utstyr' },
  { id: 'miljo', name: 'Miljø & Sikkerhet', icon: '🌱', color: '#16a085', description: 'Miljøvennlig kjøring og trafikksikkerhet' },
  { id: 'forstehjelp', name: 'Førstehjelp', icon: '🏥', color: '#8e44ad', description: 'Førstehjelp ved trafikkulykker' },
  { id: 'parkering', name: 'Parkering', icon: '🅿️', color: '#2c3e50', description: 'Regler for parkering og stans' },
  { id: 'mørke', name: 'Mørke & Sikt', icon: '🌙', color: '#34495e', description: 'Kjøring i mørke og dårlig sikt' },
  { id: 'vegoppmerking', name: 'Vegoppmerking', icon: '🛣️', color: '#c0392b', description: 'Oppmerking på vegbanen' },
];

const QUESTIONS = [
  // ========== TRAFIKKREGLER ==========
  {
    id: 1, category: 'trafikkregler', difficulty: 'lett',
    question: 'Hva er høyreregelen i trafikken?',
    options: [
      'Du skal alltid gi vikeplikt for trafikk fra høyre',
      'Du skal alltid kjøre i høyre fil',
      'Du skal svinge til høyre ved alle kryss',
      'Du har alltid forkjørsrett når du kjører til høyre'
    ],
    correct: 0,
    explanation: 'Høyreregelen betyr at du skal gi vikeplikt for trafikk som kommer fra høyre, med mindre annet er bestemt av skilt eller oppmerking. Dette er grunnregelen i norsk trafikk.'
  },
  {
    id: 2, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva betyr det å kjøre på en prioritert veg?',
    options: [
      'Du må alltid stoppe ved alle kryss',
      'Du har forkjørsrett over kryssende veger markert med vikepliktskilt',
      'Du kan kjøre fortere enn normalt fartsgrense',
      'Du trenger ikke bruke blinklys'
    ],
    correct: 1,
    explanation: 'På en prioritert veg (markert med skilt 202 "Forkjørsveg") har du forkjørsrett overfor trafikanter fra kryssende veger som er merket med vikepliktskilt (306) eller stoppskilt (306.1).'
  },
  {
    id: 3, category: 'trafikkregler', difficulty: 'lett',
    question: 'Når skal du bruke blinklys?',
    options: [
      'Bare når du svinger i lyskryss',
      'Alltid når du endrer retning, skifter fil eller kjører inn/ut av parkeringsplass',
      'Bare når det er mye trafikk',
      'Bare på motorveg'
    ],
    correct: 1,
    explanation: 'Du skal alltid bruke blinklys i god tid før du endrer retning, skifter fil, svingerog kjører inn eller ut fra parkeringsplasser, veikryss og lignende.'
  },
  {
    id: 4, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva er forbudt når du nærmer deg et fotgjengerfelt?',
    options: [
      'Å bruke horn',
      'Å øke farten slik at fotgjengere må skynde seg',
      'Å sette på fjernlys',
      'Alle svaralternativene er riktige'
    ],
    correct: 1,
    explanation: 'Du har plikt til å stoppe for fotgjengere som befinner seg i eller er på vei ut i fotgjengerfeltet. Det er forbudt å øke farten slik at fotgjengere hindres eller skremmels. Fotgjengere har alltid forkjørsrett i fotgjengerfelt.'
  },
  {
    id: 5, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Du kjører i 80 km/t og ser et barn løpe mot veien. Hva gjør du?',
    options: [
      'Bremser kraftig og blåser i hornet',
      'Bremser kontrollert, er klar til å stoppe og varsler med horn',
      'Svinger raskt til andre kjørebane',
      'Bremser og peker for barnet å stoppe'
    ],
    correct: 1,
    explanation: 'Ved fare for barn eller fotgjengere nær veien skal du bremse kontrollert (unngå ABS-sjokk) og vise at du har sett dem. Horn brukes som varsel, men du skal primært bremse og redusere fart for å unngå ulykke.'
  },
  {
    id: 6, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva er viktig når du skal foreta en forbikjøring?',
    options: [
      'Du må ha god sikt og nok plass til å gjennomføre forbikjøringen trygt',
      'Du trenger bare sørge for at foran deg er klart',
      'Forbikjøring er alltid tillatt på tofelts veg',
      'Du trenger ikke bruke blinklys på motorveg'
    ],
    correct: 0,
    explanation: 'Forbikjøring krever god sikt, nok avstand til motkommende trafikk, og at du kan returnere til høyre felt trygt. Du skal signalisere med blinklys, og det er forbudt å foreta forbikjøring der dette er merket med skilt eller oppmerking.'
  },
  {
    id: 7, category: 'trafikkregler', difficulty: 'lett',
    question: 'Hvor langt fra et veikryss er det forbudt å parkere?',
    options: ['5 meter', '10 meter', '15 meter', '20 meter'],
    correct: 1,
    explanation: 'Det er forbudt å parkere nærmere enn 10 meter fra et veikryss. Dette gjelder fra kanten av den tverrgående vegbanen.'
  },
  {
    id: 8, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva gjelder for mobilbruk under kjøring?',
    options: [
      'Det er lov å holde telefonen i hånden hvis du kjører sakte',
      'Det er forbudt å holde mobiltelefon i hånden under kjøring',
      'Det er lov å sende SMS når du stopper i rødt lys',
      'Handsfree er ikke tillatt i bil'
    ],
    correct: 1,
    explanation: 'Det er forbudt å holde mobiltelefon i hånden mens du kjører. Du kan bruke handsfree. Forbudet gjelder også i stillestående trafikk og ved rødt lys. Bøtesatsen er høy og du risikerer prikker på førerkortet.'
  },
  {
    id: 9, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Hva er regelen for kjøring i rundkjøring?',
    options: [
      'Trafikk inne i rundkjøringen har vikeplikt for innkjørende trafikk',
      'Trafikk som kjører inn i rundkjøringen har vikeplikt for trafikk som allerede er i rundkjøringen',
      'Høyreregelen gjelder alltid i rundkjøringer',
      'Alle kjøretøy i rundkjøring har lik prioritet'
    ],
    correct: 1,
    explanation: 'I rundkjøringer markert med skilt 132 (Rundkjøring) skal innkjørende trafikk vike for trafikk som allerede er i rundkjøringen. Dette er merket med vikepliktskilt (306) ved innkjøringen.'
  },
  {
    id: 10, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva er kravet til sikkerhetsbelte?',
    options: [
      'Bare sjåfør trenger belte',
      'Alle i bilen skal bruke sikkerhetsbelte',
      'Belte er bare påkrevd på motorveg',
      'Barn under 10 år trenger ikke belte i baksetet'
    ],
    correct: 1,
    explanation: 'Alle passasjerer i bilen er pliktig til å bruke sikkerhetsbelte. Sjåføren har ansvar for at barn under 15 år er fastspent. Det er bøter for manglende bruk av belte.'
  },
  {
    id: 11, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva skal du gjøre hvis du kommer til et jernbanekryss uten lys og bom?',
    options: [
      'Kjøre over uten å bremse',
      'Stoppe, se og lytte begge veier, deretter kjøre forsiktig over',
      'Alltid kjøre over i 1. gir',
      'Blinke med lysene og kjøre over'
    ],
    correct: 1,
    explanation: 'Ved planovergang uten lyssignal og bom skal du alltid stoppe, se og lytte etter tog i begge retninger. Når du er sikker på at ingen tog er på vei, kan du kjøre forsiktig over. Toget har alltid forkjørsrett.'
  },
  {
    id: 12, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Hva gjelder for overtaking på høyre side?',
    options: [
      'Det er alltid forbudt',
      'Det er tillatt når trafikken går saktere i venstre fil enn i høyre fil',
      'Det er tillatt hvis det er tydelig plass',
      'Det er kun tillatt på motorveg'
    ],
    correct: 1,
    explanation: 'Forbikjøring på høyre side er normalt forbudt, men tillatt når trafikken i venstre fil beveger seg tregere enn i høyre fil, eller ved kjøring i parallellfiler. Dette kalles "kø-forbikjøring".'
  },

  // ========== TRAFIKKSKILT ==========
  {
    id: 13, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr et rødt trekantskilt med hvit bakgrunn?',
    options: [
      'Påbudsskilt',
      'Advarselsskilt - varsler om fare',
      'Forbudsskilt',
      'Informasjonsskilt'
    ],
    correct: 1,
    explanation: 'Røde trekantskilt med hvit bakgrunn er advarselsskilt. De varsler om fare eller spesielle forhold som krever særlig aktsomhet. Eksempler: vegkryss (102), sving (103), vegsmalning (108).'
  },
  {
    id: 14, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr et rundt skilt med rød kant?',
    options: [
      'Forbudsskilt',
      'Påbudsskilt',
      'Advarselsskilt',
      'Informasjonsskilt'
    ],
    correct: 0,
    explanation: 'Runde skilt med rød kant er forbudsskilt. De forbyr visse typer ferdsel eller adferd. Eksempler: innkjøring forbudt (202), parkering forbudt (372), forbikjøring forbudt (306).'
  },
  {
    id: 15, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et rundt blått skilt?',
    options: [
      'Forbudsskilt',
      'Påbudsskilt - du må følge instruksjonen',
      'Informasjonsskilt',
      'Advarselsskilt'
    ],
    correct: 1,
    explanation: 'Runde blå skilt er påbudsskilt. De angir et påbud som kjørende MÅ følge. Eksempler: kjøreretning (403), gang og sykkelveg (522), sykkelfelt (523).'
  },
  {
    id: 16, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr skilt 306 (en trekant med nesen ned)?',
    options: [
      'Stopp',
      'Vikeplikt',
      'Forbudt å kjøre',
      'Enveiskjøring'
    ],
    correct: 1,
    explanation: 'Skilt 306 er vikepliktsskiltet (invertert trekant). Det betyr at du har vikeplikt for all trafikk på kryssende og møtende veg. Du MÅ vike for annen trafikk.'
  },
  {
    id: 17, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et åttekantet rødt STOPP-skilt?',
    options: [
      'Du skal redusere farten',
      'Du skal stoppe fullstendig og gi alle andre vikeplikt',
      'Du har forkjørsrett',
      'Du skal stoppe bare for fotgjengere'
    ],
    correct: 1,
    explanation: 'STOPP-skiltet (306.1) krever at du stopper fullstendig ved stopplinja og gir vikeplikt for ALL trafikk. Du må stoppe selv om du ikke ser noen trafikk. Det er strengere enn vanlig vikepliktskilt.'
  },
  {
    id: 18, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et gult diamantformet skilt?',
    options: [
      'Advarsel om kurve',
      'Forkjørsveg - du har forkjørsrett',
      'Prioritert vegkryss',
      'Stans forbudt'
    ],
    correct: 1,
    explanation: 'Det gule diamantskylten (202) markerer forkjørsvegen. Når du kjører på en veg merket med dette skiltet, har du forkjørsrett over trafikk fra kryssende veger.'
  },
  {
    id: 19, category: 'skilt', difficulty: 'vanskelig',
    question: 'Hva betyr et rundt skilt med rød kant som viser tallet 60?',
    options: [
      'Anbefalt hastighet 60 km/t',
      'Fartsgrense 60 km/t - du kan ikke kjøre fortere',
      'Minimum hastighet 60 km/t',
      'Advarselsone - vær forberedt på 60 km/t sone'
    ],
    correct: 1,
    explanation: 'Rundt skilt med rød kant og et tall er fartsgrenseskilt (forbudsskilt 362). Det betyr at du ikke kan kjøre raskere enn det angitte antall km/t. Fartsgrensen gjelder fra der skiltet er satt opp til neste fartsgrenseskilt eller til standard fartsgrense gjelder.'
  },
  {
    id: 20, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et blått rektangulært skilt med et hvitt "P"?',
    options: [
      'Parkering forbudt',
      'Parkering tillatt',
      'Kun betalt parkering',
      'Parkeringshus i nærheten'
    ],
    correct: 1,
    explanation: 'Det blå P-skiltet (552) betyr at parkering er tillatt på stedet. Eventuelle tilleggsskilt kan angi tidsbegrensninger, avgiftsplikt eller hvem som kan parkere.'
  },
  {
    id: 21, category: 'skilt', difficulty: 'vanskelig',
    question: 'Hva betyr et blått skilt med to sirkler og piler?',
    options: [
      'Rundkjøring er forbudt',
      'Rundkjøring - du skal holde til venstre for midtøya',
      'Tofelts veg',
      'Møteplass på smal veg'
    ],
    correct: 1,
    explanation: 'Skilt 132 (Rundkjøring) viser at du nærmer deg en rundkjøring. Du skal holde til venstre for midtøya og vike for trafikk som allerede er inne i rundkjøringen.'
  },
  {
    id: 22, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr et rødt skilt med en rød strek gjennom (forbudt innkjøring)?',
    options: [
      'Kjøring kun tillatt for godkjente kjøretøy',
      'All innkjøring er forbudt',
      'Stopp og sjekk inn',
      'Bare busser kan kjøre'
    ],
    correct: 1,
    explanation: 'Skilt 202 (Innkjøring forbudt) betyr at all innkjøring er forbudt fra den siden av skiltet. Det brukes blant annet for å markere enveiskjørte gater på utgangsenden.'
  },
  {
    id: 23, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et gult blinkende lys i et lyskryss?',
    options: [
      'Du kan kjøre fort gjennom',
      'Krysset er ikke i bruk - vanlige vikepliktregler gjelder',
      'Kryss er stengt',
      'Politiet dirigerer trafikken'
    ],
    correct: 1,
    explanation: 'Gult blinkende lys betyr at lyssignalene ikke er i normal drift. Da gjelder de vanlige trafikkreglene for kryss, inkludert høyreregelen og skiltede vikepliktregler.'
  },

  // ========== VIKEPLIKT ==========
  {
    id: 24, category: 'vikeplikt', difficulty: 'lett',
    question: 'Du kjører på en vanlig veg og skal inn på en prioritert veg. Hvem har vikeplikt?',
    options: [
      'Du har forkjørsrett',
      'Du har vikeplikt for trafikk på den prioriterte vegen',
      'Høyreregelen gjelder her',
      'Begge kjøretøy har lik prioritet'
    ],
    correct: 1,
    explanation: 'Når du kjører inn på en prioritert veg (forkjørsveg), har du alltid vikeplikt for trafikk på den prioriterte vegen. Den prioriterte vegen er markert med gult diamantskilt.'
  },
  {
    id: 25, category: 'vikeplikt', difficulty: 'middels',
    question: 'Hvem har vikeplikt i et kryss uten skilt (høyreregelen)?',
    options: [
      'Den som kom til krysset sist',
      'Den som kjører fra venstre',
      'Den som kjører fra høyre',
      'Alle har lik rett'
    ],
    correct: 1,
    explanation: 'Høyreregelen sier at du skal gi vikeplikt for trafikk som kommer fra høyre. Den som kjører fra høyre (sett fra deg) har forkjørsrett. Dette er grunnregelen når ikke annet er bestemt.'
  },
  {
    id: 26, category: 'vikeplikt', difficulty: 'middels',
    question: 'Du skal svinge til venstre. Hvem har du vikeplikt for?',
    options: [
      'Bare fotgjengere',
      'Trafikk som kommer imot deg og fotgjengere/syklister du krysser',
      'Bare biler i samme retning som deg',
      'Ingen - du har alltid forkjørsrett når du svinger'
    ],
    correct: 1,
    explanation: 'Når du svinger til venstre, skal du vike for møtende trafikk (rettfram og svingende) og for fotgjengere og syklister du krysser veien for. Venstresvingende kjøretøy har vikeplikt.'
  },
  {
    id: 27, category: 'vikeplikt', difficulty: 'vanskelig',
    question: 'Du skal svinge til høyre og en syklist er til din høyre side. Hvem har vikeplikt?',
    options: [
      'Syklisten har alltid vikeplikt',
      'Du som billist har vikeplikt for syklisten',
      'Den som er i høyre fil har forkjørsrett',
      'Det avhenger av fartsgrensen'
    ],
    correct: 1,
    explanation: 'Når du svinger til høyre og krysser en sykkelveg eller sykkelfelt, har syklisten som fortsetter rettfram forkjørsrett. Du som billist har vikeplikt for syklisten du krysser veien for.'
  },
  {
    id: 28, category: 'vikeplikt', difficulty: 'middels',
    question: 'Hvem har forkjørsrett i en rundkjøring?',
    options: [
      'Den som er størst (lastebil, buss)',
      'Trafikk som allerede er inne i rundkjøringen',
      'Trafikk som kjører inn i rundkjøringen',
      'Den som kom til rundkjøringen først'
    ],
    correct: 1,
    explanation: 'I en rundkjøring merket med skilt 132, har trafikk som allerede er inne i rundkjøringen forkjørsrett. Du som kjører inn i rundkjøringen har vikeplikt (markert med vikepliktskilt ved innkjøringen).'
  },
  {
    id: 29, category: 'vikeplikt', difficulty: 'vanskelig',
    question: 'Du kjører ut fra en bensinstasjon. Hvem har du vikeplikt for?',
    options: [
      'Bare biler til venstre',
      'All trafikk på vegen du kjører ut til',
      'Bare fotgjengere',
      'Ingen, du har forkjørsrett når du kjører ut'
    ],
    correct: 1,
    explanation: 'Når du kjører ut fra en bensinstasjon, parkeringsplass, gårdsveg, garasje eller lignende, har du vikeplikt for all trafikk på den vegen du kjører ut til, inkludert fotgjengere og syklister.'
  },
  {
    id: 30, category: 'vikeplikt', difficulty: 'middels',
    question: 'Sporvogn og buss - hvem har vikeplikt?',
    options: [
      'Sporvogn har alltid forkjørsrett',
      'Biler og sykler har vikeplikt for sporvogner',
      'Det er ingen spesialregler for sporvogn',
      'Sporvogn og bil har samme prioritet'
    ],
    correct: 1,
    explanation: 'Sporvogner har forkjørsrett. Bilister og syklister må vike for sporvogner. Busser som kjører ut fra holdeplass har forkjørsrett (i tettbygd strøk) - bilister og syklister skal vike for busser som forlater holdeplass.'
  },
  {
    id: 31, category: 'vikeplikt', difficulty: 'vanskelig',
    question: 'Hva er regelen for vikeplikt for utrykningskjøretøy?',
    options: [
      'Du trenger ikke vike hvis det er farlig',
      'Du skal vike for utrykningskjøretøy med blålys og sirene',
      'Bare politiet har forkjørsrett',
      'Du skal vike bare på motorveg'
    ],
    correct: 1,
    explanation: 'Du SKAL vike for utrykningskjøretøy (politi, ambulanse, brannbil) som bruker blålys og/eller sirene. Kjør til siden og stopp om nødvendig. Dette er lovpålagt og brudd kan medføre straffeansvar.'
  },

  // ========== FARTSGRENSER ==========
  {
    id: 32, category: 'fart', difficulty: 'lett',
    question: 'Hva er normal fartsgrense i tettbygd strøk uten annen skilting?',
    options: ['30 km/t', '40 km/t', '50 km/t', '60 km/t'],
    correct: 2,
    explanation: 'Den generelle fartsgrensen i tettbygd strøk er 50 km/t, med mindre annet er skiltet. Tettbygd strøk er definert som et område der husene på begge sider av vegen har liten avstand til hverandre.'
  },
  {
    id: 33, category: 'fart', difficulty: 'lett',
    question: 'Hva er normal fartsgrense utenfor tettbygd strøk uten annen skilting?',
    options: ['60 km/t', '70 km/t', '80 km/t', '90 km/t'],
    correct: 2,
    explanation: 'Den generelle fartsgrensen utenfor tettbygd strøk er 80 km/t, med mindre annet er skiltet. Dette gjelder på vanlige riksveger og fylkesveger.'
  },
  {
    id: 34, category: 'fart', difficulty: 'middels',
    question: 'Hva er maksimal fartsgrense på norske motorveger?',
    options: ['100 km/t', '110 km/t', '120 km/t', '130 km/t'],
    correct: 1,
    explanation: 'Maksimal fartsgrense på norske motorveger er 110 km/t. Noen motorvegstrekninger kan ha lavere skiltet fartsgrense. I Norge er det ingen strekninger med lovlig 120 eller 130 km/t.'
  },
  {
    id: 35, category: 'fart', difficulty: 'middels',
    question: 'Hva er fartsgrensen for tunge kjøretøy (over 3500 kg) på veg med 80 km/t grense?',
    options: ['60 km/t', '70 km/t', '80 km/t', '90 km/t'],
    correct: 1,
    explanation: 'Tunge kjøretøy over 3500 kg tillatt totalvekt har en lavere fartsgrense. På veg med 80 km/t gjelder 70 km/t for tunge kjøretøy. På motorveg med 110 km/t gjelder 90 km/t for tunge kjøretøy.'
  },
  {
    id: 36, category: 'fart', difficulty: 'vanskelig',
    question: 'Hva er fartsgrensen i en skolesone?',
    options: ['20 km/t', '30 km/t', '40 km/t', 'Avhenger av skilting'],
    correct: 3,
    explanation: 'I skolesoner er fartsgrensen markert med skilt. Det er vanligst med 30 km/t i skoletid, men selve grensen kan variere. Skilting angir alltid gjeldende grense. I Norge finnes det ikke en fast nasjonal grense for skolesoner.'
  },
  {
    id: 37, category: 'fart', difficulty: 'middels',
    question: 'Hva er fartsgrensen for kjøretøy med tilhenger?',
    options: [
      'Samme som for kjøretøy uten tilhenger',
      'Alltid 80 km/t',
      'Avhenger av type tilhenger og kjøretøy',
      'Alltid 70 km/t'
    ],
    correct: 2,
    explanation: 'Fartsgrensen for kjøretøy med tilhenger avhenger av type. Personbil med lett tilhenger (under 750 kg) = samme grense. Personbil med tyngre tilhenger = 80 km/t max på motorveg. Tunge kjøretøy har egne regler.'
  },
  {
    id: 38, category: 'fart', difficulty: 'vanskelig',
    question: 'Du kjører i 90 km/t der grensen er 80 km/t. Hva er konsekvensen?',
    options: [
      'Ingen konsekvens, 10 km/t over er akseptert',
      'Gebyr og mulig prikk på førerkortet',
      'Bare advarsel fra politiet',
      'Du mister førerkortet umiddelbart'
    ],
    correct: 1,
    explanation: 'Å kjøre 10 km/t over fartsgrensen gir et forenklet forelegg (gebyr). Størrelsen avhenger av fartsgrensen. Det kan også medføre prikker på førerkortet. 8 prikker innen 3 år medfører tap av førerretten.'
  },
  {
    id: 39, category: 'fart', difficulty: 'middels',
    question: 'Hva er promillegrensen for alkohol i blodet når du kjører bil?',
    options: ['0.1 promille', '0.2 promille', '0.5 promille', '0.8 promille'],
    correct: 1,
    explanation: 'Lovlig promillegrense i Norge er 0,2 promille. Nivåer mellom 0,2 og 0,5 gir bot og prikk. Over 0,5 gir betinget fengsel, bot og tap av førerretten. Over 1,2 gir ubetinget fengsel.'
  },

  // ========== KJØRETØY ==========
  {
    id: 40, category: 'kjoretoy', difficulty: 'lett',
    question: 'Hva er minimumsprofilybde for bildekk om sommeren?',
    options: ['1 mm', '1,6 mm', '2 mm', '3 mm'],
    correct: 1,
    explanation: 'Minimumsprofilbybden for bildekk er 1,6 mm. Under dette er dekket for nedslitt og kan påvirke bremseevne og styring negativt. Mange anbefaler å bytte dekk ved 3 mm av sikkerhetsgrunner.'
  },
  {
    id: 41, category: 'kjoretoy', difficulty: 'middels',
    question: 'Hva er kravet til vinterdekk i Norge?',
    options: [
      'Vinterdekk er ikke påkrevd, men anbefalt',
      'Dekk med tilstrekkelig grep for vinterforhold er påkrevd',
      'Piggdekk er obligatorisk',
      'Kjetting er eneste lovlige alternativ'
    ],
    correct: 1,
    explanation: 'I Norge er det krav om at kjøretøyet skal ha dekk tilpasset kjøreforholdene. Det betyr at du i praksis må ha vinterdekk (eller piggfrie vinterdekk) når det er is og snø. Piggdekk er tillatt fra 1. november til første mandag etter 2. påskedag.'
  },
  {
    id: 42, category: 'kjoretoy', difficulty: 'middels',
    question: 'Hva er kravet til refleksvest i bilen?',
    options: [
      'Ikke påkrevd',
      'Påkrevd for sjåfør',
      'Påkrevd for alle i bilen',
      'Anbefalt men ikke lovpåkrevd i Norge'
    ],
    correct: 3,
    explanation: 'Refleksvest er ikke lovpåkrevd i norske biler, men det er sterkt anbefalt å ha én i bilen. I mange andre europeiske land (Spania, Italia, Tyskland m.fl.) er det lovpåkrevd. Har du EU-kjøring, bør du ha refleksvest.'
  },
  {
    id: 43, category: 'kjoretoy', difficulty: 'lett',
    question: 'Hva er kravet til varseltrekant i bilen?',
    options: [
      'Frivillig - ikke lovpåkrevd',
      'Påkrevd i alle kjøretøy',
      'Bare påkrevd for yrkeskjøretøy',
      'Påkrevd bare på lange turer'
    ],
    correct: 1,
    explanation: 'Varseltrekant er påkrevd i alle kjøretøy. Den skal brukes ved nødstopp og ulykker for å varsle annen trafikk. Den skal plasseres minst 50 meter bak kjøretøyet på åpen veg.'
  },
  {
    id: 44, category: 'kjoretoy', difficulty: 'vanskelig',
    question: 'Hva er korrekt bremselengde fra 100 km/t på tørr asfalt?',
    options: ['Ca. 50 meter', 'Ca. 80 meter', 'Ca. 100 meter', 'Ca. 130 meter'],
    correct: 0,
    explanation: 'Fra 100 km/t er bremselengden på tørr asfalt ca. 50-60 meter for en moderne bil med ABS. Men total stoppelengde inkludert reaksjonstid (ca. 1 sekund = ca. 28 meter) blir dermed ca. 80-90 meter totalt.'
  },
  {
    id: 45, category: 'kjoretoy', difficulty: 'middels',
    question: 'Hva betyr det når varsellampen for oljetrykk lyser mens du kjører?',
    options: [
      'Du trenger bare å fylle olje neste gang du stopper',
      'Du skal stoppe umiddelbart og slå av motoren',
      'Det er en vanlig hendelse som kan ignoreres',
      'Det betyr at du trenger ny olje snart'
    ],
    correct: 1,
    explanation: 'Oljetrykklampens varsellys er kritisk. Hvis den lyser under kjøring, skal du STOPPE umiddelbart og slå av motoren. Å kjøre videre kan ødelegge motoren på kort tid. Sjekk oljenivå og kontakt verksted.'
  },
  {
    id: 46, category: 'kjoretoy', difficulty: 'middels',
    question: 'Når er piggdekk tillatt i Norge?',
    options: [
      'Hele vinteren (november-april)',
      'Fra 1. november til første mandag etter 2. påskedag',
      'Kun i januar og februar',
      'Alltid når det er snø og is'
    ],
    correct: 1,
    explanation: 'Piggdekk er tillatt fra 1. november til første mandag etter 2. påskedag. I Nord-Norge (nord for Nordland) er piggdekk tillatt fra 15. oktober. Det er bøter for bruk av piggdekk utenfor tillatt periode.'
  },

  // ========== MILJØ & SIKKERHET ==========
  {
    id: 47, category: 'miljo', difficulty: 'middels',
    question: 'Hva er "økovennlig kjøring" (eco-driving)?',
    options: [
      'Å kjøre bare elbil',
      'Å kjøre på en måte som reduserer drivstofforbruk og utslipp',
      'Å unngå å kjøre i det hele tatt',
      'Å bruke spesialdrivstoff'
    ],
    correct: 1,
    explanation: 'Økovennlig kjøring handler om å kjøre på en måte som minimerer drivstofforbruk og utslipp. Det inkluderer: holde jevn fart, bruke høy gir ved lav fart, unngå hard akselerasjon og bremsing, og forutse trafikkbildet.'
  },
  {
    id: 48, category: 'miljo', difficulty: 'lett',
    question: 'Hva gir mest drivstofforbruk?',
    options: [
      'Konstant fart på motorveg',
      'Gjentatt hard akselerasjon og kraftig bremsing',
      'Kjøring i bytrafikk med lav fart',
      'Kjøring i medvind'
    ],
    correct: 1,
    explanation: 'Gjentatt hard akselerasjon og kraftig bremsing øker drivstofforbruket betraktelig. Jevn og forutseende kjøring er den mest drivstoffeffektive måten å kjøre på.'
  },
  {
    id: 49, category: 'miljo', difficulty: 'middels',
    question: 'Hva er "tretthetskjøring" og hvilken risiko medfører det?',
    options: [
      'Kjøring etter lange arbeidsdager - litt farlig',
      'Kjøring når du er søvnig - svært farlig, kan forårsake ulykker',
      'Kjøring i tett trafikk - normalt nivå av risiko',
      'Kjøring om natten - ikke spesielt farlig'
    ],
    correct: 1,
    explanation: 'Tretthetskjøring er svært farlig. Søvnighet reduserer reaksjonsevne og konsentrasjon dramatisk. Microsøvn (ufrivillig søvn i sekunder) kan oppstå uten forvarsel. Ta pause hver 2. time på lange turer, og stopp hvis du er søvnig.'
  },
  {
    id: 50, category: 'miljo', difficulty: 'middels',
    question: 'Hvilken effekt har bilbelte på risikoen for å omkomme i en ulykke?',
    options: [
      'Liten effekt',
      'Reduserer risikoen med ca. 50%',
      'Øker risikoen i noen tilfeller',
      'Ingen dokumentert effekt'
    ],
    correct: 1,
    explanation: 'Sikkerhetsbelte reduserer risikoen for å omkomme i en frontkollisjon med ca. 45-50%. Det hindrer at du kastes ut av bilen og forhindrer slag mot rattet, dashbordet og frontruten.'
  },
  {
    id: 51, category: 'miljo', difficulty: 'vanskelig',
    question: 'Hva er den anbefalte sikkerhetsavstanden til forankjørende i tørrvær?',
    options: [
      '1 sekunds avstand',
      '2 sekunders avstand',
      '3 sekunders avstand',
      '5 sekunders avstand'
    ],
    correct: 1,
    explanation: '2-sekundersregelen: velg et fast punkt foran, og tell "en-og-to" fra det tidspunktet forankjørende passerer punktet til du gjør det. I dårlig vær, mørke eller ved høy fart øk til 4+ sekunder.'
  },
  {
    id: 52, category: 'miljo', difficulty: 'middels',
    question: 'Hva er virkningen av rusmidler (narkotika) på kjøreevnen?',
    options: [
      'Noen rusmidler forbedrer konsentrasjon',
      'Alle illegale rusmidler forringer kjøreevnen kraftig',
      'Hasj er trygt å kjøre på',
      'Pillene legen skriver ut er alltid trygge å kjøre på'
    ],
    correct: 1,
    explanation: 'Alle illegale rusmidler forringer kjøreevnen. I Norge er det nulltoleranse for kjøring under påvirkning av narkotika. Noen reseptbelagte legemidler kan også påvirke kjøreevnen - sjekk alltid pakningsvedlegget og spør legen.'
  },

  // ========== FØRSTEHJELP ==========
  {
    id: 53, category: 'forstehjelp', difficulty: 'lett',
    question: 'Hva er det første du skal gjøre når du ankommer en ulykke?',
    options: [
      'Ta bilder av ulykken',
      'Sikre ulykkesstedet og varsle nødetatene',
      'Flytte skadde personer fra biler',
      'Begynne hjerte-lunge-redning umiddelbart'
    ],
    correct: 1,
    explanation: 'SIKRE-MELD-HJELP: 1) Sikre ulykkesstedet (varseltrekant, refleksvest). 2) Meld fra til nødetatene (112 politi, 113 ambulanse, 110 brann). 3) Hjelp de skadde. Du må sikre stedet FØR du hjelper for å unngå nye ulykker.'
  },
  {
    id: 54, category: 'forstehjelp', difficulty: 'middels',
    question: 'Hva er nødnummeret for ambulanse i Norge?',
    options: ['110', '112', '113', '114'],
    correct: 2,
    explanation: '113 er nødnummeret for medisinsk nødhjelp/ambulanse. 112 er politi. 110 er brann. 116117 er legevakten (ikke nødhjelp). Husk: 110-112-113.'
  },
  {
    id: 55, category: 'forstehjelp', difficulty: 'middels',
    question: 'Når bør du IKKE flytte en skadet person fra en bil?',
    options: [
      'Aldri - man skal alltid flytte skadde fra bilen',
      'Når det ikke er fare for brann eller drukning, og du mistenker nakkeskade',
      'Alltid - personen kan få det verre i bilen',
      'Bare hvis personen ber deg om å la vær'
    ],
    correct: 1,
    explanation: 'Flytt ikke en skadd person fra bilen med mindre det er umiddelbar fare for liv (brann, drukning). Unødig flytting kan forverre nakkeskader og ryggskader. Vent på ambulansepersonell som er trent i dette.'
  },
  {
    id: 56, category: 'forstehjelp', difficulty: 'vanskelig',
    question: 'Hva er riktig utførelse av HLR (hjerte-lunge-redning)?',
    options: [
      '15 kompresjoner + 2 innblåsinger',
      '30 kompresjoner + 2 innblåsinger',
      '5 kompresjoner + 1 innblåsing',
      '20 kompresjoner + 3 innblåsinger'
    ],
    correct: 1,
    explanation: 'Oppdaterte HLR-retningslinjer: 30 brystkompresjoner (5-6 cm dybde, 100-120/min) + 2 innblåsinger. Fortsett til ambulansen ankommer. Hvis du ikke vil/kan gi innblåsing, gjør kompresjoner alene - det er fortsatt effektivt.'
  },
  {
    id: 57, category: 'forstehjelp', difficulty: 'middels',
    question: 'Hvem bør IKKE legges i sideleie?',
    options: [
      'Bevisstløs person som puster normalt',
      'Person med mistanke om nakkeskade',
      'Person som kaster opp',
      'Person som er beruset'
    ],
    correct: 1,
    explanation: 'Bevisstløse personer som puster normalt legges i sideleie for å hindre kveling. Unntaket er ved mistanke om nakkeskade - da er det fare for å forverre skaden. Men luftveier har prioritet - sikre åpne luftveier er viktigst.'
  },
  {
    id: 58, category: 'forstehjelp', difficulty: 'vanskelig',
    question: 'Hva gjør du ved kraftig ytre blødning?',
    options: [
      'Sett en tourniquet umiddelbart',
      'Press kraftig direkte på såret og ring 113',
      'Løft den skadde armen/benet og la blodet renne ut',
      'Vask såret med vann og legg plaster'
    ],
    correct: 1,
    explanation: 'Ved kraftig blødning: Press hardt direkte på såret med tøy/bandasje. Legg den skadde til ro. Ring 113. Hold trykket - ikke løft opp for å sjekke. Tourniquet brukes kun på lemmer og kun som siste utvei.'
  },

  // ========== PARKERING ==========
  {
    id: 59, category: 'parkering', difficulty: 'lett',
    question: 'Hva er forskjellen på "stans" og "parkering"?',
    options: [
      'Ingen forskjell',
      'Stans er midlertidig stopp (av/påstigning, lossing), parkering er lengre opphold',
      'Parkering er gratis, stans koster penger',
      'Stans er bare for busser'
    ],
    correct: 1,
    explanation: '"Stans" er midlertidig opphold for av- og påstigning eller kortvarig lossing/lasting mens du er til stede. "Parkering" er enhver oppstilling av kjøretøy som ikke er stans. Reglene er forskjellige for stans og parkering.'
  },
  {
    id: 60, category: 'parkering', difficulty: 'middels',
    question: 'Hvor nær et fortau og busslomme er det forbudt å parkere?',
    options: ['2 meter', '5 meter', '10 meter', '15 meter'],
    correct: 1,
    explanation: 'Det er forbudt å parkere nærmere enn 5 meter fra et fortau eller busslomme, slik at bussen kan bruke stoppet fritt. Dette gjelder i begge retninger fra busstopp-merket.'
  },
  {
    id: 61, category: 'parkering', difficulty: 'middels',
    question: 'Hva betyr "tidsregulert parkering" med skilt?',
    options: [
      'Du kan parkere der i det antall timer som er angitt',
      'Parkering er tillatt kun i angitt tidsrom og eventuelt med tidsbegrensnig',
      'Du betaler per time',
      'Parkeringen er stengt etter det angitte tidspunktet'
    ],
    correct: 1,
    explanation: 'Tidsregulert parkering betyr at parkering er tillatt kun i det angitte tidsrommet (f.eks. "08-17") og eventuelt med en maks tidsbegrensning (f.eks. "2 timer"). Utenfor angitt tid kan det være forbudt eller ubegrenset.'
  },
  {
    id: 62, category: 'parkering', difficulty: 'vanskelig',
    question: 'Er det lov å parkere ved et gangfelt?',
    options: [
      'Ja, hvis du er rask',
      'Nei, forbudt 5 meter foran og bak gangfelt',
      'Ja, på den siden mot trafikken',
      'Ja, hvis det ikke er trafikk'
    ],
    correct: 1,
    explanation: 'Det er forbudt å parkere nærmere enn 5 meter foran et gangfelt (sett i kjøreretningen). Parkering bak gangfeltet på samme side er tillatt. Formålet er å sikre sikt for fotgjengere og bilister.'
  },
  {
    id: 63, category: 'parkering', difficulty: 'middels',
    question: 'Hva er straffen for ulovlig parkering?',
    options: [
      'Ingenting - det er ikke et lovbrudd',
      'Parkeringsgebyr (ileggelse)',
      'Bøter og trekk i førerkortet',
      'Kun advarsel'
    ],
    correct: 1,
    explanation: 'Ulovlig parkering straffes med parkeringsgebyr (ileggelse). Kommunen eller privat parkeringsselskap kan ilegge gebyr. Gjentatte overtredelser eller parkering i nødsoner kan gi strengere reaksjoner.'
  },

  // ========== MØRKE & SIKT ==========
  {
    id: 64, category: 'mørke', difficulty: 'lett',
    question: 'Når plikter du å bruke kjørelys?',
    options: [
      'Bare om natten',
      'Alltid mens du kjører - hele døgnet',
      'Bare i mørke og dårlig sikt',
      'Bare i tunneler'
    ],
    correct: 1,
    explanation: 'I Norge er det påbudt å ha kjørelys (framlykter) på hele døgnet, hele året, uansett sikt. Dette gjelder for alle kjøretøy på vegen. Det øker synligheten dramatisk og reduserer ulykker.'
  },
  {
    id: 65, category: 'mørke', difficulty: 'middels',
    question: 'Når skal du bruke fjernlys?',
    options: [
      'Alltid utenfor tettbygd strøk',
      'Når sikten krever det og det ikke blender andre trafikanter',
      'Bare i tunneler',
      'Alltid om natten'
    ],
    correct: 1,
    explanation: 'Fjernlys skal brukes når sikten krever det (mørke, tåke, snøvær) og det ikke blender andre. Bytt til nærlys/dimmelys i god tid før møtende kjøretøy. Blende andre kjøretøy er forbudt og farlig.'
  },
  {
    id: 66, category: 'mørke', difficulty: 'middels',
    question: 'Hva skal du gjøre når du møter et kjøretøy med blendende lys?',
    options: [
      'Blinke med fjernlysene for å varsle',
      'Se mot høyre side av vegbanen og reduser farten',
      'Stoppe midt i kjørefeltet',
      'Blende tilbake med fjernlys'
    ],
    correct: 1,
    explanation: 'Når møtende kjøretøy blender deg: Se mot vegkanten på din høyre side. Reduser farten. Ikke se direkte i lysene. Ikke blende tilbake - det gjør situasjonen farligere for begge parter.'
  },
  {
    id: 67, category: 'mørke', difficulty: 'vanskelig',
    question: 'Hva er tåkelykter og når brukes de?',
    options: [
      'Ekstra sterke lykter - brukes alltid i mørket',
      'Spesiallykter brukt i tett tåke, kraftig snøfall eller regn med svært dårlig sikt',
      'Lykter som kun brukes i tunneler',
      'Samme som fjernlys'
    ],
    correct: 1,
    explanation: 'Tåkelykter (fremre og bakre) er spesialdesignet for bruk i tett tåke, kraftig snøfall eller regn når sikten er svært dårlig. De gir bedre sikt enn vanlige lykter i disse forholdene, men blender i normalt vær. Bakre tåkelykter er røde og er viktige for at andre skal se deg.'
  },
  {
    id: 68, category: 'mørke', difficulty: 'middels',
    question: 'Hva er den anbefalte farten i tett tåke?',
    options: [
      'Halvparten av fartsgrensen',
      'Sakte nok til at du kan stoppe innenfor det du kan se',
      '30 km/t alltid',
      'Normal fart med tåkelykter på'
    ],
    correct: 1,
    explanation: 'I tett tåke skal du kjøre sakte nok til at du kan stoppe innenfor den avstanden du kan se. Hvis du kan se 30 meter, skal du kjøre i en hastighet der du kan stoppe på 30 meter. Dette kalles "siktavstand-regelen".'
  },

  // ========== VEGOPPMERKING ==========
  {
    id: 69, category: 'vegoppmerking', difficulty: 'lett',
    question: 'Hva betyr en hel hvit midtlinje?',
    options: [
      'Du kan krysse linjen forsiktig',
      'Det er forbudt å krysse linjen',
      'Du skal holde til venstre for linjen',
      'Linjen er bare informativ'
    ],
    correct: 1,
    explanation: 'En hel (sammenhengende) hvit midtlinje betyr at det er forbudt å krysse eller kjøre på denne linjen. Den brukes der sikt eller trafikksituasjon gjør forbikjøring farlig.'
  },
  {
    id: 70, category: 'vegoppmerking', difficulty: 'middels',
    question: 'Hva betyr en stiplet hvit midtlinje?',
    options: [
      'Forbudt å krysse',
      'Du kan krysse linjen når det er trygt og lovlig',
      'Kun syklister kan krysse',
      'Kun for lastebiler'
    ],
    correct: 1,
    explanation: 'En stiplet (brutt) midtlinje betyr at du kan krysse den, forutsatt at det er trygt og lovlig (ingen forbikjøringsforbud, god sikt, tilstrekkelig avstand). Den angir skillelinjen mellom kjøreretninger.'
  },
  {
    id: 71, category: 'vegoppmerking', difficulty: 'middels',
    question: 'Hva betyr gule linjer langs vegkanten?',
    options: [
      'Stans tillatt',
      'Stans forbudt (singel gul) eller parkering og stans forbudt (dobbel gul)',
      'Sykkelfelt',
      'Bussfelt'
    ],
    correct: 1,
    explanation: 'Enkelt gul kantlinje: stans forbudt. Dobbel gul kantlinje: stans og parkering forbudt. Disse brukes der man av trafikkmessige grunner (sikt, trafikkmengde, nødetater) ikke vil ha stans eller parkering.'
  },
  {
    id: 72, category: 'vegoppmerking', difficulty: 'vanskelig',
    question: 'Hva betyr hvite piler på vegbanen?',
    options: [
      'Kjøreretning er anbefalt',
      'Kjørefeltene er reservert for angitt retning - du skal følge pilen',
      'Piler varsler om kryssende trafikk',
      'Piler er dekorative'
    ],
    correct: 1,
    explanation: 'Hvite piler på vegbanen angir hvilke retninger du kan kjøre fra et bestemt felt. Du skal velge riktig felt i god tid og følge pilens retning. Du kan ikke bytte felt etter at du har passert pilene.'
  },
  {
    id: 73, category: 'vegoppmerking', difficulty: 'middels',
    question: 'Hva betyr en bred hvit linje tvers over vegbanen (stopp-linje)?',
    options: [
      'Anbefalt stopp-punkt',
      'Du skal stoppe her ved rødt lys, STOPP-skilt eller stoppskilt',
      'Gangfelt er nærme',
      'Tollstasjon foran'
    ],
    correct: 1,
    explanation: 'Stopplinja (bred hvit linje) angir hvor du skal stoppe ved rødt lys eller STOPP-skilt. Du skal stoppe FØR linjen - å passere stopplinja ved rødt er et alvorlig brudd på trafikkreglene.'
  },
];

// GUIDES content
const GUIDES = [
  {
    id: 'guide-trafikkregler',
    category: 'trafikkregler',
    title: 'Grunnleggende Trafikkregler',
    content: [
      {
        heading: 'Høyreregelen',
        text: 'Høyreregelen er grunnpilaren i norsk trafikk. I kryss uten skilt eller oppmerking skal du gi vikeplikt for trafikk som kommer fra din høyre side. Denne regelen gjelder alltid med mindre skilt, oppmerking, eller politiets anvisninger tilsier noe annet.',
        icon: '↗️'
      },
      {
        heading: 'Blinklys',
        text: 'Blinklys er din kommunikasjon med andre trafikanter. Bruk blinklys: Minst 3 sekunder før du svinger. Når du skifter felt. Når du kjører inn/ut fra parkering. Blinklys frittar deg ikke fra vikeplikt - du varsler bare intensjonen din.',
        icon: '💡'
      },
      {
        heading: 'Forbikjøring',
        text: 'Forbikjøring er tillatt kun: Der midtlinjen er stiplet. Der det ikke er forbudsskilt. Der du har god sikt. Der du har tilstrekkelig tid og plass. Forbudt: I kurver, over bakketopp, nær kryss, ved gangfelt, og der det er heltrukken linje.',
        icon: '🚗'
      },
      {
        heading: 'Påkjøring av motorveg',
        text: 'Når du kjører inn på motorveg via oppkjøringsfelt: Tilpass farten til motorvegtrafikken. Gi vikeplikt for trafikk på motorvegen. Kjør ikke sakte ut i høyre fil - merge jevnt. Ikke stopp i oppkjøringsfelet med mindre det er absolutt nødvendig.',
        icon: '🛣️'
      },
      {
        heading: 'Generell aktpågivenhet',
        text: 'Veitrafikkloven §3 sier at enhver trafikant skal "ferdes hensynsfullt og være varsom og oppmerksom". Dette betyr at selv om du har forkjørsrett, har du plikt til å gjøre alt du kan for å unngå ulykker. Forkjørsrett fritar deg ikke fra ansvar ved ulykke.',
        icon: '👀'
      }
    ]
  },
  {
    id: 'guide-vikeplikt',
    category: 'vikeplikt',
    title: 'Vikeplikt og Forkjørsrett',
    content: [
      {
        heading: 'Vikepliktsregler - Oversikt',
        text: 'Vikeplikt bestemmes av: 1) Trafikklys. 2) Politiets anvisninger. 3) Skilt og vegoppmerking. 4) Særregler (utrykningskjøretøy, sporvogn). 5) Høyreregelen. Prioriteten er i denne rekkefølgen.',
        icon: '📊'
      },
      {
        heading: 'Prioritert veg (Forkjørsveg)',
        text: 'Kjøring på en veg merket med gult diamantskilt (202) gir deg forkjørsrett. Du har forkjørsrett over all kryssende trafikk på veger merket med vikepliktskilt (306) eller stoppskilt. Vær obs: Forkjørsvegen avsluttes der du ser et "slutt på forkjørsveg"-skilt.',
        icon: '💎'
      },
      {
        heading: 'Vikeplikt ved utkjøring',
        text: 'Når du kjører ut fra: Bensinstasjon, parkering, gårdsveg, garasje, eller hvilken som helst avkjøring - HAR DU ALLTID VIKEPLIKT for all trafikk på vegen du kjører ut til. Dette inkluderer fotgjengere og syklister.',
        icon: '🏪'
      },
      {
        heading: 'Sporvogn og buss',
        text: 'Sporvogner har alltid forkjørsrett. Busser som forlater holdeplassen i tettbygd strøk har forkjørsrett - bilister og syklister skal sakte ned og la busser kjøre ut. Pass på bussen blinkende ut fra busstopp!',
        icon: '🚌'
      },
      {
        heading: 'Syklister og fotgjengere',
        text: 'Fotgjengere i gangfelt har alltid forkjørsrett. Syklister i sykkelfelt har forkjørsrett over bilister som svinger. Vær ekstra oppmerksom på svake trafikanter - de er ubeskyttet og de lider mest i en kollisjon.',
        icon: '🚶'
      }
    ]
  },
  {
    id: 'guide-fart',
    category: 'fart',
    title: 'Fartsgrenser og Fartsjustering',
    content: [
      {
        heading: 'Standard fartsgrenser',
        text: '50 km/t: Tettbygd strøk. 80 km/t: Utenfor tettbygd strøk. 110 km/t: Motorveg (maks i Norge). Disse gjelder med mindre annet er skiltet. Lavere grenser skiltes alltid. Høyere grenser er ikke mulig i Norge.',
        icon: '🚦'
      },
      {
        heading: 'Tilpasning til forholdene',
        text: 'Fartsgrensen er MAKS-grensen under gode forhold. Du MÅ redusere farten ved: Is og snø, regn og våt veg, tåke og dårlig sikt, mye trafikk, trange steder, nær skoler og lekeplasser, og nær syklister og fotgjengere.',
        icon: '🌨️'
      },
      {
        heading: 'Stoppelengde - Husk dette!',
        text: 'Stoppelengde = Reaksjonslengde + Bremselengde. Ved 50 km/t: ca. 28 m total. Ved 80 km/t: ca. 70 m total. Ved 110 km/t: ca. 135 m total. Dobbel fart = 4x bremselengde! Våt veg: legg til 50-100%.',
        icon: '⏹️'
      },
      {
        heading: 'Fart og ulykker',
        text: 'Fart øker risikoen dramatisk. En fotgjenger som blir truffet i 50 km/t har 80% sjanse for å overleve. I 80 km/t er sjansen under 10%. Selv 10 km/t over grensen øker risiko betraktelig. Kjør alltid innenfor fartsgrensen.',
        icon: '⚡'
      },
      {
        heading: 'Fart og straff',
        text: 'Fartsovertredelser: 1-10 km/t over: Forenklet forelegg (bot). 16-20 km/t over: Bot + 2 prikker. 26-30 km/t over: Bot + 3 prikker + midlertidig tap av førerrett. Over 30 km/t over: Bot + tap av førerretten. 8 prikker på 3 år = tap av førerretten.',
        icon: '⚖️'
      }
    ]
  },
  {
    id: 'guide-forstehjelp',
    category: 'forstehjelp',
    title: 'Førstehjelp ved Trafikkulykker',
    content: [
      {
        heading: 'SIKRE - MELD - HJELP',
        text: '1. SIKRE: Slå på varselblinkene dine. Sett ut varseltrekant (50m+). Ta på refleksvest. Sikre mot ny trafikk. 2. MELD: Ring 113 (ambulanse), 112 (politi). Gi nøyaktig posisjon, antall skadde, skadetyper. 3. HJELP: Hjelp de skadde, men flytt dem ikke unødig.',
        icon: '🆘'
      },
      {
        heading: 'Bevisstløs person',
        text: 'Sjekk bevissthet (rist skuldra, rop). Sjekk pust (se, lytt, kjenn i 10 sek). Puster normalt → Sideleie (stabilt sideleie). Puster ikke normalt → Start HLR. Ring 113 umiddelbart. Fortsett til ambulansen ankommer.',
        icon: '🤕'
      },
      {
        heading: 'HLR (Hjerte-Lunge-Redning)',
        text: '30 KOMPRESJONER: Legg håndbaken midt på brystet. Trykk ned 5-6 cm med strake armer. Hastighet: 100-120/minutt. 2 INNBLÅSINGER: Løft haken, klem nesa, blås inn i 1 sekund. Gjenta 30+2 syklus. Hvis ikke vil blåse inn: kun kompresjoner.',
        icon: '💓'
      },
      {
        heading: 'Blødninger',
        text: 'Kraftig blødning: Press HARDT med rent tøy. Hold trykket - ikke fjern. Bruk mer tøy oppå om nødvendig. Løft lemmet hvis mulig. Ring 113. Tourniquet: Kun på armer/ben, kun som siste utvei, kun 5-7 cm over sår.',
        icon: '🩸'
      },
      {
        heading: 'Nakkeskader',
        text: 'Mistanke om nakkeskade: Flytt IKKE personen. Hold hode/nakke i nøytral stilling. Snakk beroligende. Ring 113 umiddelbart. Unntak: Puster ikke → Luftveier prioriteres over mulig nakkeskade.',
        icon: '🦴'
      }
    ]
  },
  {
    id: 'guide-skilt',
    category: 'skilt',
    title: 'Trafikkskiltenes System',
    content: [
      {
        heading: 'Fire hovedgrupper av skilt',
        text: '1. ADVARSELSSKILT: Rødt trekant, hvit bakgrunn - varsler om fare. 2. FORBUDSSKILT: Rødt sirkel - forbyr noe. 3. PÅBUDSSKILT: Blå sirkel - påbyr noe. 4. OPPLYSNINGSSKILT: Blått/grønt rektangel - gir informasjon.',
        icon: '📋'
      },
      {
        heading: 'Vikepliktsskilt (306)',
        text: 'Invertert trekant (nesen ned) = Vikeplikt. Det er det vanligste skiltet i norsk trafikk. Det sier: "Du har vikeplikt for ALL trafikk på kryssende veg." STOPP-skiltet (306.1) er enda strengere: du MÅ stoppe, selv om vegen er klar.',
        icon: '⚠️'
      },
      {
        heading: 'Fartsgrenseskilt',
        text: 'Rundt skilt, hvit bakgrunn, rød kant, tall = Fartsgrense (forbudsskilt). Slutt på fartsgrense: Samme skilt med strek gjennom. Anbefalt hastighet: Hvit bakgrunn, ingen rød kant (bare veiledende). Starten på tettbygd strøk opphever alle lokale fartsgrenser og setter 50 km/t.',
        icon: '🔢'
      },
      {
        heading: 'Spesielle skilt',
        text: 'Gul diamant = Forkjørsveg. Hvit "E" på grønn bakgrunn = Europaveg. Blå "M" = Motorveg. Brun bakgrunn = Kulturminner og turiststeder. Oransje skilt = Vegarbeid. Husk: Informasjonsskilt på motorveger er GRØNNE i Norge.',
        icon: '🗺️'
      }
    ]
  },
  {
    id: 'guide-mørke',
    category: 'mørke',
    title: 'Kjøring i Mørke og Dårlig Sikt',
    content: [
      {
        heading: 'Lys påbudt hele dagen',
        text: 'I Norge er det PÅBUDT å ha kjørelys på 24 timer i døgnet, 365 dager i året. Dette er et av Norges viktigste trafikksikkerhetstiltak. Kjørelys gjør bilen synlig på langt hold - spesielt viktig i grålys og dårlig vær.',
        icon: '💡'
      },
      {
        heading: 'Nærlys, fjernlys og tåkelys',
        text: 'Nærlys: Alltid i mørke. Belyser 40-50 m foran. Fjernlys: God sikt, ingen møtende, ikke bak en bil. Belyser 100+ m. Fremre tåkelys: Tett tåke, snø, kraftig regn. Bakre tåkelys: Sikt under 50 m. Skru av tåkelys straks sikt bedres!',
        icon: '🔦'
      },
      {
        heading: 'Tilpasning i mørket',
        text: 'Reduser farten - sikt er begrenset av nærlyset. Øk avstanden til forankjørende. Vær spesielt oppmerksom på: Fotgjengere i mørk bekledning, syklister, dyr som krysser vegen. Tunneler: Bremse ned, slå på nærlys FØR du kjører inn.',
        icon: '🌙'
      },
      {
        heading: 'Tåkekjøring',
        text: 'Kjør sakte nok til å stoppe innenfor det du kan se (siktavstandsregelen). Bruk fremre tåkelys. Bruk bakre tåkelys hvis sikt er under 50 m. Ikke stol på kant-merkelysene - kjør midt i feltet. Vurder å vente til tåken letter.',
        icon: '🌫️'
      },
      {
        heading: 'Vinterkjøring',
        text: 'Tilpass farten drastisk ved: Is (frys-is!), løs snø, slaps. Øk følgeavstanden til 4-6 sekunder. Test bremseeffekten forsiktig. Vær ekstra varsom i skyggelagte partier, bruer og overgangspartier. HUSK: Det tar ikke lengre å stoppe på glatt veg - det tar MYE lengre.',
        icon: '❄️'
      }
    ]
  }
];

// Signs data for demonstration
const SIGNS = [
  // Warning signs
  { id: 's1', category: 'advarsel', name: 'Vegkryss', number: '102', shape: 'triangle', color: '#e74c3c', symbol: '✛', description: 'Varsler om vegkryss. Øk aktsomheten og reduser farten.' },
  { id: 's2', category: 'advarsel', name: 'Sving', number: '103', shape: 'triangle', color: '#e74c3c', symbol: '↪', description: 'Varsler om skarp sving i vegen. Reduser farten.' },
  { id: 's3', category: 'advarsel', name: 'Vegsmalning', number: '108', shape: 'triangle', color: '#e74c3c', symbol: '⧖', description: 'Vegen smalner inn. Vær forberedt på trang passasje.' },
  { id: 's4', category: 'advarsel', name: 'Glatt vegbane', number: '145', shape: 'triangle', color: '#e74c3c', symbol: '🌊', description: 'Vegen kan være glatt. Reduser farten og øk følgeavstanden.' },
  { id: 's5', category: 'advarsel', name: 'Barn', number: '142', shape: 'triangle', color: '#e74c3c', symbol: '🚸', description: 'Barn kan oppholde seg nær vegen. Reduser farten kraftig.' },
  { id: 's6', category: 'advarsel', name: 'Gangfelt', number: '140', shape: 'triangle', color: '#e74c3c', symbol: '🚶', description: 'Gangfelt foran. Vær forberedt på å stoppe for fotgjengere.' },
  { id: 's7', category: 'advarsel', name: 'Elg', number: '156', shape: 'triangle', color: '#e74c3c', symbol: '🦌', description: 'Fare for dyr på vegen. Vær ekstra oppmerksom, spesielt i skumringen.' },
  { id: 's8', category: 'advarsel', name: 'Jernbanekryss', number: '132', shape: 'triangle', color: '#e74c3c', symbol: '🚂', description: 'Jernbanekryss uten bom. Stopp, se og lytt begge veier.' },

  // Prohibition signs
  { id: 's9', category: 'forbud', name: 'Innkjøring forbudt', number: '202', shape: 'circle', color: '#e74c3c', symbol: '—', description: 'All innkjøring er forbudt. Brukes bl.a. i enveiskjørte gater.' },
  { id: 's10', category: 'forbud', name: 'Fartsgrense', number: '362', shape: 'circle', color: '#e74c3c', symbol: '60', description: 'Fartsgrense 60 km/t. Eksempel - tallet varierer.' },
  { id: 's11', category: 'forbud', name: 'Forbikjøring forbudt', number: '306', shape: 'circle', color: '#e74c3c', symbol: '⛔', description: 'Forbikjøring er forbudt. Gjelder til neste kryss eller opphevingsskilt.' },
  { id: 's12', category: 'forbud', name: 'Parkering forbudt', number: '372', shape: 'circle', color: '#e74c3c', symbol: '🚫P', description: 'Parkering er forbudt på den siden av vegen skiltet er oppstilt.' },
  { id: 's13', category: 'forbud', name: 'Stans forbudt', number: '376', shape: 'circle', color: '#e74c3c', symbol: '🚫S', description: 'Stans og parkering forbudt. Ikke stopp her under noen omstendigheter.' },

  // Mandatory signs
  { id: 's14', category: 'påbud', name: 'Kjøreretning rett frem', number: '403', shape: 'circle', color: '#2980b9', symbol: '↑', description: 'Du SKAL kjøre rett frem. Snu ikke ved dette skiltet.' },
  { id: 's15', category: 'påbud', name: 'Kjøreretning høyre', number: '404', shape: 'circle', color: '#2980b9', symbol: '→', description: 'Du SKAL svinge til høyre ved dette skiltet.' },
  { id: 's16', category: 'påbud', name: 'Rundkjøring', number: '408', shape: 'circle', color: '#2980b9', symbol: '🔄', description: 'Rundkjøring - du skal holde til venstre for midtøya og gi vikeplikt.' },
  { id: 's17', category: 'påbud', name: 'Gang- og sykkelveg', number: '522', shape: 'circle', color: '#2980b9', symbol: '🚴', description: 'Vegen er reservert for gående og syklende. Motorvogn forbudt.' },

  // Priority signs
  { id: 's18', category: 'prioritet', name: 'Vikeplikt', number: '306', shape: 'inverted-triangle', color: '#e74c3c', symbol: '▽', description: 'Du har vikeplikt for all trafikk på kryssende veg.' },
  { id: 's19', category: 'prioritet', name: 'STOPP', number: '306.1', shape: 'octagon', color: '#e74c3c', symbol: 'STOPP', description: 'Du MÅ stoppe fullstendig og gi vikeplikt for ALL trafikk.' },
  { id: 's20', category: 'prioritet', name: 'Forkjørsveg', number: '202', shape: 'diamond', color: '#f39c12', symbol: '◆', description: 'Du kjører på prioritert veg og har forkjørsrett over kryssende trafikk.' },
  { id: 's21', category: 'prioritet', name: 'Slutt forkjørsveg', number: '204', shape: 'diamond', color: '#95a5a6', symbol: '◇', description: 'Forkjørsvegen avsluttes. Høyreregelen og vanlige vikepliktregler gjelder igjen.' },
];

window.CATEGORIES = CATEGORIES;
window.QUESTIONS = QUESTIONS;
window.GUIDES = GUIDES;
window.SIGNS = SIGNS;
