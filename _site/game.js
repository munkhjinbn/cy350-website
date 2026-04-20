const FACTS = [
  { category: "Geography", question: "What is the capital of Mongolia?", answer: "Ulaanbaatar", options: ["Ulaanbaatar", "Darkhan", "Erdenet", "Kharkhorin"], detail: "Ulaanbaatar is Mongolia's capital and by far its largest city." },
  { category: "Geography", question: "Which two countries border Mongolia?", answer: "Russia and China", options: ["Russia and China", "China and Kazakhstan", "Russia and Kazakhstan", "China and North Korea"], detail: "Mongolia is bordered only by Russia to the north and China to the south." },
  { category: "Geography", question: "Which term best describes Mongolia's access to the sea?", answer: "Landlocked", options: ["Landlocked", "Island nation", "Peninsula", "Coastal"], detail: "Mongolia has no coastline and is one of the world's large landlocked countries." },
  { category: "Civics", question: "What is the currency of Mongolia?", answer: "Togrug", options: ["Togrug", "Som", "Yuan", "Won"], detail: "The Mongolian currency is the togrug, often written tugrik or tögrög in English." },
  { category: "Language", question: "What is the official language of Mongolia?", answer: "Mongolian", options: ["Mongolian", "Kazakh", "Russian", "Mandarin"], detail: "Mongolian is the official language of the country." },
  { category: "Language", question: "Which writing system is most widely used in Mongolia today?", answer: "Cyrillic script", options: ["Cyrillic script", "Arabic script", "Latin script", "Devanagari"], detail: "Modern Mongolian is commonly written in Cyrillic in daily life." },
  { category: "Language", question: "Which historic script is traditionally written vertically in Mongolia?", answer: "Mongolian script", options: ["Mongolian script", "Runic script", "Greek script", "Armenian script"], detail: "The traditional Mongolian script is written in vertical columns." },
  { category: "Geography", question: "Which desert stretches across southern Mongolia?", answer: "The Gobi Desert", options: ["The Gobi Desert", "The Taklamakan Desert", "The Karakum Desert", "The Kyzylkum Desert"], detail: "The Gobi covers a large area of southern Mongolia and northern China." },
  { category: "Geography", question: "Which river flows through Ulaanbaatar?", answer: "Tuul River", options: ["Tuul River", "Orkhon River", "Selenge River", "Onon River"], detail: "Ulaanbaatar lies along the Tuul River valley." },
  { category: "Geography", question: "Which lake in northern Mongolia is often called the Blue Pearl?", answer: "Khuvsgul Lake", options: ["Khuvsgul Lake", "Uvs Lake", "Har Us Lake", "Buir Lake"], detail: "Khuvsgul Lake is famous for its clarity and is often nicknamed the Blue Pearl of Mongolia." },
  { category: "Geography", question: "What is the highest peak in Mongolia?", answer: "Khuiten Peak", options: ["Khuiten Peak", "Otgontenger", "Bogd Khan", "Munkh Saridag"], detail: "Khuiten Peak in the Altai Mountains is Mongolia's highest mountain." },
  { category: "Geography", question: "Which mountain system dominates western Mongolia?", answer: "Altai Mountains", options: ["Altai Mountains", "Andes", "Tien Shan", "Ural Mountains"], detail: "The Mongolian Altai spans much of the west." },
  { category: "Geography", question: "Which river system carries water from Mongolia toward Lake Baikal?", answer: "Selenge River", options: ["Selenge River", "Tuul River", "Herlen River", "Khovd River"], detail: "The Selenge River is the major river flowing from Mongolia into Russia toward Lake Baikal." },
  { category: "Geography", question: "What broad landscape covers much of Mongolia?", answer: "Steppe", options: ["Steppe", "Rainforest", "Mangrove", "Coral reef"], detail: "Mongolia is strongly associated with wide grassland steppe landscapes." },
  { category: "Civics", question: "How many aimags, or provinces, does Mongolia have?", answer: "21", options: ["21", "12", "18", "27"], detail: "Mongolia is divided into 21 aimags." },
  { category: "Civics", question: "What is the name of Mongolia's parliament?", answer: "State Great Khural", options: ["State Great Khural", "National Duma", "People's Assembly", "Grand Senate"], detail: "Mongolia's legislature is called the State Great Khural." },
  { category: "Geography", question: "Mongolia is often called the Land of what?", answer: "The Eternal Blue Sky", options: ["The Eternal Blue Sky", "A Thousand Rivers", "The Two Oceans", "The Midnight Sun"], detail: "A common nickname for Mongolia is the Land of the Eternal Blue Sky." },
  { category: "Culture", question: "What is Mongolia's most famous summer festival?", answer: "Naadam", options: ["Naadam", "Nowruz", "Songkran", "Diwali"], detail: "Naadam is Mongolia's best-known national festival." },
  { category: "Culture", question: "Which set is known as the Three Manly Games at Naadam?", answer: "Wrestling, archery, and horse racing", options: ["Wrestling, archery, and horse racing", "Boxing, judo, and sprinting", "Polo, fencing, and rowing", "Skating, skiing, and shooting"], detail: "Naadam centers on wrestling, archery, and horse racing." },
  { category: "Culture", question: "What is the Mongolian Lunar New Year called?", answer: "Tsagaan Sar", options: ["Tsagaan Sar", "Losar", "Tet", "Mid-Autumn Festival"], detail: "Tsagaan Sar is Mongolia's traditional Lunar New Year celebration." },
  { category: "Culture", question: "What is the traditional portable round dwelling used by many Mongolians called?", answer: "Ger", options: ["Ger", "Ryokan", "Hogan", "Riad"], detail: "The ger is the classic portable felt dwelling of Mongolian nomadic life." },
  { category: "Culture", question: "What is the traditional robe-like garment worn in Mongolia?", answer: "Deel", options: ["Deel", "Kimono", "Hanbok", "Sari"], detail: "The deel is a long robe tied with a sash and worn across Mongolia." },
  { category: "Food", question: "What is the traditional fermented drink made from mare's milk?", answer: "Airag", options: ["Airag", "Kumis tea", "Ayran", "Kefir"], detail: "Airag is fermented mare's milk and one of Mongolia's best-known traditional drinks." },
  { category: "Food", question: "What is the common Mongolian milk tea called?", answer: "Suutei tsai", options: ["Suutei tsai", "Masala chai", "Matcha", "Butter tea"], detail: "Suutei tsai is a salty milk tea commonly served in Mongolia." },
  { category: "Music", question: "What instrument is known as the horsehead fiddle?", answer: "Morin khuur", options: ["Morin khuur", "Dombra", "Shamisen", "Erhu"], detail: "The morin khuur is one of Mongolia's signature instruments, with a carved horse head on the neck." },
  { category: "Music", question: "What is Mongolia's famous overtone singing tradition called?", answer: "Khoomii", options: ["Khoomii", "Qawwali", "Fado", "Flamenco"], detail: "Khoomii is Mongolian throat singing, where a singer produces multiple tones at once." },
  { category: "Music", question: "What is the name of Mongolia's traditional long-song genre?", answer: "Urtiin duu", options: ["Urtiin duu", "Tuvan chant", "Gagaku", "Bharatanatyam"], detail: "Urtiin duu means long song and is a major form of Mongolian vocal tradition." },
  { category: "Culture", question: "Which traditional Mongolian dance is performed in small spaces with expressive upper-body movement?", answer: "Bii biyelgee", options: ["Bii biyelgee", "Bharatanatyam", "Kabuki", "Cossack dance"], detail: "Bii biyelgee developed in ger settings and focuses on compact, expressive movement." },
  { category: "Culture", question: "What is the game played with sheep ankle bones called?", answer: "Shagai", options: ["Shagai", "Go", "Mahjong", "Pachisi"], detail: "Shagai uses anklebones in games, fortune play, and festival contests." },
  { category: "Culture", question: "What is traditional Mongolian wrestling called?", answer: "Bokh", options: ["Bokh", "Sumo", "Greco-Roman", "Ssireum"], detail: "Bokh is one of the Three Manly Games and a major part of Mongolian sporting culture." },
  { category: "Food", question: "What are Mongolia's steamed meat dumplings called?", answer: "Buuz", options: ["Buuz", "Manti", "Pierogi", "Gyoza"], detail: "Buuz are steamed dumplings commonly eaten during holidays and winter." },
  { category: "Food", question: "What is the name of the fried meat pastry often eaten during Naadam?", answer: "Huushuur", options: ["Huushuur", "Samosa", "Empanada", "Borek"], detail: "Huushuur is a fried pastry filled with minced meat and a festival favorite." },
  { category: "Food", question: "What are the dried curds commonly eaten as a snack in Mongolia called?", answer: "Aaruul", options: ["Aaruul", "Paneer", "Kimchi", "Tahini"], detail: "Aaruul are dried dairy curds made in many Mongolian households." },
  { category: "Food", question: "What hot-stone meat dish is closely associated with Mongolian gatherings?", answer: "Khorkhog", options: ["Khorkhog", "Pho", "Paella", "Tagine"], detail: "Khorkhog is cooked with hot stones inside a sealed container." },
  { category: "History", question: "Who founded the Mongol Empire?", answer: "Chinggis Khan", options: ["Chinggis Khan", "Kublai Khan", "Ogedei Khan", "Tamerlane"], detail: "Temujin unified the tribes and became Chinggis Khan, founder of the Mongol Empire." },
  { category: "History", question: "What title did Temujin take in 1206?", answer: "Chinggis Khan", options: ["Chinggis Khan", "Great Lama", "Bogd Khan", "Khagan Batu"], detail: "In 1206, Temujin was proclaimed Chinggis Khan after unifying Mongol tribes." },
  { category: "History", question: "What was the capital of the Mongol Empire in present-day Mongolia called?", answer: "Karakorum", options: ["Karakorum", "Samarkand", "Kashgar", "Beshbalik"], detail: "Karakorum was the early imperial capital in the Orkhon Valley." },
  { category: "History", question: "Which monastery near Karakorum is one of Mongolia's oldest surviving Buddhist monasteries?", answer: "Erdene Zuu Monastery", options: ["Erdene Zuu Monastery", "Gandan Monastery", "Amarbayasgalant", "Tashilhunpo"], detail: "Erdene Zuu was built near the site of Karakorum and remains a major historic monastery." },
  { category: "Landmarks", question: "What is the name of the central square in Ulaanbaatar?", answer: "Sukhbaatar Square", options: ["Sukhbaatar Square", "Victory Square", "Freedom Plaza", "Union Square"], detail: "Sukhbaatar Square is the ceremonial and political center of the capital." },
  { category: "Landmarks", question: "Which monastery is a major Buddhist center in Ulaanbaatar?", answer: "Gandan Monastery", options: ["Gandan Monastery", "Erdene Zuu", "Shaolin Temple", "Potala Temple"], detail: "Gandan Monastery is one of Mongolia's most important active monasteries." },
  { category: "Landmarks", question: "The giant equestrian statue east of Ulaanbaatar honors which historical figure?", answer: "Chinggis Khan", options: ["Chinggis Khan", "Sukhbaatar", "Kublai Khan", "Bogd Khan"], detail: "The Chinggis Khaan Equestrian Statue is a landmark east of the capital." },
  { category: "Landmarks", question: "Which protected mountain rises just south of Ulaanbaatar?", answer: "Bogd Khan Mountain", options: ["Bogd Khan Mountain", "Khuiten Peak", "Otgontenger", "Burkhan Khaldun"], detail: "Bogd Khan Mountain borders the capital area and is a historic protected landscape." },
  { category: "Nature", question: "Which Gobi site is famous as the Flaming Cliffs?", answer: "Bayanzag", options: ["Bayanzag", "Yolyn Am", "Tsagaan Suvarga", "Terelj"], detail: "Bayanzag is known worldwide for red cliffs and dinosaur fossil discoveries." },
  { category: "Nature", question: "What famous fossil discovery helped make the Mongolian Gobi globally famous?", answer: "Dinosaur eggs", options: ["Dinosaur eggs", "Mammoth tusks", "Amber insects", "Trilobite reefs"], detail: "Mongolia's Gobi became especially famous after major dinosaur fossil finds, including eggs." },
  { category: "Nature", question: "What is the Mongolian name commonly used for Przewalski's horse?", answer: "Takhi", options: ["Takhi", "Argali", "Maral", "Saker"], detail: "The takhi is the wild horse reintroduced to Mongolia after extinction in the wild." },
  { category: "Nature", question: "Which elusive big cat lives in Mongolia's mountains and deserts?", answer: "Snow leopard", options: ["Snow leopard", "Jaguar", "Cheetah", "Lynx"], detail: "Mongolia is one of the important habitats of the snow leopard." },
  { category: "Nature", question: "Which camel species is native to Mongolia's desert regions?", answer: "Bactrian camel", options: ["Bactrian camel", "Dromedary camel", "Llama", "Vicuna"], detail: "The Bactrian camel has two humps and is adapted to Mongolia's harsh desert climate." },
  { category: "Culture", question: "Which province is most associated with eagle hunting in western Mongolia?", answer: "Bayan-Ulgii", options: ["Bayan-Ulgii", "Dornod", "Selenge", "Khentii"], detail: "Bayan-Ulgii in western Mongolia is famous for Kazakh eagle hunters." },
  { category: "Culture", question: "Which ethnic community is especially known for eagle hunting in Mongolia?", answer: "Kazakhs", options: ["Kazakhs", "Uzbeks", "Uighurs", "Tatars"], detail: "The eagle-hunting tradition in western Mongolia is strongly associated with Kazakh communities." },
  { category: "Culture", question: "What are the northern reindeer-herding people of Mongolia commonly called?", answer: "Tsaatan", options: ["Tsaatan", "Nenets", "Sami", "Evenki"], detail: "The Tsaatan are known for reindeer herding in northern Mongolia." },
  { category: "Economy", question: "Which animal provides the fiber used in Mongolia's famous cashmere industry?", answer: "Goat", options: ["Goat", "Yak", "Camel", "Sheep"], detail: "Mongolian cashmere comes from the soft undercoat of goats." },
  { category: "Culture", question: "Which animal is one of Mongolia's traditional five livestock species?", answer: "Camel", options: ["Camel", "Pig", "Buffalo", "Alpaca"], detail: "The traditional five livestock are horses, cattle or yaks, sheep, goats, and camels." },
  { category: "Religion", question: "Which religion has had the strongest historical influence in Mongolia since the late medieval period?", answer: "Tibetan Buddhism", options: ["Tibetan Buddhism", "Hinduism", "Shinto", "Catholicism"], detail: "Tibetan Buddhism has deeply shaped Mongolian religious life and institutions." },
  { category: "Religion", question: "Which older spiritual tradition also has deep roots in Mongolia?", answer: "Shamanism", options: ["Shamanism", "Taoism", "Zoroastrianism", "Jainism"], detail: "Shamanic beliefs and practices have long existed in Mongolia alongside Buddhism." },
  { category: "Symbols", question: "What national symbol appears on Mongolia's flag?", answer: "Soyombo", options: ["Soyombo", "Yin-yang", "Crescent moon", "Maple leaf"], detail: "The Soyombo is a historic Mongolian symbol and appears on the national flag." },
  { category: "Symbols", question: "What are the three main colors of Mongolia's flag?", answer: "Red, blue, and red", options: ["Red, blue, and red", "Blue, white, and red", "Green, white, and red", "Red, black, and gold"], detail: "Mongolia's flag has a blue center stripe with red side stripes." },
  { category: "Symbols", question: "On which side of the national flag does the Soyombo appear?", answer: "Left side", options: ["Left side", "Right side", "Center stripe", "Top border"], detail: "The Soyombo is placed on the left red stripe of the flag." },
  { category: "Geography", question: "What does the name Ulaanbaatar mean?", answer: "Red Hero", options: ["Red Hero", "Golden Steppe", "Blue Mountain", "Great River"], detail: "Ulaanbaatar is commonly translated as Red Hero." },
  { category: "UNESCO", question: "Which Mongolian valley is listed as a UNESCO World Heritage Site for its cultural landscape?", answer: "Orkhon Valley", options: ["Orkhon Valley", "Tuul Basin", "Herlen Valley", "Khentii Hollow"], detail: "The Orkhon Valley Cultural Landscape is a UNESCO World Heritage Site." },
  { category: "UNESCO", question: "Which basin shared by Mongolia and Russia is a UNESCO World Heritage Site?", answer: "Uvs Nuur Basin", options: ["Uvs Nuur Basin", "Tarim Basin", "Fergana Basin", "Ili Basin"], detail: "The Uvs Nuur Basin is protected for its ecological diversity." },
  { category: "UNESCO", question: "Which UNESCO World Heritage listing in western Mongolia is famous for rock art?", answer: "Petroglyphic Complexes of the Mongolian Altai", options: ["Petroglyphic Complexes of the Mongolian Altai", "Ellora Caves", "Gobustan Rock Art", "Mesa Verde"], detail: "The Petroglyphic Complexes of the Mongolian Altai preserve thousands of rock carvings." },
  { category: "Geography", question: "Which national park in southern Mongolia is named after three beauties of the Gobi?", answer: "Gobi Gurvansaikhan National Park", options: ["Gobi Gurvansaikhan National Park", "Khustain Nuruu National Park", "Terelj National Park", "Altai Tavan Bogd National Park"], detail: "Gobi Gurvansaikhan is one of Mongolia's best-known protected areas in the south." },
  { category: "Nature", question: "Which dramatic valley in the Gobi is known for lingering ice even in warm months?", answer: "Yolyn Am", options: ["Yolyn Am", "Khongoryn Els", "Orkhon Gorge", "Buir Steppe"], detail: "Yolyn Am is a narrow gorge famous for cool conditions and seasonal ice." },
  { category: "Nature", question: "Which national park is especially known for reintroducing the takhi?", answer: "Khustain Nuruu National Park", options: ["Khustain Nuruu National Park", "Gorkhi-Terelj National Park", "Lake Khovsgol National Park", "Bogd Khan National Park"], detail: "Khustain Nuruu became a major success story for takhi reintroduction." },
  { category: "Geography", question: "Which mountain range lies in central Mongolia?", answer: "Khangai Mountains", options: ["Khangai Mountains", "Apennines", "Pyrenees", "Carpathians"], detail: "The Khangai Mountains rise across central Mongolia." },
  { category: "History", question: "Which mountain region is strongly linked in tradition to the homeland of Chinggis Khan?", answer: "Khentii Mountains", options: ["Khentii Mountains", "Khangai Mountains", "Altai Mountains", "Tannu-Ola"], detail: "The Khentii region is closely tied to the early life and legacy of Chinggis Khan." },
  { category: "Transport", question: "Which major railway route crosses Mongolia between Russia and China?", answer: "The Trans-Mongolian Railway", options: ["The Trans-Mongolian Railway", "The Silk Rail Express", "The Steppe Loop", "The Eurasia Coastal Line"], detail: "The Trans-Mongolian Railway is a major link connecting Russia, Mongolia, and China." },
  { category: "Climate", question: "What is the name for the severe winter disaster that can devastate herds in Mongolia?", answer: "Dzud", options: ["Dzud", "Monsoon", "Sirocco", "Chinook"], detail: "A dzud is a severe winter condition that can lead to large livestock losses." },
  { category: "Climate", question: "What is most threatened during a dzud?", answer: "Livestock", options: ["Livestock", "Rice paddies", "Mangrove forests", "Olive groves"], detail: "Dzud conditions make it difficult for animals to graze or survive winter cold." },
  { category: "Geography", question: "Which statement best describes Mongolia's population distribution?", answer: "It has one of the world's lowest population densities", options: ["It has one of the world's lowest population densities", "It is densely settled along two coasts", "Most people live in rainforests", "It is one of the most urbanized island states"], detail: "Mongolia is famous for vast open spaces and very low population density." },
  { category: "History", question: "The Mongol Empire is often remembered as what kind of empire at its peak?", answer: "The largest contiguous land empire in history", options: ["The largest contiguous land empire in history", "The oldest maritime empire", "The smallest land empire", "The only empire without cavalry"], detail: "At its height, the Mongol Empire stretched across a huge continuous landmass." },
  { category: "Culture", question: "Who traditionally rides in many Naadam horse races?", answer: "Child jockeys", options: ["Child jockeys", "Only retired generals", "Teams of four adults", "Professional cyclists"], detail: "Naadam horse racing has long involved child jockeys, reflecting the focus on the horse rather than the rider's size." },
  { category: "Culture", question: "Which rule is unusual in traditional Mongolian wrestling?", answer: "There are no weight classes", options: ["There are no weight classes", "Only twins may compete", "Matches take place on ice", "Weapons are allowed"], detail: "Bokh does not use weight divisions, so competitors of different sizes can face each other." },
  { category: "Culture", question: "Which of these is a Naadam sport?", answer: "Archery", options: ["Archery", "Surfing", "Rowing", "Tennis"], detail: "Archery is one of the core Naadam events." },
  { category: "Culture", question: "Where is the Golden Eagle Festival commonly held?", answer: "Bayan-Ulgii", options: ["Bayan-Ulgii", "Dornogovi", "Arkhangai", "Bulgan"], detail: "The Golden Eagle Festival is associated with the far western province of Bayan-Ulgii." },
  { category: "Culture", question: "What is an ovoo in Mongolian tradition?", answer: "A sacred stone cairn", options: ["A sacred stone cairn", "A winter boot", "A horse saddle", "A prayer drum"], detail: "Ovoos are cairns used in ritual, travel, and offerings across Mongolia." },
  { category: "Culture", question: "How do people traditionally circle an ovoo?", answer: "Clockwise", options: ["Clockwise", "Counterclockwise", "By jumping over it", "In complete silence facing away"], detail: "Travelers often circle ovoos clockwise while making offerings." },
  { category: "Culture", question: "What architectural feature sits at the top center of a ger?", answer: "A roof crown opening", options: ["A roof crown opening", "A chimney tower", "A glass skylight wall", "A bell turret"], detail: "The top crown lets in light and allows smoke to escape from the ger." },
  { category: "Culture", question: "Why is the ger well suited to nomadic life?", answer: "It can be dismantled and moved", options: ["It can be dismantled and moved", "It is carved from a single stone", "It floats on rivers", "It is built underground"], detail: "The ger's portability makes it ideal for seasonal movement." },
  { category: "Culture", question: "What are Mongolian horses especially known for?", answer: "Endurance", options: ["Endurance", "Striped coats", "Swimming speed", "Long ears"], detail: "Mongolian horses are small, tough, and famous for stamina." },
  { category: "Culture", question: "How are many Mongolian horse races traditionally run?", answer: "Across long open-country distances", options: ["Across long open-country distances", "Only inside circular arenas", "On frozen lakes at night", "In teams pulling chariots"], detail: "Naadam horse races are endurance events run over long outdoor routes." },
  { category: "Music", question: "What visual feature helps identify a morin khuur?", answer: "A horse head carving", options: ["A horse head carving", "Twin drum skins", "A silver trumpet bell", "A bamboo mouthpiece"], detail: "The morin khuur typically features a carved horse head at the top of the neck." },
  { category: "Food", question: "What flavor detail is common in suutei tsai?", answer: "It is often lightly salty", options: ["It is often lightly salty", "It is always sour and cold", "It is heavily carbonated", "It is normally bright green"], detail: "Suutei tsai is milk tea and is often prepared with salt." },
  { category: "History", question: "What title was used by Mongolia's last theocratic ruler?", answer: "Bogd Khan", options: ["Bogd Khan", "Tsar", "Caliph", "Shogun"], detail: "Bogd Khan was the title of Mongolia's last theocratic monarch." },
  { category: "Economy", question: "Which major mineral project is a giant copper operation in Mongolia?", answer: "Oyu Tolgoi", options: ["Oyu Tolgoi", "Escondida", "Olympic Dam", "Grasberg"], detail: "Oyu Tolgoi is one of Mongolia's largest and best-known mining projects." },
  { category: "Economy", question: "Which energy-related resource is also a major Mongolian export?", answer: "Coal", options: ["Coal", "Coffee", "Natural rubber", "Palm oil"], detail: "Coal is one of Mongolia's major export commodities." },
  { category: "Nature", question: "In which part of Mongolia is Khuvsgul Lake located?", answer: "The north", options: ["The north", "The far southwest", "The central Gobi", "The southeast borderlands"], detail: "Khuvsgul Lake lies in northern Mongolia near the Russian border." },
  { category: "Culture", question: "Which province is known for having a large Kazakh population?", answer: "Bayan-Ulgii", options: ["Bayan-Ulgii", "Khentii", "Tov", "Sukhbaatar"], detail: "Bayan-Ulgii is Mongolia's western province with a strong Kazakh cultural presence." },
  { category: "History", question: "In which year did Mongolia's democratic revolution begin?", answer: "1990", options: ["1990", "1945", "1968", "2001"], detail: "Mass democratic protests in 1990 led to major political reforms in Mongolia." },
  { category: "History", question: "What political practice returned in Mongolia after the 1990 democratic transition?", answer: "Multi-party elections", options: ["Multi-party elections", "Hereditary monarchy", "Military rule", "One-party colonial rule"], detail: "The 1990 democratic transition opened the way for competitive multi-party politics." },
  { category: "History", question: "What stone sculptures can still be seen near Karakorum and Erdene Zuu?", answer: "Stone tortoises", options: ["Stone tortoises", "Stone elephants", "Stone dolphins", "Stone lions with wings"], detail: "Stone tortoises are well-known monuments near the old imperial capital area." },
  { category: "Culture", question: "In which month is Naadam typically celebrated?", answer: "July", options: ["July", "January", "March", "November"], detail: "Naadam is traditionally held in July." },
  { category: "Language", question: "How is traditional Mongolian calligraphy usually written?", answer: "Vertically", options: ["Vertically", "In spiral circles", "Only right to left horizontally", "Only in block capitals"], detail: "Traditional Mongolian calligraphy follows the vertical orientation of the classic script." },
  { category: "Language", question: "Which Mongolian dialect group forms the basis of standard Mongolian in the country?", answer: "Khalkha", options: ["Khalkha", "Uyghur", "Tajik", "Pashto"], detail: "Khalkha Mongolian is the basis of the standard language used in Mongolia." },
  { category: "Food", question: "Which dish is cooked with heated stones placed inside the animal carcass or skin?", answer: "Boodog", options: ["Boodog", "Buuz", "Tsuivan", "Khuushuur"], detail: "Boodog is a dramatic hot-stone cooking method associated with outdoor Mongolian cuisine." },
  { category: "Nature", question: "Which protected area in western Mongolia includes some of the country's highest mountains?", answer: "Altai Tavan Bogd National Park", options: ["Altai Tavan Bogd National Park", "Khustain Nuruu National Park", "Orkhon Valley National Park", "Bogd Khan National Park"], detail: "Altai Tavan Bogd National Park protects major peaks and glaciers in western Mongolia." },
  { category: "Nature", question: "Which sand dunes in the Gobi are among Mongolia's best-known desert landscapes?", answer: "Khongoryn Els", options: ["Khongoryn Els", "Singing Dunes of Namibia", "Erg Chebbi", "White Sands"], detail: "Khongoryn Els is a famous dune system in the Mongolian Gobi." },
  { category: "Nature", question: "Which wild sheep species of Mongolia is famous for its huge curved horns?", answer: "Argali", options: ["Argali", "Mouflon", "Ibex goat", "Red deer"], detail: "The argali is the world's largest wild sheep and lives in parts of Mongolia." },
  { category: "Culture", question: "Which hunting bird is used by western Mongolia's eagle hunters?", answer: "Golden eagle", options: ["Golden eagle", "Condor", "Barn owl", "Kestrel"], detail: "Golden eagles are trained by hunters in western Mongolia." },
  { category: "History", question: "Which valley became a center for nomadic empires long before modern Ulaanbaatar?", answer: "Orkhon Valley", options: ["Orkhon Valley", "Nile Valley", "Danube Valley", "Mekong Valley"], detail: "The Orkhon Valley has long been a strategic and symbolic center in steppe history." }
];

