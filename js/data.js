// Norwegian Driving School — Full question bank + content
// 150+ questions with real-life scenarios, based on Statens vegvesen curriculum

const CATEGORIES = [
  { id: 'trafikkregler', name: 'Trafikkregler',  icon: '📋', color: '#e74c3c', description: 'Grunnleggende regler for ferdsel i trafikken' },
  { id: 'skilt',        name: 'Trafikkskilt',    icon: '🚦', color: '#e67e22', description: 'Alle typer trafikkskilt og deres betydning' },
  { id: 'vikeplikt',    name: 'Vikeplikt',        icon: '⚠️', color: '#f39c12', description: 'Regler for hvem som har vikeplikt' },
  { id: 'fart',         name: 'Fartsgrenser',     icon: '🏎️', color: '#27ae60', description: 'Fartsgrenser og fartsjustering' },
  { id: 'kjoretoy',     name: 'Kjøretøy',         icon: '🚗', color: '#2980b9', description: 'Kjøretøyets tekniske krav og utstyr' },
  { id: 'miljo',        name: 'Miljø & Sikkerhet',icon: '🌱', color: '#16a085', description: 'Miljøvennlig kjøring og trafikksikkerhet' },
  { id: 'forstehjelp',  name: 'Førstehjelp',      icon: '🏥', color: '#8e44ad', description: 'Førstehjelp ved trafikkulykker' },
  { id: 'parkering',    name: 'Parkering',         icon: '🅿️', color: '#2c3e50', description: 'Regler for parkering og stans' },
  { id: 'mørke',        name: 'Mørke & Sikt',     icon: '🌙', color: '#34495e', description: 'Kjøring i mørke og dårlig sikt' },
  { id: 'vegoppmerking',name: 'Vegoppmerking',     icon: '🛣️', color: '#c0392b', description: 'Oppmerking på vegbanen' },
];

const LEVELS = [
  { level: 1, name: 'Nybegynner',        xpRequired: 0,    icon: '🌱' },
  { level: 2, name: 'Lærling',           xpRequired: 100,  icon: '📚' },
  { level: 3, name: 'Student',           xpRequired: 300,  icon: '🎓' },
  { level: 4, name: 'Bilist',            xpRequired: 600,  icon: '🚗' },
  { level: 5, name: 'Erfaren Bilist',    xpRequired: 1000, icon: '🏅' },
  { level: 6, name: 'Trafikk-ekspert',   xpRequired: 1500, icon: '⭐' },
  { level: 7, name: 'Mester',            xpRequired: 2200, icon: '🏆' },
  { level: 8, name: 'Vegvesen-Godkjent', xpRequired: 3000, icon: '🇳🇴' },
];

const BADGES = [
  { id: 'first_answer',    name: 'Første steg',      icon: '🎯', desc: 'Svar på ditt første spørsmål' },
  { id: 'streak_3',        name: 'Varm!',             icon: '🔥', desc: '3 dager på rad' },
  { id: 'streak_7',        name: 'Ukesmester',        icon: '🌟', desc: '7 dager på rad' },
  { id: 'combo_5',         name: 'Blitz',             icon: '⚡', desc: '5 riktige på rad' },
  { id: 'combo_10',        name: 'Ustoppelig',        icon: '💥', desc: '10 riktige på rad' },
  { id: 'perfect_quiz',    name: 'Perfekt!',          icon: '💯', desc: '20/20 på en quiz' },
  { id: 'daily_3',         name: 'Daglig øver',       icon: '📅', desc: 'Fullført 3 daglige utfordringer' },
  { id: 'all_categories',  name: 'Alt-mulig',         icon: '🗺️', desc: 'Prøv alle 10 kategorier' },
  { id: 'signs_master',    name: 'Skilt-ekspert',     icon: '🚦', desc: '90%+ på skiltquiz' },
  { id: 'vikeplikt_pro',   name: 'Vikeplikt-proff',   icon: '⬦', desc: '90%+ på vikepliktquiz' },
  { id: 'level_5',         name: 'Halvveis',          icon: '🎖️', desc: 'Nå nivå 5' },
  { id: 'level_8',         name: 'Klar for prøven!',  icon: '🏁', desc: 'Nå nivå 8' },
  { id: '100_questions',   name: '100 spørsmål',      icon: '💪', desc: 'Svar på 100 spørsmål totalt' },
  { id: 'xp_1000',         name: 'XP-rik',            icon: '✨', desc: 'Tjen 1000 XP' },
];

