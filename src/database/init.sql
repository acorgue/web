/**********************************************************************************************************************
 * DOMINIS (tipus amb comprovacions)
 **********************************************************************************************************************/

-- un o dos números, un o dos números i una fracció o una fracció
CREATE DOMAIN peu AS text CONSTRAINT format CHECK (value ~ '^([0-9]{1,2})|([0-9]{1,2} [0-9]\/[0-9])|([0-9]\/[0-9])$');

-- PostgreSQL syntax: per inserir una cometa dins de cometes, s'usa doble cometa
CREATE DOMAIN nota AS text CONSTRAINT format CHECK (value ~ '^[a-hA-H]{1}s?['']{0,4}$' );

/**********************************************************************************************************************
 * TIPUS
 **********************************************************************************************************************/

CREATE TYPE tessitura AS (
    des_de nota,
    fins_a nota
);

CREATE TYPE alçada AS (
    nota nota,
    peus peu[]
);

CREATE TYPE transmissió_de_notes AS ENUM (
    'mecànica', 'elèctrica', 'pneumàtica', 'màquina barker'
);

CREATE TYPE transmissió_de_registres AS ENUM (
    'mecànica', 'elèctrica', 'pneumàtica'
);

CREATE TYPE tipus_extensió AS ENUM (
    'sencer', 'baixos', 'tiples', 'baixos_i_tiples'
);

CREATE TYPE actuador AS ENUM (
    'tirador', 'plaqueta', 'lliscant', 'permanent'
);

CREATE TYPE família_joc AS ENUM (
    'fons', 'mixtura', 'llengüeta', 'altres'
);

/* Una nota a l'hora d'ordenar registres automàticament
 * 0. Ordre d'alt nivell: fons, mixtura, llengüeta i altres, sempre de més greu a més agut. Se suposa que les mixtures
 *    són jocs amb més d'una rengla des del començament del teclat i que són jocs labials (de fons). És comú, en orgues
 *    antics trobar quinzenes de dues files. Pel nom que se li dóna al registre, considero que és joc de fons i no
 *    una mixtura. Hi ha mixtures de llengüeta, sí, però es tracten com a llengüeta i prou.
 * 1. Pels jocs de fons i mixtura: principal, flauta, bordó, quintant i gamba.
 * 2. Un registre amb l'etiqueta 'harmònic' té més pes que un de la mateixa família sense l'etiqueta.
 * 3. Un registre amb l'etiqueta 'ondulant' té menys pes que un de la mateixa família sense l'etiqueta.
 * 4. Un registre amb l'etiqueta 'mutació' (que no sona do tocant un do) s'ordenen seguint el criteri 1
 * 5. Pels jocs de llengüeta, segueixen aquest ordre: ressonador real, ressonador curt i llengüeta lliure. Entre ells,
      s'apliquen els criteris 2, 3 i 4 i finalment, l'alçada (primer un clarí i després una veu humana).
 *
 * Aquesta informació és interna exclusivament i única per ordenar els registres automàticament i fàcil per a fer cerques
 * estadístiques. No es mostra a l'usuari.
 */
CREATE TYPE subfamília_joc AS ENUM (
    'bordó', 'flauta', 'principal', 'gamba',
    'quintant', 'harmònic', 'ondulant', 'mutació',
    'ressonador_real', 'ressonador_curt', 'llengüeta_lliure'
);

CREATE TYPE actuació AS ENUM (
    'nou', 'acabament', 'ampliació', 'reorganització', 'reconstrucció', 'restauració', 'reparació', 'afinació', 're-harmonització',
    'trasllat', 'transformació', 'manteniment', 'neteja', 'altres'
);

/**********************************************************************************************************************
 * ORGANITZACIÓ TERRITORIAL (eclesiàstica i política)
 **********************************************************************************************************************/

/*
 * Taules Bisbat, Arxiprestat, Municipi, Comarca i Província. Hi són perquè potser ens interessa
 * emmagatzemar altra informació rellevant per fer classificacions dins la mateixa web.
 * Per exemple:
 * - coordenades d'extensió, per centrar la província en un mapa (com les que tinc per Catalunya hard-coded)
 * - etiqueta o color de l'etiqueta per marcar els orgues
 * - població per fer estadística d'orgues per càpita (jo què sé...)
 * - qualsevol altra cosa que puguem menester en un futur
 */

CREATE TABLE Bisbats (
    id        integer PRIMARY KEY,
    nom       text,
    ascii_nom text
);

CREATE TABLE Arxiprestat (
    id        integer PRIMARY KEY,
    id_bisbat integer,
    nom       text,
    ascii_nom text,
    CONSTRAINT id_bisbat_fk FOREIGN KEY (id_bisbat) REFERENCES Bisbats (id)
);

CREATE TABLE Província (
    id        integer PRIMARY KEY,
    nom       text,
    ascii_nom text
);

