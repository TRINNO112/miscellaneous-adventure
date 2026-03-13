export const chapter2Scenes = {
    chapter_2_start: {
        id: "chapter_2_start",
        title: "Pete's Premium Auto",
        background: "/images/backgrounds/pete_garage.png",
        dialogue: [
            { speaker: "player", text: "I stare at the shop sign: Pete’s Premium Auto. Premium? My foot." },
            { speaker: "player", text: "I’ve spent the last hour cross-referencing his filings. The idiot claims he’s 'operating at a net loss' for the fifth year in a row." },
            { speaker: "player", text: "I step into the garage. The smell of burnt oil and cigarette smoke is thick." },
            { speaker: "player", text: "Peter 'Greasy' Pete? My name is {playerName}, Junior Recovery Officer, Bureau of Digital Regulation." },
            { speaker: "pete", text: "Another government parasite? What the hell are you doing here, kid? I don't care who the government sends, I'M NOT PAYING TAXES!" },
            { speaker: "player", text: "In the red? Interesting. Then I assume that $150,000 luxury sports car sitting in the back garage is a donation?" },
            { speaker: "pete", text: "Listen to me, you pencil-pushing nerd! That car has nothing to do with you. Get off my property before I teach you a lesson." },
            { speaker: "system", text: "TENSION LEVEL: CRITICAL. SUBJECT IS ARMED WITH CROWBAR." }
        ],
        choices: [
            { label: "Look, Pete. Let's be reasonable. I can set you up on a payment plan.", nextScene: "pete_peaceful", statChanges: { integrity: 5, reputation: -5 } },
            { label: "[Show Badge] We are the Bureau. You are going to pay the taxes, Pete.", nextScene: "pete_pressure", statChanges: { reputation: 5, integrity: -1 } },
            { label: "[Light a cigarette] Here's a meme for you, Pete: 'Tax Evasion is a Crime, Virgil.' Pay up or I repo your life.", nextScene: "pete_hostile", statChanges: { integrity: -10, reputation: 15, influence: 5 } }
        ]
    },
    pete_peaceful: {
        id: "pete_peaceful",
        title: "Pete's Premium Auto",
        background: "/images/backgrounds/pete_garage.png",
        dialogue: [
            { speaker: "pete", text: "Payment plan? Ha! You really think I'm gonna let some kid dictate my finances? I'm telling you, I ain't paying!" },
            { speaker: "player", text: "I sigh internally. Kindness was never an option. I pull out a thick stack of Form 88-B." },
            { speaker: "player", text: "Pete, this form authorizes the immediate seizure of all assets, including your precious jet skis. So either sign the payment plan, or I call the tow trucks." },
            { speaker: "pete", text: "You can't do that! That's... that's illegal!" },
            { speaker: "player", text: "I am the law, Pete. Now sign." }
        ],
        nextScene: "chapter_2_end"
    },
    pete_pressure: {
        id: "pete_pressure",
        title: "Pete's Premium Auto",
        background: "/images/backgrounds/pete_garage.png",
        dialogue: [
            { speaker: "player", text: "I hold up my badge. It glints in the dirty fluorescent light. 'I don't care who the IRS sends, you're paying your taxes.' And guess what? I'm the guy they sent." },
            { speaker: "pete", text: "You think a badge scares me? I've got a crowbar!" },
            { speaker: "player", text: "And I've got the authority to freeze your bank accounts, repossess your inventory, and audit your grandmother. Which one of us has the real power here?" },
            { speaker: "pete", text: "..." },
            { speaker: "pete", text: "Fine. Take the damn checkbook. But I want a receipt!" },
            { speaker: "player", text: "We'll email it to you. Have a compliant day." }
        ],
        nextScene: "chapter_2_end"
    },
    pete_hostile: {
        id: "pete_hostile",
        title: "Pete's Premium Auto",
        background: "/images/backgrounds/pete_garage.png",
        dialogue: [
            { speaker: "player", text: "I don't even blink at the crowbar. I just stare him dead in the eyes." },
            { speaker: "player", text: "Pete. Buddy. Do you know what happens to people who assault tax collectors? The government doesn't just put you in jail. They tax your commissary." },
            { speaker: "player", text: "I will personally make sure you have to fill out a 1040-EZ form every time you want to breathe in your cell." },
            { speaker: "pete", text: "Wh-what? You're crazy!" },
            { speaker: "player", text: "I'm not crazy. I'm highly motivated. Now open the register, hand over the keys to that sports car, and thank me for my service." },
            { speaker: "system", text: "SUBJECT COMPLIANCE ACHIEVED VIA FEAR FACTOR. REPUTATION +15." }
        ],
        nextScene: "chapter_2_end"
    },
    chapter_2_end: {
        id: "chapter_2_end",
        title: "Outside the Garage",
        background: "/images/backgrounds/city_haze.png",
        dialogue: [
            { speaker: "player", text: "Another successful collection. I tuck the certified check into my jacket. The air smells like victory and bureaucracy." },
            { speaker: "player", text: "Vance is going to have to find harder targets if he wants to break me. I'm just getting started." },
            { speaker: "system", text: "CHAPTER 2: DEATH AND TAXES - COMPLETED." },
            { speaker: "system", text: "NEW CHAPTERS WILL BE ADDED TO THE TERMINAL DATABASE SHORTLY." }
        ]
    }
};
