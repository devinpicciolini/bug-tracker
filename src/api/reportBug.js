// src/api/report-bug.js
const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  const { componentName, pageUrl } = req.body;

  try {
    // Dynamically import the Octokit module
    const { Octokit } = await import('@octokit/rest');

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    // Map componentName to the file path in the repository
    const filePath = getFilePathFromComponentName(componentName);

    // Fetch the commit history for the file
    const { data: commits } = await octokit.repos.listCommits({
      owner: 'your-github-username',
      repo: 'your-repo-name',
      path: filePath,
    });

    const lastCommit = commits[0];
    const lastEditor = lastCommit.commit.author.name;

    // Create a GitHub issue and assign it to the last editor
    await octokit.issues.create({
      owner: 'your-github-username',
      repo: 'your-repo-name',
      title: `Bug report for ${componentName}`,
      body: `Bug reported on ${pageUrl} in component ${componentName}. Last edited by ${lastEditor}.`,
      assignees: [lastEditor],
    });

    res.status(200).json({ message: 'Bug report created and assigned' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getFilePathFromComponentName(componentName) {
  // Map your component names to file paths
  const componentMap = {
    MyComponent: 'src/components/MyComponent.js',
    // Add other components here
  };

  return componentMap[componentName];
}

module.exports = router;
