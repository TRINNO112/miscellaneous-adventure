export const chapter3Scenes = {
    chapter_3_start: {
        id: "chapter_3_start",
        title: "Back at the Office",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "system", text: "CHAPTER 3: THE RAT'S NEST" },
            { speaker: "player", text: "Two weeks in. I've collected from Greasy Pete and three other small-timers. But Vance isn't impressed." },
            { speaker: "player", text: "He's sitting at his desk, that permanent scowl carved into his face like someone sculpted it out of disappointment." },
            { speaker: "vance", text: "{playerName}. Sit down. We need to talk about your next assignment." },
            { speaker: "vance", text: "You've been handling the bottom-feeders. Small fish. Congratulations, you can bully auto mechanics. Real impressive." },
            { speaker: "player", text: "I bite my tongue. This prick has no idea how hard I worked on those cases." },
            { speaker: "vance", text: "Tonight, you're going after a real target. Salvatore 'The Ledger' Moretti. Runs a nightclub called The Velvet Noose in the east district." },
            { speaker: "vance", text: "He's laundering money through the club — fake receipts, phantom employees, the works. Owes the Bureau roughly $2.3 million in back taxes." },
            { speaker: "player", text: "$2.3 million? That's not a tax case, that's a damn operation." },
            { speaker: "vance", text: "Yeah, well, operations are expensive and we're understaffed. So you're the operation. Don't screw this up." }
        ],
        nextScene: "chapter_3_maya_intro"
    },
    chapter_3_maya_intro: {
        id: "chapter_3_maya_intro",
        title: "The Hallway",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "player", text: "I step out of Vance's office, clutching another thick file. My hands are actually shaking a little." },
            { speaker: "maya", text: "Hey. You're the new blood, right? {playerName}?" },
            { speaker: "player", text: "I turn around. A woman about my age, sharp eyes, Bureau badge. She's got that look — like she's already sizing me up." },
            { speaker: "maya", text: "I'm Maya. Officer Maya Chen. Started six months before you. Word of advice? Don't go to Sal's place alone." },
            { speaker: "maya", text: "That guy's got connections. Real ones. Not the 'my uncle is a lawyer' type. The 'people disappear' type." },
            { speaker: "player", text: "Great. That's exactly what I needed to hear before my first night assignment." },
            { speaker: "maya", text: "I'm serious. Last guy they sent came back and quit the next day. Didn't even clean out his desk. Just... left." }
        ],
        choices: [
            { label: "Thanks for the heads up, Maya. I appreciate it.", nextScene: "chapter_3_maya_friendly", statChanges: { integrity: 3, reputation: 2 } },
            { label: "I can handle myself. I don't need a babysitter.", nextScene: "chapter_3_maya_cold", statChanges: { reputation: -3, integrity: -1 } },
            { label: "Shit. Want to come with me? Could use backup.", nextScene: "chapter_3_maya_partner", statChanges: { reputation: 5, integrity: 2 } }
        ]
    },
    chapter_3_maya_friendly: {
        id: "chapter_3_maya_friendly",
        title: "The Hallway",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "maya", text: "Don't mention it. We're all drowning in the same bureaucratic hellhole. Might as well throw each other a lifeline." },
            { speaker: "maya", text: "Here — take my number. If things go south at the club, call me. I'll be your extraction plan." },
            { speaker: "player", text: "I pocket the number. First ally in this godforsaken place. That's worth more than any stat bonus." }
        ],
        addItem: "maya_number",
        nextScene: "chapter_3_travel"
    },
    chapter_3_maya_cold: {
        id: "chapter_3_maya_cold",
        title: "The Hallway",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "maya", text: "Wow. Okay, tough guy. Good luck out there." },
            { speaker: "player", text: "She walks away. Maybe I was too harsh. But I can't afford to look weak in this place." },
            { speaker: "player", text: "Every person here is either a stepping stone or a dead weight. I need to figure out which one Maya is." }
        ],
        nextScene: "chapter_3_travel"
    },
    chapter_3_maya_partner: {
        id: "chapter_3_maya_partner",
        title: "The Hallway",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "maya", text: "Ha! Bold of you to ask. But no — Vance specifically said solo assignment. Bureau policy for first night ops." },
            { speaker: "maya", text: "But here, take my number. Anything goes wrong, I'll haul ass down there." },
            { speaker: "player", text: "Appreciated. Genuinely." },
            { speaker: "maya", text: "Don't get sentimental. Just don't die. The paperwork for dead rookies is insane." }
        ],
        addItem: "maya_number",
        nextScene: "chapter_3_travel"
    },
    chapter_3_travel: {
        id: "chapter_3_travel",
        title: "East District",
        background: "/images/backgrounds/city_night.png",
        dialogue: [
            { speaker: "system", text: "LOCATION UPDATE: EAST DISTRICT — NIGHTLIFE ZONE." },
            { speaker: "player", text: "9:47 PM. The east district is a different world after dark." },
            { speaker: "player", text: "Neon signs bleeding color onto wet pavement. Bass thumping from every other building. The air smells like cigarettes, cheap cologne, and bad decisions." },
            { speaker: "player", text: "I spot the sign: THE VELVET NOOSE. Classy name for a money laundering front." },
            { speaker: "player", text: "Two bouncers at the door. Each one built like a refrigerator with anger issues." },
            { speaker: "player", text: "I straighten my collar, grip the file, and walk up like I own the goddamn street." }
        ],
        nextScene: "chapter_3_entrance"
    },
    chapter_3_entrance: {
        id: "chapter_3_entrance",
        title: "The Velvet Noose — Entrance",
        background: "/images/backgrounds/nightclub.png",
        dialogue: [
            { speaker: "player", text: "Bureau of Digital Regulation. I need to speak with Salvatore Moretti. Now." },
            { speaker: "system", text: "BOUNCER stares blankly. Does not move." },
            { speaker: "player", text: "The bouncer looks at me like I just asked him to solve a differential equation." },
            { speaker: "player", text: "I said — Bureau of Digital Regulation. Tax enforcement. Open the door or I'll have this place shut down by morning." },
            { speaker: "system", text: "BOUNCER steps aside. Reluctantly." },
            { speaker: "player", text: "The inside is exactly what I expected. Purple velvet everywhere, overpriced drinks, and people pretending they're more important than they are." },
            { speaker: "player", text: "And there he is. Back booth. Gold rings on every finger. Sal 'The Ledger' Moretti." }
        ],
        nextScene: "chapter_3_sal_confrontation"
    },
    chapter_3_sal_confrontation: {
        id: "chapter_3_sal_confrontation",
        title: "The Velvet Noose — VIP Booth",
        background: "/images/backgrounds/nightclub.png",
        dialogue: [
            { speaker: "sal", text: "Well, well. The Bureau sends a baby to do a man's job. Sit down, kid. Have a drink." },
            { speaker: "player", text: "I'm not here to drink, Sal. I'm here about the $2.3 million you owe in back taxes." },
            { speaker: "sal", text: "Taxes? Ha! That's funny. You know what else is funny? The last three agents who came in here with that same bullshit." },
            { speaker: "sal", text: "One of them is selling insurance now. Another one moved to a different country. The third one... well, let's just say he found a new career in silence." },
            { speaker: "player", text: "My heart is pounding but I keep my face stone cold. This bastard is trying to scare me." },
            { speaker: "sal", text: "So here's what's gonna happen, kid. You're gonna finish that complimentary water, walk your ass out of my club, and tell your boss that Sal's books are clean." },
            { speaker: "sal", text: "Or..." },
            { speaker: "sal", text: "We can have a different kind of conversation. One that involves numbers with a lot of zeros. Zeros that end up in your pocket." },
            { speaker: "system", text: "CRITICAL DECISION POINT. SUBJECT OFFERING BRIBE." }
        ],
        choices: [
            {
                label: "Take the bribe. Fuck it, I deserve to get paid.",
                nextScene: "chapter_3_bribe",
                statChanges: { integrity: -20, influence: 10 },
                addItem: "dirty_cash"
            },
            {
                label: "Seize his ledger. I didn't come here to play games.",
                nextScene: "chapter_3_seize",
                statChanges: { integrity: 10, reputation: 10 },
                addItem: "sal_ledger"
            },
            {
                label: "[REQUIRES: 60 REPUTATION] Threaten to burn his entire operation to the ground.",
                nextScene: "chapter_3_intimidate",
                statChanges: { reputation: 15, integrity: -5, influence: 8 },
                requires: { stat: "reputation", min: 60 }
            },
            {
                label: "[REQUIRES: 40 INTEGRITY] Appeal to reason. Negotiate a payment plan like a professional.",
                nextScene: "chapter_3_negotiate",
                statChanges: { integrity: 8, reputation: 5 },
                requires: { stat: "integrity", min: 40 }
            }
        ]
    },
    chapter_3_bribe: {
        id: "chapter_3_bribe",
        title: "The Velvet Noose — VIP Booth",
        background: "/images/backgrounds/nightclub.png",
        dialogue: [
            { speaker: "player", text: "How much are we talking?" },
            { speaker: "sal", text: "Now you're speaking my language." },
            { speaker: "sal", text: "Fifty grand. Cash. Untraceable. You walk out of here, file a report saying my books are clean, and everybody's happy." },
            { speaker: "player", text: "I look at the envelope he slides across the table. Fifty thousand dollars. That's half a year's salary sitting right there." },
            { speaker: "player", text: "My apartment in the woods flashes through my mind. The peace. The independence. This money gets me closer." },
            { speaker: "player", text: "I take the envelope. It's heavier than I expected. Or maybe that's just my conscience." },
            { speaker: "sal", text: "Smart kid. You'll go far in this town. Now get the hell out of my club." },
            { speaker: "system", text: "ITEM ACQUIRED: DIRTY CASH ($50,000). INTEGRITY SEVERELY COMPROMISED." },
            { speaker: "player", text: "I walk out into the cold night air. The envelope burns in my jacket pocket like a hot coal." },
            { speaker: "player", text: "What the fuck did I just do?" }
        ],
        nextScene: "chapter_3_end"
    },
    chapter_3_seize: {
        id: "chapter_3_seize",
        title: "The Velvet Noose — VIP Booth",
        background: "/images/backgrounds/nightclub.png",
        dialogue: [
            { speaker: "player", text: "Keep your dirty money, Sal. I want your books. All of them. Right now." },
            { speaker: "sal", text: "You've got balls, kid. I'll give you that. But you're making a very stupid mistake." },
            { speaker: "player", text: "I slam Form 94-C on the table. Emergency asset seizure warrant. Signed by Judge Morrison herself." },
            { speaker: "player", text: "This form gives me the legal authority to seize any and all financial documents on these premises. You can cooperate, or I can come back with federal marshals." },
            { speaker: "sal", text: "You little shit..." },
            { speaker: "player", text: "Your choice, Sal. The easy way or the front-page-news way." },
            { speaker: "sal", text: "Fine. FINE. Take the damn ledger. But remember my face, kid. Because I'll remember yours." },
            { speaker: "system", text: "ITEM ACQUIRED: SAL'S LEDGER. EVIDENCE SECURED." },
            { speaker: "player", text: "I tuck the ledger under my arm and walk out without looking back. My hands are shaking, but my spine is steel." }
        ],
        nextScene: "chapter_3_end"
    },
    chapter_3_intimidate: {
        id: "chapter_3_intimidate",
        title: "The Velvet Noose — VIP Booth",
        background: "/images/backgrounds/nightclub.png",
        dialogue: [
            { speaker: "player", text: "I lean across the table, close enough to smell his overpriced cologne." },
            { speaker: "player", text: "Listen to me very carefully, you money-laundering piece of shit." },
            { speaker: "player", text: "I don't just have the tax code behind me. I have three ongoing investigations, two federal contacts, and enough dirt on your phantom employee scheme to bury you for twenty years." },
            { speaker: "player", text: "You think you can scare me with your bouncer boys and your veiled threats? I've been threatened by better men than you before breakfast." },
            { speaker: "sal", text: "..." },
            { speaker: "sal", text: "You... you're bluffing." },
            { speaker: "player", text: "Try me. By tomorrow morning, I can have every account you own frozen. Every property seized. Every associate questioned." },
            { speaker: "player", text: "Or you can hand over the ledger, sign the payment plan, and I'll recommend leniency. Your call." },
            { speaker: "sal", text: "Jesus Christ. Fine. Take the ledger. Take whatever you want. Just get the hell out." },
            { speaker: "system", text: "ITEM ACQUIRED: SAL'S LEDGER. SUBJECT NEUTRALIZED VIA PSYCHOLOGICAL PRESSURE." }
        ],
        addItem: "sal_ledger",
        nextScene: "chapter_3_end"
    },
    chapter_3_negotiate: {
        id: "chapter_3_negotiate",
        title: "The Velvet Noose — VIP Booth",
        background: "/images/backgrounds/nightclub.png",
        dialogue: [
            { speaker: "player", text: "Sal, let me be straight with you. I'm not here to shut you down. I'm here to find a solution." },
            { speaker: "sal", text: "A solution? That's a new one from you Bureau types." },
            { speaker: "player", text: "$2.3 million is a lot. But if we set up a structured payment plan over 5 years, with quarterly audits, you keep your business and we keep our numbers clean." },
            { speaker: "player", text: "Nobody goes to jail. Nobody loses their livelihood. The Bureau gets its money. You keep your club." },
            { speaker: "sal", text: "Huh. You're not like the others. They come in here swinging their dicks around, trying to prove something." },
            { speaker: "sal", text: "You're actually trying to do your job properly. That's... rare." },
            { speaker: "sal", text: "Alright, kid. You've got yourself a deal. But I want it in writing, and I want my lawyer to review it." },
            { speaker: "player", text: "Done. I'll have the documents ready by end of week." },
            { speaker: "sal", text: "You know what? Here. Take a copy of my real books. Show your boss you did your homework. Consider it a goodwill gesture." },
            { speaker: "system", text: "ITEM ACQUIRED: SAL'S LEDGER (VOLUNTARY SURRENDER). DIPLOMATIC RESOLUTION." }
        ],
        addItem: "sal_ledger",
        nextScene: "chapter_3_end"
    },
    chapter_3_end: {
        id: "chapter_3_end",
        title: "East District — Outside",
        background: "/images/backgrounds/city_night.png",
        dialogue: [
            { speaker: "player", text: "The cold night air hits me like a slap. My heart rate is finally coming down." },
            { speaker: "player", text: "One thing's for sure — this job is nothing like the textbooks. Nothing like the exams. Out here, every choice has weight." },
            { speaker: "player", text: "And I'm starting to realize that the person I become in this Bureau might not be the person I wanted to be." },
            { speaker: "system", text: "CHAPTER 3: THE RAT'S NEST — COMPLETED." },
            { speaker: "system", text: "YOUR CHOICES HAVE BEEN LOGGED. DIRECTOR RATHORE HAS BEEN NOTIFIED." }
        ],
        nextScene: "chapter_4_start"
    }
};
