// App State
const state = {
    streak: 0,
    points: 0,
    activitiesCompleted: 0,
    dailyChallengeProgress: 0,
    achievements: [],
    moodHistory: [],
    currentSection: 'home',
    stats: {
        factsViewed: 0,
        gamesPlayed: 0,
        riddlesSolved: 0,
        breathingSessions: 0
    }
};

// Fun Facts Data
const funFacts = {
    science: [
        "Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that's still perfectly edible!",
        "Bananas are berries, but strawberries aren't! Botanically speaking, berries have seeds inside.",
        "The human brain uses 20% of the body's energy despite being only 2% of body mass.",
        "Water can boil and freeze at the same time, a phenomenon called the 'triple point'.",
        "A single bolt of lightning contains enough energy to toast 100,000 slices of bread.",
        "Your body produces about 25 million new cells each second. That's a lot of you!",
        "Sound travels 4.3 times faster through water than through air.",
        "The average person walks the equivalent of three times around the world in a lifetime."
    ],
    nature: [
        "Trees can communicate with each other through underground fungal networks called 'mycorrhizal networks'.",
        "A single tree can absorb up to 48 pounds of carbon dioxide per year and release enough oxygen for two people.",
        "Bamboo is the fastest-growing plant on Earth, growing up to 35 inches in a single day!",
        "The Amazon rainforest produces about 20% of the world's oxygen supply.",
        "Some species of jellyfish are immortal and can revert to their juvenile form after reaching maturity.",
        "Mushrooms are more closely related to humans than to plants.",
        "The Great Barrier Reef is the largest living structure on Earth, visible from space.",
        "A single oak tree can produce up to 10,000 acorns in a year."
    ],
    history: [
        "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
        "Oxford University is older than the Aztec Empire by about 200 years.",
        "The shortest war in history lasted only 38 minutes between Britain and Zanzibar in 1896.",
        "Ancient Romans used urine as mouthwash because it contains ammonia, which cleans teeth.",
        "The first computer programmer was Ada Lovelace in the 1840s, a century before modern computers.",
        "Vikings reached North America 500 years before Columbus.",
        "Ancient Egyptians used slabs of stone as pillows.",
        "The first alarm clock could only ring at 4 AM, invented by Levi Hutchins in 1787."
    ],
    space: [
        "A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once but only 225 to orbit the Sun.",
        "One million Earths could fit inside the Sun, and the Sun is considered an average-sized star.",
        "There are more stars in the universe than grains of sand on all of Earth's beaches.",
        "If you could travel at the speed of light, you could orbit Earth 7.5 times in just one second.",
        "Neutron stars are so dense that a teaspoon of their material would weigh about 6 billion tons.",
        "The footprints on the Moon will last for millions of years because there's no wind to blow them away.",
        "Saturn's rings are mostly made of ice particles, some as small as dust, others as large as houses.",
        "A year on Neptune lasts 165 Earth years. It completed its first orbit since discovery only in 2011!"
    ],
    animals: [
        "Octopuses have three hearts, nine brains, and blue blood!",
        "Dolphins sleep with one half of their brain at a time, so they can stay alert to threats.",
        "A group of flamingos is called a 'flamboyance'. Perfect name!",
        "Sloths only defecate once a week and can lose up to 30% of their body weight when they do.",
        "Otters hold hands while sleeping so they don't drift apart.",
        "A shrimp's heart is located in its head.",
        "Butterflies can taste with their feet to find out if the leaf is good for laying eggs.",
        "Cows have best friends and get stressed when separated from them.",
        "Penguins propose to their mates with a pebble. If the female accepts, they mate for life.",
        "Elephants can recognize themselves in mirrors, showing self-awareness like humans and great apes."
    ]
};

