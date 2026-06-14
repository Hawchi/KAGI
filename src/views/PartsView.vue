  <template>
    <div class="parts-page">

      <!-- HUD overlay -->
      <div class="hud" aria-hidden="true">
        <div class="hud-progress" :style="`--p: ${scrollProgress}`"></div>
        <div class="hud-grid"></div>
        <div class="hud-rule top"></div>
        <div class="hud-rule bot"></div>
        <span class="cross tl"></span><span class="cross tr"></span>
        <span class="cross bl"></span><span class="cross br"></span>
        <div class="hud-read tl">KAGI <b>鍵</b> / FIELD&nbsp;GUIDE</div>
        <div class="hud-read tr">秋葉原 — TOKYO<br>EST. <b>MMXXVI</b></div>
        <div class="hud-read bl">Y&nbsp;<b>{{ coordY }}</b> · POS <b>{{ coordPct }}%</b></div>
        <div class="hud-read br">SEC <b>{{ activeSec }}</b></div>
      </div>

      <!-- Vertical katakana ticker -->
      <div class="ticker" aria-hidden="true">
        <div class="ticker-track">鍵　・　カスタムメカニカルキーボード　・　KAGI FIELD GUIDE　・　秋葉原　・　七つの部品　・　</div>
      </div>

      <!-- Sticky side index -->
      <nav class="index" aria-label="Parts index">
        <a v-for="p in parts" :key="p.id" :href="`#${p.id}`" :class="{ active: activeId === p.id }" @click.prevent="scrollTo(p.id)">
          <span class="lbl">{{ p.indexLabel }}</span>
          <span class="dash"></span>
        </a>
      </nav>

  <!-- Hero -->
  <header class="hero">
    <div class="hero-inner wrap">
      <div class="hero-eyebrow-row" data-reveal>
        <span class="eyebrow">Field Guide No.01</span>
        <span class="hero-jp">カスタムメカニカルキーボード入門</span>
      </div>

      <div class="hero-body">
        <div class="hero-left">
          <h1 class="wordmark" data-reveal>
            <span v-for="(c, i) in scrambledLetters" :key="i" class="wm-l">{{ c }}</span><span class="dot"></span>
          </h1>

          <p class="hero-tag" data-reveal>
          A field guide to the custom mechanical keyboard, <span class="pink">seven parts</span>, one key.
          </p>

          <div class="hero-ticker" data-reveal aria-hidden="true">
            <div class="ticker-inner">
              <span v-for="p in [...parts, ...parts]" :key="p.id + Math.random()" class="tick-item">▸ {{ p.indexLabel }}</span>
            </div>
          </div>
        </div>

        <div class="hero-right" data-reveal aria-label="Parts index">
          <a
            v-for="(p, i) in allParts"
            :key="p.id"
            :href="`#${p.id}`"
            class="hero-part-row"
            @click.prevent="scrollTo(p.id)"
          >
            <span class="hpr-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="hpr-div"></span>
            <span class="hpr-label">{{ p.label }}</span>
            <span class="hpr-jp">{{ p.jpLabel }}</span>
          </a>
        </div>
      </div>
    </div>
  </header>

      <main class="content">

        <!-- ═══ CASE — interactive variants ═══ -->
        <section id="p1" class="part" data-part="p1" data-label="ケース">
          <div class="wrap">

            <div class="part-head" data-reveal>
              <div class="part-num">01<span class="tot">/07</span></div>
              <div class="part-meta">ケース<br><b>FOUNDATION</b></div>
            </div>

            <!-- Static intro -->
            <div class="part-intro" data-reveal>
              <div class="part-jp">ケース</div>
              <h2 class="part-name">Case</h2>
              <div class="part-romaji">KĒSU — 筐体</div>
              <p class="part-role-text">The chassis. Everything mounts to it, and it decides how the board sounds and how it sits.</p>
            </div>

            <!-- Variant picker -->
            <div class="variant-picker" data-reveal>
              <span class="col-h">Select material</span>
              <div class="vpick-row">
                <button
                  v-for="v in caseVariants"
                  :key="v.id"
                  class="vpick-btn"
                  :class="{ active: activeCaseVariant === v.id }"
                  @click="selectCaseVariant(v.id)"
                >
                  <span class="vpick-sym">{{ v.sym }}</span>
                  <span class="vpick-name">{{ v.name }}</span>
                </button>
              </div>
            </div>

            <!-- Variant detail — wipe transition -->
            <div class="variant-detail" data-reveal>
              <div class="vd-left">
                <Transition name="vd-blur" mode="out-in">
                  <div :key="activeCaseVariant" class="vd-text">
                    <p class="vd-tagline">{{ activeCaseData.tagline }}</p>
                    <p class="vd-body" v-for="b in activeCaseData.body" :key="b" v-html="b"></p>
                    <div class="vd-specs">
                      <div class="spec" v-for="s in activeCaseData.specs" :key="s.k">
                        <dt>{{ s.k }}</dt>
                        <dd>{{ s.v }}</dd>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
          <div class="vd-right">
            <Transition name="vd-blur" mode="out-in">
              <div
                :key="activeCaseVariant"
                class="slot slot-frame vd-slot"
                :class="{ 'is-clickable': activeCaseData.imgBack }"
                @click="activeCaseData.imgBack && (polyFlipped = !polyFlipped)"
              >
                <span class="corner a"></span><span class="corner b"></span>
                <span class="corner c"></span><span class="corner d"></span>
                <Transition name="vd-blur" mode="out-in">
                  <img
                    :key="polyFlipped ? 'back' : 'front'"
                    :src="polyFlipped && activeCaseData.imgBack ? activeCaseData.imgBack : activeCaseData.img"
                    :alt="activeCaseData.name"
                    class="slot-img"
                  />
                </Transition>
                <span class="slot-tag">{{ activeCaseData.figLabel }}</span>
                <span class="slot-cap">
                  <template v-if="activeCaseData.imgBack">
                    CLICK TO FLIP ▸ <b>{{ polyFlipped ? 'BACK' : 'FRONT' }}</b>
                  </template>
                  <template v-else>
                    RENDER ▸ <b>{{ activeCaseData.imgLabel }}</b>
                  </template>
                </span>
              </div>
            </Transition>
          </div>
            </div>

            <!-- Considerations (static) -->
            <div class="part-grid" data-reveal>
              <div>
                <div class="col-h">Considerations</div>
                <ul class="consider">
                  <li v-html="`<span>${c}</span>`" v-for="c in caseConsiderations" :key="c"></li>
                </ul>
              </div>
              <div>
                <div class="col-h">Mounting styles</div>
                <ul class="consider">
                  <li v-for="m in caseMounts" :key="m" v-html="`<span>${m}</span>`"></li>
                </ul>
              </div>
            </div>

            <!-- Form factors -->
            <div class="ff-col" data-reveal>
              <div class="col-h">Form factors</div>
              <Transition name="vd-blur" mode="out-in">
                <div :key="activeFormFactor" class="ff-preview">
                  <div class="slot slot-frame ff-slot">
                    <span class="corner a"></span><span class="corner b"></span>
                    <span class="corner c"></span><span class="corner d"></span>
                    <img
                      v-if="activeFormFactorData.img"
                      :src="activeFormFactorData.img"
                      :alt="activeFormFactorData.name"
                      :style="{ objectPosition: activeFormFactorData.imgPos }"
                      class="slot-img"
                    />
                    <span class="slot-tag">{{ activeFormFactorData.pct }}% — {{ activeFormFactorData.name }}</span>
                    <span class="slot-cap">{{ activeFormFactorData.keyboard }} · <b>{{ activeFormFactorData.keys }} keys · {{ activeFormFactorData.desc }}</b></span>
                  </div>
                  <div class="ff-right">
                    <p class="ff-intro">▸ Click a size to explore</p>
                    <div class="ff-row">
                      <button
                        v-for="f in caseFormFactors"
                        :key="f.id"
                        class="ff-btn"
                        :class="{ active: activeFormFactor === f.id }"
                        @click="activeFormFactor = f.id"
                      >
                        <span class="ff-pct">{{ f.pct }}%</span>
                        <span class="ff-name">{{ f.name === f.pct + '%' ? '' : f.name }}</span>
                      </button>
                    </div>
                    <p class="ff-note">{{ activeFormFactorData.note }}</p>
                  </div>
                </div>
              </Transition>
            </div>

          </div>
        </section>

        <!-- ═══ Remaining parts (standard layout) ═══ -->
        <section
          v-for="(part, idx) in otherParts"
          :key="part.id"
          :id="part.id"
          class="part"
          :data-part="part.id"
          :data-label="part.jpLabel"
        >
          <div class="wrap">
            <div class="part-head" data-reveal>
              <div class="part-num">{{ String(idx + 2).padStart(2, '0') }}<span class="tot">/07</span></div>
              <div class="part-meta">{{ part.jpLabel }}<br><b>{{ part.role }}</b></div>
            </div>
            <div class="part-top">
              <div class="part-title-col" data-reveal>
                <div class="part-jp">{{ part.jpLabel }}</div>
                <h2 class="part-name">{{ part.label }}</h2>
                <div class="part-romaji">{{ part.romaji }}</div>
                <p class="part-role-text">{{ part.tagline }}</p>
                <p class="part-body" v-for="body in part.body" :key="body" v-html="body"></p>
              </div>
              <div class="part-media" data-reveal>
                <div class="slot slot-frame">
                  <span class="corner a"></span><span class="corner b"></span>
                  <span class="corner c"></span><span class="corner d"></span>
                  <img v-if="part.img" :src="part.img" :alt="part.label" class="slot-img" />
                  <span class="slot-tag">FIG.{{ String(idx + 2).padStart(2, '0') }} / 4:3</span>
                  <span class="slot-cap">RENDER ▸ <b>{{ part.imgLabel }}</b></span>
                </div>
              </div>
            </div>
            <div class="part-grid">
              <div data-reveal>
                <div class="col-h">Specs</div>
                <dl>
                  <div class="spec" v-for="s in part.specs" :key="s.k">
                    <dt>{{ s.k }}</dt><dd>{{ s.v }}</dd>
                  </div>
                </dl>
              </div>
              <div data-reveal>
                <div class="col-h">Considerations</div>
                <ul class="consider">
                  <li v-for="c in part.considerations" :key="c" v-html="`<span>${c}</span>`"></li>
                </ul>
              </div>
              <div data-reveal>
                <div class="col-h">Variants</div>
                <div class="chips">
                  <span v-for="v in part.variants" :key="v.name" class="chip" :class="{ key: v.key }">{{ v.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Outro -->
        <section class="outro">
          <div class="wrap">
            <div class="build-head" data-reveal>
              <h2 class="build-title">The <span class="pink">Build</span> Order</h2>
              <span class="eyebrow dim">組立順 / ASSEMBLY 01 → 07</span>
            </div>
            <div class="build-list" data-reveal>
              <div class="build-row" v-for="(p, i) in allParts" :key="p.id">
                <span class="bn">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="bname">{{ p.label }}<span class="jp">{{ p.jpLabel }}</span></span>
                <span class="brole">{{ p.buildRole }}</span>
              </div>
            </div>
          </div>
          <div class="coda" data-reveal>
            <div class="coda-kanji">鍵</div>
            <p class="coda-line">Find your <span class="pink">key</span>.</p>
            <p class="coda-jp">あなたの鍵を見つけよう</p>
          </div>
        </section>

      </main>
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const activeId    = ref('p1')
  const activeSec   = ref('INTRO')
  const coordY      = ref('00000')
  const coordPct    = ref('000')
  const scrollProgress = ref(0)

  // ── Scramble ───────────────────────────────────────────────
  const WORD = 'KAGI'
  const CHARSET = '0123456789ABCDEF#%*アイウエオカキ'
  const scrambledLetters = ref(WORD.split(''))

  function runScramble() {
    const settle = 800
    const start = performance.now()
    let raf

    const tick = (now) => {
      const p = Math.min((now - start) / settle, 1)
      const reveal = Math.floor(p * WORD.length)
      scrambledLetters.value = WORD.split('').map((c, i) =>
        i < reveal ? c : CHARSET[Math.floor(Math.random() * CHARSET.length)]
      )
      if (p < 1) raf = requestAnimationFrame(tick)
      else scrambledLetters.value = WORD.split('')
    }
    raf = requestAnimationFrame(tick)
  }

  // ── Case variant state ─────────────────────────────────────
  const activeCaseVariant = ref('alu')
  const polyFlipped = ref(false)

  const caseVariants = [
    { id: 'alu', name: 'Aluminium' },
    { id: 'poly', name: 'Polycarbonate' },
    { id: 'plastic', name: 'Plastic' },
    { id: 'acrylic', name: 'Acrylic' },
  ]

  const caseVariantData = {
    alu: {
      name: 'Aluminium',
      figLabel: 'Neo60 Core',
      imgLabel: 'ALUMINIUM UNIBODY · 筐体',
      img: '/images/case-alu-front.jpg',
      imgBack: '/images/case-alu-back.jpg',
      tagline: 'The gold standard. Heavy, resonant, and built to last decades.',
      body: [
        'Aluminium cases are the benchmark of the custom keyboard world. The alloy used (usually <strong>6063 or 6061</strong>) is dense and rigid, which gives a deep, satisfying thud when you type. No plastic can replicate that feeling. The <strong>anodized coating</strong> (a thin protective layer baked onto the surface) means the finish holds up for decades without scratching or fading.',
        'The weight keeps the board planted on your desk with zero movement. Pair with a <strong>gasket mount</strong> for a soft, muted sound, or a <strong>top mount</strong> for a firmer, more direct feel. Either way, aluminium rewards the investment.',
      ],
      specs: [
        { k: 'Material', v: '6063 Aluminium' },
        { k: 'Weight', v: '~1.2 kg' },
        { k: 'Sound', v: 'Deep & thocky' },
        { k: 'Finish', v: 'Anodized' },
        { k: 'Price range', v: '$$$' },
      ],
    },
    poly: {
      name: 'Polycarbonate',
      figLabel: 'Singakbd PC Kohaku',
      imgLabel: 'POLYCARBONATE CASE · 筐体',
      img: '/images/case-poly-front.jpg',
      imgBack: '/images/case-poly-back.jpg',
      tagline: 'Transparent, flexible, and surprisingly good sounding.',
      body: [
        'Polycarbonate (PC) cases are a favourite for their <strong>natural flex</strong> and ability to show off per-key RGB from every angle. The material absorbs sound differently from aluminium, resulting in a softer, more muted tone.',
        'PC scratches more easily than aluminium, but the <strong>visual payoff</strong> is unmatched. Pair with linear switches and a diffused film for a clean, glowing aesthetic.',
      ],
      specs: [
        { k: 'Material', v: 'Polycarbonate' },
        { k: 'Weight', v: '~600 g' },
        { k: 'Sound', v: 'Soft & muted' },
        { k: 'Finish', v: 'Transparent' },
        { k: 'Price range', v: '$$' },
      ],
    },
    plastic: {
      name: 'Plastic (ABS)',
      figLabel: 'Feker IK75 / 75v3',
      imgLabel: 'ABS PLASTIC CASE · 筐体',
      img: '/images/case-plastic.jpg',
      tagline: 'Light, affordable, and the perfect starting point.',
      body: [
      'ABS plastic cases are what most budget and entry-level keyboards use. They are light, inexpensive, and perfectly functional for a first build. The hollow sound can be fixed with case foam.',
      'Do not dismiss plastic. With the right <strong>foam and dampening mods</strong>, a plastic case can punch well above its price. Great for experimenting without committing a big budget.',
    ],
      specs: [
        { k: 'Material', v: 'ABS Plastic' },
        { k: 'Weight', v: '~400 g' },
        { k: 'Sound', v: 'Light & hollow' },
        { k: 'Finish', v: 'Painted / Raw' },
        { k: 'Price range', v: '$' },
      ],
    },
    acrylic: {
      name: 'Acrylic',
      figLabel: 'Tofu60 Acrylic',
      imgLabel: 'ACRYLIC LAYERED CASE · 筐体',
      img: '/images/case-acrylic.jpg',
      tagline: 'Budget-friendly transparency with a stacked, handmade feel.',
      body: [
        'Acrylic cases are typically built from <strong>laser-cut stacked layers</strong> bolted together, which gives them a distinctive look and lets builders mix tints for a custom colour effect.',
        'The material is more brittle than PC and can crack if over-tightened, but it\'s the <strong>cheapest way to get a transparent build</strong>. The layered construction also makes them easy to modify or replace individual pieces.',
      ],
      specs: [
        { k: 'Material', v: 'Cast Acrylic' },
        { k: 'Weight', v: '~500 g' },
        { k: 'Sound', v: 'Similar to PC' },
        { k: 'Finish', v: 'Transparent tint' },
        { k: 'Price range', v: '$' },
      ],
    },
  }

  const activeCaseData = computed(() => caseVariantData[activeCaseVariant.value])

  function selectCaseVariant(id) {
    activeCaseVariant.value = id
    polyFlipped.value = false
  }

  const caseConsiderations = [
    '<b>Mount style</b> sets flex & sound — gasket is softest, tray most rigid.',
    '<b>Weight & material</b> change the pitch and desk presence.',
    '<b>Typing angle</b> affects wrist comfort; 6–7° is typical.',
    '<b>Serviceability</b> — how easily it opens up for tuning.',
  ]

  const caseMounts = [
    '<b>Gasket mount</b> — plate floats on foam strips. Soft, bouncy feel.',
    '<b>Top mount</b> — plate screws into the top case. Firm and uniform.',
    '<b>Tray mount</b> — PCB screws directly into the base. Most rigid.',
    '<b>Sandwich mount</b> — plate sandwiched between top and bottom halves.',
  ]

  const activeFormFactor = ref('65')

  const caseFormFactors = [
    { id: '100', pct: 100, name: 'Full size' },
    { id: 'tkl',  pct: 80,  name: 'TKL' },
    { id: '75',   pct: 75,  name: 'Compact' },
    { id: '65',   pct: 65,  name: 'No F-row' },
    { id: '60',   pct: 60,  name: 'No arrows' },
    { id: '40',   pct: 40,  name: 'Layers' },
  ]

  const caseFormFactorData = {
    '100': {
      id: '100', pct: 100, name: 'Full size',
      keys: '104–108', desc: 'Numpad included',
      keyboard: 'Rich98',
      img: '/images/ff-100.jpg',
      imgPos: 'center center',
      note: 'The complete layout. Numpad, function row, nav cluster — everything is where you expect it to be. Best suited for heavy data entry, spreadsheet work, and anyone who refuses to give up the numpad. The trade-off is size: a full layout takes up serious desk real estate and pushes your mouse further to the right. Not the most popular choice in the custom keyboard world, but there is something satisfying about a board that holds nothing back.',
    },
    tkl: {
      id: 'tkl', pct: 80, name: 'TKL',
      keys: '87–88', desc: 'No numpad',
      keyboard: 'Evo80',
      img: '/images/ff-tkl.jpg',
      imgPos: 'center center',
      note: 'Tenkeyless removes the numpad and nothing else. You keep the full function row, the navigation cluster, and the arrow keys exactly where they belong. The result is a layout that feels immediately familiar while freeing up a meaningful amount of desk space. It is the most popular format among gamers and office users alike, and it is the easiest step down from full size. A great first custom build target with a huge selection of cases and keycap kits available.',
    },
    '75': {
      id: '75', pct: 75, name: 'Compact',
      keys: '84', desc: 'Compact with F-row',
      keyboard: 'QK75 Nice Dream Edition',
      img: '/images/ff-75.jpg',
      imgPos: 'center center',
      note: 'The 75% squeezes a TKL into a much tighter footprint by removing the gaps between key clusters and pushing everything closer together. You keep the function row and dedicated arrow keys, but the layout feels denser and more deliberate. Very popular for portable use and home office setups where desk space is limited. The tight cluster can take a few days to get used to, but most people adjust quickly and never look back.',
    },
    '65': {
      id: '65', pct: 65, name: 'No F-row',
      keys: '68', desc: 'Arrows, no F-row',
      keyboard: 'Kyuu',
      img: '/images/ff-65.jpg',
      imgPos: 'center 25%',
      note: 'The 65% drops the function row but keeps dedicated arrow keys and a handful of navigation keys on the right side. It is the sweet spot for most enthusiasts: compact enough to look elegant on a desk, functional enough for daily use without constantly reaching for a layer. The layout forces you to use Fn combinations for F-keys, which most people find easy to adapt to. If you are building your first custom keyboard and want something that balances size with usability, this is where to start.',
    },
    '60': {
      id: '60', pct: 60, name: 'No Arrows',
      keys: '61', desc: 'No F-row, no arrows',
      keyboard: 'Tofu60',
      img: '/images/ff-60.jpg',
      imgPos: 'center 75%',
      note: 'The classic compact layout and the most iconic form factor in the hobby. No function row, no dedicated arrow keys, no nav cluster. Everything you need lives on layers accessed through key combinations. It sounds limiting but in practice most 60% users find a rhythm quickly and never want to go back. The minimal footprint looks stunning on any desk and the huge variety of cases, plates, and keycap sets makes it the most customisable format available. A polarising first choice but a deeply rewarding one.',
    },
    '40': {
      id: '40', pct: 40, name: 'Layers Only',
      keys: '40–48', desc: 'Layers only',
      keyboard: '80Retros GB40',
      img: '/images/ff-40.jpg',
      imgPos: 'center center',
      note: 'The extreme end of the spectrum. No number row, no function row, no arrow keys. Almost every character and function lives on a layer, accessed through combinations that you build into muscle memory over weeks of use. A 40% is not for everyone and it is rarely recommended as a first build. But for those who commit, it becomes an incredibly efficient and deeply personal typing tool. The tiny footprint fits anywhere, the layouts are endlessly customisable, and the community around small boards is some of the most passionate in the hobby.',
    },
  }

  const activeFormFactorData = computed(() => caseFormFactorData[activeFormFactor.value])

  // ── Other parts (standard layout) ─────────────────────────
  const otherParts = [
    {
      id: 'p2', jpLabel: '基板', deco: '基', label: 'PCB',
      role: 'THE BRAIN', romaji: 'KIBAN — PRINTED CIRCUIT BOARD',
      tagline: 'The brain. It reads every keystroke and hands it to the firmware.',
      body: [
        'The PCB registers switch presses and routes them over USB-C. The first decision is <strong>hot-swap vs. soldered</strong> — sockets let you change switches with no iron; soldering is more reliable and accepts any switch.',
        'Look for <strong>flex cuts</strong> that let the board give under-finger, a <strong>daughterboard</strong> for a cleaner USB port, and <strong>QMK / VIA</strong> support so you can remap every key in software.',
      ],
      imgLabel: 'HOT-SWAP PCB · 基板', img: null,
      specs: [
        { k: 'Type', v: 'Hot-swap' }, { k: 'Connector', v: 'USB-C + JST' },
        { k: 'Firmware', v: 'QMK / VIA' }, { k: 'Flex cuts', v: 'Yes' }, { k: 'Polling', v: '1000 Hz' },
      ],
      considerations: [
        '<b>Hot-swap vs. solder</b> — convenience against reliability.',
        '<b>Flex cuts</b> soften the typing feel across the board.',
        '<b>Switch orientation</b> — south-facing avoids cap interference.',
        '<b>VIA support</b> for easy, software-side remapping.',
      ],
      variants: [
        { name: 'Hot-swap', key: true }, { name: 'Soldered' },
        { name: 'Flex-cut' }, { name: 'Per-key RGB' }, { name: 'Wireless' },
      ],
      indexLabel: '基板 / PCB', buildRole: 'Seat & test the board',
    },
    {
      id: 'p3', jpLabel: 'プレート', deco: '板', label: 'Plate',
      role: 'STRUCTURE', romaji: 'PURĒTO — 板金',
      tagline: 'The layer the switches clip into. It tunes the board\'s stiffness and pitch.',
      body: [
        'Sandwiched between switches and PCB, the plate sets how firm the typing feel is and colours the sound. <strong>Material is everything here.</strong>',
        '<strong>Brass</strong> is stiff and deep; <strong>aluminium</strong> balanced and classic; <strong>polycarbonate and POM</strong> flex for a soft, poppy signature; <strong>FR4 and carbon fibre</strong> sit in between.',
      ],
      imgLabel: 'FLEX-CUT PLATE · 板金', img: null,
      specs: [
        { k: 'Material', v: 'Polycarbonate' }, { k: 'Switch cut', v: '14 mm' },
        { k: 'Thickness', v: '1.5 mm' }, { k: 'Style', v: 'Full plate' }, { k: 'Flex', v: 'High' },
      ],
      considerations: [
        '<b>Material</b> drives stiffness & sound more than anything.',
        '<b>Half vs. full plate</b> for extra give under the fingers.',
        '<b>Cutout type</b> — switch openings add flex.',
        '<b>Pairing</b> with mount & foam for a cohesive feel.',
      ],
      variants: [
        { name: 'Brass' }, { name: 'Aluminium' },
        { name: 'Polycarbonate', key: true }, { name: 'POM' },
        { name: 'FR4' }, { name: 'Carbon Fibre' },
      ],
      indexLabel: 'プレート / Plate', buildRole: 'Set the stiffness',
    },
    {
      id: 'p4', jpLabel: 'スイッチ', deco: '軸', label: 'Switches',
      role: 'THE FEEL', romaji: 'SUITCHI — 軸',
      tagline: 'The mechanism under every key. This is where feel and sound are born.',
      body: [
        'Switches come in three families: <strong>linear</strong> (smooth, no bump), <strong>tactile</strong> (a bump at actuation) and <strong>clicky</strong> (bump plus an audible click). Spring weight sets how hard you press; housing material colours the sound.',
        'Enthusiast switches ship <strong>factory-lubed</strong> or get hand-lubed to remove scratch and rattle. <strong>Long-pole</strong> stems shorten travel for a sharper bottom-out, while nylon housings sound deeper than polycarbonate.',
      ],
      imgLabel: 'SWITCH ARRAY · 軸', img: null,
      specs: [
        { k: 'Type', v: 'Linear' }, { k: 'Actuation', v: '2.0 mm' },
        { k: 'Spring', v: '50 g' }, { k: 'Travel', v: '4.0 mm' }, { k: 'Stem', v: 'POM' },
      ],
      considerations: [
        '<b>Linear / tactile / clicky</b> — the core choice of feel.',
        '<b>Spring weight</b> balances speed against finger fatigue.',
        '<b>Factory lube</b> vs. the patience of hand-lubing.',
        '<b>Housing material</b> shapes the whole sound profile.',
      ],
      variants: [
        { name: 'Linear', key: true }, { name: 'Tactile' },
        { name: 'Clicky' }, { name: 'Silent' }, { name: 'Long-pole' },
      ],
      indexLabel: 'スイッチ / Switches', buildRole: 'Lube & install',
    },
    {
      id: 'p5', jpLabel: 'スタビライザー', deco: '安', label: 'Stabilizers',
      role: 'BALANCE', romaji: 'SUTABIRAIZĀ — 安定',
      tagline: 'What keeps space, shift and enter from rattling or cocking sideways.',
      body: [
        'Any key wider than two units rides on a stabilizer. Done poorly they <strong>tick, rattle and bind</strong>; done well they disappear, and large keys feel as crisp as the smallest.',
        'Screw-in stabs are the baseline for custom boards. <strong>Clip, lube and balance the wire</strong> before installation. The band-aid mod under each stem pad softens bottom-out to a rounder thock.',
      ],
      imgLabel: 'SCREW-IN STABS · 安定', img: null,
      specs: [
        { k: 'Mount', v: 'PCB Screw-in' }, { k: 'Sizes', v: '2u / 6.25u' },
        { k: 'Wire', v: 'Steel' }, { k: 'Tuning', v: 'Clip + Lube' }, { k: 'Mod', v: 'Band-aid' },
      ],
      considerations: [
        '<b>Mount type</b> — screw-in beats snap-in & plate.',
        '<b>Clip & lube</b> to kill the wire rattle.',
        '<b>Wire balance</b> so keys don\'t tick or bind.',
        '<b>Band-aid mod</b> for a softer, rounder thock.',
      ],
      variants: [
        { name: 'Screw-in', key: true }, { name: 'Plate-mount' },
        { name: 'Snap-in' }, { name: 'Clip-in' },
      ],
      indexLabel: 'スタビ / Stabilizers', buildRole: 'Clip, lube, balance',
    },
    {
      id: 'p6', jpLabel: 'キーキャップ', deco: '冠', label: 'Keycaps',
      role: 'THE FACE', romaji: 'KĪKYAPPU — 冠',
      tagline: 'The surface you touch and read. It defines the look — and a lot of the sound.',
      body: [
        'Keycaps shape the board\'s character. <strong>Profile</strong> — the sculpt and height — changes ergonomics and acoustics: Cherry is low and familiar, SA tall and retro, MT3 deeply scooped, XDA flat and uniform.',
        '<strong>PBT</strong> resists shine and sounds deeper; <strong>ABS</strong> is smoother but greases over time. Legends are <strong>doubleshot</strong> (moulded, permanent) or <strong>dye-sublimated</strong> (printed into PBT).',
      ],
      imgLabel: 'DOUBLESHOT SET · 冠', img: null,
      specs: [
        { k: 'Profile', v: 'Cherry' }, { k: 'Material', v: 'PBT' },
        { k: 'Legends', v: 'Doubleshot' }, { k: 'Thickness', v: '1.4 mm' }, { k: 'Mount', v: 'MX' },
      ],
      considerations: [
        '<b>Profile</b> — sculpt & height change feel and sound.',
        '<b>PBT vs. ABS</b> for shine resistance and tone.',
        '<b>Legend type</b> for long-term durability.',
        '<b>Kit coverage</b> of your specific layout.',
      ],
      variants: [
        { name: 'Cherry PBT', key: true }, { name: 'SA' },
        { name: 'MT3' }, { name: 'XDA' }, { name: 'Doubleshot' },
      ],
      indexLabel: 'キーキャップ / Keycaps', buildRole: 'Dress the board',
    },
    {
      id: 'p7', jpLabel: 'フォーム & MOD', deco: '響', label: 'Foam & Mods',
      role: 'FINE-TUNING', romaji: 'FŌMU — 響き',
      tagline: 'The final ten percent. Acoustic fine-tuning that turns a good board great.',
      body: [
        'Mods damp resonance and shape the sound. <strong>Case foam</strong> kills hollowness; <strong>plate foam</strong> tightens the typing feel; <strong>PE foam</strong> between plate and PCB adds a marbly, poppy character.',
        'The <strong>tape mod</strong> — layers of painter\'s tape on the PCB back — adds high-end pop for free. Every mod is a trade-off; over-damping can deaden a board, so add in stages and listen.',
      ],
      imgLabel: 'FOAM STACK · 響き', img: null,
      specs: [
        { k: 'Case foam', v: 'Poron' }, { k: 'Plate foam', v: 'EVA' },
        { k: 'PE foam', v: '0.4 mm' }, { k: 'Tape mod', v: '3 layers' }, { k: 'Reversible', v: 'Yes' },
      ],
      considerations: [
        '<b>Case vs. plate foam</b> — hollowness against feel.',
        '<b>PE foam</b> for a marbly, poppy signature.',
        '<b>Tape mod</b> — the cheapest high-end you can buy.',
        '<b>Don\'t over-damp</b> — add in stages and listen.',
      ],
      variants: [
        { name: 'Poron', key: true }, { name: 'EVA' },
        { name: 'PE Foam' }, { name: 'Tape Mod' }, { name: 'Force-break' },
      ],
      indexLabel: 'フォーム / Foam & Mods', buildRole: 'Tune the sound',
    },
  ]

  // For build order list
  const casePartMeta = { id: 'p1', label: 'Case', jpLabel: 'ケース', buildRole: 'Mount the chassis' }
  const allParts = [casePartMeta, ...otherParts]

  // For side nav
  const parts = [
    { id: 'p1', indexLabel: 'ケース / Case' },
    ...otherParts.map(p => ({ id: p.id, indexLabel: p.indexLabel })),
  ]

  // ── Scroll / reveal ────────────────────────────────────────
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function padNum(n, len) {
    return Math.round(n).toString().padStart(len, '0')
  }

  let sectionEls = []
  let ticking = false

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update) }
  }

  function update() {
    ticking = false
    const st  = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p   = max > 0 ? Math.min(st / max, 1) : 0

    scrollProgress.value = p.toFixed(4)
    coordY.value   = padNum(st, 5)
    coordPct.value = padNum(p * 100, 3)

    const line = window.innerHeight * 0.4
    let current = null
    for (const el of sectionEls) {
      if (el.getBoundingClientRect().top <= line) current = el
    }
    if (current) {
      activeId.value  = current.getAttribute('data-part')
      activeSec.value = current.getAttribute('data-label') || activeId.value
    } else {
      activeId.value  = null
      activeSec.value = 'INTRO'
    }
  }

  function checkReveal() {
    const vh = window.innerHeight
    document.querySelectorAll('[data-reveal]').forEach(el => {
      if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * 0.9) {
        el.classList.add('in')
      }
    })
  }

  onMounted(() => {
    sectionEls = Array.from(document.querySelectorAll('[data-part]'))
    window.addEventListener('scroll', onScroll,    { passive: true })
    window.addEventListener('scroll', checkReveal, { passive: true })
    update()
    checkReveal()
    ;[80, 250, 600].forEach(t => setTimeout(() => { update(); checkReveal() }, t))
    setTimeout(runScramble, 200)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('scroll', checkReveal)
  })
  </script>

  <style scoped>

