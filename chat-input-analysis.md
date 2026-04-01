# NexusAI Chat Input Bar — Deep Behavioral Analysis
**Source:** https://nexusai-db.netlify.app/
**Method:** Live DOM inspection, JavaScript execution, interaction simulation
**Date:** 2026-04-01

---

## Overview

The site has **two distinct chat input systems** that work in sequence:

1. **Homepage Hero Bar** — `#landing-input` (single-line `<input type="text">`)
   A simplified search-style input that triggers a 9-step guided discovery flow.

2. **Chat Hub Bar** — `#chat-input` (`<textarea>`)
   The full multi-feature chat input with auto-resize, toolbar, model selector, and message history.

The user starts on the homepage, completes the guided flow (or skips it), and transitions into the Chat Hub. The homepage input is the **entry point**; the Chat Hub is the **primary experience**.

---

## Step 1 — UI Structure & Component Hierarchy

### 1A. Homepage Hero Bar

```
body
└── div#hsc.hero-search-card                        ← outer pill card
    │   background: white
    │   border: 1px solid rgba(0,0,0,0.14)
    │   border-radius: 28px
    │   box-shadow: 0px 2px 12px rgba(0,0,0,0.09), 0px 8px 32px rgba(0,0,0,0.05)
    │   width: 680px (centered in hero)
    │
    ├── div#hs-input-row.hsb-row                    ← input + icons + CTA row
    │   │   display: flex; align-items: center
    │   │   [HIDDEN when focused — replaced by hsb-body]
    │   │
    │   ├── input#landing-input.hsb-input           ← text field
    │   │       type: text
    │   │       placeholder: "Click here and type anything — or just say hi! 👋"
    │   │       font: 15.68px "Instrument Sans"
    │   │       padding: 16px 0px 16px 24px
    │   │       border: none; background: transparent
    │   │       height: 51px; overflow: clip
    │   │
    │   ├── div.hsb-icons                           ← 6 icon buttons (flex row)
    │   │   ├── button#hero-mic-btn.hsb-btn         title: "Voice conversation"
    │   │   ├── button#hero-vtype-btn.hsb-btn       title: "Voice typing"
    │   │   ├── button.hsb-btn                      title: "Video" → nxToast('coming soon')
    │   │   ├── button.hsb-btn                      title: "Screen sharing" → nxToast('coming soon')
    │   │   ├── button.hsb-btn                      title: "Attach file" → #hf-file.click()
    │   │   └── button.hsb-btn                      title: "Upload image" → #hf-img.click()
    │   │
    │   ├── button.hsb-go-btn                       ← "🔍 Let's go" CTA (orange pill)
    │   ├── input#hf-file (type=file, hidden)
    │   └── input#hf-img (type=file, hidden)
    │
    └── div#hsb-body.hsb-body                       ← guided discovery dropdown
        │   display: none → block (on focus, gets class "open")
        │   width: 678px; height: grows to ~295px per step
        │
        ├── div#hs-welcome-phase                    ← "Welcome! You're in the right place." (display:none)
        ├── div#hs-questions-phase                  ← active question card (display:block)
        │   ├── [heading + subtitle]
        │   ├── [.hsb-opt grid — 2-col, 312px × 312px, 4–6 options per step]
        │   ├── [.hsb-dots — 9 progress dots: .done / .active / empty]
        │   └── [skip link — "Not sure, skip →"]
        └── div#hs-building-phase                   ← loading transition (display:none → block)
            ├── div "✨"
            ├── div "Building your personalised query…"
            └── div "Taking you to the Hub right away"
```

---

### 1B. Chat Hub — Full Component Hierarchy