// Brain Teasers/Riddles
const riddles = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answer: "echo",
        hint: "Think about sound bouncing back..."
    },
    {
        question: "What has keys but no locks, space but no room, and you can enter but not go inside?",
        answer: "keyboard",
        hint: "You're probably using one right now!"
    },
    {
        question: "The more of this there is, the less you see. What is it?",
        answer: "darkness",
        hint: "It's the opposite of light..."
    },
    {
        question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        answer: "map",
        hint: "You use this to navigate..."
    },
    {
        question: "What can travel around the world while staying in a corner?",
        answer: "stamp",
        hint: "Think about mail..."
    },
    {
        question: "I am not alive, but I grow. I don't have lungs, but I need air. What am I?",
        answer: "fire",
        hint: "It's hot and bright..."
    },
    {
        question: "What gets wetter the more it dries?",
        answer: "towel",
        hint: "You use it after a shower..."
    },
    {
        question: "I'm tall when I'm young and short when I'm old. What am I?",
        answer: "candle",
        hint: "Light me up..."
    },
    {
        question: "What has hands but cannot clap?",
        answer: "clock",
        hint: "It tells time..."
    },
    {
        question: "What begins with T, ends with T, and has T in it?",
        answer: "teapot",
        hint: "It's used for making hot beverages..."
    },
    {
        question: "I'm light as a feather, but even the strongest person can't hold me for long. What am I?",
        answer: "breath",
        hint: "You're doing it right now..."
    },
    {
        question: "What can you catch but never throw?",
        answer: "cold",
        hint: "You might want tissues for this..."
    },
    {
        question: "I have a neck but no head. What am I?",
        answer: "bottle",
        hint: "You drink from me..."
    },
    {
        question: "What goes up but never comes down?",
        answer: "age",
        hint: "Everyone experiences this..."
    },
    {
        question: "What has a head and a tail but no body?",
        answer: "coin",
        hint: "You use it to buy things..."
    }
];

// Achievements
const achievements = [
    { id: 'first_steps', name: 'First Steps', description: 'Complete your first activity', icon: '🎯', requirement: 1 },
    { id: 'fact_finder', name: 'Fact Finder', description: 'View 10 fun facts', icon: '💡', requirement: 10 },
    { id: 'brain_master', name: 'Brain Master', description: 'Solve 5 riddles', icon: '🧠', requirement: 5 },
    { id: 'zen_master', name: 'Zen Master', description: 'Complete 10 breathing exercises', icon: '🧘', requirement: 10 },
    { id: 'mood_tracker', name: 'Mood Tracker', description: 'Track your mood for 7 days', icon: '📊', requirement: 7 },
    { id: 'game_champion', name: 'Game Champion', description: 'Play 20 games', icon: '🏆', requirement: 20 },
    { id: 'streak_master', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: '🔥', requirement: 7 },
    { id: 'point_collector', name: 'Point Collector', description: 'Earn 1000 points', icon: '⭐', requirement: 1000 }
];

// Initialize App
function initApp() {
    loadState();
    setupEventListeners();
    updateUI();
    updateDailyChallengeTimer();
    checkDailyStreak();
    showRandomFact();
}

// Load state from localStorage
function loadState() {
    const savedState = localStorage.getItem('mindBreakState');
    if (savedState) {
        const loaded = JSON.parse(savedState);
        Object.assign(state, loaded);
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('mindBreakState', JSON.stringify(state));
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            navigateToSection(section);
        });
    });

    // Quick Actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', () => {
            const action = card.dataset.action;
            handleQuickAction(action);
        });
    });

    // Fun Facts
    document.getElementById('nextFactBtn').addEventListener('click', showRandomFact);
    document.getElementById('shareFact').addEventListener('click', shareFact);

    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            showRandomFact(tab.dataset.category);
        });
    });

    // Games
    setupGameListeners();

    // Breathing
    document.getElementById('breatheStartBtn').addEventListener('click', startBreathingExercise);
    document.getElementById('breatheStopBtn').addEventListener('click', stopBreathingExercise);

    // Mood Tracking
    document.querySelectorAll('.mood-option').forEach(btn => {
        btn.addEventListener('click', () => {
            trackMood(btn.dataset.mood);
        });
    });
}

// Navigate to Section
function navigateToSection(section) {
    state.currentSection = section;

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === section) {
            btn.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');

    saveState();
}

// Handle Quick Actions
function handleQuickAction(action) {
    switch(action) {
        case 'random-fact':
            navigateToSection('facts');
            showRandomFact();
            break;
        case 'quick-game':
            navigateToSection('games');
            break;
        case 'breathe':
            navigateToSection('breathe');
            break;
        case 'riddle':
            navigateToSection('games');
            startRiddleGame();
            break;
    }
}

// Fun Facts Functions
let currentFact = null;

