import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

class Particle {
  private x: number;
  private effect: Effect;
  private y: number;
  private originX: number;
  private originY: number;
  private size: number;
  private color: string;
  private dx: number;
  private dy: number;
  private vx: number;
  private vy: number;
  private force: number;
  private angle: number;
  private distance: number;
  private friction: number;
  private ease: number;

  constructor(
    effect: Effect,
    x: number,
    y: number,
    size: number,
    color: string
  ) {
    this.effect = effect;
    this.x = Math.random() * this.effect.canvasWidth;
    this.y = this.effect.canvasHeight;
    this.originX = x;
    this.originY = y;
    this.size = size;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.5;
  }

  update(): void {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;
    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
  draw(): void {
    this.effect.context.beginPath();
    this.effect.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    this.effect.context.fillStyle = this.color;
    this.effect.context.fill();
  }
}

class Effect {
  public canvasWidth: number;
  public canvasHeight: number;

  private particles: Particle[] = [];
  private gap: number = 1;
  public mouse: { radius: number; x: number; y: number } = {
    radius: 20000,
    x: 0,
    y: 0,
  };

  constructor(
    public context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    initialText: string
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.wrapText(initialText);
  }

  wrapText(text: string): void {
    const fontSize = 100;
    const lineHeight = fontSize * 1.2;
    const letterSpacing = 10;
    let textX =
      this.canvasWidth / 2 - (text.length * (fontSize / 2 + letterSpacing)) / 2;
    const textY = this.canvasHeight / 2 - lineHeight / 2;

    this.context.font = `${fontSize}px Bangers`;
    this.context.textAlign = 'left';
    this.context.textBaseline = 'middle';
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 5;

    const colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'indigo',
      'violet',
      'pink',
    ];

    for (const character of text) {
      const charWidth = this.context.measureText(character).width;
      const colorIndex = text.indexOf(character) % colors.length;
      this.context.fillStyle = colors[colorIndex];
      this.context.fillText(character, textX, textY);
      this.context.strokeText(character, textX, textY);
      textX += charWidth + letterSpacing;
    }
  }
  convertToParticles(): void {
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ).data;
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red},${green},${blue})`;
          this.particles.push(new Particle(this, x, y, this.gap, color));
        }
      }
    }
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  render(): void {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}

@Component({
  selector: 'text-effect',
  templateUrl: './text-effect.component.html',
  styleUrls: ['./text-effect.component.scss'],
})
export class TextEffectComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas:
    | ElementRef<HTMLCanvasElement>
    | undefined;
  private ctx!: CanvasRenderingContext2D;
  private effect!: Effect;
  private loopId: any;

  constructor() {}

  ngOnInit(): void {
    if (!this.canvas) {
      console.error('Canvas not found');
      return;
    }

    this.ctx = this.canvas.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    this.effect = new Effect(this.ctx, canvasWidth, canvasHeight, 'Mr-Bitcoin');
    this.effect.convertToParticles();
    this.animate();
  }

  animate(): void {
    this.ctx.clearRect(0, 0, this.effect.canvasWidth, this.effect.canvasHeight);
    this.effect.render();
    this.loopId = requestAnimationFrame(this.animate.bind(this));
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.effect.mouse.x = event.x;
    this.effect.mouse.y = event.y;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.effect.mouse.x = 0;
    this.effect.mouse.y = 0;
  }

  ngOnDestroy(): void {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
    }
  }
}
