# Web Projekti 2019 syksy - Sosiaalinen media urheilullisille ihmisille V.1.0

**Sisällys**
1. Johdanto
2. Määritelmät
3. Käyttöohje ja komennot
4. Rest api rajapinta
5. JSON-objektien skeemat
6. Kuvankaappaukset (projektista)
7. Jatkokehitysideat
8. UML

____________

**1. Johdanto**

Tavoitteena on luoda yksityinen keskustelualusta yritysten / organisaatioiden / ryhmien
sisäiseen yksityiseen kommunikaatioon. Projektin lopputuotos on luotettava
viestintäjärjestelmä, jota voidaan myydä eri tahoille itsenäisenä kokonaisuutena.
__________________

**2. Määritelmät**

____________________

**3. Käyttöohje ja komennot**\

* Frontend komennot:
  - `npm start`: Käynnistää projektin http://localhost:3000/ .
  - `npm run build`: Luo kansion build, johon on koottu frontend projektista tuotantoversio.
  - `npm run server`: Käynnistää frontendin testiserverin osoitteeseen http://localhost:3001/ . Serverin sisältö on projektin juuressa `./db.json` tiedostossa.
  - `npm run cypress:open`: E2E-testit
  - `npm run test`: Ajaa frontendin testit
  - `npm run eject`: Tuhoaa projektin. Älä missään nimessä käytä tätä komentoa. Tämä ei ole sarkasmia!
* Backend komennot:

__**4. Rest api rajapinta**__\
Taulukon osoitteet esitetään muodossa */api/posts/:id*. Esimerkiksi osoite http://localhost:8080/api/posts/5dea9ce77f2ea513d8c02d48 vastaa kuvausta.
- *Base url*: http://localhost:8080 (ei kirjoiteta taulukkoon).
- Staattinen osa URL:lää: */api/posts* (kirjoitetaan aina samalla tavalla, eivät muutu).
- Dynaaminen osa URL:lää: */:id* (voi olla mikä tahansa kirjainmerkki yhdistelmä). URL esimerkissä 
```id = 5dea9ce77f2ea513d8c02d48.```\

**Käyttäjä (user)**\
*base URL*: -

|Metodi |URL |Kuvaus |
|-------|-------|-------|
|GET|/api/users|Hakee kaikki käyttäjät tietokannasta|

**Ryhmä (group)**\
*base URL*: -

|Metodi |URL |Kuvaus |
|-------|-------|-------|
|GET| ... | ... |

**Autentikaatio (login)**\
*base URL*: -

|Metodi |URL |Kuvaus |
|-------|-------|-------|
|POST|/api/login|Lähetettää sisäänkirjautumisen tiedot. Validoi tiedot. palauttaa vastauksena joko sisäänkirjautuneen henkilön tiedot, tai virheilmoituksen.|

**Viesti (message)**\
*base URL*: -

|Metodi |URL |Kuvaus |
|-------|-------|-------|
|GET|/|Renderöi etusivun.|

[Esimerkkejä pyyntöjen rungoista](https://gitlab.com/)
____________

__**5. Data access objektien skeemat**__
* Keskustelu (Chat)\
![Chat DAO](https://cdn.discordapp.com/attachments/666191461267537923/682294543248654364/unknown.png)\
*Tilapäivityksen data access object (kuva 1).*
* Ryhmä (Group)
![Group DAO](https://cdn.discordapp.com/attachments/666191461267537923/682294543248654364/unknown.png)\
*Käyttäjän skeema data access object (kuva 2).*
* Viesti (Message)
![Message DAO](https://cdn.discordapp.com/attachments/666191461267537923/682294543248654364/unknown.png)\
*Käyttäjän skeema data access object (kuva 3).*
_______
**6. Kuvankaappaukset (projektista)**\
Kuvankaappauksia projektista
![Etusivu](https://cdn.discordapp.com/attachments/666191461267537923/684763784229027856/gui-kaiku.PNG)
*Etusivu (kuva 4).*
![Kirjautumissivu](https://cdn.discordapp.com/attachments/666191461267537923/685108197014765598/login.PNG)
*Kirjautumissivu (kuva 5).*
![Kojelauta](https://cdn.discordapp.com/attachments/666191461267537923/685108183991058442/kojelauta.PNG)
*Kojelauta etusivu (kuva 6).*
_____
**7. Jatkokehitysideat**
- Profiilikuva; profiileihin voi lisätä ja muokata omaa kuvaa.
- Salasana pystytään palauttamaan sähköpostitse 'unohditko salasanasi' linkistä.
- Mobiiliapplikaatio käyttöliittymästä
- Viesti ilmoitukset (windows-ilmoitukset)
_____
**8. Liitteet**\
- UML: [UML](https://gitlab.com/)