const STORAGE_KEY = "mongolia-100-state-v1";

const elements = {
  todayBadge: document.getElementById("todayBadge"),
  streakValue: document.getElementById("streakValue"),
  bestValue: document.getElementById("bestValue"),
  progressValue: document.getElementById("progressValue"),
  remainingValue: document.getElementById("remainingValue"),
  categoryPill: document.getElementById("categoryPill"),
  questionIndexPill: document.getElementById("questionIndexPill"),
  questionText: document.getElementById("questionText"),
  questionLead: document.getElementById("questionLead"),
  optionsGrid: document.getElementById("optionsGrid"),
  feedbackPanel: document.getElementById("feedbackPanel"),
  feedbackResult: document.getElementById("feedbackResult"),
  feedbackFact: document.getElementById("feedbackFact"),
  continueButton: document.getElementById("continueButton"),
  restartButton: document.getElementById("restartButton"),
  runSummary: document.getElementById("runSummary"),
  factsGrid: document.getElementById("factsGrid"),
  factSearch: document.getElementById("factSearch"),
  winnerDialog: document.getElementById("winnerDialog"),
  winnerMessage: document.getElementById("winnerMessage"),
  winnerRestartButton: document.getElementById("winnerRestartButton"),
  winnerCloseButton: document.getElementById("winnerCloseButton")
};

