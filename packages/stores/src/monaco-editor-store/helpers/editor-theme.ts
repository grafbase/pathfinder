import type monaco from 'monaco-graphql/esm/monaco-editor';

type MonacoEditorStandaloneThemeData = monaco.editor.IStandaloneThemeData;

const lightColors = {
  ui_neutral02: '#E6E6E6',
  ui_neutral03: '#CACACA',
  ui_neutral04: '#707070',
  ui_neutral06: '#4A4A4A',
  ui_neutral07: '#1B1B1B',
  blue: '#1672C3',
  green: '#32AF72',
  red: '#D32121',
  yellow: '#B99D06',

  // 👇 shared with dark
  orange: '#EE8E57',
  pink: '#F98286',
};

const darkColors = {
  ui_neutral02: '#222226',
  ui_neutral03: '#363739',
  ui_neutral04: '#55565C',
  ui_neutral06: '#BFBFBF',
  ui_neutral07: '#FFFFFF',
  blue: '#5AD4E6',
  green: '#7BD88F',
  red: '#FC4747',
  yellow: '#FCE566',

  // 👇 shared with light
  orange: '#EE8E57',
  pink: '#F98286',
};

export const colorsForEditor = {
  dark: {
    ...darkColors,
  },
  light: {
    ...lightColors,
  },
};

export const editorTheme = ({
  variant,
}: {
  variant: 'dark' | 'light';
}): MonacoEditorStandaloneThemeData => ({
  base: variant === 'light' ? 'vs' : 'vs-dark',
  inherit: true,
  colors: {
    // 👇 because we're not inheriting from the base theme (see previous key),
    // 'editor.foreground' is a catch-all for anything that we haven't explicitly set
    // if you're developing, it's fun to set this to "#FF0000" (RED) to see non-tokenized bits
    'editor.foreground': colorsForEditor[variant].ui_neutral06, // Editor default foreground color.
    'editorCursor.foreground': colorsForEditor[variant].yellow, // Color of the editor cursor.
    focusBorder: '#ff000000',
    // background color for selected text within the editor, set to one scale step above the base
    'editor.selectionBackground': colorsForEditor[variant].ui_neutral02,
    'editor.background': '#FFFFFF00', // white with a 00 alpha value
    'editorLineNumber.foreground': colorsForEditor[variant].ui_neutral03, // Color of editor line numbers.
    'editorLineNumber.activeForeground': colorsForEditor[variant].ui_neutral04, // Color of editor active line number.
    'editorError.foreground': colorsForEditor[variant].orange, // Foreground color of error squigglies in the editor.
    'editorWarning.foreground': colorsForEditor[variant].red, // Foreground color of warning squigglies in the editor.
    'editor.lineHighlightBorder': '#FFFFFF00', // Background color for the border around the line at the cursor position.
    'editorBracketMatch.background': '#FFFFFF00', // Background color behind matching brackets
    'editorBracketMatch.border': colorsForEditor[variant].ui_neutral03, // Color for matching brackets boxes
    'editorIndentGuide.background': colorsForEditor[variant].ui_neutral02, // Color of the editor indentation guides.
    'editorIndentGuide.activeBackground': colorsForEditor[variant].ui_neutral03, // Color of the editor indentation guides.
    'scrollbar.shadow': '#FFFFFF00', // Scrollbar shadow to indicate that the view is scrolled.
    'editorOverviewRuler.border': '#FFFFFF00', // Color of the overview ruler border.
    'editorMarkerNavigationWarning.background': '#FFFFFF00', // Editor marker navigation widget warning color.
    'editorHoverWidget.foreground': colorsForEditor[variant].ui_neutral06,
    'editorHoverWidget.background': colorsForEditor[variant].ui_neutral02,
    'editorHoverWidget.border': colorsForEditor[variant].ui_neutral03,
    'editorSuggestWidget.background': colorsForEditor[variant].ui_neutral02, // Background color of the suggest widget.
    'editorSuggestWidget.border': colorsForEditor[variant].ui_neutral03, // Border color of the suggest widget.
    'editorSuggestWidget.foreground': colorsForEditor[variant].ui_neutral06, // Foreground color of the suggest widget.
    'editorSuggestWidget.selectedBackground': colorsForEditor[variant].ui_neutral03, // Background color of the selected entry in the suggest widget.
    'editorSuggestWidget.highlightForeground': colorsForEditor[variant].ui_neutral07, // Color of the match highlights in the suggest widget.
    'list.hoverBackground': colorsForEditor[variant].ui_neutral03, // List/Tree background when hovering over items using the mouse.
    'list.hoverForeground': colorsForEditor[variant].ui_neutral07, // List/Tree foreground when hovering over items using the mouse.
  },
  rules: [
    // operations editor (graphql)
    // begin values
    {
      foreground: colorsForEditor[variant].green,
      token: 'string.quote.gql',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'string.invalid.gql',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'string.gql',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'number.gql',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'number.float.gql',
    },
    // end values
    // begin graphql type system
    {
      foreground: colorsForEditor[variant].blue,
      token: 'keyword.gql',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'type.identifier.gql',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral07,
      token: 'key.identifier.gql',
    },
    {
      foreground: colorsForEditor[variant].pink,
      token: 'argument.identifier.gql',
    },
    {
      foreground: colorsForEditor[variant].pink,
      token: 'annotation.gql',
    },
    // end graphql type system
    // begin delimiters
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.gql',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.parenthesis.gql',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.curly.gql',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.square.gql',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'operator.gql',
    },
    // end delimiters
    // begin comments
    {
      foreground: colorsForEditor[variant].ui_neutral03,
      token: 'comment.gql',
    },
    // end comments
    // variables editor & results viewer (json)
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.bracket.json',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.array.json',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.comma.json',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral04,
      token: 'delimiter.colon.json',
    },
    {
      foreground: colorsForEditor[variant].ui_neutral07,
      token: 'string.key.json',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'string.value.json',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'number.json',
    },
    {
      foreground: colorsForEditor[variant].green,
      token: 'keyword.json',
    },
  ],
});
