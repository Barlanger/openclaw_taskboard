# mise.toml Configuration Guide

## What Changed

The mise.toml file has been updated to fix configuration issues that prevented it from working correctly.

## Issues Fixed

### 1. Java Version Specification
**Before:** `java = "temurin-17.0.12+7"`
**After:** `java = "temurin-17"`

**Why:** mise can automatically fetch the latest version of Java 17 from the temurin distribution. The specific patch version (17.0.12+7) may not always be available, causing installation failures. Using just "temurin-17" lets mise choose the best available Java 17 version.

### 2. JAVA_HOME Environment Variable
**Before:**
```toml
JAVA_HOME = "{{config_root}}/.mise/installs/java/temurin-17.0.12+7"
```
**After:** Removed

**Why:** mise automatically sets JAVA_HOME when you install Java. Manual configuration is unnecessary and the template variable syntax was incorrect.

### 3. .env File Loading
**Before:**
```toml
_.file = ".env"
```
**After:** Removed

**Why:** This feature is for loading environment variables from a file, but it's not necessary for the basic setup. If you need custom environment variables, create a `.env` file and mise will automatically load it if configured properly.

## How to Use

1. **Install mise** (if not already installed):
   ```bash
   curl https://mise.run | sh
   ```

2. **Activate mise** in your shell (add to ~/.bashrc or ~/.zshrc):
   ```bash
   eval "$(mise activate bash)"  # for bash
   eval "$(mise activate zsh)"   # for zsh
   ```

3. **Install all tools**:
   ```bash
   cd /path/to/openclaw_taskboard
   mise install
   ```

4. **Verify installation**:
   ```bash
   mise list
   node --version   # Should show v22.12.0
   java --version   # Should show Java 17
   mvn --version    # Should show Maven 3.9.6
   ```

## Current Configuration

```toml
[tools]
node = "22.12.0"    # Angular frontend
java = "temurin-17" # Spring Boot backend
maven = "3.9.6"     # Backend build tool

[env]
MAVEN_OPTS = "-Xmx1024m"  # Maven memory optimization
```

## Environment Variables

- **JAVA_HOME**: Automatically set by mise to point to the installed Java
- **MAVEN_OPTS**: Set to "-Xmx1024m" for better Maven performance

## Troubleshooting

### mise command not found
Make sure you've activated mise in your shell. Run:
```bash
eval "$(~/.local/bin/mise activate bash)"
```

### Tool installation fails
Try:
```bash
mise doctor  # Check for issues
mise trust   # Trust the mise.toml in this project
mise install --verbose  # See detailed installation logs
```

### Wrong Java/Node version still active
```bash
mise reshim     # Regenerate shims
mise use        # Re-apply the configuration
```

## Additional Resources

- [mise Documentation](https://mise.jdx.dev/)
- [mise Configuration Guide](https://mise.jdx.dev/configuration.html)
- [mise CLI Reference](https://mise.jdx.dev/cli/)