/* ============================================================
   BASE
   ============================================================ */

.parts-page {
  background: var(--bg);
  color: var(--fg);
  min-height: 100vh;
}


/* ============================================================
   HUD
   ============================================================ */

.hud {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}

.hud-grid { position: absolute; inset: 0; }

.hud-grid::before,
.hud-grid::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: oklch(0.40 0.008 70 / 0.14);
}

.hud-grid::before { left: var(--gutter); }
.hud-grid::after  { right: var(--gutter); }

.hud-rule {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: oklch(0.40 0.008 70 / 0.14);
}

.hud-rule.top { top: 80px; }
.hud-rule.bot { bottom: 54px; }

.cross { position: absolute; width: 11px; height: 11px; }

.cross::before,
.cross::after {
  content: "";
  position: absolute;
  background: oklch(0.81 0.082 354 / 0.5);
}

.cross::before { left: 5px; top: 0;  width: 1px;  height: 11px; }
.cross::after  { top: 5px;  left: 0; height: 1px; width: 11px; }

.cross.tl { left:  calc(var(--gutter) - 5px); top:    84px; }
.cross.tr { right: calc(var(--gutter) - 5px); top:    84px; }
.cross.bl { left:  calc(var(--gutter) - 5px); bottom: 48px; }
.cross.br { right: calc(var(--gutter) - 5px); bottom: 48px; }

