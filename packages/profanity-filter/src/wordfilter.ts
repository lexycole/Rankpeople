import fs from "fs";
import path from "path";

let filter: any; // Declare filter with type 'any' as we initialize it in async scope

async function initializeFilter() {
    const { Filter } = await import("bad-words"); // Named import
    filter = new Filter(); // Now you can create the filter instance

    // Read and add custom curse words
    const cursewords = fs
      .readFileSync(path.join(__dirname, "../cursewords.txt"), "utf8")
      .split("\n")
      .filter((word) => word.trim().length > 0);

    filter.addWords(...cursewords);
}

initializeFilter(); // Initialize the filter (async)

// Export the filter instance
export { filter };