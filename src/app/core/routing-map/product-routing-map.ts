
import { Type } from '@angular/core';

export const productComponentMap: Record<string, () => Promise<Type<any>>> = {
  'universal_life': () =>
    import('../../features/product-list/product/universal-life/universal-life').then((m) => m.UniversalLifeComponent),
  'term': () =>
    import('../../features/product-list/product/term/term').then((m) => m.TermComponent),
  'variable_universal_life': () =>
    import('../../features/product-list/product/variable-universal-life/variable-universal-life').then((m) => m.VariableUniversalLife),
  'master_assumption_library': () =>
    import('../../features/product-list/assumption/master-assumption-library/master-assumption-library').then((m) => m.MasterAssumptionLibrary),
};
