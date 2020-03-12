# Kaiku app - Yrityksille suunnattu chat-applikaatio V.1.0

**Sisällys**
1. Johdanto
2. Määritelmät
3. Käyttöohje ja komennot
4. Kuvankaappaukset (projektista)
5. Jatkokehitysideat
6. Liitteet

____________

**1. Johdanto**

Tavoitteena on luoda yksityinen keskustelualusta yritysten / organisaatioiden / ryhmien
sisäiseen yksityiseen kommunikaatioon. Projektin lopputuotos on ~~luotettava~~
viestintäjärjestelmä, jota voidaan myydä eri tahoille itsenäisenä kokonaisuutena.
__________________

**2. Määritelmät**

- Kanta URL-osoite: http://localhost:3000/
- Stack: Node, React, Socket io, Java Spring, Mongo

____________________

**3. Käyttöohje ja komennot**

* Frontend komennot:
  - `npm start`: Käynnistää projektin http://localhost:3000/ .
  - `npm run build`: Luo kansion build, johon on koottu frontend projektista tuotantoversio.
  - `npm run server`: Käynnistää frontendin testiserverin osoitteeseen http://localhost:3001/ . Serverin sisältö on projektin juuressa `./db.json` tiedostossa.
  - `npm run cypress:open`: Avaa E2E-testiympäristön.
  - `npm run test`: Ajaa frontendin testit
  - `npm run eject`: Tuhoaa projektin. Älä missään nimessä käytä tätä komentoa.
* Backend komennot:
  - `mwnv spring-boot:run`: Aja komento serverin root hakemistossa, configuroi springin ja käynnistää serverin

Serverin käynnistyessä täytyy käynnistäjän antaa lähtöparametrit terminaalin kautta:
  -  configuraatiotyyppi: autentikaatio middlewaren kanssa tai ilman
  -  mongodb uri: joko tyhjä (pre-configured), tai uri reitti vaikkapa mongodb atlakseen 
_______________

**4. Kuvankaappaukset (projektista)**\
Kuvankaappauksia projektista
![Etusivu](https://cdn.discordapp.com/attachments/666191461267537923/684763784229027856/gui-kaiku.PNG)
*Etusivu (kuva 1).*
![Kirjautumissivu](https://cdn.discordapp.com/attachments/666191461267537923/685108197014765598/login.PNG)
*Kirjautumissivu (kuva 2).*
![Kojelauta](https://cdn.discordapp.com/attachments/666191461267537923/685108183991058442/kojelauta.PNG)
*Kojelauta etusivu (kuva 3).*
_____
**5. Jatkokehitysideat**
- Profiilikuva; profiileihin voi lisätä ja muokata omaa kuvaa.
- Salasana pystytään palauttamaan sähköpostitse 'unohditko salasanasi' linkistä.
- Mobiiliapplikaatio käyttöliittymästä
- Viesti ilmoitukset (Windows-ilmoitukset)
_____
**6. Liitteet**
- UML: [UML](https://gitlab.com/)
- Testit [Testit](https://users.metropolia.fi/~jessear/OTP1/jacoco/index.html)
- Väliraportti: [Väliraportti](https://gitlab.com/)
- Javadoc: [Javadoc](https://users.metropolia.fi/~jessear/OTP1/javadocs/index.html)
- Production build: [kaiku-app](http://10.114.32.19:5000/)

