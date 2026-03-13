export const chapter1Scenes = {
    chapter_1_start: {
        id: "chapter_1_start",
        title: "Internal Monologue",
        background: "/images/backgrounds/dark_void.png",
        type: "name_entry",
        dialogue: [
            { speaker: "system", text: "ENTER IDENTIFICATION PROTOCOL." }
        ],
        nextScene: "chapter_1_monologue"
    },
    chapter_1_monologue: {
        id: "chapter_1_monologue",
        title: "Internal Monologue",
        background: "/images/backgrounds/city_haze.png",
        dialogue: [
            { speaker: "player", text: "I am 24 years old, and I finally did it." },
            { speaker: "player", text: "I actually conquered the absolute mountain of stress, late nights, and soul-crushing prep that was the government tax department exams." },
            { speaker: "player", text: "It was brutal. Honestly, it took pieces of my soul I didn't know I had to give. But standing here right now? The view from the top of this mountain is beautiful." },
            { speaker: "player", text: "This is the beginning of my actual life. A life where I make my own money, where I am completely independent, and where I don't have to answer to anyone about my future." },
            { speaker: "player", text: "My ultimate goal? I'm going to save up, buy a solitary apartment deep in the woods, and just feel that pure independence pumping through my blood." },
            { speaker: "player", text: "No noise, no dependency. Just me and the peace I earned." },
            { speaker: "player", text: "But to get the woods, I have to survive the concrete jungle first." }
        ],
        nextScene: "office_arrival"
    },
    office_arrival: {
        id: "office_arrival",
        title: "Regional Tax Office",
        background: "/images/backgrounds/office_stale.png",
        dialogue: [
            { speaker: "system", text: "REGIONAL TAX COLLECTION OFFICE - SECTOR 7G." },
            { speaker: "player", text: "I adjust my collar and step in. I’m expecting a sleek operation, but it smells like old paper, stale coffee, and bureaucratic despair." },
            { speaker: "player", text: "Ceiling fans lazily slice through the warm air, doing absolutely nothing to cool the room." },
            { speaker: "system", text: "SENIOR INSPECTOR VANCE: UNRESPONSIVE AT DESK." }
        ],
        nextScene: "vance_encounter"
    },
    vance_encounter: {
        id: "vance_encounter",
        title: "Sr. Inspector's Desk",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "vance", text: "Ah. The new blood. You must be {playerName}." },
            { speaker: "vance", text: "Enjoy the high of passing those exams while it lasts, kid. Because right now, you are at the absolute bottom of the food chain." },
            { speaker: "vance", text: "You see this folder? These are the Ghosts. The chronic defaulters." },
            { speaker: "vance", text: "People and businesses that haven't paid a dime in years. They ignore letters, they dodge phone calls, and they eat junior officers like you for breakfast." },
            { speaker: "vance", text: "Your job is to go out there, be logical, be firm, and squeeze water from these stones. If you fail, you’ll be pushing papers in the basement archive until you retire. Understood?" }
        ],
        choices: [
            { label: "I understand perfectly. They haven't dealt with me yet.", nextScene: "vance_response_confident", statChanges: { reputation: 5, integrity: -2 } },
            { label: "Understood. I'll review their financials and close the net.", nextScene: "vance_response_logical", statChanges: { reputation: 2, integrity: 2 } },
            { label: "Yes, sir. I’m here to do a job. Point me to the first target.", nextScene: "vance_response_cold", statChanges: { reputation: 1, integrity: 1 } }
        ]
    },
    vance_response_confident: {
        id: "vance_response_confident",
        title: "Sr. Inspector's Desk",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "vance", text: "Big words for a 24-year-old. Let's see if your spine matches your mouth." }
        ],
        nextScene: "vance_assignment"
    },
    vance_response_logical: {
        id: "vance_response_logical",
        title: "Sr. Inspector's Desk",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "vance", text: "Good. Brains over brawn. Let's see if that textbook logic holds up in the real world." }
        ],
        nextScene: "vance_assignment"
    },
    vance_response_cold: {
        id: "vance_response_cold",
        title: "Sr. Inspector's Desk",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "vance", text: "Straight to the point. I can appreciate that. Try to keep that focus." }
        ],
        nextScene: "vance_assignment"
    },
    vance_assignment: {
        id: "vance_assignment",
        title: "Sr. Inspector's Desk",
        background: "/images/backgrounds/vance_office.png",
        dialogue: [
            { speaker: "vance", text: "Your first target is a local auto-repair shop owner named 'Greasy' Pete. Owes five years of back taxes." },
            { speaker: "vance", text: "He claims his business is failing, but his social media shows him buying a new jet ski every summer. He’s loud, he’s aggressive, and he hates us." },
            { speaker: "vance", text: "Take a department vehicle. Don't let him intimidate you. Remember, you have the full weight of the tax code behind you." },
            { speaker: "player", text: "I pick up the heavy file. The paper is rough against my fingers. Greasy Pete." },
            { speaker: "player", text: "I step out of the office and into the glaring sunlight, gripping the folder tight. I need this win. I need that apartment in the woods." }
        ],
        nextScene: "chapter_2_start"
    }
};
