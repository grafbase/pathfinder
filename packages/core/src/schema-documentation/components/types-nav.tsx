import type { SortedTypeMap, TopLevelPane } from "../types";

import { Section } from "./section";
import { TypeSystemNavButton } from "./type-system-nav-button";

export const TypesNav = ({ sortedTypes }: { sortedTypes: SortedTypeMap }) => {
  return (
    <Section lead={`Types`}>
      {Object.keys(sortedTypes).map((s) => {
        return (
          <TypeSystemNavButton
            key={s}
            destinationPane={s as TopLevelPane}
            copy={s}
            count={sortedTypes[s as keyof SortedTypeMap].length.toString()}
          />
        );
      })}
    </Section>
  );
};
