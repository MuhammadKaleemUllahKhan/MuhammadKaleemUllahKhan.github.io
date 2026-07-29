---
layout: post
title: "Privacy-Preserving AI: Learning Without Looking"
date: 2026-02-15 09:00:00
description: Federated learning alone is not privacy. A tour of the real toolbox, differential privacy, secure aggregation, and split learning, and how the pieces fit together.
tags: privacy
categories: research
---

"We never see your data" is one of the most overused promises in tech, and one of the hardest to actually keep. Privacy-preserving AI is the field that tries to make that promise true with mathematics rather than marketing.

## The leakage you did not expect

Start with the uncomfortable fact that motivates everything else: **keeping raw data local is not the same as keeping it private.** In [federated learning](/blog/2026/federated-learning-without-sharing-data/) a client shares only model updates, but those updates are computed *from* the data and carry traces of it.

- **Gradient leakage.** Under the right conditions an attacker who sees a client's gradient update can partially reconstruct the very examples that produced it.
- **Membership inference.** Even without reconstructing anything, an attacker can often tell whether a *particular* person's record was in the training set, which can itself be a serious breach.

So the goal is not just "don't move the data." It is to ensure that what you *do* share reveals as little as possible about any individual.

## The toolbox

**Differential privacy** gives us a rigorous definition of what privacy even means: the output of a computation should look essentially the same whether or not any single individual's data was included. In practice we add carefully calibrated **noise**, and a parameter (usually `epsilon`) tunes the trade-off between accuracy and privacy. It is the rare privacy tool that comes with a provable guarantee.

**Secure aggregation** lets a server compute the *sum* of many client updates without being able to read any single client's update on its own. Clients mask their contributions so the masks cancel only when everything is added together, a beautiful fit for federated learning.

**Homomorphic encryption** lets you compute directly on *encrypted* data, so a server could process updates it can never actually read. Powerful, but still computationally heavy.

**Split learning** cuts the network in two: the client runs the first few layers on its raw data and sends only an intermediate representation, never the input itself, to the server.

## No single tool is enough

> Federated learning keeps data local. Secure aggregation hides individual updates. Differential privacy bounds what the result can reveal. Real privacy comes from layering them, not from picking one.

## Where privacy meets robustness and fairness

This is the part that pulls my whole research agenda together. The same distributed system has to be **robust** to attacks, **fair** across participants who contribute very different data, and **efficient** enough to run on real devices, and these goals can fight each other. Holding privacy, security, and fairness together, rather than optimizing one and quietly sacrificing the others, is exactly the knot my thesis on *fair and secure federated adversarial training* tries to untie.
