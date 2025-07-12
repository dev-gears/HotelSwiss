/**
 * Utility functions to safely handle objects and prevent cross-origin issues
 */

/**
 * Safely clone an object to avoid cross-origin wrapper issues
 */
export function safeClone<T>(obj: T): T {
  try {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj !== "object") {
      return obj;
    }

    // Use JSON serialization for deep cloning to avoid proxy issues
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.warn("Error cloning object safely:", error);
    return obj;
  }
}

/**
 * Safely merge objects without creating cross-origin references
 */
export function safeMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>,
): T {
  try {
    const clonedTarget = safeClone(target);
    const clonedSource = safeClone(source);

    return Object.assign({}, clonedTarget, clonedSource);
  } catch (error) {
    console.warn("Error merging objects safely:", error);
    return target;
  }
}

/**
 * Safely assign properties to avoid cross-origin issues
 */
export function safeAssign<T extends Record<string, any>>(
  target: T,
  source: Partial<T>,
): void {
  try {
    Object.keys(source).forEach((key) => {
      if (source[key] !== undefined) {
        (target as any)[key] = safeClone(source[key]);
      }
    });
  } catch (error) {
    console.warn("Error assigning properties safely:", error);
  }
}

/**
 * Safely access nested object properties
 */
export function safeGet<T>(
  obj: any,
  path: string,
  defaultValue?: T,
): T | undefined {
  try {
    const keys = path.split(".");
    let result = obj;

    for (const key of keys) {
      if (result == null || typeof result !== "object") {
        return defaultValue;
      }
      result = result[key];
    }

    return result !== undefined ? result : defaultValue;
  } catch (error) {
    console.warn("Error safely accessing object property:", error);
    return defaultValue;
  }
}

/**
 * Check if an object is a safe plain object (not a proxy or cross-origin wrapper)
 */
export function isSafeObject(obj: any): boolean {
  try {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (typeof obj !== "object") {
      return false;
    }

    // Try to access constructor - this will fail on cross-origin objects
    const constructor = obj.constructor;
    return constructor === Object || constructor === Array;
  } catch (error) {
    // If accessing properties throws, it's likely a cross-origin object
    return false;
  }
}
