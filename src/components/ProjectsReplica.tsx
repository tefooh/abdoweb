import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SlowMo } from 'gsap/EasePack';
import { ExternalLink, Github } from "lucide-react";
import './ProjectsReplica.css';

gsap.registerPlugin(ScrollTrigger, SlowMo);

const initialProjects = [
  {
    title: "Elgana Platform",
    description: "A fitness platform built for performance and scale.",
    link: "https://elgana.fit/",
    type: "Platform",
    tags: ["Web", "Fitness"],
  },
  {
    title: "Population Analysis",
    description: "Deep data analysis on global population trends.",
    link: "https://github.com/AbdelruhmanAshraf/Population-Analysis",
    type: "Data Analysis",
    tags: ["Python", "Data Science"],
    isGithub: true,
  },
  {
    title: "Titanic EDA",
    description: "Exploratory Data Analysis of the Titanic dataset.",
    link: "https://github.com/AbdelruhmanAshraf/Titanic-EDA",
    type: "Data Analysis",
    tags: ["EDA", "Statistics"],
    isGithub: true,
  },
  {
    title: "Bank Decision Tree",
    description: "Machine learning model for bank decision processes.",
    link: "https://github.com/AbdelruhmanAshraf/bank_decision_tree",
    type: "AI/ML",
    tags: ["Decision Tree", "ML"],
    isGithub: true,
  },
  {
    title: "Weather Forecasting",
    description: "Predictive weather forecasting using Python.",
    link: "https://github.com/AbdelruhmanAshraf/weather-forecasting-using-python",
    type: "AI/ML",
    tags: ["Forecasting", "Python"],
    isGithub: true,
  },
];

const works = [...initialProjects, ...initialProjects, ...initialProjects].slice(0, 10).map((w, i) => ({
  ...w,
  size: 0.5 + Math.random() * 0.5,
  y: (0.5 + Math.random() * 0.5) * (i % 2 ? -1 : 1)
}));

