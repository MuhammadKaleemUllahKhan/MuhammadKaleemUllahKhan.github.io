---
layout: post
title: "Adversarial Examples and the Long Road to Robust Models"
date: 2026-04-18 09:00:00
description: A few carefully chosen pixels can flip a confident prediction. Here is how those attacks work, and how adversarial training fights back, tradeoffs and all.
tags: adversarial-ml
categories: research
---

Take an image a neural network classifies correctly with 99% confidence. Nudge a few pixels by an amount too small for your eye to notice. The same network now insists, just as confidently, that it is looking at something else entirely. That unsettling gap between human and machine perception is the world of adversarial examples.

## What is an adversarial example?

An adversarial example is an input that has been deliberately perturbed to fool a model, while staying almost identical to a normal input. The perturbation is tiny, often bounded so that no single pixel changes by much, yet it is aimed with surgical precision. The reason this is possible is that high-dimensional decision boundaries are far more fragile than they look: a model can be accurate on natural data and still have class boundaries that run startlingly close to almost every point.

## How attacks are built

The elegant, slightly uncomfortable insight is that the same gradient we use to *train* a model can be used to *attack* it. During training we compute how the loss changes with respect to the weights and step the weights to reduce it. To attack, we compute how the loss changes with respect to the **input**, and step the input to *increase* it.

The **fast gradient sign method (FGSM)** is the one-line version: take the sign of the input gradient and move every pixel a small fixed amount in the direction that hurts the model most.

```python
x_adv = x + epsilon * sign(grad_x(loss(model(x), y)))
```

**Projected gradient descent (PGD)** is FGSM applied repeatedly in small steps, projecting back into the allowed budget after each one. It is widely treated as a strong, standard benchmark: if your defense survives PGD, that means something.

Attacks also come in flavors depending on the **threat model**. In a *white-box* setting the attacker knows the model's weights and can compute gradients directly; in a *black-box* setting they only get to query the model, yet attacks still succeed, partly because adversarial examples often **transfer** between different models.

## Adversarial training: fighting fire with fire

The most reliable defense we have is conceptually simple: if the model keeps getting fooled by perturbed inputs, train it on perturbed inputs. **Adversarial training** generates attacks on the fly during training and forces the model to classify those hard examples correctly. Formally it becomes a *min-max* game:

> Minimize, over the weights, the loss of the maximally perturbed input. Train against your strongest imagined adversary, and you become robust to the weaker real ones.

## The price of robustness

- **Compute cost.** Generating a multi-step attack for every batch can make training several times slower. You are running an optimization loop inside your optimization loop.
- **The robustness-accuracy trade-off.** Models hardened against attacks often give up a little accuracy on clean data.
- **It is attack-specific.** Train against one kind of perturbation and a cleverer attack may still slip through. Robustness is a direction, not a finish line.

## Robustness in a distributed world

Combine this with everything that makes federated learning hard, and you get the problem I actually work on. **Federated adversarial training** asks clients to harden the shared model using only their local data, then combine those robust updates, all while clients differ in data, compute, and how much battery they can spend on those expensive inner attack loops. A realistic system therefore has to be *resource-aware*: spend the robustness budget where it counts, and let the aggregator account for the fact that different clients contributed different amounts of robustness. That balance is where adversarial machine learning stops being a clean benchmark and starts being engineering.