.hud-read {
  position: absolute;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-faint);
}

.hud-read.tl { left:  var(--gutter); top:    90px; }
.hud-read.tr { right: var(--gutter); top:    90px; text-align: right; }
.hud-read.bl { left:  var(--gutter); bottom: 30px; }
.hud-read.br { right: var(--gutter); bottom: 30px; text-align: right; }
.hud-read b  { color: var(--amber); font-weight: 500; }

.hud-progress {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 2px;
  background: var(--amber);
  transform: scaleX(var(--p, 0));
  transform-origin: 0 50%;
  box-shadow: 0 0 12px oklch(0.81 0.082 354 / 0.5);
}


/* ============================================================
   TICKER
   ============================================================ */

.ticker {
  position: fixed;
  left: calc(var(--gutter) * 0.28);
  top: 0;
  bottom: 0;
  z-index: 39;
  width: 1.2em;
  display: flex;
  align-items: center;
  pointer-events: none;
  opacity: 0.5;
}

.ticker-track {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.5em;
  color: var(--fg-faint);
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: nowrap;
  animation: tick 60s linear infinite;
}

@keyframes tick {
  from { transform: translateY(40%); }
  to   { transform: translateY(-60%); }
}

@media (max-width: 1100px) {
  .ticker { display: none; }
}