export default function ProjectsReplica() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    class Section {
      el: HTMLElement;
      container: HTMLElement;
      ruler: HTMLElement;
      scene: HTMLElement;
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      title: HTMLElement;
      mask: any;
      letters: any[];
      works: any[];
      points: any[];
      bounding: any;
      tl: any;
      animationProgress: number;
      pointsProgress: number;
      last: any;
      scrollProgress: number;
      smoothScrollProgress: number;
      state: number;
      speed: number;
      isPaused: boolean;
      rafId: number;

      constructor(el: HTMLElement) {
        this.el = el;
        this.container = this.el.querySelector('.js-container') as HTMLElement;
        this.ruler = this.el.querySelector('.js-ruler') as HTMLElement;
        this.scene = this.container.querySelector('.js-scene') as HTMLElement;
        this.canvas = this.container.querySelector('.js-canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.title = this.container.querySelector('.js-title') as HTMLElement;

        this.mask = {
          width: 0,
          height: 0,
          maxScale: 1,
          lines: [],
          el: this.el.querySelector('.js-mask'),
          svg: this.el.querySelector('.js-mask-svg'),
          pathOuter: this.el.querySelector('.js-mask-path-outer'),
          pathInner: this.el.querySelector('.js-mask-path-inner'),
          pathLines: this.el.querySelector('.js-mask-path-lines'),
        };

        this.letters = [];
        this.title.querySelectorAll('.js-letter.original-letter').forEach((_letter: Element) => {
          this.letters.push({
            el: _letter as HTMLElement,
            ghosts: [],
          });
        });

        this.works = [];
        this.container.querySelectorAll('.js-work').forEach((_work: Element) => {
          this.works.push({ el: _work as HTMLElement });
        });

        this.points = [];
        this.scrollProgress = 0;
        this.smoothScrollProgress = 0;
        this.animationProgress = 0;
        this.pointsProgress = 0;
        this.state = 0;
        this.speed = 1000;
        this.last = { animationProgress: 0, pointsProgress: 0 };
        this.isPaused = false;
        this.rafId = 0;

        this.init();
      }

      init() {
        this.setCtxStyle();
        this.setSize();
        this.setMask();
        this.setPoints();
        this.setLetters();
        this.setWorks();
        this.setTimeline();

        ScrollTrigger.refresh();

        window.addEventListener('resize', this.onResize.bind(this));

        // Use IntersectionObserver instead of custom event
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          this.isPaused = !entry.isIntersecting;
          if (!this.isPaused) {
            this.startTick();
          } else {
            this.stopTick();
          }
        }, { threshold: 0 });
        observer.observe(this.el);
      }

      destroy() {
        window.removeEventListener('resize', this.onResize);
        this.stopTick();
        if (this.tl) this.tl.kill();
      }

      startTick = () => {
        if (!this.isPaused) {
          this.tick();
          this.rafId = requestAnimationFrame(this.startTick);
        }
      }

      stopTick = () => {
        cancelAnimationFrame(this.rafId);
      }

      onResize = () => {
        this.setCtxStyle();
        this.setSize();
        this.setMask();
        this.setPoints();
        this.setLetters();
        this.setWorks();
        this.setTimeline();
      }

      setCtxStyle() {
        requestAnimationFrame(() => {
          this.ctx.strokeStyle = '#DDFDFF'; // --color-primary alternative
        });
      }

      setSize() {
        const h = Math.max(this.works.length * 50, 100);
        this.el.style.setProperty('--height', h + 'vh');

        const bounding = this.container.getBoundingClientRect();
        this.bounding = {
          left: bounding.left,
          top: bounding.top,
          width: window.innerWidth,
          height: window.innerHeight,
        };

        this.canvas.width = this.bounding.width;
        this.canvas.height = this.bounding.height;
        this.speed = Math.hypot(this.bounding.width, this.bounding.height) * 4;
      }

      setMask() {
        const { mask } = this;
        const width = mask.el.clientWidth;
        const height = mask.el.clientHeight;
        mask.width = width;
        mask.height = height;
        mask.svg.style.width = width + 'px';
        mask.svg.style.height = height + 'px';

        const elBounding = this.el.getBoundingClientRect();
        const rulerBounding = this.ruler.getBoundingClientRect();
        const rulerWidth = rulerBounding.width;
        const rulerHeight = rulerBounding.height;
        const offsetX = rulerBounding.left - elBounding.left;
        const offsetY = rulerBounding.top - elBounding.top;

        const dOuter = `M -1 0 L ${width + 2} 0 L ${width + 2} ${height} L -1 ${height} Z`;
        const corners = {
          tl: { x: offsetX, y: offsetY },
          tr: { x: offsetX + rulerWidth, y: offsetY },
          br: { x: offsetX + rulerWidth, y: offsetY + rulerHeight },
          bl: { x: offsetX, y: offsetY + rulerHeight },
        };

        let size = (corners.tr.x - corners.tl.x) / 2;
        mask.maxScale = window.innerWidth / size;

        let dInner = `M ${corners.tl.x} ${corners.tl.y + size} A ${size} ${size} 0 0 1 ${corners.tr.x} ${corners.tr.y + size} L ${corners.br.x} ${corners.br.y - size} A ${size} ${size} 0 0 1 ${corners.bl.x} ${corners.bl.y - size} Z`;
        const linesClip = `${dOuter} ${dInner}`;
        mask.pathOuter.setAttribute('d', `${dOuter} ${dInner}`);

        const thickness = window.innerWidth > 767 ? 16 : 8;
        corners.tl.x += thickness; corners.tl.y += thickness;
        corners.tr.x -= thickness; corners.tr.y += thickness;
        corners.br.x -= thickness; corners.br.y -= thickness;
        corners.bl.x += thickness; corners.bl.y -= thickness;

        size = (corners.tr.x - corners.tl.x) / 2;
        if (size < 0) size = 0;

        dInner = `M ${corners.tl.x} ${corners.tl.y + size} A ${size} ${size} 0 0 1 ${corners.tr.x} ${corners.tr.y + size} L ${corners.br.x} ${corners.br.y - size} A ${size} ${size} 0 0 1 ${corners.bl.x} ${corners.bl.y - size} Z`;
        mask.pathInner.setAttribute('d', `${dOuter} ${dInner}`);

        mask.lines = [];
        const vLines = window.innerWidth > 767 ? 12 : 8;
        const gapX = width / vLines;
        const gapY = height * 0.1;
        const hLines = Math.ceil(height / gapY);

        for (let i = 1; i < vLines; i++) mask.lines.push({ p1: { x: gapX * i, y: 0 }, p2: { x: gapX * i, y: height } });
        for (let i = 0; i < hLines; i++) mask.lines.push({ p1: { x: 0, y: gapY * i }, p2: { x: width, y: gapY * i } });

        let dLines = '';
        mask.lines.forEach((l: any) => dLines += `M ${l.p1.x} ${l.p1.y} L ${l.p2.x} ${l.p2.y} `);
        mask.pathLines.setAttribute('d', dLines);
        mask.pathLines.style.clipPath = `path(evenodd, '${linesClip}')`;
      }

      setLetters() {
        const { letters, scene } = this;
        letters.forEach((letter, j) => {
          letter.ghosts.forEach((g: any) => g.el.remove());
          letter.ghosts = [];

          const bounding = letter.el.getBoundingClientRect();
          letter.width = bounding.width;
          letter.height = bounding.height;
          letter.top = bounding.top - this.bounding.top;
          letter.left = bounding.left;
          letter.freq = 1 + Math.random();

          const multiplier = window.innerWidth > 767 ? 0.75 : 0.5;
          letter.total = Math.round((this.bounding.width / letter.width) * multiplier) + 2;

          for (let i = 0; i < letter.total; i++) {
            const el = document.createElement('span');
            el.className = 's__scene__letter js-letter';
            el.innerText = letter.el.innerText;
            el.dataset.letter = letter.el.innerText;
            scene.appendChild(el);

            const ghost = {
              el,
              x: letter.left,
              y: letter.top,
              i: i - letter.total * 0.5,
              p: (i / letter.total - 0.5) * 2,
              ap: Math.abs(i / letter.total - 0.5) * 2,
            };

            el.style.top = ghost.y + 'px';
            el.style.left = ghost.x + 'px';
            el.style.zIndex = String(j !== 1 && j !== 2 && (j + letters.length + i) % 5 === 0 ? 3 : 1);
            el.style.setProperty('--ix', String(ghost.i));
            el.style.setProperty('--iy', String(((j + 1) / (letters.length + 1) - 0.5) * 2));
            el.style.setProperty('--ap', String(ghost.ap));
            el.style.setProperty('--p', String(ghost.p));
            letter.ghosts.push(ghost);
          }
        });
      }

      setWorks() {
        this.works.forEach((work, i) => {
          // Set statically inside component or here
          work.el.style.setProperty('--progress', '1');
        });
      }

      setTimeline() {
        if (this.tl) this.tl.kill();

        const worksEl = this.works.map(w => w.el);

        this.tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.el,
            start: 'top 25%',
            end: 'bottom 75%',
            scrub: 1,
          },
          onUpdate: () => {
            this.scene.style.setProperty('--state', String(this.state));
          }
        });

        this.tl.fromTo(this.mask.el, { scale: 1 }, { scale: this.mask.maxScale, duration: 0.75, ease: 'power4.in' }, 0);
        this.tl.fromTo(this.scene, { scale: 0.75 }, { scale: 1, duration: 0.75, ease: 'power3.in' }, 0);
        this.tl.fromTo(this.container, { clipPath: 'inset(0 1rem)' }, { clipPath: 'inset(0 0rem)', duration: 0.75, ease: 'power3.in' }, 0);
        this.tl.fromTo(this, { pointsProgress: 0 }, { pointsProgress: 1, duration: 1, ease: 'power4.inOut' }, 0);
        this.tl.fromTo(this, { state: 0 }, { state: 1, duration: 0.75, ease: 'power4.in' }, 0);

        // Progress from 1 to -1 for works
        this.tl.fromTo(worksEl, { '--progress': 1 }, { '--progress': -1, ease: 'slow(0.15, 0.6)', stagger: 0.25 }, 0.75);
        this.tl.fromTo(this, { animationProgress: 0 }, { animationProgress: 10000, duration: this.tl.totalDuration(), ease: 'power1.out' }, 0.75);

        this.tl.fromTo(this, { state: 1 }, { state: 0, duration: 0.75, ease: 'power4.inOut', immediateRender: false }, '-=1');
        this.tl.fromTo(this.mask.el, { scale: this.mask.maxScale }, { scale: 1, duration: 0.75, ease: 'power4.inOut', immediateRender: false }, '-=1');
        this.tl.fromTo(this.scene, { scale: 1 }, { scale: 0.75, duration: 0.75, ease: 'power3.inOut', immediateRender: false }, '-=1');
        this.tl.fromTo(this.container, { clipPath: 'inset(0 0rem)' }, { clipPath: 'inset(0 1rem)', duration: 0.75, ease: 'power3.inOut', immediateRender: false }, '-=1');
        this.tl.fromTo(this, { pointsProgress: 1 }, { pointsProgress: 0, duration: 1, ease: 'power4.inOut' }, '-=1');
      }

      moveLetters() {
        const { speed, letters, animationProgress } = this;
        letters.forEach(letter => {
          const letterSpeed = speed * letter.freq;
          letter.ghosts.forEach((ghost: any, index: number) => {
            let progress = (((animationProgress % letterSpeed) / letterSpeed + index / letter.total) % 1) / 0.7 - 0.15;
            ghost.el.style.setProperty('--progress', String(progress));
          });
        });
      }

      setPoints() {
        this.points = [];
        const gap = 24;
        const cols = Math.ceil((this.bounding.width * 1.2) / gap);
        const rows = Math.ceil((this.bounding.height * 1.2) / gap);
        const offsetX = (this.bounding.width - cols * gap) * 0.5;
        const offsetY = (this.bounding.height - rows * gap) * 0.5;
        const hWidth = this.bounding.width * 0.5;
        const hHeight = this.bounding.height * 0.5;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * gap + offsetX;
            const y = j * gap + offsetY;
            this.points.push({ x, y, dx: hWidth - x, dy: hHeight - y, flowX: 0 });
          }
        }
      }

      movePoints() {
        this.points.forEach(p => p.flowX = (this.animationProgress * -0.05) % 24);
      }

      drawPoints() {
        const { bounding, ctx, points, animationProgress, pointsProgress, last } = this;
        const rAnimationProgress = Math.round(animationProgress * 100) / 100;
        const rPointsProgress = Math.round(pointsProgress * 100) / 100;

        if (rPointsProgress === last.pointsProgress && rAnimationProgress === last.animationProgress) return;

        ctx.clearRect(0, 0, bounding.width, bounding.height);
        ctx.beginPath();

        points.forEach((point) => {
          const x = point.x + point.dx * (1 - pointsProgress) * 0.2 + point.flowX;
          const y = point.y + point.dy * (1 - pointsProgress) * 0.2;
          ctx.rect(x, y, 0.5, 0.5);
        });
        ctx.stroke();

        last.pointsProgress = rPointsProgress;
        last.animationProgress = rAnimationProgress;
      }

      tick() {
        this.scrollProgress = Math.max(Math.min(1, ScrollTrigger.positionInViewport(this.el, 'top')), 0) * -1 + (1 - Math.max(Math.min(1, ScrollTrigger.positionInViewport(this.el, 'bottom')), 0));
        this.smoothScrollProgress += (this.scrollProgress - this.smoothScrollProgress) * 0.1;
        this.el.style.setProperty('--scroll-progress', String(this.scrollProgress));

        this.movePoints();
        this.moveLetters();
        this.drawPoints();

        // update works inview class manually based on progress attribute
        this.works.forEach(w => {
          const p = parseFloat(w.el.style.getPropertyValue('--progress') || "1");
          if (p < 1 && p > -1) {
            w.el.classList.add('is-inview');
          } else {
            w.el.classList.remove('is-inview');
          }
        });
      }
    }

    const section = new Section(sectionRef.current);

    return () => {
      section.destroy();
    };
  }, []);

  return (
    <section id="work" className="s-work" ref={sectionRef}>
      <div className="s__outer">
        <div className="s__inner js-container relative">
          <h2 className="s__title">
            <span className="s__title__inner js-title">
              <span className="s__title__letter js-letter original-letter">W</span>
              <span className="s__title__letter js-letter original-letter">O</span>
              <span className="s__title__letter js-letter original-letter">R</span>
              <span className="s__title__letter js-letter original-letter">K</span>
            </span>
          </h2>

          <div className="s__scene js-scene">
            {works.map((work, index) => {
              const key = work.title.split(' ')[0] + '-' + index;
              return (
                <div
                  key={index}
                  className="a-work s__scene__work js-work"
                  style={{ '--size': work.size, '--y': work.y } as any}
                >
                  <div className="a__inner">
                    <a href={work.link} target="_blank" rel="noopener noreferrer">
                      <div className="a__video bg-[#111] flex flex-col items-center justify-center text-white" style={{ width: '1082px', height: '600px', maxWidth: '80vw', maxHeight: '50vh', position: 'relative' }}>
                        <div className="absolute inset-0 gradient-primary opacity-10"></div>
                        <h3 className="text-4xl md:text-7xl font-bold font-display z-10">{work.title}</h3>
                        <p className="mt-4 text-medium-grey z-10 text-center max-w-sm">{work.description}</p>
                        <div className="absolute bottom-6 right-6 w-12 h-12 bg-white text-black flex items-center justify-center rounded-full hover:scale-110 transition-transform">
                          {work.isGithub ? <Github size={20} /> : <ExternalLink size={20} />}
                        </div>
                      </div>
                      <div className="a__caption">
                        <div className="a__caption__text">{work.title}</div>
                        <div className="a__caption__key">#{key}</div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <canvas className="s__canvas js-canvas" style={{ pointerEvents: 'none' }}></canvas>
        </div>

        <div className="s__mask-outer">
          <div className="s__mask js-mask">
            <svg className="s__mask__svg js-mask-svg">
              <path className="s__mask__path-inner js-mask-path-inner" d=""></path>
              <path className="s__mask__path-outer js-mask-path-outer" d=""></path>
              <path className="s__mask__path-lines js-mask-path-lines" d=""></path>
            </svg>
          </div>
        </div>

        <div className="s__ruler js-ruler"></div>
      </div>
    </section>
  );
}