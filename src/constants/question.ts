export const symptoms = [
  {
    title: 'Psychological',
    data: [
      'Decreased self-confidence in sexual situations',
      'Overthinking and difficulty staying present during intimacy',
      'Sexual frustration due to lack of control',
      'Anxiety before or during sex',
      'Vicious cycle of doubt and self-consciousness after sexual experiences',
    ],
    // icon: 'brain',
  },
  {
    title: 'Social',
    data: [
      'Feeling distant from your partner over time',
      'Lack of sexual openness due to performance anxiety',
      'Hesitant to discuss sexual needs or preferences',
      'Worried about your ability to satisfy your partner',
    ],
    // icon: 'heart-broken',
  },
  {
    title: 'Physical',
    data: [
      'Libido drop during intimacy despite initial arousal',
      'Inconsistent arousal patterns',
      'Struggle to regulate testosterone level leading to focus and energy issues',
    ],
    // icon: 'heart-broken',
  },
];

export const slides = [
  {
    id: '1',
    title: 'Not only a bedroom issue',
    subtitle:
      'Most men don’t realize how much <b>lack of control affects their lives.<b>',
    background: 'red',
    image: require('../assets/Lottie/broken-heart.json'),
    dot: 1,
  },
  {
    id: '2',
    title: 'It shatters sex drive',
    subtitle:
      'Studies show men with lack of control are 3x more likely to avoid intimacy with their partner.',
    background: 'red',
    image: require('../assets/Lottie/sad-man.json'),
    dot: 2,
  },
  {
    id: '3',
    title: 'It hurts relationships',
    subtitle:
      '80% of men with lack of control think their partner feels unsatisfied or furstrated.',
    background: 'red',
    image: require('../assets/Lottie/couple.json'),
    dot: 3,
  },
  {
    id: '4',
    title: 'It’s a vicious circle',
    subtitle:
      'Performance anxiety leads to overthinking which leads to more anxiety and less control.',
    background: 'red',
    image: require('../assets/Lottie/brain.json'),
    dot: 4,
  },
  {
    id: '5',
    title: 'But it can be fixed',
    subtitle:
      'With Lastr’s training, you can learn how to gain total control over your ejaculation.',
    background: 'blue',
    image: require('../assets/Lottie/plant.json'),
    dot: 1,
  },
  {
    id: '6',
    title: 'Welcome to Lastr',
    subtitle:
      'Lastr’ s methodology is based on years of leading research about ejaculation control',
    background: 'purple',
    image: require('../assets/Lottie/hero.json'),
    dot: 2,
  },
  {
    id: '7',
    title: 'Rewire your brain',
    subtitle:
      'Science-backed exercises to help you rewire your brain and arousal mechanism',
    background: 'purple',
    image: require('../assets/Lottie/calm-brain.json'),
    dot: 3,
  },
  {
    id: '8',
    title: 'Stay motivated',
    subtitle:
      'Improving your control can be challenging. Keeping your routine is key.',
    background: 'purple',
    image: require('../assets/Lottie/yoga.json'),
    dot: 4,
  },
  {
    id: '9',
    title: 'Level up your life',
    subtitle:
      'Taking control of your performance has immense psychological benefits',
    background: 'purple',
    image: require('../assets/Lottie/winner.json'),
    dot: 5,
  },
];

export const benefitsData = [
  {
    id: '1',
    title: 'Higher Confidence',
    description: 'More in control, less stress during sex.',
  },
  {
    id: '2',
    title: 'Better Partner Satisfaction',
    description: 'Longer, more enjoyable intimacy.',
  },
  {
    id: '3',
    title: 'Stronger Erections',
    description: 'Better blood flow from reduced anxiety.',
  },
  {
    id: '4',
    title: 'More Exciting Sex Life',
    description: 'Less fear, more fun.',
  },
];

