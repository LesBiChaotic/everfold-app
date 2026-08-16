import { describe, it, expect } from 'vitest';
import { SEEDED_PUZZLES } from '../data/puzzles';
import { SEEDED_RELATIONSHIPS } from '../data/relationships';
import { SEEDED_FORECASTS, applyForecastScenario } from '../data/forecasts';

describe('Puzzle Engine & Gate Normalizers', () => {
  it('should normalize Gate 1 legacy archive code 0814 correctly', () => {
    const puzzle = SEEDED_PUZZLES.find((p) => p.id === 'gate_0814_legacy')!;
    expect(puzzle.normalizer('  0814  ')).toBe('0814');
    expect(puzzle.normalizer('08-14')).toBe('0814');
  });

  it('should normalize Gate 2 tape backup passphrase contexttimingreturn', () => {
    const puzzle = SEEDED_PUZZLES.find((p) => p.id === 'gate_pairwise_export')!;
    expect(puzzle.normalizer('Context Timing Return')).toBe('contexttimingreturn');
    expect(puzzle.normalizer('CONTEXT_TIMING_RETURN')).toBe('contexttimingreturn');
  });

  it('should normalize Gate 3 Meredith Cole ID 4417', () => {
    const puzzle = SEEDED_PUZZLES.find((p) => p.id === 'gate_4417_meredith')!;
    expect(puzzle.normalizer(' 4417 ')).toBe('4417');
    expect(puzzle.normalizer('#4417')).toBe('4417');
  });

  it('should normalize Gate 5 Role Resolver command', () => {
    const puzzle = SEEDED_PUZZLES.find((p) => p.id === 'gate_role_resolver')!;
    expect(puzzle.normalizer('role_resolver')).toBe('ROLE_RESOLVER');
    expect(puzzle.normalizer('ROLE_RESOLVER ')).toBe('ROLE_RESOLVER');
  });

  it('should normalize Gate 6 TS19 ethics code', () => {
    const puzzle = SEEDED_PUZZLES.find((p) => p.id === 'gate_ts19_ethics_notes')!;
    expect(puzzle.normalizer('ts19')).toBe('TS19');
    expect(puzzle.normalizer('TS-19')).toBe('TS19');
  });

  it('should normalize Gate 8 raw forecast parameter 97.2', () => {
    const puzzle = SEEDED_PUZZLES.find((p) => p.id === 'gate_97_2_forecast')!;
    expect(puzzle.normalizer(' 97.2% ')).toBe('97.2');
  });

  it('should normalize Gate 9 RETURN anagram', () => {
    const puzzle = SEEDED_PUZZLES.find((p) => p.id === 'gate_return_memo')!;
    expect(puzzle.normalizer('return')).toBe('RETURN');
    expect(puzzle.normalizer('  RETURN  ')).toBe('RETURN');
  });
});

describe('Relational Decoupling & Forecast Determinism', () => {
  it('strictly enforces that relationshipId is decoupled from user account ID', () => {
    SEEDED_RELATIONSHIPS.forEach((rel) => {
      expect(rel.relationshipId).toBeDefined();
      expect(rel.relationshipId.startsWith('rel_')).toBe(true);
      rel.participantAccountIds.forEach((pId) => {
        expect(rel.relationshipId).not.toBe(pId);
      });
    });
  });

  it('ensures the RETURN event remains invariant across scenario stress toggles', () => {
    const baseForecast = SEEDED_FORECASTS['fc_7734_hana'];
    const stressScenarios = {
      'New Job': true,
      'Relocation': true,
      'Long Distance': true,
      'Schedule Change': true,
      'Family Pressure': true,
      'Financial Stress': true,
    };

    const modified = applyForecastScenario(baseForecast, stressScenarios);
    const returnEvent = modified.events.find((ev) => ev.category === 'RETURN' || ev.title === 'RETURN');
    expect(returnEvent).toBeDefined();
    expect(returnEvent!.probability).toBe(0.998);
  });
});