/* ============================================================
   SIDE INDEX
   ============================================================ */

.index {
  position: fixed;
  right: calc(var(--gutter) * 0.30);
  top: 50%;
  z-index: 41;
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: flex-end;
  transform: translateY(-50%);
}

@media (max-width: 1100px) {
  .index { display: none; }
}

.index a {
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--fg-faint);
  transition: color 0.35s;
}

.index a .dash {
  width: 14px;
  height: 1px;
  background: currentColor;
  transition: width 0.35s, background 0.35s;
}

.index a .lbl {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.35s, transform 0.35s, max-width 0.35s;
}

.index a:hover        { color: var(--fg); }
.index a:hover .lbl   { opacity: 1; transform: none; max-width: 140px; }
.index a.active       { color: var(--amber); }
.index a.active .dash { width: 30px; background: var(--amber); }
.index a.active .lbl  { opacity: 1; transform: none; max-width: 140px; }


.hero {
  position: relative;
  padding: clamp(100px, 16vh, 160px) 0 clamp(60px, 10vh, 100px);
  border-bottom: 1px solid oklch(0.40 0.008 70 / 0.14);
}

.hero-eyebrow-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 18px 28px;
  margin-bottom: clamp(32px, 5vh, 48px);
}

.hero-body {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) 300px;
  gap: clamp(60px, 6vw, 100px);
  align-items: center;
}

