export const chapter5Scenes = {
    chapter_5_start: {
        id: "chapter_5_start",
        title: "Bureau HQ — Friday Evening",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "system", text: "CHAPTER 5: THE WOODS" },
            { speaker: "system", text: "FRIDAY, 5:47 PM. END OF SHIFT." },
            { speaker: "player", text: "Three months in. I've survived Greasy Pete, Sal's nightclub, and Director Rathore's death stare." },
            { speaker: "player", text: "And for the first time since I started this godforsaken job, I have a weekend off." },
            { speaker: "vance", text: "Don't look so happy, {playerName}. Happiness is a sign of complacency." },
            { speaker: "player", text: "Wouldn't dream of it, sir." },
            { speaker: "vance", text: "...Get out of here before I change my mind and assign you a Saturday audit." },
            { speaker: "player", text: "I grab my jacket and I'm out the door before he can finish the sentence." }
        ],
        nextScene: "chapter_5_drive"
    },
    chapter_5_drive: {
        id: "chapter_5_drive",
        title: "Highway — Heading North",
        background: "/images/backgrounds/city_haze.png",
        dialogue: [
            { speaker: "player", text: "I've been driving for two hours. The city skyline is long gone, replaced by trees. Real trees. Not the decorative bullshit they plant outside government buildings." },
            { speaker: "player", text: "I found a listing online. A small cabin, deep in the woods, thirty minutes from the nearest town. Affordable. Isolated. Perfect." },
            { speaker: "player", text: "I know I can't buy it yet. Not on a junior officer's salary. But I need to see it. I need to know it's real." },
            { speaker: "player", text: "The road narrows. Asphalt turns to gravel. The GPS signal dies." },
            { speaker: "player", text: "Good. That's exactly what I want." }
        ],
        nextScene: "chapter_5_cabin"
    },
    chapter_5_cabin: {
        id: "chapter_5_cabin",
        title: "The Cabin",
        background: "/images/backgrounds/dark_void.png",
        dialogue: [
            { speaker: "player", text: "There it is. Sitting in a clearing, surrounded by pines. A small wooden cabin with a rusted tin roof." },
            { speaker: "player", text: "It's not luxury. It's not Instagram-worthy. It's perfect." },
            { speaker: "player", text: "I step out of the car. The silence hits me like a physical thing. No traffic, no phones ringing, no Karen from HR asking me to fill out Form 11-B." },
            { speaker: "player", text: "Just wind through the trees. Birds. My own breathing." },
            { speaker: "player", text: "This is what I've been working for. This feeling right here." },
            { speaker: "system", text: "ALERT: SMOKE DETECTED — 200 METERS NORTH. ANOTHER STRUCTURE NEARBY." }
        ],
        choices: [
            {
                label: "Investigate the smoke. Could be a neighbor.",
                nextScene: "chapter_5_hermit",
                statChanges: { integrity: 2 }
            },
            {
                label: "Ignore it. I came here for solitude, not socializing.",
                nextScene: "chapter_5_solitude",
                statChanges: { integrity: -1 }
            }
        ]
    },
    chapter_5_hermit: {
        id: "chapter_5_hermit",
        title: "The Clearing — North",
        background: "/images/backgrounds/dark_void.png",
        dialogue: [
            { speaker: "player", text: "I follow the smoke through the trees. After a few minutes, I find another cabin. Smaller. Older. More lived-in." },
            { speaker: "player", text: "An old man is sitting on the porch, whittling something out of wood. He looks up at me with zero surprise, like he's been expecting me." },
            { speaker: "hermit", text: "Government plates on that car of yours. You lost, son?" },
            { speaker: "player", text: "Not lost. Just... looking around." },
            { speaker: "hermit", text: "Hm. 'Looking around' is what they said last time too. Before they sent the tax notice." },
            { speaker: "player", text: "My stomach tightens. Tax notice. Of course." },
            { speaker: "hermit", text: "Name's Earl. I've lived in these woods for thirty-two years. Built this cabin with my own hands. Never asked the government for a damn thing." },
            { speaker: "hermit", text: "And now they want me to pay property tax on land my family's owned since before the Bureau even existed." },
            { speaker: "hermit", text: "So what are you, son? Here to collect? Or here to be human?" }
        ],
        choices: [
            {
                label: "I'm off duty, Earl. Just a guy looking at a cabin. That's all.",
                nextScene: "chapter_5_human",
                statChanges: { integrity: 10, reputation: -5 }
            },
            {
                label: "Technically, you do owe back taxes. But I'm not here for that. Not today.",
                nextScene: "chapter_5_honest",
                statChanges: { integrity: 5, reputation: 2 }
            },
            {
                label: "You owe the Bureau money, old man. Nobody gets a free pass.",
                nextScene: "chapter_5_enforce",
                statChanges: { integrity: -10, reputation: 10 }
            }
        ]
    },
    chapter_5_human: {
        id: "chapter_5_human",
        title: "Earl's Porch",
        background: "/images/backgrounds/dark_void.png",
        dialogue: [
            { speaker: "hermit", text: "...Huh. Didn't expect that from a suit." },
            { speaker: "hermit", text: "Sit down, then. I just made coffee. It's shit coffee, but it's hot." },
            { speaker: "player", text: "I sit on the creaky porch step. Earl hands me a chipped mug. The coffee is, indeed, terrible. But somehow it's the best thing I've tasted in months." },
            { speaker: "hermit", text: "You know, I see a lot of you government types drive up here. Always in a hurry. Always chasing something." },
            { speaker: "hermit", text: "But you... you've got that look. The one that says you're running FROM something, not TO something." },
            { speaker: "player", text: "Maybe. Or maybe I'm just trying to find a place where the noise stops." },
            { speaker: "hermit", text: "The noise never stops, son. You just learn to hear the silence between the sounds." },
            { speaker: "player", text: "We sit there for an hour. Not talking much. Just... existing. It's the most peaceful hour I've had since I started at the Bureau." },
            { speaker: "player", text: "Earl doesn't ask about my job. I don't ask about his taxes. For sixty minutes, we're just two people on a porch in the woods." }
        ],
        nextScene: "chapter_5_reflection"
    },
    chapter_5_honest: {
        id: "chapter_5_honest",
        title: "Earl's Porch",
        background: "/images/backgrounds/dark_void.png",
        dialogue: [
            { speaker: "hermit", text: "Well, at least you're honest about it. Most of your kind pretend they 'didn't notice' the government plates." },
            { speaker: "hermit", text: "Sit down. Let me tell you something about these woods." },
            { speaker: "hermit", text: "My grandfather built the first cabin here in 1952. We've survived floods, fires, and three different administrations trying to 'develop' this land." },
            { speaker: "hermit", text: "And now some kid in a cheap suit tells me I owe money for living on my own damn property." },
            { speaker: "player", text: "The system isn't perfect, Earl. But it's what we've got." },
            { speaker: "hermit", text: "Ha! That's what they always say right before the system screws you." },
            { speaker: "hermit", text: "But you seem alright, kid. Different from the others. Want some coffee?" },
            { speaker: "player", text: "Sure." },
            { speaker: "player", text: "We talk for a while. About the woods, about the Bureau, about life. It's... nice. Normal. Human." }
        ],
        nextScene: "chapter_5_reflection"
    },
    chapter_5_enforce: {
        id: "chapter_5_enforce",
        title: "Earl's Porch",
        background: "/images/backgrounds/dark_void.png",
        dialogue: [
            { speaker: "hermit", text: "...Damn." },
            { speaker: "hermit", text: "Thirty-two years in these woods. And they send kids who can't even grow a proper beard to tell me I owe money for breathing." },
            { speaker: "hermit", text: "You know what, son? Take your government plates and get off my land. Before I forget my manners." },
            { speaker: "player", text: "The old man stands up. He's bigger than I thought. And he's not shaking from age — he's shaking from anger." },
            { speaker: "player", text: "I came here for peace. Instead, I brought the Bureau with me. Like a disease I can't shake." },
            { speaker: "player", text: "I walk back to my car without another word. The silence of the woods feels different now. Colder. Accusatory." }
        ],
        nextScene: "chapter_5_reflection"
    },
    chapter_5_solitude: {
        id: "chapter_5_solitude",
        title: "The Cabin",
        background: "/images/backgrounds/dark_void.png",
        dialogue: [
            { speaker: "player", text: "Not my problem. I came here for me, not for whatever story is attached to that smoke." },
            { speaker: "player", text: "I sit on the cabin's front step. The wood is rough and warm from the afternoon sun." },
            { speaker: "player", text: "I pull out my phone. No signal. No emails. No Vance. No Rathore. No nothing." },
            { speaker: "player", text: "Just me and the sound of wind through pine needles." },
            { speaker: "player", text: "For the first time in three months, my shoulders drop. The tension I didn't even know I was carrying just... melts." },
            { speaker: "player", text: "Is this what freedom feels like? Or is this just the eye of the storm before Monday hits?" }
        ],
        nextScene: "chapter_5_reflection"
    },
    chapter_5_reflection: {
        id: "chapter_5_reflection",
        title: "The Cabin — Evening",
        background: "/images/backgrounds/dark_void.png",
        dialogue: [
            { speaker: "player", text: "The sun is setting. Orange and purple streaking across a sky with zero light pollution." },
            { speaker: "player", text: "I sit against the cabin wall and think about everything that's happened." },
            { speaker: "player", text: "Greasy Pete. Sal's nightclub. Rathore's hawk eyes. Maya's warnings. Karen's funeral smile." },
            { speaker: "player", text: "Every choice I've made has left a mark. On my record, on my stats, on my goddamn soul." },
            { speaker: "player", text: "But this cabin... this place... it reminds me why I started. Why I sat through those brutal exams. Why I endure Vance's bullshit every morning." },
            { speaker: "player", text: "Independence. Peace. A life that's mine." },
            { speaker: "player", text: "The question is: what kind of person will I be when I finally get here?" }
        ],
        nextScene: "chapter_5_ending_check"
    },
    chapter_5_ending_check: {
        id: "chapter_5_ending_check",
        title: "The Road Home",
        background: "/images/backgrounds/city_haze.png",
        dialogue: [
            { speaker: "system", text: "EVALUATING ENTITY PROFILE..." },
            { speaker: "system", text: "ANALYZING CUMULATIVE DECISIONS, INTEGRITY INDEX, AND REPUTATION METRICS..." },
            { speaker: "system", text: "GENERATING ASSESSMENT..." }
        ],
        choices: [
            {
                label: "Accept your assessment.",
                nextScene: "ending_honest_nobody",
                requires: { stat: "integrity", min: 50 },
                requiresStatBelow: { stat: "reputation", max: 40 }
            },
            {
                label: "Accept your assessment.",
                nextScene: "ending_bureaus_dog",
                requires: { stat: "reputation", min: 50 },
                requiresStatBelow: { stat: "integrity", max: 40 }
            },
            {
                label: "Accept your assessment.",
                nextScene: "ending_survivor",
                statChanges: {}
            }
        ]
    },
    ending_honest_nobody: {
        id: "ending_honest_nobody",
        title: "ENDING A",
        background: "/images/backgrounds/dark_void.png",
        type: "ending",
        dialogue: [
            { speaker: "system", text: "ENDING: THE HONEST NOBODY" },
            { speaker: "player", text: "I drive back to the city as the stars come out. The road is empty, just my headlights cutting through the dark." },
            { speaker: "player", text: "I did the right thing. Every time. Even when it cost me. Even when nobody noticed." },
            { speaker: "player", text: "My reputation at the Bureau is... unremarkable. Nobody sings my praises. Nobody recommends me for promotions. I'm the guy who plays by the rules in a place where the rules are a suggestion." },
            { speaker: "player", text: "But when I look in the mirror, I see someone I can live with. And in this world, that's worth more than any title." },
            { speaker: "player", text: "The cabin will take longer to save for. The promotions will come slower. The glory will go to louder people." },
            { speaker: "player", text: "But my integrity is intact. And in a system designed to break you, that's its own kind of victory." },
            { speaker: "system", text: "YOUR CHOICES DEFINED YOU. THE BUREAU MAY NOT REMEMBER YOUR NAME, BUT YOUR CONSCIENCE IS CLEAR." },
            { speaker: "system", text: "MISCELLANEOUS ADVENTURE — COMPLETED." },
            { speaker: "system", text: "THANK YOU FOR PLAYING." }
        ]
    },
    ending_bureaus_dog: {
        id: "ending_bureaus_dog",
        title: "ENDING B",
        background: "/images/backgrounds/dark_void.png",
        type: "ending",
        dialogue: [
            { speaker: "system", text: "ENDING: THE BUREAU'S DOG" },
            { speaker: "player", text: "I drive back to the city. The skyline glows ahead of me like a beacon. My city. My territory." },
            { speaker: "player", text: "I climbed the ladder fast. Faster than anyone expected. Vance respects me. Rathore watches me with something between admiration and fear." },
            { speaker: "player", text: "But at what cost?" },
            { speaker: "player", text: "I think about the people I bulldozed. The lines I crossed. The bribes, the threats, the moral compromises stacked like paperwork on my desk." },
            { speaker: "player", text: "I'm the Bureau's golden boy. Their most effective weapon. And that's the problem — I'm a weapon. Not a person." },
            { speaker: "player", text: "The cabin in the woods feels further away than ever. Not because I can't afford it... but because I'm not sure I deserve it anymore." },
            { speaker: "player", text: "The city swallows me back. Tomorrow, there'll be another target. Another file. Another line to cross." },
            { speaker: "player", text: "And I'll cross it. Because that's what the Bureau's dog does." },
            { speaker: "system", text: "YOUR CHOICES DEFINED YOU. THE BUREAU WILL REMEMBER YOUR NAME. BUT WILL YOU?" },
            { speaker: "system", text: "MISCELLANEOUS ADVENTURE — COMPLETED." },
            { speaker: "system", text: "THANK YOU FOR PLAYING." }
        ]
    },
    ending_survivor: {
        id: "ending_survivor",
        title: "ENDING C",
        background: "/images/backgrounds/dark_void.png",
        type: "ending",
        dialogue: [
            { speaker: "system", text: "ENDING: THE SURVIVOR" },
            { speaker: "player", text: "I drive back to the city. The road is long, and my thoughts are longer." },
            { speaker: "player", text: "I wasn't the most honest officer. I wasn't the most ruthless either. I was somewhere in the middle — adapting, surviving, doing what needed to be done." },
            { speaker: "player", text: "Some days I bent the rules. Other days I held the line. The Bureau doesn't give medals for nuance, but nuance is what kept me alive." },
            { speaker: "player", text: "Maya told me once that this job turns people into one of two things: saints or monsters. She was wrong." },
            { speaker: "player", text: "Some of us just stay human. Messy, complicated, imperfect humans doing their best in a system that doesn't care." },
            { speaker: "player", text: "The cabin is still out there. And I'll get there eventually. Not as a saint. Not as a monster. Just as me." },
            { speaker: "player", text: "And honestly? That's enough." },
            { speaker: "system", text: "YOUR CHOICES DEFINED YOU. NEITHER SAINT NOR SINNER — JUST A SURVIVOR IN A SYSTEM DESIGNED TO BREAK YOU." },
            { speaker: "system", text: "MISCELLANEOUS ADVENTURE — COMPLETED." },
            { speaker: "system", text: "THANK YOU FOR PLAYING." }
        ]
    }
};
