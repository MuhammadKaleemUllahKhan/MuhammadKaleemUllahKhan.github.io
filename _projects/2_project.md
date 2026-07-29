---
layout: page
title: Resource-Aware Federated Adversarial Training
description: Hybrid federated adversarial training that spends the robustness budget where it counts.
importance: 2
category: research
---

A **resource-aware hybrid federated adversarial training** model that hardens a shared model against adversarial examples using only clients' local data, while accounting for the fact that different clients have very different compute and energy budgets for the expensive inner attack loops. The aggregator weighs updates by how much robustness each client was able to contribute. Related work introduces an **energy-aware adaptive adversarial attack model** for mobile edge computing.