export const physical_exercise_set: {
  [key: string]:
    | {
        type: 'reps';
        content: string;
        sets: string;
        reps: string;
      }
    | {
        type: 'stops';
        content: string;
        sets: string;
        stops: {
          time: number;
          duration: string;
        };
      };
} = {
  BA: {
    content:
      'Contract and engage your pelvic floor and glute muscles while keeping your core tight. This movement enhances pelvic stability and strengthens the muscles supporting ejaculation control. Maintain a steady breath throughout and avoid arching your lower back for proper alignment.',
    sets: '2x',
    reps: '8x',
    type: 'reps',
  },
  HGB: {
    content:
      'Lie on your back with your knees bent and heels pressed firmly into the ground. Lift your hips by driving through your heels, engaging your glutes and pelvic floor muscles. Hold at the top for a moment, squeezing your glutes to maximize activation. This exercise enhances lower body strength, pelvic stability, and helps improve ejaculation control. Maintain a tight core throughout the movement and avoid arching your lower back to ensure proper alignment and prevent injury.',
    sets: '2x',
    reps: '8x',
    type: 'reps',
  },
  LB: {
    content:
      'Lie on your back with the soles of your feet together and your knees relaxed, dropping outward. Engage your pelvic floor muscles while keeping your core tight. Gently contract and release the pelvic floor, maintaining a steady breath throughout. This movement promotes pelvic flexibility and strengthens the muscles that support ejaculation control. Keep your lower back pressed into the floor for proper alignment and avoid tensing your thighs.',
    sets: '3x',
    stops: {time: 10, duration: 'secs'},
    type: 'stops',
  },
  LLR: {
    content:
      'Lie flat on your back with your legs extended and arms at your sides. Engage your core and pelvic floor muscles as you slowly lift your legs off the ground until they form a 90-degree angle with your torso. Lower them back down with control, avoiding any arching of your lower back. This exercise strengthens the lower abdominal muscles and enhances pelvic stability, supporting better ejaculation control. Maintain steady breathing and keep your movements slow and controlled for maximum effectiveness.',
    sets: '3x',
    stops: {time: 10, duration: 'secs'},
    type: 'stops',
  },
  PT: {
    content:
      'Lie on your back with your knees bent and feet flat on the floor, hip-width apart. Engage your core and pelvic floor muscles as you gently tilt your pelvis upward, pressing your lower back into the floor. Hold the position for a few seconds while maintaining steady breathing, then release. This exercise strengthens the pelvic floor and core muscles, enhancing stability and control for better ejaculation management. Keep your glutes relaxed and avoid pushing with your legs to ensure proper form.',
    sets: '3x',
    stops: {time: 10, duration: 'secs'},
    type: 'stops',
  },
  RDB: {
    content:
      'Position yourself with your upper back elevated on a bench or sturdy surface, feet flat on the ground and knees bent. Lower your hips toward the floor, then drive through your heels to lift your hips back up, engaging your glutes and pelvic floor muscles. Hold at the top for a moment, squeezing your glutes for maximum activation. This exercise improves lower body strength and pelvic stability, aiding in ejaculation control. Keep your core tight and avoid overextending your lower back to maintain proper form.',
    sets: '3x',
    reps: '4-4-8x',
    type: 'reps',
  },
};

export const psychological_exercise_set: {
  [key: string]: {
    content: string;
    stats: {
      label: string;
      time: string;
      small_text: string;
    }[];
    statement1: string;
    statement2: string;
  };
} = {
  M: {
    content:
      'Being mentally distracted increases arousal spikes, making it harder to last. Mindfulness meditation trains your brain to stay present, reducing anxiety and improving ejaculatory control. If you struggle with overthinking during intimacy, this practice will help you focus, relax, and extend your stamina.',
    stats: [
      {
        label: 'Duration',
        time: '2-5',
        small_text: 'mins/day',
      },
      {
        label: 'Timing before intimacy',
        time: '1-2',
        small_text: 'hours',
      },
      {
        label: 'Goal',
        time: '60+',
        small_text: 'sec',
      },
      {
        label: 'Improvement',
        time: '5+',
        small_text: 'sec/week',
      },
    ],
    statement1: 'Daily practice improves long-term control',
    statement2: '4-4-8 method: inhale 4s, hold 4s, exhale 8s',
  },
  BC: {
    content:
      'Rapid, shallow breathing increases arousal and reduces control, making it harder to last. Breath control techniques, like the 4-4-8 method, help regulate arousal levels, reduce anxiety, and enhance ejaculation control. By maintaining slow, controlled breaths, you activate the parasympathetic nervous system, promoting relaxation and better stamina.',
    stats: [
      {
        label: 'Scan Duration',
        time: '1-3',
        small_text: 'mins/day',
      },
      {
        label: 'Timing',
        time: '30',
        small_text: 'mins before act',
      },
      {
        label: 'Goal',
        time: '60+',
        small_text: 'sec',
      },
      {
        label: 'Improvement',
        time: '5+',
        small_text: 'sec/week',
      },
    ],
    statement1: '4-4-8 method: inhale 4s, hold 4s, exhale 8s',
    statement2: 'Daily practice builds automatic relaxation',
  },
  BS: {
    content:
      'Tension in your body increases arousal spikes and leads to quicker ejaculation. Body scanning trains you to recognize and release tension, especially in the pelvic floor, abs, and thighs.\nIf you feel stiffness or tightness during sex, this practice will help you relax and stay in control.',
    stats: [
      {
        label: 'Scan Duration',
        time: '1-3',
        small_text: 'mins/day',
      },
      {
        label: 'Timing',
        time: '30',
        small_text: 'mins before act',
      },
      {
        label: 'Goal',
        time: '60+',
        small_text: 'sec',
      },
      {
        label: 'Improvement',
        time: '5+',
        small_text: 'sec/week',
      },
    ],
    statement1: '4-4-8 method: inhale 4s, hold 4s, exhale 8s',
    statement2: 'Daily practice builds automatic relaxation',
  },
  AA: {
    content:
      'Most men lose control because they don’t recognize rising arousal levels until it’s too late. This exercise helps you track arousal and act before reaching the point of no return.\nIf you finish too quickly without warning, this practice will train you to notice arousal shifts early and manage stimulation effectively.',
    stats: [
      {
        label: 'Interval',
        time: '2',
        small_text: 'mins checks',
      },
      {
        label: 'Arousal scale',
        time: '7',
        small_text: 'or below',
      },
      {
        label: 'Control action',
        time: '60+',
        small_text: 'sec hold',
      },
      {
        label: 'Session length',
        time: '5-10',
        small_text: 'mins',
      },
    ],
    statement1: 'Use slow breathing to lower arousal spikes',
    statement2: 'Check scale regularly during act',
  },
  CR: {
    content:
      'Negative thoughts like “I always finish too fast” create anxiety. Cognitive reframing trains your brain to replace these thoughts with positive, empowering beliefs.\nIf you struggle with performance anxiety, this practice will help you shift your mindset, build confidence, and stay in control.',
    stats: [
      {
        label: 'Frequency',
        time: '2-5',
        small_text: 'mins/day',
      },
      {
        label: 'Ballsy thought',
        time: '1',
        small_text: '/day outloud',
      },
      {
        label: 'Anxiety drops',
        time: '-10%',
        small_text: '/week',
      },
      {
        label: 'Key beliefs',
        time: '3x',
        small_text: '/day outloud',
      },
    ],
    statement1: 'Replace 1 negative thought with 1 positive',
    statement2: 'Rewiring your mindset reduces anxiety',
  },
  NC: {
    content:
      'Your nervous system controls ejaculation. Too much tension (fight-or-flight mode) leads to PE, while relaxation (rest-and-digest mode) helps you last longer.\nIf you feel tense and restless, this practice will help you activate relaxation on command, improving endurance.',
    stats: [
      {
        label: 'Duration',
        time: '2-10',
        small_text: 'mins/day',
      },
      {
        label: 'Relax sessions',
        time: '3',
        small_text: 'moments/day',
      },
      {
        label: 'Heart rate drop',
        time: '-5',
        small_text: 'BPM post session',
      },
      {
        label: 'Breathing pace',
        time: '6',
        small_text: 'per min target',
      },
    ],
    statement1: 'Relax your jaw, shoulders, and hands first.',
    statement2: '4-4-8 method: inhale 4s, hold 4s, exhale 8s',
  },
};

