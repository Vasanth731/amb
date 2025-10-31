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

  // Formal to Level 2
  { from: "formal", to: "calculus" },
  { from: "formal", to: "geometry" },
  { from: "formal", to: "algebra" },

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
let offsetX = 0;
let offsetY = 0;

nodes.forEach(node => {
  node.addEventListener("mousedown", function(e) {
    isDragging = true;
    currentNode = this;

    // Get the current position
    const rect = this.getBoundingClientRect();
    const container = document.querySelector('.graph-container');
    const containerRect = container.getBoundingClientRect();

    // Calculate offset from mouse position to node center
    offsetX = e.clientX - rect.left - rect.width / 2;
    offsetY = e.clientY - rect.top - rect.height / 2;

    // Prevent text selection while dragging
    e.preventDefault();
  });
});

document.addEventListener("mousemove", function(e) {
  if (isDragging && currentNode) {
    const container = document.querySelector('.graph-container');
    const containerRect = container.getBoundingClientRect();

    // Calculate new position as percentage
    const newLeft = ((e.clientX - containerRect.left - offsetX) / containerRect.width) * 100;
    const newTop = ((e.clientY - containerRect.top - offsetY) / containerRect.height) * 100;

    // Constrain to container bounds
    const clampedLeft = Math.max(0, Math.min(100, newLeft));
    const clampedTop = Math.max(0, Math.min(100, newTop));

    // Update node position
    currentNode.style.left = clampedLeft + '%';
    currentNode.style.top = clampedTop + '%';

    // Redraw connections in real-time
    drawConnections();
  }
});

document.addEventListener("mouseup", function(e) {
  if (isDragging && currentNode) {
    // Check if this was a drag or a click
    const dragDistance = Math.sqrt(
      Math.pow(e.clientX - (currentNode.getBoundingClientRect().left + currentNode.getBoundingClientRect().width / 2), 2) +
      Math.pow(e.clientY - (currentNode.getBoundingClientRect().top + currentNode.getBoundingClientRect().height / 2), 2)
    );

    // If drag distance is small, treat as click
    if (dragDistance < 5) {
      const page = currentNode.getAttribute("data-page");
      if (page) {
        window.location.href = `${page}.html`;
      }
    }
  }

  isDragging = false;
  currentNode = null;
});