const QUESTIONS = [
  // ===================== TRAFIKKREGLER =====================
  {
    id: 1, category: 'trafikkregler', difficulty: 'lett',
    question: 'Du kjører på en vanlig veg uten skilt. En bil kommer fra høyre. Hva gjør du?',
    scenario: '🚗 Du nærmer deg et ukrysset veikryss. Det er ingen skilt.',
    diagram: 'crossroads_right',
    options: ['Du har forkjørsrett og kan kjøre', 'Du gir vikeplikt for bilen fra høyre', 'Du blåser i hornet og kjører', 'Du stopper alltid i alle kryss'],
    correct: 1,
    explanation: 'Høyreregelen: Trafikk fra høyre har alltid forkjørsrett i kryss uten annen regulering. Du MÅ gi vikeplikt.'
  },
  {
    id: 2, category: 'trafikkregler', difficulty: 'middels',
    question: 'Du nærmer deg en forkjørsveg (gult diamantskilt). Hva betyr det for deg?',
    scenario: '💎 Du ser et gult diamantskilt på vegen du kjører på.',
    options: ['Du har nå vikeplikt for alle', 'Du har forkjørsrett over kryssende trafikk', 'Du kan kjøre raskere enn fartsgrensen', 'Du skal stoppe og se deg for'],
    correct: 1,
    explanation: 'Gult diamantskilt betyr at du kjører på forkjørsvegen. Du har forkjørsrett over trafikk på kryssende veger med vikepliktskilt.'
  },
  {
    id: 3, category: 'trafikkregler', difficulty: 'lett',
    question: 'Når skal du bruke blinklys?',
    options: ['Bare i lyskryss', 'Alltid når du endrer retning, skifter fil eller parkerer', 'Bare på motorveg', 'Bare om natten'],
    correct: 1,
    explanation: 'Blinklys brukes alltid i god tid FØR du endrer retning, skifter fil, svinger eller parkerer. Det er kommunikasjon med andre trafikanter.'
  },
  {
    id: 4, category: 'trafikkregler', difficulty: 'middels',
    question: 'Du er på vei til jobb og det er kø. En fotgjenger trer ut i gangfeltet. Du er sent ute. Hva gjør du?',
    scenario: '🚶 En person starter å gå over et gangfelt foran deg i rush-trafikk.',
    diagram: 'gangfelt',
    options: ['Kjører sakte forbi siden du er i kø', 'Stopper og lar fotgjengeren gå over', 'Bruker hornet for å be fotgjengeren vente', 'Gir gass og håper fotgjengeren venter'],
    correct: 1,
    explanation: 'Fotgjengere i gangfelt har ALLTID forkjørsrett. Du er pliktig til å stoppe – uansett om du har det travelt. Brudd kan gi bøter og prikk på førerkortet.'
  },
  {
    id: 5, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Du vil kjøre forbi en traktor på en tofelts riksveg. Hva MÅ du sjekke?',
    scenario: '🚜 En traktor kjører 30 km/t foran deg på en 80-veg.',
    diagram: 'forbikjoring',
    options: ['Bare at det er klart foran traktoren', 'God sikt, stiplet midtlinje, ingen motkommende, og tid/plass til å gjennomføre', 'At du har nok drivstoff', 'At det ikke er kryss innen 100 meter'],
    correct: 1,
    explanation: 'Forbikjøring krever: stiplet linje, god sikt begge veier, tilstrekkelig tid og plass, ingen forbikjøringsforbud. Husk å signalisere med venstre blinklys og returner til høyre umiddelbart etter.'
  },
  {
    id: 6, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva er den viktigste trafikksikkerhetstanken ved kjøring?',
    options: ['Komme frem raskest mulig', 'Alltid ha forkjørsrett', 'Ferdes hensynsfullt og unngå å skape fare eller unødig ulempe', 'Følge GPS-en blindt'],
    correct: 2,
    explanation: 'Veitrafikkloven §3: Enhver trafikant skal ferdes hensynsfullt og være varsom og oppmerksom. Selv med forkjørsrett plikter du å unngå ulykker.'
  },
  {
    id: 7, category: 'trafikkregler', difficulty: 'lett',
    question: 'Du kjører inn på en motorveg via oppkjøringsfelt. Hvem har vikeplikt?',
    scenario: '🛣️ Du akselererer i oppkjøringsfeltet på E18.',
    diagram: 'motorway_entry',
    options: ['Trafikken på motorvegen', 'Du – du skal tilpasse deg motorvegtrafikken', 'Den som er størst', 'Den som kjørte ut fra avkjørselen'],
    correct: 1,
    explanation: 'Du som kjører INN på motorvegen har vikeplikt for trafikken som allerede er på motorvegen. Tilpass farten i oppkjøringsfeltet og flett deg inn når det er trygt.'
  },
  {
    id: 8, category: 'trafikkregler', difficulty: 'middels',
    question: 'Du holder på mobilen i hånden mens du kjører 20 km/t i kø. Hva er riktig?',
    scenario: '📱 Rush-trafikk, du sjekker en melding mens bilen kryper fremover.',
    options: ['Det er greit i lav fart', 'Det er forbudt – uansett fart, inkludert rødt lys', 'Det er lov hvis du bruker håndfri', 'Det er bare forbudt på motorveg'],
    correct: 1,
    explanation: 'Det er forbudt å holde mobiltelefon i hånden under kjøring – uansett fart, også ved stillestående trafikk og rødt lys. Bøtesatsen er høy og gir prikk i førerkortet.'
  },
  {
    id: 9, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Du kjører ut fra en bensinstasjon og vil svinge til høyre. En syklist kommer fra venstre på fortauet. Hvem har vikeplikt?',
    scenario: '⛽ Du skal ut fra Shell-stasjonen og svinge inn i trafikken.',
    options: ['Syklisten har vikeplikt fordi du er en bil', 'Du har vikeplikt for syklisten', 'Høyreregelen avgjør', 'Den som kjørte ut sist har vikeplikt'],
    correct: 1,
    explanation: 'Når du kjører ut fra privat eiendom (bensinstasjon, parkering, gård), har du vikeplikt for ALL trafikk på vegen – inkludert fotgjengere og syklister.'
  },
  {
    id: 10, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva betyr det å "flette" på motorvegen?',
    options: ['Å kjøre i sikksakk mellom filene', 'Å veksle smidig inn i trafikken annenhver bil ved sammenslåing av felt', 'Å kjøre fortere enn fartsgrensen kortvarig', 'Å bruke nødstopplomme'],
    correct: 1,
    explanation: 'Fletting betyr at to filer smelter inn i én, og trafikantene veksler smidig annenhver bil (glidelåsprinsippet). Dette skal skje frivillig og hensynsfullt – ikke med press.'
  },
  {
    id: 11, category: 'trafikkregler', difficulty: 'lett',
    question: 'Du kommer til et jernbanekryss uten lys og bom. Hva gjør du?',
    options: ['Kjører over uten å stoppe hvis du ikke ser noe', 'Stopper alltid, ser og lytter begge veier, kjører deretter over', 'Blinkser med lysene og kjører over', 'Stopper bare hvis varselklokkene ringer'],
    correct: 1,
    explanation: 'Ved planovergang uten bom og lys MÅ du alltid stoppe, se og lytte i begge retninger. Toget har alltid forkjørsrett og kan komme raskere enn du tror.'
  },
  {
    id: 12, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Hva er regelen for forbikjøring på høyre side i en filkjøringssituasjon?',
    options: ['Alltid forbudt', 'Tillatt når venstre fil går tregere enn høyre fil (kø-forbikjøring)', 'Tillatt overalt', 'Bare tillatt for motorsykler'],
    correct: 1,
    explanation: 'Forbikjøring på høyre side er normalt forbudt, men tillatt ved filkjøring der venstre fil beveger seg tregere enn høyre fil. Kalles kø-forbikjøring og er vanlig i by-trafikk.'
  },
  {
    id: 13, category: 'trafikkregler', difficulty: 'middels',
    question: 'Du er i T-kryss og vil svinge til venstre. En bil kommer rett imot deg og skal rett frem. Hvem kjører først?',
    scenario: '↙️ Du venter i et T-kryss med venstresving mens en motkommende bil nærmer seg.',
    options: ['Du – du kom til krysset først', 'Den motkommende bilen – venstresvingende har alltid vikeplikt for motkommende', 'Den som er størst', 'Den som blinkser først'],
    correct: 1,
    explanation: 'Venstresvingende trafikk har alltid vikeplikt for motkommende trafikk som kjører rett frem. Vent til det er klart i begge retninger før du svinger.'
  },
  {
    id: 14, category: 'trafikkregler', difficulty: 'lett',
    question: 'Hva er kravet til sikkerhetsbelte?',
    options: ['Bare sjåfør trenger belte', 'Alle i bilen skal bruke belte – sjåfør ansvarlig for barn under 15 år', 'Bare på motorveg', 'Frivillig for voksne i baksetet'],
    correct: 1,
    explanation: 'Alle passasjerer SKAL bruke sikkerhetsbelte. Sjåfør har ansvar for at passasjerer under 15 år er riktig fastspent. Bøter for manglende bruk.'
  },
  {
    id: 15, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Du er på motorveg og bilen stopper. Du klarer akkurat å rulle inn på nødstoppbanen. Hva er de tre første tingene du gjør?',
    scenario: '🚨 Bilen din stoppet plutselig på E6 med 110 km/t-trafikk rundt deg.',
    options: ['Åpner panseret, ringer veihjelp, tar en kaffe', 'Slår på varselblinkene, setter ut varseltrekant (100m+), tar på refleksvest og forlater bilen mot autovernet', 'Prøver å starte bilen igjen og venter i bilen', 'Ringer politiet og venter i bilen'],
    correct: 1,
    explanation: 'Nødstopp på motorveg: 1) Varselblinkene PÅ umiddelbart. 2) Forlat bilen mot autovernet/sikkerhetsside. 3) Sett ut varseltrekant 100m+ bak. Ring veihjelp (02222) fra sikker plass.'
  },
  {
    id: 16, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva er U-sving og hvor er det tillatt?',
    options: ['Tillatt overalt', 'Tillatt der det ikke er forbudt med skilt og der du har god sikt og nok plass', 'Alltid forbudt', 'Bare tillatt i 30-soner'],
    correct: 1,
    explanation: 'U-sving er tillatt der det ikke er forbudt (skilt 306.6) og der du har god sikt, nok plass og ikke hindrer eller er til fare for andre. Forbudt nær kryss, bakketopp og kurver.'
  },
  {
    id: 17, category: 'trafikkregler', difficulty: 'middels',
    question: 'En ambulanse med blålys nærmer seg bakfra. Du er i kø i tunnel. Hva gjør du?',
    scenario: '🚑 Du hører sirene og ser blått lys i bakspeilet inne i en tunnel.',
    options: ['Ingenting – det er ikke mulig å vike i tunnel', 'Kjører til siden og stopper om mulig, slik at ambulansen kommer forbi', 'Setter på varselblinkene og holder farten', 'Kjører raskere for å komme ut av tunnelen'],
    correct: 1,
    explanation: 'Du SKAL vike for utrykningskjøretøy med blålys/sirene. I tunnel: kjør til siden, reduser farten og stopp om mulig. La ambulansen passere selv i trangt rom.'
  },
  {
    id: 18, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Hva gjelder for kjøring i vegtunnel?',
    options: ['Fartsgrensen heves automatisk til 90 km/t', 'Forbudt å snu, stoppe eller rygge – bruk nødutganger ved brann', 'Tillatt å stoppe for pauser', 'Forbikjøring er alltid tillatt'],
    correct: 1,
    explanation: 'I tunnel: Forbudt å snu, rygge eller stoppe unntatt nød. Ved brann: Stopp, slå av motoren, ta nøkkelen med, bruk nødutgang. Ikke kjør ut – røyk og varme er livsfarlig.'
  },
  {
    id: 19, category: 'trafikkregler', difficulty: 'lett',
    question: 'Hva er promillegrensen for å kjøre bil i Norge?',
    options: ['0,1 promille', '0,2 promille', '0,5 promille', '0,8 promille'],
    correct: 1,
    explanation: 'Lovlig grense er 0,2 promille. Mellom 0,2-0,5 gir bot + prikk. Over 0,5 gir betinget fengsel + tap av førerretten. Over 1,2 gir ubetinget fengsel.'
  },
  {
    id: 20, category: 'trafikkregler', difficulty: 'middels',
    question: 'Du er svært trøtt og har 8 mil igjen til hytta. Hva er det riktige å gjøre?',
    scenario: '😴 Klokken er 23. Du gaper og det er vanskelig å holde øynene åpne.',
    options: ['Åpner vinduet og skrur opp musikken', 'Stopper og tar en pause/sover – kjør videre etter hvile', 'Drikker energidrikk og kjører videre', 'Ringer noen for å holde deg våken'],
    correct: 1,
    explanation: 'Tretthetskjøring er LIVSFARLIG. Microsøvn (ufrivillig søvn i 2-3 sekunder) skjer uten forvarsel og kan skje selv om du ikke føler deg søvnig. Eneste løsning: STOPP og sov.'
  },

  // ===================== TRAFIKKSKILT =====================
  {
    id: 21, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr et rødt trekantskilt?',
    options: ['Forbud', 'Advarsel – fare foran', 'Påbud', 'Informasjon'],
    correct: 1,
    explanation: 'Rødt trekant med hvit bakgrunn = Advarselsskilt. Varsler om fare eller spesielle forhold. Alltid trekantet, alltid rød kant.'
  },
  {
    id: 22, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr et rundt skilt med rød kant og hvit bakgrunn?',
    options: ['Advarsel', 'Forbud – noe er forbudt', 'Påbud', 'Informasjon'],
    correct: 1,
    explanation: 'Rund sirkel med rød kant = Forbudsskilt. Forbyr bestemt kjøring eller adferd. Eksempler: fartsgrense, innkjøring forbudt, parkering forbudt.'
  },
  {
    id: 23, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr et rundt blått skilt?',
    options: ['Forbud', 'Anbefaling', 'Påbud – du MÅ følge instruksjonen', 'Informasjon'],
    correct: 2,
    explanation: 'Blå sirkel = Påbudsskilt. Du har plikt til å følge instruksjonen. Eks: kjøreretning, gang/sykkelveg, sykkelfelt.'
  },
  {
    id: 24, category: 'skilt', difficulty: 'middels',
    question: 'Du ser et trekant-skilt (nesen ned, invertert trekant). Hva betyr det?',
    options: ['Advarsel om sving', 'Vikeplikt – du skal vike for all trafikk på kryssende veg', 'STOPP', 'Forkjørsveg'],
    correct: 1,
    explanation: 'Invertert trekant (skilt 306) = Vikeplikt. Du MÅ gi vikeplikt for all trafikk på den kryssende vegen. Det betyr ikke nødvendigvis at du må stoppe – men du MÅ vike.'
  },
  {
    id: 25, category: 'skilt', difficulty: 'middels',
    question: 'Hva er forskjellen mellom vikepliktskilt og STOPP-skilt?',
    scenario: '🛑 Du ser et rødt åttekantet STOPP-skilt.',
    options: ['Ingen forskjell', 'STOPP krever full stans, vikepliktskilt krever bare at du gir vikeplikt', 'STOPP gjelder bare lastebiler', 'Vikepliktskilt er strengere'],
    correct: 1,
    explanation: 'STOPP-skilt (306.1): Du MÅ stoppe fullstendig ved stopplinja – selv om vegen er tom. Vikepliktskilt: Gi vikeplikt, men du trenger ikke stoppe hvis vegen er klar.'
  },
  {
    id: 26, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et gult diamantskilt (skilt 202)?',
    options: ['Advarsel om farlig kurve', 'Du kjører på forkjørsveg og har forkjørsrett', 'Midlertidig vegarbeid', 'Spesialtransport'],
    correct: 1,
    explanation: 'Gult diamantskilt = Forkjørsveg. Du har forkjørsrett over trafikk på kryssende veger. Gjelder fra skiltet til "slutt forkjørsveg"-skiltet (likt skilt, men i grått).'
  },
  {
    id: 27, category: 'skilt', difficulty: 'lett',
    question: 'Du ser et blått rund skilt med et hvitt "P". Hva betyr det?',
    options: ['Parkering forbudt', 'Parkering tillatt her', 'Privat parkering', 'Betalt parkering kun'],
    correct: 1,
    explanation: 'Blå P (skilt 552) = Parkering tillatt. Eventuelle tilleggsskilt angir tidsbegrensning, avgiftsplikt eller hvem som kan parkere.'
  },
  {
    id: 28, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et rundt skilt med hvit bakgrunn, rød kant og tallet "80"?',
    options: ['Anbefalt fart 80 km/t', 'Fartsgrense 80 km/t – du kan ikke kjøre fortere', 'Minimum fart 80 km/t', 'Tunge kjøretøy maks 80 km/t'],
    correct: 1,
    explanation: 'Fartsgrenseskilt (forbudsskilt 362) med et tall: Du kan IKKE kjøre raskere enn det angitte antall km/t. Gjelder fra skiltet til neste fartsgrenseskilt.'
  },
  {
    id: 29, category: 'skilt', difficulty: 'vanskelig',
    question: 'Du ser et blått rektangulært skilt med hvit "M". Hva betyr det?',
    options: ['Møteplass', 'Motorveg begynner – spesielle regler gjelder', 'Midlertidig stopp', 'Mopedforbud'],
    correct: 1,
    explanation: 'Blå "M" (skilt 701) = Motorveg. Spesielle regler: minst 2 felt per retning, adskilt kjøreretning, forbikjøring bare til venstre, minstehastighet, kun motorkjøretøy over 40 km/t.'
  },
  {
    id: 30, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et gult blinkende lys i et lyskryss?',
    options: ['Sterk trafikk – vær forsiktig', 'Lyssignalene er ute av drift – vanlige trafikkregler gjelder', 'Politiet dirigerer', 'Kom frem raskt'],
    correct: 1,
    explanation: 'Gult blinklys = Lyssignalene er ikke i normal drift. Da gjelder de alminnelige regler for vegkryss, inkludert skilt og høyreregelen.'
  },
  {
    id: 31, category: 'skilt', difficulty: 'middels',
    question: 'Hva betyr et hvitt rektangulært skilt med blå bakgrunn og "Buss"?',
    options: ['Busstopp fremover', 'Bussfelt – bare busser kan kjøre her (unntak gjelder)', 'Buss parkering', 'Bussrute informasjon'],
    correct: 1,
    explanation: 'Bussfelt-skilt betyr at feltet er reservert for busser i angitt tidsrom. I perioder utenfor angitt tid kan vanlige biler kjøre der. Sjekk tilleggsskilt for tidsbegrensning.'
  },
  {
    id: 32, category: 'skilt', difficulty: 'vanskelig',
    question: 'Du ser et oransje advarselsskilt. Hva betyr oransje farge på skilt?',
    options: ['Spesielt farlig område', 'Midlertidig skilt – vegarbeid pågår', 'Ny veg åpnet', 'Turiststed'],
    correct: 1,
    explanation: 'Oransje/gult skilt = Vegarbeid/midlertidig trafikkomlegging. Oransje skilt har samme form/betydning som vanlige skilt, men gjelder midlertidig. Ta dem alvorlig!'
  },
  {
    id: 33, category: 'skilt', difficulty: 'lett',
    question: 'Hva betyr et rundt rødt skilt med en rød diagonal strek gjennom?',
    options: ['Parkering forbudt', 'Innkjøring forbudt – all innkjøring er forbudt', 'Stans forbudt', 'Fartsgrense oppheves'],
    correct: 1,
    explanation: 'Innkjøring forbudt (skilt 202) = Ingen kan kjøre inn fra denne siden. Brukes bl.a. på enveiskjørte gaters utgang og der innkjøring ikke er tillatt.'
  },
  {
    id: 34, category: 'skilt', difficulty: 'middels',
    question: 'Du ser et trekantskilt med et barn på. Du nærmer deg en skole. Hva bør du gjøre?',
    scenario: '🏫 Et advarselsskilt med barn dukker opp 200 meter fra en barneskole.',
    options: ['Ingenting – det er bare et skilt', 'Redusere farten kraftig og være klar til å stoppe – barn kan løpe ut', 'Blåse i hornet for å advare barna', 'Kjøre som normalt, men ha øye med fortauet'],
    correct: 1,
    explanation: 'Advarselsskilt med barn (skilt 142): Reduser farten KRAFTIG. Barn opptrer uforutsigbart. Du skal kjøre med ekstra lav fart og full beredskap for å stoppe.'
  },

  // ===================== VIKEPLIKT =====================
  {
    id: 35, category: 'vikeplikt', difficulty: 'lett',
    question: 'Du kjører på en vanlig veg. En bil kommer fra høyre i et kryss uten skilt. Hvem har vikeplikt?',
    options: ['Du – bilen fra høyre har forkjørsrett', 'Bilen fra høyre', 'Den som er minst', 'Begge kjører'],
    correct: 0,
    explanation: 'Høyreregelen: DU har vikeplikt for bilen som kommer fra din høyre side. "Fra høyre" betyr forkjørsrett.'
  },
  {
    id: 36, category: 'vikeplikt', difficulty: 'middels',
    question: 'Du skal svinge til venstre i et kryss. En bil kommer imot deg og kjører rett frem. Hvem har vikeplikt?',
    scenario: '↙️ Du blinker til venstre. En bil kommer rett imot deg i krysset.',
    options: ['Du har vikeplikt – venstresving gir alltid vikeplikt for motkommende', 'Motkommende bil har vikeplikt', 'Den som kom til krysset sist', 'Begge kjørere har lik prioritet'],
    correct: 0,
    explanation: 'Venstresvingende trafikk HAR ALLTID vikeplikt for motkommende trafikk som kjører rett frem. Vent til det er klart.'
  },
  {
    id: 37, category: 'vikeplikt', difficulty: 'middels',
    question: 'Du kjører inn i en rundkjøring. Hvem gir du vikeplikt for?',
    diagram: 'roundabout',
    options: ['Ingen – du er i gang', 'All trafikk som allerede er inne i rundkjøringen', 'Kun lastebiler og busser', 'Den som kjørte inn etter deg'],
    correct: 1,
    explanation: 'I rundkjøring merket skilt 132: Trafikk som er inne i rundkjøringen har forkjørsrett. Du som kjører INN har vikeplikt – markert med vikepliktskilt ved innkjøringen.'
  },
  {
    id: 38, category: 'vikeplikt', difficulty: 'middels',
    question: 'Du svinger til høyre og en syklist fortsetter rett frem til høyre for deg. Hvem har vikeplikt?',
    scenario: '🚴 Du svinger til høyre mens en syklist sykler parallelt til din høyre side.',
    options: ['Syklisten – du er en bil', 'Du har vikeplikt for syklisten du krysser', 'Den som er raskest', 'Høyreregelen avgjør'],
    correct: 1,
    explanation: 'Når du svinger til høyre og krysser en sykkelveg/sykkelfelt, har syklisten som fortsetter rett frem forkjørsrett. DU har vikeplikt for syklisten.'
  },
  {
    id: 39, category: 'vikeplikt', difficulty: 'vanskelig',
    question: 'Du kjører på en prioritert veg (forkjørsveg) og skal svinge til venstre. En bil kommer fra venstre på sideveien med vikepliktskilt. Hvem har vikeplikt?',
    options: ['Bilen på sideveien alltid', 'Du har vikeplikt for motkommende på forkjørsvegen, men bilen fra sideveien har vikeplikt for deg', 'Alle har vikeplikt', 'Bilen fra sideveien trumfer alt'],
    correct: 1,
    explanation: 'På forkjørsveg: Bilen fra sideveien har vikeplikt for deg (de har vikepliktskilt). Men du som svinger til venstre har FORTSATT vikeplikt for motkommende trafikk på forkjørsvegen.'
  },
  {
    id: 40, category: 'vikeplikt', difficulty: 'lett',
    question: 'Hvem har ALLTID forkjørsrett?',
    options: ['Privatbiler', 'Utrykningskjøretøy med blålys og sirene', 'Busser', 'Lastebiler'],
    correct: 1,
    explanation: 'Utrykningskjøretøy (ambulanse, politi, brannbil) med blålys og/eller sirene har alltid forkjørsrett. Du MÅ vike for disse.'
  },
  {
    id: 41, category: 'vikeplikt', difficulty: 'middels',
    question: 'En buss begynner å kjøre ut fra en holdeplass i tettbygd strøk. Hva gjør du?',
    scenario: '🚌 Bussen foran deg blinker til venstre og begynner å kjøre ut fra busstoppen.',
    options: ['Du kjører forbi siden du har høyreregelen', 'Du gir vikeplikt for bussen som forlater holdeplassen', 'Du presser hornet og kjører', 'Det avhenger av hvem som kom frem til holdeplassen først'],
    correct: 1,
    explanation: 'Busser som forlater holdeplass i tettbygd strøk har forkjørsrett. Bussens blinklys = varsel. Sett ned farten og la bussen komme ut.'
  },
  {
    id: 42, category: 'vikeplikt', difficulty: 'vanskelig',
    question: 'Du kjører på en øygate. En sporvogn kjører i midten. Du skal passere. Hvem har rett?',
    options: ['Du – bilen er raskere', 'Sporvognen har alltid forkjørsrett', 'Den som er i riktig fil', 'Sporvogn har bare rett når den ringer'],
    correct: 1,
    explanation: 'Sporvogner (trikk) har alltid forkjørsrett. Du som bilist MÅ vike for sporvognen. Sporvognen kan ikke bremse raskt og kan ikke styre unna.'
  },
  {
    id: 43, category: 'vikeplikt', difficulty: 'middels',
    question: 'Du er på veg ned en smal fjordveg. En bil kommer opp. Vegen er for smal for to biler. Hvem rygger?',
    options: ['Den som er på veg ned rygger alltid', 'Den som har nærmeste mulighet til å rygge eller parkere', 'Den minste bilen', 'Det avhenger av hvem som tok turen ut'],
    correct: 1,
    explanation: 'Ingen generell lovbestemmelse fastsetter hvem som rygger på smal veg. Men trafikkreglene sier å ta hensyn og ferdes fornuftig. I praksis: den som enklest kan vike eller rygge til nærmeste møtested, gjør det.'
  },
  {
    id: 44, category: 'vikeplikt', difficulty: 'vanskelig',
    question: 'Du er ved et kryss. Politiet dirigerer trafikken og viser stoppegesten mot deg. Hva gjelder?',
    options: ['Du kjører om det er grønt lys', 'Du stopper – politiets anvisninger gjelder foran alt annet', 'Høyreregelen trumfer politiet', 'Du kjører og peker på lysene'],
    correct: 1,
    explanation: 'Politiets anvisninger (tegn og signaler) HAR HØYEST PRIORITET – over trafikklys, skilt og alle andre regler. ALLTID adlyd politiets dirigering.'
  },

  // ===================== FARTSGRENSER =====================
  {
    id: 45, category: 'fart', difficulty: 'lett',
    question: 'Hva er normal fartsgrense i tettbygd strøk uten skilting?',
    options: ['30 km/t', '40 km/t', '50 km/t', '60 km/t'],
    correct: 2,
    explanation: 'Standard fartsgrense i tettbygd strøk = 50 km/t. Gjelder med mindre annet er skiltet.'
  },
  {
    id: 46, category: 'fart', difficulty: 'lett',
    question: 'Hva er normal fartsgrense utenfor tettbygd strøk uten skilting?',
    options: ['60 km/t', '70 km/t', '80 km/t', '90 km/t'],
    correct: 2,
    explanation: 'Standard fartsgrense utenfor tettbygd strøk = 80 km/t. Gjelder på vanlige riksveger og fylkesveger uten annen skilting.'
  },
  {
    id: 47, category: 'fart', difficulty: 'middels',
    question: 'Hva er maksimal fartsgrense på norsk motorveg?',
    options: ['100 km/t', '110 km/t', '120 km/t', '130 km/t'],
    correct: 1,
    explanation: 'Maks fartsgrense i Norge er 110 km/t, kun på noen motorvegstrekninger. De fleste motorveger har 100 km/t. 120 og 130 finnes ikke i Norge.'
  },
  {
    id: 48, category: 'fart', difficulty: 'middels',
    question: 'Det er 80 km/t-sone, men det er is og snø på vegen. Du kjører 80 km/t. Er det riktig?',
    scenario: '🌨️ Vegen er dekket av is. Fartsgrenseskilt viser 80 km/t.',
    options: ['Ja – fartsgrensen tillater 80 km/t', 'Nei – du MÅ redusere farten etter forholdene, uavhengig av skiltet', 'Ja, men bare med vinterdekk', 'Nei, men 70 km/t er nok'],
    correct: 1,
    explanation: 'Fartsgrensen er MAKS-grensen under GODE FORHOLD. På is/snø MÅ du redusere farten drastisk. Kjøring etter forholdene er lovpålagt. 80 km/t på glatt is er uforsvarlig og straffbart.'
  },
  {
    id: 49, category: 'fart', difficulty: 'vanskelig',
    question: 'Du kjører 115 km/t på en motorveg med 110 km/t-grense. Hva er konsekvensen?',
    options: ['Ingen – toleransen er 10%', 'Forenklet forelegg (bot)', 'Tap av førerretten umiddelbart', 'Advarsel fra politiet'],
    correct: 1,
    explanation: 'Å kjøre 5 km/t over 110 km/t (115 km/t) gir forenklet forelegg. I Norge er det ingen formell "toleranse" – brudd på fartsgrensen er alltid en overtredelse. Størrelse på boten avhenger av fartsovertredelsens størrelse.'
  },
  {
    id: 50, category: 'fart', difficulty: 'middels',
    question: 'Hva er fartsgrensen for tunge kjøretøy (over 3500 kg) på motorveg med 110 km/t-grense?',
    options: ['110 km/t – samme som alle', '80 km/t', '90 km/t', '100 km/t'],
    correct: 2,
    explanation: 'Tunge kjøretøy over 3500 kg tillatt totalvekt har lavere fartsgrense. På strekninger med 110 km/t gjelder 90 km/t for tunge kjøretøy.'
  },
  {
    id: 51, category: 'fart', difficulty: 'lett',
    question: 'Hva er sammenhengen mellom fart og bremselengde?',
    options: ['Dobbel fart = dobbel bremselengde', 'Dobbel fart = firedobbel bremselengde', 'Dobbel fart = halvparten av bremselengde', 'Det er ingen sammenheng'],
    correct: 1,
    explanation: 'Bremselengde øker kvadratisk med farten! Dobbel fart = 4x bremselengde. Fra 50 km/t: ca. 14m. Fra 100 km/t: ca. 56m (4x mer). Fra 130 km/t: ca. 95m. Fart dreper.'
  },
  {
    id: 52, category: 'fart', difficulty: 'middels',
    question: 'Du ser et barneskole og det er skoletid. Fartsgrensen er 50 km/t. Er 50 km/t riktig fart her?',
    scenario: '🏫 Skolebarn flokker seg ved skoleporten. Klokken er 08:15.',
    options: ['Ja – fartsgrensen tillater 50 km/t', 'Nei – du bør redusere til 30 km/t eller under av hensyn til situasjonen', 'Ja, bare blås i hornet som advarsel', 'Det avhenger av om det er skiltet 30-sone'],
    correct: 1,
    explanation: 'Selv om fartsgrensen er 50 km/t, MÅ du tilpasse farten til forholdene. Mange barn nær vegen = svært lav fart. Fartsgrensen er MAKS, ikke anbefalt hastighet.'
  },
  {
    id: 53, category: 'fart', difficulty: 'vanskelig',
    question: 'Hvor mange prikker gir kjøring 26-30 km/t over fartsgrensen?',
    options: ['1 prikk', '2 prikker', '3 prikker', '4 prikker'],
    correct: 2,
    explanation: '26-30 km/t over grensen gir 3 prikker + bot + midlertidig tap av førerretten i inntil 6 måneder. 8 prikker på 3 år = tap av førerretten. Prikkene "resettes" etter 3 år.'
  },
  {
    id: 54, category: 'fart', difficulty: 'middels',
    question: 'Du kjører 80 km/t og din totale stoppelengde (reaksjon + bremse) er ca...?',
    options: ['Ca. 30 meter', 'Ca. 50 meter', 'Ca. 70 meter', 'Ca. 100 meter'],
    correct: 2,
    explanation: 'Ved 80 km/t: Reaksjonslengde (1 sek) ≈ 22m + Bremselengde ≈ 48m = ca. 70m total. På is/snø: multipliser med 3-4x. Alltid hold minst 2-3 sekunders avstand til forankjørende.'
  },

  // ===================== KJØRETØY =====================
  {
    id: 55, category: 'kjoretoy', difficulty: 'lett',
    question: 'Hva er minimum mønsterdybde for bildekk?',
    options: ['1 mm', '1,6 mm', '2 mm', '3 mm'],
    correct: 1,
    explanation: 'Minimum mønsterdybde = 1,6 mm. Under dette er bremseevnen sterkt redusert, spesielt på våt veg. Mange anbefaler bytte ved 3 mm.'
  },
  {
    id: 56, category: 'kjoretoy', difficulty: 'middels',
    question: 'Oljetrykk-lampen lyser rødt mens du kjører på motorveien. Hva gjør du?',
    scenario: '🔴 En rød oljekanne lyser på dashbordet mens du kjører i 100 km/t.',
    options: ['Fyller olje i neste stasjon', 'Stopper umiddelbart og slår av motoren', 'Kjører videre hvis ingen lyd', 'Slår av og på tenningen'],
    correct: 1,
    explanation: 'Rød oljetrykklampe = KRITISK. Stopp UMIDDELBART og slå av motoren. Å kjøre videre uten oljetrykk kan ødelegge motoren på sekunder. Kontakt veihjelp.'
  },
  {
    id: 57, category: 'kjoretoy', difficulty: 'middels',
    question: 'Når er piggdekk tillatt i Norge (normalt)?',
    options: ['Hele vinteren', '1. november til første mandag etter 2. påskedag', '1. desember til 1. april', 'Bare i Nord-Norge'],
    correct: 1,
    explanation: 'Piggdekk tillatt: 1. november – første mandag etter 2. påskedag. I Nordland, Troms og Finnmark: fra 15. oktober. Utenfor tillatt periode = bot.'
  },
  {
    id: 58, category: 'kjoretoy', difficulty: 'lett',
    question: 'Er varseltrekant påkrevd i norske biler?',
    options: ['Nei, frivillig', 'Ja, alltid påkrevd', 'Bare for yrkeskjøretøy', 'Bare for bilister over 65 år'],
    correct: 1,
    explanation: 'Varseltrekant er PÅKREVD i alle kjøretøy. Brukes ved nødstopp, ulykker og motorstopp. Plasseres minst 50m bak på åpen veg (100m+ på motorveg).'
  },
  {
    id: 59, category: 'kjoretoy', difficulty: 'middels',
    question: 'ABS (anti-lock braking system) – hva gjør du hvis det aktiveres under nødstopp?',
    scenario: '🚗 Du bremser hardt. Pedalen vibrerer og pulser. ABS har aktivert seg.',
    options: ['Slipper bremsepedalen – ABS virker ikke bra', 'Holder bremsepedalen NEDTRYKT med full kraft og styrer rundt hindringen', 'Pumper pedalen raskt', 'Trekker opp håndbremsen'],
    correct: 1,
    explanation: 'Med ABS: HOLD bremsepedalen hardt nedtrykt (ikke pump!). ABS pulserer automatisk for å hindre hjullås. Du KAN styre bilen mens du bremser hardt – bruk dette!'
  },
  {
    id: 60, category: 'kjoretoy', difficulty: 'middels',
    question: 'Hva er kravet til vinterdekk i Norge?',
    options: ['Alltid piggdekk i vinterhalvåret', 'Dekk tilpasset kjøreforholdene er påkrevd', 'Bare kjetting er godkjent', 'Sommerdekk er tillatt hele året'],
    correct: 1,
    explanation: 'Loven krever at kjøretøyet har dekk med tilstrekkelig grep for rådende kjøreforhold. I praksis betyr det vinterdekk (pigg eller piggfrie) ved is og snø. Sommerdekk på is er straffbart og ekstremt farlig.'
  },
  {
    id: 61, category: 'kjoretoy', difficulty: 'vanskelig',
    question: 'Du ser et gult advarselsskilt – en trekant – på dashbordet. Hva betyr det generelt?',
    options: ['Drivstoff er nesten tomt', 'Advarsel/feil i et system – se i bileierens håndbok', 'Service er nødvendig', 'Setebelter er ikke festet'],
    correct: 1,
    explanation: 'Gul varseltrekant på dashbordet = generell advarsel om en feil i et bilsystem. Se i bileierens håndbok for spesifikk forklaring. Ta bilen til verksted ved behov.'
  },
  {
    id: 62, category: 'kjoretoy', difficulty: 'middels',
    question: 'Hva er riktig dekktrykk og hvorfor er det viktig?',
    options: ['Spiller liten rolle', 'Riktig trykk gir bedre drivstofføkonomi, lengre dekklevetid og bedre kjøreegenskaper', 'Høyere trykk = alltid bedre', 'Bare viktig for racing'],
    correct: 1,
    explanation: 'Riktig dekktrykk (angitt i bilens dørpost eller håndbok) er viktig for: bremseevne, kjørestabilitet, drivstofføkonomi, og dekklevetid. Sjekk månedlig og alltid på lange turer.'
  },

  // ===================== MILJØ & SIKKERHET =====================
  {
    id: 63, category: 'miljo', difficulty: 'middels',
    question: 'Hva er den beste måten å kjøre økonomikvennlig på?',
    options: ['Kjøre alltid i laveste gir', 'Forutse trafikken, holde jevn fart og unngå unødig akselerasjon/bremsing', 'Alltid kjøre under fartsgrensen', 'Bruke klimaanlegget minimalt'],
    correct: 1,
    explanation: 'Økovennlig kjøring: Forutse trafikken (ikke brems hardt og gass igjen), hold jevn fart, bruk høyt gir ved lav fart, unngå tomgangskjøring. Kan spare 20-30% drivstoff.'
  },
  {
    id: 64, category: 'miljo', difficulty: 'lett',
    question: 'Hva øker drivstofforbruket mest?',
    options: ['Klimaanlegg på sommerdag', 'Hard akselerasjon og kraftig bremsing gjentatte ganger', 'Radiolyd', 'Passasjerer i baksetet'],
    correct: 1,
    explanation: 'Gjentatt hard akselerasjon og kraftig bremsing bruker svært mye drivstoff. En bil i jevn fart bruker langt mindre enn en bil som akselererer og bremser hele tiden.'
  },
  {
    id: 65, category: 'miljo', difficulty: 'middels',
    question: 'Hva er den anbefalte sikkerhetsavstanden (2-sekundersregelen)?',
    options: ['2 biler mellom deg og forankjørende', 'Velg et fast punkt foran: du skal bruke minst 2 sekunder fra forankjørende passerer det til du gjør det', 'Minimum 20 meter', '2 bilslengder i all trafikk'],
    correct: 1,
    explanation: '2-sekundersregelen: Finn et punkt (lyktestolpe, skilt). Forankjørende passerer det – tell "tusen-og-en, tusen-og-to". Du passerer = riktig avstand. I regn/snø: 4+ sekunder.'
  },
  {
    id: 66, category: 'miljo', difficulty: 'middels',
    question: 'Du har tatt et par øl hjemme. Det er morgenen etter og du skal kjøre til jobb. Er du edru?',
    scenario: '🍺 Du drakk 4 øl kvelden før. Klokken er nå 07:00.',
    options: ['Ja – det er mange timer siden', 'Usikkert – kroppen bruker ca. 1,5 time per enhet alkohol. Sjekk alltid med promillemåler', 'Ja – søvn fjerner alkoholen', 'Det avhenger av om du spiste mat'],
    correct: 1,
    explanation: 'Alkohol forsvinner fra blodet med ca. 0,15 promille per time. 4 øl = ca. 4 enheter = ca. 6 timer for å være under 0,2 promille. Jobb på 07:00 etter 4 øl sent på kveld kan fortsatt gi promille. Bruk alltid promillemåler ved usikkerhet.'
  },
  {
    id: 67, category: 'miljo', difficulty: 'vanskelig',
    question: 'Effekten av hastighet på risiko for at en fotgjenger omkomme ved påkjørsel?',
    options: ['Liten forskjell mellom 30 og 60 km/t', '30 km/t: 10% risiko å dø. 50 km/t: 40-80%. 70 km/t: 90%+ risiko', 'Risikoen er alltid 50/50', 'Raskere = alltid like stor risiko'],
    correct: 1,
    explanation: '30 km/t: ca. 10% risiko for dødelig utfall for fotgjenger. 50 km/t: 40-80% risiko. 70 km/t: Over 90% risiko. Fart er det viktigste enkeltfaktoren for alvorlige ulykker i tettbygd strøk.'
  },
  {
    id: 68, category: 'miljo', difficulty: 'middels',
    question: 'Hva er "defensive driving" (defensiv kjøring)?',
    options: ['Å bremse alltid', 'Å forutse farlige situasjoner og handle proaktivt for å unngå ulykker', 'Å aldri kjøre raskere enn 50 km/t', 'Å alltid gi vikeplikt for alle'],
    correct: 1,
    explanation: 'Defensiv kjøring: Forutse hva andre trafikanter (og barn, dyr) kan gjøre. Ha alltid en "escape plan". Anta at andre kan gjøre feil. Skann vegen langt fremover.'
  },

  // ===================== FØRSTEHJELP =====================
  {
    id: 69, category: 'forstehjelp', difficulty: 'lett',
    question: 'Hva er det FØRSTE du gjør når du ankommer en trafikkulykke?',
    options: ['Hjelper de skadde umiddelbart', 'Sikrer ulykkesstedet og varsler nødetatene (SIKRE-MELD-HJELP)', 'Tar bilder av skadene', 'Ringer tøyehelp'],
    correct: 1,
    explanation: 'SIKRE-MELD-HJELP: 1) Sikre stedet (varselblinkene på, varseltrekant 50m+, refleksvest). 2) Meld fra (112/113). 3) Hjelp de skadde. Sikring FØRST – ellers kan du bli offer selv.'
  },
  {
    id: 70, category: 'forstehjelp', difficulty: 'lett',
    question: 'Hva er nødnummeret for ambulanse i Norge?',
    options: ['110', '112', '113', '116117'],
    correct: 2,
    explanation: '113 = Ambulanse/medisinsk nødhjelp. 112 = Politi. 110 = Brann. 116117 = Legevakt (ikke nødssituasjon). Huskeregel: stigende orden = brann → politi → ambulanse.'
  },
  {
    id: 71, category: 'forstehjelp', difficulty: 'middels',
    question: 'Du finner en person som ikke svarer og puster ikke normalt. Hva gjør du?',
    scenario: '🚑 En person i en krasjed bil er bevisstløs og puster ikke normalt.',
    options: ['Venter på ambulansen', 'Starter HLR: 30 brystkompresjoner + 2 innblåsinger – ring 113', 'Gir personen vann', 'Legger personen i sideleie'],
    correct: 1,
    explanation: 'Bevisstløs + puster ikke normalt = START HLR umiddelbart. 30 kompresjoner (5-6 cm dybde, 100-120/min) + 2 innblåsinger. Ring 113. Ikke stopp til ambulansen ankommer.'
  },
  {
    id: 72, category: 'forstehjelp', difficulty: 'middels',
    question: 'Når skal du IKKE flytte en skadd person fra bilen?',
    options: ['Aldri flytt noen', 'Kun ved mistanke om nakkeskade og uten umiddelbar fare for liv (brann/drukning)', 'Alltid flytt fra bilen', 'Bare hvis personen ber deg vente'],
    correct: 1,
    explanation: 'Flytt IKKE en skadd person med mindre det er umiddelbar livsfare (brann, drukning). Unødig flytting kan forverre nakkeskade/ryggskade. Vent på ambulanse med stabiliseringsutstyr.'
  },
  {
    id: 73, category: 'forstehjelp', difficulty: 'vanskelig',
    question: 'HLR – korrekt rytme og dybde?',
    options: ['15 kompresjoner + 2 innblåsinger, 4 cm dybde', '30 kompresjoner + 2 innblåsinger, 5-6 cm dybde, 100-120/min', '20 kompresjoner + 1 innblåsing, 3 cm dybde', '10 kompresjoner + 3 innblåsinger'],
    correct: 1,
    explanation: 'Korrekt HLR: 30 kompresjoner (5-6 cm, 100-120/min med strake armer) + 2 innblåsinger. Vil du ikke blåse inn? Bare kompresjoner er mye bedre enn ingenting! Fortsett til ambulansen ankommer.'
  },
  {
    id: 74, category: 'forstehjelp', difficulty: 'middels',
    question: 'En person er bevisstløs men puster normalt. Hva gjør du?',
    scenario: '😵 Sjåføren i en krasjet bil er pinglete men puster jevnt.',
    options: ['Starter HLR', 'Legger personen i stabilt sideleie og ring 113', 'Rister personen kraftig for å vekke ham', 'Gir ham vann'],
    correct: 1,
    explanation: 'Bevisstløs + puster normalt = Stabilt sideleie (sideleie). Dette hindrer at personen kveles av oppkast. Ring 113. Overvåk pusten kontinuerlig. Ikke flytt om nakkeskade mistenkes.'
  },
  {
    id: 75, category: 'forstehjelp', difficulty: 'vanskelig',
    question: 'Hva gjør du ved kraftig blødning fra arm?',
    options: ['Legger personen ned og ringer 113 uten å gjøre noe med sår', 'Trykker hardt direkte på såret med rent tøy og ringer 113', 'Setter tourniquet umiddelbart', 'Vasker såret med vann'],
    correct: 1,
    explanation: 'Kraftig blødning: Press HARDT direkte på såret med rent tøy/bandasje. Hold trykket – ikke løft for å sjekke. Ring 113. Tourniquet brukes på lemmer kun som aller siste utvei.'
  },

  // ===================== PARKERING =====================
  {
    id: 76, category: 'parkering', difficulty: 'lett',
    question: 'Hva er forskjellen på "stans" og "parkering"?',
    options: ['Ingen – begge betyr det samme', 'Stans = kortvarig stopp for av/påstigning eller lossing. Parkering = lengre oppstilling', 'Stans er gratis, parkering koster', 'Stans er for busser, parkering for biler'],
    correct: 1,
    explanation: 'Stans: Midlertidig stopp der sjåfør er til stede (av/påstigning, kort lossing). Parkering: Enhver annen oppstilling. Reglene for hva som er tillatt er forskjellige.'
  },
  {
    id: 77, category: 'parkering', difficulty: 'middels',
    question: 'Hvor nær et veikryss er parkering forbudt?',
    options: ['5 meter', '10 meter', '15 meter', '20 meter'],
    correct: 1,
    explanation: 'Parkering forbudt nærmere enn 10 meter fra vegkryss (målt fra kanten av tverrgående vegbanen). Gjelder for å sikre fri sikt og fremkommelighet i krysset.'
  },
  {
    id: 78, category: 'parkering', difficulty: 'middels',
    question: 'Du parkerer på Karl Johan i Oslo. Det er gul enkel kantlinje. Er det lov?',
    scenario: '🏙️ Du skal handle raskt i Oslo sentrum. Det er en gul kantlinje langs fortauet.',
    options: ['Ja, kortvarig stans er greit', 'Nei – gul enkelt kantlinje betyr stans forbudt', 'Ja, med parkeringsskive', 'Det avhenger av tidspunkt'],
    correct: 1,
    explanation: 'Gul enkel kantlinje = Stans forbudt. Dobbel gul kantlinje = Stans og parkering forbudt. Gul linje gjelder uansett tid (med mindre underskilt angir tidsbegrensning).'
  },
  {
    id: 79, category: 'parkering', difficulty: 'middels',
    question: 'Hvor nær et gangfelt er det forbudt å parkere?',
    options: ['2 meter foran', '5 meter foran (sett i kjøreretning)', '10 meter foran', 'Ingen begrensning'],
    correct: 1,
    explanation: 'Parkering er forbudt nærmere enn 5 meter foran et gangfelt (sett i kjøreretningen). Dette sikrer sikt for fotgjengere som skal krysse.'
  },
  {
    id: 80, category: 'parkering', difficulty: 'vanskelig',
    question: 'Du parkerer bilen og er borte i 2 timer. Det er et "2-timers parkering 08-17" skilt. Er det greit?',
    options: ['Ja – 2 timer = tillatt', 'Ja, men du trenger parkeringsskive satt til ankomsttidspunktet', 'Nei – maks 1 time', 'Ja, ubegrenset tid utenfor 08-17'],
    correct: 1,
    explanation: 'Tidsbegrenset parkering krever parkeringsskive. Du setter skiva til ankomsttidspunktet (rundet opp til neste halvtime). Du kan stå til 2 timer er gått. Uten parkeringsskive = gebyr.'
  },
  {
    id: 81, category: 'parkering', difficulty: 'middels',
    question: 'Hva er "handikap-parkering" og hvem kan bruke den?',
    options: ['Parkering for alle – bare midlertidig', 'Parkering reservert for personer med gyldig HC-bevis på dashbordet', 'Parkering der du kan stå lenger', 'Parkering nærmere innganger'],
    correct: 1,
    explanation: 'HC-parkering (skilt med rullestol) er KUN for kjøretøy med gyldig HC-parkeringstillatelse godt synlig plassert i frontruten. Misbruk gir høye gebyr og kan regnes som tyveri av parkeringsplass.'
  },
  {
    id: 82, category: 'parkering', difficulty: 'vanskelig',
    question: 'Du skal bare levere en pakke – tar 2 minutter. Det er "Parkering forbudt"-skilt. Kan du stanse kort?',
    options: ['Ja – 2 minutter er greit', 'Nei – parkering forbudt-skiltet forbyr parkering, men rask stans (av/påstigning/lossing) mens du er til stede kan være tillatt', 'Ja – lastebiler gjør det, så det er greit', 'Det avhenger av om det er bilfritt område'],
    correct: 1,
    explanation: '"Parkering forbudt" forbyr PARKERING (lengre oppstilling uten at sjåfør er til stede). Kortvarig stans mens sjåfør er til stede for lossing er teknisk sett "stans", ikke "parkering". Men: Hvis det er "Stans og parkering forbudt" – ingenting er tillatt.'
  },

  // ===================== MØRKE & SIKT =====================
  {
    id: 83, category: 'mørke', difficulty: 'lett',
    question: 'Når er det påbudt å ha lys på bilen i Norge?',
    options: ['Bare i mørket', 'Bare i dårlig sikt', 'Hele døgnet, hele året', 'Fra oktober til mars'],
    correct: 2,
    explanation: 'I Norge er det ALLTID påbudt å ha kjørelys på – 24 timer i døgnet, 365 dager i året. Dette gjelder alle kjøretøy på offentlig veg.'
  },
  {
    id: 84, category: 'mørke', difficulty: 'middels',
    question: 'Du kjører på E6 i mørket med fjernlys. En bil kommer imot. Hva gjør du?',
    scenario: '🌙 Det er pitch black på riksvegen. Møtende bil dukker opp.',
    options: ['Holder fjernlys på hele veien', 'Dimmer til nærlys i god tid FØR den møtende bilen blender seg', 'Blinker med fjernlysene som signal', 'Kjører med bare bremselysene'],
    correct: 1,
    explanation: 'Bytt til nærlys i god tid FØR møtende kjøretøy er nært. Blending av andre er forbudt og farlig. Ser du allerede lysene på lang avstand, dim tidlig.'
  },
  {
    id: 85, category: 'mørke', difficulty: 'middels',
    question: 'Møtende bil blender deg kraftig. Hva gjør du?',
    options: ['Blender tilbake med fjernlys', 'Ser mot vegkanten til høyre og reduserer farten', 'Stopper midt i veien', 'Kjører videre som normalt og venter til bilen passerer'],
    correct: 1,
    explanation: 'Blendet av møtende: Se mot høyre vegkant for orientering. Reduser farten. Ikke se direkte i lysene (mister nattsynet i 5-10 sekunder). Ikke blende tilbake – det er farlig for begge parter.'
  },
  {
    id: 86, category: 'mørke', difficulty: 'vanskelig',
    question: 'Du kjører i tett tåke med 50m sikt. Hva er riktig maksimal fart?',
    scenario: '🌫️ Du kjører på riksveg. Fartsgrensen er 80 km/t men tåken er tett.',
    options: ['80 km/t – det er grensen', '60 km/t er nok med tåkelys', 'Sakte nok til at du kan stoppe innenfor 50m – uavhengig av fartsgrensen', '40 km/t er alltid nok i tåke'],
    correct: 2,
    explanation: 'Siktavstandsregelen: Du skal kjøre sakte nok til å stoppe innenfor det du kan se. 50m sikt ≈ maks 40-50 km/t. Fartsgrensen er maks ved gode forhold – i tåke gjelder siktavstandsregelen.'
  },
  {
    id: 87, category: 'mørke', difficulty: 'middels',
    question: 'Hva er "frys-is" og når oppstår det?',
    options: ['Is som fryser i motoren', 'Tynt usynlig islag som dannes ved temperaturer rundt 0°C, spesielt om natten og tidlig morgen', 'Is som bare finnes i Nord-Norge', 'Is på innsiden av frontruten'],
    correct: 1,
    explanation: 'Frys-is (black ice): Dannes ved temperaturer nær 0°C, spesielt i skygge, under broer, og på veger nær vann. Ekstremt glatt og vanskelig å se. Spesielt farlig ved soloppgang og i skygge.'
  },
  {
    id: 88, category: 'mørke', difficulty: 'middels',
    question: 'Hva bør du gjøre FØR du kjører inn i en tunnel om natten?',
    options: ['Øke farten siden tunnelen er bedre opplyst', 'Redusere farten og slå på nærlys FØR innkjøringen', 'Slå på fjernlys inne i tunnelen', 'Ingenting spesielt'],
    correct: 1,
    explanation: 'Tunnel: Reduser farten og slå på NÆRLYS før du kjører inn. Øynene trenger tid til å tilpasse seg lysforholdene. Fjernlys i tunnel kan blende møtende og reflekteres ubehagelig.'
  },

  // ===================== VEGOPPMERKING =====================
  {
    id: 89, category: 'vegoppmerking', difficulty: 'lett',
    question: 'Hva betyr en hel (sammenhengende) hvit midtlinje?',
    options: ['Du kan krysse forsiktig', 'Forbudt å krysse eller kjøre på linjen', 'Bare informasjon', 'Kun lastebiler forbudt å krysse'],
    correct: 1,
    explanation: 'Heltrukken hvit midtlinje = FORBUDT å krysse eller kjøre på. Brukes der siktforholdene er for dårlige for forbikjøring (kurver, bakketopper).'
  },
  {
    id: 90, category: 'vegoppmerking', difficulty: 'lett',
    question: 'Hva betyr en stiplet hvit midtlinje?',
    options: ['Forbudt å krysse', 'Kan krysse når det er trygt og lovlig', 'Bare for syklister', 'Midlertidig markering'],
    correct: 1,
    explanation: 'Stiplet (brutt) midtlinje = Du KAN krysse når det er trygt og lovlig (ingen forbikjøringsforbud, god sikt, nok avstand). Standard skillelinje mellom kjøreretninger.'
  },
  {
    id: 91, category: 'vegoppmerking', difficulty: 'middels',
    question: 'Hva betyr gul enkel kantlinje langs vegkanten?',
    options: ['Parkering tillatt', 'Stans forbudt', 'Sykkelfelt', 'Parkeringsgrense'],
    correct: 1,
    explanation: 'Gul enkel kantlinje = Stans forbudt. Gul dobbel linje = Stans og parkering forbudt. Brukes ved brannhydranter, bussholdeplasser, smal veg, osv.'
  },
  {
    id: 92, category: 'vegoppmerking', difficulty: 'middels',
    question: 'Du ser hvite piler som peker til høyre i ditt kjørefelt. Hva betyr det?',
    options: ['Anbefalt retning', 'Du MÅ svinge til høyre fra dette feltet', 'Informasjon om avkjørsel til høyre', 'Bare for lastebiler'],
    correct: 1,
    explanation: 'Hvite retningspiler = Du skal følge pilens retning fra det feltet. Velg riktig felt i god tid. Kan ikke bytte felt etter pilene. Kjører du feil felt = farlig situasjon og kan gi bot.'
  },
  {
    id: 93, category: 'vegoppmerking', difficulty: 'middels',
    question: 'Hva er en bred hvit linje tvers over vegbanen (stopp-linje)?',
    options: ['Gangfelt er nær', 'Stopp her ved rødt lys eller stoppskilt – forbudt å passere linjen ved rødt', 'Bussholdeplass', 'Speedbump varsel'],
    correct: 1,
    explanation: 'Stopplinja = Bred hvit linje ved lyskryss, STOPP-skilt og gangfelt. Du stopper FØR linjen. Passere stopplinja ved rødt lys er et alvorlig trafikkbrudd med bøter og prikk.'
  },
  {
    id: 94, category: 'vegoppmerking', difficulty: 'vanskelig',
    question: 'Hva betyr gule skrå striper (sperreflate) på vegbanen?',
    options: ['Kjøring er forbudt i det stripelagte området', 'Anbefalt svingebane', 'Informasjon om parkering', 'Kun for syklister'],
    correct: 0,
    explanation: 'Gule skrå striper (sperreflate) = Kjøring forbudt i det oppstriplede området. Brukes som farezone, ved vegavslutning, foran hindringer. Du kan ikke kjøre på det gule skrå-stripede området.'
  },
  {
    id: 95, category: 'vegoppmerking', difficulty: 'middels',
    question: 'Du ser et smalt hvitt felt merket med sykkel-symbol. Hva er dette?',
    options: ['Gangfelt', 'Sykkelfelt – reservert for syklister, biler forbudt', 'Sykkelparkering', 'Moped-fil'],
    correct: 1,
    explanation: 'Sykkelfelt = Felt reservert for syklister, merket med hvit kantlinje og sykkelsymbol. Motorkjøretøy forbudt. Syklister her har vikeplikt-rettigheter overfor svingene biler.'
  },

  // ===== EKSTRA: REAL-LIFE SCENARIOS =====
  {
    id: 96, category: 'trafikkregler', difficulty: 'vanskelig',
    question: 'Et barn løper plutselig ut i veien 30 meter foran deg. Du kjører 50 km/t. Rekker du å stoppe?',
    scenario: '🏃 Et barn springer rett ut i veien fra mellom parkerte biler.',
    options: ['Ja, alltid', 'Knapt – stoppelengde ved 50 km/t er ca. 28m pluss reaksjonstid. Det er svært tett på.', 'Nei, umulig', 'Ja, ABS-bremser stopper deg alltid i tide'],
    correct: 1,
    explanation: 'Ved 50 km/t er reaksjonslengde ~14m + bremselengde ~14m = ~28m total. 30 meter er VELDIG tett på – og med reaksjonstid fra du oppdager barnet kan du være for sein. Senk farten i boligstrøk og nær skoler!'
  },
  {
    id: 97, category: 'vikeplikt', difficulty: 'vanskelig',
    question: 'Du kjører på forkjørsveg. En bil fra sideveien har vikepliktskilt men kjører likevel ut i krysset. Hva gjør du?',
    scenario: '⚠️ Bilen fra sideveien ser ikke ut til å stoppe.',
    options: ['Holder farten – du har forkjørsrett', 'Bremser og er klar til å stoppe selv om du har forkjørsrett', 'Blåser i hornet og holder farten', 'Svinger unna til venstre kjørefelt'],
    correct: 1,
    explanation: 'Selv med forkjørsrett plikter du å unngå ulykker (Vegtrafikkloven §3). Å holde full fart inn i et kryss der en bil ikke overholder sin vikeplikt er uforsvarlig. Bremse og vær forberedt.'
  },
  {
    id: 98, category: 'fart', difficulty: 'vanskelig',
    question: 'Det er tørt og bra sikt. Du kjører 80 km/t bak en bil som plutselig bremser. Du har 2 sekunders avstand. Rekker du å stoppe?',
    scenario: '🚗 Bilen foran deg bremser brått. Du har holdt 2-sekunders avstand.',
    options: ['Nei – 2 sekunder er ikke nok', 'Ja – 2 sekunder er akkurat nok i tørrvær ved 80 km/t', 'Ja, alltid med ABS', 'Det avhenger av din reaksjonstid'],
    correct: 1,
    explanation: '2 sekunder = ~44m avstand ved 80 km/t. Reaksjonslengde ~22m + bremselengde ~48m = ~70m totalt. Faktisk ER 2 sekunder knapt nok ved optimal bremsing på tørr asfalt. I regn/snø: bruk 4+ sekunder.'
  },
  {
    id: 99, category: 'skilt', difficulty: 'middels',
    question: 'Du ser et gult skilt med svart tekst "VEGARBEID" og et fartsgrenseskilt for 50 km/t. Hva gjelder?',
    scenario: '🚧 Vegarbeid på motorveien. Oransje skilt overalt.',
    options: ['Den vanlige fartsgrensen på veien gjelder', 'Du skal kjøre MAX 50 km/t – arbeidsskilt overstyrer normal fartsgrense', 'Bare en anbefaling', 'Gjelder bare for tunge kjøretøy'],
    correct: 1,
    explanation: 'Fartsgrenseskilt ved vegarbeid er GJELDENDE FARTSGRENSE, ikke anbefaling. Disse er satt for å beskytte vegarbeidere. Fartsovertredelse i vegarbeidssone kan gi dobbel bot.'
  },
  {
    id: 100, category: 'miljo', difficulty: 'middels',
    question: 'Du kjører 110 km/t på motorveg og merker at øynene er tunge. Du har 20 mil igjen. Hva er det eneste riktige?',
    scenario: '😴 Lang motorvegtur. Du har kjørt 4 timer. Øynene vil ikke være åpne.',
    options: ['Slår på radioer høyere', 'Stopper på nærmeste rasteplass og sover 20-30 minutter', 'Åpner vinduet og kjører videre', 'Drikker kaffe og holder ut til neste by'],
    correct: 1,
    explanation: 'Microsøvn ved 110 km/t: 3 sekunder = 91 meter i "blindflyvning". Det er umulig å forhindre og kan skje selv om du ikke føler deg søvnig. Kaffe hjelper kortvarig – søvn er eneste kur. STOPP.'
  },
  {
    id: 101, category: 'forstehjelp', difficulty: 'middels',
    question: 'Du stopper etter en ulykke. Det er mørkt. Hva er det VIKTIGSTE du gjør for å hindre en ny ulykke?',
    scenario: '🌑 Natteulykke på en riksveg. Du stopper bak ulykkesstedet.',
    options: ['Tar bilder av skadene', 'Slår på varselblink, tar på refleksvest, sett ut varseltrekant (minst 50m bak), og orienter deg mot autovernet', 'Ringer forsikringsselskapet', 'Hjelper skadde umiddelbart uten å tenke på sikring'],
    correct: 1,
    explanation: 'SIKRING FØRST i mørket: Varselblinkene på. Ut av bilen med refleksvest. Varseltrekant 50m+ bak. Hold deg mot autovernet/grøfta. En ny påkjøring bakfra er meget reell fare. Sikring redder liv – inkludert ditt eget.'
  },
  {
    id: 102, category: 'parkering', difficulty: 'middels',
    question: 'Du vil stanse for å slippe av en passasjer utenfor en skole. Det er "stans og parkering forbudt"-skilt. Kan du stoppe?',
    scenario: '🏫 Du skal slippe av barnet ditt ved skoleporten. Det er dobbel gul linje.',
    options: ['Ja – stans for av/påstigning er alltid tillatt', 'Nei – "Stans og parkering forbudt" forbyr absolutt ALL stans, inkludert av/påstigning', 'Ja, bare 30 sekunder er greit', 'Det avhenger av trafikken'],
    correct: 1,
    explanation: '"Stans og parkering forbudt" (dobbel gul linje, skilt 376) forbyr ALL form for stans – inkludert av/påstigning. Stopper du her kan du få gebyr. Finn et lovlig sted å sette av.'
  },
  {
    id: 103, category: 'mørke', difficulty: 'vanskelig',
    question: 'Du kjører bak en bil om natten med nærlys. Hvor langt foran kan du se?',
    options: ['100+ meter', '60-70 meter', '40-50 meter med nærlys', '10-15 meter'],
    correct: 2,
    explanation: 'Nærlys belyser typisk 40-50 meter foran bilen. Fjernlys: 100+ meter. Det betyr at ved 80 km/t med nærlys bak en annen bil, er stoppelengden (ca. 70m) LENGRE enn du kan se. Øk avstand eller bruk fjernlys der det er mulig.'
  },
  {
    id: 104, category: 'vegoppmerking', difficulty: 'vanskelig',
    question: 'Du ser en heltrukken hvit midtlinje til venstre og en stiplet til høyre av midten. Hva betyr det?',
    options: ['Du kan passere fra begge sider', 'Du kan bare passere fra siden med stiplet linje (høyre side), men ikke fra venstre side', 'Begge sider er forbudt', 'Begge sider er tillatt'],
    correct: 1,
    explanation: 'Kombinert linje (hel + stiplet): Bilen nærmest den heltrukkede linjen har FORBUD mot å krysse. Bilen nærmest den stiplede linjen KAN krysse når det er trygt. Denne kombinasjonen brukes der det er ulik sikt i de to retningene.'
  },
  {
    id: 105, category: 'kjoretoy', difficulty: 'middels',
    question: 'Bilen din har bildebokser (ESP/ESC). Hva gjør den?',
    options: ['Hjelper deg med parkering', 'Stabiliserer bilen automatisk ved sleng og sideglidning for å hindre utforkjøring', 'Varsler om for tett følgeavstand', 'Styrer bilen automatisk'],
    correct: 1,
    explanation: 'ESP (Electronic Stability Program) / ESC (Electronic Stability Control): Registrerer når bilen begynner å "gli" og bremser individuelle hjul automatisk for å stabilisere bilen. Spesielt viktig i kurver og på glatt veg. Kan ikke oppheves av mye fart.'
  },

  // ===== MORE BONUS QUESTIONS =====
  {
    id: 106, category: 'trafikkregler', difficulty: 'middels',
    question: 'Hva er "aggressiv kjøring" og hva kan konsekvensene være?',
    options: ['Bare kuting – kan gi advarsel', 'Tett følgeavstand, skumling, horn-bruk og klipping kan gi bot, prikk, og i alvorlige tilfeller tap av førerkort', 'Er tillatt på motorveg', 'Er lov å gjøre tilbake mot aggressive sjåfører'],
    correct: 1,
    explanation: 'Aggressiv kjøring er forbudt og farlig. Det inkluderer: tett påkjøring, "kutt", overdreven horn-bruk, og skremmende maneuvrer. Politiet kan gi bot, prikker, og innkalle førerkortet.'
  },
  {
    id: 107, category: 'vikeplikt', difficulty: 'middels',
    question: 'Du kommer til et kryss. Til venstre er det en brann (røyk og flammer). En brannbil kommer fra høyre. Hvem kjører?',
    scenario: '🚒 Brannbil med blålys og sirene, fra din høyre side.',
    options: ['Du – du var i krysset først', 'Brannbilen – utrykningskjøretøy har alltid forkjørsrett', 'Høyreregelen: brannbilen kommer fra høyre', 'Brannbilen MÅ vente'],
    correct: 1,
    explanation: 'Utrykningskjøretøy med blålys og sirene har forkjørsrett ALLTID – over alle skilt, lys, og regler. Sett deg til siden og stopp om nødvendig. I dette tilfellet er det dessuten brannbil med sirene: vike umiddelbart.'
  },
  {
    id: 108, category: 'fart', difficulty: 'middels',
    question: 'Du kjører 50 km/t i tettbygd strøk. En bil på tvers kjører inn i krysset foran deg uten å se deg. Du bremser hardt. ABS aktiverer. Du STYRER også mot fortauet. Hva er riktig?',
    scenario: '🚗 Plutselig hindring i kryss – du bremser ABS og styrer.',
    options: ['Slipp bremsene for å styre', 'Hold bremsene nede og styr samtidig – ABS lar deg styre mens du bremser maksimalt', 'Brems og styr aldri samtidig', 'Bruk bare håndbremsen'],
    correct: 1,
    explanation: 'Med ABS: Trykk bremsepedalen HELT NED og hold den der. ABS hindrer hjullåsing og lar deg styre mens du bremser. Det er MENINGEN at du skal styre samtidig – dette er ABSs store fordel.'
  },
  {
    id: 109, category: 'miljo', difficulty: 'lett',
    question: 'Hva er tomgangskjøring og er det tillatt?',
    options: ['Lov overalt', 'Forbudt mer enn 3 minutters unødig tomgangskjøring (mange kommuner)', 'Bare lov om vinteren', 'Kun lov for dieselbiler'],
    correct: 1,
    explanation: 'Tomgangskjøring er forbudt mer enn 3 minutter uten spesiell grunn i mange norske kommuner. Det forurenser unødig og er sløsing med drivstoff. Slå av motoren ved lengre stopp.'
  },
  {
    id: 110, category: 'kjoretoy', difficulty: 'vanskelig',
    question: 'Hva er EU-kontroll og hva sjekker den?',
    options: ['En frivillig sjekk av bilen', 'Obligatorisk periodisk teknisk kontroll som sjekker bremser, lys, dekk, styring og mer', 'En kontroll av sjåføren', 'En forsikringskontroll'],
    correct: 1,
    explanation: 'EU-kontroll (Periodisk kjøretøykontroll) er obligatorisk. Første gang 4 år etter registrering, deretter hvert 2. år. Sjekker: bremser, lys, dekk, karosseri, styring, eksos, og mer. Bestås ikke = bilen kan ikke brukes lovlig.'
  },
];

