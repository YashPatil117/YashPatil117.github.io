// programming.js — handles LeetCode fixed widget (top-right)

document.addEventListener("DOMContentLoaded", async () => {
  const solvedEl = document.getElementById("lc-solved");
  const rankEl = document.getElementById("lc-rank");
  const rawEl = document.getElementById("lc-raw");

  const USERNAME = "yash378";

  /**
   * Replace this with your REAL backend endpoint
   * Example:
   * const LC_API = (username) => `https://your-backend.com/leetcode/${username}`;
   */
  const LC_API = null;

  solvedEl.textContent = "Loading...";
  rankEl.textContent = "Loading...";
  rawEl.classList.add("hidden");

  if (LC_API) {
    try {
      const res = await fetch(LC_API(USERNAME));
      if (!res.ok) throw new Error("Network error");

      const data = await res.json();

      /**
       * Expected API shape:
       * {
       *   totalSolved: number,
       *   ranking: number,
       *   easy: number,
       *   medium: number,
       *   hard: number
       * }
       */
      solvedEl.textContent = data.totalSolved ?? "—";
      rankEl.textContent = data.ranking
        ? data.ranking.toLocaleString()
        : "—";

      rawEl.textContent = JSON.stringify(data, null, 2);
      rawEl.classList.remove("hidden");

    } catch (err) {
      solvedEl.textContent = "API error";
      rankEl.textContent = "—";
    }
  } else {
   
    await new Promise((r) => setTimeout(r, 400));

    const mock = {
      username: USERNAME,
      totalSolved: 211,
      ranking: 683647,
      easy: 140,
      medium: 155,
      hard: 32,
    };

    solvedEl.textContent = mock.totalSolved;
    rankEl.textContent = mock.ranking.toLocaleString();

    
  }
});
