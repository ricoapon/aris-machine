grammar Aris;

program
 : line+ EOF
 ;

lines: line*;

line
 : expression NEWLINE*
 ;

expression
 : action
 ;

action
 : copy
 | move
 | add
 | subtract
 | increment
 | decrement
 | loop
 | break
 | continue
 | ifZero
 | ifNotZero
 | ifPos
 | ifNeg
 ;

move: MOVE (MEMORY_SLOT|INPUT) TO (MEMORY_SLOT|OUTPUT);
copy: COPY MEMORY_SLOT TO (MEMORY_SLOT|OUTPUT);
add: ADD MEMORY_SLOT TO MEMORY_SLOT;
subtract: SUB MEMORY_SLOT FROM MEMORY_SLOT;
increment: INCR MEMORY_SLOT;
decrement: DECR MEMORY_SLOT;
loop: LOOP CURLY_OPEN NEWLINE lines CURLY_CLOSED;
break: BREAK;
continue: CONTINUE;
ifZero: IFZERO (MEMORY_SLOT|INPUT) CURLY_OPEN NEWLINE lines CURLY_CLOSED;
ifNotZero: IFNOTZERO (MEMORY_SLOT|INPUT) CURLY_OPEN NEWLINE lines CURLY_CLOSED;
ifPos: IFPOS (MEMORY_SLOT|INPUT) CURLY_OPEN NEWLINE lines CURLY_CLOSED;
ifNeg: IFNEG (MEMORY_SLOT|INPUT) CURLY_OPEN NEWLINE lines CURLY_CLOSED;

ADD: 'add';
SUB: 'sub';
COPY: 'copy';
MOVE: 'move';
TO: 'to';
FROM: 'from';
INPUT: 'input';
OUTPUT: 'output';
LOOP: 'loop';
BREAK: 'break';
CONTINUE: 'continue';
IFZERO: 'ifzero';
IFNOTZERO: 'ifnotzero';
IFPOS: 'ifpos';
IFNEG: 'ifneg';
INCR: 'incr';
DECR: 'decr';
CURLY_OPEN: '{';
CURLY_CLOSED: '}';
MEMORY_SLOT: (MEMORY_SLOT_NUMBER | MEMORY_SLOT_NAME);
MEMORY_SLOT_NUMBER: [0-9]+;
MEMORY_SLOT_NAME: [a-z]+;

NEWLINE: ('\r'? '\n' | '\r')+;
LINE_COMMENT: '//' .*? NEWLINE -> skip;

// We want to prevent commands like "move1to2" to be invalid, so we ensure that entire words are captured.
// After this, we can skip spaces.
UNIDENTIFIED: [a-z0-9_-]+;
WHITESPACE: (' '|'\t') -> skip;

// To prevent errors, catch any other character that we did not define.
ERROR_CHARACTER: .;
