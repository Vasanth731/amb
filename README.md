# amb

> *a polymath studio, unraveling the creation to know the creator, though it's all perspective.*

**amb** is a personal website and studio space, hosted on GitHub Pages. It brings together two things: a **digital garden** for exploring ideas, and a **feed** that shows off projects from the studio.

## scire: the digital garden

*Scire* comes from Latin and means "to know". Everything around us is made of smaller units that join together to form bigger ones, and scire follows that idea through an interactive **knowledge graph**:

- **scire** sits at the centre and branches into three fields of science:
  - **Formal**: math (calculus, geometry, algebra)
  - **Natural**: life, physical and planetary sciences
  - **Social**: history, geography, civics, economics, sociology, psychology, anthropology, linguistics, philosophy, theology
- Click a node to open its page. Studio projects are linked in where they fit.

A digital garden isn't a blog. It's a set of linked notes that keep growing and getting tended over time. The pages aren't meant to be read in order: you wander from one node to the next.

## Feed

The feed is a showcase of studio work:

- **Particle Physics**: short introductions to the Standard Model and quantum fluctuations
- **RL Stock Trading Agent**: a reinforcement-learning trading agent, measured against buy-and-hold
- **Arcade Games, RL Agents**: recorded episodes of trained agents playing Pacman (DQN) and Pong (PPO)
- **Digital Signal Processing**: standalone guitar plugins (compressor, gate, boost, distortion, fuzz, drive, chorus, flanger, phaser, reverb, rotary, tremolo, uni-vibe, vibrato) plus a pedalboard

## How the site is built

This is a plain static site, with no framework and no build step:

| File(s) | Purpose |
| --- | --- |
| `index.html`, `style.css`, `script.js` | Landing page and navigation |
| `scire.html`, `graph-style.css`, `graph-script.js` | Knowledge graph: nodes are placed with CSS, and the connections are drawn in SVG by JavaScript |
| `<topic>.html` | One page per node in the garden |
| `feed.html` | Project showcase |
| `*.exe`, `*.webm`, `*_thumbnail.*` | Plugin downloads, demo videos and their previews |

### Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server
```

### Deploy

Push to `main`. GitHub Pages serves the repository root.
