# The model in plain musical language

For one voice, imagine a closed line drawn through four points. The horizontal distance to the next point is its duration, in samples; its vertical coordinate is amplitude. Max draws straight lines between the points and repeats the loop.

At the end of each loop the points do not receive unrelated random values. Their **velocity** is first perturbed randomly and reflected within a small velocity range. That current velocity then moves the point itself and is reflected in its larger position range. This is the second-order walk described by Luque: distribution → primary walk (velocity) → secondary walk (the actual breakpoint value).

`dMin` and `dMax` are the secondary barriers for the horizontal coordinates. `dVelocity` is the primary barrier. `dImpulse` is the scale of each random acceleration. The equivalent amplitude controls are `ampLimit`, `aVelocity`, and `aImpulse`.

The signal equation is piecewise linear: for a local segment phase `u`, output is `a_i + u(a_(i+1)-a_i)`. The complete period is `d1+d2+d3+d4`; hence a rough central frequency is sampleRate / (d1+d2+d3+d4).

The model takes continuity seriously: the last breakpoint of a period connects to the first breakpoint of the next one. It is therefore a changing waveform, not a sequence of clicks.