function hasGameUI() {
  return Boolean(elements.questionText && elements.optionsGrid && elements.continueButton);
}

function hasArchiveUI() {
  return Boolean(elements.factsGrid);
}

function getDayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function formatToday() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date());
}

function hashString(input) {
  let hash = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i += 1) {
    hash = Math.imul(hash ^ input.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return (hash ^= hash >>> 16) >>> 0;
  };
}

function mulberry32(seed) {
  return function seededRandom() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildDeck(cycle, dayKey) {
  const ids = FACTS.map((_, index) => index);
  const seed = hashString(`${dayKey}-${cycle}-mongolia-100`)();
  const random = mulberry32(seed);
  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

function buildOptionOrder(factId, cycle, dayKey) {
  const fact = FACTS[factId];
  const options = [...fact.options];
  const seed = hashString(`${dayKey}-${cycle}-${factId}-options`)();
  const random = mulberry32(seed);

  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return options;
}

function createFreshState(previousWins = 0, previousBest = 0) {
  const dayKey = getDayKey();
  const deck = buildDeck(previousWins + 1, dayKey);
  const currentId = deck[0];
  return {
    cycle: previousWins + 1,
    wins: previousWins,
    streak: 0,
    bestStreak: previousBest,
    answered: 0,
    completed: false,
    queue: deck,
    currentId,
    currentOptions: buildOptionOrder(currentId, previousWins + 1, dayKey),
    mode: "question",
    lastResult: null,
    dayKey
  };
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createFreshState();
    }

    const parsed = JSON.parse(raw);
    const badQueue = !Array.isArray(parsed.queue) || parsed.queue.some((id) => typeof id !== "number" || id < 0 || id >= FACTS.length);
    const badCurrent = typeof parsed.currentId !== "number" || parsed.currentId < 0 || parsed.currentId >= FACTS.length;
    const badOptions = !Array.isArray(parsed.currentOptions) || parsed.currentOptions.length !== FACTS[parsed.currentId].options.length;
    if (badQueue || badCurrent || badOptions) {
      return createFreshState(parsed.wins || 0, parsed.bestStreak || 0);
    }

    if (parsed.dayKey !== getDayKey() && parsed.answered === 0 && parsed.mode === "question") {
      return createFreshState(parsed.wins || 0, parsed.bestStreak || 0);
    }

    return parsed;
  } catch (error) {
    return createFreshState();
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetCycle() {
  state = createFreshState(state.wins, state.bestStreak);
  saveState();
  closeWinnerDialog();
  renderGame();
}

function completeRun() {
  elements.winnerMessage.textContent = `You finished ${FACTS.length} facts in cycle ${state.cycle}. Your best streak so far is ${state.bestStreak}. Restart to reshuffle the full deck.`;
  if (typeof elements.winnerDialog.showModal === "function" && !elements.winnerDialog.open) {
    elements.winnerDialog.showModal();
  }
}

function closeWinnerDialog() {
  if (elements.winnerDialog && elements.winnerDialog.open) {
    elements.winnerDialog.close();
  }
}

function renderStats() {
  if (!hasGameUI()) {
    return;
  }

  elements.todayBadge.textContent = `Today's trail • ${formatToday()}`;
  elements.streakValue.textContent = String(state.streak);
  elements.bestValue.textContent = String(state.bestStreak);
  elements.progressValue.textContent = `${state.answered} / ${FACTS.length}`;
  elements.remainingValue.textContent = String(Math.max(FACTS.length - state.answered, 0));
  elements.runSummary.textContent = state.answered === FACTS.length
    ? "Full trail complete. Restart to reshuffle all cards."
    : `Cycle ${state.cycle} is active. ${FACTS.length - state.answered} cards remain and none will repeat before the deck resets.`;
}

function renderQuestion() {
  if (!hasGameUI()) {
    return;
  }

  const fact = FACTS[state.currentId];
  const cardNumber = state.answered + (state.mode === "feedback" ? 0 : 1);
  const optionOrder = state.currentOptions || fact.options;

  elements.categoryPill.textContent = fact.category;
  elements.questionIndexPill.textContent = `Card ${Math.min(cardNumber, FACTS.length)} of ${FACTS.length}`;
  elements.questionText.textContent = fact.question;
  elements.questionLead.textContent = state.mode === "feedback"
    ? "Review the explanation, then continue to the next fact."
    : "Pick the best answer. Correct answers extend your streak. Wrong answers reset it, but the card still retires from this cycle.";

  elements.optionsGrid.innerHTML = "";

  optionOrder.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option;

    if (state.mode === "question") {
      button.addEventListener("click", () => submitAnswer(option));
    } else {
      button.disabled = true;
      if (option === fact.answer) {
        button.classList.add("correct");
      }
      if (state.lastResult && option === state.lastResult.selected && option !== fact.answer) {
        button.classList.add("wrong");
      }
    }

    elements.optionsGrid.appendChild(button);
  });

  if (state.mode === "feedback" && state.lastResult) {
    elements.feedbackPanel.hidden = false;
    elements.feedbackResult.textContent = state.lastResult.correct ? "Correct." : "Not quite.";
    elements.feedbackResult.className = state.lastResult.correct ? "feedback-result good" : "feedback-result bad";
    elements.feedbackFact.textContent = fact.detail;
    elements.continueButton.textContent = state.answered === FACTS.length ? "See result" : "Next fact";
  } else {
    elements.feedbackPanel.hidden = true;
    elements.feedbackResult.textContent = "";
    elements.feedbackFact.textContent = "";
  }
}