```
div#chat-view                                       ← full-width flex row (1920px)
│   display: flex; flex-direction: row
│
├── aside.sidebar                                   ← LEFT PANEL (252px fixed)
│   ├── div.sb-sec (model list — 139 .sb-model items, scrollable)
│   └── div.sb-sec ("+ Create Agent" CTA)
│
├── main.central                                    ← CENTER PANEL (flex: 1 → ~1396px)
│   │   display: flex; flex-direction: column
│   │   background: rgb(244, 242, 238)             ← warm off-white (#F4F2EE)
│   │
│   ├── div#chat-area.chat-area                    ← MESSAGES SCROLL CONTAINER
│   │   │   flex: 1 1 0%; overflow-y: auto
│   │   │   display: flex; flex-direction: column
│   │   │   padding: 24px; gap: 16px
│   │   │   scroll-behavior: auto (JS-driven)
│   │   │
│   │   ├── div#greet-card-main.greet-card         ← welcome card (first load only)
│   │   ├── div.msg.user                           ← user messages
│   │   └── div.msg.ai                             ← AI messages
│   │
│   └── div.inp-area                               ← INPUT AREA (flex: 0 0 auto)
│       │
│       ├── div#hub-attach-row.hub-attach-row      ← attachment preview row (empty by default)
│       │
│       ├── div.inp-row                            ← main input row
│       │   │   display: flex; align-items: flex-end
│       │   │   gap: 8px; padding: 12px 20px 4px
│       │   │
│       │   ├── div.inp-wrap                       ← INPUT CARD (pill container)
│       │   │   │   flex: 1; width: ~1304px
│       │   │   │   background: rgb(244, 242, 238)
│       │   │   │   border: 1px solid rgba(0,0,0,0.14)
│       │   │   │   border-radius: 12px
│       │   │   │   overflow: hidden
│       │   │   │
│       │   │   ├── textarea#chat-input            ← TEXT INPUT
│       │   │   │       rows: 1
│       │   │   │       min-height: 44px; max-height: 120px
│       │   │   │       padding: 12px 16px
│       │   │   │       font-size: 14px; font-family: "Instrument Sans"
│       │   │   │       resize: none; overflow-y: auto
│       │   │   │       placeholder: "Describe your project, ask a question,
│       │   │   │                     or just say hi — I'm here to help…"
│       │   │   │
│       │   │   └── div.inp-bar                   ← TOOLBAR ROW (below textarea)
│       │   │       ├── button#hub-mic-btn.inp-icon-btn   "Voice conversation"
│       │   │       ├── button#hub-vtype-btn.inp-icon-btn "Voice typing"
│       │   │       ├── button.inp-icon-btn               "Video" (coming soon)
│       │   │       ├── button.inp-icon-btn               "Screen sharing" (coming soon)
│       │   │       ├── button.inp-icon-btn               "Attach file"
│       │   │       ├── button.inp-icon-btn               "Upload image"
│       │   │       ├── button.itool                      "✦ Prompt tips"
│       │   │       └── div.model-sel                     ← MODEL SELECTOR
│       │   │               span#active-model-label       "GPT-5.4"
│       │   │               svg (chevron ▾)
│       │   │
│       │   └── button.send-btn                   ← SEND BUTTON (outside inp-wrap)
│       │           width: 44px; height: 44px; border-radius: 50%
│       │           background: rgb(200, 98, 42) (#C8622A)
│       │           onclick: sendMsg()
│       │
│       ├── div#cpanel.cpanel                     ← PROMPT SUGGESTION PANEL
│       │   ├── div#cpanel-tabs                   ← 7 category tabs (.cpanel-tab)
│       │   └── div#cpanel-prompts                ← 6 prompts per tab (.cpanel-prompt)
│       │
│       └── div#inp-sugg.inp-sugg                 ← CONTEXTUAL PILLS (.isugg buttons)
│
└── div.rp-sec                                     ← RIGHT PANEL (271px fixed)
    └── div.qa-grid                                ← quick actions grid
        ├── [NAVIGATION & TOOLS — 6 items]
        ├── [CREATE & GENERATE — 8 items]
        └── [ANALYZE & WRITE — 5 items]
```

---

## Step 2 — Interaction Behavior

### 2A. Homepage Input Interactions

