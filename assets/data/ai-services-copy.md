# Sztuczna inteligencja, która naprawdę działa w Twojej firmie

Buduję systemy AI, które automatyzują żmudne zadania, odpowiadają na pytania klientów i analizują dane — bez potrzeby zatrudniania całego działu IT. Od prostego chatbota po złożoną sieć autonomicznych agentów.

---

## 01 — Agenci AI i automatyzacja procesów

Wyobraź sobie pracownika, który nigdy nie śpi, nie zapomina i robi dokładnie to, co mu zlecisz. Agent AI to program, który sam planuje kolejne kroki, korzysta z narzędzi i podejmuje decyzje — a w kluczowych momentach pyta Cię o zgodę.

Buduję zarówno pojedynczych agentów (np. "ktoś", kto codziennie rano przegląda zamówienia i reaguje na wyjątki), jak i całe sieci współpracujących botów, gdzie każdy ma swoją rolę i deleguje zadania dalej.

*Przykład zastosowania: agent monitorujący zwroty w sklepie — sam czyta maile, klasyfikuje problem, sprawdza historię zamówień i odpowiada klientowi. Tylko niestandardowe przypadki trafiają do człowieka.*

---

## 02 — Integracje z modelami AI

Claude, GPT, Gemini — to narzędzia, nie magia. Różnią się ceną, możliwościami i tym, do czego są najlepsze. Dobieram model do zadania i podłączam go do Twojego systemu tak, żeby wiedział, co może "robić": pobierać dane z bazy, sprawdzać stany magazynowe, wysyłać maile czy wystawiać faktury.

Efekt: zamiast chaotycznych odpowiedzi w stylu chatbota, dostajesz pewne, ustrukturyzowane dane — które trafiają prosto do kolejnego kroku w procesie.

*Pracuję z API Anthropic, OpenAI i Google. Wdrażam Model Context Protocol (MCP) do elastycznego łączenia narzędzi.*

---

## 03 — RAG i systemy wiedzy

Standardowe AI nie zna Twojej firmy. Zna internet. RAG (Retrieval-Augmented Generation) to technika, która zmienia to dosłownie w jeden krok: AI najpierw przeszukuje Twoją dokumentację, cennik, FAQ czy bazę artykułów — i dopiero potem odpowiada. Bez zmyślania, z konkretnymi źródłami.

Buduję systemy, które rozumieją pytania semantycznie, a nie tylko po słowach kluczowych. "Jaki jest czas realizacji dla zamówień do Niemiec?" zadziała nawet jeśli w dokumentacji napisano "wysyłka zagraniczna — 5 dni roboczych".

*Dla bardziej złożonych przypadków: grafy wiedzy (Neo4j), które rozumieją relacje między informacjami, nie tylko pojedyncze dokumenty.*

---

## 04 — Przetwarzanie multimediów

AI potrafi dziś więcej niż czytać tekst. Może zobaczyć zdjęcie produktu i napisać opis. Usłyszeć nagranie spotkania i stworzyć listę ustaleń. Przejrzeć fakturę w PDF i wyciągnąć z niej liczby do arkusza.

Automatyzuję procesy, które teraz robisz ręcznie — jedno nagranie, jedno zdjęcie, jeden plik po drugim. Skala zmienia wszystko.

*Transkrypcja, synteza mowy, analiza obrazów i wideo, generowanie raportów PDF — jako elementy większego pipeline'u.*

---

## 05 — Automatyzacja przeglądarki i web scraping

Niektórych danych nie da się pobrać przez API — są po prostu na stronie. Bot sterowany przez AI działa jak człowiek przy komputerze: wchodzi na stronę, klika, wypełnia formularze, pobiera dane. Tyle że robi to o 2 w nocy i przy 500 pozycjach naraz.

Używam Playwright — narzędzia klasy enterprise, które obsługuje nawet strony z javascriptem, logowaniem i dynamicznym contentem.

*Typowe zastosowania: monitoring cen konkurencji, zbieranie ofert z portali, automatyczne wypełnianie formularzy urzędowych, weryfikacja danych na wielu stronach jednocześnie.*

---

## 06 — Generatywne UI i dashboardy

Zamiast statycznego raportu raz w tygodniu — interfejs, który AI generuje na bieżąco, dopasowany do aktualnych danych. Sprzedaż z ostatnich 7 dni, anomalie w zamówieniach, porównanie z poprzednim miesiącem — w jednym widoku, zawsze świeży.

Buduję dashboardy i komponenty w React lub czystym HTML, z wykresami Chart.js i D3. Dla bardziej zaawansowanych przypadków: live preview przez WebSocket, czyli dane aktualizują się bez odświeżania strony.

---

## 07 — Integracje biznesowe

AI bez dostępu do Twoich danych jest bezużyteczne. Łączę systemy AI z narzędziami, których już używasz — i które są pełne cennych informacji.