export const lifestyle_data = [
  {
    title: 'Diet and Supplements',
    content:
      'Nutrients like zinc, magnesium, and L-arginine boost testosterone and nerve function. Get them from pumpkin seeds, nuts, salmon, and spinach. Adaptogens like ashwagandha lower stress and improve stamina. A balanced diet supports long-term control.',
  },
  {
    title: 'Cold Showers and Ice Baths',
    content:
      'Cold exposure strengthens nervous system control and raises dopamine and testosterone. Start with 30-60 sec cold showers daily, increasing gradually.  Ice baths (3-5 min, 1-2x per week) help manage arousal and post-sex recovery.',
  },
  {
    title: 'Hydration and Electrolyte',
    content:
      'Dry masturbation (tight grip, fast strokes, excessive porn) increases sensitivity and weakens control. Using lube reduces friction, mimicking real intercourse for better stamina. Opt for a lighter grip, slower pace, and practice Edging (stop at level 6-7, then resume). Limit porn to reset dopamine sensitivity. Aim for 10-20 min sessions focused on control, not climax.',
  },
  {
    title: 'Pelvic Stretching',
    content:
      'Tight pelvic muscles increase tension and make ejaculation harder to control. Stretching releases tension, improves flexibility, and supports better arousal management. Perform Butterfly Stretch, Deep Squat Hold, and Happy Baby Pose for 1-2 min each, daily.',
  },
  {
    title: 'Caffeine Management',
    content:
      'Caffeine is a stimulant that increases adrenaline and cortisol levels, heightening arousal sensitivity and anxiety, which can reduce control. To maintain steady focus and relaxation, limit caffeine intake to the morning and avoid it at least six hours before intimate activity. Opt for lower-caffeine alternatives like green tea to maintain alertness.',
  },
  {
    title: 'Stress Hormones Pointers',
    content:
      'Hormones like cortisol, serotonin and dopamine, directly affect ejaculation control. High cortisol (stress hormone) increases arousal sensitivity and shortens endurance. Low serotonin reduces control, while dopamine spikes can make arousal harder to regulate. ',
  },
  {
    title: "The “Point of no return” (PONR)'",
    content:
      'Ejaculation is controlled by the sympathetic nervous system. When arousal reaches a neurological threshold, often called “Climax”, the body triggers ejaculation automatically. Training with arousal awareness, edging, and breath control helps push back “Climax” for better control.',
  },
  {
    title: 'Hydration and Skin Health',
    content:
      'Dry, irritated skin increases friction and sensitivity, making ejaculation harder to control. Using coconut or jojoba oil keeps the skin moisturized, while water-based lube prevents overstimulation. Avoid harsh soaps that dry out the skin and drink 2-3L of water daily to maintain elasticity.',
  },
  {
    title: 'Magnesium Intake',
    content:
      'Magnesium plays a key role in muscle relaxation and stress hormone regulation, which directly impact endurance and control. A deficiency can lead to increased anxiety and muscle tension. Incorporate magnesium-rich foods like spinach, almonds, and dark chocolate into your diet, or consider a supplement for optimal levels. Consistent intake can improve relaxation and stamina over time.',
  },
];
