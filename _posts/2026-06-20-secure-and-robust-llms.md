---
layout: post
title: "Securing Large Language Models: From Jailbreaks to Trustworthy Agents"
date: 2026-06-20 09:00:00
description: LLMs broke the old security playbook. Prompt injection, jailbreaks, data poisoning, and memorized secrets are the new attack surface, and here is how we are learning to defend it.
tags: llms
categories: research
---

For most of computing history, software did exactly what its code said, no more, no less. Large language models broke that assumption. They take instructions in plain language, blend them with whatever text they happen to read, and act on the mixture. That flexibility is precisely what makes them so useful, and precisely what makes them so hard to secure.

## Why LLMs need a new security lens

A traditional program has a clean boundary between *code* (trusted instructions) and *data* (untrusted input). An LLM dissolves that boundary. Everything, your instructions, the user's question, a retrieved web page, arrives as one stream of text, and the model treats it all as potentially instructive. When a system also has memory and tools (an **agent**), a clever string of text can become an action in the real world.

> The hardest LLM security problem in one sentence: the model cannot reliably tell the difference between instructions it should follow and text it should merely read.

## The new attack surface

- **Prompt injection.** If SQL injection was the defining web vulnerability of its era, prompt injection is its LLM successor. Hide instructions inside content the model will process so it follows the attacker instead of you. The *indirect* form plants instructions in a web page, email, or document the model reads later, so a request like "summarize this page" quietly triggers hostile commands.
- **Jailbreaks and adversarial prompts.** Inputs crafted to bypass a model's safety training. This is the text-domain cousin of the [adversarial examples](/blog/2026/adversarial-examples-and-robust-models/) I study in vision: a small, deliberate perturbation that flips the model's behavior.
- **Data poisoning and backdoors.** An attacker who slips crafted text into training data can implant a hidden trigger phrase that makes the model misbehave on command while looking normal otherwise.
- **Memorization and data leakage.** Models sometimes memorize training data verbatim, and the right prompt can pull those fragments back out, the [privacy](/blog/2026/privacy-preserving-ai/) problem in a new guise.

## What defense looks like

There is no single switch that makes an LLM safe. As with privacy and robustness elsewhere, real security comes from layers that each assume the others might fail:

- **Alignment training** teaches the model to refuse harmful requests, necessary but never sufficient on its own.
- **Input and output guardrails** screen prompts and responses for known attack patterns and leaking content.
- **Grounding and retrieval** anchor answers in a trusted knowledge base, though retrieved content must itself be treated as untrusted.
- **Least privilege for agents** is often the most reliable defense: give an agent the narrowest possible access and require confirmation for consequential actions.
- **Adversarial testing and red-teaming**: you cannot patch a jailbreak you have never tried to write.

## The distributed angle

This is where my research threads converge. Organizations increasingly want to fine-tune LLMs on sensitive, private data without centralizing it, a federated-learning problem wearing a very large hat. It inherits every challenge from [federated learning](/blog/2026/federated-learning-without-sharing-data/), non-identical data, enormous communication cost, and updates that can leak the very data they were meant to protect, plus the [energy](/blog/2026/energy-aware-machine-learning/) cost of training and serving such large models.

Stack the threats together and the goal of **secure and robust LLMs in distributed settings** comes into focus: models improved collaboratively on private data, resistant to injection and poisoning, that do not memorize and leak what they were shown, and that keep all of this true even when some participants are dishonest. That intersection of robustness, privacy, and distribution is exactly the territory my work is heading into.