**Click / Focus:**
- `#hsc` receives CSS class `focused`
- `#hs-input-row` → `display: none` (the row with icons hides)
- `#hsb-body` → `display: block` with class `open` (dropdown expands)
- Border-radius changes from `28px` (pill) to `12px` (card-like)
- First question phase (`#hs-questions-phase`) becomes visible
- `#hs-welcome-phase` remains hidden (it's a brief welcome screen shown only on initial load)

**Typing:**
- Single-line `<input type="text">` — no auto-resize, no multiline
- `overflow: clip` — no scrollbar visible even if text overflows

**Quick Action Card Click:**
- `quickLaunch(promptString)` is called
- Sets `#landing-input` value to the prompt
- Triggers the guided flow OR sends directly to Chat Hub

**"Let's go" Button:**
- Submits whatever text is in `#landing-input` and navigates to Chat Hub

### 2B. Chat Hub Textarea Interactions

**Auto-resize logic (confirmed by live testing):**
```
Initial height:       44px  (1 line, rows=1)
After 1 line of text: 44px  (no change — min-height holds)
After multiple lines: grows dynamically up to 120px (max-height)
After max-height:     scrolls internally (overflow-y: auto kicks in)
Resize property:      none  (no manual drag resize)
```

**Enter Key:**
- Submits the message immediately (`sendMsg()` fires)
- Textarea value clears
- Height resets to 44px

**Shift + Enter:**
- Also submits — does NOT insert a newline
- Multiline input is not supported in the current implementation

**Typing (live resize):**
- On every `input` event, `style.height` is set dynamically
- The textarea grows pixel by pixel with content
- At max-height (120px), internal scrollbar appears

**Send Button:**
- Not disabled when textarea is empty — always active
- No visual state change based on input presence
- 0.2s CSS transition on hover/click

**Model Selector (`.model-sel`):**
- Click opens model selection via left sidebar — no inline dropdown
- Clicking a `.sb-model` in the sidebar updates `#active-model-label` immediately
- 139 models available, sidebar is scrollable

---

## Step 3 — Message Lifecycle

### 3A. Homepage → Chat Hub Transition

```
User focuses #landing-input
        ↓
#hsb-body expands — guided questions shown
        ↓
User picks answers for 9 steps (or skips)
        ↓
hsInlinePick('constraint', value) fires on final step
        ↓
#hs-questions-phase → display:none
#hs-building-phase  → display:block (✨ "Building…")
        ↓
#landing-input.value set to structured prompt:
  "[Guided Search] I am {role}. I want to: {task}.
   Context: {context}. Please respond in a {tone} tone.
   Format the output as {format}. The output is for: {audience}.
   Please recommend the best AI models or tools on NexusAI
   that can help me with this."
        ↓
~500ms delay → page navigates / scrolls to Chat Hub
        ↓
Structured prompt auto-submitted as first message
```

### 3B. Free-Form Chat Message Lifecycle

```
1. User types text into #chat-input (textarea)
        ↓
2. User presses Enter OR clicks .send-btn
        ↓
3. sendMsg() executes:
   a. Read textarea.value
   b. If empty → return (no send)
   c. Create div.msg.user:
        div.msg-av ("U")
        div.bubble (message text)
   d. Append .msg.user to #chat-area
   e. Clear textarea (value = "")
   f. Reset textarea height to 44px
        ↓
4. #chat-area scrolls to bottom (scrollTop = scrollHeight)
        ↓
5. Create div.msg.ai (immediately):
        div.msg-av ("✦")
        div (content placeholder)
        [typing-ind dots appear inside content div]
        ↓
6. Append .msg.ai to #chat-area
        ↓
7. #chat-area scrolls to bottom again
        ↓
8. After simulated delay:
   - Replace typing-ind with response text
   - Append div.msg-meta: "NexusAI Hub · {model-name}"
        ↓
9. #chat-area scrolls to bottom one final time
```

### 3C. Prompt Card Submission (from cpanel)

```
User clicks .cpanel-prompt button
        ↓
sendMsg('prompt text') fires directly (bypasses textarea)
        ↓
hideCPanel() hides the suggestion panel
        ↓
Same lifecycle as Step 3B from step 3 onwards
```

---

## Step 4 — Visual Feedback & States

### 4A. Homepage Input States

| State | Element | Visual Change |
|-------|---------|--------------|
| **Idle** | `#hsc` | White pill, subtle box-shadow, grey border |
| **Focused** | `#hsc` | Gets class `focused`, orange border (`#C8622A`), dropdown expands |
| **Question active** | `#hsb-body` | Gets class `open`, height ~295px, question grid visible |
| **Step dot — done** | `.hsb-dot.done` | Filled orange |
| **Step dot — active** | `.hsb-dot.active` | Slightly larger, orange |
| **Step dot — future** | `.hsb-dot` | Grey/empty |
| **Building phase** | `#hs-building-phase` | ✨ emoji + text animation |

### 4B. Chat Hub Input States

| State | Element | Visual Change |
|-------|---------|--------------|
| **Idle** | `div.inp-wrap` | `border: 1px solid rgba(0,0,0,0.14)` |
| **Focused** | `div.inp-wrap` | `border: 1px solid rgb(200, 98, 42)` (accent orange) |
| **Typing (1 line)** | `textarea` | Height stays at 44px |
| **Typing (multi-line)** | `textarea` | Height grows to max 120px |
| **Overflowing** | `textarea` | Internal scroll, height locked at 120px |
| **Submitted** | `textarea` | Clears to empty, resets to 44px |
| **Send button idle** | `.send-btn` | Orange circle `#C8622A`, 0.2s transition |
| **Send button hover** | `.send-btn` | Opacity/scale change (0.2s ease) |
| **Message sending** | `#chat-area` | User `.msg.user` appended immediately |
| **AI typing** | `.msg.ai` | `.typing-ind` div with 3 animated dots (class: `ob-dots-row`) |
| **AI response ready** | `.msg.ai` | Content replaced, `.msg-meta` appended |
| **Toast notification** | `.show` div | Appears/disappears for model selection feedback |

### 4C. Message State Classes

```css
.msg.user   → flex-direction: row-reverse  (right-aligned)
.msg.ai     → flex-direction: row          (left-aligned)
.msg-meta   → "NexusAI Hub · {model}"     (shown below AI responses)
.typing-ind → animated dots during AI response generation
```

---

## Step 5 — Layout & Positioning

### 5A. Global Layout

```
Viewport: 1920 × 893px

div.app-nav (navbar)
  top: 0; left: 0; width: 100%; height: 55px
  position: fixed (sticky top)

div#chat-view (main body)
  top: 55px; width: 100%; height: calc(100vh - 55px)
  display: flex; flex-direction: row

  aside.sidebar      → width: 252px; flex-shrink: 0
  main.central       → flex: 1 (fills remaining space, ~1396px at 1920px)
  div.rp-sec         → width: 271px; flex-shrink: 0
```

### 5B. Central Panel Layout

```
main.central (flex column, height: 838px at 1920×893 viewport)
  ├── div#chat-area      → flex: 1 1 0%     (grows to fill, ~580px)
  │                         overflow-y: auto
  └── div.inp-area       → flex: 0 0 auto   (fixed height, ~258px)
       ├── div#hub-attach-row  → height: 0 (empty state)
       ├── div.inp-row         → ~111px (includes textarea + toolbar)
       │    ├── div.inp-wrap   → width: ~1304px; height: 95px
       │    └── button.send-btn → 44×44px circle (outside inp-wrap)
       └── div#cpanel          → height: 142px (tabs + prompts)
```

### 5C. Input Bar Exact Measurements

| Element | Width | Height | Position |
|---------|-------|--------|---------|
| `div.inp-row` | 1396px (full central) | 111px | padding: 12px 20px 4px |
| `div.inp-wrap` | ~1304px | 95px | flex:1 inside inp-row |
| `textarea#chat-input` | ~1302px | 44–120px | inside inp-wrap |
| `div.inp-bar` | ~1302px | 42px | below textarea inside inp-wrap |
| `button.send-btn` | 44px | 44px | right of inp-wrap in inp-row |
| `div.model-sel` | ~55px | 18px | right side of inp-bar |

### 5D. Message Widths

```
User message (.msg.user):
  Container width: 680px (right-aligned within chat-area)
  Bubble max-width: 520px
  Avatar: 32px circle (right side due to row-reverse)

AI message (.msg.ai):
  Container width: ~680px (left-aligned)
  Content area max-width: none (can fill available space)
  Avatar: 32px circle (left side)
```

### 5E. Responsive Behavior

The layout uses fixed pixel widths for sidebar (252px) and right panel (271px) with no observed media queries or responsive breakpoints at the 1920px viewport tested. At smaller viewports the panels would cause horizontal overflow — no responsive layout was detected in the DOM.

---

## Step 6 — Message Rendering

### 6A. Message DOM Structure

**User Message:**
```html
<div class="msg user">
  <!-- flex-direction: row-reverse → avatar on right, bubble on left-ish -->
  <div class="msg-av">U</div>              <!-- 32px orange circle, letter "U" -->
  <div class="bubble">
    {message text}                          <!-- orange bg (#C8622A), white text -->
  </div>
</div>
```

User bubble styles:
```css
background: rgb(200, 98, 42)    /* #C8622A — accent orange */
color: rgb(255, 255, 255)
border-radius: 12px 12px 4px    /* flat bottom-right corner */
padding: 13.6px 17.6px
max-width: 520px
font-size: 14px
font-family: "Instrument Sans", sans-serif
line-height: 23.1px
```

**AI Message:**
```html
<div class="msg ai">
  <!-- flex-direction: row → avatar left, content right -->
  <div class="msg-av">✦</div>              <!-- 32px orange circle, ✦ sparkle -->
  <div>                                     <!-- transparent bg, free-width -->
    {response text / HTML content}
    {embedded choice cards / model cards}
    <div class="msg-meta">
      NexusAI Hub · {model-name}            <!-- grey status line -->
    </div>
  </div>
</div>
```

AI content styles:
```css
background: transparent
color: rgb(28, 26, 22)           /* near-black */
font-size: 16px                  /* larger than user (14px) */
font-family: "Instrument Sans", sans-serif
line-height: 25.6px
max-width: none                  /* fills available space */
```

### 6B. Avatar Styles

```css
/* Both user and AI avatars share: */
.msg-av {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgb(200, 98, 42);   /* orange */
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ~14px;
  flex-shrink: 0;
}

.msg.user .msg-av → text: "U"
.msg.ai   .msg-av → text: "✦"
```

### 6C. Special Message Types

**Greet Card (`#greet-card-main.greet-card`):**
- Shown only on first load before any messages
- Contains: `.greet-avatar` (✦), `<h3>` welcome heading, `<p>` subtitle, task grid, footer text
- Hidden/pushed up once first message is sent

**Choice Cards (inside `.msg.ai`):**
- Rendered inside AI message content div
- Used for guided questions in Chat Hub: "Who will be using this AI?"
- 6 options in 2-col grid: Just me, My team, My company, My customers, Students, Anyone/public
- Each option is a button that calls `sendMsg(answer)`

**msg-meta (status line):**
```css
.msg-meta {
  /* small grey text below AI message content */
  font-size: ~11px;
  color: CLONE_TOKENS.text3 (grey);
  margin-top: 8px;
}
/* text format: "NexusAI Hub · {model-name}" */
/* e.g. "NexusAI Hub · guided setup" or "NexusAI Hub · GPT-5.4" */
```

### 6D. Scroll Behavior

- `#chat-area` uses `overflow-y: auto` — native browser scroll
- After each message sent: scroll position = `scrollHeight - clientHeight` (bottom)
- Scroll is **JavaScript-driven** (no CSS `scroll-behavior: smooth` found)
- No virtual scrolling — all messages remain in DOM
- `scrollHeight` grows linearly with message count

---

## Step 7 — Functional Capabilities

### 7A. Homepage Bar

| Feature | Implementation | Status |
|---------|---------------|--------|
| Text input | `<input type="text">` | ✅ Functional |
| Focus → guided flow | CSS class swap + JS | ✅ Functional |
| 9-step questionnaire | `hsInlinePick(field, value)` | ✅ Functional |
| 9-dot progress indicator | `.hsb-dots` + `.hsb-dot` states | ✅ Functional |
| Skip step | `hsInlinePick` with null/skip | ✅ Functional |
| Prompt generation | Structured string assembly | ✅ Functional |
| Building phase animation | ✨ text + transition to Chat Hub | ✅ Functional |
| Voice conversation | `toggleHeroMic(event)` | ✅ Wired |
| Voice typing | `toggleHeroMic(event)` | ✅ Wired |
| Video input | `nxToast('coming soon')` | 🔲 Coming Soon |
| Screen sharing | `nxToast('coming soon')` | 🔲 Coming Soon |
| File attachment | Hidden `<input type="file">` | ✅ Wired |
| Image upload | Hidden `<input type="file">` | ✅ Wired |
| Quick action cards | `quickLaunch(promptString)` | ✅ Functional |
| "Let's go" button | Submits input + navigates | ✅ Functional |

### 7B. Chat Hub Bar

| Feature | Implementation | Status |
|---------|---------------|--------|
| Text input | `<textarea>` rows=1 | ✅ Functional |
| Auto-resize (44px → 120px) | JS `input` event + `style.height` | ✅ Functional |
| Enter to submit | `keydown` Enter → `sendMsg()` | ✅ Functional |
| Shift+Enter | Same as Enter (no newline) | ⚠️ No multiline |
| Send button | `onclick="sendMsg()"` | ✅ Functional |
| Textarea clears on send | `value = ""` in `sendMsg()` | ✅ Functional |
| Height resets on send | `style.height = initial` | ✅ Functional |
| Auto-scroll to bottom | JS scroll after each message | ✅ Functional |
| Voice conversation | `hub-mic-btn` → `toggleHeroMic()` | ✅ Wired |
| Voice typing | `hub-vtype-btn` → `toggleHeroMic()` | ✅ Wired |
| Video input | `nxToast('coming soon')` | 🔲 Coming Soon |
| Screen sharing | `nxToast('coming soon')` | 🔲 Coming Soon |
| File attachment | `hub-file` click trigger | ✅ Wired |
| Image upload | `hub-img` click trigger | ✅ Wired |
| Prompt tips (✦) | `.itool` sparkle button | ✅ Wired |
| Model selector | Sidebar `.sb-model` click | ✅ Functional (139 models) |
| Prompt suggestion tabs | 7 categories × 6 prompts | ✅ Functional |
| Contextual suggestion pills | `#inp-sugg .isugg` buttons | ✅ Functional |
| File attachment preview | `#hub-attach-row` | ✅ Functional (empty by default) |
| Toast notifications | `nxToast(message)` | ✅ Functional |
| Message history | DOM append, session only | ✅ Functional (no persistence) |

### 7C. Guided Discovery Flow — 9 Steps

| # | Question | Field | Options |
|---|----------|-------|---------|
| 1 | What do you want to do? | `task` | ✍️ Write something, 🎨 Make pictures or art, 💻 Build something, 📊 Make sense of info, ⚡ Save time on boring tasks, 💬 Get help or answers |
| 2 | What best describes you? | `role` | 🎓 Still learning, 💼 I work in an office, 🎨 I make things, 📣 I run or sell things, 💻 I build with computers, 🏠 Just for myself |
| 3 | Where will you use this? | `context` | 🏢 At work, 🎓 For school or study, 📱 Online or social media, 🛒 For a product or shop, 🌀 Just exploring |
| 4 | How should it sound? | `tone` | 😊 Warm and friendly, 👔 Clean and proper, 📖 Clear and easy, 🚀 Bold and exciting |
| 5 | What should the answer look like? | `format` | 📝 A full piece of writing, 📋 A simple list, 📊 A short summary, 💡 A few different ideas, 🗣️ Explained in plain words |
| 6 | Who will see or use this? | `audience` | 🙋 Just me, 👥 My team or coworkers, 👤 Customers or clients, 🌍 Anyone and everyone |
| 7 | How much detail? | `depth` | ⚡ Short and sweet, 📏 Full and detailed, 🎯 One clear answer, 🧩 Bite-sized pieces |
| 8 | Have you used AI before? | `experience` | 👋 Never tried it, 🙂 A little bit, 🧠 I use it regularly, 🔧 I build things with it |
| 9 | Anything to avoid? | `constraint` | 🔒 Keep it simple, 🌐 Stay neutral, 🎯 Be direct, ✅ No preference |

**Generated Prompt Template:**
```
[Guided Search] I am {role}. I want to: {task}. Context: {context}.
Please respond in a {tone} tone. Format the output as {format}.
The output is for: {audience}. Please keep it {depth}.
Constraint: {constraint}. Please recommend the best AI models
or tools on NexusAI that can help me with this.
```

### 7D. Prompt Category Tabs (cpanel)

| Tab Label | key | Prompt Examples |
|-----------|-----|-----------------|
| Use cases | `use_cases` | "Help me find the best AI model for my project", "I want to build an AI chatbot for my website" |
| Monitor the situation | `monitor` | Situational awareness prompts |
| Create a prototype | `prototype` | Prototyping and MVP prompts |
| Build a business plan | `business` | Business planning prompts |
| Create content | `create` | Content creation prompts |
| Analyze & research | `analyze` | Research and data prompts |
| Learn something | `learn` | Education and tutorial prompts |

---

## Integration Specification for Our Agent Workflow

### Key Differences — Reference Site vs Our Implementation

| Aspect | Reference Site | Our Implementation Target |
|--------|---------------|--------------------------|
| Backend | No real backend — all responses are simulated client-side | Mock JSON responses in `frontend/src/mock/agent-responses.ts` |
| AI responses | Hardcoded strings in inline JS | `getNextResponse(category)` + `formatAgentResponse()` |
| Guided flow | 9-step form filling landing-input | Our `useChatSimulation` hook with `ChatPhase` state machine |
| Model selector | Sidebar .sb-model click → updates label | Our `model-sel` can show agent selector (frontend/backend/qa) |
| Prompt categories | 7 tabs × 6 prompts each | Our cpanel maps to agent categories |
| Message lifecycle | Immediate sync append | Our async `showTypingThen()` with simulated delay |
| Structured prompt | `[Guided Search]` prefix | Our guided flow produces same format |
| msg-meta | "NexusAI Hub · {model}" | Map to "NexusAI Hub · {agent-name} · {status}" |

### Component Mapping

```
Reference Site               Our Implementation
─────────────────────────────────────────────────────
#landing-input              → CloneChatPage homepage input (not yet built, skipped)
#hsb-body guided flow       → useChatSimulation welcome + guided steps
.hsb-opt choice cards       → CloneChoiceCard component ✅
div#hs-building-phase       → CloneTypingIndicator component ✅
textarea#chat-input         → InputBase in CloneChatPage ✅
div.inp-bar toolbar         → 7 icon buttons in CloneChatPage ✅
div.model-sel               → Model chip in CloneChatPage toolbar ✅
button.send-btn             → Send button in CloneChatPage ✅
div.msg.user                → user_text ChatItem → CloneChatBubble ✅
div.msg.ai                  → ai_text ChatItem → CloneChatBubble ✅
div.msg-meta                → statusLabel prop on CloneChatBubble ✅
div#cpanel tabs             → cpanel-tab row below input ✅
div#inp-sugg pills          → suggestion pills above input (partial)
div.typing-ind              → CloneTypingIndicator ✅
```

### Critical Behaviors to Replicate

1. **Textarea auto-resize** — `onInput` event recalculates `scrollHeight`, clamps to `maxHeight: 120px`
2. **Enter submits, Shift+Enter also submits** — No multiline support needed
3. **Textarea clears + resets height** — immediately on submit (before AI response appears)
4. **Auto-scroll** — scroll to bottom after every message append
5. **Typing indicator** — appears as `.msg.ai` child with animated dots before response
6. **msg-meta status label** — shown below every AI message, format: `"NexusAI Hub · {agent}"`
7. **Focus state** — `inp-wrap` border changes to `#C8622A` on textarea focus
8. **Model selector updates** — clicking sidebar model updates label in toolbar
9. **Cpanel hide on prompt click** — `hideCPanel()` after `sendMsg()` in prompt buttons
10. **`[Guided Search]` prefix** — structured prompt prepended when coming from guided flow

---

*Analysis complete. All data captured via live DOM inspection and JavaScript execution.*