CREATE TABLE Comarca (
    id        integer PRIMARY KEY,
    /*
     * Ull!
     * Hi ha comarques que pertanyen a diferents províncies, segons el municipi. Per tant, aquest camp és millor no
     * coŀlocar-lo aquí.
     * https://ca.wikipedia.org/wiki/Prov%C3%ADncies_de_Catalunya#Llista_de_comarques_de_cada_prov%C3%ADncia
     */

    nom       text,
    ascii_nom text
);

CREATE TABLE Municipi (
    id           integer PRIMARY KEY,
    id_comarca   integer,
    id_província integer,

    nom          text,
    ascii_nom    text,
    CONSTRAINT id_comarca_fk FOREIGN KEY (id_comarca) REFERENCES Comarca (id),
    CONSTRAINT id_província_fk FOREIGN KEY (id_província) REFERENCES Província (id)
);

/**********************************************************************************************************************
 * ORGUES
 **********************************************************************************************************************/

CREATE TABLE Edifici (
    id             integer PRIMARY KEY,
    /*
     * El bisbat, la comarca i la província queden especificats en l'arxiprestat i en el municipi
     * Sé del cert (sense exemples concrets) que els municipis i els arxiprestats no delimiten de
     * la mateixa manera.
     * Al cap i a la fi, estem tractant dues divisions territorials diferents, per tant, és
     * necessària la inclusió de dues referències a tals divisions.
     */
    id_arxiprestat integer,
    id_municipi    integer,

    nom            text,
    ascii_nom      text,
    adreça         text,
    latitud        float,
    longitud       float,

    CONSTRAINT id_arxiprestat_fk FOREIGN KEY (id_arxiprestat) REFERENCES Arxiprestat (id),
    CONSTRAINT id_municipi_fk FOREIGN KEY (id_municipi) REFERENCES Municipi (id)
);

-- Estem parlant de projectes d'orgue!
CREATE TABLE Orgue (
    id           integer PRIMARY KEY,
    id_edifici   integer,

    nom          text,
    ascii_nom    text,
    /* Definició de diapasó:
     * {
     *   nota: Note (string)
     *   freqüència: float (number)
     *   temperatura: float (number)
     *   id_registre: integer (number)
     * }
     * Sovint, es pren el to de l'orgue (diapasó) amb la mitjana d'alguns registres. Si és així, no cal especificar
     * el registre; o potser especificar el registre que s'acosta més a la mitjana. És bastant irrellevant i no aporta
     * res més que no siguin formalismes.
     */
    diapasó      jsonb default '{}'::jsonb, -- TODO
    temperament  text,
    /* Definició d'estat:
     * {[
     *   any: integer (number)
     *   nota: integer (number)
     *   detalls: string (string)
     * ], ...}
     * La nota segueix les especificacions mencionades en el README. Potser s'haurien de copiar aquí?
     */
    estat        jsonb default '{}'::jsonb, -- TODO
    composició   text,                      -- TODO es pot intentar treure automàticament. Si és NULL, és automàtic
    emplaçament  text,
    observacions text,

    CONSTRAINT id_edifici_fk FOREIGN KEY (id_edifici) REFERENCES Edifici (id)
);

CREATE TABLE CosSonor (
    id                       integer PRIMARY KEY,
    nom                      text,
    posició_cos_sonor        text,
    tipus_secret             text,                    -- enum? TODO buscar els principals tipus de secret
    transmissió_de_notes     transmissió_de_notes,    -- majoritàriament, per defecte. Hi poden haver excepcions
    transmissió_de_registres transmissió_de_registres -- majoritàriament, per defecte. Hi poden haver excepcions

);

CREATE TABLE Teclat (
    id       integer PRIMARY KEY,
    id_orgue integer,

    nom      text,
    número   text, -- ordre del teclat (nombres romans) començant per baix de tot
    /* Definició de Tessitura
     * Rang de notes. Dues notes separades per un guionet. Les notes, en notació Helmholtz.
     */
    extensió tessitura,
    és_pedal bool,

    CONSTRAINT id_orgue_fk FOREIGN KEY (id_orgue) REFERENCES Orgue (id)
);

/*
 * Orgues normals: 1 teclat té un cos sonor.
 * Orgues com la catedral de Barcelona (IV teclat). 1 teclat té dos cossos sonors.
 * Orgues amb teclats reversibles. 1 cos sonor té dos teclats.
 */
CREATE TABLE CosSonorEnTeclat (
    id           integer PRIMARY KEY,
    id_cos_sonor integer,
    id_teclat    integer,

    CONSTRAINT id_cos_sonor_fk FOREIGN KEY (id_cos_sonor) REFERENCES CosSonor (id),
    CONSTRAINT id_teclat_fk FOREIGN KEY (id_teclat) REFERENCES Teclat (id)
);