function showRandomFact(category = 'all') {
    let factsArray = [];

    if (category === 'all') {
        Object.values(funFacts).forEach(catFacts => {
            factsArray = factsArray.concat(catFacts);
        });
    } else {
        factsArray = funFacts[category] || [];
    }

    if (factsArray.length > 0) {
        currentFact = factsArray[Math.floor(Math.random() * factsArray.length)];
        document.getElementById('factText').textContent = currentFact;
        document.getElementById('factCategory').textContent = category === 'all' ?
            Object.keys(funFacts)[Math.floor(Math.random() * Object.keys(funFacts).length)] : category;

        state.stats.factsViewed++;
        addPoints(5);
        updateDailyChallengeProgress();
        checkAchievements();
        saveState();
    }
}

function shareFact() {
    if (currentFact && navigator.share) {
        navigator.share({
            title: 'Interesting Fact from MindBreak',
            text: currentFact
        }).catch(err => console.log('Share failed', err));
    } else {
        alert('Sharing not supported on this device');
    }
}

// Games Setup
function setupGameListeners() {
    // Game Selection
    document.querySelectorAll('.game-card button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            const game = gameCard.dataset.game;
            startGame(game);
        });
    });

    // Memory Game
    document.getElementById('memoryBackBtn').addEventListener('click', () => {
        document.getElementById('memoryGame').classList.add('hidden');
        document.getElementById('gameSelection').style.display = 'grid';
    });

    // Reaction Game
    document.getElementById('reactionBackBtn').addEventListener('click', () => {
        document.getElementById('reactionGame').classList.add('hidden');
        document.getElementById('gameSelection').style.display = 'grid';
    });
    document.getElementById('reactionArea').addEventListener('click', handleReactionClick);

    // Pattern Game
    document.getElementById('patternBackBtn').addEventListener('click', () => {
        stopPatternGame();
        document.getElementById('patternGame').classList.add('hidden');
        document.getElementById('gameSelection').style.display = 'grid';
    });

    // Riddle Game
    document.getElementById('riddleBackBtn').addEventListener('click', () => {
        document.getElementById('riddleGame').classList.add('hidden');
        document.getElementById('gameSelection').style.display = 'grid';
    });
    document.getElementById('riddleSubmit').addEventListener('click', checkRiddleAnswer);
    document.getElementById('riddleInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkRiddleAnswer();
    });
    document.getElementById('riddleHintBtn').addEventListener('click', showRiddleHint);
    document.getElementById('riddleNext').addEventListener('click', () => {
        startRiddleGame();
    });
}

function startGame(game) {
    document.getElementById('gameSelection').style.display = 'none';

    switch(game) {
        case 'memory':
            startMemoryGame();
            break;
        case 'reaction':
            startReactionGame();
            break;
        case 'pattern':
            startPatternGame();
            break;
        case 'riddle':
            startRiddleGame();
            break;
    }

    state.stats.gamesPlayed++;
    updateDailyChallengeProgress();
    checkAchievements();
    saveState();
}

// Memory Game
let memoryGame = {
    cards: [],
    flippedCards: [],
    moves: 0,
    startTime: null,
    timerInterval: null,
    emojis: ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺']
};

function startMemoryGame() {
    document.getElementById('memoryGame').classList.remove('hidden');

    // Reset game state
    memoryGame.moves = 0;
    memoryGame.flippedCards = [];
    memoryGame.startTime = Date.now();

    // Create card pairs
    const cardValues = [...memoryGame.emojis, ...memoryGame.emojis];
    cardValues.sort(() => Math.random() - 0.5);

    // Create grid
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';

    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = value;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });

    // Start timer
    memoryGame.timerInterval = setInterval(updateMemoryTimer, 1000);
    updateMemoryUI();
}

