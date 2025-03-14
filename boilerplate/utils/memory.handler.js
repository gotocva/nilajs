const v8 = require('v8');

/**
 * Converts bytes to MB with two decimal places
 * @param {number} bytes - The number of bytes
 * @returns {string} - Formatted string in MB
 */
const toMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

/**
 * API to return detailed memory usage statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.memoryUsageApi = (req, res) => {
    // Get raw memory statistics from V8
    const rawStats = {
        heapStatistics: v8.getHeapStatistics(),
        heapSpaceStatistics: v8.getHeapSpaceStatistics(),
        heapCodeStatistics: v8.getHeapCodeStatistics(),
    };

    // Convert all numerical values in heapStatistics & heapCodeStatistics to MB
    const formatObject = (obj) => {
        Object.fromEntries(
            Object.entries(obj).map(([key, value]) => 
                typeof value === 'number' ? [key, toMB(value)] : [key, value]
            )
        );
    }

    // Format statistics for readability
    const formattedStats = {
        heapStatistics: formatObject(rawStats.heapStatistics),
        heapCodeStatistics: formatObject(rawStats.heapCodeStatistics),
        heapSpaceStatistics: rawStats.heapSpaceStatistics.map(space => ({
            space_name: space.space_name,
            space_size: toMB(space.space_size),
            space_used_size: toMB(space.space_used_size),
            space_available_size: toMB(space.space_available_size),
            physical_space_size: toMB(space.physical_space_size),
        })),
    };

    // Get memory usage from Node.js process
    const memoryUsage = process.memoryUsage();

    // Format process memory stats
    const memoryStats = {
        residentSetSize: toMB(memoryUsage.rss),          // Total allocated memory including heap, stack, and native bindings
        heapTotal: toMB(memoryUsage.heapTotal),          // Total memory allocated for JavaScript objects
        heapUsed: toMB(memoryUsage.heapUsed),            // Active memory used from the allocated heap
        external: toMB(memoryUsage.external),            // Memory used by C++ objects (e.g., Buffers)
        arrayBuffers: toMB(memoryUsage.arrayBuffers),    // Memory allocated for ArrayBuffers and Buffers
    };

    // Return JSON response with formatted memory statistics
    return res.json({ formattedStats, memoryStats });
};
