---
layout: post
title: "The Energy Bill of Intelligence: Toward Energy-Aware ML"
date: 2026-03-22 09:00:00
description: Every prediction costs power. On phones and edge devices that budget is tiny, and attackers can even weaponise it. A look at making AI energy-conscious.
tags: energy-aware-ml
categories: research
---

We tend to talk about machine-learning models in terms of accuracy, parameters, and benchmarks. We talk far less about the thing every one of those models quietly consumes: energy. Once you start deploying on phones, sensors, and edge devices, that cost stops being an afterthought and becomes the constraint that shapes everything.

## Where the joules actually go

- **Training** is the famous energy hog: weeks of computation across many accelerators. But it is a one-time cost.
- **Inference** looks cheap per prediction, but it runs forever. A model on a billion phones can burn more total energy over its life than it ever took to train.

And within both phases, a surprising share of the energy is not spent on arithmetic at all. It goes to **moving data**: shuttling weights and activations between memory and compute, and, in distributed settings, across the network. In federated learning the communication of model updates can dominate the energy budget.

## The edge changes the rules

In a data center, energy is a cost. On a phone or embedded sensor, energy is a hard ceiling you crash into: a small battery, no active cooling, and a user who notices immediately when their phone gets hot.

> In the cloud, energy is a bill. At the edge, energy is the wall, and your model has to live inside it.

## Designing for energy

- **Quantization.** Represent weights with fewer bits (say 8-bit integers instead of 32-bit floats): less data to move, cheaper arithmetic.
- **Pruning.** Remove the many weights that contribute almost nothing.
- **Knowledge distillation.** Train a small "student" to imitate a large "teacher".
- **Early exit.** Let easy inputs produce a confident answer from an intermediate layer and stop early.
- **Communication-efficient federated learning.** Compress updates, train longer locally between rounds, and select participants wisely.

## When attackers target energy itself

Here my own research takes a sharper turn. We usually think of adversarial attacks as trying to break *accuracy*. But on energy-constrained devices there is a second, quieter target: the energy budget itself. An **energy-aware attack** can push a system into its most expensive mode of operation, draining battery, forcing worst-case computation paths, or defeating the very efficiency tricks meant to save power. The model may still be "correct," but the device dies hours early.

In my work on an *energy-aware adaptive adversarial attack model for mobile edge computing*, the attacker reasons explicitly about the energy landscape, adapting its strategy to where the system is most vulnerable in terms of power, not just prediction. Studying these attacks is the only honest way to build defenses: you cannot protect an energy budget you have never tried to attack.

As intelligence moves off the server and onto the billions of small devices around us, efficiency becomes a core design goal, on equal footing with accuracy and robustness.