@media (max-width: 860px) {
  .hero-body { grid-template-columns: 1fr; }
  .hero-right { display: none; }
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vh, 28px);
}

.wordmark {
  display: flex;
  align-items: flex-end;
  gap: 0.04em;
  font-family: var(--sans);
  font-size: clamp(60px, 12vw, 160px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.86;
}

.wm-l {
  display: inline-block;
}

.wordmark .dot {
  display: inline-block;
  width: 0.13em;
  height: 0.13em;
  margin-bottom: 0.12em;
  border-radius: 50%;
  background: var(--amber);
  flex-shrink: 0;
}

.hero-tag {
  max-width: 38ch;
  font-size: clamp(15px, 1.4vw, 20px);
  font-weight: 500;
  line-height: 1.35;
  color: var(--fg-soft);
}

.hero-tag .pink { color: var(--amber); }

.hero-ticker {
  overflow: hidden;
  width: 100%;
  max-width: 440px;
}

.ticker-inner {
  display: flex;
  gap: 24px;
  white-space: nowrap;
  animation: tickX 18s linear infinite;
}

.tick-item {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--amber);
  flex-shrink: 0;
}

@keyframes tickX {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}


.meta-sep {
  color: var(--fg-faint);
  font-size: 10px;
}

.hero-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid oklch(0.40 0.008 70 / 0.14);
  padding-left: 32px;
  align-self: stretch;
}