// GUIDES – Comprehensive Norwegian Traffic Law Coverage
const GUIDES = [
  {
    id: 'guide-trafikkregler',
    category: 'trafikkregler',
    title: 'Grunnleggende Trafikkregler',
    intro: 'Alt du trenger å vite om de grunnleggende reglene i norsk trafikk – fra høyreregelen til motorvegregler.',
    content: [
      {
        heading: 'Generell aktsomhetsplikt (§3)',
        icon: '👀',
        text: 'Vegtrafikkloven §3 er grunnloven i norsk trafikk: Du plikter å ferdes hensynsfullt og være varsom slik at du ikke volder fare eller unødig ulempe. Selv om du har forkjørsrett, har du plikt til å unngå ulykker. "Jeg hadde forkjørsrett" er aldri en unnskyldning.',
      },
      {
        heading: 'Høyreregelen – den viktigste regelen',
        icon: '↗️',
        text: 'I kryss uten regulering (skilt, lys, politimann): Du plikter å gi vikeplikt for trafikk som kommer fra din HØYRE side. Huskeregel: De som kommer fra høyre, har RETT. Høyreregelen gjelder ikke på motorveg, i rundkjøringer med skilt, eller mot sporvogn/trikk.',
        list: [
          'Gjelder i alle ukryssede veikryss uten andre reguleringer',
          'Inkluderer syklister og mopeder som kommer fra høyre',
          'Gjelder ikke mot utrykningskjøretøy med blålys/sirene',
          'Overstyres av trafikklys, skilt og politiets anvisninger',
        ]
      },
      {
        heading: 'Blinklys – bruk og regler',
        icon: '💡',
        text: 'Blinklys skal brukes alltid, i god tid FØR du: svinger i kryss, skifter fil, kjører ut fra parkering, eller kjører av motorvegen. Blinklys frittar deg ikke fra vikeplikt – det varsler bare om din intensjon. Unnlatelse å bruke blinklys er et brudd på trafikkreglene.',
      },
      {
        heading: 'Forbikjøring – regler og forbud',
        icon: '🏎️',
        text: 'Forbikjøring er tillatt når: midtlinja er stiplet, du har god sikt begge veier, det er tilstrekkelig tid og plass, og det ikke finnes forbudsskilt. Forbikjøring er ALLTID forbudt ved: hel midtlinje, kurver og bakketopper, nær kryss og gangfelt, ved bussholdeplasser, og der forbudsskilt er satt opp.',
        list: [
          'Signal med venstre blinklys, sjekk speil + blindsone',
          'Kjør tilbake til høyre snarest mulig etter forbikjøring',
          'Minimum 50 cm siderom til syklister ved forbikjøring',
          'Aldri forbikjøring til høyre (unntatt i sammenhengende kø)',
        ]
      },
      {
        heading: 'Motorveg – særregler',
        icon: '🛣️',
        text: 'Motorveg er skiltet med blått M-skilt. Særregler: Hold alltid til høyre i normalkjøring. Forbikjøring KUN til venstre. Minstehastighet 40 km/t (eller der skiltet angir). Nødstopp og stopp kun på nødstopp-lommer. Innkjøring: vikeplikt for motorvegtrafikk, flett deg inn med god fart. Utkjøring: signal tidlig, bremse i nedkjøringsfeltet.',
      },
      {
        heading: 'Viktig: Utrykningskjøretøy',
        icon: '🚨',
        text: 'Ambulanse, brannbil og politibil med BLÅLYS og/eller SIRENE har alltid forkjørsrett. Du plikter å vike unna straks det er trygt. I kryss: stopp om nødvendig. I tunnel: kjør til siden og stopp om mulig. Du kan krysse hel linje og stoppe på forbudt sted for å vike.',
      },
    ]
  },
  {
    id: 'guide-vikeplikt',
    category: 'vikeplikt',
    title: 'Vikeplikt og Forkjørsrett',
    intro: 'Vikeplikt er det temaet som flest stryker på. Les nøye og lær den absolutte prioritetsrekkefølgen.',
    content: [
      {
        heading: 'Absolutt prioritetsrekkefølge',
        icon: '📊',
        text: 'Disse reglene overstyrer alltid hverandre i denne rekkefølgen – husk dem utenat:',
        list: [
          '1. Politiets anvisninger (alltid øverst)',
          '2. Trafikklyssignaler (rød = stopp, gul = klar til stopp, grønn = kjør)',
          '3. Skilt og vegoppmerking (vikepliktskilt, STOPP-skilt, osv.)',
          '4. Sporvogn/trikk (har alltid forkjørsrett over biler)',
          '5. Utrykningskjøretøy med blålys/sirene',
          '6. Høyreregelen (gjelder bare når ingen av de ovenfor regulerer)',
        ]
      },
      {
        heading: 'Forkjørsveg – gult diamantskilt',
        icon: '💎',
        text: 'Kjører du på en veg merket med gult diamantskilt (202), har du forkjørsrett over all trafikk på veier som krysser med vikepliktskilt. VIKTIG: Selv på forkjørsveg har du vikeplikt for motkommende trafikk når du skal svinge til VENSTRE! Forkjørsvegen slutter ved grått/hvitt diamantskilt (204) – da gjelder høyreregelen igjen.',
      },
      {
        heading: 'Vikepliktskilt og STOPP-skilt',
        icon: '⚠️',
        text: 'Vikepliktskilt (invertert trekant, skilt 202): Du plikter å gi vikeplikt for ALL trafikk på kryssende/møtende veg, men trenger ikke nødvendigvis stoppe hvis vegen er klar. STOPP-skilt (åttekant med "STOPP"): Du MÅ stoppe fullstendig ved stopplinja, selv om det er fritt. Deretter gi vikeplikt.',
      },
      {
        heading: 'Rundkjøring – alltid vikeplikt inn',
        icon: '🔄',
        text: 'I rundkjøring (skilt 408 – blå pil i sirkel): All trafikk INNE i rundkjøringen har forkjørsrett. Du som kjører INN har alltid vikeplikt, markert med vikepliktskilt. Blinklys: bruk VENSTRE blinklys inn i rundkjøringen (valgfritt), bruk HØYRE blinklys NÅR du tar din avkjøring. Høyreregelen gjelder IKKE i rundkjøring.',
      },
      {
        heading: 'Utkjøring gir alltid vikeplikt',
        icon: '🏪',
        text: 'Kjører du ut fra bensinstasjon, parkering, gård, stikkveg eller privat avkjørsel: Du har ALLTID vikeplikt for all trafikk på vegen du kjører inn på. Dette gjelder også fotgjengere og syklister på fortau eller gang/sykkelveg.',
      },
      {
        heading: 'Fotgjengere og syklister',
        icon: '🚶',
        text: 'Fotgjengere i gangfelt: ALLTID forkjørsrett. Du plikter å stoppe og vente til de har gått over. Det er forbudt å øke farten mot fotgjengere. Syklister: Bil som svinger har vikeplikt for syklist som kjører rett frem i sykkelfelt. Barn og eldre opptrer uforutsigbart – alltid ekstra forsiktig.',
      },
      {
        heading: 'Venstresving – motkommende',
        icon: '↩️',
        text: 'Skal du svinge til venstre, har du ALLTID vikeplikt for motkommende trafikk – uansett om du er på forkjørsveg eller ikke. Du må vente til det er klart FRA BEGGE sider. Vanlig feil: å glemme vikeplikt for motkommende ved venstresving.',
      },
    ]
  },
  {
    id: 'guide-fart',
    category: 'fart',
    title: 'Fartsgrenser og Sikkerhetsfart',
    intro: 'Komplett oversikt over alle fartsgrenser i Norge, bremselengder, og konsekvenser av for høy fart.',
    content: [
      {
        heading: 'Fartsgrenser i Norge – fullstendig tabell',
        icon: '🚦',
        text: 'Standard fartsgrenser – gjelder uten skilt:',
        table: [
          ['Veg/situasjon', 'Grense', 'Merknad'],
          ['Tettbygd strøk', '50 km/t', 'Fra tettstedsskilt til slutt-skilt'],
          ['Utenfor tettbygd', '80 km/t', 'Standardgrense på riksveg'],
          ['Motorveg', '110 km/t', 'Der ikke annet er skiltet'],
          ['Skole/barnehage', '30 km/t', 'I skoletiden, med skilt'],
          ['Beboelsesgate', '30 km/t', 'Spesialskilt, eller som skiltet'],
          ['Gatetun', '7 km/t', 'Gående har forkjørsrett'],
        ]
      },
      {
        heading: 'Stopp- og bremselengder – lær disse',
        icon: '⏹️',
        text: 'Total stoppelengde = reaksjonstid (ca. 1 sek) + bremselengde:',
        table: [
          ['Fart', 'Reaksjonsstrekning', 'Bremselengde (tørr asfalt)', 'Total stopp'],
          ['50 km/t', '14 m', '14 m', '~28 m'],
          ['80 km/t', '22 m', '40 m', '~62 m'],
          ['110 km/t', '30 m', '76 m', '~106 m'],
          ['130 km/t', '36 m', '106 m', '~142 m'],
        ]
      },
      {
        heading: 'Is og snø – bremselengde multipliseres',
        icon: '❄️',
        text: 'På glatt veg øker bremselengden dramatisk. På is kan du multiplisere bremselengden med 5-10x. Det betyr at 50 km/t på is kan kreve over 100m! Reduser alltid farten drastisk og øk følgeavstanden til minimum 4-6 sekunder (tommelfingerregel: 3-sekundersregelen × 2 på glatt).',
      },
      {
        heading: 'Kjør etter forholdene – lovpålagt',
        icon: '🌨️',
        text: 'Selv om fartsgrensen er 80 km/t, kan du bryte loven ved å kjøre 60 km/t i tett tåke eller på isete veg. Loven krever at du kjører slik at du kan stoppe innenfor det du kan se og forvente. Dårlig vær, mørke, glatt veg, tung last, barn nær vegen – alt dette krever lavere fart.',
      },
      {
        heading: 'Bøter, prikker og tap av førerrett',
        icon: '⚖️',
        text: 'Konsekvenser av fartsoverskridelse (fra 2024):',
        table: [
          ['Overskridelse', 'Bot', 'Prikker'],
          ['1-10 km/t over', 'Fra kr 2.000', '0 prikker'],
          ['11-15 km/t over', 'Fra kr 4.000', '1 prikk'],
          ['16-20 km/t over', 'Fra kr 7.700', '2 prikker'],
          ['21-25 km/t over', 'Fra kr 11.200', '3 prikker'],
          ['26-30 km/t over', 'Gebyr + midl. tap', '3 prikker'],
          ['31+ km/t over', 'Inndragning mulig', 'Mulig tap av retten'],
        ]
      },
      {
        heading: 'Promille – alkohol og kjøring',
        icon: '🍺',
        text: '0,2 promille: Lovlig øvre grense. 0,5 promille: Streng straff (bot og midlertidig tap). 1,2 promille: Ubetinget fengsel. Alkohol forsvinner i kroppen med ca. 0,1-0,15 promille per time. Husk: "dagen derpå"-promille er svært vanlig og like farlig. Medisin og trøtthet forsterker effekten.',
      },
    ]
  },
  {
    id: 'guide-forstehjelp',
    category: 'forstehjelp',
    title: 'Førstehjelp ved Trafikkulykker',
    intro: 'Riktig handling i de første minuttene etter en ulykke kan redde liv. Lær SIKRE–MELD–HJELP og HLR.',
    content: [
      {
        heading: 'SIKRE – MELD – HJELP (i denne rekkefølgen!)',
        icon: '🆘',
        text: 'Dette er den korrekte rekkefølgen ved trafikkulykke:',
        list: [
          '1. SIKRE: Stopp trygt, sett på varselblink, ta på refleksvest, sett varseltrekant minst 50m bak (150m på motorveg)',
          '2. MELD: Ring 113 (ambulanse) og/eller 112 (politi). Oppgi: Nøyaktig sted, antall skadde, alvorlighet, om noen er fastklemt',
          '3. HJELP: Nå kan du hjelpe de skadde. Sjekk bevissthet, luftveier, pust og blødning',
        ]
      },
      {
        heading: 'Nødnumre – husk disse',
        icon: '📞',
        text: 'De tre nødnumrene i stigende rekkefølge – enkelt å huske:',
        table: [
          ['Nummer', 'Tjeneste', 'Bruk'],
          ['110', '🔥 Brann', 'Brann i kjøretøy, tunnel, bygg'],
          ['112', '🚔 Politi', 'Ulykke, kriminalitet, fare'],
          ['113', '🚑 Ambulanse', 'Skadde personer, medisinsk nød'],
          ['116 117', '🏥 Legevakt', 'Ikke-livstruende skader'],
          ['112', '🆘 Nødalarm', 'Fra mobiltelefon – finner posisjonen din'],
        ]
      },
      {
        heading: 'DRSABC – sjekk bevissthet og luftveier',
        icon: '🤕',
        text: 'Systematisk sjekk av skadd person:',
        list: [
          'D – Danger: Er stedet trygt for deg og den skadde?',
          'R – Response: Rist forsiktig i skuldrene, rop "Kan du høre meg?"',
          'S – Shout: Rop om hjelp, be noen ringe 113',
          'A – Airway: Bøy hodet forsiktig bakover og løft haken – åpne luftveiene',
          'B – Breathing: Sjekk pust i 10 sekunder (se, hør, kjenn)',
          'C – Circulation: Se etter kraftig blødning – stopp den med direkte press',
        ]
      },
      {
        heading: 'HLR – 30 kompresjoner + 2 innblåsinger',
        icon: '💓',
        text: 'Hjerte-lunge-redning når personen IKKE puster normalt:',
        list: [
          'Legg personen på ryggen på hardt underlag',
          'Plasser håndbaken midt på brystet (mellom brystene)',
          '30 KOMPRESJONER: Pres 5-6 cm ned, strake armer, 100-120 per minutt',
          '2 INNBLÅSINGER: Bøy hodet tilbake, klem nesen, blås inn i 1 sekund',
          'Gjenta 30:2 uavbrutt til ambulansen ankommer',
          'Vil du ikke blåse? Bare kompresjoner (hjertemassasje) er bedre enn ingenting!',
          'Hjertestarteren (AED): bruk den straks den er tilgjengelig – den gir instruksjoner',
        ]
      },
      {
        heading: 'Stabilt sideleie',
        icon: '😴',
        text: 'Bevisstløs person som PUSTER normalt: Legg i stabilt sideleie for å hindre at de kveler seg på oppkast. Bøy overkneiet, vend personen mot deg, legg hånden under kinnet, hold munnen litt åpen. Overvåk pusten kontinuerlig. Unntak: mistenkt nakkeskade – flytt kun dersom luftveiene er blokkert.',
      },
      {
        heading: 'Blødning og nakkeskade',
        icon: '🩸',
        text: 'Stopp blødning: Press HARDT og DIREKTE på såret med rent tøy. Hold trykket – ikke slipp. Hev skadestedet om mulig. Nakkeskade: Flytt IKKE personen med mistanke om nakkeskade, med mindre det er livsfare (f.eks. brann). Stabiliser hodet og nakken med hendene. Snakk rolig og beroligende.',
      },
    ]
  },
  {
    id: 'guide-skilt',
    category: 'skilt',
    title: 'Trafikkskiltenes System',
    intro: 'Norske trafikkskilt er delt i grupper etter form og farge. Lær systemet, og alle skilt gir mening.',
    content: [
      {
        heading: 'De fire hovdskiltgruppene',
        icon: '📋',
        text: 'Huskeregel: Formen forteller hva slags skilt det er – fargen bekrefter.',
        table: [
          ['Gruppe', 'Form', 'Farge', 'Betyr'],
          ['Advarselsskilt', 'Trekant (spiss opp)', 'Rød kant, hvit bakgrunn', 'Fare foran deg'],
          ['Forbudsskilt', 'Sirkel', 'Rød kant, hvit bakgrunn', 'Dette er forbudt'],
          ['Påbudsskilt', 'Sirkel', 'Blå bakgrunn, hvit pil/symbol', 'Du MÅ gjøre dette'],
          ['Opplysningsskilt', 'Rektangel/firkant', 'Blå/hvit/grønn bakgrunn', 'Informasjon'],
          ['Vikepliktskilt', 'Invertert trekant', 'Rød kant, hvit+gult', 'Gi vikeplikt'],
          ['STOPP-skilt', 'Åttekant', 'Rød bakgrunn, hvit tekst', 'STOPP fullstendig'],
          ['Forkjørsveg', 'Diamant/rombe', 'Gult med hvit kant', 'Du har forkjørsrett'],
        ]
      },
      {
        heading: 'Advarselsskilt – de viktigste',
        icon: '⚠️',
        text: 'Rød trekant, hvit bakgrunn – varsler om fare foran. Alltid hevet aktsomhet og sett ned farten:',
        list: [
          '102 – Vegkryss: Kryss foran, høyreregelen kan gjelde',
          '103/104 – Sving: Skarp sving, reduser farten markant',
          '108 – Vegsmalning: Vegen smalner, møtende kan komme',
          '140 – Gangfelt: Fotgjengere kan krysse',
          '142 – Barn: Barn nær vegen (skoler, lekeplasser)',
          '145 – Glatt veg: Kan være glatt – reduser farten',
          '156 – Elg/dyr: Spesielt aktivt i skumring og natt',
          '132 – Jernbanekryss: STOPP og sjekk alltid',
        ]
      },
      {
        heading: 'Forbudsskilt – rød sirkel',
        icon: '🚫',
        text: 'Rød ring med hvit bakgrunn. Forbudet gjelder fra skiltet og til opphevingsskilt, neste kryss, eller der skiltet avsluttes av underskilt.',
        list: [
          '202 – Innkjøring forbudt (rød og hvit "forbudskant")',
          '306 – Forbikjøring forbudt',
          '362-380 – Fartsgrenseskilt (f.eks. 60, 80, 100)',
          '372 – Parkering forbudt (P med strek)',
          '376 – Stans forbudt (absolutt – ikke stopp for noe)',
          '318 – Motorsykkel forbudt',
          '322 – Tyngre kjøretøy forbudt (totalvekt over X tonn)',
        ]
      },
      {
        heading: 'Fartsgrenseskilt – viktig kunnskap',
        icon: '🔢',
        text: 'Rundt, rød kant = fartsgrense (bindende). Gult rektangel = anbefalt hastighet (ikke bindende – men følg den i kurver!). Grått/hvitt skjold = slutt på særskilt fartsgrense, tilbake til standardgrense. Start tettbygd strøk (bobleskilt) = automatisk 50 km/t, selv uten fartsgrenseskilt.',
      },
      {
        heading: 'Påbudsskilt – blå sirkel',
        icon: '🔵',
        text: 'Blå sirkel med hvit symbol eller pil. Du MÅ følge påbudet – ingen valgfrihet.',
        list: [
          '403 – Rett frem (du kan ikke svinge)',
          '404 – Sving til høyre',
          '406 – Sving til venstre',
          '408 – Rundkjøring (kjør med klokka)',
          '522 – Gang- og sykkelveg (kun for gående og syklende)',
          '524 – Gangveg (kun for gående)',
          '528 – Sykkelveg (kun for syklende)',
        ]
      },
      {
        heading: 'Opplysnings- og vegvisningsskilt',
        icon: '🗺️',
        text: 'Blå/grønne rektangler = informasjon (ikke direkte påbud/forbud). Grønne skilt = motorveg og europaveg. Blå skilt = riksveg. Gule skilt = midlertidig veiledning (f.eks. omvei). "E" foran tall = europaveg. "Rv" foran tall = riksveg.',
      },
    ]
  },
  {
    id: 'guide-parkering',
    category: 'parkering',
    title: 'Parkering, Stans og Standsregler',
    intro: 'Parkeringsreglene er detaljerte. Lær forskjellen mellom stans og parkering, og hvor du ALDRI kan stanse.',
    content: [
      {
        heading: 'Stans vs Parkering – viktig skille',
        icon: '🅿️',
        text: 'STANS = å holde bilen kortvarig for av/påstigning eller lasting/lossing. Du må da sitte i bilen (eller ha den umiddelbart synlig). PARKERING = alle andre tilfeller der kjøretøyet forlates eller parkeres lenger. Reglene for stans og parkering er ulike!',
      },
      {
        heading: 'Forbud mot stans og parkering – ALLTID forbudt',
        icon: '🚫',
        text: 'Disse stedene er forbudt å stanse (og selvfølgelig parkere):',
        list: [
          'I gangfelt og 5 meter FØR gangfelt',
          'I vegkryss og 5 meter fra vegkantlinjer',
          'På jernbaneovergang',
          'I forkjørsel til tunnel eller bru',
          'Over brannkum eller portåpning',
          'Foran inn/utkjøring til eiendom (blokkering)',
          'I busspollommer under bruk',
          'Der stans-forbudt-skilt (376) er satt opp',
        ]
      },
      {
        heading: 'Parkering forbudt – ytterligere steder',
        icon: '🚗',
        text: 'Disse stedene er forbudt å PARKERE (stans korte tid er OK):',
        list: [
          'Nær kryss: parkering forbudt innenfor 20 meter fra hjørnene',
          'Utenfor inn- og utkjøring til eiendom (blokkerer adkomst)',
          'På vegbane foran bussholdeplass',
          'Der parkeringsforbud-skilt (372) er satt opp',
          'I sykkelfelt',
          'Langs sammenhengende gult felt (hjemsted/parkering tidsavgrenset)',
        ]
      },
      {
        heading: 'Belysning ved parkering',
        icon: '💡',
        text: 'Når du parkerer i mørket (eller dårlig sikt): Du MÅ ha parkeringslys på dersom bilen ikke er godt synlig. Alternativt: Bruk parkeringslykter (hvit foran, rød bak) montert på bilen, synlig fra minst 100m. Bilen skal aldri være usynlig i mørket.',
      },
      {
        heading: 'Parkeringsskilt og tidsavgrensning',
        icon: '⏰',
        text: 'P-skilt med klokkeslett: Parkering tillatt kun i angitt tidsrom. P-skilt med pil: Pilen angir retning (foran skilt, bak skilt, begge sider). Blå sone (beboerparkering): Kun for dem med parkeringstillatelse. Avgiftsparkering: Betal for perioden du parkerer – overskridelse kan gi bot.',
      },
      {
        heading: 'Korrekt parkering og utstigning',
        icon: '🚪',
        text: 'Parker parallelt med fortau der mulig. Avstand til fortaukant: maks 25 cm. Se deg alltid for FØR du åpner bildøren – syklister og andre kan komme forbi. Motorsykler kan parkere vinkelrett der biler parkerer parallelt (tar mindre plass). Kjøretøy skal ikke blokkere gangvei eller fortau.',
      },
    ]
  },
  {
    id: 'guide-vegoppmerking',
    category: 'vegoppmerking',
    title: 'Vegoppmerking og Linjer',
    intro: 'Linjene på vegbanen er en del av reguleringen – de er bindende på samme måte som skilt.',
    content: [
      {
        heading: 'Midtlinje – stiplet vs hel',
        icon: '🛣️',
        text: 'STIPLET midtlinje: Forbikjøring er tillatt (men sjekk alltid sikt og motkommende). HEL midtlinje: Absolutt forbud mot å krysse – du kan ikke kjøre forbi. Kombinert linje (hel på din side, stiplet på motpartens): Du kan ikke krysse, men motkommende kan.',
      },
      {
        heading: 'Kjørefeltslinjer og vegskulder',
        icon: '↔️',
        text: 'Sporskillingslinje (tynn stiplet): Skiller kjørefeltene – bytt felt forsiktig med signal. Kjørefeltsgrense (bred stiplet): Skifte felt der vegen divergerer eller konvergerer. Kantlinje (hvit hel linje ved vegskulder): Ikke kjør over uten grunn. Vegskulder er ikke et kjørefelt.',
      },
      {
        heading: 'Stopplinje og vikepliktlinje',
        icon: '⏸️',
        text: 'Bred hvit hel linje = STOPPLINJE: Stopp fullstendig ved rødt lys eller STOPP-skilt. HER er din fremre bremseposisjon. Tynn stiplet linje (eller dobbel stiplet) = VIKEPLIKTLINJE (haifinner): Du plikter å gi vikeplikt. Haifinnene (trekanter mot deg) betyr "gi vikeplikt her".',
      },
      {
        heading: 'Gangfelt – hvite striper',
        icon: '🚶',
        text: 'Hvite striper over vegen = gangfelt (zebrafelt). Fotgjengere som er i gangfeltet eller på vei inn i det, har ALLTID forkjørsrett. Du plikter å stoppe og vente. Gangfelt varsles ofte også av advarselsskilt (140) og blinkende gule lys.',
      },
      {
        heading: 'Sperreflate og spesialoppmerking',
        icon: '🔶',
        text: 'Gul/hvit diagonal oppmerking = Sperreflate: Du MÅ IKKE kjøre over denne. Brukes ved trafikkøyer, på farlige steder, foran tunnelåpning. Pil i kjørefelt: Viser tillatt kjøreretning i det feltet. Gult felt ved fortau: Parkeringsbegrensning eller beboerparkering.',
      },
      {
        heading: 'Farger og prioritet',
        icon: '🎨',
        text: 'Hvite linjer: Standard permanent oppmerking. Gule linjer: Midlertidig oppmerking (f.eks. ved vegarbeid) – OVERSTYRER hvit oppmerking! I anleggssoner: følg alltid de GULE linjene, ikke de hvite. Blå oppmerking: Sykkeloppmerking i byer (ikke alltid synlig, men syklister har rettighetene.',
      },
    ]
  },
  {
    id: 'guide-mørke',
    category: 'mørke',
    title: 'Kjøring i Mørke og Dårlig Sikt',
    intro: 'Kjøring i mørket krever tilpasset adferd, riktig lysbruk og økt forsiktighet – lær reglene her.',
    content: [
      {
        heading: 'Lys er lovpåbudt – hele døgnet',
        icon: '💡',
        text: 'I Norge er kjørelys (nærlys/kjørelys) påbudt hele døgnet, hele året. Kjørelys gjør deg synlig fra lang avstand og reduserer risikoen for møteulykker og påkjørsler. Minimum: kjørelys eller nærlys. Parkeringslys alene er ikke nok ved kjøring.',
      },
      {
        heading: 'Nærlys vs fjernlys – riktig bruk',
        icon: '🔦',
        text: 'Nærlys (kode): Lyser ca. 40-50m fremover. Alltid i mørke, tåke og tungt regn. Fjernlys (langt lys): Lyser 100m+. Bruk i mørke der det ikke er motkommende eller forankjørende trafikk. DIM alltid ned til nærlys i god tid! Sen dimming er farlig og uhøflig.',
        list: [
          'Møtende kjøretøy: Dim til nærlys minst 200m avstand',
          'Forankjørende: Dim til nærlys (fjernlys blender i speilet)',
          'Bytrafikk med belyst veg: Nærlys er nok',
          'Tåke/snøvær: Nærlys alltid – fjernlys gir refleks og reduserer sikt!',
        ]
      },
      {
        heading: 'Tåkelys – front og bakre',
        icon: '🌫️',
        text: 'Fremre tåkelys (gult): Kun ved tåke, snøvær, kraftig regn som reduserer sikt merkbart. Bakre rødt tåkelys: Obligatorisk når sikt er under 50m. Slå av bakre tåkelys STRAKS sikten bedres – det blender bakkeliende trafikk og skjuler din bremsing.',
      },
      {
        heading: 'Blendet av møtende – hva gjør du?',
        icon: '🌙',
        text: 'Blir du blendet: Se mot HØYRE vegkant, ikke mot de blendende lysene. Reduser farten umiddelbart. Nattblindhet varer 5-10 sekunder – vær forberedt. Å blende tilbake (skru på fjernlys mot den som blender deg) er farlig og forbudt. Vent til bilen er passert.',
      },
      {
        heading: 'Kjøring i tåke – siktregelen',
        icon: '🌁',
        text: 'Siktregelen: Kjør aldri fortere enn at du kan stoppe innenfor det du kan se. Ved 50m sikt: maks 40-50 km/t. Fartsgrensen er en maks-grense under GODE forhold. Tåke er faktisk ein av de farligste forholdene fordi noen kjører som om det er bra sikt.',
      },
      {
        heading: 'Vinterkjøring – spesielle farer',
        icon: '❄️',
        text: 'Frys-is (sort is): Dannes ved 0°C, usynlig og ekstremt glatt. Spesielt farlig på bruer, i skygge og tidlig morgen. Symptom: Bilen "flyter" og styringen er lett. Reaksjon: Hold rattet fast, IKKE brems hardt, la bilen roe seg ned naturlig. Øk alltid følgeavstanden kraftig om vinteren.',
      },
    ]
  },
  {
    id: 'guide-miljo',
    category: 'miljo',
    title: 'Miljø, Sikkerhet og Kjøreatferd',
    intro: 'Miljøvennlig og sikker kjøring handler om mer enn regler – det handler om ansvar og god kjøreatferd.',
    content: [
      {
        heading: 'Sikkerhetsbelte – alltid, alle',
        icon: '🔒',
        text: 'Sikkerhetsbelte er OBLIGATORISK for alle i kjøretøyet – sjåfør og alle passasjerer. Det er SJÅFØREN sitt ansvar at alle passasjerer under 15 år har sikkerhetsbelte på. For voksne over 15 år er det den enkeltes eget ansvar. Barnesete er påbudt for barn under 135 cm.',
        list: [
          'Barn under 135 cm: godkjent barnesete',
          'Barn under 4 år: bakovervendt barnesete anbefales',
          'Luftpute (airbag) og bakovervendt sete: slå av airbagen',
          'Bot for manglende beltebruk: sjåfør kan bli bøtelagt for barn',
        ]
      },
      {
        heading: 'Mobiltelefon og distraksjon',
        icon: '📱',
        text: 'Bruk av håndholdt mobiltelefon under kjøring er forbudt. Håndfri er tillatt men anbefales brukt med forsiktighet. Distraksjon er en av de viktigste ulykkesårsakene. "Se på mobil i 2 sekunder ved 90 km/t" = kjøre 50 meter blindt. Sett telefonen på flymodus eller legg den i hanskerommet.',
      },
      {
        heading: 'Trøtthet – like farlig som promille',
        icon: '😴',
        text: 'Å kjøre trøtt er like farlig som å kjøre med promille! Tegn på farlig trøtthet: Gjesper mye, øyene er tunge, husker ikke de siste kilometrene, kjører ut av filen. Løsning: Stopp og hvil! En 20-minutters lur gjenoppretter årvåkenheten. Åpne vindu og høy musikk hjelper lite. Koffein virker ca. 20-30 min.',
      },
      {
        heading: 'Miljøvennlig kjøring (eco-driving)',
        icon: '🌱',
        text: 'Miljøvennlig kjøring reduserer drivstofforbruk og utslipp:',
        list: [
          'Akselerér jevnt og rolig – unngå hard gass',
          'Bruk motorbremsen (slipp gassen) fremfor å bruke bremsene',
          'Kjør i riktig gir – høyt gir ved lav fart reduserer turtall',
          'Forutse trafikkbildet – unngå unødvendige bremser og akselerasjoner',
          'Hold jevn, lav fart – 80 km/t bruker 40% mindre drivstoff enn 120 km/t',
          'Slå av motor ved stopp over 60 sekunder (idles sug mer enn å starte)',
        ]
      },
      {
        heading: 'Tykkdekk og sesongdekk',
        icon: '🔄',
        text: 'Norge krever vinterdekk fra 1. november til 15. april (eller når vinterkjøreforhold foreligger). Piggdekk: Tillatt 1. november – 1. april i Sør-Norge. Forbud mot piggdekk i deler av Oslo by (sjekk lokale regler). Mønsterdybde: Minimum 1,6 mm (sommer), 3 mm anbefalt (vinter). Kontroller dekktrykket jevnlig.',
      },
      {
        heading: 'Varseltrekant og nødstans',
        icon: '⚠️',
        text: 'Varseltrekant skal alltid medbringes i bilen. Sett ut varseltrekanten: Minst 50 meter bak kjøretøyet på vanlig veg. Minst 150 meter på motorveg. Ta alltid på refleksvest FØR du forlater bilen på motorveg eller i tunnel. Varselblink skal alltid brukes ved nødstopp.',
      },
    ]
  },
  {
    id: 'guide-kjoretoy',
    category: 'kjoretoy',
    title: 'Kjøretøyets Utstyr og Tekniske Krav',
    intro: 'Kjøretøyet ditt skal alltid være i teknisk forsvarlig stand. Lær minimumskravene og EU-kontroll.',
    content: [
      {
        heading: 'EU-kontroll (Periodisk kjøretøykontroll)',
        icon: '🔧',
        text: 'EU-kontroll er obligatorisk for alle kjøretøy:',
        table: [
          ['Kjøretøytype', 'Første kontroll', 'Deretter'],
          ['Personbil (klasse B)', '4 år etter reg.', 'Hvert 2. år'],
          ['Drosje/bil til leie', '1 år etter reg.', 'Hvert år'],
          ['Kjøretøy 3500+ kg', '1 år etter reg.', 'Hvert år'],
          ['Motorsykkel', '4 år etter reg.', 'Hvert 2. år'],
        ]
      },
      {
        heading: 'Minimumsutstyr i kjøretøyet',
        icon: '🛠️',
        text: 'Disse tingene skal ALLTID være i bilen:',
        list: [
          'Varseltrekant (obligatorisk)',
          'Refleksvest (sterkt anbefalt, påbudt i mange situasjoner)',
          'Brannslukker (ikke lovpåbudt for personbil, men anbefalt)',
          'Førstehjelpsveske (ikke lovpåbudt, men anbefalt)',
          'Reservehjul eller reparasjonssett (ikke lovpåbudt)',
          'Is- og snøutstyr om vinteren (skrape, kost)',
        ]
      },
      {
        heading: 'Lys og sikterhet – krav',
        icon: '💡',
        text: 'Bilen MÅ ha fungerende: Nærlys foran (2 stk), lyktelys bak (2 stk), retningslys foran og bak (4 stk), stoppelys bak (2 stk), bakre nummerskiltlys (1-2 stk), refleks bak (2 stk). Defekt lys = ulovlig kjøring og kan gi gebyr.',
      },
      {
        heading: 'Bremser – minimumsstandard',
        icon: '🔴',
        text: 'Bremser sjekkes ved EU-kontroll. Bremseeffekt forfortjules på alle fire hjul (overskjæring = DUMPET). Håndbrekk MÅ holde bilen på stigning. Bremsevæskenivå: sjekk jevnlig i reservoaret under panseret. Ulyd fra bremser (piping, gnissing) = rask ettersyn.',
      },
      {
        heading: 'Dekk – krav og kontroll',
        icon: '⚙️',
        text: 'Minimum mønsterdybde: 1,6 mm (sommer). Anbefalt vinter: 3-4 mm. Dekk med synlige tråder/skader: Ikke lovlig å bruke. Kontroller dekktrykket månedlig (lavt trykk = dårligere styring og økt forbruk). Alle fire dekk skal ha samme type (sommer eller vinter – ikke bland!). Se på sidewall-dato: eldre enn 8 år = bytt uansett mønsterdybde.',
      },
      {
        heading: 'Last og last-sikring',
        icon: '📦',
        text: 'All last i og på bilen MÅ sikres så den ikke beveger seg ved bremsing eller sving. Tillatt totalvekt (tillatt vogntogvekt) må ikke overskrides (sjekk vognkort). Taklast: se bilens manual for maks vekt. Last som stikker ut bak mer enn 1 meter: Rødt flagg eller refleks. Last som stikker ut til siden: Lovlig hvis innenfor 0,3 m på hver side av breddemålet.',
      },
    ]
  },
];

