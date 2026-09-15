"""
capture_gameplay.py — dev-time utility, not served by GitHub Pages.

Runs the trained Pacman (DQN) and Pong (PPO) agents against the real Atari
emulator using the existing pacman_infer.py / ppo_infer.py model code and
weights, and records the resulting gameplay as WebM videos + PNG thumbnails
for the Feed page's arcade popup player.

Run from the repo root:
    python tools/capture_gameplay.py [--max-steps N] [--fps N]
"""
import argparse
import os
import sys

import cv2
import numpy as np
import torch

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)

from pacman_infer import DQN, FrameStack as PacmanFrameStack, ENV_ID as PACMAN_ENV_ID, SAVE_PATH as PACMAN_WEIGHTS
from ppo_infer import ActorCritic, FrameStack as PongFrameStack, VALID_ACTIONS as PONG_VALID_ACTIONS, POLICY_PATH as PONG_WEIGHTS

import ale_py
import gymnasium as gym
gym.register_envs(ale_py)

UPSCALE = 3
HUD_H = 28
THUMB_FRAME = 60


def upscale(frame, factor=UPSCALE):
    h, w = frame.shape[:2]
    return cv2.resize(frame, (w * factor, h * factor), interpolation=cv2.INTER_NEAREST)


def add_hud(frame, text):
    h, w = frame.shape[:2]
    canvas = np.zeros((h + HUD_H, w, 3), dtype=np.uint8)
    canvas[HUD_H:, :, :] = frame
    cv2.putText(canvas, text, (8, HUD_H - 9), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
    return canvas


def write_video(frames, path, fps):
    h, w = frames[0].shape[:2]
    fourcc = cv2.VideoWriter_fourcc(*"vp09")
    vw = cv2.VideoWriter(path, fourcc, fps, (w, h))
    for f in frames:
        vw.write(cv2.cvtColor(f, cv2.COLOR_RGB2BGR))
    vw.release()


def save_thumb(frames, path):
    idx = min(THUMB_FRAME, len(frames) - 1)
    cv2.imwrite(path, cv2.cvtColor(frames[idx], cv2.COLOR_RGB2BGR))


def capture_pacman(max_steps, fps, device):
    ckpt = torch.load(os.path.join(ROOT, PACMAN_WEIGHTS), weights_only=False, map_location=device)
    n_actions = ckpt.get("n_actions", 5)
    model = DQN(n_actions).to(device)
    model.load_state_dict(ckpt["model_state_dict"])
    model.eval()

    env = gym.make(PACMAN_ENV_ID, render_mode="rgb_array")
    stacker = PacmanFrameStack()
    obs, _ = env.reset()
    state = stacker.reset(obs)

    frames = []
    total = 0.0
    for step in range(max_steps):
        with torch.no_grad():
            state_t = torch.tensor(state, dtype=torch.float32).unsqueeze(0).to(device)
            action = model(state_t).argmax(1).item()
        obs, reward, terminated, truncated, _ = env.step(action)
        state = stacker.step(obs)
        total += reward
        frame = add_hud(upscale(env.render()), f"PACMAN RL AGENT   SCORE {int(total):>5}   STEP {step + 1:>5}")
        frames.append(frame)
        if terminated or truncated:
            break
    env.close()

    print(f"Pacman: {len(frames)} frames, score={total}")
    write_video(frames, os.path.join(ROOT, "pacman_rl.webm"), fps)
    save_thumb(frames, os.path.join(ROOT, "pacman_thumb.png"))


def capture_pong(max_steps, fps, device):
    model = ActorCritic(len(PONG_VALID_ACTIONS)).to(device)
    ckpt = torch.load(os.path.join(ROOT, PONG_WEIGHTS), map_location=device)
    state_dict = ckpt.get("model_state", ckpt)
    model.load_state_dict(state_dict)
    model.eval()

    env = gym.make("ALE/Pong-v5", render_mode="rgb_array")
    stacker = PongFrameStack()
    obs, _ = env.reset()
    state = stacker.reset(obs)

    frames = []
    total = 0.0
    score_agent = score_opp = 0
    for step in range(max_steps):
        action_idx, _, _ = model.predict(state, greedy=True)
        action = PONG_VALID_ACTIONS[action_idx]
        obs, reward, terminated, truncated, _ = env.step(action)
        state = stacker.step(obs)
        total += reward
        if reward > 0:
            score_agent += 1
        elif reward < 0:
            score_opp += 1
        frame = add_hud(upscale(env.render()), f"PONG RL AGENT   {score_agent}-{score_opp}   STEP {step + 1:>5}")
        frames.append(frame)
        if terminated or truncated:
            break
    env.close()

    print(f"Pong: {len(frames)} frames, score={score_agent}-{score_opp}")
    write_video(frames, os.path.join(ROOT, "pong_rl.webm"), fps)
    save_thumb(frames, os.path.join(ROOT, "pong_thumb.png"))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--max-steps", type=int, default=2000)
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--only", choices=["pacman", "pong"], default=None)
    args = parser.parse_args()

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"device={device}")

    if args.only in (None, "pacman"):
        capture_pacman(args.max_steps, args.fps, device)
    if args.only in (None, "pong"):
        capture_pong(args.max_steps, args.fps, device)


if __name__ == "__main__":
    main()
