export const maxProfit = (jobs) => {
    // Sort jobs by their end times
    jobs.sort((a, b) => a.end_time - b.end_time);

    // Function to perform binary search to find the latest non-conflicting job
    function latestNonConflict(jobs, index) {
        let low = 0, high = index - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (jobs[mid].end_time <= jobs[index].start_time) {
                if (jobs[mid + 1].end_time <= jobs[index].start_time) {
                    low = mid + 1;
                } else {
                    return mid;
                }
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    const n = jobs.length;
    const dp = new Array(n).fill(0);

    // Initialize dp[0] with the profit of the first job
    dp[0] = jobs[0].profit;

    for (let i = 1; i < n; i++) {
        // Include the current job's profit
        let inclProfit = jobs[i].profit;

        // Find the latest job that doesn't conflict with the current job
        const l = latestNonConflict(jobs, i);
        if (l !== -1) {
            inclProfit += dp[l];
        }

        // Store the maximum of including and excluding the current job
        dp[i] = Math.max(inclProfit, dp[i - 1]);
    }

    // The last entry in dp[] will have the maximum profit
    return dp[n - 1];
}