function renderArchive(filteredFacts = FACTS.map((fact, index) => ({ fact, originalIndex: index + 1 }))) {
  if (!hasArchiveUI()) {
    return;
  }

  elements.factsGrid.innerHTML = "";

  if (filteredFacts.length === 0) {
    elements.factsGrid.innerHTML = `<article class="fact-card empty-card"><h3>No matching facts</h3><p class="fact-detail">Try a broader keyword such as Naadam, horse, Gobi, or Ulaanbaatar.</p></article>`;
    return;
  }

  filteredFacts.forEach(({ fact, originalIndex }) => {
    const card = document.createElement("article");
    card.className = "fact-card";
    card.innerHTML = `
      <p class="fact-number">${originalIndex}</p>
      <p class="fact-category">${fact.category}</p>
      <h3>${fact.question}</h3>
      <p class="fact-answer">${fact.answer}</p>
      <p class="fact-detail">${fact.detail}</p>
    `;
    elements.factsGrid.appendChild(card);
  });
}

function renderGame() {
  if (!hasGameUI()) {
    return;
  }

  renderStats();
  renderQuestion();
  if (state.answered === FACTS.length) {
    completeRun();
  }
}

function submitAnswer(option) {
  if (state.mode !== "question") {
    return;
  }

  const fact = FACTS[state.currentId];
  const correct = option === fact.answer;

  state.streak = correct ? state.streak + 1 : 0;
  state.bestStreak = Math.max(state.bestStreak, state.streak);
  state.answered += 1;
  state.queue = state.queue.filter((id) => id !== state.currentId);
  state.mode = "feedback";
  state.completed = state.answered === FACTS.length;
  if (state.completed) {
    state.wins += 1;
  }
  state.lastResult = {
    selected: option,
    correct
  };

  saveState();
  renderGame();
}

