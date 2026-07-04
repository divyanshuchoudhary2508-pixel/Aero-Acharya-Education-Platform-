/* Aero Acharya — Quiz Data
   4 questions per lesson × 10 lessons = 40 questions total
   correct: 0-based index of the correct option
   explanation: shown after submitting                              */

window.AERO_QUIZ = {
  "air-is-a-fluid": {
    title: "Air Is a Fluid",
    questions: [
      {
        q: "In physics, what makes air a 'fluid'?",
        opts: ["It is made of tiny water droplets","It flows and takes the shape of its container","It has no mass","It only moves when heated"],
        correct: 1,
        explanation: "Fluids are substances that flow and conform to their container. Both liquids and gases — including air — qualify, because their molecules move freely past one another."
      },
      {
        q: "What happens to aerodynamic force when speed doubles?",
        opts: ["It doubles","It stays the same","It roughly quadruples","It halves"],
        correct: 2,
        explanation: "Aerodynamic force is proportional to the square of speed. Double the speed and you get 2² = 4 times the force. This is why aero effects matter so much at race speeds."
      },
      {
        q: "In a simple streamline picture, faster-moving air tends to have…",
        opts: ["Higher static pressure","Lower static pressure","No effect on pressure","Higher temperature"],
        correct: 1,
        explanation: "This is Bernoulli's principle: in a steady flow, where fluid speeds up, its static pressure drops. Race car wings exploit this to create a pressure difference that generates downforce."
      },
      {
        q: "Why can a turbulent boundary layer sometimes be useful?",
        opts: ["It reduces the car's weight","It can stay attached to a surface better than a laminar layer","It always reduces drag","It makes the air move faster"],
        correct: 1,
        explanation: "A turbulent boundary layer mixes higher-energy air toward the surface, giving it more energy to fight the adverse pressure gradient. This delays separation — which is why golf balls have dimples."
      }
    ]
  },

  "drag": {
    title: "Drag Hunter",
    questions: [
      {
        q: "What is pressure drag mainly caused by?",
        opts: ["Surface roughness","A large separated wake behind the object","High air temperature","Wheel spin"],
        correct: 1,
        explanation: "Pressure drag arises from the imbalance between the high-pressure stagnation at the front and the low-pressure separated wake at the rear. A bigger wake means a bigger pressure difference and more drag."
      },
      {
        q: "Which shape produces the smallest wake and therefore the least pressure drag?",
        opts: ["A flat plate facing the airflow","A sphere","A teardrop (streamlined) shape","A cube"],
        correct: 2,
        explanation: "A teardrop shape guides airflow smoothly around itself and lets it reconnect cleanly at the rear, leaving a very small wake. That is why aircraft fuselages and many aero components are shaped this way."
      },
      {
        q: "Friction drag is caused by…",
        opts: ["Air pressure pushing on the front face","Air clinging to and rubbing along a surface","Downforce pressing the car down","Turbulent air entering the engine"],
        correct: 1,
        explanation: "Skin-friction drag comes from the viscous shear stress as air moves along a surface. Every wetted area of the car contributes, which is one reason race cars have smooth, tightly fitted bodywork."
      },
      {
        q: "DRS on an F1 car reduces drag mainly by…",
        opts: ["Making the car lighter","Stalling the rear wing to remove its downforce and drag","Closing the cooling intakes","Lowering ride height"],
        correct: 1,
        explanation: "DRS opens the upper flap of the rear wing, drastically reducing its angle of attack. This cuts the downforce but also removes much of the wing's induced and pressure drag — gaining straight-line speed."
      }
    ]
  },

  "lift-downforce": {
    title: "Lift & Downforce",
    questions: [
      {
        q: "How does a wing create downforce on a race car?",
        opts: ["By pushing air upward with its flat top surface","By creating lower pressure above the wing and higher pressure below it","By heating the air under the car","By spinning like a propeller"],
        correct: 1,
        explanation: "A race wing is shaped and angled so that air flowing below it is accelerated (lower pressure) while air above is slower (higher pressure). The net pressure difference pushes the wing — and the car — toward the track."
      },
      {
        q: "Compared to an aircraft wing, a race car wing is…",
        opts: ["Identical in shape","Inverted, so it pushes the car down instead of up","Always larger","Always symmetrical"],
        correct: 1,
        explanation: "An aircraft wing is cambered to create lift upward. A race car wing is essentially flipped over so the same pressure physics produce a downward force, pressing the tyres harder into the track."
      },
      {
        q: "What is the main benefit of more downforce in a corner?",
        opts: ["Higher top speed","Better fuel economy","More grip, allowing a faster cornering speed","Less tyre wear"],
        correct: 2,
        explanation: "Downforce increases the normal load on the tyres. Within the tyres' limits, higher load means more friction available, so the car can corner, brake and accelerate harder without losing grip."
      },
      {
        q: "The trade-off when adding more downforce is usually…",
        opts: ["Less weight","More drag, which costs straight-line speed","Better cooling","Stiffer suspension"],
        correct: 1,
        explanation: "A wing that creates more downforce also deflects the airflow more aggressively, generating more induced drag. Teams must decide whether the cornering gain is worth the straight-line penalty."
      }
    ]
  },

  "airfoil-mastery": {
    title: "Airfoil Mastery",
    questions: [
      {
        q: "What does 'chord' measure on an airfoil?",
        opts: ["The maximum thickness of the profile","The curvature of the centreline","The straight-line distance from leading edge to trailing edge","The angle relative to incoming air"],
        correct: 2,
        explanation: "Chord is the reference length of an airfoil — the straight line joining the leading and trailing edges. Engineers use it to normalise other dimensions (like thickness-to-chord ratio) for comparison."
      },
      {
        q: "Greater camber on an airfoil generally means…",
        opts: ["Less downforce and less drag","More downforce potential but also more drag","A longer chord","Better stall resistance"],
        correct: 1,
        explanation: "Camber increases the asymmetry of the airfoil, strengthening the pressure difference and boosting downforce — but the more aggressive the shape, the more drag it also creates."
      },
      {
        q: "What is 'stall' in the context of an airfoil?",
        opts: ["The wing stops moving","The engine cuts out","Flow separates because the angle of attack is too high and downforce collapses","The wing breaks"],
        correct: 2,
        explanation: "Beyond a critical angle of attack, the boundary layer cannot follow the wing's upper surface and separates. The smooth pressure distribution breaks down, downforce drops suddenly — this is stall."
      },
      {
        q: "A wing setup built for a high-speed track would typically have…",
        opts: ["Long chord, high camber and a steep angle of attack","Small chord, low camber and a shallow angle of attack","Maximum thickness for strength","A symmetrical airfoil"],
        correct: 1,
        explanation: "High-speed tracks reward low drag. A short, flat wing at a shallow angle generates little downforce but also very little drag, preserving top speed on the long straights."
      }
    ]
  },

  "front-wing-engineer": {
    title: "Front Wing Engineer",
    questions: [
      {
        q: "What are the TWO main jobs of a front wing?",
        opts: ["Create downforce and reduce weight","Create front downforce and direct air toward the rest of the car","Cool the brakes and steer the car","Create downforce and block wind from the driver"],
        correct: 1,
        explanation: "The front wing does two things simultaneously: it generates downforce to load the front tyres, and it sculpts and directs airflow so the floor, sidepods and rear wing all receive cleaner, more useful air."
      },
      {
        q: "What is 'outwash' in front wing design?",
        opts: ["Water sprayed from the front tyres","Redirecting air outward around the front tyre to clean up flow downstream","Air pushed downward by the front wing","Turbulence created behind the front wing"],
        correct: 1,
        explanation: "Outwash is the intentional sideways deflection of airflow by the front wing's end sections. By steering dirty tyre wake air outward, it keeps the underbody and floor inlets supplied with cleaner air."
      },
      {
        q: "A vortex in aerodynamics is…",
        opts: ["A sharp pressure spike on a wing surface","A rotating column of air that engineers can use to guide airflow","Turbulence that always wastes energy","Air moving in a perfectly straight line"],
        correct: 1,
        explanation: "A vortex is a spinning tube of air. While vortices do carry energy, engineers deliberately create them — for example at cascade tips — to act as rotating seals that keep airflow where it is needed."
      },
      {
        q: "Why do real teams use CFD and wind tunnels for front wing design rather than simple formulas?",
        opts: ["It is cheaper","Front wings are simple and formulas are not needed","The wing interacts with the tyre, floor and body in complex 3D ways","CFD is required by the regulations"],
        correct: 2,
        explanation: "The front wing does not live in isolation. It interacts with the rotating tyre, the ground, the nose and the floor all at once — a genuinely 3D problem that analytical formulas cannot capture accurately."
      }
    ]
  },

  "rear-wing-master": {
    title: "Rear Wing Master",
    questions: [
      {
        q: "Why does the rear wing typically need to create more downforce than the front wing?",
        opts: ["It is always bigger","The rear axle carries more of the car's weight and power goes through the rear tyres","The rear wing is in cleaner air","It is cheaper to manufacture"],
        correct: 1,
        explanation: "In a rear-wheel-drive race car, the rear tyres must transmit both acceleration and lateral forces. They carry more weight and need more grip, so engineers load the rear with more aerodynamic downforce."
      },
      {
        q: "What is the purpose of a multi-element (two-part) rear wing?",
        opts: ["It looks more impressive","Each element can be tuned separately for more total downforce than a single wing","It reduces total downforce","It is lighter"],
        correct: 1,
        explanation: "Multi-element wings use the slot gap effect: high-pressure air between the elements re-energises the upper surface boundary layer, allowing each element to run at a steeper angle before stalling — producing more total downforce."
      },
      {
        q: "DRS (Drag Reduction System) works by…",
        opts: ["Closing the rear diffuser","Opening a flap in the rear wing to reduce its angle and cut drag","Raising the ride height","Increasing the wing's camber"],
        correct: 1,
        explanation: "DRS actuates the upper rear wing flap, opening a gap and flattening the element's effective angle. The wing produces far less downforce — but also far less drag — enabling a large top-speed gain on straights."
      },
      {
        q: "Gurney flaps on a rear wing…",
        opts: ["Reduce downforce by smoothing the trailing edge","Are purely decorative","Add a small amount of extra downforce for little extra drag","Are the same as DRS"],
        correct: 2,
        explanation: "A Gurney flap is a small vertical tab at the wing's trailing edge. It creates a separation bubble that effectively increases the wing's circulation, gaining downforce for a surprisingly modest drag penalty."
      }
    ]
  },

  "venturi-theory": {
    title: "Venturi Theory",
    questions: [
      {
        q: "The Venturi effect says that when air passes through a narrowing channel…",
        opts: ["It slows down and pressure rises","It speeds up and pressure drops","Its temperature increases","It becomes turbulent"],
        correct: 1,
        explanation: "Continuity demands the same mass of air passes every point per second. When the channel narrows, air must speed up. By Bernoulli's principle, higher speed means lower static pressure."
      },
      {
        q: "Ground effect works because the underfloor of the car acts as…",
        opts: ["A parachute","A Venturi tunnel, accelerating air and creating low pressure under the car","A radiator","A spoiler"],
        correct: 1,
        explanation: "The floor and ground form a converging then diverging duct. Air is squeezed and accelerated under the car, creating a large low-pressure zone that sucks the car toward the track with great efficiency."
      },
      {
        q: "What happens if the underfloor is too close to the ground (porpoising)?",
        opts: ["Downforce increases indefinitely","The flow stalls and downforce suddenly collapses, then recovers, cycling rapidly","Drag disappears","The car becomes lighter"],
        correct: 1,
        explanation: "If the floor gets too close, the flow chokes, separates and the low-pressure zone collapses. The car rises, the flow reattaches, downforce returns, the car drops again — a rapid self-excited oscillation called porpoising."
      },
      {
        q: "Why was ground effect banned in F1 in 1983?",
        opts: ["It made cars too slow","It was too expensive to develop","Downforce was so powerful and speed-sensitive that crashes at high speed were very dangerous","It caused cooling problems"],
        correct: 2,
        explanation: "Ground-effect cars of the late 1970s generated enormous downforce, but if a skirt failed or the car went airborne briefly, downforce disappeared instantly. The resulting high-speed crashes were catastrophic."
      }
    ]
  },

  "diffusers-floors": {
    title: "Diffusers & Floors",
    questions: [
      {
        q: "What is the primary job of a diffuser?",
        opts: ["Create downforce directly by acting as a wing","Slow the fast underfloor air down gradually and raise its pressure before it exits","Cool the gearbox","Reduce the car's wheelbase"],
        correct: 1,
        explanation: "The diffuser is a pressure-recovery device. Fast, low-pressure air from under the floor must be decelerated smoothly. The expanding duct converts velocity back into pressure, allowing the low-pressure zone to persist rather than collapsing at the exit."
      },
      {
        q: "Why must the diffuser expand gradually rather than abruptly?",
        opts: ["Regulations require it","An abrupt expansion causes flow separation, killing the downforce","Gradual shapes are cheaper to make","To increase drag"],
        correct: 1,
        explanation: "If the pressure recovery is demanded too fast — too steep a diffuser angle — the boundary layer cannot keep up with the rising pressure and separates. The low-pressure zone collapses and downforce is lost."
      },
      {
        q: "What role does the floor play in modern ground-effect cars?",
        opts: ["Only to protect the driver","It is the primary downforce generator, using tunnels and shaped channels","It only reduces drag","It houses the fuel tank"],
        correct: 1,
        explanation: "Since 2022, F1 regulations allow shaped underfloor tunnels that are the dominant source of downforce — far more than the wings alone. The floor is the most important aerodynamic component on a modern ground-effect car."
      },
      {
        q: "Sealing the edges of the floor (side seals / skirts) helps because…",
        opts: ["It makes the car look cleaner","It stops high-pressure air from outside leaking under the floor and ruining the low-pressure zone","It reduces the car's weight","It helps cooling"],
        correct: 1,
        explanation: "The floor's low-pressure zone only works if high-pressure ambient air cannot sneak in from the sides. Edge sealing keeps the low-pressure tunnel intact across the full width of the floor."
      }
    ]
  },

  "aero-balance": {
    title: "Aero Balance",
    questions: [
      {
        q: "What does 'aero balance' refer to in race car setup?",
        opts: ["The total amount of downforce","The distribution of downforce between the front and rear of the car","The balance between lift and drag","How level the car sits on the track"],
        correct: 1,
        explanation: "Aero balance describes the front-to-rear split of downforce. Two cars can have identical total downforce but very different handling if one is front-biased and the other rear-biased."
      },
      {
        q: "Understeer happens when…",
        opts: ["The rear of the car rotates too much","The front lacks grip relative to the rear, so the car runs wide","There is too much downforce at the front","DRS is activated"],
        correct: 1,
        explanation: "Understeer (push) occurs when the front tyres are overloaded or the rear has more grip. The car tries to go straight instead of turning. More front downforce or less rear downforce shifts balance forward to correct it."
      },
      {
        q: "The 'center of pressure' is…",
        opts: ["A point where all aerodynamic forces on the car can be imagined to act together","The air pressure at the center of a wing","The midpoint between the two axles","A measurement taken in the wind tunnel only"],
        correct: 0,
        explanation: "The centre of pressure is the equivalent single point through which the total aerodynamic resultant force acts. Moving it forward increases front bias; moving it rearward increases rear bias."
      },
      {
        q: "If an engineer increases rear wing angle, what happens to aero balance?",
        opts: ["Balance shifts forward (more front bias)","Balance shifts rearward (more rear bias)","Balance is unaffected","Total downforce decreases"],
        correct: 1,
        explanation: "Adding rear wing angle increases rear downforce more than front downforce, shifting the centre of pressure rearward. The car gains rear grip but the driver may feel more understeer."
      }
    ]
  },

  "cooling-packaging": {
    title: "Cooling & Packaging",
    questions: [
      {
        q: "What is the core cooling-versus-drag trade-off?",
        opts: ["More cooling always reduces weight","Larger intakes give more cooling but interrupt smooth airflow and increase drag","Cooling only affects engine temperature, not aerodynamics","Smaller intakes always cool better"],
        correct: 1,
        explanation: "Bigger sidepod intakes capture more airflow for the radiators, keeping the engine cooler. But they also interrupt the smooth external airflow and increase frontal drag — a direct aerodynamic penalty."
      },
      {
        q: "When might a team choose to 'open up' cooling (larger intakes)?",
        opts: ["On fast, cool circuits to get extra downforce","On hot circuits or in high-load conditions to protect the engine","When they want to reduce lap time by any means","When the diffuser is damaged"],
        correct: 1,
        explanation: "At high ambient temperature or on circuits with long high-throttle sections, the engine generates more heat. Teams accept the aerodynamic cost of larger intakes to prevent overheating and protect reliability."
      },
      {
        q: "What does 'packaging' mean in race car design?",
        opts: ["How the car is transported to a race","Fitting all mechanical systems inside a body shape that still works aerodynamically","The way the tyres are wrapped","The sponsor livery on the bodywork"],
        correct: 1,
        explanation: "Packaging is the 3D puzzle of fitting the engine, gearbox, fuel cell, electronics, cooling and suspension into the smallest, most aerodynamically clean shape possible — every millimetre of space is contested."
      },
      {
        q: "Tight packaging (smaller body volume) can help aerodynamics because…",
        opts: ["It increases drag and downforce equally","It can improve airflow to the floor and rear of the car by keeping the body slim","It makes the car lighter automatically","It always reduces cooling"],
        correct: 1,
        explanation: "A narrower, tighter body exposes less frontal area to drag and keeps the sidepod surfaces from blocking airflow to the rear floor and diffuser. That is why teams invest heavily in packaging the mechanical components as tightly as possible."
      }
    ]
  }
};
