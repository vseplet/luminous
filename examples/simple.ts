import luminous from '../mod.ts';

const log = new luminous.Logger();

log.trc`This is TRACE log message`;
log.dbg`This is DEBUG log message`;
log.vrb`This is VERBOSE log message`;
log.inf`This is INFO log message`;
log.usr`This is USER log message`;
log.wrn`This is WARN log message`;
log.err`This is ERROR log message`;
log.ftl`This is FATAL log message`;
