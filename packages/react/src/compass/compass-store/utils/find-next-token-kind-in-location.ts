import { Token, TokenKind } from 'graphql';

export const findNextTokenKindInLocation = ({
  startToken,
  tokenKind,
}: {
  startToken: Token;
  tokenKind: TokenKind;
}): Token | null => {
  const nextToken = startToken.next;

  if (!nextToken) {
    return null;
  }

  if (nextToken.kind === tokenKind) {
    return nextToken;
  } else {
    return findNextTokenKindInLocation({ startToken: nextToken, tokenKind });
  }
};