.hero-part-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid oklch(0.40 0.008 70 / 0.08);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.hero-part-row:last-child { border-bottom: none; }

.hero-part-row:hover .hpr-label { color: var(--fg); }
.hero-part-row:hover .hpr-num   { color: var(--amber); }

.hpr-num {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: oklch(0.40 0.008 70 / 0.4);
  width: 22px;
  flex-shrink: 0;
  transition: color 0.2s;
}

.hpr-div {
  width: 1px;
  height: 12px;
  background: oklch(0.40 0.008 70 / 0.2);
  flex-shrink: 0;
}

.hpr-label {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 600;
  color: oklch(0.50 0.008 70);
  flex: 1;
  transition: color 0.2s;
}

.hpr-jp {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.10em;
  color: oklch(0.35 0.008 70);
}

/* ============================================================
   REVEAL
   ============================================================ */

[data-reveal] {
  opacity: 0;
  transform: translateY(26px);
}

[data-reveal].in {
  opacity: 1;
  transform: none;
  transition:
    opacity   0.9s cubic-bezier(0.2, 0.7, 0.2, 1),
    transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--d, 0ms);
}


/* ============================================================
   EYEBROW
   ============================================================ */

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--amber);
}

.eyebrow::before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 1px;
  background: var(--amber);
}