Gmail i Google Workspace: agent czyta maile, klasyfikuje je, odpowiada na powtarzające się pytania i eskaluje tylko to, co wymaga uwagi. Stripe: automatyczne powiadomienia, śledzenie płatności, integracja z systemem sprzedaży. Kalendarze: agent sam planuje spotkania, pilnuje deadlinów i wysyła przypomnienia.

*Pracuję z OAuth — Twoje dane nie przechodzą przez żadne pośrednie systemy.*

---

## 08 — Bezpieczeństwo i jakość AI

AI potrafi kłamać z przekonaniem. Potrafi też zostać zmanipulowane przez sprytnie sformułowane zapytanie od użytkownika (prompt injection). I potrafi z biegiem czasu "dryfować" — odpowiadać coraz gorzej bez żadnego wyraźnego powodu.

Wdrażam zabezpieczenia na każdym poziomie: sandbox dla kodu generowanego przez AI (żeby nie mógł zrobić nic poza tym, co mu wolno), monitoring każdego zapytania i odpowiedzi (Langfuse), automatyczne testy jakości (Promptfoo) oraz izolację danych między klientami i środowiskami.

*To nie paranoja — to podstawa dla każdego systemu AI, który obsługuje prawdziwych użytkowników.*

---

## 09 — Systemy pamięci agentów

Domyślnie AI nie pamięta nic. Każda rozmowa zaczyna się od zera. To działa przy prostym chatbocie, ale nie przy agencie, który ma Ci pomagać przez tygodnie i miesiące.

Buduję systemy pamięci, gdzie agent wie: co ustalono w poprzednich sesjach, co preferuje dany użytkownik, jakie decyzje zostały podjęte i dlaczego, co już próbowano i nie zadziałało. Pamięć dzielę na rodzaje: epizodyczna (co się wydarzyło), semantyczna (co wiem o świecie/firmie) i proceduralna (jak mam postępować w konkretnych sytuacjach).

*To fundament pod asystentów, które naprawdę się uczą — a nie tylko symulują uczenie.*

---

# Pakiety

## AI Assistant — dla małych firm

Masz produkt lub usługę i chcesz odciążyć siebie albo swój zespół od powtarzających się zadań. Zamiast zatrudniać kolejną osobę do obsługi klienta lub raportowania — wdrożysz AI, które zrobi to szybciej i taniej.

**Co dostajesz:**
- Chatbot oparty na Twojej dokumentacji (odpowiada tylko to, co wie, nie zmyśla)
- Integracja z mailem i Gmailem
- Automatyczne odpowiedzi na powtarzające się pytania klientów
- Prosta automatyzacja: raporty tygodniowe, powiadomienia, podsumowania rozmów

---

## AI Automation — dla średnich firm

Masz powtarzalne procesy — obsługa zamówień, rekrutacja, onboarding, raportowanie — które zajmują czas kilku osób i są podatne na błędy. AI może przejąć większość z nich, a ludzie zostają przy tym, co wymaga prawdziwego myślenia.

**Co dostajesz:**
- Sieć współpracujących agentów AI (każdy z osobną rolą)
- Automatyzacja złożonych procesów z zatwierdzaniem przez człowieka tam, gdzie trzeba
- Dashboardy i raporty generowane na bieżąco
- Integracja z systemami, których używasz (CRM, e-commerce, ERP)
- Monitoring i mierzenie jakości odpowiedzi AI

---

## AI Enterprise — dla dużych organizacji

Potrzebujesz skalowalnego systemu z pełną kontrolą nad danymi, bezpieczeństwem i jakością. Macie własny dział IT, ale brakuje doświadczenia w budowaniu produkcyjnych systemów AI.

**Co dostajesz:**
- Pełna architektura multi-agentowa zaprojektowana pod Wasz przypadek
- Zaawansowane systemy wiedzy (grafy, hybrydowe RAG)
- Bezpieczeństwo na każdym poziomie (sandboxing, izolacja danych, kontrola dostępu)
- Pełny tracing i monitoring każdego zapytania AI
- Systemy pamięci i uczenia agentów w czasie

---

## AI Consulting — dla każdego

Wiesz, że AI może Ci pomóc, ale nie wiesz od czego zacząć, co ma sens ekonomicznie i co to w ogóle oznacza dla Twojego biznesu.

**Co dostajesz:**
- Audyt Twoich procesów pod kątem automatyzacji AI (co można, co się opłaca, co lepiej zostawić ludziom)
- Mapa możliwości z konkretną kolejnością wdrożeń
- Prototyp działającego rozwiązania w 1–2 tygodnie
- Szkolenie zespołu z prompt engineeringu i pracy z narzędziami AI

---

# CTA

## Masz konkretny problem do rozwiązania?

Opisz mi swój proces albo wyzwanie — powiem Ci wprost, czy i jak AI może tu pomóc. Bez sprzedawania na siłę, bez buzzwordów.

**michal@stroniarz.pl**
