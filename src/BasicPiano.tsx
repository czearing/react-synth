import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";

export const BasicPiano = (props) => {
  const noteRange = {
    first: MidiNumbers.fromNote("c3"),
    last: MidiNumbers.fromNote("f4")
  };

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW
  });

  return (
    <Piano
      noteRange={noteRange}
      width={300}
      playNote={props.playNote}
      stopNote={props.stopNote}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};