function nextQuestion() {
  if (state.completed) {
    completeRun();
    return;
  }

  state.currentId = state.queue[0];
  state.currentOptions = buildOptionOrder(state.currentId, state.cycle, state.dayKey);
  state.mode = "question";
  state.lastResult = null;
  saveState();
  renderGame();
}

function searchFacts() {
  const term = elements.factSearch.value.trim().toLowerCase();
  if (!term) {
    renderArchive();
    return;
  }

  const filtered = FACTS.map((fact, index) => ({ fact, originalIndex: index + 1 })).filter(({ fact }) => {
    return [fact.category, fact.question, fact.answer, fact.detail]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });

  renderArchive(filtered);
}

let state = loadState();

if (elements.continueButton) {
  elements.continueButton.addEventListener("click", nextQuestion);
}

if (elements.restartButton) {
  elements.restartButton.addEventListener("click", resetCycle);
}

if (elements.winnerRestartButton) {
  elements.winnerRestartButton.addEventListener("click", resetCycle);
}

if (elements.winnerCloseButton) {
  elements.winnerCloseButton.addEventListener("click", () => {
    window.location.href = "about.html";
  });
}

if (elements.factSearch) {
  elements.factSearch.addEventListener("input", searchFacts);
}

renderGame();
renderArchive();
