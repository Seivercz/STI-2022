# Dokument Specifikace Požadavků - Rozšíření
## Bot-responder

- Verze 1.0
- Připravil Pavel Vican
- FM TUL
- 14.05.2022

Obsah
=================
* 1 [Úvod](#1-úvod)
  * 1.1 [Účel Dokumentu](#11-účel-dokumentu)
  * 1.2 [Rozsah Programu](#12-rozsah-programu)
  * 1.3 [Glosář](#13-glosář)
  * 1.4 [Zdroje](#14-zdroje)
  * 1.5 [Přehled Dokumentu](#15-přehled-dokumentu)
* 2 [Celkový popis](#2-celkový-popis)
  * 2.1 [Prostředí Programu](#21-prostředí-programu)
  * 2.2 [Funkční Požadavky](#22-funkční-požadavky)
  * 2.3 [Charakteristiky Uživatelů](#23-charakteristiky-uživatelů)
  * 2.4 [Doplňkové Požadavky](#24-doplňkové-požadavky)
* 3 [Specifikace Požadavků](#3-specifikace-požadavků)
  * 3.1 [Externí Rozhraní](#31-externí-rozhraní)
    * 3.1.1 [Uživatelské Rozhraní](#311-uživatelské-rozhraní)
    * 3.1.2 [Softwarové Rozhraní](#312-softwarové-rozhraní)
    * 3.1.3 [Hardwarové Požadavky](#313-hardwarové-požadavky)
  * 3.2 [Funkční Požadavky](#32-funkční-požadavky)
  * 3.3 [Detailní Doplňkové Požadavky](#33-detailní-doplňkové-požadavky)
    * 3.3.1 [Bezpečnost](#331-bezpečnost)
    * 3.3.2 [Spolehlivost](#332-spolehlivost)
    * 3.3.3 [Dostupnost](#333-dostupnost)
    * 3.3.4 [Časová náročnost](#334-časová-náročnost)

## 1. Úvod
### 1.1 Účel Dokumentu
Účelem tohoto dokumentu je popsat rozšíření hotového softwaru o přídavnou funkci doporučení nákupu EUR dle určitých kritérií stanovených zákazníkem

### 1.2 Rozsah Programu
Program ude navržen tak, aby požadované informace byly přehledně zobrazeny. Bude zobrazovat na klientské části formu komunikace se serverovou částí a také zobrazovat její odpověď ve formátu HTML. 
Serverová část zpracovává požadavky části klientské s následujícími dodatečnými informacemi: Doporučení koupě kurzu EUR pokud kurz po dobu tří dnů klesá nebo nestoupá o více než 10% z průměru za poslední 3 dny.
Nákup se nedoporučí v opačném případě.

### 1.5 Přehled Dokumentu
Následující kapitola, Celkový popis, tohoto dokumentu poskytuje přidaný přehled dodatečné funkcionality programu. Popisuje obecné požadavky a slouží k vytvoření kontextu pro specifikaci technických požadavků v další kapitole. Třetí kapitola, Specifikace požadavků, slouží hlavně vývojářům a v technických pojmech popisuje detaily funkcionality programu. Obě části dokumentu popisují stejný program, ale jsou určeny pro jiné publikum a používají proto jiný jazyk.

## 2. Celkový popis
### 2.1 Prostředí Programu

Program má stále jendoho aktéra, který přistupuje do systému. Uživatel má možnost pomocí tlačítka poslat zprávu vzdálenému systému a obdržet od něj odpověď se zadanými parametry. Parametry jsou určeny v dotazu a server na ně odpoví buď konkrétní odpovědí nebo odešle chybovou hlášku.
Tato část se stále nemění s rozdílem přidání další možnosti výběru

### 2.2 Funkční Požadavky
Tato sekce blíže popisuje jednotlivé případy použití programu. 

#### 2.2.1 Případ použití: **Zobrazení dat**
##### Diagram:
![Diagram Zobrazení dat](https://i.imgur.com/HnYPYFX.png "Diagram Zobrazení dat")
##### Krátký popis:
Uživatel si zvolí která data chce zobrazit a upraví parametry zobrazení při poslání dotazu. U konkrétního obrázku chce uživatel všechny 3 údaje.
##### Popis kroků:
- Uživatel si volí která data chce zobrazit.
- Uživatel pak klikne na tlačítko Odeslat
- Program pošle data uživateli.
- Program zobrazí data dle výsledků (při nedostupnosti se data nezobrazí)
##### Reference:

### 2.3 Charakteristiky Uživatelů
Od uživatele se očekává základní znalost použití programů v Microsoft Windows.

### 2.4 Doplňkové Požadavky
uživatelská část programu poběží na hostingovém serveru Heroku. uživatel nemusí mít nic dodatečného nainstalované
Serverová část programu poběží na jiném hostiteli (ten bude potřebovat mít nainstalován Python 3+ (verzi Python 3.8.2 například) a k němu Flask 2.1.1.

## 3. Specifikace Požadavků
### 3.1 Externí Rozhraní
Tato sekce popisuje všechny vstupně výstupní požadavky a řešení programu.

#### 3.1.1 Uživatelské Rozhraní
Uživatelské rozhraní bude vytvořeno pomocí frameworku React.js (Javascript) pro zařízení webového GUI. Program bude mít tick-boxy pro jednotlivé požadavky které se pošlou kliknutím na tlačítko.

![Uživatelské rozhraní 1](https://i.imgur.com/RqCLNgi.png  "Uživatelské rozhraní")

#### 3.1.2 Softwarové Rozhraní
Back end bude z uživatelské strany dostávat dotaz s parametry určenými uživatelem a server se na ně pokusí odpovědět, pokud z nějakého důvodu nebude moct odpovědět na všechny parametry v dotazu (například nebude moct získat kurz CZK-EUR) tak místo dané hodnoty pošle NULL hodnotu (či jinou hodnotu reprezentující dostání "ničeho") a GUI uživatele to zpracuje jako nedostupnou informaci.

Zdroje dat:
* ##### **[Zdarma API pro získávání Forex kurzů](https://free.currencyconverterapi.com/)**
  ###### Formát dat: JSON
  ![Schéma dat](https://i.imgur.com/RkHBNUI.png "Schéma dat")
  ###### Krátký popis: Jednoduché *neplacené* API pro získání kurzu požadovaných měn. API má limit 100 požadavků za hodinu, 250/měsíc jenž je více než dostatečné pro zákazníka potřebu.

Použité nástroje a software:
* ##### **Microsoft Windows**
  ###### Verze: 19H2 (18363) - 20H2 (19042)
  ###### Zvolený operační systém nutný pro běh programu.

* ##### **Python **
  ###### Verze: 3.8.2
  ###### Zvolený jazyk pro back end. Pravděpodobně může být jakákoliv verze 3.+

* ##### **[Flask](https://pypi.org/project/Flask/)**
  ###### Verze: 2.1.1
  ###### Flask je framework pro webové aplikace založený na Python jazyce. Slouží jako back-end.

* ##### **[React](https://reactjs.org/)**
  ###### Verze: 5.0.5
  ###### Javascript knihovna. React je využíván pro tvorbu uživatelských rozhraní, tedy front end pro uživatele. Závislá na Node.js 14+ verzi

* ##### **[Node.js](https://nodejs.org/en/)**
  ###### Verze: 16.2.2
  ###### Softwarový systém pro vývoj internetových aplikaci. V našem případě je potřeba pro React vývoj kvůli závislostem.

#### 3.1.3 Hardwarové Požadavky
Počítač by měl být splňovat alespoň **[základní požadavky pro běh systému Windows 10](https://support.microsoft.com/cs-cz/windows/po%C5%BEadavky-na-syst%C3%A9m-windows-10-6d4e9a79-66bf-7950-467c-795cf0386715)** a být připojen k internetu.

### 3.2 Funkční Požadavky
| Případ použití  | Zobrazení dat |
| --- | --- | 
| Událost | Uživatel zvolí, která data chce zobrazit | 
| Základní postup | 1. Uživatel zaškrtne data, která chce zobrazit. 2. Klikne na tlačítko a počká na výsledek od serveru. 3. Data se zobrazí jako odpověď serveru | 

#### 3.3.1 Bezpečnost
Uživatel má přístup pouze k zobrazování dat, není tedy možný z jeho strany útok na integritu dat.

#### 3.3.2 Spolehlivost
Aplikace musí běžet bez vnějšího podnětu.

#### 3.3.3 Dostupnost
Aplikace je dostupná celý čas spuštění. Pokud nebude přístup k internetu, tak nemá šanci získat z vnějšku požadované informace. Bude tedy hlásit nedostupnost k serveru uživateli.

#### 3.3.4 Časová náročnost
Odhad tvorby dodatečného požadavku bude přibližně 8 hodin
