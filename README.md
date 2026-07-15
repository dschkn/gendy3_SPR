# Stochastic Process Modelling after Iannis Xenakis's GENDY 3

A Max/MSP prototype for studying dynamic stochastic synthesis and the relationship between the **GENDY** signal-generation layer and the **PARAG** formal layer described in research on Iannis Xenakis's *GENDY3* (1991).

This repository contains an experimental model, not a claim of exact historical reconstruction. The original production program, complete parameter sets, seeds, and section data are not available here. The current prototype instead turns the documented principles into a playable and visible Max/MSP study.

**Project and implementation © 2026 Dmitrii Shchukin. All rights reserved.**

## Prototype status

The current version explores two connected levels:

1. **PARAG-like macrostructure**: exponentially distributed time fields, Bernoulli sounding/silent decisions, and four visible stochastic trajectories in `mc.function`.
2. **GENDY-like microstructure**: bounded second-order random walks controlling waveform breakpoint durations and amplitudes.

The system is intentionally provisional. Its purpose is to test stochastic behaviour, compare parameter regions, and establish a basis for a more detailed reconstruction and compositional instrument.

## Requirements

- Max 8 or later
- Standard Max/MSP, MC, and `gen~` objects

No external packages are required for the current prototype.

## Run

1. Clone or download the repository.
2. Open `patchers/GENDY3_mcfunction_cycles.maxpat` in Max.
3. Turn on DSP using `ezdac~`.
4. Click **generate section** to create new stochastic trajectories.
5. Adjust `sounding probability` and `mean exponential time field` to change the large-scale behaviour.
6. Keep the output level conservative. Stochastic synthesis has no moral obligation to protect loudspeakers.

## Current signal model

Each direct synthesis voice contains four waveform breakpoints. For both duration and amplitude, a random impulse modifies a bounded primary walk; the primary walk then modifies a bounded secondary walk. Values are reflected at the barriers.

The waveform is linearly interpolated and continuously regenerated. Small duration values and rapid movement tend toward noisy spectra, narrow duration regions can stabilise pitch, and intermediate regions produce glissandi and unstable harmonic masses.

The main patch also visualises four PARAG-like trajectories. Exponential X increments form successive time fields, while a Bernoulli decision places each field either on a sounding trajectory or on the centre line as silence.

## Repository structure

```text
patchers/
  GENDY3_mcfunction_cycles.maxpat  main prototype
  gendy3_mcfunction.js             PARAG-like stochastic trajectory generator
  gendy3_voice.maxpat              direct breakpoint synthesis voice

docs/
  GENDY3_model.md                  concise explanation of the model

reference/
  README.md                        bibliography and reference notes
```

## Research basis

The prototype is informed primarily by:

- Sergio Luque, “Stochastic Synthesis: Origins and Extensions” (2006).
- Peter Hoffmann, “The Genesis of GENDY3” (2022).

See `reference/README.md` for bibliographic notes. Third-party publications are not redistributed in this repository.

## Next development steps

- separate and clarify the PARAG and GENDY parameter layers;
- expand the number and independence of synthesis tracks;
- model section-level transitions and silence structures;
- improve parameter visualisation and reproducibility;
- compare generated behaviour with published analytical descriptions of *GENDY3*.
