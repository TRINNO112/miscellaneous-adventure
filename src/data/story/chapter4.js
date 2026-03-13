export const chapter4Scenes = {
    chapter_4_start: {
        id: "chapter_4_start",
        title: "Bureau HQ — Morning",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "system", text: "CHAPTER 4: INTERNAL AFFAIRS" },
            { speaker: "system", text: "72 HOURS AFTER THE VELVET NOOSE OPERATION." },
            { speaker: "player", text: "Something's wrong. I can feel it the moment I walk into the office." },
            { speaker: "player", text: "The usual morning chatter is gone. People are whispering. A few of them glance at me and look away too fast." },
            { speaker: "karen", text: "{playerName}? Director Rathore wants to see you. Immediately. Conference Room B." },
            { speaker: "player", text: "Karen from HR. She's smiling, but it's that smile people wear at funerals." },
            { speaker: "player", text: "Director Rathore. The man who runs this entire sector. I've never even seen him in person — just his name on memos and his signature on termination letters." },
            { speaker: "player", text: "Shit." }
        ],
        nextScene: "chapter_4_hallway"
    },
    chapter_4_hallway: {
        id: "chapter_4_hallway",
        title: "Bureau HQ — Hallway",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "player", text: "The walk to Conference Room B feels like a death march." },
            { speaker: "player", text: "I pass Vance's office. He's not there. That's unusual. That man lives at his desk." },
            { speaker: "player", text: "Maya catches my eye from across the bullpen. She gives me a look — half concern, half 'told you so.'" },
            { speaker: "player", text: "I push open the door to Conference Room B." },
            { speaker: "system", text: "DIRECTOR RATHORE IS PRESENT. SEATED. WAITING." }
        ],
        nextScene: "chapter_4_rathore_meeting"
    },
    chapter_4_rathore_meeting: {
        id: "chapter_4_rathore_meeting",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "rathore", text: "Ah. {playerName}. Please, sit." },
            { speaker: "player", text: "He's older than I expected. Silver hair, perfectly pressed suit, eyes like a hawk watching a mouse." },
            { speaker: "rathore", text: "I've been reviewing your file. Impressive exam scores. Quick fieldwork results. Vance speaks... adequately of you." },
            { speaker: "rathore", text: "But I didn't call you here to discuss your resume." },
            { speaker: "rathore", text: "I called you here to discuss your visit to The Velvet Noose." }
        ],
        nextScene: "chapter_4_rathore_branch"
    },
    // This scene dynamically branches based on inventory
    chapter_4_rathore_branch: {
        id: "chapter_4_rathore_branch",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "rathore", text: "Tell me exactly what happened. And don't bullshit me. I have sources everywhere." }
        ],
        choices: [
            {
                label: "I seized Sal's financial records as evidence. It's all by the book.",
                nextScene: "chapter_4_honest_report",
                statChanges: { integrity: 5, reputation: 5 },
                requiresItem: "sal_ledger"
            },
            {
                label: "The operation went smoothly. Nothing unusual to report.",
                nextScene: "chapter_4_lie_report",
                statChanges: { integrity: -10, reputation: -5 },
                requiresItem: "dirty_cash"
            },
            {
                label: "I took his money. And I'd do it again. This job doesn't pay enough for the risks.",
                nextScene: "chapter_4_confession",
                statChanges: { integrity: 5, reputation: -20 },
                requiresItem: "dirty_cash"
            },
            {
                label: "[FALLBACK] I completed the assignment. Here's my report.",
                nextScene: "chapter_4_neutral_report",
                statChanges: { reputation: 2 }
            }
        ]
    },
    chapter_4_honest_report: {
        id: "chapter_4_honest_report",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "player", text: "I lay the ledger on the table. Every page, every fraudulent entry, documented and tagged." },
            { speaker: "rathore", text: "..." },
            { speaker: "rathore", text: "Impressive. Most rookies either come back empty-handed or don't come back at all." },
            { speaker: "rathore", text: "This ledger alone could put Moretti away for a decade. You've done the Bureau a significant service." },
            { speaker: "player", text: "Thank you, sir." },
            { speaker: "rathore", text: "Don't thank me yet. Success paints a target on your back in this organization. Not everyone here wants cases to be solved." },
            { speaker: "rathore", text: "Some people profit from the chaos. Remember that." }
        ],
        nextScene: "chapter_4_maya_reaction"
    },
    chapter_4_lie_report: {
        id: "chapter_4_lie_report",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "player", text: "It was straightforward, sir. Moretti cooperated. I filed the standard compliance forms." },
            { speaker: "rathore", text: "Is that so?" },
            { speaker: "rathore", text: "Because my sources tell me Moretti was seen celebrating last night. Bought a round of $500 champagne for his entire staff." },
            { speaker: "rathore", text: "People don't celebrate after being served by the Bureau. They panic. They call lawyers. They don't pop bottles." },
            { speaker: "player", text: "My blood runs cold. He knows. He fucking knows." },
            { speaker: "rathore", text: "I'm going to ask you one more time, {playerName}. And I suggest you think very carefully before you answer." },
            { speaker: "rathore", text: "What. Happened. At the club." }
        ],
        choices: [
            {
                label: "Come clean. Admit everything.",
                nextScene: "chapter_4_confession_late",
                statChanges: { integrity: 10, reputation: -15 }
            },
            {
                label: "Double down on the lie. \"I told you — nothing happened.\"",
                nextScene: "chapter_4_double_down",
                statChanges: { integrity: -15, reputation: -10 }
            }
        ]
    },
    chapter_4_confession: {
        id: "chapter_4_confession",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "rathore", text: "..." },
            { speaker: "rathore", text: "You have either the biggest balls or the smallest brain in this entire department." },
            { speaker: "rathore", text: "Do you have any idea what happens to officers who accept bribes? You don't just lose your badge. You lose everything." },
            { speaker: "player", text: "I know, sir. But I'd rather tell you the truth than have you find out from someone else." },
            { speaker: "rathore", text: "Hand over the money. All of it. Now." },
            { speaker: "player", text: "I pull the envelope from my bag and place it on the table." },
            { speaker: "rathore", text: "You're on probation. One more incident and you're done. Not transferred — done. As in, you'll never work in government again." },
            { speaker: "rathore", text: "But... I respect the honesty. That takes guts. Stupid guts, but guts nonetheless." }
        ],
        removeItem: "dirty_cash",
        nextScene: "chapter_4_maya_reaction"
    },
    chapter_4_confession_late: {
        id: "chapter_4_confession_late",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "player", text: "...He offered me fifty grand. And I took it." },
            { speaker: "rathore", text: "I know. I've known since the moment you walked out of that club." },
            { speaker: "rathore", text: "The fact that you lied to my face first makes this significantly worse. Hand over the money." },
            { speaker: "player", text: "I surrender the envelope. My career is hanging by a thread." },
            { speaker: "rathore", text: "You're on severe probation. One more misstep — and I mean anything — and I will personally escort you out of this building." }
        ],
        removeItem: "dirty_cash",
        statChanges: { integrity: 3 },
        nextScene: "chapter_4_maya_reaction"
    },
    chapter_4_double_down: {
        id: "chapter_4_double_down",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "player", text: "I'm telling you the truth, sir. The operation was clean." },
            { speaker: "rathore", text: "..." },
            { speaker: "rathore", text: "I see." },
            { speaker: "rathore", text: "Then you won't mind if we search your locker and personal effects? Standard procedure for field operations, of course." },
            { speaker: "player", text: "My stomach drops. The money is in my bag. Right here. Under the table." },
            { speaker: "rathore", text: "Karen, please call security." },
            { speaker: "system", text: "CRITICAL: INTEGRITY THRESHOLD BREACHED. TRUST LEVEL: ZERO." }
        ],
        nextScene: "chapter_4_game_over_fired"
    },
    chapter_4_game_over_fired: {
        id: "chapter_4_game_over_fired",
        title: "Bureau HQ — Security Office",
        background: "/images/backgrounds/office_stale.png",
        type: "game_over",
        reason: "TERMINATED: Director Rathore discovered the bribe money during a mandatory search. Your Bureau credentials have been revoked. Your name has been flagged in the federal database. The apartment in the woods will remain a dream.",
        restartScene: "chapter_4_start",
        dialogue: [
            { speaker: "system", text: "ENTITY STATUS: TERMINATED." },
            { speaker: "system", text: "REASON: CORRUPTION AND DECEPTION. LYING TO A DIRECTOR." },
            { speaker: "system", text: "BUREAU PROTOCOL 77-B: IMMEDIATE DISMISSAL AND BLACKLIST." },
            { speaker: "rathore", text: "You had potential, {playerName}. What a goddamn waste." }
        ]
    },
    chapter_4_neutral_report: {
        id: "chapter_4_neutral_report",
        title: "Conference Room B",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "player", text: "I hand over my field report. Standard form, standard language." },
            { speaker: "rathore", text: "Hmm. By the book. Clean. Unremarkable." },
            { speaker: "rathore", text: "I suppose 'unremarkable' is the best one can hope for from a rookie." },
            { speaker: "rathore", text: "Very well. You're cleared. But I'll be watching your next assignments closely." },
            { speaker: "player", text: "Understood, sir." }
        ],
        nextScene: "chapter_4_maya_reaction"
    },
    chapter_4_maya_reaction: {
        id: "chapter_4_maya_reaction",
        title: "Bureau HQ — Bullpen",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "player", text: "I step out of the conference room. My legs feel like jelly." },
            { speaker: "maya", text: "Hey. You okay? You look like you just saw your own autopsy report." },
            { speaker: "player", text: "Just had a chat with Rathore." },
            { speaker: "maya", text: "Yikes. Nobody has a 'chat' with Rathore. That man conducts interrogations disguised as conversations." }
        ],
        choices: [
            {
                label: "He's intense. But fair, I think. I can work with that.",
                nextScene: "chapter_4_maya_trust",
                statChanges: { integrity: 2, reputation: 3 }
            },
            {
                label: "Something about him felt off. Like he's hiding something too.",
                nextScene: "chapter_4_maya_suspicion",
                statChanges: { integrity: 3, influence: 3 }
            },
            {
                label: "[REQUIRES: 10 INFLUENCE] \"Maya, what do you actually know about Rathore's background?\"",
                nextScene: "chapter_4_maya_secret",
                statChanges: { influence: 5, integrity: 2 },
                requires: { stat: "influence", min: 10 }
            }
        ]
    },
    chapter_4_maya_trust: {
        id: "chapter_4_maya_trust",
        title: "Bureau HQ — Bullpen",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "maya", text: "Fair? Rathore doesn't do 'fair.' He does 'useful.' If you're useful to him, you survive. If not..." },
            { speaker: "maya", text: "Just keep your head down and your records clean. That's the only advice that matters here." },
            { speaker: "player", text: "She squeezes my shoulder and walks back to her desk. I watch her go." },
            { speaker: "player", text: "In a place like this, trust is the most dangerous currency." }
        ],
        nextScene: "chapter_4_end"
    },
    chapter_4_maya_suspicion: {
        id: "chapter_4_maya_suspicion",
        title: "Bureau HQ — Bullpen",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "maya", text: "Careful with that kind of talk. Walls have ears in this building. And the ears have ears." },
            { speaker: "maya", text: "But... you're not wrong. There are rumors. Things that don't add up in the budget reports." },
            { speaker: "maya", text: "Just... don't go digging unless you're prepared for what you might find." },
            { speaker: "player", text: "Noted." },
            { speaker: "player", text: "But something in the back of my mind won't let it go. If Rathore is dirty, then this whole Bureau is built on quicksand." }
        ],
        nextScene: "chapter_4_end"
    },
    chapter_4_maya_secret: {
        id: "chapter_4_maya_secret",
        title: "Bureau HQ — Bullpen",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "maya", text: "Whoa. You don't mess around, do you?" },
            { speaker: "maya", text: "Look... I shouldn't be telling you this. But before Rathore became Director, he was a field agent. The best one this Bureau ever had." },
            { speaker: "maya", text: "But there's a gap in his record. Three years. Completely redacted. Nobody knows what he did during that time." },
            { speaker: "maya", text: "Some people say he was undercover with the exact kind of people we're supposed to be catching." },
            { speaker: "maya", text: "And the scariest part? The people who ask too many questions about those three years... they get transferred. Every single one." },
            { speaker: "player", text: "Jesus." },
            { speaker: "maya", text: "Yeah. So maybe keep that influence of yours pointed at the right targets, okay?" },
            { speaker: "system", text: "INTELLIGENCE UNLOCKED: RATHORE'S REDACTED YEARS. THIS INFORMATION MAY BE RELEVANT IN FUTURE CHAPTERS." }
        ],
        addItem: "rathore_intel",
        nextScene: "chapter_4_end"
    },
    chapter_4_end: {
        id: "chapter_4_end",
        title: "Bureau HQ — Parking Lot",
        background: "/images/backgrounds/city_haze.png",
        dialogue: [
            { speaker: "player", text: "I sit in the department car for a long time. Engine off. Windows up. Just thinking." },
            { speaker: "player", text: "Every day in this place, I feel the walls closing in a little tighter. The rules get blurrier. The lines I swore I'd never cross keep moving." },
            { speaker: "player", text: "But I'm still here. Still standing. And that apartment in the woods... it's still out there waiting for me." },
            { speaker: "player", text: "I just have to survive long enough to earn it." },
            { speaker: "system", text: "CHAPTER 4: INTERNAL AFFAIRS — COMPLETED." },
            { speaker: "system", text: "CLEARANCE LEVEL UPDATED. NEW ASSIGNMENTS PENDING." }
        ],
        nextScene: "chapter_5_start"
    }
};