/* ULL! Guardem registres i mostrem registres, no pas jocs!
 * A la composició d'un orgue, comptem jocs i no pas registres!
 * Els jocs són aquells registres sense transmissions ni extensions. Es permeten préstecs.
 */
CREATE TABLE Registre (
    -- En aquesta base de dades, s'entén aquest registre com a registre que sona.
    id                       integer PRIMARY KEY,
    id_cos_sonor             integer,

    nom                      text,
    /* Una nota sobre com saber si falten dades i les dades per defecte
     * És una llista. Cada element de la llista marca un punt d'interès
     *   - 1 sol punt d'interès. Si la tessitura és NULL, s'assumeix la llargada completa del teclat
     *                           Si els peus són NULL, FALTEN DADES
     *   - Més d'un element. Si la primera tessitura és NULL, s'assumeix que comença des de l'inici del teclat
     *                       Si la _n_ tessitura és NULL, FALTEN DADES (on comença el punt d'interès?)
     *                       Si el peu _n_ és NULL, FALTEN DADES
     * Exemples:
     *   - Baixons i clarins 4' | 8': [{nota:NULL,peus:[4]},{nota:NULL,peus:[8]}]. Comença a C però no se sap on parteix
     *   - Dotzena 2 2/3' | 4' + 2 2/3': [{nota:NULL,peus:[2 2/3]},{nota:cs',peus:[4,2 2/3]}]. Comença a C, parteix a cs'
     *   - Címbala III 1/2': [{nota:NULL,peus:[1/2,1/3,1/4],{nota:c,peus:NULL},{nota:cs',peus:NULL}]. Manca la composició del ple, però se sap on talla
     *
     * Depenent de si manca o no informació, es mostrarà la disposició del ple (si és un ple) o informació addicional.
     */
    alçada                   alçada[],

    tipus_extensió           tipus_extensió,
    actuador                 actuador,

    -- Famílies en general. Glossari i ordenació automàtica de registres
    família                  família_joc,
    subfamília               subfamília_joc[],
    és_un_ple                bool,                     -- per decidir si mostrar una disposició d'un ple (no és deduïble mecànicament)

    -- Especificacions concretes
    és_harmònic              bool,
    harmònic                 tessitura,
    en_batalla               bool,
    batalla                  tessitura,
    en_façana                bool,
    façana                   tessitura,
    transmissió_de_notes     transmissió_de_notes,     -- reescriptura del teclat
    transmissió_de_registres transmissió_de_registres, -- reescriptura del teclat

    -- Estalvis
    és_transmissió           bool,
    transmissió_de           integer,
    és_extensió              bool,
    extensió_de              integer,
    té_préstecs              bool,
    presta_de                integer,
    préstec                  tessitura,

    -- Circumstàncies extra-organístiques
    absent                   bool,
    absent_comentari         text,

    observacions             text,

    CONSTRAINT id_cos_sonor_fk FOREIGN KEY (id_cos_sonor) REFERENCES CosSonor (id),
    CONSTRAINT transmissió_de_fk FOREIGN KEY (transmissió_de) REFERENCES Registre (id),
    CONSTRAINT extensió_de_fk FOREIGN KEY (extensió_de) REFERENCES Registre (id),
    CONSTRAINT presta_de_fk FOREIGN KEY (presta_de) REFERENCES Registre (id)
);

CREATE TABLE Acoblament (
    id                  integer PRIMARY KEY,
    id_teclat_del       integer,
    id_teclat_al        integer,
    nom                 text, -- NULL per defecte
    octava_aguda        bool,
    secret_octava_aguda bool,
    octava_greu         bool,
    transmissió         transmissió_de_notes,
    observacions        text,

    CONSTRAINT id_teclat_del_fk FOREIGN KEY (id_teclat_del) REFERENCES Teclat (id),
    CONSTRAINT id_teclat_al_fk FOREIGN KEY (id_teclat_al) REFERENCES Teclat (id)
);

CREATE TABLE Efecte (
    id           integer PRIMARY KEY,
    id_teclat    integer, -- teclat al qual pertanyen, si aplica
    efecte       json,    -- TODO
    observacions text,

    CONSTRAINT id_teclat_fk FOREIGN KEY (id_teclat) REFERENCES Teclat (id)
);

CREATE TABLE Orguener (
    id      integer PRIMARY KEY,
    nom     text,
    cognoms text, -- per ordenar per cognom
    empresa text  -- de vegades és una empresa, de vegades, un particular
);

CREATE TABLE OrguenerEnOrgue (
    id          integer PRIMARY KEY,
    id_orgue    integer,
    id_orguener integer,
    opus        text,
    any         text,
    date        text, -- TODO
    actuació    actuació[],
    detalls     text,

    CONSTRAINT id_orgue_fk FOREIGN KEY (id_orgue) REFERENCES Orgue (id),
    CONSTRAINT id_orguener_fk FOREIGN KEY (id_orguener) REFERENCES Orguener (id)
);