function flipCard(e) {
    const card = e.target;

    if (card.classList.contains('flipped') || card.classList.contains('matched') ||
        memoryGame.flippedCards.length >= 2) {
        return;
    }

    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    memoryGame.flippedCards.push(card);

    if (memoryGame.flippedCards.length === 2) {
        memoryGame.moves++;
        updateMemoryUI();
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [card1, card2] = memoryGame.flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        memoryGame.flippedCards = [];

        // Check if game complete
        const allCards = document.querySelectorAll('.memory-card');
        const matchedCards = document.querySelectorAll('.memory-card.matched');
        if (allCards.length === matchedCards.length) {
            clearInterval(memoryGame.timerInterval);
            setTimeout(() => {
                addPoints(50);
                alert('Congratulations! You won! 🎉');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            memoryGame.flippedCards = [];
        }, 1000);
    }
}

function updateMemoryTimer() {
    const elapsed = Math.floor((Date.now() - memoryGame.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('memoryTime').textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateMemoryUI() {
    document.getElementById('memoryMoves').textContent = memoryGame.moves;
}

// Reaction Game
let reactionGame = {
    state: 'idle',
    startTime: null,
    timeout: null,
    bestTime: localStorage.getItem('reactionBest') || null
};

function startReactionGame() {
    document.getElementById('reactionGame').classList.remove('hidden');
    reactionGame.state = 'idle';

    if (reactionGame.bestTime) {
        document.getElementById('reactionBest').textContent = reactionGame.bestTime + 'ms';
    }

    document.getElementById('reactionText').textContent = 'Click to Start';
    document.getElementById('reactionResult').textContent = '';
    document.getElementById('reactionArea').className = 'reaction-area';
}

function handleReactionClick() {
    const area = document.getElementById('reactionArea');

    if (reactionGame.state === 'idle') {
        reactionGame.state = 'waiting';
        area.classList.add('waiting');
        document.getElementById('reactionText').textContent = 'Wait for green...';
        document.getElementById('reactionResult').textContent = '';

        const delay = 2000 + Math.random() * 3000;
        reactionGame.timeout = setTimeout(() => {
            reactionGame.state = 'ready';
            reactionGame.startTime = Date.now();
            area.classList.remove('waiting');
            area.classList.add('ready');
            document.getElementById('reactionText').textContent = 'CLICK NOW!';
        }, delay);

    } else if (reactionGame.state === 'waiting') {
        clearTimeout(reactionGame.timeout);
        reactionGame.state = 'idle';
        area.classList.remove('waiting');
        document.getElementById('reactionText').textContent = 'Too early! Click to try again';
        document.getElementById('reactionResult').textContent = '';

    } else if (reactionGame.state === 'ready') {
        const reactionTime = Date.now() - reactionGame.startTime;
        reactionGame.state = 'idle';
        area.classList.remove('ready');

        document.getElementById('reactionText').textContent = 'Click to try again';
        document.getElementById('reactionResult').textContent = `${reactionTime}ms`;

        if (!reactionGame.bestTime || reactionTime < parseInt(reactionGame.bestTime)) {
            reactionGame.bestTime = reactionTime;
            localStorage.setItem('reactionBest', reactionTime);
            document.getElementById('reactionBest').textContent = reactionTime + 'ms';
            document.getElementById('reactionResult').textContent += ' 🎉 New Best!';
        }

        addPoints(Math.max(50 - Math.floor(reactionTime / 10), 10));
    }
}

// Pattern Game
let patternGame = {
    pattern: [],
    playerPattern: [],
    level: 1,
    score: 0,
    isPlaying: false,
    timeout: null
};

function startPatternGame() {
    document.getElementById('patternGame').classList.remove('hidden');
    patternGame.level = 1;
    patternGame.score = 0;
    patternGame.pattern = [];
    patternGame.playerPattern = [];
    updatePatternUI();

    document.querySelectorAll('.pattern-cell').forEach(cell => {
        cell.addEventListener('click', handlePatternClick);
    });

    setTimeout(() => nextPatternRound(), 1000);
}

function stopPatternGame() {
    if (patternGame.timeout) clearTimeout(patternGame.timeout);
    patternGame.isPlaying = false;
    document.querySelectorAll('.pattern-cell').forEach(cell => {
        cell.removeEventListener('click', handlePatternClick);
    });
}

function nextPatternRound() {
    patternGame.pattern.push(Math.floor(Math.random() * 4));
    patternGame.playerPattern = [];
    patternGame.isPlaying = false;

    document.getElementById('patternMessage').textContent = 'Watch the pattern...';
    playPattern();
}

function playPattern() {
    let index = 0;

    function highlightNext() {
        if (index < patternGame.pattern.length) {
            const cellIndex = patternGame.pattern[index];
            const cell = document.querySelector(`.pattern-cell[data-index="${cellIndex}"]`);
            cell.classList.add('highlight');

            setTimeout(() => {
                cell.classList.remove('highlight');
                index++;
                patternGame.timeout = setTimeout(highlightNext, 600);
            }, 400);
        } else {
            patternGame.isPlaying = true;
            document.getElementById('patternMessage').textContent = 'Your turn! Repeat the pattern';
        }
    }

    highlightNext();
}

function handlePatternClick(e) {
    if (!patternGame.isPlaying) return;

    const cell = e.target;
    const index = parseInt(cell.dataset.index);

    cell.classList.add('active');
    setTimeout(() => cell.classList.remove('active'), 200);

    patternGame.playerPattern.push(index);

    // Check if correct so far
    const currentIndex = patternGame.playerPattern.length - 1;
    if (patternGame.playerPattern[currentIndex] !== patternGame.pattern[currentIndex]) {
        // Wrong!
        patternGame.isPlaying = false;
        document.getElementById('patternMessage').textContent =
            `Game Over! Final Score: ${patternGame.score}`;
        addPoints(patternGame.score);

        setTimeout(() => {
            if (confirm('Try again?')) {
                startPatternGame();
            } else {
                document.getElementById('patternGame').classList.add('hidden');
                document.getElementById('gameSelection').style.display = 'grid';
            }
        }, 1500);
        return;
    }

    // Check if completed pattern
    if (patternGame.playerPattern.length === patternGame.pattern.length) {
        patternGame.isPlaying = false;
        patternGame.level++;
        patternGame.score += patternGame.level * 10;
        updatePatternUI();
        document.getElementById('patternMessage').textContent = '✓ Correct! Next level...';
        setTimeout(() => nextPatternRound(), 1500);
    }
}

function updatePatternUI() {
    document.getElementById('patternLevel').textContent = patternGame.level;
    document.getElementById('patternScore').textContent = patternGame.score;
}

// Riddle Game
let riddleGame = {
    currentRiddle: null,
    currentIndex: 0,
    usedIndices: []
};

function startRiddleGame() {
    document.getElementById('riddleGame').classList.remove('hidden');

    // Reset UI
    document.getElementById('riddleInput').value = '';
    document.getElementById('riddleHint').classList.add('hidden');
    document.getElementById('riddleResult').classList.add('hidden');
    document.getElementById('riddleNext').classList.add('hidden');
    document.getElementById('riddleSubmit').classList.remove('hidden');
    document.getElementById('riddleInput').classList.remove('hidden');
    document.getElementById('riddleHintBtn').classList.remove('hidden');

    // Get new riddle
    if (riddleGame.usedIndices.length === riddles.length) {
        riddleGame.usedIndices = [];
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * riddles.length);
    } while (riddleGame.usedIndices.includes(randomIndex));

    riddleGame.usedIndices.push(randomIndex);
    riddleGame.currentRiddle = riddles[randomIndex];

    document.getElementById('riddleText').textContent = riddleGame.currentRiddle.question;
}

function checkRiddleAnswer() {
    const userAnswer = document.getElementById('riddleInput').value.toLowerCase().trim();
    const correctAnswer = riddleGame.currentRiddle.answer.toLowerCase();

    const resultDiv = document.getElementById('riddleResult');
    resultDiv.classList.remove('hidden', 'correct', 'incorrect');

    if (userAnswer === correctAnswer) {
        resultDiv.classList.add('correct');
        resultDiv.textContent = '🎉 Correct! Well done!';
        addPoints(30);
        state.stats.riddlesSolved++;
        updateDailyChallengeProgress();
        checkAchievements();
        saveState();

        document.getElementById('riddleSubmit').classList.add('hidden');
        document.getElementById('riddleInput').classList.add('hidden');
        document.getElementById('riddleHintBtn').classList.add('hidden');
        document.getElementById('riddleNext').classList.remove('hidden');

        document.getElementById('riddleSolved').textContent = state.stats.riddlesSolved;
    } else if (userAnswer.length > 0) {
        resultDiv.classList.add('incorrect');
        resultDiv.textContent = '❌ Not quite right. Try again!';
    }
}

function showRiddleHint() {
    const hintDiv = document.getElementById('riddleHint');
    hintDiv.textContent = '💡 Hint: ' + riddleGame.currentRiddle.hint;
    hintDiv.classList.remove('hidden');
    document.getElementById('riddleHintBtn').classList.add('hidden');
}

// Breathing Exercise
let breathingExercise = {
    isActive: false,
    interval: null,
    currentPhase: 'inhale',
    phaseTime: 0,
    totalTime: 0,
    maxTime: 120, // seconds
    patterns: {
        calm: { inhale: 4, hold: 4, exhale: 4 },
        deep: { inhale: 4, hold: 7, exhale: 8 },
        energy: { inhale: 4, hold: 4, exhale: 4, pause: 4 }
    }
};

function startBreathingExercise() {
    const type = document.getElementById('breathingType').value;
    const duration = parseInt(document.getElementById('breathingDuration').value);

    breathingExercise.maxTime = duration * 60;
    breathingExercise.totalTime = 0;
    breathingExercise.currentPhase = 'inhale';
    breathingExercise.phaseTime = 0;
    breathingExercise.isActive = true;

    document.getElementById('breatheStartBtn').classList.add('hidden');
    document.getElementById('breatheStopBtn').classList.remove('hidden');

    breathingExercise.interval = setInterval(() => {
        updateBreathingExercise(type);
    }, 1000);

    updateBreathingPhase(type);
}

function stopBreathingExercise() {
    clearInterval(breathingExercise.interval);
    breathingExercise.isActive = false;

    document.getElementById('breatheStartBtn').classList.remove('hidden');
    document.getElementById('breatheStopBtn').classList.add('hidden');
    document.getElementById('breathingCircle').className = 'breathing-circle';
    document.getElementById('breathingText').textContent = 'Start';
    document.getElementById('breathingProgress').style.width = '0%';

    if (breathingExercise.totalTime > 0) {
        addPoints(Math.floor(breathingExercise.totalTime / 6));
        state.stats.breathingSessions++;
        updateDailyChallengeProgress();
        checkAchievements();
        saveState();
    }
}

function updateBreathingExercise(type) {
    const pattern = breathingExercise.patterns[type];
    breathingExercise.phaseTime++;
    breathingExercise.totalTime++;

    // Update progress
    const progress = (breathingExercise.totalTime / breathingExercise.maxTime) * 100;
    document.getElementById('breathingProgress').style.width = Math.min(progress, 100) + '%';

    // Check phase transition
    const phases = Object.keys(pattern);
    const currentPhaseIndex = phases.indexOf(breathingExercise.currentPhase);
    const currentPhaseDuration = pattern[breathingExercise.currentPhase];

    if (breathingExercise.phaseTime >= currentPhaseDuration) {
        breathingExercise.phaseTime = 0;
        const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        breathingExercise.currentPhase = phases[nextPhaseIndex];
        updateBreathingPhase(type);
    }

    // Check if time's up
    if (breathingExercise.totalTime >= breathingExercise.maxTime) {
        stopBreathingExercise();
        showAchievementNotification('Breathing exercise completed! 🌬️');
    }
}

function updateBreathingPhase(type) {
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');

    circle.className = 'breathing-circle ' + breathingExercise.currentPhase;

    const phaseTexts = {
        inhale: 'Breathe In',
        hold: 'Hold',
        exhale: 'Breathe Out',
        pause: 'Pause'
    };

    text.textContent = phaseTexts[breathingExercise.currentPhase];
}

// Mood Tracking
function trackMood(mood) {
    const today = new Date().toDateString();

    // Remove selection from all mood options
    document.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Select clicked mood
    event.target.closest('.mood-option').classList.add('selected');

    // Remove today's mood if exists
    state.moodHistory = state.moodHistory.filter(entry => entry.date !== today);

    // Add new mood
    state.moodHistory.push({
        date: today,
        mood: mood,
        timestamp: Date.now()
    });

    // Keep only last 30 days
    if (state.moodHistory.length > 30) {
        state.moodHistory = state.moodHistory.slice(-30);
    }

    addPoints(10);
    updateMoodDisplay();
    checkAchievements();
    saveState();

    showAchievementNotification('Mood tracked! Keep it up! 😊');
}

function updateMoodDisplay() {
    const chartDiv = document.getElementById('moodChart');

    if (state.moodHistory.length === 0) {
        chartDiv.innerHTML = '<div class="chart-placeholder"><p>Start tracking to see your mood history</p></div>';
        return;
    }

    // Show last 7 days
    const last7Days = state.moodHistory.slice(-7);
    const moodEmojis = {
        amazing: '🤩',
        happy: '😊',
        okay: '😐',
        stressed: '😰',
        sad: '😢'
    };

    chartDiv.innerHTML = '';
    last7Days.forEach(entry => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'mood-day';
        dayDiv.innerHTML = `
            <span class="mood-day-label">${new Date(entry.timestamp).toLocaleDateString('en', { weekday: 'short' })}</span>
            <span class="mood-day-emoji">${moodEmojis[entry.mood]}</span>
        `;
        chartDiv.appendChild(dayDiv);
    });

    // Update insights
    updateMoodInsights();
}

function updateMoodInsights() {
    const insightsDiv = document.getElementById('insightsContent');

    if (state.moodHistory.length < 3) {
        insightsDiv.innerHTML = '<p>Track your mood for a few more days to get insights!</p>';
        return;
    }

    const last7Days = state.moodHistory.slice(-7);
    const moodCounts = {};
    last7Days.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    const mostCommon = Object.keys(moodCounts).reduce((a, b) =>
        moodCounts[a] > moodCounts[b] ? a : b
    );

    const insights = {
        amazing: "You've been feeling amazing! Keep up the positive energy! 🌟",
        happy: "You're having a good week! Stay positive! 😊",
        okay: "You're doing okay. Remember to take breaks and relax! 💙",
        stressed: "You've been stressed lately. Try our breathing exercises! 🌬️",
        sad: "Things have been tough. Remember, it's okay to take time for yourself. 💙"
    };

    insightsDiv.innerHTML = `<p>${insights[mostCommon]}</p>`;
}

// Points and Progress
function addPoints(points) {
    state.points += points;
    updateUI();
    checkAchievements();
    saveState();
}

function updateDailyChallengeProgress() {
    const today = new Date().toDateString();
    const lastActivity = localStorage.getItem('lastActivity');

    if (lastActivity !== today) {
        state.dailyChallengeProgress = 0;
        localStorage.setItem('lastActivity', today);
    }

    state.dailyChallengeProgress++;
    const progress = Math.min((state.dailyChallengeProgress / 3) * 100, 100);

    document.getElementById('challengeProgress').style.width = progress + '%';
    document.getElementById('challengeProgressText').textContent =
        `${state.dailyChallengeProgress}/3`;

    if (state.dailyChallengeProgress >= 3 && !state.dailyChallengeCompleted) {
        state.dailyChallengeCompleted = true;
        addPoints(100);
        showAchievementNotification('Daily Challenge Complete! +100 points! 🎯');
    }

    saveState();
}

function updateDailyChallengeTimer() {
    setInterval(() => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('challengeTime').textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Streak Management
function checkDailyStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const diffTime = Math.abs(new Date() - lastDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            state.streak++;
        } else if (diffDays > 1) {
            state.streak = 1;
        }
    } else {
        state.streak = 1;
    }

    localStorage.setItem('lastVisit', today);
    saveState();
}

// Achievements
function checkAchievements() {
    achievements.forEach(achievement => {
        if (state.achievements.includes(achievement.id)) return;

        let progress = 0;

        switch(achievement.id) {
            case 'first_steps':
                progress = state.stats.factsViewed + state.stats.gamesPlayed +
                          state.stats.breathingSessions;
                break;
            case 'fact_finder':
                progress = state.stats.factsViewed;
                break;
            case 'brain_master':
                progress = state.stats.riddlesSolved;
                break;
            case 'zen_master':
                progress = state.stats.breathingSessions;
                break;
            case 'mood_tracker':
                progress = state.moodHistory.length;
                break;
            case 'game_champion':
                progress = state.stats.gamesPlayed;
                break;
            case 'streak_master':
                progress = state.streak;
                break;
            case 'point_collector':
                progress = state.points;
                break;
        }

        if (progress >= achievement.requirement) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    state.achievements.push(achievement.id);
    addPoints(50);
    showAchievementNotification(`${achievement.name}: ${achievement.description}`);
    updateAchievementsList();
    saveState();
}

function updateAchievementsList() {
    const list = document.getElementById('achievementsList');
    list.innerHTML = '';

    achievements.slice(0, 3).forEach(achievement => {
        const isUnlocked = state.achievements.includes(achievement.id);
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        item.innerHTML = `
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-info">
                <p class="achievement-name">${achievement.name}</p>
                <p class="achievement-desc">${achievement.description}</p>
            </div>
        `;
        list.appendChild(item);
    });
}

function showAchievementNotification(message) {
    const notification = document.getElementById('achievementNotification');
    document.getElementById('achievementNotificationText').textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Update UI
function updateUI() {
    document.getElementById('streak').textContent = state.streak;
    document.getElementById('points').textContent = state.points;
    updateAchievementsList();
    updateMoodDisplay();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
