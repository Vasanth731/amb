// Navbar dropdown functionality
const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

menuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", function (e) {
  if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

// Graph connection lines
const svg = document.getElementById("connections");
const nodes = document.querySelectorAll(".node");

// Define connections
const connections = [
  // Central to Level 1
  { from: "scire", to: "formal" },
  { from: "scire", to: "natural" },
  { from: "scire", to: "social" },

  // Formal to Math and Math to Level 2
  { from: "formal", to: "math" },
  { from: "math", to: "calculus" },
  { from: "math", to: "geometry" },
  { from: "math", to: "algebra" },

  // Natural to Level 2
  { from: "natural", to: "life" },
  { from: "natural", to: "physical" },
  { from: "natural", to: "planetary" },

  // Social to Level 2
  { from: "social", to: "history" },
  { from: "social", to: "geography" },
  { from: "social", to: "civics" },
  { from: "social", to: "economics" },
  { from: "social", to: "anthropology" },
  { from: "social", to: "sociology" },
  { from: "social", to: "psychology" },
  { from: "social", to: "linguistics" },
  { from: "social", to: "theology" },
  { from: "social", to: "philosophy" }
];

// Function to get node center coordinates
function getNodeCenter(nodeId) {
  let node;
  if (nodeId === "scire") {
    node = document.getElementById(nodeId);
  } else if (nodeId === "math") {
    // Find the math node by its label
    const allNodes = document.querySelectorAll('.node');
    for (let n of allNodes) {
      const label = n.querySelector('.node-label');
      if (label && label.textContent.trim() === 'math') {
        node = n;
        break;
      }
    }
  } else {
    node = document.querySelector(`[data-page="${nodeId}"]`);
  }

  if (!node) return { x: 0, y: 0 };

  const rect = node.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

// Function to draw a line between two nodes - org-roam UI inspired
function drawLine(from, to) {
  const fromCoords = getNodeCenter(from);
  const toCoords = getNodeCenter(to);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", fromCoords.x);
  line.setAttribute("y1", fromCoords.y);
  line.setAttribute("x2", toCoords.x);
  line.setAttribute("y2", toCoords.y);
  line.setAttribute("stroke", "rgba(139, 233, 253, 0.15)");
  line.setAttribute("stroke-width", "1.5");
  line.setAttribute("stroke-linecap", "round");

  // Add subtle animation
  line.style.transition = "all 0.3s ease";

  svg.appendChild(line);
}

// Draw all connections
function drawConnections() {
  svg.innerHTML = ""; // Clear existing lines
  connections.forEach(conn => {
    drawLine(conn.from, conn.to);
  });
}

// Initial draw
drawConnections();

// Redraw on window resize
window.addEventListener("resize", drawConnections);

// Drag functionality
let isDragging = false;
let currentNode = null;
let startX = 0;
let startY = 0;
let hasMoved = false;

nodes.forEach(node => {
  node.addEventListener("mousedown", function(e) {
    isDragging = true;
    currentNode = this;
    hasMoved = false;

    // Store initial mouse position
    startX = e.clientX;
    startY = e.clientY;

    // Add dragging class for visual feedback
    this.style.cursor = 'grabbing';
    this.style.transition = 'none';

    // Prevent text selection while dragging
    e.preventDefault();
  });
});

document.addEventListener("mousemove", function(e) {
  if (isDragging && currentNode) {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Check if mouse has moved significantly
    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      hasMoved = true;
    }

    const container = document.querySelector('.graph-container');
    const containerRect = container.getBoundingClientRect();
    const rect = currentNode.getBoundingClientRect();

    // Calculate current center position as percentage
    const currentLeft = parseFloat(currentNode.style.left);
    const currentTop = parseFloat(currentNode.style.top);

    // Calculate movement in percentage
    const deltaLeftPercent = (deltaX / containerRect.width) * 100;
    const deltaTopPercent = (deltaY / containerRect.height) * 100;

    // Calculate new position as percentage
    const newLeft = currentLeft + deltaLeftPercent;
    const newTop = currentTop + deltaTopPercent;

    // Constrain to container bounds (with some padding)
    const clampedLeft = Math.max(2, Math.min(98, newLeft));
    const clampedTop = Math.max(2, Math.min(98, newTop));

    // Update node position
    currentNode.style.left = clampedLeft + '%';
    currentNode.style.top = clampedTop + '%';

    // Update start position for next movement
    startX = e.clientX;
    startY = e.clientY;

    // Redraw connections in real-time
    requestAnimationFrame(drawConnections);
  }
});

document.addEventListener("mouseup", function(e) {
  if (isDragging && currentNode) {
    // Restore cursor and transition
    currentNode.style.cursor = 'move';
    currentNode.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    // If node wasn't moved significantly, treat as click
    if (!hasMoved) {
      const page = currentNode.getAttribute("data-page");
      if (page) {
        window.location.href = `${page}.html`;
      }
    }
  }

  isDragging = false;
  currentNode = null;
  hasMoved = false;
});