// Base URL for official Norwegian traffic sign images (Lovdata / Skiltforskriften)
const SIGN_BASE = 'https://lovdata.no/static/SF/sf-20051007-1219-';

// SIGNS — img points to official lovdata.no sign images
const SIGNS = [
  // ---- ADVARSELSSKILT (warning – red triangle) ----
  { id: 's1',  category: 'advarsel', name: 'Vegkryss',              number: '102', img: SIGN_BASE+'102-1-01.gif',  description: 'Varsler om vegkryss foran. Øk aktsomheten og reduser farten. Høyreregelen kan gjelde.' },
  { id: 's2',  category: 'advarsel', name: 'Farlig sving',          number: '100', img: SIGN_BASE+'100-1-01.gif',  description: 'Skarp sving i vegen. Reduser farten markant. Kurven kan være skarpere enn den ser ut.' },
  { id: 's3',  category: 'advarsel', name: 'Vegsmalning',           number: '108', img: SIGN_BASE+'108-01.gif',    description: 'Vegen smalner inn. Vær forberedt på trang passasje og møtende trafikk.' },
  { id: 's4',  category: 'advarsel', name: 'Glatt veg',             number: '144', img: SIGN_BASE+'144-01.gif',    description: 'Vegen kan være glatt. Reduser fart kraftig, øk følgeavstand. Spesielt farlig i kurver.' },
  { id: 's5',  category: 'advarsel', name: 'Barn',                  number: '142', img: SIGN_BASE+'142-01.gif',    description: 'Barn kan oppholde seg nær vegen. Nær skoler og lekeplasser. Kjør sakte, vær klar til å stoppe.' },
  { id: 's6',  category: 'advarsel', name: 'Gangfelt',              number: '140', img: SIGN_BASE+'140-01.gif',    description: 'Gangfelt foran. Vær forberedt på fotgjengere. Fotgjengere i gangfelt har alltid forkjørsrett.' },
  { id: 's7',  category: 'advarsel', name: 'Elg/dyr',               number: '156', img: SIGN_BASE+'156-01.gif',    description: 'Fare for dyr på vegen. Spesielt aktivt i skumring/gry og natt. Reduser farten kraftig.' },
  { id: 's8',  category: 'advarsel', name: 'Jernbanekryss (u/bom)', number: '132', img: SIGN_BASE+'132-01.gif',    description: 'Jernbanekryss uten bom. ALLTID stopp, se og lytt i begge retninger. Toget har alltid forkjørsrett.' },
  { id: 's22', category: 'advarsel', name: 'Vegarbeid',             number: '110', img: SIGN_BASE+'110-01.gif',    description: 'Vegarbeid pågår. Reduser fart, følg midlertidige skilt og oppmerking. Vær ekstra oppmerksom.' },
  { id: 's23', category: 'advarsel', name: 'Ujevn veg',             number: '112', img: SIGN_BASE+'112-01.gif',    description: 'Vegen er ujevn eller har humper. Reduser farten for å unngå skader på kjøretøyet og miste kontrollen.' },
  { id: 's24', category: 'advarsel', name: 'Svingete veg',          number: '104', img: SIGN_BASE+'104-1-01.gif',  description: 'Svingete veg med flere kurver. Reduser farten og hold deg på din side av midtlinjen.' },
  { id: 's25', category: 'advarsel', name: 'Syklende',              number: '148', img: SIGN_BASE+'148-01.gif',    description: 'Syklister krysser eller ferdes langs vegen. Vær oppmerksom og gi god siderom ved forbikjøring.' },

  // ---- FORBUDSSKILT (prohibition – red circle) ----
  { id: 's9',  category: 'forbud',   name: 'Innkjøring forbudt',    number: '302', img: SIGN_BASE+'302-01.gif',    description: 'All innkjøring forbudt fra denne siden. Brukes i enveiskjørte gater og stengte veier.' },
  { id: 's10', category: 'forbud',   name: 'Fartsgrense',           number: '362', img: SIGN_BASE+'362-01.gif',    description: 'Fartsgrense i km/t. Du kan IKKE kjøre raskere enn det angitte tall fra skiltet til neste endring.' },
  { id: 's11', category: 'forbud',   name: 'Forbikjøring forbudt',  number: '308', img: SIGN_BASE+'308-01.gif',    description: 'Forbikjøring forbudt. Gjelder til neste kryss eller opphevingsskilt. Svært alvorlig brudd.' },
  { id: 's12', category: 'forbud',   name: 'Parkering forbudt',     number: '372', img: SIGN_BASE+'372-01.gif',    description: 'Parkering forbudt på den siden av vegen der skiltet er satt opp.' },
  { id: 's13', category: 'forbud',   name: 'Stans forbudt',         number: '376', img: SIGN_BASE+'376-1-01.gif',  description: 'Absolutt stans og parkering forbudt. Ikke stopp her under NOEN omstendigheter.' },
  { id: 's26', category: 'forbud',   name: 'Motorsykkel forbudt',   number: '318', img: SIGN_BASE+'318-1-01.gif',  description: 'Motorsykler og mopeder er forbudt å kjøre her. Gjelder kun motorsykkelkjøretøy.' },
  { id: 's27', category: 'forbud',   name: 'Tunge kjøretøy forbudt',number: '322', img: SIGN_BASE+'322-01.gif',    description: 'Kjøretøy over angitt vekt er forbudt. Sjekk underskilt for nøyaktig vektgrense.' },
  { id: 's28', category: 'forbud',   name: 'All ferdsel forbudt',   number: '306', img: SIGN_BASE+'306-0-01.gif',  description: 'All ferdsel med motorvogn forbudt fra dette punkt. Gjelder alle kjøretøy.' },

  // ---- PÅBUDSSKILT (mandatory – blue circle) ----
  { id: 's14', category: 'påbud',    name: 'Rett frem',             number: '402', img: SIGN_BASE+'402-1-01.gif',  description: 'Du MÅ kjøre rett frem. Kan ikke svinge til siden ved dette skiltet.' },
  { id: 's15', category: 'påbud',    name: 'Sving til høyre',       number: '402', img: SIGN_BASE+'402-2-01.gif',  description: 'Du MÅ svinge til høyre. Påbudsskilt – ingen valgfrihet.' },
  { id: 's16', category: 'påbud',    name: 'Rundkjøring',           number: '408', img: SIGN_BASE+'408-01.gif',    description: 'Rundkjøring. Hold til venstre for midtøya. Vikeplikt for trafikk inne i rundkjøringen.' },
  { id: 's17', category: 'påbud',    name: 'Gang- og sykkelveg',    number: '522', img: SIGN_BASE+'522-01.gif',    description: 'Gang- og sykkelveg. Motorvogn er forbudt. Kun for gående og syklende.' },
  { id: 's29', category: 'påbud',    name: 'Gangveg',               number: '524', img: SIGN_BASE+'524-01.gif',    description: 'Kun for gående. Syklister og motorvogn er forbudt.' },
  { id: 's30', category: 'påbud',    name: 'Sykkelveg',             number: '528', img: SIGN_BASE+'528-01.gif',    description: 'Kun for syklister. Gående og motorvogn er ikke tillatt.' },

  // ---- PRIORITET / VIKEPLIKT ----
  { id: 's18', category: 'prioritet',name: 'Vikeplikt',             number: '202', img: SIGN_BASE+'202-01.gif',    description: 'Du har vikeplikt for all trafikk på kryssende/møtende veg. Vike, men trenger ikke stoppe om klart.' },
  { id: 's19', category: 'prioritet',name: 'STOPP',                 number: '206', img: SIGN_BASE+'206-01.gif',    description: 'Du MÅ stoppe fullstendig ved stopplinja. Gi vikeplikt for ALL trafikk – selv om vegen er tom.' },
  { id: 's20', category: 'prioritet',name: 'Forkjørsveg',           number: '204', img: SIGN_BASE+'204-01.gif',    description: 'Forkjørsveg. Du har forkjørsrett over kryssende trafikk med vikepliktskilt.' },
  { id: 's21', category: 'prioritet',name: 'Slutt forkjørsveg',     number: '208', img: SIGN_BASE+'208-01.gif',    description: 'Forkjørsvegen slutter. Vanlige vikepliktregler gjelder igjen. Høyreregelen kan gjelde.' },
  { id: 's31', category: 'prioritet',name: 'Forkjørsrett møtende',  number: '212', img: SIGN_BASE+'212-01.gif',    description: 'Motkommende trafikk har forkjørsrett forbi innsnevring. Du må vente til det er klart.' },
  { id: 's32', category: 'prioritet',name: 'Motorveg',              number: '502', img: SIGN_BASE+'502-01.gif',    description: 'Motorveg starter. Særregler gjelder: minstehastighet, forbikjøring kun til venstre, ingen stopp.' },
  { id: 's33', category: 'prioritet',name: 'Slutt motorveg',        number: '503', img: SIGN_BASE+'503-01.gif',    description: 'Motorvegen slutter. Vanlige trafikkregler gjelder igjen.' },
];

window.CATEGORIES = CATEGORIES;
window.QUESTIONS = QUESTIONS;
window.GUIDES = GUIDES;
window.SIGNS = SIGNS;
window.LEVELS = LEVELS;
window.BADGES = BADGES;
