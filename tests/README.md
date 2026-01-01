# Luminous Tests

This directory contains tests for the Luminous logging library.

## Test Structure

- `Level.test.ts` - tests for logging levels
- `Logger.test.ts` - tests for the main Logger class
- `Logger.fluent.test.ts` - tests for fluent API and logger creation
- `OptionsBuilder.test.ts` - tests for the options builder
- `formatters/TextFormatter.test.ts` - tests for the text formatter
- `formatters/JsonFormatter.test.ts` - tests for the JSON formatter
- `transports/TerminalTransport.test.ts` - tests for the terminal transport
- `helpers/color.test.ts` - tests for color functions
- `helpers/time.test.ts` - tests for time functions

## Running Tests

```bash
# Run all tests
deno task test

# Run tests in watch mode
deno task test:watch

# Run tests directly
deno test --allow-all
```

## Coverage

Tests cover:

- ✅ All logging levels
- ✅ All Logger methods (trc, dbg, vrb, inf, usr, wrn, err, ftl)
- ✅ Template strings handling
- ✅ Metadata and its formatting
- ✅ Options inheritance from parent loggers
- ✅ All OptionsBuilder options
- ✅ Text and JSON formatting
- ✅ Transports and their behavior
- ✅ Helper functions (colors, time)
