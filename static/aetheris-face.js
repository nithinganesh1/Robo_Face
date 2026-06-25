/*!
 * Aetheris Face Library v1.0.0
 * Animated AI robot face with expression, gaze, and talking control.
 * Usage: const face = new AetherisFace('#container')
 */

(function (global) {

  const EXPRESSIONS = {
    neutral: {
      leftEyebrow: "M 180 150 Q 280 130 380 150", rightEyebrow: "M 820 150 Q 720 130 620 150",
      leftEye: { y: 220, h: 190, rx: 75, rot: -6 }, rightEye: { y: 220, h: 190, rx: 75, rot: 6 },
      iris: { lx: 300, rx: 700, y: 315 }, mouth: "M 450 480 Q 500 480 550 480"
    },
    happy: {
      leftEyebrow: "M 180 130 Q 280 100 380 150", rightEyebrow: "M 820 130 Q 720 100 620 150",
      leftEye: { y: 220, h: 190, rx: 95, rot: 0 }, rightEye: { y: 220, h: 190, rx: 95, rot: 0 },
      iris: { lx: 300, rx: 700, y: 315 }, mouth: "M 420 460 Q 500 540 580 460"
    },
    sad: {
      leftEyebrow: "M 180 190 Q 280 160 380 130", rightEyebrow: "M 820 190 Q 720 160 620 130",
      leftEye: { y: 240, h: 160, rx: 70, rot: -15 }, rightEye: { y: 240, h: 160, rx: 70, rot: 15 },
      iris: { lx: 300, rx: 700, y: 340 }, mouth: "M 450 500 Q 500 450 550 500"
    },
    angry: {
      leftEyebrow: "M 180 130 Q 280 160 380 190", rightEyebrow: "M 820 130 Q 720 160 620 190",
      leftEye: { y: 250, h: 140, rx: 40, rot: 12 }, rightEye: { y: 250, h: 140, rx: 40, rot: -12 },
      iris: { lx: 300, rx: 700, y: 315 }, mouth: "M 440 490 Q 500 470 560 490"
    },
    curious: {
      leftEyebrow: "M 180 110 Q 280 90 380 130", rightEyebrow: "M 820 160 Q 720 150 620 160",
      leftEye: { y: 190, h: 210, rx: 90, rot: -5 }, rightEye: { y: 240, h: 150, rx: 50, rot: 5 },
      iris: { lx: 330, rx: 730, y: 315 }, mouth: "M 470 480 Q 500 480 530 480"
    },
    searching: {
      leftEyebrow: "M 180 140 Q 280 120 380 140", rightEyebrow: "M 820 140 Q 720 120 620 140",
      leftEye: { y: 210, h: 200, rx: 80, rot: 0 }, rightEye: { y: 210, h: 200, rx: 80, rot: 0 },
      iris: { lx: 300, rx: 700, y: 315 }, mouth: "M 460 480 Q 500 480 540 480"
    },
    talking: {
      leftEyebrow: "M 180 140 Q 280 120 380 150", rightEyebrow: "M 820 140 Q 720 120 620 150",
      leftEye: { y: 220, h: 190, rx: 75, rot: -6 }, rightEye: { y: 220, h: 190, rx: 75, rot: 6 },
      iris: { lx: 300, rx: 700, y: 315 }, mouth: "M 450 480 Q 500 480 550 480"
    },
    sleeping: {
      leftEyebrow: "M 180 180 Q 280 170 380 180", rightEyebrow: "M 820 180 Q 720 170 620 180",
      leftEye: { y: 310, h: 10, rx: 5, rot: 0 }, rightEye: { y: 310, h: 10, rx: 5, rot: 0 },
      iris: { lx: 300, rx: 700, y: 315 }, mouth: "M 460 480 Q 500 490 540 480"
    },
    surprised: {
      leftEyebrow: "M 180 90 Q 280 70 380 110", rightEyebrow: "M 820 90 Q 720 70 620 110",
      leftEye: { y: 190, h: 220, rx: 110, rot: 0 }, rightEye: { y: 190, h: 220, rx: 110, rot: 0 },
      iris: { lx: 300, rx: 700, y: 300 }, mouth: "M 470 470 Q 500 550 530 470"
    }
  };

  const THEMES = {
    neutral:   { bg: '#140021', glow1: 'rgba(157,0,255,0.3)',   glow2: 'rgba(157,0,255,0.6)',   eo: 0.3,  ei: 0.6  },
    happy:     { bg: '#2e001f', glow1: 'rgba(255,50,200,0.4)',  glow2: 'rgba(255,50,200,0.7)',  eo: 0.4,  ei: 0.7  },
    sad:       { bg: '#050a24', glow1: 'rgba(100,100,255,0.2)', glow2: 'rgba(100,100,255,0.4)', eo: 0.15, ei: 0.35 },
    angry:     { bg: '#3a000a', glow1: 'rgba(255,0,50,0.4)',    glow2: 'rgba(255,0,50,0.7)',    eo: 0.5,  ei: 0.9  },
    curious:   { bg: '#002433', glow1: 'rgba(0,200,255,0.3)',   glow2: 'rgba(0,200,255,0.6)',   eo: 0.35, ei: 0.65 },
    searching: { bg: '#002e1c', glow1: 'rgba(0,255,150,0.3)',   glow2: 'rgba(0,255,150,0.6)',   eo: 0.35, ei: 0.65 },
    talking:   { bg: '#1e003b', glow1: 'rgba(157,0,255,0.4)',   glow2: 'rgba(157,0,255,0.8)',   eo: 0.35, ei: 0.7  },
    sleeping:  { bg: '#080012', glow1: 'rgba(100,0,150,0.1)',   glow2: 'rgba(100,0,150,0.2)',   eo: 0.1,  ei: 0.2  },
    surprised: { bg: '#331f00', glow1: 'rgba(255,180,0,0.4)',   glow2: 'rgba(255,180,0,0.7)',   eo: 0.5,  ei: 0.8  },
  };

  const SVG_TEMPLATE = `
  <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet"
    style="width:100%;height:100%;max-width:85%;max-height:85%;filter:drop-shadow(0 0 30px #9D00FF) drop-shadow(0 0 60px rgba(157,0,255,0.3));">
    <path id="__af_leftEyebrow"  fill="none" stroke="#C86CFF" stroke-linecap="round" stroke-width="14"/>
    <path id="__af_rightEyebrow" fill="none" stroke="#C86CFF" stroke-linecap="round" stroke-width="14"/>
    <clipPath id="__af_leftEyeClip">
      <rect id="__af_leftEyeClipRect" x="160" y="220" width="280" height="190" rx="75"/>
    </clipPath>
    <g id="__af_leftEyeGroup" style="transform-origin:300px 315px;">
      <rect id="__af_leftEyeRect" x="160" y="220" width="280" height="190" rx="75" fill="#FFFFFF"/>
    </g>
    <g clip-path="url(#__af_leftEyeClip)" id="__af_leftEyeIrisGroup" style="transform-origin:300px 315px;">
      <circle id="__af_leftIrisOuter"  cx="300" cy="315" r="55" fill="#C86CFF" style="opacity:0.3;transition:opacity 1s ease;"/>
      <circle id="__af_leftIrisInner"  cx="315" cy="315" r="28" fill="#C86CFF" style="opacity:0.6;transition:opacity 1s ease;"/>
    </g>
    <clipPath id="__af_rightEyeClip">
      <rect id="__af_rightEyeClipRect" x="560" y="220" width="280" height="190" rx="75"/>
    </clipPath>
    <g id="__af_rightEyeGroup" style="transform-origin:700px 315px;">
      <rect id="__af_rightEyeRect" x="560" y="220" width="280" height="190" rx="75" fill="#FFFFFF"/>
    </g>
    <g clip-path="url(#__af_rightEyeClip)" id="__af_rightEyeIrisGroup" style="transform-origin:700px 315px;">
      <circle id="__af_rightIrisOuter" cx="700" cy="315" r="55" fill="#C86CFF" style="opacity:0.3;transition:opacity 1s ease;"/>
      <circle id="__af_rightIrisInner" cx="685" cy="315" r="28" fill="#C86CFF" style="opacity:0.6;transition:opacity 1s ease;"/>
    </g>
    <path id="__af_mouth" fill="none" stroke="#C86CFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/>
  </svg>`;

  const WRAPPER_STYLE = `
    width:100%;height:100%;
    display:flex;align-items:center;justify-content:center;
    background-color:#050505;
    transition:background-image 1.5s ease-in-out;
  `;

  const wait = ms => new Promise(r => setTimeout(r, ms));

  class AetherisFace {
    /**
     * @param {string|HTMLElement} target  CSS selector or element
     * @param {object} [options]
     * @param {string}  [options.expression='neutral']   Initial expression
     * @param {boolean} [options.autoBehavior=true]      Enable idle micro-animations
     * @param {boolean} [options.autoBlink=true]         Enable automatic blinking
     * @param {boolean} [options.themedBackground=true]  Color the container bg per theme
     */
    constructor(target, options = {}) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) throw new Error(`AetherisFace: target "${target}" not found.`);

      this._opts = Object.assign({
        expression: 'neutral',
        autoBehavior: true,
        autoBlink: true,
        themedBackground: true,
      }, options);

      // Build wrapper
      this._wrapper = document.createElement('div');
      this._wrapper.style.cssText = WRAPPER_STYLE;
      this._wrapper.innerHTML = SVG_TEMPLATE;
      el.appendChild(this._wrapper);

      // Grab elements (namespaced IDs)
      this._el = {
        svg:               this._wrapper.querySelector('svg'),
        leftEyebrow:       this._wrapper.querySelector('#__af_leftEyebrow'),
        rightEyebrow:      this._wrapper.querySelector('#__af_rightEyebrow'),
        leftEyeRect:       this._wrapper.querySelector('#__af_leftEyeRect'),
        leftEyeClipRect:   this._wrapper.querySelector('#__af_leftEyeClipRect'),
        rightEyeRect:      this._wrapper.querySelector('#__af_rightEyeRect'),
        rightEyeClipRect:  this._wrapper.querySelector('#__af_rightEyeClipRect'),
        leftEyeGroup:      this._wrapper.querySelector('#__af_leftEyeGroup'),
        leftEyeIrisGroup:  this._wrapper.querySelector('#__af_leftEyeIrisGroup'),
        rightEyeGroup:     this._wrapper.querySelector('#__af_rightEyeGroup'),
        rightEyeIrisGroup: this._wrapper.querySelector('#__af_rightEyeIrisGroup'),
        leftIrisOuter:     this._wrapper.querySelector('#__af_leftIrisOuter'),
        leftIrisInner:     this._wrapper.querySelector('#__af_leftIrisInner'),
        rightIrisOuter:    this._wrapper.querySelector('#__af_rightIrisOuter'),
        rightIrisInner:    this._wrapper.querySelector('#__af_rightIrisInner'),
        mouth:             this._wrapper.querySelector('#__af_mouth'),
      };

      // State
      this._expr       = this._opts.expression;
      this._gaze       = { x: 0, y: 0 };
      this._innerGaze  = { x: 0, y: 0 };
      this._micro      = { lY: 0, lH: 0, rY: 0, rH: 0 };
      this._blinking   = false;
      this._mouthState = 0;
      this._busy       = false;
      this._timers     = [];
      this._talkTimer  = null;

      this._applyTheme(this._expr);
      this._render();

      if (this._opts.autoBehavior) this._startBehavior();
      if (this._opts.autoBlink)    this._startBlink();
    }

    // ─── Public API ──────────────────────────────────────────────────────────────

    /**
     * Switch to a named expression.
     * @param {string} expression  One of: neutral happy sad angry curious searching surprised talking sleeping
     * @returns {Promise<void>}    Resolves when transition completes
     */
    async setExpression(expression) {
      if (!EXPRESSIONS[expression]) throw new Error(`Unknown expression: "${expression}"`);
      return this._switchExpression(expression);
    }

    /**
     * Temporarily switch expression then return to previous one.
     * @param {string} expression
     * @param {number} [duration=2000]  ms to hold expression
     * @returns {Promise<void>}
     */
    async react(expression, duration = 2000) {
      const prev = this._expr;
      await this.setExpression(expression);
      await wait(duration);
      await this.setExpression(prev);
    }

    /**
     * Move gaze direction. Range -50 to +50 for both axes.
     * @param {number} x  Horizontal: negative = left, positive = right
     * @param {number} y  Vertical:   negative = up,   positive = down
     */
    lookAt(x, y) {
      this._gaze = { x, y };
      this._render();
    }

    /** Reset gaze to center. */
    lookCenter() {
      this.lookAt(0, 0);
    }

    /**
     * Trigger a single blink.
     * @param {'normal'|'slow'|'fast'} [speed='normal']
     */
    async blink(speed = 'normal') {
      return this._doBlink(speed, false);
    }

    /**
     * Start talking animation (mouth opens/closes).
     * Automatically called when setExpression('talking') is used.
     */
    startTalking() {
      if (this._expr !== 'talking') this.setExpression('talking');
      else this._startTalkBehavior();
    }

    /**
     * Stop talking and return to neutral.
     */
    stopTalking() {
      if (this._talkTimer) { clearTimeout(this._talkTimer); this._talkTimer = null; }
      this.setExpression('neutral');
    }

    /**
     * List all available expression names.
     * @returns {string[]}
     */
    static expressions() {
      return Object.keys(EXPRESSIONS);
    }

    /**
     * Remove the face and clean up all timers.
     */
    destroy() {
      this._timers.forEach(clearTimeout);
      if (this._talkTimer) clearTimeout(this._talkTimer);
      this._wrapper.remove();
    }

    // ─── Internal ─────────────────────────────────────────────────────────────

    _rand(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

    _addTimer(fn, ms) {
      const id = setTimeout(() => { this._timers = this._timers.filter(t => t !== id); fn(); }, ms);
      this._timers.push(id);
      return id;
    }

    _setTransition(cls) {
      const svg = this._el.svg;
      svg.style.transition = {
        'transition-normal': 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        'transition-fast':   'all 0.15s ease-out',
        'transition-slow':   'all 1.2s cubic-bezier(0.4,0,0.2,1)',
        'transition-bounce': 'all 0.8s cubic-bezier(0.34,1.56,0.5,1.2)',
      }[cls] || '';

      // apply to children via inline style on elements
      const elements = [
        this._el.leftEyebrow, this._el.rightEyebrow,
        this._el.leftEyeRect, this._el.leftEyeClipRect,
        this._el.rightEyeRect, this._el.rightEyeClipRect,
        this._el.leftEyeGroup, this._el.leftEyeIrisGroup,
        this._el.rightEyeGroup, this._el.rightEyeIrisGroup,
        this._el.mouth,
      ];
      const t = {
        'transition-normal': 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        'transition-fast':   'all 0.15s ease-out',
        'transition-slow':   'all 1.2s cubic-bezier(0.4,0,0.2,1)',
        'transition-bounce': 'all 0.8s cubic-bezier(0.34,1.56,0.5,1.2)',
      }[cls] || '';
      elements.forEach(e => { if (e) e.style.transition = t; });
    }

    _applyTheme(expr) {
      if (!this._opts.themedBackground) return;
      const th = THEMES[expr] || THEMES.neutral;
      this._wrapper.style.backgroundImage = `radial-gradient(circle at 50% 50%, ${th.bg} 0%, #050505 80%)`;
      this._el.leftIrisOuter.style.opacity  = th.eo;
      this._el.rightIrisOuter.style.opacity = th.eo;
      this._el.leftIrisInner.style.opacity  = th.ei;
      this._el.rightIrisInner.style.opacity = th.ei;
      // glow
      this._el.svg.style.filter = `drop-shadow(0 0 40px #9D00FF) drop-shadow(0 0 70px ${th.glow1}) drop-shadow(0 0 100px ${th.glow2})`;
    }

    _render() {
      const base = EXPRESSIONS[this._expr];
      const el   = this._el;

      el.leftEyebrow.setAttribute('d',  base.leftEyebrow);
      el.rightEyebrow.setAttribute('d', base.rightEyebrow);

      let lY = base.leftEye.y  + this._micro.lY;
      let lH = base.leftEye.h  + this._micro.lH;
      let rY = base.rightEye.y + this._micro.rY;
      let rH = base.rightEye.h + this._micro.rH;

      if (this._blinking && this._expr !== 'sleeping') {
        lY = lY + lH / 2 - 5; lH = 10;
        rY = rY + rH / 2 - 5; rH = 10;
      }

      [el.leftEyeRect, el.leftEyeClipRect].forEach(e => {
        e.setAttribute('y', lY);
        e.setAttribute('height', Math.max(0, lH));
        e.setAttribute('rx', base.leftEye.rx);
      });
      [el.rightEyeRect, el.rightEyeClipRect].forEach(e => {
        e.setAttribute('y', rY);
        e.setAttribute('height', Math.max(0, rH));
        e.setAttribute('rx', base.rightEye.rx);
      });

      el.leftEyeGroup.style.transform      = `rotate(${base.leftEye.rot}deg)`;
      el.rightEyeGroup.style.transform     = `rotate(${base.rightEye.rot}deg)`;
      el.leftEyeIrisGroup.style.transform  = `rotate(${base.leftEye.rot}deg)`;
      el.rightEyeIrisGroup.style.transform = `rotate(${base.rightEye.rot}deg)`;

      const lx = base.iris.lx + this._gaze.x;
      const rx = base.iris.rx + this._gaze.x;
      const iy = base.iris.y  + this._gaze.y;

      const px = 1.3, py = 1.5;
      const lxI = base.iris.lx + 15 + this._gaze.x * px + this._innerGaze.x;
      const rxI = base.iris.rx - 15 + this._gaze.x * px + this._innerGaze.x;
      const iyI = base.iris.y      + this._gaze.y * py + this._innerGaze.y;

      el.leftIrisOuter.setAttribute('cx', lx);  el.leftIrisOuter.setAttribute('cy', iy);
      el.leftIrisInner.setAttribute('cx', lxI); el.leftIrisInner.setAttribute('cy', iyI);
      el.rightIrisOuter.setAttribute('cx', rx); el.rightIrisOuter.setAttribute('cy', iy);
      el.rightIrisInner.setAttribute('cx', rxI);el.rightIrisInner.setAttribute('cy', iyI);

      let mouthPath = base.mouth;
      if (this._expr === 'talking') {
        mouthPath = this._mouthState ? "M 450 480 Q 500 480 550 480" : "M 460 470 Q 500 530 540 470";
      }
      el.mouth.setAttribute('d', mouthPath);

      // breathing
      if (this._expr === 'sleeping' || this._expr === 'neutral') {
        this._wrapper.style.animation = `__af_breathe ${this._expr === 'sleeping' ? 8 : 5}s infinite ease-in-out`;
      } else {
        this._wrapper.style.animation = '';
      }
    }

    _triggerMicro(offsets, duration) {
      this._micro = { ...this._micro, ...offsets };
      this._render();
      if (duration > 0) {
        this._addTimer(() => {
          if (this._busy) return;
          this._micro = { lY: 0, lH: 0, rY: 0, rH: 0 };
          this._render();
        }, duration);
      }
    }

    async _doBlink(speed = 'normal', isDouble = false) {
      if (this._expr === 'sleeping' || this._busy) return;
      this._setTransition(speed === 'slow' ? 'transition-normal' : 'transition-fast');
      this._blinking = true; this._render();
      await wait(speed === 'slow' ? 300 : 100);
      this._blinking = false; this._render();
      await wait(speed === 'slow' ? 300 : 150);
      if (isDouble) {
        this._blinking = true; this._render();
        await wait(100);
        this._blinking = false; this._render();
        await wait(150);
      }
      this._setTransition('transition-normal');
    }

    _startBehavior() {
      const tick = () => {
        if (!this._busy) {
          const expr = this._expr;
          const rand = Math.random();

          switch (expr) {
            case 'neutral':
              if (rand < 0.3) this._gaze = { x: this._rand(-20,20), y: this._rand(-10,10) };
              else if (rand < 0.5) this._triggerMicro({ lH: -10, rH: -10 }, 400);
              break;
            case 'happy':
              if (rand < 0.4) this._gaze = { x: this._rand(-25,25), y: this._rand(-15,5) };
              else if (rand < 0.6) this._triggerMicro({ lY: -10, rY: -10 }, 500);
              else if (rand < 0.8) this._triggerMicro({ lH: -20, rH: -20 }, 800);
              break;
            case 'sad':
              if (rand < 0.6) this._gaze = { x: this._rand(-10,10), y: this._rand(10,30) };
              else if (rand < 0.8) this._triggerMicro({ lH: -20, rH: -20, lY: 10, rY: 10 }, 1000);
              break;
            case 'angry':
              if (rand < 0.5) { this._setTransition('transition-fast'); this._gaze = { x: this._rand(-30,30), y: this._rand(-10,10) }; this._addTimer(() => this._setTransition('transition-normal'), 200); }
              else if (rand < 0.7) this._triggerMicro({ lH: -30, rH: -30, lY: 15, rY: 15 }, 800);
              break;
            case 'curious':
              if (rand < 0.7) this._gaze = { x: this._rand(-40,40), y: this._rand(-20,20) };
              else if (rand < 0.8) { this._el.svg.style.transform = `rotate(${this._rand(-5,5)}deg)`; this._addTimer(() => { this._el.svg.style.transform = 'rotate(0deg)'; }, 1000); }
              break;
            case 'searching':
              if (rand < 0.4) { this._setTransition('transition-fast'); this._innerGaze = { x: -25, y: 0 }; this._render(); this._addTimer(() => { if (this._expr !== 'searching') return; this._setTransition('transition-normal'); this._gaze.x = -45; this._innerGaze = { x: 0, y: 0 }; this._render(); }, 150); }
              else if (rand < 0.8) { this._setTransition('transition-fast'); this._innerGaze = { x: 25, y: 0 }; this._render(); this._addTimer(() => { if (this._expr !== 'searching') return; this._setTransition('transition-normal'); this._gaze.x = 45; this._innerGaze = { x: 0, y: 0 }; this._render(); }, 150); }
              else { this._setTransition('transition-normal'); this._gaze = { x: 0, y: 0 }; }
              break;
            case 'surprised':
              if (rand < 0.4) this._gaze = { x: this._rand(-15,15), y: this._rand(-15,15) };
              else if (rand < 0.6) this._triggerMicro({ lH: 30, rH: 30 }, 500);
              break;
            case 'sleeping':
              if (rand < 0.1) this._triggerMicro({ lH: 5, rH: 5 }, 300);
              break;
            case 'talking':
              if (rand < 0.4) this._gaze = { x: this._rand(-15,15), y: this._rand(-10,10) };
              break;
          }

          if (Math.random() < 0.4 && expr !== 'sad' && expr !== 'sleeping') {
            this._gaze = { x: 0, y: 0 };
          }
          this._render();
        }
        this._addTimer(tick, this._rand(800, 2500));
      };
      tick();
    }

    _startBlink() {
      const tick = async () => {
        if (!this._busy) {
          const expr  = this._expr;
          let prob    = 0.4;
          let speed   = 'normal';
          let doubleP = 0.1;
          let next    = this._rand(3000, 6000);

          switch (expr) {
            case 'sleeping': prob = 0; break;
            case 'sad':      speed = 'slow'; next = this._rand(5000, 8000); break;
            case 'angry':    prob = 0.2; next = this._rand(6000, 10000); break;
            case 'happy':    doubleP = 0.3; next = this._rand(2000, 5000); break;
            case 'talking':  next = this._rand(2000, 4000); break;
          }

          if (Math.random() < prob) await this._doBlink(speed, Math.random() < doubleP);
          this._addTimer(tick, next);
        } else {
          this._addTimer(tick, 1000);
        }
      };
      tick();
    }

    _startTalkBehavior() {
      if (this._talkTimer) clearTimeout(this._talkTimer);
      const loop = () => {
        if (this._expr !== 'talking' || this._busy) return;
        if (Math.random() < 0.2) {
          this._mouthState = 0; this._render();
          this._talkTimer = setTimeout(loop, this._rand(500, 1500));
        } else {
          this._mouthState = this._mouthState ? 0 : 1; this._render();
          this._talkTimer = setTimeout(loop, this._rand(100, 250));
        }
      };
      loop();
    }

    async _switchExpression(newExpr) {
      if (this._busy || this._expr === newExpr) return;
      this._busy = true;

      this._applyTheme(newExpr);
      this._setTransition('transition-fast');

      if (newExpr === 'surprised') {
        this._triggerMicro({ lH: -20, rH: -20 }, 0);
        this._gaze = { x: 0, y: 0 };
        this._el.svg.style.transform = 'scale(0.95)';
      } else if (newExpr === 'sad' || newExpr === 'sleeping') {
        this._triggerMicro({ lH: -40, rH: -40, lY: 20, rY: 20 }, 0);
        this._gaze = { x: 0, y: 20 };
      } else if (newExpr === 'angry') {
        this._triggerMicro({ lH: -30, rH: -30 }, 0);
      } else {
        this._blinking = true;
        this._gaze = { x: this._rand(-10,10), y: this._rand(5,15) };
      }
      this._render();

      await wait(this._rand(150, 250));

      this._expr      = newExpr;
      this._blinking  = false;
      this._micro     = { lY: 0, lH: 0, rY: 0, rH: 0 };
      this._gaze      = { x: 0, y: 0 };
      this._innerGaze = { x: 0, y: 0 };
      this._el.svg.style.transform = 'scale(1) rotate(0deg)';

      if (newExpr === 'surprised') {
        this._setTransition('transition-bounce');
        this._triggerMicro({ lH: 40, rH: 40 }, 600);
      } else if (newExpr === 'sad' || newExpr === 'sleeping') {
        this._setTransition('transition-slow');
      } else if (newExpr === 'angry') {
        this._setTransition('transition-fast');
      } else {
        this._setTransition('transition-bounce');
      }
      this._render();

      if (this._talkTimer) { clearTimeout(this._talkTimer); this._talkTimer = null; }
      if (newExpr === 'talking') this._startTalkBehavior();

      await wait(800);
      this._setTransition('transition-normal');
      this._busy = false;
    }
  }

  // Inject breathing keyframe once globally
  if (!document.getElementById('__af_styles')) {
    const style = document.createElement('style');
    style.id = '__af_styles';
    style.textContent = `
      @keyframes __af_breathe {
        0%,100% { transform: scale(1) translateY(0px); }
        50%      { transform: scale(1.02) translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
  }

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AetherisFace;
  } else {
    global.AetherisFace = AetherisFace;
  }

})(typeof window !== 'undefined' ? window : this);