.eyebrow.dim         { color: var(--fg-soft); }
.eyebrow.dim::before { background: var(--fg-faint); }


/* ============================================================
   PART SECTIONS
   ============================================================ */

.content {
  position: relative;
  z-index: 1;
}

.part {
  position: relative;
  padding: clamp(80px, 13vh, 160px) 0;
  border-top: 1px solid oklch(0.40 0.008 70 / 0.14);
}


.part-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: clamp(36px, 6vh, 68px);
}

.part-num {
  font-family: var(--mono);
  font-size: clamp(40px, 7vw, 96px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1.4px oklch(0.81 0.082 354 / 0.30);
}

.part-num .tot {
  font-size: 0.35em;
  vertical-align: super;
  margin-left: 4px;
  -webkit-text-stroke: 1px var(--fg-faint);
}

.part-meta {
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.8;
  letter-spacing: 0.1em;
  text-align: right;
  text-transform: uppercase;
  color: var(--fg-soft);
}

.part-meta b { color: var(--amber); }

/* Static intro (Case section) */
.part-intro {
  margin-bottom: clamp(32px, 5vh, 56px);
}

.part-jp {
  font-family: var(--jp);
  font-size: clamp(22px, 3vw, 40px);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--amber);
  margin-bottom: 10px;
}

.part-name {
  font-size: clamp(40px, 6vw, 82px);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 0.98;
  margin-bottom: 6px;
}

.part-romaji {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--fg-faint);
  margin-bottom: 26px;
}

.part-role-text {
  max-width: 50ch;
  font-size: clamp(16px, 1.5vw, 19px);
  font-weight: 500;
  color: var(--fg-soft);
}

/* Two-column layout (other parts) */
.part-top {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: start;
}

.part:nth-child(even) .part-top        { grid-template-columns: 0.95fr 1.05fr; }
.part:nth-child(even) .part-title-col  { order: 2; }
.part:nth-child(even) .part-media      { order: 1; }

@media (max-width: 900px) {
  .part-top                              { grid-template-columns: 1fr; }
  .part:nth-child(even) .part-title-col  { order: 0; }
  .part:nth-child(even) .part-media      { order: 0; }
}

.part-body {
  max-width: 46ch;
  font-size: clamp(15px, 1.2vw, 16.5px);
  line-height: 1.75;
  color: var(--fg-soft);
}

.part-body + .part-body { margin-top: 16px; }
:deep(.part-body strong) { font-weight: 600; color: var(--fg); }

.part-media { position: relative; }


/* ============================================================
   VARIANT PICKER
   ============================================================ */

.variant-picker {
  margin-bottom: clamp(28px, 4vh, 48px);
}

.vpick-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.vpick-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-soft);
  background: transparent;
  border: 1px solid oklch(0.40 0.008 70 / 0.28);
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}

.vpick-btn:hover {
  border-color: oklch(0.81 0.082 354 / 0.4);
  color: var(--fg);
}

.vpick-btn.active {
  border-color: var(--amber);
  color: var(--amber);
  background: oklch(0.81 0.082 354 / 0.06);
}

.vpick-sym {
  font-size: 1rem;
  opacity: 0.8;
}


/* ============================================================
   VARIANT DETAIL — two columns with wipe transition
   ============================================================ */

.variant-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
  margin-bottom: clamp(40px, 7vh, 80px);
}

@media (max-width: 820px) {
  .variant-detail { grid-template-columns: 1fr; }
}

/* Text side */
.vd-tagline {
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 500;
  line-height: 1.35;
  color: var(--fg);
  margin-bottom: 18px;
}

.vd-body {
  font-size: clamp(14px, 1.1vw, 15.5px);
  line-height: 1.75;
  color: var(--fg-soft);
  max-width: 48ch;
}

.vd-body + .vd-body { margin-top: 14px; }
:deep(.vd-body strong) { font-weight: 600; color: var(--fg); }

.vd-specs {
  margin-top: 24px;
  border-top: 1px solid oklch(0.40 0.008 70 / 0.14);
  padding-top: 20px;
}

/* Image side */
.vd-slot {
  width: 100%;
  aspect-ratio: 4 / 3;
}


/* ============================================================
   BLUR SWAP TRANSITION
   ============================================================ */

.vd-blur-enter-active {
  transition:
    opacity  0.35s cubic-bezier(0.22, 1, 0.36, 1),
    filter   0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.vd-blur-leave-active {
  transition:
    opacity  0.2s ease-in,
    filter   0.2s ease-in,
    transform 0.2s ease-in;
}

.vd-blur-enter-from {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(6px);
}

.vd-blur-leave-to {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(-6px);
}


/* ============================================================
   FORM FACTORS
   ============================================================ */

.ff-col {
  margin-top: clamp(16px, 2vh, 24px);
}

.ff-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ff-heading {
  margin-bottom: clamp(16px, 2vh, 24px);
}

.ff-title {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--fg);
  margin-bottom: 8px;
}

.ff-desc {
  font-size: 0.875rem;
  color: var(--fg-mute);
  line-height: 1.8;
  max-width: 36ch;
  font-family: var(--mono);
  letter-spacing: 0.04em;
  margin-top: 10px;
}

.ff-intro {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 14px;
}

.ff-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
}

.ff-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
  background: transparent;
  border: 1px solid oklch(0.40 0.008 70 / 0.28);
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s, background 0.25s;
  min-width: 0;
}

.ff-btn:hover {
  border-color: oklch(0.81 0.082 354 / 0.4);
}

.ff-btn.active {
  border-color: var(--amber);
  background: oklch(0.81 0.082 354 / 0.06);
}

