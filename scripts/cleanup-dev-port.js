const { execSync } = require("child_process");

const PORT = process.env.DEV_PORT || "3000";

function run(command) {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function parseListeningPids(output) {
  const pids = new Set();
  const lines = output.split(/\r?\n/).filter(Boolean);

  for (const line of lines) {
    if (!line.includes("LISTENING")) {
      continue;
    }
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (/^\d+$/.test(pid) && pid !== "0") {
      pids.add(pid);
    }
  }

  return [...pids];
}

function cleanupWindows() {
  let output = "";
  try {
    output = run(`netstat -ano -p tcp | findstr :${PORT}`);
  } catch {
    return;
  }

  const pids = parseListeningPids(output);
  for (const pid of pids) {
    let taskList = "";
    try {
      taskList = run(`tasklist /FI "PID eq ${pid}" /FO CSV /NH`);
    } catch {
      continue;
    }

    if (!/node\.exe/i.test(taskList)) {
      console.log(
        `Port ${PORT} is used by non-node PID ${pid}. Leaving it untouched.`,
      );
      continue;
    }

    try {
      run(`taskkill /PID ${pid} /F`);
      console.log(`Stopped stale node process PID ${pid} on port ${PORT}.`);
    } catch (error) {
      console.log(`Failed to stop PID ${pid}: ${error.message}`);
    }
  }
}

function cleanupPosix() {
  let output = "";
  try {
    output = run(`lsof -ti tcp:${PORT} -sTCP:LISTEN`);
  } catch {
    return;
  }

  const pids = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const pid of pids) {
    try {
      const processName = run(`ps -p ${pid} -o comm=`).trim();
      if (!processName.includes("node")) {
        console.log(
          `Port ${PORT} is used by non-node PID ${pid}. Leaving it untouched.`,
        );
        continue;
      }

      run(`kill -9 ${pid}`);
      console.log(`Stopped stale node process PID ${pid} on port ${PORT}.`);
    } catch (error) {
      console.log(`Failed to stop PID ${pid}: ${error.message}`);
    }
  }
}

if (process.platform === "win32") {
  cleanupWindows();
} else {
  cleanupPosix();
}
