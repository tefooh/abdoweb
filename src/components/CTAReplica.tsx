import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTAReplica.css';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  ['C', 'O', 'N', 'T', 'A', 'C', 'T'],
  ['E', 'L', 'F', 'E', 'K', 'K', 'Y'],
];

export default function CTAReplica() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;

    class Section {
      el: HTMLElement;
      container: HTMLElement;
      hover: HTMLElement;
      button: HTMLElement;
      cta: HTMLElement;
      bounding: any;
      ctaMaxSize: number;
      grid: any;
      wave: any;
      buttonIsHovered: boolean;
      isPaused: boolean;
      tl: any;
      rafId: number;

      constructor(el: HTMLElement) {
        this.el = el;
        this.container = this.el.querySelector('.js-container') as HTMLElement;
        this.hover = this.el.querySelector('.js-hover') as HTMLElement;
        this.button = this.el.querySelector('.js-button') as HTMLElement;
        this.cta = this.el.querySelector('.js-cta') as HTMLElement;

        this.grid = {
          bounding: null,
          width: 0,
          height: 0,
          vLines: 0,
          hLines: 0,
          gapX: 0,
          gapY: 0,
          lines: [],
          points: [],
          el: this.el.querySelector('.js-grid'),
          svg: this.el.querySelector('.js-grid-svg'),
          path: this.el.querySelector('.js-grid-path'),
        };

        this.wave = {
          progress: 0,
          op: 0,
          speed: window.innerWidth > 767 ? 15 : 10,
          strength: window.innerWidth > 767 ? 1 : 0.35,
          state: 'paused',
          timeout: 0 as any,
        };

        this.buttonIsHovered = false;
        this.isPaused = false;
        this.rafId = 0;
        this.ctaMaxSize = 0;

        this.init();
      }

      init() {
        this.setSize();
        this.setGrid();
        this.createPulseTimeline();
        this.bindEvents();

        // Start tick loop immediately
        this.startTick();
      }

      bindEvents() {
        window.addEventListener('resize', this.onResize.bind(this));

        this.hover.addEventListener('mouseenter', this.onHover.bind(this));
        this.hover.addEventListener('touchstart', this.onHover.bind(this));
        this.hover.addEventListener('mouseleave', this.onOut.bind(this), { passive: true });
        this.el.addEventListener('touchstart', this.onOut.bind(this), { passive: true });

        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          this.isPaused = !entry.isIntersecting;
          if (this.isPaused) {
            this.el.classList.add('is-out-of-view');
          } else {
            this.el.classList.remove('is-out-of-view');
          }
        }, { threshold: 0 });
        
        observer.observe(this.el);
      }

      destroy() {
        window.removeEventListener('resize', this.onResize.bind(this));
        this.stopTick();
        if (this.tl) this.tl.kill();
        clearTimeout(this.wave.timeout);
      }

      startTick = () => {
        if (!this.isPaused) {
          this.tick(Date.now());
        }
        this.rafId = requestAnimationFrame(this.startTick);
      }

      stopTick() {
        cancelAnimationFrame(this.rafId);
      }

      onResize() {
        this.setSize();
        this.setGrid();
      }

      onHover(e: any) {
        if (this.buttonIsHovered) return;
        this.buttonIsHovered = true;
        this.hover.classList.add('is-active');

        if (this.tl) this.tl.pause();

        clearTimeout(this.wave.timeout);
        this.wave.timeout = setTimeout(() => {
          this.waveShock();
        }, 600);

        gsap.to(this.wave, {
          op: 1,
          delay: 0.3,
          duration: 1.2,
          ease: 'expo.inOut',
          overwrite: true,
        });

        e.stopPropagation();
      }

      onOut(e: any) {
        const target = e.target as HTMLAnchorElement;

        // If clicking the email link, let it navigate instead of closing immediately
        if (target.tagName === 'A') {
          return;
        }

        if (!this.buttonIsHovered) return;

        clearTimeout(this.wave.timeout);
        this.buttonIsHovered = false;
        this.hover.classList.remove('is-active');

        if (this.tl) this.tl.play(0);

        gsap.to(this.wave, {
          op: 0,
          duration: 0.7,
          ease: 'expo.inOut',
          overwrite: true,
        });
      }

      setSize() {
        this.grid.bounding = this.grid.el.getBoundingClientRect();
        this.bounding = this.container.getBoundingClientRect();

        this.ctaMaxSize = Math.min(this.bounding.width, this.bounding.height) - 32;
        this.cta.style.setProperty('--size', this.ctaMaxSize + 'px');
      }

      setGrid() {
        const { grid } = this;
        const width = this.grid.bounding.width;
        const height = this.grid.bounding.height;

        grid.width = width;
        grid.height = height;

        grid.svg.style.width = width + 'px';
        grid.svg.style.height = height + 'px';

        grid.points = [];
        grid.vLines = window.innerWidth > 767 ? 12 : 8;
        grid.gapX = width / grid.vLines;
        grid.gapY = this.bounding.height / 8;
        grid.hLines = Math.floor(height / grid.gapY);

        const offsetY = height - grid.gapY * grid.hLines;
        const center = {
          x: width / 2,
          y: height - this.bounding.height / 2,
        };

        for (let i = 0; i <= grid.vLines; i++) {
          const row: any[] = [];
          for (let j = 0; j <= grid.hLines; j++) {
            const point = {
              x: grid.gapX * i,
              y: grid.gapY * j + (j !== 0 ? offsetY : 0),
              ax: 0, ay: 0, vx: 0, vy: 0, wx: 0, wy: 0, mx: 0, my: 0, ox: 0, oy: 0, dx: 0, dy: 0, dist: 0,
            };

            const MathHypot = Math.hypot;
            const dx = point.x - center.x;
            const dy = point.y - center.y;
            const angle = Math.atan2(dy, dx);

            point.dist = MathHypot(dx, dy);
            if (point.dist === 0) {
              point.dx = 0;
              point.dy = 0;
            } else {
              point.dx = Math.cos(angle) * (width / 2 / point.dist) * 5;
              point.dy = Math.sin(angle) * (width / 2 / point.dist) * 5;
            }

            row.push(point);
          }
          grid.points.push(row);
        }
      }

      createPulseTimeline() {
        const text = this.container.querySelector('.js-button-text') as HTMLElement;
        if (!text) return;

        this.tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.5,
        });

        this.tl.call(() => {
          this.wave.state = 'pulse';
        });

        this.tl.fromTo(
          text,
          { scale: 0.85 },
          { scale: 1.05, duration: 2.7, ease: 'power2.in' }
        );

        this.tl.call(this.wavePulse.bind(this), []);

        this.tl.to(text, {
          scale: 0.85,
          duration: 0.15,
          ease: 'power4.out',
        });
      }

      movePoints(time: number) {
        const { grid, wave } = this;
        const sw = window.innerWidth;
        const sh = window.innerHeight;
        const targetHypot = Math.hypot(sh, sw);

        grid.points.forEach((col: any[], x: number) => {
          col.forEach((point: any, y: number) => {
            if (y === 0 || point.dist === 0) return;

            const d = Math.abs(point.dist - wave.progress);
            const l = 30;

            if (d < l) {
              const s = 1 - d / l;
              const a = Math.atan2(point.dy, point.dx);
              const f = Math.cos(d * 0.01) * s;

              point.vx += Math.cos(a) * f * l * 0.5 * wave.strength;
              point.vy += Math.sin(a) * f * l * 0.5 * wave.strength;
            }

            point.vx += (0 - point.wx) * 0.001; // String tension
            point.vy += (0 - point.wy) * 0.001;

            point.vx *= 0.9; // Friction
            point.vy *= 0.9;

            point.wx += point.vx * 3; // Strength
            point.wy += point.vy * 3;

            point.wx *= 0.9;
            point.wy *= 0.9;

            point.mx = point.wx * 0.1;
            point.my = point.wy * 0.1;

            point.ox = point.dx / targetHypot;
            point.oy = point.dy / targetHypot;

            point.ox = this.easeOut(point.ox);
            point.oy = this.easeOut(point.oy);

            point.ox *= grid.gapX * 75 * (point.dist / this.ctaMaxSize);
            point.oy *= grid.gapY * 75 * (point.dist / this.ctaMaxSize);
          });
        });
      }

      easeOut(t: number) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      drawLines() {
        const { grid } = this;
        let d = '';

        // Vertical lines
        grid.points.forEach((col: any[]) => {
          col.forEach((point: any, i: number) => {
            const p = this.movedPoint(point);
            if (i === 0) {
              d += `M ${p.x} ${p.y} `;
            } else {
              d += `L ${p.x} ${p.y} `;
            }
          });
        });

        // Horizontal lines
        for (let y = 0; y < grid.hLines; y++) {
          grid.points.forEach((col: any[], x: number) => {
            const point = col[y];
            const p = this.movedPoint(point);

            if (x === 0) {
              d += `M ${p.x} ${p.y} `;
            } else {
              d += `L ${p.x} ${p.y} `;
            }
          });
        }

        grid.path.setAttribute('d', d);
      }

      movedPoint(point: any) {
        return {
          x: point.x + point.mx + point.ox * this.wave.op,
          y: point.y + point.my + point.oy * this.wave.op,
        };
      }

      wavePulse() {
        if (this.buttonIsHovered) return;
        const { wave } = this;
        wave.progress = 0;
        wave.state = 'pulse';
        wave.speed = window.innerWidth > 767 ? 15 : 10;
        wave.strength = window.innerWidth > 767 ? 1 : 0.35;
      }

      waveShock() {
        const { wave } = this;
        if (!this.buttonIsHovered || wave.state === 'shock') return;
        wave.progress = 0;
        wave.state = 'shock';
        wave.speed = 30;
        wave.strength = 5;
      }

      tick(time: number) {
        const { wave } = this;

        if (wave.progress < this.grid.height) {
          if (wave.state !== 'paused') {
            wave.progress += wave.speed;
          }
        }

        this.movePoints(time);
        this.drawLines();
      }
    }

    const section = new Section(sectionRef.current);

    return () => {
      section.destroy();
    };
  }, []);

  return (
    <section className="s-cta overflow-hidden relative" data-intersect ref={sectionRef}>
      <div id="contact" className="s__inner js-container">
        <div className="s__hover js-hover group absolute" style={{ zIndex: 10 }}>
          <div className="s__button js-button relative">
            <div className="s__button__inner absolute flex items-center justify-center">
              <div className="s__button__text js-button-text">
                CONTACT
              </div>
            </div>
          </div>

          <div className="s__cta js-cta">
            {lines.map((line, i) => (
              <div key={i} className={`s__cta__line s__cta__line--${i === 0 ? 'top' : 'bottom'}`}>
                <div className="s__cta__text">
                  {line.map((char, j) => {
                    const computedDelay = (j + 1) * 0.1;
                    const delayStr = `${computedDelay}s`;
                    return (
                      <span key={j} className="s__cta__char" style={{ '--delay': delayStr } as React.CSSProperties}>
                        {[...Array(4)].map((_, k) => {
                          const computedBaseOffset = k === 0 ? 0 : 0.02 + (4 - k) * 0.04;
                          const baseOffsetStr = `${computedBaseOffset}s`;
                          
                          const computedMoveDelay = computedDelay + computedBaseOffset;
                          const computedToggleTop = computedDelay + computedBaseOffset + 0.45;
                          const computedToggleBottom = computedDelay + computedBaseOffset + 1.45;

                          let dynamicClip = '';
                          if (i === 0 && k > 0) { // top
                             dynamicClip = `inset(0 0 calc(100% - ${k * 0.03}em) 0)`;
                          } else if (i === 1 && k > 0) { // bottom
                             dynamicClip = `inset(calc(100% - ${k * 0.03}em) 0 0 0)`;
                          }

                          return (
                            <span 
                              key={k} 
                              className="s__cta__char__slice" 
                              style={{ 
                                '--offset': baseOffsetStr,
                                '--move-delay': `${computedMoveDelay}s`,
                                '--toggle-delay': i === 0 ? `${computedToggleTop}s` : `${computedToggleBottom}s`,
                                clipPath: dynamicClip !== '' ? dynamicClip : undefined,
                              } as React.CSSProperties}
                              dangerouslySetInnerHTML={{ __html: char }} 
                            />
                          );
                        })}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            <a href="mailto:abdelruhamanelfekky@gmail.com" className="s__cta__link">
              abdelruhamanelfekky@gmail.com
            </a>

            <div className="s__cta__stars">
              {[...Array(4)].map((_, idx) => (
                <svg
                  key={idx}
                  className="s__cta__star"
                  width="49" height="49" viewBox="0 0 49 49" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z" />
                </svg>
              ))}
            </div>

            <div className="a-dots"></div>
          </div>
        </div>
      </div>

      <div className="s__grid js-grid">
        <svg className="s__grid__svg js-grid-svg">
          <path className="s__grid__path js-grid-path" d=""></path>
        </svg>
      </div>
    </section>
  );
}
