import { useState } from "react";
import axios from "axios";

function Repositories() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const [repository, setRepository] = useState(null);
  const [readme, setReadme] = useState(null);
  const [issues, setIssues] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepository = async () => {
    if (!owner || !repo) {
      setError("Please enter both owner and repository name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      setRepository(null);
      setReadme(null);
      setIssues([]);

      const repositoryResponse = await axios.get(
        `http://localhost:5000/api/github/repository/${owner}/${repo}`
      );

      const readmeResponse = await axios.get(
        `http://localhost:5000/api/github/repository/${owner}/${repo}/readme`
      );

      const issuesResponse = await axios.get(
        `http://localhost:5000/api/github/repository/${owner}/${repo}/issues`
      );

      setRepository(repositoryResponse.data.repository);
      setReadme(readmeResponse.data.readme);
      setIssues(issuesResponse.data.issues);
    } catch (error) {
      console.error(error);
      setError(
        "Could not fetch repository data. Please check the repository details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Find a Repository
        </h1>

        <p className="text-slate-400 mb-8">
          Enter a GitHub repository to explore its information, README and issues.
        </p>

        {/* Search section */}
        <div className="flex gap-3 mb-8">

          <input
            type="text"
            placeholder="Owner e.g. facebook"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />

          <input
            type="text"
            placeholder="Repository e.g. react"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
          />

          <button
            onClick={fetchRepository}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Search
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-slate-400">
            Fetching repository data...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 mb-6">
            {error}
          </p>
        )}

        {/* Repository information */}
        {repository && (
          <div className="space-y-8">

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">

              <h2 className="text-2xl font-bold">
                {repository.name}
              </h2>

              <p className="text-slate-400 mt-2">
                {repository.description || "No description available."}
              </p>

              <div className="grid grid-cols-3 gap-4 mt-6">

                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400">⭐ Stars</p>
                  <p className="text-xl font-bold">
                    {repository.stars}
                  </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400">🍴 Forks</p>
                  <p className="text-xl font-bold">
                    {repository.forks}
                  </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400">Language</p>
                  <p className="text-xl font-bold">
                    {repository.language || "Unknown"}
                  </p>
                </div>

              </div>

              <a
                href={repository.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-6 text-blue-400 hover:underline"
              >
                View on GitHub →
              </a>

            </div>

            {/* README */}
            {readme && (
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">

                <h2 className="text-2xl font-bold mb-4">
                  README
                </h2>

                <pre className="whitespace-pre-wrap text-sm text-slate-300 overflow-auto max-h-[500px]">
                  {readme.content}
                </pre>

              </div>
            )}

            {/* Issues */}
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">

              <h2 className="text-2xl font-bold mb-4">
                Open Issues
              </h2>

              <p className="text-slate-400 mb-6">
                {issues.length} issues retrieved
              </p>

              <div className="space-y-4">

                {issues.slice(0, 10).map((issue) => (
                  <div
                    key={issue.number}
                    className="p-4 bg-slate-800 rounded-lg"
                  >

                    <a
                      href={issue.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-semibold text-blue-400 hover:underline"
                    >
                      #{issue.number} {issue.title}
                    </a>

                    <div className="flex flex-wrap gap-2 mt-3">

                      {issue.labels.map((label) => (
                        <span
                          key={label}
                          className="px-2 py-1 text-xs rounded bg-slate-700 text-slate-300"
                        >
                          {label}
                        </span>
                      ))}

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Repositories;