.ff-pct {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--fg);
}

.ff-btn.active .ff-pct { color: var(--amber); }

.ff-name {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-faint);
}

.ff-btn.active .ff-name { color: var(--amber); }

.ff-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
}

@media (max-width: 720px) {
  .ff-preview { grid-template-columns: 1fr; }
}

.ff-slot {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.ff-note {
  font-size: clamp(14px, 1.1vw, 15.5px);
  line-height: 1.75;
  color: var(--fg-soft);
  padding-top: 4px;
}


/* ============================================================
   MEDIA SLOT
   ============================================================ */

.is-clickable { cursor: pointer; }

.slot {
  width: 100%;
  aspect-ratio: 4 / 3;
}

.slot-frame {
  position: relative;
  border: 1px solid oklch(0.40 0.008 70 / 0.28);
  background:
    repeating-linear-gradient(
      135deg,
      transparent 0 9px,
      oklch(0.40 0.008 70 / 0.06) 9px 10px
    ),
    oklch(0.185 0.009 70);
}

.slot-img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slot-frame .corner { position: absolute; width: 9px; height: 9px; }

.slot-frame .corner::before,
.slot-frame .corner::after {
  content: "";
  position: absolute;
  background: var(--amber);
}

.slot-frame .corner.a { top: -1px;    left: -1px; }
.slot-frame .corner.b { top: -1px;    right: -1px; }
.slot-frame .corner.c { bottom: -1px; left: -1px; }
.slot-frame .corner.d { bottom: -1px; right: -1px; }

.slot-frame .corner.a::before,
.slot-frame .corner.b::before { top: 0;    width: 9px; height: 1px; }

.slot-frame .corner.c::before,
.slot-frame .corner.d::before { bottom: 0; width: 9px; height: 1px; }

.slot-frame .corner.a::after,
.slot-frame .corner.c::after  { left: 0;  width: 1px; height: 9px; }

.slot-frame .corner.b::after,
.slot-frame .corner.d::after  { right: 0; width: 1px; height: 9px; }

.slot-cap {
  position: absolute;
  bottom: 12px;
  left: 14px;
  z-index: 2;   
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-faint);
}

.slot-cap b { color: var(--amber); }

.slot-tag {
  position: absolute;
  top: 11px;
  right: 12px;
  z-index: 2; 
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--fg-faint);
}

.slot-cap,
.slot-tag {
  z-index: 2;
  color: #fff;
  background: oklch(0.08 0.005 70 / 0.65);
  backdrop-filter: blur(6px);
  padding: 3px 8px;
}

.slot-cap b { color: var(--amber); }

/* ============================================================
   PART GRID — specs / considerations / variants
   ============================================================ */

.part-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: clamp(20px, 2.4vw, 40px);
  margin-top: clamp(40px, 6vh, 72px);
  padding-top: clamp(30px, 4vh, 48px);
  border-top: 1px solid oklch(0.40 0.008 70 / 0.14);
}

@media (max-width: 820px) {
  .part-grid { grid-template-columns: 1fr; gap: 34px; }
}

.col-h {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-faint);
  margin-bottom: 18px;
}


.spec {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 9px 0;
  font-size: 13.5px;
  border-bottom: 1px solid oklch(0.40 0.008 70 / 0.14);
}

.spec dt {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--fg-faint);
}

.spec dd {
  font-weight: 500;
  text-align: right;
  color: var(--fg);
}

.consider {
  counter-reset: c;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.consider li {
  list-style: none;
  display: flex;
  gap: 13px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--fg-soft);
}

.consider li::before {
  counter-increment: c;
  content: counter(c, decimal-leading-zero);
  flex-shrink: 0;
  padding-top: 3px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.05em;
  color: var(--amber);
}

:deep(.consider li b)  { font-weight: 600; color: var(--fg); }

.chips { display: flex; flex-wrap: wrap; gap: 9px; }

.chip {
  padding: 7px 12px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--fg-soft);
  border: 1px solid oklch(0.40 0.008 70 / 0.28);
  cursor: default;
  transition: border-color 0.3s, color 0.3s, background 0.3s;
}

.chip:hover {
  border-color: oklch(0.81 0.082 354 / 0.30);
  color: var(--fg);
  background: oklch(0.81 0.082 354 / 0.10);
}

.chip.key {
  color: var(--amber);
  border-color: oklch(0.81 0.082 354 / 0.30);
}


/* ============================================================
   OUTRO
   ============================================================ */

.outro {
  position: relative;
  padding: clamp(90px, 15vh, 180px) 0 clamp(70px, 10vh, 120px);
  border-top: 1px solid oklch(0.40 0.008 70 / 0.14);
  overflow: hidden;
}

.build-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: clamp(40px, 6vh, 72px);
}

.build-title {
  font-size: clamp(36px, 5.5vw, 72px);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 0.98;
}

.build-title .pink { color: var(--amber); }

.build-list { border-top: 1px solid oklch(0.40 0.008 70 / 0.28); }

.build-row {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  align-items: center;
  gap: 24px;
  padding: clamp(16px, 2.4vh, 26px) 0;
  border-bottom: 1px solid oklch(0.40 0.008 70 / 0.14);
  transition: padding-left 0.4s, background 0.4s;
}

.build-row:hover {
  padding-left: 18px;
  background: linear-gradient(90deg, oklch(0.81 0.082 354 / 0.10), transparent 60%);
}

.build-row .bn {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--amber);
}

.build-row .bname {
  font-size: clamp(20px, 2.6vw, 32px);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.build-row .bname .jp {
  font-family: var(--jp);
  font-size: 0.55em;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin-left: 14px;
  color: var(--fg-faint);
}

.build-row .brole {
  max-width: 220px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-align: right;
  text-transform: uppercase;
  color: var(--fg-soft);
}

@media (max-width: 680px) {
  .build-row            { grid-template-columns: 48px 1fr; }
  .build-row .brole     { display: none; }
}

/* Coda */
.coda {
  position: relative;
  padding: clamp(90px, 16vh, 180px) 0 0;
  text-align: center;
}

.coda-kanji {
  font-family: var(--jp);
  font-size: min(40vh, 34vw);
  font-weight: 600;
  line-height: 0.8;
  color: transparent;
  opacity: 0.85;
  -webkit-text-stroke: 1px oklch(0.81 0.082 354 / 0.30);
}

.coda-line {
  margin-top: -0.1em;
  font-size: clamp(28px, 4.5vw, 56px);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.coda-line .pink { color: var(--amber); }

.coda-jp {
  font-family: var(--jp);
  font-size: 15px;
  letter-spacing: 0.3em;
  color: var(--fg-soft);
  margin-top: 18px;
}

</style>