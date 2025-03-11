# Skärmläsarexempel för A11y News

Detta dokument beskriver den förväntade användarupplevelsen för personer som
använder skärmläsare på webbplatsen A11y News. Dokumentet kan användas som en
referens för tillgänglighetstestning.

## Navigationsordning

En skärmläsare bör läsa upp elementen i följande ordning:

1. "Hoppa till innehåll" länk (aktiveras när användare trycker på Tab-tangenten)
2. "A11y News" (sidans huvudrubrik)
3. Navigationsmeny med länkar: "Hem", "Världen", "Sport", "Underhållning"
4. Sökformulär: "Sök på webbplatsen", textfält, sökknapp
5. "Välkommen till A11y News" (hero-rubrik)
6. "Tillgängliga nyheter för alla" (hero-text)
7. "Dagens rubriker" (huvudrubrik för innehållssektionen)
8. Artikelkort 1 med rubrik, text och länk
9. Artikelkort 2 med rubrik, bilder, knapp för "Visa mer"
10. Artikelkort 3 med rubrik och video
11. Nyhetsbrevssigneringsformulär
12. Footer med länkar och sociala ikoner

## Interaktiva element

Följande interaktiva element har särskilda tillgänglighetsegenskaper:

### Navigationsmeny

- Har roll="navigation" och aria-label="Huvudnavigation"
- Kan aktiveras med Tab och Enter

### Sökformulär

- Har roll="search" och kopplade etiketter
- Söktexten har aria-required="true"

### Bilder

- Alla har beskrivande alt-text
- De interaktiva bilderna har tabindex="0", rol="button" och kan aktiveras med
  Enter

### "Visa mer"-knapp

- Har aria-expanded som uppdateras när innehållet visas/döljs
- När den aktiveras meddelar den skärmläsaren att innehåll visas eller döljs

### Video

- Video har undertexter via track-element
- Kontroller är tillgängliga via tangentbordet

### "Tillbaka till toppen"-knapp

- Blir synlig när användaren scrollat ned
- Har aria-label="Tillbaka till toppen"

## Testscenario

1. Navigera till sidan med en skärmläsare (t.ex. VoiceOver, NVDA, JAWS)
2. Tryck på Tab för att aktivera "Hoppa till innehåll"
3. Tryck Enter för att hoppa förbi navigationen
4. Navigera till en artikel
5. Interagera med "Visa mer"-knappen
6. Klicka på en bild för att visa mer information
7. Skicka in nyhetsbrevssignering (med och utan felmedelanden)
8. Testa tillbaka till toppen-funktionen

## Förväntade meddelanden från skärmläsaren

- När "Visa mer"-knappen aktiveras: "Mer innehåll visas" eller "Innehåll dolt"
- När formuläret skickas: "Formuläret har skickats"
- När ett felmeddelande visas: "Detta fält är obligatoriskt"
- När erbjudandet stängs: "Meddelandet har stängts"
